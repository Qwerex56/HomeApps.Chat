<script setup lang="ts">
import { computed, nextTick, onUnmounted, ref, watch } from 'vue'
import { useHost } from '@homeapps/plugin-sdk'
import { errorCode, newId, type AttachmentView, type ChatApi, type MessageView } from './api'
import { useSignal, type ChatHub } from './hub'
import { toggleMark } from './markdown'
import { completeMention, mentionAt } from './mention'
import { checkFile, isVideo, MAX_ATTACHMENTS, problemOf, type FileProblem } from './media'

// The text field: Enter sends, Shift+Enter breaks the line, Ctrl+B / Ctrl+I mark the selection. Photos and films are
// uploaded as soon as they are chosen and sent with the message once the server has checked them.
const props = defineProps<{
  api: ChatApi
  hub: ChatHub
  replyTo: MessageView | null
  editing: MessageView | null
  nameOf: (userId: string | null | undefined) => string
  /** JARVIS listens here: the @ hint offers him. */
  assistant: boolean
}>()
const emit = defineEmits<{
  send: [text: string | null, attachments: AttachmentView[]]
  save: [text: string]
  cancelReply: []
  cancelEdit: []
  typing: []
}>()
const host = useHost()

const TEXT_MAX = 4000
const ASSISTANT_NAME = 'Jarvis'
const POLL_MS = 3_000

interface Upload {
  key: string
  name: string
  video: boolean
  /** A local picture while the server's miniature is not there yet. */
  localUrl: string | null
  progress: number
  state: 'uploading' | 'processing' | 'ready' | 'failed'
  problem: string | null
  attachment: AttachmentView | null
  abort: AbortController
}

const text = ref('')
const caret = ref(0)
const mention = computed(() => {
  if (!props.assistant || props.editing) return null
  const at = mentionAt(text.value, caret.value)
  return at && ASSISTANT_NAME.toLowerCase().startsWith(at.query.toLowerCase()) ? at : null
})
function pickMention() {
  const element = input()
  if (!mention.value || !element) return
  const next = completeMention(text.value, mention.value, caret.value, ASSISTANT_NAME)
  text.value = next.text
  caret.value = next.caret
  void nextTick(() => {
    element.focus()
    element.setSelectionRange(next.caret, next.caret)
  })
}
const trackCaret = () => (caret.value = input()?.selectionStart ?? text.value.length)
const uploads = ref<Upload[]>([])
const field = ref<{ $el: HTMLTextAreaElement } | null>(null)
const fileInput = ref<HTMLInputElement | null>(null)
const cameraInput = ref<HTMLInputElement | null>(null)
const input = () => field.value?.$el ?? null

const busy = computed(() => uploads.value.some((u) => u.state === 'uploading' || u.state === 'processing'))
const ready = computed(() => uploads.value.filter((u) => u.state === 'ready' && u.attachment))
const canSend = computed(() => {
  if (busy.value) return false
  if (props.editing) return text.value.trim().length > 0
  return text.value.trim().length > 0 || ready.value.length > 0
})

// Editing puts the message's text into the field; leaving the edit empties it again.
watch(
  () => props.editing,
  (message, before) => {
    if (message) text.value = message.text ?? ''
    else if (before) text.value = ''
    void nextTick(() => input()?.focus())
  },
)
watch(
  () => props.replyTo,
  (message) => message && void nextTick(() => input()?.focus()),
)

const problemText = (problem: FileProblem | null) => host.t(`upload.${problem ?? 'failed'}`)

async function add(files: FileList | null) {
  if (!files) return
  for (const file of [...files]) {
    if (uploads.value.length >= MAX_ATTACHMENTS) {
      host.notify('warn', host.t('upload.tooMany', { count: MAX_ATTACHMENTS }))
      break
    }
    const upload: Upload = {
      key: newId(),
      name: file.name,
      video: isVideo(file),
      localUrl: file.type.startsWith('image/') ? URL.createObjectURL(file) : null,
      progress: 0,
      state: 'uploading',
      problem: null,
      attachment: null,
      abort: new AbortController(),
    }
    uploads.value.push(upload)
    void run(uploads.value[uploads.value.length - 1]!, file)
  }
}

async function run(upload: Upload, file: File) {
  // Too long or too large shows at once, before a single byte is sent.
  const problem = await checkFile(file)
  if (problem) {
    upload.state = 'failed'
    upload.problem = problemText(problem)
    return
  }
  try {
    const attachment = await props.api.upload(file, (fraction) => (upload.progress = fraction), upload.abort.signal)
    apply(upload, attachment)
  } catch (error) {
    if (upload.abort.signal.aborted) return
    upload.state = 'failed'
    const code = errorCode(error)
    upload.problem =
      code === 'chat.storage_full' ? host.t('upload.storageFull') : problemOf(code) ? problemText(problemOf(code)) : host.errorMessage(error)
  }
}

function apply(upload: Upload, attachment: AttachmentView) {
  upload.attachment = attachment
  if (attachment.status === 'Failed') {
    upload.state = 'failed'
    upload.problem = problemText(problemOf(attachment.failureCode))
  } else {
    upload.state = attachment.status === 'Pending' ? 'processing' : 'ready'
  }
}

async function check(upload: Upload) {
  if (!upload.attachment) return
  try {
    apply(upload, await props.api.attachment(upload.attachment.id))
  } catch {
    // Asked again on the next signal or tick.
  }
}

// The server says when a file is checked; the timer covers a signal lost while reconnecting.
useSignal(props.hub, 'AttachmentChanged', (signal) => {
  const upload = uploads.value.find((u) => u.attachment?.id === signal.attachmentId)
  if (upload) void check(upload)
})
const poll = setInterval(() => uploads.value.filter((u) => u.state === 'processing').forEach((u) => void check(u)), POLL_MS)

function release(upload: Upload) {
  if (upload.localUrl) URL.revokeObjectURL(upload.localUrl)
}
function removeUpload(upload: Upload) {
  upload.abort.abort()
  release(upload)
  uploads.value = uploads.value.filter((u) => u.key !== upload.key)
}
onUnmounted(() => {
  clearInterval(poll)
  uploads.value.forEach((u) => {
    u.abort.abort()
    release(u)
  })
})

function submit() {
  if (!canSend.value) return
  const value = text.value.trim()
  if (props.editing) {
    emit('save', value)
    return
  }
  emit('send', value || null, ready.value.map((u) => u.attachment!))
  uploads.value.forEach(release)
  uploads.value = []
  text.value = ''
}

let lastTyping = 0
function onInput() {
  trackCaret()
  const now = Date.now()
  if (props.editing || now - lastTyping < 3_000 || !text.value) return
  lastTyping = now
  emit('typing')
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Tab' && mention.value) {
    event.preventDefault()
    pickMention()
    return
  }
  if (event.key === 'Enter' && !event.shiftKey && !event.isComposing) {
    event.preventDefault()
    submit()
    return
  }
  if (event.key === 'Escape') {
    if (props.editing) emit('cancelEdit')
    else if (props.replyTo) emit('cancelReply')
    return
  }
  const mark = (event.ctrlKey || event.metaKey) && !event.altKey ? { b: '**', i: '_' }[event.key.toLowerCase()] : undefined
  const element = input()
  if (!mark || !element) return
  event.preventDefault()
  const next = toggleMark(text.value, element.selectionStart, element.selectionEnd, mark)
  text.value = next.text
  void nextTick(() => element.setSelectionRange(next.start, next.end))
}

function onPicked(event: Event) {
  const target = event.target as HTMLInputElement
  void add(target.files)
  target.value = ''
}

function onPaste(event: ClipboardEvent) {
  if (props.editing || !event.clipboardData?.files.length) return
  event.preventDefault()
  void add(event.clipboardData.files)
}
</script>

<template>
  <div class="chat-composer">
    <div v-if="editing" class="chat-composer__context">
      <i class="pi pi-pencil" aria-hidden="true" />
      <span>{{ host.t('composer.editing') }}</span>
      <Button icon="pi pi-times" text rounded size="small" severity="secondary" :aria-label="host.t('cancel')" @click="emit('cancelEdit')" />
    </div>
    <div v-else-if="replyTo" class="chat-composer__context">
      <i class="pi pi-reply" aria-hidden="true" />
      <span>
        <strong>{{ nameOf(replyTo.authorId) }}</strong>
        {{ replyTo.text || host.t('media.count', { count: replyTo.attachments.length }) }}
      </span>
      <Button icon="pi pi-times" text rounded size="small" severity="secondary" :aria-label="host.t('cancel')" @click="emit('cancelReply')" />
    </div>

    <ul v-if="uploads.length" class="chat-composer__uploads">
      <li v-for="upload in uploads" :key="upload.key" :class="`chat-upload chat-upload--${upload.state}`">
        <div class="chat-upload__preview">
          <img v-if="upload.attachment?.thumbUrl || upload.localUrl" :src="upload.attachment?.thumbUrl ?? upload.localUrl ?? undefined" alt="" />
          <i v-else :class="['pi', upload.video ? 'pi-video' : 'pi-image']" aria-hidden="true" />
          <ProgressSpinner v-if="upload.state === 'processing'" class="chat-upload__spinner" stroke-width="6" />
          <div v-if="upload.state === 'uploading'" class="chat-upload__bar" role="progressbar" :aria-valuenow="Math.round(upload.progress * 100)">
            <div :style="{ width: `${Math.round(upload.progress * 100)}%` }" />
          </div>
        </div>
        <p v-if="upload.state === 'failed'" class="chat-upload__problem">{{ upload.problem }}</p>
        <p v-else-if="upload.state === 'processing'" class="chat-upload__note">{{ host.t('upload.processing') }}</p>
        <Button
          class="chat-upload__remove"
          icon="pi pi-times"
          rounded
          size="small"
          severity="secondary"
          :aria-label="host.t('upload.remove', { name: upload.name })"
          @click="removeUpload(upload)"
        />
      </li>
    </ul>

    <div class="chat-composer__row">
      <template v-if="!editing">
        <input ref="fileInput" type="file" accept="image/*,video/*" multiple hidden @change="onPicked" />
        <input ref="cameraInput" type="file" accept="image/*,video/*" capture="environment" hidden @change="onPicked" />
        <Button icon="pi pi-paperclip" text rounded severity="secondary" :aria-label="host.t('composer.attach')" @click="fileInput?.click()" />
        <Button
          class="chat-composer__camera"
          icon="pi pi-camera"
          text
          rounded
          severity="secondary"
          :aria-label="host.t('composer.camera')"
          @click="cameraInput?.click()"
        />
      </template>
      <button v-if="mention" type="button" class="chat-composer__mention" @mousedown.prevent="pickMention">
        <i class="pi pi-sparkles" aria-hidden="true" /> @{{ ASSISTANT_NAME }}
        <span>{{ host.t('assistant.mentionHint') }}</span>
      </button>
      <Textarea
        ref="field"
        v-model="text"
        class="chat-composer__field"
        rows="1"
        auto-resize
        :maxlength="TEXT_MAX"
        :placeholder="host.t('composer.placeholder')"
        :aria-label="host.t('composer.placeholder')"
        @keydown="onKeydown"
        @input="onInput"
        @click="trackCaret"
        @keyup="trackCaret"
        @paste="onPaste"
      />
      <Button
        :icon="editing ? 'pi pi-check' : 'pi pi-send'"
        rounded
        :disabled="!canSend"
        :aria-label="host.t(editing ? 'save' : 'composer.send')"
        @click="submit"
      />
    </div>
  </div>
</template>

<style scoped>
.chat-composer {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  border-top: 1px solid var(--p-content-border-color);
}
.chat-composer__context {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding-left: 0.5rem;
  border-left: 3px solid var(--p-primary-color);
  font-size: 0.85rem;
  color: var(--p-text-muted-color);
}
.chat-composer__context span {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.chat-composer__row {
  position: relative;
  display: flex;
  align-items: flex-end;
  gap: 0.25rem;
}
.chat-composer__mention {
  position: absolute;
  bottom: calc(100% + 0.25rem);
  left: 0.75rem;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.35rem 0.75rem;
  border: 1px solid var(--p-content-border-color);
  border-radius: 999px;
  background: var(--p-content-background);
  color: var(--p-text-color);
  font: inherit;
  font-size: 0.85rem;
  cursor: pointer;
  box-shadow: 0 2px 8px rgb(0 0 0 / 0.12);
}
.chat-composer__mention span {
  color: var(--p-text-muted-color);
  font-size: 0.75rem;
}
.chat-composer__field {
  flex: 1;
  min-width: 0;
  max-height: 10rem;
  overflow-y: auto !important;
}
/* The camera button is for phones; a desktop has the paperclip. */
@media (hover: hover) and (pointer: fine) {
  .chat-composer__camera {
    display: none;
  }
}
.chat-composer__uploads {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 0;
  padding: 0;
  list-style: none;
}
.chat-upload {
  position: relative;
  width: 5.5rem;
}
.chat-upload__preview {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 5.5rem;
  height: 5.5rem;
  border-radius: 0.6rem;
  overflow: hidden;
  background: var(--p-content-hover-background);
  color: var(--p-text-muted-color);
  font-size: 1.5rem;
}
.chat-upload__preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.chat-upload--uploading img,
.chat-upload--processing img,
.chat-upload--failed img {
  opacity: 0.5;
}
.chat-upload--failed .chat-upload__preview {
  outline: 2px solid var(--p-red-500);
}
.chat-upload__spinner {
  position: absolute;
  width: 2rem;
  height: 2rem;
}
.chat-upload__bar {
  position: absolute;
  left: 0.4rem;
  right: 0.4rem;
  bottom: 0.4rem;
  height: 0.3rem;
  border-radius: 0.3rem;
  background: rgb(0 0 0 / 0.35);
}
.chat-upload__bar div {
  height: 100%;
  border-radius: 0.3rem;
  background: var(--p-primary-color);
  transition: width 0.15s;
}
.chat-upload__problem,
.chat-upload__note {
  margin: 0.2rem 0 0;
  font-size: 0.7rem;
  line-height: 1.2;
  color: var(--p-text-muted-color);
}
.chat-upload__problem {
  color: var(--p-red-500);
}
.chat-upload__remove {
  position: absolute;
  top: -0.4rem;
  right: -0.4rem;
  width: 1.5rem;
  height: 1.5rem;
}
</style>
