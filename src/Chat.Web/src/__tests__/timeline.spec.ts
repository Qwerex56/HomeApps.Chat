import { describe, expect, it } from 'vitest'
import type { MessageView } from '../api'
import { buildTimeline, relativeDay } from '../timeline'

const message = (id: string, authorId: string, sentAt: string): MessageView => ({
  id,
  conversationId: 'c',
  authorId,
  clientMessageId: `client-${id}`,
  text: id,
  replyTo: null,
  sentVia: 'App',
  sentAt,
  editedAt: null,
  deleted: false,
  attachments: [],
  reactions: [],
})

describe('buildTimeline', () => {
  it('groups one author within a few minutes and starts a group on a new author', () => {
    const rows = buildTimeline(
      [
        message('1', 'ania', '2026-11-09T10:00:00'),
        message('2', 'ania', '2026-11-09T10:02:00'),
        message('3', 'tomek', '2026-11-09T10:03:00'),
        message('4', 'tomek', '2026-11-09T10:30:00'),
      ],
      [],
      [],
      'ania',
      null,
    )
    const leads = rows.filter((r) => r.kind === 'message').map((r) => (r.kind === 'message' ? r.lead : null))
    expect(leads).toEqual([true, false, true, true])
    expect(rows[0]?.kind).toBe('day')
  })

  it('puts a day header between days', () => {
    const rows = buildTimeline([message('1', 'a', '2026-11-08T22:00:00'), message('2', 'a', '2026-11-09T08:00:00')], [], [], 'a', null)
    expect(rows.map((r) => r.kind)).toEqual(['day', 'message', 'day', 'message'])
  })

  it('draws the new messages line after the last read one, before someone else writes', () => {
    const rows = buildTimeline(
      [message('1', 'tomek', '2026-11-09T10:00:00'), message('2', 'ania', '2026-11-09T10:01:00'), message('3', 'tomek', '2026-11-09T10:02:00')],
      [],
      [],
      'ania',
      '1',
    )
    expect(rows.map((r) => (r.kind === 'message' ? r.message.id : r.kind))).toEqual(['day', '1', '2', 'new', '3'])
  })

  it('puts messages on their way last', () => {
    const rows = buildTimeline(
      [message('1', 'tomek', '2026-11-09T10:00:00')],
      [{ clientMessageId: 'x', text: 'hej', attachments: [], replyTo: null, sentAt: '2026-11-09T09:00:00', failed: false }],
      [],
      'ania',
      null,
    )
    expect(rows[rows.length - 1]?.kind).toBe('outgoing')
  })
})

describe('relativeDay', () => {
  const now = new Date(2026, 10, 9, 12)
  it('names today and yesterday', () => {
    expect(relativeDay(new Date(2026, 10, 9, 1).toISOString(), now)).toBe('today')
    expect(relativeDay(new Date(2026, 10, 8, 23).toISOString(), now)).toBe('yesterday')
    expect(relativeDay(new Date(2026, 10, 1).toISOString(), now)).toBeNull()
  })
})
