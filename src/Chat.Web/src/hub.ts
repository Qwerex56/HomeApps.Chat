import { onUnmounted, ref } from 'vue'
import { HubConnectionBuilder, HubConnectionState, LogLevel } from '@microsoft/signalr'

// The realtime hub (README "Hub"): small signals with ids only; what changed is fetched over HTTP.

export interface MessageSignal {
  householdId: string
  conversationId: string
  messageId: string
  authorId?: string
}
export interface ReadSignal {
  householdId: string
  conversationId: string
  userId: string
  messageId: string
}
export interface ConversationSignal {
  householdId: string
  conversationId: string
}
export interface AttachmentSignal {
  householdId: string
  attachmentId: string
  status: string
  failureCode: string | null
}
export interface TypingSignal {
  householdId: string
  conversationId: string
  userId: string
}

export interface Signals {
  MessageSent: MessageSignal
  MessageEdited: MessageSignal
  MessageDeleted: MessageSignal
  ReactionChanged: MessageSignal
  ReadMarkerMoved: ReadSignal
  ConversationChanged: ConversationSignal
  AttachmentChanged: AttachmentSignal
  Typing: TypingSignal
  AccessChanged: { householdId: string }
  /** JARVIS took the question under messageId and works on it. */
  AssistantWorking: MessageSignal
}

const RETRY_MS = 5_000
const MAX_RETRY_MS = 30_000

/**
 * One connection for one household on screen. It reconnects for as long as it lives; after every (re)connection it
 * watches the household again and calls the `caughtUp` handlers, because signals sent in between are gone.
 */
export function createHub(url: string, accessToken: () => Promise<string>, householdId: string) {
  const connection = new HubConnectionBuilder()
    .withUrl(url, { accessTokenFactory: accessToken })
    .withAutomaticReconnect({ nextRetryDelayInMilliseconds: (retry) => Math.min(MAX_RETRY_MS, 1000 * 2 ** retry.previousRetryCount) })
    .configureLogging(LogLevel.Warning)
    .build()

  const connected = ref(false)
  const reconnected = new Set<() => void>()
  let opened: string | null = null
  let stopped = false
  let everConnected = false
  let timer: ReturnType<typeof setTimeout> | undefined

  async function ready() {
    await connection.invoke('Watch', householdId)
    if (opened) await connection.invoke('Open', opened)
    connected.value = true
    if (everConnected) reconnected.forEach((handler) => handler())
    everConnected = true
  }

  async function start() {
    if (stopped) return
    try {
      await connection.start()
      await ready()
    } catch {
      // Not reachable yet or not allowed right now: the page keeps working over HTTP and we try again.
      if (connection.state === HubConnectionState.Connected) await connection.stop().catch(() => undefined)
      else if (!stopped) timer = setTimeout(start, RETRY_MS)
    }
  }

  connection.onreconnecting(() => (connected.value = false))
  connection.onreconnected(() => ready().catch(() => connection.stop()))
  connection.onclose(() => {
    connected.value = false
    if (!stopped) timer = setTimeout(start, RETRY_MS)
  })
  void start()

  const send = (method: string, ...args: unknown[]) => {
    if (connection.state === HubConnectionState.Connected) connection.invoke(method, ...args).catch(() => undefined)
  }

  return {
    connected,
    /** Listens until the returned function is called. */
    on<K extends keyof Signals>(name: K, handler: (signal: Signals[K]) => void) {
      // The user's own group hears every household they are in; this page is about one.
      const listener = (signal: Signals[K]) => {
        if (signal.householdId === householdId) handler(signal)
      }
      connection.on(name, listener)
      return () => connection.off(name, listener)
    },
    /** After a reconnection: signals were missed, ask again for what is on screen. */
    onReconnected(handler: () => void) {
      reconnected.add(handler)
      return () => void reconnected.delete(handler)
    },
    /** The conversation on screen (null: none), so the server sends no push notification from it. */
    open(conversationId: string | null) {
      opened = conversationId
      send('Open', conversationId)
    },
    typing: (conversationId: string) => send('Typing', householdId, conversationId),
    stop() {
      stopped = true
      clearTimeout(timer)
      void connection.stop()
    },
  }
}

export type ChatHub = ReturnType<typeof createHub>

/** A signal handler for as long as the calling component lives. */
export function useSignal<K extends keyof Signals>(hub: ChatHub, name: K, handler: (signal: Signals[K]) => void) {
  onUnmounted(hub.on(name, handler))
}
