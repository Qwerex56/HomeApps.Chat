<script setup lang="ts">
import type { MemberName } from './api'

// Household members with checkboxes: who joins a room.
defineProps<{ members: MemberName[] }>()
const chosen = defineModel<string[]>({ required: true })

function toggle(userId: string) {
  chosen.value = chosen.value.includes(userId) ? chosen.value.filter((id) => id !== userId) : [...chosen.value, userId]
}
</script>

<template>
  <ul class="chat-picker">
    <li v-for="member in members" :key="member.userId">
      <label>
        <Checkbox :model-value="chosen.includes(member.userId)" binary @update:model-value="toggle(member.userId)" />
        <Avatar
          :image="member.avatarUrl ?? undefined"
          :label="member.avatarUrl ? undefined : member.name.charAt(0).toUpperCase()"
          shape="circle"
        />
        <span>{{ member.name }}</span>
      </label>
    </li>
  </ul>
</template>

<style scoped>
.chat-picker {
  list-style: none;
  margin: 0;
  padding: 0;
  max-height: 16rem;
  overflow-y: auto;
}
.chat-picker label {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.4rem 0.25rem;
  cursor: pointer;
}
</style>
