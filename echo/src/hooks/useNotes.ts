import { useNotesStore } from '@/store/notesStore'
import type { Note } from '@/types/note'

export function useNotes() {
  const notes = useNotesStore((s) => s.notes)
  const filter = useNotesStore((s) => s.filter)
  const activeTag = useNotesStore((s) => s.activeTag)
  const search = useNotesStore((s) => s.search)
  const addNote = useNotesStore((s) => s.addNote)
  const updateNote = useNotesStore((s) => s.updateNote)
  const deleteNote = useNotesStore((s) => s.deleteNote)
  const toggleStatus = useNotesStore((s) => s.toggleStatus)
  const setFilter = useNotesStore((s) => s.setFilter)
  const setActiveTag = useNotesStore((s) => s.setActiveTag)
  const setSearch = useNotesStore((s) => s.setSearch)
  const getFiltered = useNotesStore((s) => s.getFiltered)

  const allTags = Array.from(new Set(notes.flatMap((n: Note) => n.tags))).sort()

  return {
    notes,
    filtered: getFiltered(),
    filter,
    activeTag,
    search,
    allTags,
    addNote,
    updateNote,
    deleteNote,
    toggleStatus,
    setFilter,
    setActiveTag,
    setSearch,
  }
}
