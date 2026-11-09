<script setup lang="ts">
import { computed, ref } from 'vue'
import { useHost } from '@homeapps/plugin-sdk'
import type { MemberName } from './api'
import MemberPicker from './MemberPicker.vue'

// "Nowy pokój" (a name and who is in it) or "Dodaj osoby" to a room that exists.
const props = defineProps<{ mode: 'create' | 'add'; members: MemberName[]; busy: boolean }>()
const emit = defineEmits<{ submit: [name: string, userIds: string[]]; close: [] }>()
const host = useHost()

const NAME_MAX = 60
const name = ref('')
const chosen = ref<string[]>([])
const valid = computed(() => (props.mode === 'add' ? chosen.value.length > 0 : name.value.trim().length > 0))

function submit() {
  if (valid.value && !props.busy) emit('submit', name.value.trim(), chosen.value)
}
</script>

<template>
  <Dialog
    visible
    modal
    :header="host.t(mode === 'create' ? 'room.new' : 'room.addPeople')"
    :style="{ width: '24rem', maxWidth: '95vw' }"
    @update:visible="emit('close')"
  >
    <form class="chat-room-dialog" @submit.prevent="submit">
      <label v-if="mode === 'create'" class="chat-room-dialog__field">
        <span>{{ host.t('room.name') }}</span>
        <InputText v-model="name" :maxlength="NAME_MAX" autofocus />
      </label>
      <div class="chat-room-dialog__field">
        <span>{{ host.t('room.people') }}</span>
        <MemberPicker v-if="members.length" v-model="chosen" :members="members" />
        <p v-else class="chat-room-dialog__empty">{{ host.t('room.nobodyToAdd') }}</p>
      </div>
      <div class="chat-room-dialog__actions">
        <Button type="button" :label="host.t('cancel')" severity="secondary" text @click="emit('close')" />
        <Button type="submit" :label="host.t(mode === 'create' ? 'create' : 'add')" :disabled="!valid" :loading="busy" />
      </div>
    </form>
  </Dialog>
</template>

<style scoped>
.chat-room-dialog,
.chat-room-dialog__field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.chat-room-dialog {
  gap: 1rem;
}
.chat-room-dialog__field > span {
  font-size: 0.875rem;
  color: var(--p-text-muted-color);
}
.chat-room-dialog__empty {
  margin: 0;
  color: var(--p-text-muted-color);
}
.chat-room-dialog__actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}
</style>
