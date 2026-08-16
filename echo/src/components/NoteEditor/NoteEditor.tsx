import { useState } from 'react'
import { Eye, Edit3 } from 'lucide-react'
import type { Note } from '@/types/note'
import { MarkdownPreview } from './MarkdownPreview'

interface NoteEditorProps {
  note: Note
  onChange: (patch: Partial<Note>) => void
}

export function NoteEditor({ note, onChange }: NoteEditorProps) {
  const [mode, setMode] = useState<'edit' | 'preview'>('edit')

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <button
          onClick={() => setMode('edit')}
          aria-pressed={mode === 'edit'}
          className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
            mode === 'edit' ? 'bg-accent text-white' : 'text-text-secondary hover:bg-surface-tertiary'
          }`}
        >
          <Edit3 size={14} /> Editar
        </button>
        <button
          onClick={() => setMode('preview')}
          aria-pressed={mode === 'preview'}
          className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
            mode === 'preview' ? 'bg-accent text-white' : 'text-text-secondary hover:bg-surface-tertiary'
          }`}
        >
          <Eye size={14} /> Preview
        </button>
      </div>

      {mode === 'edit' ? (
        <textarea
          value={note.content}
          onChange={(e) => onChange({ content: e.target.value })}
          placeholder="Digite em Markdown...&#10;&#10;## Título&#10;- [ ] Tarefa pendente&#10;- [x] Tarefa concluída&#10;&#10;**negrito** _itálico_ `código`"
          className="min-h-[200px] flex-1 resize-none rounded-lg border border-border bg-surface-secondary p-3 font-mono text-sm text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          aria-label="Conteúdo da anotação em Markdown"
        />
      ) : (
        <div className="min-h-[200px] rounded-lg border border-border bg-surface-secondary p-3">
          <MarkdownPreview content={note.content} />
        </div>
      )}
    </div>
  )
}
