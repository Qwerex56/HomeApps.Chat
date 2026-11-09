<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type { ChatApi, ConversationView } from './api'
import type { Chat } from './useChat'
import RoomDialog from './RoomDialog.vue'

// The room's side panel: who is in it, and for the keeper the name, removing people and the archive. Anyone with
// chat.rooms adds people; anyone leaves, and a keeper who leaves names the next keeper.
const props = defineProps<{ conversation: ConversationView; chat: Chat }>()
const emit = defineEmits<{ close: []; left: [] }>()
const { host, userId, nameOf, avatarOf, initialOf, canRooms } = props.chat

const isKeeper = computed(() => props.conversation.keeperId === userId.value)
const open = computed(() => !props.conversation.archived)
const others = computed(() => props.conversation.participantIds.filter((id) => id !== userId.value))
const candidates = computed(() =>
  (props.chat.members.data.value ?? []).filter((m) => !props.conversation.participantIds.includes(m.userId)),
)

const busy = ref(false)
async function run(action: (api: ChatApi) => Promise<unknown>, after?: () => void) {
  busy.value = true
  try {
    await action(props.chat.api.value)
    after?.()
  } catch (error) {
    host.notify('error', host.errorMessage(error))
  } finally {
    busy.value = false
    void props.chat.refreshConversations()
  }
}

const name = ref(props.conversation.name ?? '')
watch(
  () => props.conversation.name,
  (value) => (name.value = value ?? ''),
)
const nameChanged = computed(() => name.value.trim().length > 0 && name.value.trim() !== props.conversation.name)
const rename = () => nameChanged.value && run((api) => api.renameRoom(props.conversation.id, name.value.trim()))

const adding = ref(false)
const add = (userIds: string[]) => run((api) => api.addParticipants(props.conversation.id, userIds), () => (adding.value = false))
const remove = (id: string) => run((api) => api.removeParticipant(props.conversation.id, id))

// Leaving: a keeper with others still in the room must say who keeps it next.
const leaving = ref(false)
const successor = ref<string | null>(null)
const needsSuccessor = computed(() => isKeeper.value && others.value.length > 0)
const successorOptions = computed(() => others.value.map((id) => ({ id, name: nameOf(id) })))
const leave = () =>
  run(
    (api) => api.leaveRoom(props.conversation.id, needsSuccessor.value ? successor.value : null),
    () => emit('left'),
  )

const archiving = ref(false)
const archive = () => run((api) => api.archiveRoom(props.conversation.id), () => (archiving.value = false))
</script>

<template>
  <Drawer visible position="right" :header="conversation.name ?? ''" class="chat-room-drawer" @update:visible="emit('close')">
    <div class="chat-room">
      <Message v-if="conversation.archived" severity="secondary" :closable="false">{{ host.t('room.archivedNote') }}</Message>

      <form v-if="isKeeper && open" class="chat-room__rename" @submit.prevent="rename">
        <label>
          <span>{{ host.t('room.name') }}</span>
          <InputText v-model="name" maxlength="60" />
        </label>
        <Button type="submit" :label="host.t('save')" :disabled="!nameChanged" :loading="busy" />
      </form>

      <section>
        <h3>{{ host.t('room.participants', { count: conversation.participantIds.length }) }}</h3>
        <ul class="chat-room__people">
          <li v-for="id in conversation.participantIds" :key="id">
            <Avatar :image="avatarOf(id) ?? undefined" :label="avatarOf(id) ? undefined : initialOf(id)" shape="circle" />
            <span class="chat-room__person">{{ nameOf(id) }}<template v-if="id === userId"> ({{ host.t('you') }})</template></span>
            <Tag v-if="id === conversation.keeperId" :value="host.t('room.keeper')" severity="secondary" />
            <Button
              v-else-if="isKeeper && open"
              icon="pi pi-user-minus"
              text
              rounded
              size="small"
              severity="secondary"
              :aria-label="host.t('room.remove', { name: nameOf(id) })"
              :disabled="busy"
              @click="remove(id)"
            />
          </li>
        </ul>
        <Button
          v-if="canRooms && open"
          :label="host.t('room.addPeople')"
          icon="pi pi-user-plus"
          severity="secondary"
          outlined
          size="small"
          @click="adding = true"
        />
      </section>

      <section v-if="conversation.participantIds.includes(userId ?? '')" class="chat-room__danger">
        <template v-if="leaving">
          <label v-if="needsSuccessor">
            <span>{{ host.t('room.successor') }}</span>
            <Select
              v-model="successor"
              :options="successorOptions"
              option-label="name"
              option-value="id"
              :placeholder="host.t('room.successorPlaceholder')"
            />
          </label>
          <p v-else>{{ host.t(others.length ? 'room.leaveConfirm' : 'room.leaveLastConfirm') }}</p>
          <div class="chat-room__buttons">
            <Button :label="host.t('cancel')" severity="secondary" text @click="leaving = false" />
            <Button
              :label="host.t('room.leave')"
              severity="danger"
              :disabled="needsSuccessor && !successor"
              :loading="busy"
              @click="leave"
            />
          </div>
        </template>
        <template v-else-if="archiving">
          <p>{{ host.t('room.archiveConfirm') }}</p>
          <div class="chat-room__buttons">
            <Button :label="host.t('cancel')" severity="secondary" text @click="archiving = false" />
            <Button :label="host.t('room.archive')" severity="danger" :loading="busy" @click="archive" />
          </div>
        </template>
        <template v-else>
          <Button :label="host.t('room.leave')" icon="pi pi-sign-out" severity="danger" outlined size="small" @click="leaving = true" />
          <Button
            v-if="isKeeper && open"
            :label="host.t('room.archive')"
            icon="pi pi-inbox"
            severity="secondary"
            outlined
            size="small"
            @click="archiving = true"
          />
        </template>
      </section>
    </div>

    <RoomDialog v-if="adding" mode="add" :members="candidates" :busy="busy" @submit="(_name, ids) => add(ids)" @close="adding = false" />
  </Drawer>
</template>

<style scoped>
.chat-room,
.chat-room section,
.chat-room label {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
.chat-room {
  gap: 1.5rem;
}
.chat-room label {
  gap: 0.35rem;
}
.chat-room label > span {
  font-size: 0.875rem;
  color: var(--p-text-muted-color);
}
.chat-room__rename {
  display: flex;
  align-items: flex-end;
  gap: 0.5rem;
}
.chat-room__rename label {
  flex: 1;
  min-width: 0;
}
.chat-room h3 {
  margin: 0;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--p-text-muted-color);
}
.chat-room__people {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin: 0;
  padding: 0;
  list-style: none;
}
.chat-room__people li {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  min-height: 2.25rem;
}
.chat-room__person {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.chat-room section > .p-button {
  align-self: flex-start;
}
.chat-room__danger p {
  margin: 0;
}
.chat-room__buttons {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}
</style>
