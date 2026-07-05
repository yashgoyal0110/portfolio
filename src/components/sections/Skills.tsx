import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { skillCategories, skills } from '@/config/skills'
import type { SkillCategory } from '@/config/skills'
import { projects } from '@/config/projects'
import { experience } from '@/config/experience'
import { Section } from '@/components/ui/Section'
import { cn } from '@/lib/cn'

const projectName = (id: string) =>
  projects.find((p) => p.id === id)?.name ??
  experience.find((e) => e.id === id)?.company ??
  id

export function Skills() {
  const [filter, setFilter] = useState<SkillCategory | 'All'>('All')
  const shown = filter === 'All' ? skills : skills.filter((s) => s.category === filter)

  return (
    <Section
      id="skills"
      eyebrow="Capabilities"
      title="The stack I build with"
      intro="Hover any skill to see proficiency and where I've shipped it. Filter by the part of the stack you care about."
    >
      {/* category filter */}
      <div className="mb-10 flex flex-wrap gap-2">
        <FilterChip active={filter === 'All'} onClick={() => setFilter('All')}>
          All
        </FilterChip>
        {skillCategories.map((c) => (
          <FilterChip key={c.id} active={filter === c.id} onClick={() => setFilter(c.id)}>
            {c.id}
          </FilterChip>
        ))}
      </div>

      <motion.div layout className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {shown.map((s) => (
            <motion.div
              key={s.name}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="group card relative overflow-hidden p-4"
            >
              {/* glow on hover */}
              <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-accent-500/20 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />

              <div className="flex items-start justify-between gap-2">
                <span className="font-display text-sm font-medium text-mist-50">{s.name}</span>
                <span className="font-mono text-[10px] text-mist-500">{s.category}</span>
              </div>

              {/* proficiency dots */}
              <div className="mt-3 flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    className={cn(
                      'h-1.5 flex-1 rounded-full transition-colors',
                      i < s.level
                        ? 'bg-gradient-to-r from-accent-400 to-cyan-400'
                        : 'bg-ink-700',
                    )}
                  />
                ))}
              </div>

              {/* reveal on hover */}
              <div className="mt-3 max-h-0 overflow-hidden text-xs text-mist-400 opacity-0 transition-all duration-300 group-hover:max-h-24 group-hover:opacity-100">
                {s.note && <p className="mb-1.5 leading-snug">{s.note}</p>}
                {s.usedIn && s.usedIn.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {s.usedIn.map((id) => (
                      <span key={id} className="rounded bg-ink-700/80 px-1.5 py-0.5 text-[10px] text-accent-300">
                        {projectName(id)}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </Section>
  )
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'rounded-full px-4 py-1.5 text-sm transition-all',
        active
          ? 'bg-gradient-to-b from-accent-300 to-accent-500 text-ink-950'
          : 'glass text-mist-400 hover:text-mist-50',
      )}
    >
      {children}
    </button>
  )
}
