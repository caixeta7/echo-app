import { useState, useCallback } from 'react'
import { Plus, Moon, Sun, BellOff } from 'lucide-react'
import { useNotes } from '@/hooks/useNotes'
import { useTheme } from '@/hooks/useTheme'
import { useAlarm } from '@/hooks/useAlarm'
import { requestNotificationPermission } from '@/lib/notifications'
import { NoteList } from '@/components/NoteList/NoteList'
import { NoteDialog } from '@/components/NoteDialog/NoteDialog'
import { Button } from '@/components/ui/Button'
import type { Note } from '@/types/note'
import { createNote } from '@/types/note'

export default function App() {
  const { theme, toggle } = useTheme()
  const { notes, addNote, updateNote, deleteNote } = useNotes()
  const { permission } = useAlarm(notes)

  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingNote, setEditingNote] = useState<Note | null>(null)

  const handleNew = useCallback(() => {
    setEditingNote(createNote())
    setDialogOpen(true)
  }, [])

  const handleEdit = useCallback((note: Note) => {
    setEditingNote(note)
    setDialogOpen(true)
  }, [])

  const handleSave = useCallback(
    (note: Note) => {
      const exists = notes.some((n) => n.id === note.id)
      if (exists) {
        updateNote(note.id, note)
      } else {
        addNote(note)
      }
    },
    [notes, addNote, updateNote]
  )

  const handleEnableNotifications = useCallback(async () => {
    await requestNotificationPermission()
  }, [])

  const notesCount = notes.length
  const pendingCount = notes.filter((n) => n.status === 'pending').length

  return (
    <div className="min-h-screen bg-surface-secondary text-text-primary">
      <header className="sticky top-0 z-10 border-b border-border bg-surface/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <h1 className="text-lg font-bold text-text-primary">Echo</h1>
            <span className="text-sm text-text-muted">
              {notesCount} {notesCount === 1 ? 'nota' : 'notas'} · {pendingCount} pendentes
            </span>
          </div>
          <div className="flex items-center gap-2">
            {permission !== 'granted' && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleEnableNotifications}
                aria-label="Permitir notificações"
                title="Permitir notificações para os alarmes"
              >
                <BellOff size={16} />
                <span className="hidden sm:inline">Ativar alertas</span>
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggle}
              aria-label={theme === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro'}
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-6">
        <NoteList onEdit={handleEdit} />
      </main>

      <button
        onClick={handleNew}
        aria-label="Nova anotação"
        className="fixed bottom-6 right-6 z-10 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white shadow-lg transition-all hover:bg-accent-hover hover:shadow-xl active:scale-95"
      >
        <Plus size={24} />
      </button>

      <NoteDialog
        open={dialogOpen}
        note={editingNote}
        onClose={() => setDialogOpen(false)}
        onSave={handleSave}
        onDelete={deleteNote}
      />
    </div>
  )
}
