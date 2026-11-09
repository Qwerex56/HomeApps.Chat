import type { AxiosInstance, AxiosProgressEvent } from 'axios'

// The plugin's API (Chat.Api, README "API"). Enums travel as their names, times as ISO strings.

export type ConversationKind = 'Household' | 'Room' | 'Direct'
export type MediaKind = 'Image' | 'Video'
export type AttachmentStatus = 'Pending' | 'Ready' | 'Failed' | 'Attached'

export interface ConversationView {
  id: string
  kind: ConversationKind
  /** "Dom", the room's name, null for a direct conversation (the other person's name comes from Households). */
  name: string | null
  keeperId: string | null
  participantIds: string[]
  createdAt: string
  lastMessageAt: string | null
  archived: boolean
  unread: number
  lastReadMessageId: string | null
  /** Direct only: how far the other person has read. */
  otherReadMessageId: string | null
  muted: boolean
  mutedUntil: string | null
  /** A guest reads from the day they joined; null when the whole history is visible. */
  readsFrom: string | null
}

export interface AttachmentView {
  id: string
  kind: MediaKind
  status: AttachmentStatus
  contentType: string
  size: number
  width: number | null
  height: number | null
  durationSeconds: number | null
  description: string | null
  failureCode: string | null
  originalUrl: string | null
  previewUrl: string | null
  thumbUrl: string | null
}

export interface MessageQuoteView {
  id: string
  visible: boolean
  authorId: string | null
  text: string | null
  attachments: number
  deleted: boolean
}

export interface ReactionView {
  emoji: string
  userIds: string[]
}

export interface MessageView {
  id: string
  conversationId: string
  authorId: string
  clientMessageId: string
  text: string | null
  replyTo: MessageQuoteView | null
  sentVia: 'App' | 'Mcp'
  sentAt: string
  editedAt: string | null
  deleted: boolean
  attachments: AttachmentView[]
  reactions: ReactionView[]
}

export interface UnreadView {
  messages: number
  conversations: number
}

/** A member as Households names them for everyone in the household, guests included. */
export interface MemberName {
  userId: string
  name: string
  avatarUrl: string | null
}

export interface NewMessage {
  clientMessageId: string
  text: string | null
  attachmentIds: string[]
  replyToId: string | null
}

export const PAGE_SIZE = 50

export function chatApi(http: AxiosInstance, apiBase: string, householdId: string) {
  const base = `${apiBase}/households/${householdId}`
  const get = async <T>(path: string, params?: Record<string, unknown>) => (await http.get<T>(`${base}${path}`, { params })).data

  return {
    conversations: () => get<ConversationView[]>('/conversations'),
    unread: () => get<UnreadView>('/unread'),
    members: async () => (await http.get<MemberName[]>(`/households/${householdId}/members/names`)).data,

    messages: (conversationId: string, cursor: { before?: string; after?: string } = {}, limit = PAGE_SIZE) =>
      get<MessageView[]>(`/conversations/${conversationId}/messages`, { ...cursor, limit }),
    message: (messageId: string) => get<MessageView>(`/messages/${messageId}`),
    send: async (conversationId: string, message: NewMessage) =>
      (await http.post<MessageView>(`${base}/conversations/${conversationId}/messages`, message)).data,
    edit: (messageId: string, text: string) => http.put(`${base}/messages/${messageId}`, { text }),
    remove: (messageId: string) => http.delete(`${base}/messages/${messageId}`),
    react: (messageId: string, emoji: string) => http.put(`${base}/messages/${messageId}/reactions/${encodeURIComponent(emoji)}`),
    unreact: (messageId: string, emoji: string) => http.delete(`${base}/messages/${messageId}/reactions/${encodeURIComponent(emoji)}`),
    markRead: (conversationId: string, messageId: string) => http.put(`${base}/conversations/${conversationId}/read`, { messageId }),

    mute: (conversationId: string, until: string | null) => http.put(`${base}/conversations/${conversationId}/mute`, { until }),
    unmute: (conversationId: string) => http.delete(`${base}/conversations/${conversationId}/mute`),

    startDirect: async (userId: string) => (await http.post<{ id: string }>(`${base}/conversations/direct`, { userId })).data.id,
    createRoom: async (name: string, participantIds: string[]) =>
      (await http.post<{ id: string }>(`${base}/rooms`, { name, participantIds })).data.id,
    renameRoom: (conversationId: string, name: string) => http.put(`${base}/rooms/${conversationId}`, { name }),
    addParticipants: (conversationId: string, userIds: string[]) => http.post(`${base}/rooms/${conversationId}/participants`, { userIds }),
    removeParticipant: (conversationId: string, userId: string) => http.delete(`${base}/rooms/${conversationId}/participants/${userId}`),
    leaveRoom: (conversationId: string, successorId: string | null) => http.post(`${base}/rooms/${conversationId}/leave`, { successorId }),
    archiveRoom: (conversationId: string) => http.post(`${base}/rooms/${conversationId}/archive`),

    upload: async (file: File, onProgress: (fraction: number) => void, signal?: AbortSignal) => {
      const form = new FormData()
      form.append('file', file)
      const response = await http.post<AttachmentView>(`${base}/attachments`, form, {
        signal,
        onUploadProgress: (event: AxiosProgressEvent) => onProgress(event.total ? event.loaded / event.total : 0),
      })
      return response.data
    },
    attachment: (attachmentId: string) => get<AttachmentView>(`/attachments/${attachmentId}`),
  }
}

export type ChatApi = ReturnType<typeof chatApi>

/** The service's error code from a failed request (ProblemDetails.code), if any. */
export function errorCode(error: unknown): string | null {
  const data = (error as { response?: { data?: { code?: unknown } } })?.response?.data
  return typeof data?.code === 'string' ? data.code : null
}

/** A UUID for clientMessageId; crypto.randomUUID needs HTTPS or localhost, a home server on plain HTTP has neither. */
export function newId(): string {
  if (typeof crypto.randomUUID === 'function') return crypto.randomUUID()
  const bytes = crypto.getRandomValues(new Uint8Array(16))
  bytes[6] = (bytes[6]! & 0x0f) | 0x40
  bytes[8] = (bytes[8]! & 0x3f) | 0x80
  const hex = [...bytes].map((b) => b.toString(16).padStart(2, '0')).join('')
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`
}
