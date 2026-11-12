import { computed, toValue, type MaybeRefOrGetter } from 'vue'
import { useQuery, useQueryClient } from '@tanstack/vue-query'
import { useHost } from '@homeapps/plugin-sdk'
import { ASSISTANT_ID, chatApi, type ConversationView, type SettingsView } from './api'

/** Without the hub (or between its reconnections) the list still catches up. */
export const REFRESH_MS = 60_000

export const keys = {
  all: (householdId: string) => ['plugins', 'chat', householdId] as const,
  conversations: (householdId: string) => ['plugins', 'chat', householdId, 'conversations'] as const,
  members: (householdId: string) => ['plugins', 'chat', householdId, 'members'] as const,
  settings: (householdId: string) => ['plugins', 'chat', householdId, 'settings'] as const,
  recent: (householdId: string, conversationId: string | null) => ['plugins', 'chat', householdId, 'recent', conversationId] as const,
}

/** The plugin's API, the conversation list, names and the permission checks for one household. */
export function useChat(householdId: MaybeRefOrGetter<string>) {
  const host = useHost()
  const queryClient = useQueryClient()
  const id = computed(() => toValue(householdId))
  const api = computed(() => chatApi(host.http, host.apiBase, id.value))
  const userId = computed(() => host.user.value?.id ?? null)

  const conversations = useQuery({
    queryKey: computed(() => keys.conversations(id.value)),
    queryFn: () => api.value.conversations(),
    refetchInterval: REFRESH_MS,
  })

  // Names and avatars for everyone in the household, guests included (decision C4).
  const members = useQuery({
    queryKey: computed(() => keys.members(id.value)),
    queryFn: () => api.value.members(),
    staleTime: 60_000,
  })
  const member = (userId: string | null | undefined) => (userId ? members.data.value?.find((m) => m.userId === userId) : undefined)
  const nameOf = (userId: string | null | undefined) =>
    userId === ASSISTANT_ID ? host.t('assistant.name') : (member(userId)?.name ?? host.t('someone'))

  // Whether JARVIS listens in this household's chats (JV10); the @ hint offers him only then.
  const settings = useQuery({
    queryKey: computed(() => keys.settings(id.value)),
    queryFn: () => api.value.settings(),
    staleTime: 60_000,
  })
  const changeSettings = async (next: SettingsView) => {
    queryClient.setQueryData(keys.settings(id.value), await api.value.changeSettings(next))
  }
  const avatarOf = (userId: string | null | undefined) => member(userId)?.avatarUrl ?? null
  const initialOf = (userId: string | null | undefined) => nameOf(userId).trim().charAt(0).toUpperCase() || '?'

  /** The other person in a direct conversation. */
  const otherOf = (conversation: ConversationView) => conversation.participantIds.find((p) => p !== userId.value) ?? null
  const titleOf = (conversation: ConversationView) =>
    conversation.kind === 'Direct' ? nameOf(otherOf(conversation)) : conversation.kind === 'Household' ? host.t('home') : (conversation.name ?? '')

  return {
    host,
    api,
    householdId: id,
    userId,
    conversations,
    members,
    nameOf,
    avatarOf,
    initialOf,
    otherOf,
    titleOf,
    refreshConversations: () => queryClient.invalidateQueries({ queryKey: keys.conversations(id.value) }),
    refreshMembers: () => queryClient.invalidateQueries({ queryKey: keys.members(id.value) }),
    canWrite: computed(() => host.can('chat.write')),
    canDirect: computed(() => host.can('chat.direct')),
    canRooms: computed(() => host.can('chat.rooms')),
    canModerate: computed(() => host.can('chat.moderate')),
    canSettings: computed(() => host.can('chat.settings')),
    assistantOn: computed(() => settings.data.value?.assistant ?? false),
    changeSettings,
  }
}

export type Chat = ReturnType<typeof useChat>
