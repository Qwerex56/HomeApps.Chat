<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useHost } from '@homeapps/plugin-sdk'
import { useFormat } from './format'
import { ASSISTANT_ID } from './api'
import { createHub } from './hub'
import { useChat } from './useChat'
import ConversationList from './ConversationList.vue'
import ConversationPane from './ConversationPane.vue'
import RoomDialog from './RoomDialog.vue'

// "Czat": conversations on the left, the chosen one on the right; on a phone the list, then the conversation on the
// whole screen. The conversation on screen is in the address (?c=…), which is also where a notification leads.
const host = useHost()
const chat = useChat(() => host.household.value!.id)
const { conversations, members, userId, nameOf, avatarOf, initialOf } = chat
const format = useFormat()
const route = useRoute()
const router = useRouter()

const hub = createHub(host.manifest.endpoints.realtime ?? '/plugins/chat/hub', host.accessToken, host.household.value!.id)
onUnmounted(() => hub.stop())

// --- Phone or desktop --------------------------------------------------------------------------------------------
const narrow = window.matchMedia('(max-width: 767px)')
const phone = ref(narrow.matches)
const onNarrow = () => (phone.value = narrow.matches)
narrow.addEventListener('change', onNarrow)
onUnmounted(() => narrow.removeEventListener('change', onNarrow))

// --- The conversation on screen ----------------------------------------------------------------------------------
const all = computed(() => conversations.data.value ?? [])
const asked = computed(() => (typeof route.query.c === 'string' ? route.query.c : null))
const selected = computed(() => {
  const wanted = all.value.find((c) => c.id === asked.value)
  // A desktop always shows something: the household's conversation unless another is chosen.
  return wanted ?? (phone.value ? null : (all.value.find((c) => c.kind === 'Household') ?? null))
})
function select(id: string | null) {
  const { c: _dropped, ...rest } = route.query
  const query = id ? { ...rest, c: id } : rest
  // On a phone the browser's Back leads from the conversation to the list.
  void (id && phone.value && !asked.value ? router.push({ query }) : router.replace({ query }))
}

// The server sends no push notification from the conversation someone is looking at.
const visible = ref(document.visibilityState === 'visible')
const onVisibility = () => (visible.value = document.visibilityState === 'visible')
document.addEventListener('visibilitychange', onVisibility)
onUnmounted(() => document.removeEventListener('visibilitychange', onVisibility))
watch([() => selected.value?.id ?? null, visible], ([id, isVisible]) => hub.open(isVisible ? id : null), { immediate: true })

// --- Signals -----------------------------------------------------------------------------------------------------
const TYPING_MS = 5_000
/** JARVIS's run ends within two minutes (Jarvis:ClaudeCode:Timeout). */
const ASSISTANT_MS = 120_000
const typing = ref<{ conversationId: string; userId: string; until: number }[]>([])
const stopTyping = (conversationId: string, typist: string) =>
  (typing.value = typing.value.filter((t) => !(t.conversationId === conversationId && t.userId === typist)))
const typingIn = (conversationId: string) => typing.value.filter((t) => t.conversationId === conversationId).map((t) => t.userId)

const off = [
  hub.on('MessageSent', (signal) => {
    if (signal.authorId) stopTyping(signal.conversationId, signal.authorId)
    void chat.refreshConversations()
  }),
  hub.on('ReadMarkerMoved', () => void chat.refreshConversations()),
  hub.on('ConversationChanged', () => void chat.refreshConversations()),
  hub.on('AccessChanged', () => {
    void chat.refreshConversations()
    void chat.refreshMembers()
  }),
  hub.on('Typing', (signal) => {
    if (signal.userId === userId.value) return
    stopTyping(signal.conversationId, signal.userId)
    const until = Date.now() + TYPING_MS
    typing.value.push({ conversationId: signal.conversationId, userId: signal.userId, until })
    setTimeout(() => (typing.value = typing.value.filter((t) => t.until > Date.now())), TYPING_MS + 50)
  }),
  // JARVIS shows like someone typing until his answer arrives (or for as long as a run may take).
  hub.on('AssistantWorking', (signal) => {
    stopTyping(signal.conversationId, ASSISTANT_ID)
    const until = Date.now() + ASSISTANT_MS
    typing.value.push({ conversationId: signal.conversationId, userId: ASSISTANT_ID, until })
    setTimeout(() => (typing.value = typing.value.filter((t) => t.until > Date.now())), ASSISTANT_MS + 50)
  }),
  hub.onReconnected(() => void chat.refreshConversations()),
]
onUnmounted(() => off.forEach((stop) => stop()))

// --- New room, new direct conversation ---------------------------------------------------------------------------
const others = computed(() => (members.data.value ?? []).filter((m) => m.userId !== userId.value))
const dialog = ref<'room' | 'direct' | null>(null)
const busy = ref(false)
async function start(action: () => Promise<string>) {
  busy.value = true
  try {
    const id = await action()
    await chat.refreshConversations()
    dialog.value = null
    select(id)
  } catch (error) {
    host.notify('error', host.errorMessage(error))
  } finally {
    busy.value = false
  }
}
const createRoom = (name: string, userIds: string[]) => start(() => chat.api.value.createRoom(name, userIds))
const startDirect = (id: string) => start(() => chat.api.value.startDirect(id))

// --- Height: the page fills what is left of the window below the household's header ------------------------------
const root = ref<HTMLElement | null>(null)
const top = ref(0)
const measure = () => root.value && (top.value = root.value.getBoundingClientRect().top + window.scrollY)
onMounted(() => {
  measure()
  window.addEventListener('resize', measure)
})
onUnmounted(() => window.removeEventListener('resize', measure))
const height = computed(() => (phone.value ? undefined : `max(26rem, calc(100dvh - ${Math.round(top.value)}px - 1.5rem))`))
</script>

<template>
  <div ref="root" class="chat-page" :class="{ 'chat-page--phone': phone, 'chat-page--open': !!selected }" :style="{ height }">
    <Message v-if="conversations.isError.value" severity="error" :closable="false">{{ host.errorMessage(conversations.error.value) }}</Message>
    <div v-else-if="conversations.isPending.value" class="chat-page__loading">
      <Skeleton v-for="n in 4" :key="n" height="2.5rem" />
    </div>
    <template v-else>
      <ConversationList
        v-if="!phone || !selected"
        class="chat-page__list"
        :chat="chat"
        :conversations="all"
        :selected-id="selected?.id ?? null"
        :format-when="format.when"
        @select="select"
        @new-room="dialog = 'room'"
        @new-direct="dialog = 'direct'"
      />
      <div v-if="selected" class="chat-page__pane">
        <ConversationPane
          :key="selected.id"
          :chat="chat"
          :hub="hub"
          :conversation="selected"
          :typing="typingIn(selected.id)"
          :phone="phone"
          @back="select(null)"
          @left="select(null)"
        />
      </div>
    </template>

    <RoomDialog v-if="dialog === 'room'" mode="create" :members="others" :busy="busy" @submit="createRoom" @close="dialog = null" />
    <Dialog
      :visible="dialog === 'direct'"
      modal
      :header="host.t('direct.new')"
      :style="{ width: '22rem', maxWidth: '95vw' }"
      @update:visible="dialog = null"
    >
      <ul v-if="others.length" class="chat-page__people">
        <li v-for="member in others" :key="member.userId">
          <button type="button" :disabled="busy" @click="startDirect(member.userId)">
            <Avatar :image="avatarOf(member.userId) ?? undefined" :label="avatarOf(member.userId) ? undefined : initialOf(member.userId)" shape="circle" />
            <span>{{ nameOf(member.userId) }}</span>
          </button>
        </li>
      </ul>
      <p v-else class="chat-page__nobody">{{ host.t('direct.empty') }}</p>
    </Dialog>
  </div>
</template>

<style scoped>
.chat-page {
  display: grid;
  grid-template-columns: 17rem minmax(0, 1fr);
  border: 1px solid var(--p-content-border-color);
  border-radius: var(--p-content-border-radius, 0.75rem);
  background: var(--p-content-background);
  overflow: hidden;
}
.chat-page__list {
  border-right: 1px solid var(--p-content-border-color);
  min-height: 0;
}
.chat-page__pane {
  min-width: 0;
  min-height: 0;
}
.chat-page__loading {
  grid-column: 1 / -1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.75rem;
}

/* Phone: the list alone, then the conversation over the whole screen. */
.chat-page--phone {
  display: block;
}
.chat-page--phone .chat-page__list {
  border-right: 0;
}
.chat-page--phone .chat-page__pane {
  position: fixed;
  inset: 0;
  z-index: 900;
  height: 100dvh;
  background: var(--p-content-background);
}

.chat-page__people {
  margin: 0;
  padding: 0;
  list-style: none;
}
.chat-page__people button {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.45rem 0.5rem;
  border: 0;
  border-radius: 0.6rem;
  background: none;
  color: inherit;
  text-align: left;
  cursor: pointer;
}
.chat-page__people button:hover {
  background: var(--p-content-hover-background);
}
.chat-page__nobody {
  margin: 0;
  color: var(--p-text-muted-color);
}
</style>
