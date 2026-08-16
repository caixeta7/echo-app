import { memo } from 'react'
import { ClipboardList } from 'lucide-react'
import { useNotes } from '@/hooks/useNotes'
import type { Note, NoteFilter } from '@/types/note'
import { NoteItem } from './NoteItem'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'

interface NoteListProps {
  onEdit: (note: Note) => void
}

const FILTERS: { label: string; value: NoteFilter }[] = [
  { label: 'Todas', value: 'all' },
  { label: 'Pendentes', value: 'pending' },
  { label: 'Concluídas', value: 'done' },
]

const Skeleton = () => (
  <div className="space-y-3" aria-busy="true" aria-label="Carregando">
    {Array.from({ length: 3 }).map((_, i) => (
      <div key={i} className="h-28 animate-pulse rounded-xl border border-border bg-surface" />
    ))}
  </div>
)

export const NoteList = memo(function NoteList({ onEdit }: NoteListProps) {
  const {
    filtered,
    filter,
    activeTag,
    allTags,
    search,
    setFilter,
    setActiveTag,
    setSearch,
    toggleStatus,
    deleteNote,
    notes,
  } = useNotes()

  const isLoading = notes === undefined

  return (
    <section className="flex flex-col gap-3">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Input
          id="search"
          type="search"
          placeholder="Buscar anotações..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Buscar anotações"
          className="sm:w-64"
        />
        <div className="flex items-center gap-1.5" role="group" aria-label="Filtros">
          {FILTERS.map((f) => (
            <Badge
              key={f.value}
              active={filter === f.value}
              onClick={() => setFilter(f.value)}
            >
              {f.label}
            </Badge>
          ))}
        </div>
      </div>

      {allTags.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label="Tags">
          <button
            onClick={() => setActiveTag(null)}
            aria-pressed={activeTag === null}
            className={`rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors ${
              activeTag === null ? 'bg-accent-soft text-accent' : 'text-text-muted hover:opacity-70'
            }`}
          >
            Todas
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(activeTag === tag ? null : tag)}
              aria-pressed={activeTag === tag}
              className={`rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors ${
                activeTag === tag ? 'bg-accent-soft text-accent ring-1 ring-accent' : 'text-text-muted hover:opacity-70'
              }`}
            >
              #{tag}
            </button>
          ))}
        </div>
      )}

      {isLoading ? (
        <Skeleton />
      ) : filtered.length === 0 ? (
        <div role="status" className="flex flex-col items-center gap-4 py-16 text-center">
          <ClipboardList className="h-12 w-12 text-text-muted" />
          <div>
            <h3 className="font-semibold text-text-primary">Nenhuma anotação encontrada</h3>
            <p className="mt-1 text-sm text-text-secondary">
              {notes.length === 0
                ? 'Comece criando sua primeira anotação com o botão +'
                : 'Tente ajustar a busca ou os filtros'}
            </p>
          </div>
        </div>
      ) : (
        <div role="list" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((note) => (
            <div role="listitem" key={note.id}>
              <NoteItem
                note={note}
                onEdit={onEdit}
                onToggle={toggleStatus}
                onDelete={deleteNote}
              />
            </div>
          ))}
        </div>
      )}
    </section>
  )
})
