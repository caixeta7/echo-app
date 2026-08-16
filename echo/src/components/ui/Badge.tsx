import { type ReactNode } from 'react'

interface BadgeProps {
  children: ReactNode
  active?: boolean
  onClick?: () => void
  variant?: 'default' | 'success' | 'warning'
}

const variantClasses = {
  default: 'bg-surface-tertiary text-text-secondary',
  success: 'bg-success/15 text-success',
  warning: 'bg-warning/15 text-warning',
}

export function Badge({ children, active, onClick, variant = 'default' }: BadgeProps) {
  const base = `inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors ${variantClasses[variant]}`
  if (onClick) {
    return (
      <button
        onClick={onClick}
        aria-pressed={active}
        className={`${base} ${active ? 'ring-2 ring-accent ring-offset-1 ring-offset-surface' : 'hover:opacity-70'} cursor-pointer`}
      >
        {children}
      </button>
    )
  }
  return <span className={base}>{children}</span>
}
