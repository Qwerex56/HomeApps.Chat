import { describe, expect, it } from 'vitest'
import { plainText, renderMarkdown, toggleMark } from '../markdown'

describe('renderMarkdown', () => {
  it('renders the allowed marks', () => {
    const html = renderMarkdown('**gruby** _kursywa_ ~~skreślony~~ `kod`')
    expect(html).toContain('<strong>gruby</strong>')
    expect(html).toContain('<em>kursywa</em>')
    expect(html).toContain('<s>skreślony</s>')
    expect(html).toContain('<code>kod</code>')
  })

  it('renders lists, quotes and code blocks', () => {
    expect(renderMarkdown('- a\n- b')).toContain('<ul>')
    expect(renderMarkdown('> cytat')).toContain('<blockquote>')
    expect(renderMarkdown('```\nx = 1\n```')).toContain('<pre>')
  })

  it('leaves headings, tables, images and raw HTML as text', () => {
    expect(renderMarkdown('# Tytuł')).not.toContain('<h1')
    expect(renderMarkdown('![x](https://example.com/a.png)')).not.toContain('<img')
    expect(renderMarkdown('| a | b |\n|---|---|\n| 1 | 2 |')).not.toContain('<table')
    const html = renderMarkdown('<img src=x onerror=alert(1)><script>alert(1)</script>')
    expect(html).not.toContain('<img')
    expect(html).not.toContain('<script')
  })

  it('opens links in a new tab without a way back', () => {
    const html = renderMarkdown('[strona](https://example.com)')
    expect(html).toContain('href="https://example.com"')
    expect(html).toContain('target="_blank"')
    expect(html).toContain('rel="noopener noreferrer"')
  })

  it('drops javascript links', () => {
    expect(renderMarkdown('[x](javascript:alert(1))')).not.toContain('href="javascript')
  })

  it('links bare addresses', () => {
    expect(renderMarkdown('zobacz https://example.com')).toContain('<a href="https://example.com"')
  })
})

describe('plainText', () => {
  it('strips marks and cuts long text', () => {
    expect(plainText('**Hej** _ty_')).toBe('Hej ty')
    expect(plainText('a'.repeat(300), 10)).toBe(`${'a'.repeat(9)}…`)
    expect(plainText(null)).toBe('')
  })
})

describe('toggleMark', () => {
  it('wraps the selection', () => {
    expect(toggleMark('ala ma kota', 4, 6, '**')).toEqual({ text: 'ala **ma** kota', start: 6, end: 8 })
  })

  it('unwraps a wrapped selection', () => {
    expect(toggleMark('ala **ma** kota', 6, 8, '**')).toEqual({ text: 'ala ma kota', start: 4, end: 6 })
  })
})
