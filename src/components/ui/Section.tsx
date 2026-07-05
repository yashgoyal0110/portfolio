import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { Reveal } from './Reveal'

interface SectionProps {
  id: string
  eyebrow?: string
  title?: ReactNode
  intro?: ReactNode
  children: ReactNode
  className?: string
}

/** Standard section shell: anchor id, eyebrow label, heading, intro, content. */
export function Section({ id, eyebrow, title, intro, children, className }: SectionProps) {
  return (
    <section id={id} className={cn('relative scroll-mt-24 py-16 sm:py-20', className)}>
      <div className="container-px">
        {(eyebrow || title || intro) && (
          <Reveal className="mb-10 sm:mb-12 max-w-3xl">
            {eyebrow && (
              <span className="eyebrow">
                <span className="h-px w-6 bg-accent-400/60" />
                {eyebrow}
              </span>
            )}
            {title && (
              <h2 className="mt-4 text-4xl font-semibold sm:text-5xl">{title}</h2>
            )}
            {intro && (
              <p className="mt-5 text-lg leading-relaxed text-mist-400">{intro}</p>
            )}
          </Reveal>
        )}
        {children}
      </div>
    </section>
  )
}
