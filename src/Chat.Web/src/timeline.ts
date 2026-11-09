import type { MessageView } from './api'

// What the conversation shows, top to bottom: day headers, the "new messages" line, messages grouped by author.

/** A message still on its way (or failed): shown at once, grey until the server confirms it. */
export interface Outgoing {
  clientMessageId: string
  text: string | null
  attachments: MessageView['attachments']
  replyTo: MessageView | null
  sentAt: string
  failed: boolean
}

/** Something that happened to the room while it was open ("Nowa osoba w pokoju: Tomek"). */
export interface Notice {
  id: string
  text: string
  at: string
}

export type Row =
  | { kind: 'day'; key: string; date: string }
  | { kind: 'new'; key: string }
  | { kind: 'notice'; key: string; text: string }
  | { kind: 'message'; key: string; message: MessageView; mine: boolean; lead: boolean }
  | { kind: 'outgoing'; key: string; message: Outgoing; lead: boolean }

/** Messages of one author stay in one group while no more than this passes between them. */
export const GROUP_GAP_MS = 5 * 60_000

const dayOf = (iso: string) => {
  const date = new Date(iso)
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
}

export function buildTimeline(
  messages: MessageView[],
  outgoing: Outgoing[],
  notices: Notice[],
  userId: string | null,
  /** The last message read before the conversation was opened; the line goes after it. */
  readUpTo: string | null,
): Row[] {
  type Entry = { at: string; message?: MessageView; outgoing?: Outgoing; notice?: Notice }
  const entries: Entry[] = [
    ...messages.map((message) => ({ at: message.sentAt, message })),
    ...notices.map((notice) => ({ at: notice.at, notice })),
  ]
  // Messages come sorted from the server; notices are few and local, so a stable sort by time is enough.
  entries.sort((a, b) => (a.at < b.at ? -1 : a.at > b.at ? 1 : 0))
  entries.push(...outgoing.map((message) => ({ at: message.sentAt, outgoing: message })))

  const rows: Row[] = []
  let day: string | null = null
  let previous: { authorId: string; at: number } | null = null
  let afterRead = readUpTo === null ? null : false
  let lineShown = false

  for (const entry of entries) {
    const entryDay = dayOf(entry.at)
    if (entryDay !== day) {
      day = entryDay
      previous = null
      rows.push({ kind: 'day', key: `day-${entryDay}`, date: entry.at })
    }

    if (entry.notice) {
      previous = null
      rows.push({ kind: 'notice', key: `notice-${entry.notice.id}`, text: entry.notice.text })
      continue
    }

    const authorId = entry.message?.authorId ?? userId ?? ''
    const at = new Date(entry.at).getTime()

    if (entry.message && afterRead && !lineShown && entry.message.authorId !== userId) {
      lineShown = true
      previous = null
      rows.push({ kind: 'new', key: 'new' })
    }

    const lead = previous === null || previous.authorId !== authorId || at - previous.at > GROUP_GAP_MS
    previous = { authorId, at }

    if (entry.message) {
      rows.push({ kind: 'message', key: entry.message.id, message: entry.message, mine: authorId === userId, lead })
      if (entry.message.id === readUpTo) afterRead = true
    } else if (entry.outgoing) {
      rows.push({ kind: 'outgoing', key: `out-${entry.outgoing.clientMessageId}`, message: entry.outgoing, lead })
    }
  }
  return rows
}

/** "Dziś", "Wczoraj" (as keys for the caller to translate) or null for any other day. */
export function relativeDay(iso: string, now = new Date()): 'today' | 'yesterday' | null {
  const start = (date: Date) => new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime()
  const days = Math.round((start(now) - start(new Date(iso))) / 86_400_000)
  return days === 0 ? 'today' : days === 1 ? 'yesterday' : null
}
