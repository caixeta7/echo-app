import { memo } from 'react'
import { Bell, BellOff, Check, Trash2, Edit3, Clock } from 'lucide-react'
import type { Note } from '@/types/note'
import { Badge } from '@/components/ui/Badge'
import { INTERVAL_PRESETS } from '@/types/note'

interface NoteItemProps {
  note: Note
  onEdit: (note: Note) => void
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

function formatInterval(ms: number): string {
  return INTERVAL_PRESETS.find((p) => p.value === ms)?.label ?? `${Math.round(ms / 60_000)} min`
}

function formatDate(ts: number): string {
  return new Date(ts).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })
}

export const NoteItem = memo(function NoteItem({ note, onEdit, onToggle, onDelete }: NoteItemProps) {
  return (
    <article
      className="group rounded-xl border border-border bg-surface p-4 transition-all hover:border-border-strong hover:shadow-sm"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <h3 className={`font-semibold ${note.status === 'done' ? 'text-text-muted line-through' : 'text-text-primary'}`}>
            {note.title || 'Sem título'}
          </h3>
          <p className="mt-0.5 text-xs text-text-muted">{formatDate(note.updatedAt)}</p>
        </div>
        <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
          <button
            onClick={() => onEdit(note)}
            aria-label="Editar anotação"
            className="rounded-lg p-1.5 text-text-muted transition-colors hover:bg-surface-tertiary hover:text-accent"
          >
            <Edit3 size={16} />
          </button>
          <button
            onClick={() => onDelete(note.id)}
            aria-label="Excluir anotação"
            className="rounded-lg p-1.5 text-text-muted transition-colors hover:bg-danger-soft hover:text-danger"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <p className="mt-2 line-clamp-2 text-sm text-text-secondary">
        {note.content || 'Anotação vazia'}
      </p>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        {note.status === 'done' ? (
          <Badge variant="success">
            <Check size={12} /> Concluída
          </Badge>
        ) : (
          <Badge variant="warning">Pendente</Badge>
        )}

        {note.alarm.enabled ? (
          <Badge>
            <Bell size={12} /> {formatInterval(note.alarm.intervalMs)}
          </Badge>
        ) : (
          <Badge>
            <BellOff size={12} /> Sem alarme
          </Badge>
        )}

        {note.tags.map((tag) => (
          <span key={tag} className="text-xs text-accent">
            #{tag}
          </span>
        ))}
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-border pt-2">
        <span className="flex items-center gap-1 text-xs text-text-muted">
          <Clock size={12} />
          {note.status === 'done' ? 'Concluída' : 'Pendente'}
        </span>
        <button
          onClick={() => onToggle(note.id)}
          aria-label={note.status === 'done' ? 'Reabrir tarefa' : 'Concluir tarefa'}
          className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
            note.status === 'done'
              ? 'text-text-secondary hover:bg-surface-tertiary'
              : 'text-success hover:bg-success/10'
          }`}
        >
          {note.status === 'done' ? 'Reabrir' : 'Concluir'}
        </button>
      </div>
    </article>
  )
})
