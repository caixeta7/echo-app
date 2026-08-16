import { marked } from 'marked'
import DOMPurify from 'dompurify'

marked.setOptions({ breaks: true, gfm: true })

const cache = new Map<string, string>()

export function renderMarkdown(raw: string): string {
  const cached = cache.get(raw)
  if (cached) return cached

  const html = DOMPurify.sanitize(marked.parse(raw) as string)
  cache.set(raw, html)
  return html
}
