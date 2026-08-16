import { Bell, Clock } from 'lucide-react'
import { INTERVAL_PRESETS } from '@/types/note'
import type { NoteAlarm } from '@/types/note'

interface AlarmConfigProps {
  alarm: NoteAlarm
  onChange: (alarm: NoteAlarm) => void
}

export function AlarmConfig({ alarm, onChange }: AlarmConfigProps) {
  return (
    <div className="flex flex-col gap-3 rounded-lg border border-border bg-surface-secondary p-3">
      <label className="flex items-center gap-2 text-sm font-medium text-text-secondary">
        <input
          type="checkbox"
          checked={alarm.enabled}
          onChange={(e) => onChange({ ...alarm, enabled: e.target.checked })}
          className="h-4 w-4 rounded accent-accent"
        />
        <Bell size={16} className={alarm.enabled ? 'text-accent' : 'text-text-muted'} />
        Alarme recorrente
      </label>

      {alarm.enabled && (
        <div className="flex items-center gap-2 pl-6">
          <Clock size={14} className="text-text-muted" />
          <select
            value={alarm.intervalMs}
            onChange={(e) => onChange({ ...alarm, intervalMs: Number(e.target.value) })}
            className="flex-1 rounded-lg border border-border bg-surface px-3 py-1.5 text-sm text-text-primary focus:border-accent focus:outline-none"
            aria-label="Intervalo do alarme"
          >
            {INTERVAL_PRESETS.map((p) => (
              <option key={p.value} value={p.value}>
                A cada {p.label}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  )
}
