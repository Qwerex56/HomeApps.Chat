import { describe, expect, it } from 'vitest'
import { completeMention, mentionAt } from '../mention'

describe('mention', () => {
  it('finds the @word at the caret but not an email', () => {
    expect(mentionAt('hej @ja', 7)).toEqual({ start: 4, query: 'ja' })
    expect(mentionAt('@', 1)).toEqual({ start: 0, query: '' })
    expect(mentionAt('jan@dom', 7)).toBeNull()
    expect(mentionAt('hej @ja ', 8)).toBeNull()
  })

  it('completes the name and moves the caret after it', () => {
    const text = 'hej @ja dodaj'
    expect(completeMention(text, mentionAt(text, 7)!, 7, 'Jarvis')).toEqual({
      text: 'hej @Jarvis dodaj',
      caret: 12,
    })
  })
})
