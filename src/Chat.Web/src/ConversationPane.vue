<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import type { AttachmentView, ConversationView, MessageView } from './api'
import { useFormat } from './format'
import { useSignal, type ChatHub } from './hub'
import { renderMarkdown } from './markdown'
import { buildTimeline } from './timeline'
import type { Chat } from './useChat'
import { useThread } from './useThread'
import MediaGallery from './MediaGallery.vue'
import MessageComposer from './MessageComposer.vue'
import MessageItem from './MessageItem.vue'
import RoomPanel from './RoomPanel.vue'

// One conversation: its header, the history (older pages on scrolling up, new messages as they come) and the text
// field. The parent gives it a key per conversation, so everything here starts fresh for each one.
const props = defineProps<{ chat: Chat; hub: ChatHub; conversation: ConversationView; typing: string[]; phone: boolean }>()
const emit = defineEmits<{ back: []; left: [] }>()
const { host, api, userId, nameOf, avatarOf, initialOf, otherOf, titleOf, canWrite, canModerate, assistantOn } = props.chat
const format = useFormat()

const REACTIONS = ['👍', '❤️', '😂', '😮', '😢', '🎉']
const EIGHT_HOURS_MS = 8 * 60 * 60_000

const conversationId = computed<string | null>(() => props.conversation.id)
const fail = (error: unknown) => host.notify('error', host.errorMessage(error))
const thread = useThread(api, conversationId, fail)

const isHome = computed(() => props.conversation.kind === 'Household')
const isRoom = computed(() => props.conversation.kind === 'Room')
const writable = computed(() => canWrite.value && !props.conversation.archived)

// Where the "new messages" line goes: after what was read before this conversation was opened.
const readUpTo = props.conversation.unread > 0 ? props.conversation.lastReadMessageId : null
const rows = computed(() => buildTimeline(thread.messages.value, thread.outgoing.value, thread.notices.value, userId.value, readUpTo))

// Direct conversations: "Przeczytano" under my last message the other person has read.
const seenId = computed(() => {
  const read = props.conversation.otherReadMessageId
  if (props.conversation.kind !== 'Direct' || !read) return null
  const all = thread.messages.value
  for (let i = all.findIndex((m) => m.id === read); i >= 0; i--) {
    if (all[i]!.authorId === userId.value) return all[i]!.id
  }
  return null
})

// --- Scrolling and reading -------------------------------------------------------------------------------------
const scroller = ref<HTMLElement | null>(null)
const atBottom = ref(true)
const newBelow = ref(0)
const NEAR_PX = 80

const toBottom = () => {
  const element = scroller.value
  if (element) element.scrollTop = element.scrollHeight
  atBottom.value = true
  newBelow.value = 0
}

let marked = props.conversation.lastReadMessageId
function markRead() {
  const last = thread.messages.value[thread.messages.value.length - 1]
  if (!last || last.id === marked || !atBottom.value || document.visibilityState !== 'visible') return
  marked = last.id
  api.value
    .markRead(props.conversation.id, last.id)
    .then(() => props.chat.refreshConversations())
    .catch(() => undefined)
}

async function loadOlder() {
  const element = scroller.value
  if (!element || !thread.hasOlder.value || thread.loadingOlder.value) return
  const before = element.scrollHeight
  await thread.loadOlder()
  await nextTick()
  // Stay on the message that was at the top.
  element.scrollTop += element.scrollHeight - before
}

function onScroll() {
  const element = scroller.value
  if (!element) return
  atBottom.value = element.scrollHeight - element.scrollTop - element.clientHeight < NEAR_PX
  if (atBottom.value) {
    newBelow.value = 0
    markRead()
  }
  if (element.scrollTop < NEAR_PX * 2) void loadOlder()
}

// The first page: start at the "new messages" line when there is one, otherwise at the end.
watch(thread.loading, async (loading) => {
  if (loading) return
  await nextTick()
  const line = scroller.value?.querySelector<HTMLElement>('.chat-pane__new')
  if (line) line.scrollIntoView({ block: 'center' })
  else toBottom()
  onScroll()
})

// New rows: follow them when the reader is at the end (or wrote it), otherwise offer a way down.
watch(
  () => thread.messages.value[thread.messages.value.length - 1]?.id,
  async (id, before) => {
    if (!id || !before || thread.loading.value) return
    const follow = atBottom.value
    await nextTick()
    if (follow) {
      toBottom()
      markRead()
    } else newBelow.value++
  },
)
watch(
  () => thread.outgoing.value.length + thread.notices.value.length,
  async (count, before) => {
    if (count <= before) return
    await nextTick()
    toBottom()
  },
)
watch(
  () => props.typing.length,
  async () => {
    if (!atBottom.value) return
    await nextTick()
    toBottom()
  },
)

const onVisible = () => markRead()
onMounted(() => document.addEventListener('visibilitychange', onVisible))
onUnmounted(() => document.removeEventListener('visibilitychange', onVisible))

// --- Signals -------------------------------------------------------------------------------------------------
const here = (signal: { conversationId: string }) => signal.conversationId === props.conversation.id
useSignal(props.hub, 'MessageSent', (signal) => here(signal) && void thread.catchUp())
useSignal(props.hub, 'MessageEdited', (signal) => here(signal) && void thread.refresh(signal.messageId))
useSignal(props.hub, 'MessageDeleted', (signal) => here(signal) && void thread.refresh(signal.messageId))
useSignal(props.hub, 'ReactionChanged', (signal) => here(signal) && void thread.refresh(signal.messageId))
onUnmounted(props.hub.onReconnected(() => void thread.catchUp()))
// Without the hub the list still learns about new messages (its periodic refresh); follow it.
watch(
  () => props.conversation.lastMessageAt,
  () => void thread.catchUp(),
)

// What happened to the room while it is open, as a line in the conversation.
watch(
  () => props.conversation,
  (now, before) => {
    if (now.kind !== 'Room') return
    if (now.name !== before.name) thread.notice(host.t('notice.renamed', { name: now.name }))
    for (const id of now.participantIds.filter((p) => !before.participantIds.includes(p))) {
      thread.notice(host.t('notice.joined', { name: nameOf(id) }))
    }
    for (const id of before.participantIds.filter((p) => !now.participantIds.includes(p))) {
      thread.notice(host.t('notice.left', { name: nameOf(id) }))
    }
    if (now.keeperId !== before.keeperId && now.keeperId) thread.notice(host.t('notice.keeper', { name: nameOf(now.keeperId) }))
    if (now.archived && !before.archived) thread.notice(host.t('notice.archived'))
  },
)

// --- JARVIS's card: the decision goes to him; his new card line comes back as MessageEdited ------------------------
async function decide(message: MessageView, confirmationId: string, approve: boolean, done: () => void) {
  try {
    await api.value.decide(message.id, confirmationId, approve)
  } catch (error) {
    fail(error)
  } finally {
    done()
  }
}

// --- Writing ---------------------------------------------------------------------------------------------------
const replyTo = ref<MessageView | null>(null)
const editing = ref<MessageView | null>(null)

function send(text: string | null, attachments: AttachmentView[]) {
  thread.send(text, attachments, replyTo.value)
  replyTo.value = null
}
async function saveEdit(text: string) {
  const message = editing.value
  if (!message) return
  try {
    if (text !== message.text) await api.value.edit(message.id, text)
    editing.value = null
    void thread.refresh(message.id)
  } catch (error) {
    fail(error)
  }
}
async function react(message: MessageView, emoji: string, mine: boolean) {
  try {
    await (mine ? api.value.unreact(message.id, emoji) : api.value.react(message.id, emoji))
    void thread.refresh(message.id)
  } catch (error) {
    fail(error)
  }
}

const deleting = ref<MessageView | null>(null)
async function confirmDelete() {
  const message = deleting.value
  deleting.value = null
  if (!message) return
  try {
    await api.value.remove(message.id)
    void thread.refresh(message.id)
  } catch (error) {
    fail(error)
  }
}

// --- The message menu ----------------------------------------------------------------------------------------
type PopupMenu = { toggle: (event: Event) => void; hide: () => void }
const menu = ref<PopupMenu | null>(null)
const menuMessage = ref<MessageView | null>(null)
const canDelete = (message: MessageView) =>
  !props.conversation.archived && (message.authorId === userId.value ? canWrite.value : isHome.value && canModerate.value)
const canAct = (message: MessageView) => writable.value || canDelete(message)
const menuItems = computed(() => {
  const message = menuMessage.value
  if (!message) return []
  const mine = message.authorId === userId.value
  return [
    ...(writable.value ? [{ label: host.t('message.reply'), icon: 'pi pi-reply', command: () => ((editing.value = null), (replyTo.value = message)) }] : []),
    ...(writable.value && mine ? [{ label: host.t('message.edit'), icon: 'pi pi-pencil', command: () => ((replyTo.value = null), (editing.value = message)) }] : []),
    ...(canDelete(message) ? [{ label: host.t('message.delete'), icon: 'pi pi-trash', command: () => (deleting.value = message) }] : []),
  ]
})
function openMenu(message: MessageView, event: Event) {
  menuMessage.value = message
  menu.value?.toggle(event)
}
function pickReaction(emoji: string) {
  const message = menuMessage.value
  menu.value?.hide()
  if (!message) return
  const mine = message.reactions.some((r) => r.emoji === emoji && !!userId.value && r.userIds.includes(userId.value))
  void react(message, emoji, mine)
}

// --- Header: muting and the room panel ---------------------------------------------------------------------------
const muteMenu = ref<PopupMenu | null>(null)
async function mute(until: string | null | false) {
  try {
    await (until === false ? api.value.unmute(props.conversation.id) : api.value.mute(props.conversation.id, until))
    void props.chat.refreshConversations()
  } catch (error) {
    fail(error)
  }
}
const muteItems = computed(() =>
  props.conversation.muted
    ? [{ label: host.t('mute.off'), icon: 'pi pi-bell', command: () => mute(false) }]
    : [
        { label: host.t('mute.eightHours'), icon: 'pi pi-clock', command: () => mute(new Date(Date.now() + EIGHT_HOURS_MS).toISOString()) },
        { label: host.t('mute.forever'), icon: 'pi pi-bell-slash', command: () => mute(null) },
      ],
)
const roomOpen = ref(false)
const subtitle = computed(() => {
  if (props.conversation.archived) return host.t('room.archived')
  if (isRoom.value) return host.t('room.participants', { count: props.conversation.participantIds.length })
  return null
})
const typingText = computed(() => {
  const names = props.typing.map((id) => nameOf(id))
  if (!names.length) return null
  return names.length === 1 ? host.t('typing.one', { name: names[0] }) : host.t('typing.many', { names: names.join(', ') })
})

const gallery = ref<{ items: AttachmentView[]; index: number } | null>(null)
</script>

<template>
  <section class="chat-pane" :aria-label="titleOf(conversation)">
    <header class="chat-pane__header">
      <Button v-if="phone" icon="pi pi-arrow-left" text rounded severity="secondary" :aria-label="host.t('back')" @click="emit('back')" />
      <Avatar
        v-if="conversation.kind === 'Direct'"
        :image="avatarOf(otherOf(conversation)) ?? undefined"
        :label="avatarOf(otherOf(conversation)) ? undefined : initialOf(otherOf(conversation))"
        shape="circle"
      />
      <Avatar v-else :icon="isHome ? 'pi pi-home' : 'pi pi-hashtag'" shape="circle" />
      <div class="chat-pane__title">
        <h2>{{ titleOf(conversation) }}</h2>
        <p v-if="subtitle">{{ subtitle }}</p>
      </div>
      <Button
        :icon="conversation.muted ? 'pi pi-bell-slash' : 'pi pi-bell'"
        text
        rounded
        severity="secondary"
        :aria-label="host.t(conversation.muted ? 'mute.muted' : 'mute.title')"
        @click="muteMenu?.toggle($event)"
      />
      <Menu ref="muteMenu" :model="muteItems" popup />
      <Button v-if="isRoom" icon="pi pi-users" text rounded severity="secondary" :aria-label="host.t('room.details')" @click="roomOpen = true" />
    </header>

    <div ref="scroller" class="chat-pane__history" @scroll.passive="onScroll">
      <div v-if="thread.loading.value" class="chat-pane__loading">
        <Skeleton v-for="n in 4" :key="n" height="2.5rem" :width="n % 2 ? '60%' : '40%'" />
      </div>
      <template v-else>
        <div v-if="thread.loadingOlder.value" class="chat-pane__older"><ProgressSpinner style="width: 1.5rem; height: 1.5rem" stroke-width="6" /></div>
        <p v-else-if="!thread.hasOlder.value && conversation.readsFrom" class="chat-pane__note">{{ host.t('guest.readsFrom') }}</p>
        <p v-if="thread.failed.value" class="chat-pane__note">
          {{ host.t('loadFailed') }} <Button :label="host.t('retry')" text size="small" @click="thread.load()" />
        </p>
        <p v-else-if="!rows.length" class="chat-pane__note">{{ host.t(writable ? 'empty.writable' : 'empty.readOnly') }}</p>

        <template v-for="row in rows" :key="row.key">
          <div v-if="row.kind === 'day'" class="chat-pane__day"><span>{{ format.day(row.date) }}</span></div>
          <div v-else-if="row.kind === 'new'" class="chat-pane__new"><span>{{ host.t('newMessages') }}</span></div>
          <div v-else-if="row.kind === 'notice'" class="chat-pane__notice">{{ row.text }}</div>
          <MessageItem
            v-else-if="row.kind === 'message'"
            :message="row.message"
            :mine="row.mine"
            :lead="row.lead"
            :show-author="conversation.kind !== 'Direct'"
            :user-id="userId"
            :time="format.time(row.message.sentAt)"
            :name-of="nameOf"
            :avatar-of="avatarOf"
            :can-act="canAct(row.message)"
            :can-react="writable"
            :seen="row.message.id === seenId"
            :time-of="format.time"
            @menu="openMenu(row.message, $event)"
            @react="(emoji, mine) => react(row.message, emoji, mine)"
            @media="(items, index) => (gallery = { items, index })"
            @stale="thread.refreshMedia(row.message.id)"
            @decide="(id, approve, done) => decide(row.message, id, approve, done)"
          />
          <div v-else class="chat-outgoing" :class="{ 'chat-outgoing--failed': row.message.failed, 'chat-outgoing--lead': row.lead }">
            <div class="chat-outgoing__bubble">
              <div v-if="row.message.attachments.length" class="chat-outgoing__media">
                <img v-for="item in row.message.attachments" :key="item.id" :src="item.thumbUrl ?? undefined" alt="" />
              </div>
              <!-- eslint-disable-next-line vue/no-v-html -- sanitized in renderMarkdown -->
              <div v-if="row.message.text" v-html="renderMarkdown(row.message.text)" />
            </div>
            <div class="chat-outgoing__state">
              <template v-if="row.message.failed">
                <i class="pi pi-exclamation-circle" aria-hidden="true" /> {{ host.t('send.failed') }}
                <Button :label="host.t('retry')" text size="small" @click="thread.retry(row.message)" />
                <Button :label="host.t('send.discard')" text size="small" severity="secondary" @click="thread.discard(row.message)" />
              </template>
              <template v-else>{{ host.t('send.sending') }}</template>
            </div>
          </div>
        </template>
        <p v-if="typingText" class="chat-pane__typing" aria-live="polite">{{ typingText }}</p>
      </template>
    </div>

    <Button
      v-if="newBelow"
      class="chat-pane__down"
      :label="host.t('newMessages')"
      icon="pi pi-arrow-down"
      size="small"
      rounded
      @click="(toBottom(), markRead())"
    />

    <MessageComposer
      v-if="writable"
      :api="api"
      :hub="hub"
      :reply-to="replyTo"
      :editing="editing"
      :name-of="nameOf"
      :assistant="assistantOn && conversation.kind !== 'Direct'"
      @send="send"
      @save="saveEdit"
      @cancel-reply="replyTo = null"
      @cancel-edit="editing = null"
      @typing="hub.typing(conversation.id)"
    />
    <p v-else class="chat-pane__readonly">{{ host.t(conversation.archived ? 'room.archivedNote' : 'guest.readOnly') }}</p>

    <Menu ref="menu" :model="menuItems" popup>
      <template v-if="writable" #start>
        <div class="chat-reactions">
          <button v-for="emoji in REACTIONS" :key="emoji" type="button" :aria-label="host.t('message.react', { emoji })" @click="pickReaction(emoji)">
            {{ emoji }}
          </button>
        </div>
      </template>
    </Menu>

    <Dialog :visible="!!deleting" modal :header="host.t('message.delete')" :style="{ width: '22rem', maxWidth: '95vw' }" @update:visible="deleting = null">
      <p class="chat-pane__confirm">{{ host.t('message.deleteConfirm') }}</p>
      <template #footer>
        <Button :label="host.t('cancel')" severity="secondary" text @click="deleting = null" />
        <Button :label="host.t('message.delete')" severity="danger" @click="confirmDelete" />
      </template>
    </Dialog>

    <RoomPanel v-if="roomOpen && isRoom" :conversation="conversation" :chat="chat" @close="roomOpen = false" @left="emit('left')" />
    <MediaGallery v-if="gallery" :items="gallery.items" :start="gallery.index" @close="gallery = null" />
  </section>
</template>

<style scoped>
.chat-pane {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  min-height: 0;
  height: 100%;
}
.chat-pane__header {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.5rem 0.75rem;
  border-bottom: 1px solid var(--p-content-border-color);
}
.chat-pane__title {
  flex: 1;
  min-width: 0;
}
.chat-pane__title h2 {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.chat-pane__title p {
  margin: 0;
  font-size: 0.75rem;
  color: var(--p-text-muted-color);
}
.chat-pane__history {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding: 0.5rem 0 0.75rem;
  overscroll-behavior: contain;
}
.chat-pane__loading {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 0.75rem;
}
.chat-pane__older {
  display: flex;
  justify-content: center;
  padding: 0.5rem;
}
.chat-pane__note,
.chat-pane__notice,
.chat-pane__readonly {
  margin: 0;
  padding: 0.5rem 1rem;
  text-align: center;
  font-size: 0.85rem;
  color: var(--p-text-muted-color);
}
.chat-pane__readonly {
  border-top: 1px solid var(--p-content-border-color);
}
.chat-pane__day,
.chat-pane__new {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin: 0.75rem 0.75rem 0.25rem;
  font-size: 0.75rem;
  color: var(--p-text-muted-color);
}
.chat-pane__day::before,
.chat-pane__day::after,
.chat-pane__new::before,
.chat-pane__new::after {
  content: '';
  flex: 1;
  height: 1px;
  background: var(--p-content-border-color);
}
.chat-pane__new {
  color: var(--p-primary-color);
  font-weight: 600;
}
.chat-pane__new::before,
.chat-pane__new::after {
  background: var(--p-primary-color);
}
.chat-pane__typing {
  margin: 0.4rem 1rem 0;
  font-size: 0.8rem;
  font-style: italic;
  color: var(--p-text-muted-color);
}
.chat-pane__down {
  position: absolute;
  left: 50%;
  bottom: 5rem;
  transform: translateX(-50%);
  box-shadow: 0 2px 8px rgb(0 0 0 / 0.25);
}
.chat-pane__confirm {
  margin: 0;
}

.chat-outgoing {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 0.1rem 0.75rem;
}
.chat-outgoing--lead {
  margin-top: 0.6rem;
}
.chat-outgoing__bubble {
  max-width: min(36rem, 85%);
  padding: 0.45rem 0.7rem;
  border-radius: 1rem;
  background: var(--p-content-hover-background);
  color: var(--p-text-muted-color);
  overflow-wrap: anywhere;
}
.chat-outgoing__bubble :deep(p) {
  margin: 0;
}
.chat-outgoing__media {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
  margin-bottom: 0.25rem;
}
.chat-outgoing__media img {
  width: 4.5rem;
  height: 4.5rem;
  border-radius: 0.5rem;
  object-fit: cover;
  opacity: 0.6;
}
.chat-outgoing__state {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.7rem;
  color: var(--p-text-muted-color);
}
.chat-outgoing--failed .chat-outgoing__state {
  color: var(--p-red-500);
}

.chat-reactions {
  display: flex;
  gap: 0.1rem;
  padding: 0.35rem 0.5rem 0.1rem;
}
.chat-reactions button {
  padding: 0.2rem 0.3rem;
  border: 0;
  border-radius: 0.5rem;
  background: none;
  font-size: 1.25rem;
  cursor: pointer;
}
.chat-reactions button:hover {
  background: var(--p-content-hover-background);
}
</style>
