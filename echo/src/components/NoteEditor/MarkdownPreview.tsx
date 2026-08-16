import { renderMarkdown } from '@/lib/markdown'

interface MarkdownPreviewProps {
  content: string
}

export function MarkdownPreview({ content }: MarkdownPreviewProps) {
  if (!content.trim()) {
    return (
      <p className="text-sm text-text-muted">O preview aparecerá aqui quando você digitar...</p>
    )
  }

  return (
    <div
      className="proseMarkdown text-sm text-text-primary"
      dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
    />
  )
}
