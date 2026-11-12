<script setup lang="ts">
import { computed, ref } from 'vue'
import type { ConversationView } from './api'
import type { Chat } from './useChat'

// The left column: "Dom" first, then rooms and direct conversations, each with its unread count.
const props = defineProps<{ chat: Chat; conversations: ConversationView[]; selectedId: string | null; formatWhen: (iso: string) => string }>()
const emit = defineEmits<{ select: [id: string]; newRoom: []; newDirect: [] }>()
const { host, titleOf, otherOf, avatarOf, initialOf, canRooms, canDirect, canSettings, assistantOn, changeSettings } = props.chat

// "JARVIS w czacie" (JV10): the household's Admin turns it on for all of its conversations except direct ones.
const savingAssistant = ref(false)
async function toggleAssistant(on: boolean) {
  savingAssistant.value = true
  try {
    await changeSettings({ assistant: on })
  } catch (error) {
    host.notify('error', host.errorMessage(error))
  } finally {
    savingAssistant.value = false
  }
}

const byRecent = (a: ConversationView, b: ConversationView) =>
  (b.lastMessageAt ?? b.createdAt).localeCompare(a.lastMessageAt ?? a.createdAt)
const home = computed(() => props.conversations.filter((c) => c.kind === 'Household'))
const rooms = computed(() => props.conversations.filter((c) => c.kind === 'Room' && !c.archived).sort(byRecent))
const direct = computed(() => props.conversations.filter((c) => c.kind === 'Direct').sort(byRecent))
const archived = computed(() => props.conversations.filter((c) => c.kind === 'Room' && c.archived).sort(byRecent))
const showArchived = ref(false)

const groups = computed(() =>
  [
    { key: 'home', label: null, items: home.value },
    { key: 'rooms', label: host.t('list.rooms'), items: rooms.value },
    { key: 'direct', label: host.t('list.direct'), items: direct.value },
    { key: 'archived', label: null, items: showArchived.value ? archived.value : [] },
  ].filter((g) => g.items.length),
)
</script>

<template>
  <nav class="chat-list" :aria-label="host.t('list.title')">
    <div v-if="canRooms || canDirect" class="chat-list__actions">
      <Button v-if="canRooms" :label="host.t('room.new')" icon="pi pi-plus" size="small" severity="secondary" outlined @click="emit('newRoom')" />
      <Button v-if="canDirect" :label="host.t('direct.new')" icon="pi pi-user" size="small" severity="secondary" outlined @click="emit('newDirect')" />
    </div>
    <template v-for="group in groups" :key="group.key">
      <h3 v-if="group.label">{{ group.label }}</h3>
      <button
        v-for="conversation in group.items"
        :key="conversation.id"
        type="button"
        class="chat-list__item"
        :class="{ active: conversation.id === selectedId, unread: conversation.unread > 0 }"
        @click="emit('select', conversation.id)"
      >
        <Avatar
          v-if="conversation.kind === 'Direct'"
          :image="avatarOf(otherOf(conversation)) ?? undefined"
          :label="avatarOf(otherOf(conversation)) ? undefined : initialOf(otherOf(conversation))"
          shape="circle"
        />
        <Avatar v-else :icon="conversation.kind === 'Household' ? 'pi pi-home' : conversation.archived ? 'pi pi-inbox' : 'pi pi-hashtag'" shape="circle" />
        <span class="chat-list__name">{{ titleOf(conversation) }}</span>
        <i v-if="conversation.muted" class="pi pi-bell-slash chat-list__muted" :title="host.t('mute.muted')" aria-hidden="true" />
        <Badge v-if="conversation.unread" :value="conversation.unread > 99 ? '99+' : conversation.unread" :severity="conversation.muted ? 'secondary' : undefined" />
        <span v-else-if="conversation.lastMessageAt" class="chat-list__when">{{ formatWhen(conversation.lastMessageAt) }}</span>
      </button>
    </template>
    <label v-if="canSettings" class="chat-list__assistant">
      <ToggleSwitch :model-value="assistantOn" :disabled="savingAssistant" @update:model-value="toggleAssistant" />
      <span>{{ host.t('assistant.setting') }}</span>
    </label>
    <button v-if="archived.length" type="button" class="chat-list__archive" @click="showArchived = !showArchived">
      <i :class="['pi', showArchived ? 'pi-chevron-up' : 'pi-chevron-down']" aria-hidden="true" />
      {{ host.t('list.archived', { count: archived.length }) }}
    </button>
  </nav>
</template>

<style scoped>
.chat-list {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  padding: 0.5rem;
  overflow-y: auto;
}
.chat-list__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 0.25rem 0.25rem 0.5rem;
}
.chat-list h3 {
  margin: 0.75rem 0.5rem 0.25rem;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--p-text-muted-color);
}
.chat-list__item {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.45rem 0.5rem;
  border: 0;
  border-radius: 0.6rem;
  background: none;
  color: inherit;
  text-align: left;
  cursor: pointer;
}
.chat-list__item:hover {
  background: var(--p-content-hover-background);
}
.chat-list__item.active {
  background: var(--p-highlight-background);
}
.chat-list__item.unread .chat-list__name {
  font-weight: 600;
}
.chat-list__name {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.chat-list__muted,
.chat-list__when {
  font-size: 0.75rem;
  color: var(--p-text-muted-color);
}
.chat-list__assistant {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: auto;
  padding: 0.75rem 0.5rem 0.25rem;
  font-size: 0.85rem;
  color: var(--p-text-muted-color);
}
.chat-list__archive {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
  padding: 0.4rem 0.5rem;
  border: 0;
  background: none;
  color: var(--p-text-muted-color);
  font-size: 0.85rem;
  text-align: left;
  cursor: pointer;
}
</style>
