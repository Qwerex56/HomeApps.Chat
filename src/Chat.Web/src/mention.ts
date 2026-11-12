// The @ hint in the composer (jarvis-v1.md 5.1): for now only JARVIS, later people too.

export interface MentionQuery {
  /** Where the @ stands. */
  start: number
  /** What follows it, up to the caret. */
  query: string
}

/** The @word the caret stands in, if any; an @ inside a word (an email) is not one. */
export function mentionAt(text: string, caret: number): MentionQuery | null {
  const before = text.slice(0, caret)
  const match = /(^|[^\p{L}\p{N}_@])@([\p{L}\p{N}_]*)$/u.exec(before)
  if (!match) return null
  const query = match[2] ?? ''
  return { start: caret - query.length - 1, query }
}

/** Puts "@name " in place of the @word and says where the caret goes. */
export function completeMention(text: string, mention: MentionQuery, caret: number, name: string) {
  const inserted = `@${name} `
  const after = text.slice(caret).replace(/^[\p{L}\p{N}_]*/u, '')
  return {
    text: text.slice(0, mention.start) + inserted + after.replace(/^ /, ''),
    caret: mention.start + inserted.length,
  }
}
