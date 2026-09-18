import { useEffect, useRef } from 'react'
import { AlertCircle, CheckCircle2, Info, Loader2, X } from 'lucide-react'
import { cn } from '../lib/utils'

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive'
  loading?: boolean
}

export function Button({ className, variant = 'primary', loading, children, disabled, ...props }: ButtonProps) {
  const styles = {
    primary: 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-sm',
    outline: 'border border-border bg-card text-card-foreground hover:bg-accent hover:text-accent-foreground',
    ghost: 'bg-transparent text-muted-foreground hover:bg-accent hover:text-accent-foreground',
    destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
  }
  return <button className={cn('focus-ring inline-flex min-h-10 items-center justify-center gap-2 rounded-lg px-4 text-sm font-bold transition duration-200 hover:-translate-y-0.5 hover:shadow-md active:scale-[0.98] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50', styles[variant], className)} disabled={disabled || loading} {...props}>
    {loading ? <Loader2 size={17} className="animate-spin" aria-hidden="true" /> : null}
    <span>{children}</span>
  </button>
}

export function Card({ className, children }: { className?: string; children: React.ReactNode }) {
  return <section className={cn('rounded-xl border border-border bg-card p-5 text-card-foreground shadow-sm', className)}>{children}</section>
}

export function Badge({ children, tone = 'muted' }: { children: React.ReactNode; tone?: 'muted' | 'primary' | 'success' | 'warning' }) {
  const tones = {
    muted: 'bg-muted text-muted-foreground',
    primary: 'bg-accent text-accent-foreground',
    success: 'bg-success text-success-foreground',
    warning: 'bg-warning text-warning-foreground',
  }
  return <span className={cn('inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold', tones[tone])}>{children}</span>
}

export function Field({ label, htmlFor, error, children }: { label: string; htmlFor: string; error?: string; children: React.ReactNode }) {
  return <div className="space-y-2">
    <label htmlFor={htmlFor} className="text-sm font-bold text-foreground">{label}</label>
    {children}
    {error ? <p id={`${htmlFor}-error`} className="text-sm text-destructive" role="alert">{error}</p> : null}
  </div>
}

export const fieldClass = 'focus-ring min-h-11 w-full rounded-lg border border-input bg-card px-3 text-sm text-foreground placeholder:text-muted-foreground disabled:bg-muted disabled:opacity-50'

type Toast = { id: string; title: string; description?: string; variant: 'success' | 'error' | 'info' }

export function ToastRegion({ toasts, onDismiss }: { toasts: Toast[]; onDismiss: (id: string) => void }) {
  const icons = { success: CheckCircle2, error: AlertCircle, info: Info }
  const tones = { success: 'border-success bg-card', error: 'border-destructive/30 bg-card', info: 'border-border bg-card' }
  return <div className="pointer-events-none fixed inset-x-4 bottom-4 z-50 flex flex-col items-end gap-3" aria-live="polite">
    {toasts.map((toast) => {
      const Icon = icons[toast.variant]
      return <div key={toast.id} className={cn('pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-xl border p-4 shadow-lg', tones[toast.variant])} role="status">
        <Icon size={20} className={toast.variant === 'error' ? 'text-destructive' : toast.variant === 'success' ? 'text-success-foreground' : 'text-secondary'} aria-hidden="true" />
        <div className="min-w-0 flex-1"><p className="text-sm font-extrabold text-card-foreground">{toast.title}</p>{toast.description ? <p className="mt-1 text-sm text-muted-foreground">{toast.description}</p> : null}</div>
        <button aria-label="Dismiss notification" onClick={() => onDismiss(toast.id)} className="focus-ring rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground"><X size={16} /></button>
      </div>
    })}
  </div>
}

export function EmptyState({ icon: Icon, title, description, action }: { icon: React.ComponentType<{ size?: number; className?: string }>; title: string; description: string; action?: React.ReactNode }) {
  return <div className="flex flex-col items-center rounded-xl border border-dashed border-border bg-card px-6 py-10 text-center">
    <div className="mb-4 rounded-full bg-muted p-3 text-secondary"><Icon size={24} aria-hidden="true" /></div>
    <h2 className="text-lg font-extrabold text-card-foreground">{title}</h2>
    <p className="mt-2 max-w-md text-sm text-muted-foreground">{description}</p>
    {action ? <div className="mt-5">{action}</div> : null}
  </div>
}

export function ConfirmDialog({ open, title, description, confirmLabel, onClose, onConfirm }: { open: boolean; title: string; description: string; confirmLabel: string; onClose: () => void; onConfirm: () => void }) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLElement | null>(null)
  useEffect(() => {
    if (!open) return
    triggerRef.current = document.activeElement as HTMLElement
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const focusable = () => Array.from(dialogRef.current?.querySelectorAll<HTMLElement>('button:not([disabled]), [href], input:not([disabled])') || [])
    const keydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'Tab') {
        const items = focusable()
        if (!items.length) return
        const first = items[0]
        const last = items[items.length - 1]
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
        if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
      }
    }
    document.addEventListener('keydown', keydown)
    window.setTimeout(() => focusable()[0]?.focus(), 0)
    return () => { document.body.style.overflow = previousOverflow; document.removeEventListener('keydown', keydown); triggerRef.current?.focus() }
  }, [open, onClose])
  if (!open) return null
  return <div className="fixed inset-0 z-50 grid place-items-center bg-primary/35 p-4" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
    <div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="dialog-title" className="w-full max-w-md rounded-xl border border-border bg-popover p-6 text-popover-foreground shadow-xl">
      <h2 id="dialog-title" className="text-lg font-extrabold">{title}</h2>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      <div className="mt-6 flex justify-end gap-3"><Button type="button" variant="outline" onClick={onClose}>Cancel</Button><Button type="button" variant="destructive" onClick={onConfirm}>{confirmLabel}</Button></div>
    </div>
  </div>
}
