import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface ButtonProps {
  children: ReactNode
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'ghost'
  className?: string
  download?: boolean | string
  external?: boolean
  ariaLabel?: string
}

/** Pill button. Renders an <a> when href is given, otherwise a <button>. */
export function Button({
  children,
  href,
  onClick,
  variant = 'ghost',
  className,
  download,
  external,
  ariaLabel,
}: ButtonProps) {
  const cls = cn(variant === 'primary' ? 'btn-primary' : 'btn-ghost', className)

  if (href) {
    return (
      <a
        href={href}
        className={cls}
        aria-label={ariaLabel}
        download={download}
        target={external && !download ? '_blank' : undefined}
        rel={external && !download ? 'noreferrer' : undefined}
      >
        {children}
      </a>
    )
  }

  return (
    <button type="button" onClick={onClick} className={cls} aria-label={ariaLabel}>
      {children}
    </button>
  )
}
