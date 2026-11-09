import MarkdownIt from 'markdown-it'
import DOMPurify from 'dompurify'

// Markdown in messages (plan 9a): bold, italic, strike, code, code blocks, links, lists and quotes. No headings,
// tables, images or raw HTML. The text is stored as written; this is the only place it becomes HTML.

const md = new MarkdownIt({ html: false, linkify: true, breaks: true }).disable([
  'heading',
  'lheading',
  'table',
  'image',
  'hr',
  'html_block',
  'html_inline',
])

// Links: http(s) and mailto only, always in a new tab without a way back to this window.
const SAFE_LINK = /^(https?:|mailto:)/i
md.validateLink = (url) => SAFE_LINK.test(url.trim())
// After sanitizing, because DOMPurify drops target on its own.
DOMPurify.addHook('afterSanitizeAttributes', (node) => {
  if (node.tagName === 'A') {
    node.setAttribute('target', '_blank')
    node.setAttribute('rel', 'noopener noreferrer')
  }
})

const ALLOWED_TAGS = ['p', 'br', 'strong', 'em', 's', 'code', 'pre', 'a', 'ul', 'ol', 'li', 'blockquote']
const ALLOWED_ATTR = ['href', 'start', 'class']

/** A message's text as safe HTML. */
export function renderMarkdown(text: string): string {
  return DOMPurify.sanitize(md.render(text), { ALLOWED_TAGS, ALLOWED_ATTR, ALLOWED_URI_REGEXP: SAFE_LINK })
}

/** One line without Markdown marks: quotes, the conversation list, the widget. */
export function plainText(text: string | null | undefined, maxLength = 200): string {
  if (!text) return ''
  const holder = document.createElement('div')
  holder.innerHTML = renderMarkdown(text)
  const plain = (holder.textContent ?? '').replace(/\s+/g, ' ').trim()
  return plain.length > maxLength ? `${plain.slice(0, maxLength - 1).trimEnd()}…` : plain
}

/**
 * Ctrl+B / Ctrl+I in the text field: wraps the selection in `mark` (or removes it when already wrapped) and returns
 * the new text with the selection to restore.
 */
export function toggleMark(text: string, start: number, end: number, mark: string) {
  const selected = text.slice(start, end)
  const wrappedOutside = text.slice(start - mark.length, start) === mark && text.slice(end, end + mark.length) === mark
  if (wrappedOutside) {
    return {
      text: text.slice(0, start - mark.length) + selected + text.slice(end + mark.length),
      start: start - mark.length,
      end: end - mark.length,
    }
  }
  return {
    text: text.slice(0, start) + mark + selected + mark + text.slice(end),
    start: start + mark.length,
    end: end + mark.length,
  }
}
