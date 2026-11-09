import { ref, shallowRef, watch, type Ref } from 'vue'
import { newId, PAGE_SIZE, type AttachmentView, type ChatApi, type MessageView } from './api'
import type { Notice, Outgoing } from './timeline'

/**
 * The messages of the conversation on screen: the newest page first, older ones on demand, new ones after a signal.
 * Sending is optimistic: the message shows at once and is replaced by the server's when it arrives.
 */
export function useThread(api: Ref<ChatApi>, conversationId: Ref<string | null>, onError: (error: unknown) => void) {
  const messages = shallowRef<MessageView[]>([])
  const outgoing = ref<Outgoing[]>([])
  const notices = ref<Notice[]>([])
  const loading = ref(false)
  const loadingOlder = ref(false)
  const hasOlder = ref(false)
  const failed = ref(false)

  // Answers for a conversation that is no longer on screen are dropped.
  let generation = 0
  let queue: Promise<void> = Promise.resolve()
  const refreshedForMedia = new Set<string>()

  const merge = (current: MessageView[], more: MessageView[]) => {
    const known = new Set(current.map((m) => m.id))
    return [...current, ...more.filter((m) => !known.has(m.id))]
  }
  const dropConfirmed = () => {
    const confirmed = new Set(messages.value.map((m) => m.clientMessageId))
    outgoing.value = outgoing.value.filter((o) => !confirmed.has(o.clientMessageId))
  }

  async function load() {
    const id = conversationId.value
    const mine = ++generation
    messages.value = []
    outgoing.value = []
    notices.value = []
    hasOlder.value = false
    failed.value = false
    refreshedForMedia.clear()
    if (!id) return
    loading.value = true
    try {
      const page = await api.value.messages(id)
      if (mine !== generation) return
      messages.value = page
      hasOlder.value = page.length === PAGE_SIZE
    } catch (error) {
      if (mine !== generation) return
      failed.value = true
      onError(error)
    } finally {
      if (mine === generation) loading.value = false
    }
  }
  watch(conversationId, load, { immediate: true })

  async function loadOlder() {
    const id = conversationId.value
    const first = messages.value[0]
    if (!id || !first || !hasOlder.value || loadingOlder.value) return
    const mine = generation
    loadingOlder.value = true
    try {
      const page = await api.value.messages(id, { before: first.id })
      if (mine !== generation) return
      const known = new Set(messages.value.map((m) => m.id))
      messages.value = [...page.filter((m) => !known.has(m.id)), ...messages.value]
      hasOlder.value = page.length === PAGE_SIZE
    } catch (error) {
      if (mine === generation) onError(error)
    } finally {
      loadingOlder.value = false
    }
  }

  /** Everything after the newest message we have. One at a time, so two signals never fetch the same page twice. */
  function catchUp(): Promise<void> {
    queue = queue.then(async () => {
      const id = conversationId.value
      const mine = generation
      if (!id || loading.value) return
      try {
        for (;;) {
          const last = messages.value[messages.value.length - 1]
          const page = await api.value.messages(id, last ? { after: last.id } : {})
          if (mine !== generation) return
          messages.value = merge(messages.value, page)
          if (!last) hasOlder.value = page.length === PAGE_SIZE
          if (!last || page.length < PAGE_SIZE) break
        }
        dropConfirmed()
      } catch {
        // The next signal, a reconnection or the periodic check tries again.
      }
    })
    return queue
  }

  /** One message again: edited, deleted, a reaction, or its media links ran out. */
  async function refresh(messageId: string) {
    if (!messages.value.some((m) => m.id === messageId)) return
    const mine = generation
    try {
      const fresh = await api.value.message(messageId)
      if (mine !== generation) return
      messages.value = messages.value.map((m) => (m.id === messageId ? fresh : m))
    } catch {
      // Not visible any more (left the room) or offline; the list refresh sorts it out.
    }
  }

  /** Signed media links live an hour or two; when one fails, the message is fetched again, once. */
  function refreshMedia(messageId: string) {
    if (refreshedForMedia.has(messageId)) return
    refreshedForMedia.add(messageId)
    void refresh(messageId)
  }

  async function deliver(message: Outgoing) {
    const id = conversationId.value
    if (!id) return
    const mine = generation
    message.failed = false
    try {
      await api.value.send(id, {
        clientMessageId: message.clientMessageId,
        text: message.text,
        attachmentIds: message.attachments.map((a) => a.id),
        replyToId: message.replyTo?.id ?? null,
      })
      if (mine === generation) await catchUp()
    } catch (error) {
      if (mine !== generation) return
      const stillThere = outgoing.value.find((o) => o.clientMessageId === message.clientMessageId)
      if (stillThere) stillThere.failed = true
      onError(error)
    }
  }

  function send(text: string | null, attachments: AttachmentView[], replyTo: MessageView | null) {
    const message: Outgoing = {
      clientMessageId: newId(),
      text,
      attachments,
      replyTo,
      sentAt: new Date().toISOString(),
      failed: false,
    }
    outgoing.value.push(message)
    // The reactive copy, so `failed` set later shows.
    void deliver(outgoing.value[outgoing.value.length - 1]!)
  }

  const retry = (message: Outgoing) => void deliver(message)
  const discard = (message: Outgoing) => {
    outgoing.value = outgoing.value.filter((o) => o.clientMessageId !== message.clientMessageId)
  }

  function notice(text: string) {
    notices.value.push({ id: newId(), text, at: new Date().toISOString() })
  }

  return { messages, outgoing, notices, loading, loadingOlder, hasOlder, failed, load, loadOlder, catchUp, refresh, refreshMedia, send, retry, discard, notice }
}

export type Thread = ReturnType<typeof useThread>
