<script setup lang="ts">
import { ref } from 'vue'
import { useHost } from '@homeapps/plugin-sdk'
import type { AssistantAction } from './api'

// JARVIS's card under his message (jarvis-v1.md 5.4): what he did, and what waits. Everyone sees the state; only the
// person who asked gets the buttons, for 10 minutes.
const props = defineProps<{
  actions: AssistantAction[]
  canDecide: boolean
  time: (iso: string) => string
}>()
const emit = defineEmits<{
  decide: [confirmationId: string, approve: boolean, done: () => void]
}>()
const host = useHost()
const busy = ref<string | null>(null)

const icons: Record<string, string> = {
  Done: 'pi pi-check-circle',
  Failed: 'pi pi-times-circle',
  NeedsConfirmation: 'pi pi-question-circle',
  Denied: 'pi pi-ban',
  Expired: 'pi pi-clock',
}

/** A waiting line past its time shows as expired before JARVIS says so. */
const statusOf = (action: AssistantAction) =>
  action.status === 'NeedsConfirmation' && action.confirmBy && Date.parse(action.confirmBy) < Date.now()
    ? 'Expired'
    : action.status

function decide(action: AssistantAction, approve: boolean) {
  if (!action.confirmationId) return
  busy.value = action.confirmationId
  emit('decide', action.confirmationId, approve, () => (busy.value = null))
}
</script>

<template>
  <ul class="chat-card" :aria-label="host.t('assistant.actions')">
    <li
      v-for="(action, index) in props.actions"
      :key="action.confirmationId ?? index"
      :class="`chat-card__line--${statusOf(action)}`"
    >
      <div class="chat-card__line">
        <i :class="icons[statusOf(action)] ?? 'pi pi-circle'" aria-hidden="true" />
        <span class="chat-card__text">{{ action.description }}</span>
        <span class="chat-card__status">{{ host.t(`assistant.status.${statusOf(action)}`) }}</span>
      </div>
      <div v-if="statusOf(action) === 'NeedsConfirmation' && canDecide" class="chat-card__decide">
        <Button
          :label="host.t('assistant.confirm')"
          size="small"
          :loading="busy === action.confirmationId"
          @click="decide(action, true)"
        />
        <Button
          :label="host.t('assistant.cancel')"
          size="small"
          severity="secondary"
          :disabled="busy === action.confirmationId"
          @click="decide(action, false)"
        />
        <span v-if="action.confirmBy" class="chat-card__until">{{
          host.t('assistant.until', { time: time(action.confirmBy) })
        }}</span>
      </div>
      <p v-else-if="statusOf(action) === 'NeedsConfirmation'" class="chat-card__until">
        {{ host.t('assistant.waitsForAsker') }}
      </p>
      <p v-else-if="statusOf(action) === 'Expired'" class="chat-card__until">
        {{ host.t('assistant.expired') }}
      </p>
    </li>
  </ul>
</template>

<style scoped>
.chat-card {
  list-style: none;
  margin: 0.35rem 0 0;
  padding: 0.5rem 0.65rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  border: 1px solid var(--p-content-border-color);
  border-radius: 0.6rem;
  font-size: 0.85rem;
  max-width: 28rem;
}
.chat-card__line {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
}
.chat-card__line i {
  margin-top: 0.15rem;
}
.chat-card__line--Done i {
  color: var(--p-green-600);
}
.chat-card__line--Failed i {
  color: var(--p-red-600);
}
.chat-card__line--NeedsConfirmation i {
  color: var(--p-amber-600);
}
.chat-card__text {
  flex: 1;
  overflow-wrap: anywhere;
}
.chat-card__status,
.chat-card__until {
  margin: 0;
  font-size: 0.75rem;
  color: var(--p-text-muted-color);
}
.chat-card__decide {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding-left: 1.5rem;
  margin-top: 0.25rem;
}
</style>
