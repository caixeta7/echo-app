import { useState, useEffect } from 'react'
import { Dialog } from '@/components/ui/Dialog'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { NoteEditor } from '@/components/NoteEditor/NoteEditor'
import { AlarmConfig } from '@/components/AlarmConfig/AlarmConfig'
import type { Note } from '@/types/note'

interface NoteDialogProps {
  open: boolean
  note: Note | null
  onClose: () => void
  onSave: (note: Note) => void
  onDelete: (id: string) => void
}

export function NoteDialog({ open, note, onClose, onSave, onDelete }: NoteDialogProps) {
  const [draft, setDraft] = useState<Note | null>(null)

  useEffect(() => {
    setDraft(note ? { ...note } : null)
  }, [note])

  if (!draft) return null

  const patch = (p: Partial<Note>) => setDraft((d) => (d ? { ...d, ...p } : d))
  const isNew = !note?.createdAt || note.createdAt === note.updatedAt ? false : false
  const hasContent = draft.title.trim() !== '' || draft.content.trim() !== ''

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title={isNew ? 'Nova anotação' : 'Editar anotação'}
      size="lg"
      footer={
        <>
          {note && (
            <Button
              variant="danger"
              size="sm"
              onClick={() => {
                onDelete(note.id)
                onClose()
              }}
            >
              Excluir
            </Button>
          )}
          <Button variant="ghost" size="sm" onClick={onClose}>
            Cancelar
          </Button>
          <Button
            size="sm"
            onClick={() => {
              onSave(draft)
              onClose()
            }}
            disabled={!hasContent}
          >
            Salvar
          </Button>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <Input
          label="Título"
          id="note-title"
          type="text"
          value={draft.title}
          onChange={(e) => patch({ title: e.target.value })}
          placeholder="Título da anotação"
        />

        <div>
          <span className="mb-1 block text-sm font-medium text-text-secondary">
            Conteúdo (Markdown)
          </span>
          <NoteEditor note={draft} onChange={patch} />
        </div>

        <div>
          <span className="mb-1 block text-sm font-medium text-text-secondary">
            Tags
          </span>
          <Input
            id="note-tags"
            type="text"
            value={draft.tags.join(', ')}
            onChange={(e) =>
              patch({
                tags: e.target.value
                  .split(',')
                  .map((t) => t.trim().replace(/^#/, ''))
                  .filter(Boolean),
              })
            }
            placeholder="trabalho, casa, estudo (separe por vírgula)"
          />
        </div>

        <AlarmConfig alarm={draft.alarm} onChange={(a) => patch({ alarm: a })} />
      </div>
    </Dialog>
  )
}
