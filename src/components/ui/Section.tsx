import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { Reveal } from './Reveal'

interface SectionProps {
  id: string
  title?: ReactNode
  intro?: ReactNode
  children: ReactNode
  className?: string
}

/**
 * Standard section shell: anchor id, heading, intro, content.
 * One heading only — the nav already names each section, so a kicker label
 * above the heading just said the same thing twice.
 */
export function Section({ id, title, intro, children, className }: SectionProps) {
  return (
    <section id={id} className={cn('relative scroll-mt-24 py-16 sm:py-20', className)}>
      <div className="container-px">
        {(title || intro) && (
          <Reveal className="mb-10 sm:mb-12 max-w-3xl">
            {title && <h2 className="text-3xl font-semibold sm:text-4xl">{title}</h2>}
            {intro && <p className="mt-4 text-lg leading-relaxed text-mist-400">{intro}</p>}
          </Reveal>
        )}
        {children}
      </div>
    </section>
  )
}
