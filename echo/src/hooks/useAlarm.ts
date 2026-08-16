import { useEffect, useRef, useState } from 'react'
import { showNotification } from '@/lib/notifications'
import type { Note } from '@/types/note'

export function useAlarm(notes: Note[]) {
  const timersRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map())
  const [permission, setPermission] = useState<NotificationPermission>(
    typeof Notification !== 'undefined' ? Notification.permission : 'denied'
  )

  useEffect(() => {
    const active = notes.filter((n) => n.status === 'pending' && n.alarm.enabled)
    const currentIds = new Set(active.map((n) => n.id))
    const timers = timersRef.current

    for (const [id, timer] of timers) {
      if (!currentIds.has(id)) {
        clearTimeout(timer)
        timers.delete(id)
      }
    }

    for (const note of active) {
      if (timers.has(note.id)) continue

      const fire = () => {
        showNotification(
          ` Peblo: ${note.title || 'Anotação sem título'}`,
          note.content.slice(0, 200) || 'Lembrete de tarefa'
        )
      }

      const interval = note.alarm.intervalMs
      fire()
      const timer = setInterval(fire, interval)
      timers.set(note.id, timer)
    }

    return () => {
      for (const timer of timers.values()) clearTimeout(timer)
      timers.clear()
    }
  }, [notes])

  return { permission, setPermission }
}
