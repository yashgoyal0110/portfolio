import type { ReactNode } from 'react'
import { useMagnetic } from '@/hooks/useMagnetic'
import { cn } from '@/lib/cn'

interface MagneticButtonProps {
  children: ReactNode
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'ghost'
  className?: string
  download?: boolean
  external?: boolean
  ariaLabel?: string
}

/** Pill button with magnetic hover. Renders <a> when href is given. */
export function MagneticButton({
  children,
  href,
  onClick,
  variant = 'ghost',
  className,
  download,
  external,
  ariaLabel,
}: MagneticButtonProps) {
  const { ref, onMouseMove, onMouseLeave } = useMagnetic<HTMLAnchorElement & HTMLButtonElement>(0.25)
  const cls = cn(variant === 'primary' ? 'btn-primary' : 'btn-ghost', className)

  if (href) {
    return (
      <a
        ref={ref}
        href={href}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className={cls}
        aria-label={ariaLabel}
        download={download}
        target={external ? '_blank' : undefined}
        rel={external ? 'noreferrer' : undefined}
      >
        {children}
      </a>
    )
  }

  return (
    <button
      ref={ref}
      type="button"
      onClick={onClick}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={cls}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  )
}
