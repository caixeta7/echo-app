export type NoteStatus = 'pending' | 'done'

export interface NoteAlarm {
  enabled: boolean
  intervalMs: number
}

export interface Note {
  id: string
  title: string
  content: string
  tags: string[]
  status: NoteStatus
  alarm: NoteAlarm
  createdAt: number
  updatedAt: number
}

export type NoteFilter = 'all' | 'pending' | 'done'

export const INTERVAL_PRESETS: { label: string; value: number }[] = [
  { label: '1 min', value: 60_000 },
  { label: '5 min', value: 300_000 },
  { label: '15 min', value: 900_000 },
  { label: '30 min', value: 1_800_000 },
  { label: '1 hora', value: 3_600_000 },
  { label: '2 horas', value: 7_200_000 },
  { label: '6 horas', value: 21_600_000 },
  { label: '12 horas', value: 43_200_000 },
  { label: '24 horas', value: 86_400_000 },
]

export function createNote(partial?: Partial<Note>): Note {
  const now = Date.now()
  return {
    id: crypto.randomUUID(),
    title: '',
    content: '',
    tags: [],
    status: 'pending',
    alarm: { enabled: false, intervalMs: 300_000 },
    createdAt: now,
    updatedAt: now,
    ...partial,
  }
}
