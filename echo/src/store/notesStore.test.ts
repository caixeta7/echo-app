import { describe, it, expect, beforeEach } from 'vitest'
import { useNotesStore } from '@/store/notesStore'

describe('notesStore', () => {
  beforeEach(() => {
    useNotesStore.setState({ notes: [], filter: 'all', activeTag: null, search: '' })
  })

  it('addNote cria e prepende nota', () => {
    const note = useNotesStore.getState().addNote({ title: 'Nova' })
    expect(note.title).toBe('Nova')
    expect(useNotesStore.getState().notes).toHaveLength(1)
  })

  it('toggleStatus alterna pending/done', () => {
    const note = useNotesStore.getState().addNote({ title: 'Toggle' })
    expect(note.status).toBe('pending')
    useNotesStore.getState().toggleStatus(note.id)
    expect(useNotesStore.getState().notes[0].status).toBe('done')
    useNotesStore.getState().toggleStatus(note.id)
    expect(useNotesStore.getState().notes[0].status).toBe('pending')
  })

  it('getFiltered filtra por status pending', () => {
    useNotesStore.getState().addNote({ title: 'A', status: 'pending' })
    useNotesStore.getState().addNote({ title: 'B', status: 'done' })
    useNotesStore.getState().setFilter('pending')
    const filtered = useNotesStore.getState().getFiltered()
    expect(filtered).toHaveLength(1)
    expect(filtered[0].title).toBe('A')
  })

  it('getFiltered filtra por tag ativa', () => {
    useNotesStore.getState().addNote({ title: 'Trabalho', tags: ['trabalho'] })
    useNotesStore.getState().addNote({ title: 'Casa', tags: ['casa'] })
    useNotesStore.getState().setActiveTag('trabalho')
    const filtered = useNotesStore.getState().getFiltered()
    expect(filtered).toHaveLength(1)
    expect(filtered[0].title).toBe('Trabalho')
  })

  it('getFiltered filtra por texto de busca', () => {
    useNotesStore.getState().addNote({ title: 'Comprar leite', content: 'no mercado' })
    useNotesStore.getState().addNote({ title: 'Estudar', content: 'para prova' })
    useNotesStore.getState().setSearch('leite')
    const filtered = useNotesStore.getState().getFiltered()
    expect(filtered).toHaveLength(1)
    expect(filtered[0].title).toBe('Comprar leite')
  })

  it('deleteNote remove nota', () => {
    const note = useNotesStore.getState().addNote({ title: 'Delete me' })
    useNotesStore.getState().deleteNote(note.id)
    expect(useNotesStore.getState().notes).toHaveLength(0)
  })
})
