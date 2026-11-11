<script setup lang="ts">
import { computed, onUnmounted } from 'vue'
import { useQuery, useQueryClient } from '@tanstack/vue-query'
import type { WidgetProps } from '@homeapps/plugin-sdk'
import type { MessageView } from './api'
import { useFormat } from './format'
import { createHub } from './hub'
import { plainText } from './markdown'
import { keys, REFRESH_MS, useChat } from './useChat'

// "Czat" on the household's page: the last messages of "Dom" and how much is unread everywhere. Text only, no
// Markdown; writing happens on the chat page.
const props = defineProps<WidgetProps>()
const chat = useChat(() => props.householdId)
const { host, api, conversations, nameOf } = chat
const format = useFormat()
const queryClient = useQueryClient()

const SHOWN = 4
const home = computed(() => conversations.data.value?.find((c) => c.kind === 'Household') ?? null)
const unread = computed(() => (conversations.data.value ?? []).reduce((sum, c) => sum + c.unread, 0))

const recent = useQuery({
  queryKey: computed(() => keys.recent(props.householdId, home.value?.id ?? null)),
  // A few more than shown: deleted messages are left out.
  queryFn: () => api.value.messages(home.value!.id, {}, SHOWN * 2),
  enabled: computed(() => !!home.value),
  refetchInterval: REFRESH_MS,
})
const shown = computed(() => (recent.data.value ?? []).filter((m) => !m.deleted).slice(-SHOWN))

const hub = createHub(host.manifest.endpoints.realtime ?? '/plugins/chat/hub', host.accessToken, props.householdId)
const refresh = () => queryClient.invalidateQueries({ queryKey: keys.all(props.householdId) })
const off = [
  hub.on('MessageSent', refresh),
  hub.on('MessageEdited', refresh),
  hub.on('MessageDeleted', refresh),
  hub.on('ReadMarkerMoved', refresh),
  hub.on('ConversationChanged', refresh),
  hub.onReconnected(refresh),
]
onUnmounted(() => {
  off.forEach((stop) => stop())
  hub.stop()
})

// One file by its kind, several as a count.
const describeMedia = (files: MessageView['attachments']) =>
  files.length === 1 ? host.t(files[0]!.kind === 'Video' ? 'media.video' : 'media.photo') : host.t('media.count', { count: files.length })

const chatPage = computed(() => `/homes/${props.householdId}/apps/chat`)
</script>

<template>
  <div class="chat-widget">
    <div v-if="conversations.isPending.value || recent.isPending.value" class="chat-widget__loading">
      <Skeleton v-for="n in 3" :key="n" height="1.5rem" />
    </div>
    <template v-else>
      <ul v-if="shown.length" class="chat-widget__messages">
        <li v-for="message in shown" :key="message.id">
          <strong>{{ nameOf(message.authorId) }}</strong>
          <span class="chat-widget__text">
            {{ plainText(message.text, 120) || describeMedia(message.attachments) }}
          </span>
          <time :datetime="message.sentAt">{{ format.when(message.sentAt) }}</time>
        </li>
      </ul>
      <p v-else class="chat-widget__empty">{{ host.t('widget.empty') }}</p>
      <RouterLink :to="chatPage" class="chat-widget__open">
        <i class="pi pi-comments" aria-hidden="true" />
        <span>{{ host.t('widget.open') }}</span>
        <Badge v-if="unread" :value="unread > 99 ? '99+' : unread" :aria-label="host.t('widget.unread', { count: unread })" />
      </RouterLink>
    </template>
  </div>
</template>

<style scoped>
.chat-widget__loading,
.chat-widget__messages {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin: 0;
  padding: 0;
  list-style: none;
}
.chat-widget__messages li {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  min-width: 0;
}
.chat-widget__messages strong {
  flex-shrink: 0;
  font-weight: 600;
}
.chat-widget__text {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.chat-widget__messages time {
  flex-shrink: 0;
  font-size: 0.75rem;
  color: var(--p-text-muted-color);
}
.chat-widget__empty {
  margin: 0;
  color: var(--p-text-muted-color);
}
.chat-widget__open {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.75rem;
  color: var(--p-primary-color);
  font-size: 0.9rem;
}
.chat-widget__open:hover span {
  text-decoration: underline;
}
</style>
