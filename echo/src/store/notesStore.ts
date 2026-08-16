import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { Note, NoteFilter, NoteStatus } from '@/types/note'
import { createNote } from '@/types/note'
import { loadFromStorage } from '@/lib/storage'

interface NotesState {
  notes: Note[]
  filter: NoteFilter
  activeTag: string | null
  search: string
  addNote: (partial?: Partial<Note>) => Note
  updateNote: (id: string, patch: Partial<Note>) => void
  deleteNote: (id: string) => void
  toggleStatus: (id: string) => void
  setFilter: (f: NoteFilter) => void
  setActiveTag: (tag: string | null) => void
  setSearch: (s: string) => void
  getFiltered: () => Note[]
}

export const useNotesStore = create<NotesState>()(
  persist(
    (set, get) => ({
      notes: loadFromStorage<Note[]>() ?? [],
      filter: 'all',
      activeTag: null,
      search: '',

      addNote: (partial) => {
        const note = createNote(partial)
        set((s) => ({ notes: [note, ...s.notes] }))
        return note
      },

      updateNote: (id, patch) =>
        set((s) => ({
          notes: s.notes.map((n) =>
            n.id === id ? { ...n, ...patch, updatedAt: Date.now() } : n
          ),
        })),

      deleteNote: (id) =>
        set((s) => ({ notes: s.notes.filter((n) => n.id !== id) })),

      toggleStatus: (id) =>
        set((s) => ({
          notes: s.notes.map((n) =>
            n.id === id
              ? { ...n, status: (n.status === 'pending' ? 'done' : 'pending') as NoteStatus, updatedAt: Date.now() }
              : n
          ),
        })),

      setFilter: (f) => set({ filter: f }),
      setActiveTag: (tag) => set({ activeTag: tag }),
      setSearch: (s) => set({ search: s }),

      getFiltered: () => {
        const { notes, filter, activeTag, search } = get()
        const q = search.trim().toLowerCase()
        return notes.filter((n) => {
          if (filter === 'pending' && n.status !== 'pending') return false
          if (filter === 'done' && n.status !== 'done') return false
          if (activeTag && !n.tags.includes(activeTag)) return false
          if (q) {
            const hay = (n.title + ' ' + n.content).toLowerCase()
            if (!hay.includes(q)) return false
          }
          return true
        })
      },
    }),
    {
      name: 'echo:store',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
