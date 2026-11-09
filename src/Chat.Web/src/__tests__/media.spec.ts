import { describe, expect, it } from 'vitest'
import { checkFile, MAX_BYTES, problemOf } from '../media'

const file = (type: string, size = 10) => {
  const f = new File(['x'], 'f', { type })
  Object.defineProperty(f, 'size', { value: size })
  return f
}

describe('checkFile', () => {
  it('accepts photos and short films', async () => {
    expect(await checkFile(file('image/jpeg'))).toBeNull()
    expect(await checkFile(file('video/mp4'), async () => 30)).toBeNull()
  })

  it('refuses other files, too large and too long', async () => {
    expect(await checkFile(file('application/pdf'))).toBe('unsupported')
    expect(await checkFile(file('image/png', MAX_BYTES + 1))).toBe('tooLarge')
    expect(await checkFile(file('video/mp4'), async () => 31)).toBe('tooLong')
  })

  it('leaves a film of unknown length to the server', async () => {
    expect(await checkFile(file('video/quicktime'), async () => null)).toBeNull()
  })
})

describe('problemOf', () => {
  it('maps the server codes', () => {
    expect(problemOf('attachment.too_long')).toBe('tooLong')
    expect(problemOf('attachment.unreadable')).toBe('unsupported')
    expect(problemOf('chat.storage_full')).toBeNull()
  })
})
