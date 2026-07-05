import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, MapPin } from 'lucide-react'
import { experience } from '@/config/experience'
import { Section } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { cn } from '@/lib/cn'

export function Experience() {
  const [open, setOpen] = useState<string | null>(experience[0]?.id ?? null)

  return (
    <Section
      id="experience"
      eyebrow="Experience"
      title="Where I've shipped"
      intro="Roles spanning real-time robotics, forward-deployed infrastructure, and core backend product engineering."
    >
      <div className="relative">
        {/* timeline rail */}
        <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-accent-500/60 via-ink-600 to-transparent sm:left-[9px]" />

        <div className="space-y-5">
          {experience.map((exp, i) => {
            const isOpen = open === exp.id
            return (
              <Reveal key={exp.id} delay={i * 0.05}>
                <div className="relative pl-9 sm:pl-12">
                  {/* node */}
                  <span className="absolute left-0 top-6 flex h-4 w-4 items-center justify-center">
                    <span className="h-4 w-4 rounded-full border-2 border-accent-400 bg-ink-950" />
                    <span className="absolute h-2 w-2 rounded-full bg-accent-400" />
                  </span>

                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : exp.id)}
                    className="card w-full p-6 text-left transition-colors hover:border-accent-400/40"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
                      <div>
                        <h3 className="text-xl font-semibold text-mist-50">{exp.role}</h3>
                        <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-mist-400">
                          <span className="font-medium text-accent-300">{exp.company}</span>
                          <span className="inline-flex items-center gap-1">
                            <MapPin className="h-3.5 w-3.5" /> {exp.location}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs text-mist-500">
                          {exp.start} — {exp.end}
                        </span>
                        <ChevronDown
                          className={cn(
                            'h-5 w-5 text-mist-500 transition-transform',
                            isOpen && 'rotate-180',
                          )}
                        />
                      </div>
                    </div>

                    <p className="mt-3 text-mist-300">{exp.summary}</p>

                    {/* impact chips */}
                    <div className="mt-4 flex flex-wrap gap-2">
                      {exp.impact.map((m) => (
                        <span
                          key={m.label}
                          className="rounded-lg border border-ink-600/70 bg-ink-800/60 px-2.5 py-1 text-xs"
                        >
                          <span className="font-semibold text-cyan-400">{m.value}</span>{' '}
                          <span className="text-mist-500">{m.label}</span>
                        </span>
                      ))}
                    </div>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <ul className="mt-5 space-y-2.5 border-t border-ink-700/60 pt-5">
                            {exp.highlights.map((h, hi) => (
                              <li key={hi} className="flex gap-3 text-sm leading-relaxed text-mist-300">
                                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-400" />
                                {h}
                              </li>
                            ))}
                          </ul>
                          <div className="mt-4 flex flex-wrap gap-1.5">
                            {exp.stack.map((t) => (
                              <span
                                key={t}
                                className="rounded-md bg-ink-700/70 px-2 py-0.5 font-mono text-[11px] text-mist-300"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </Section>
  )
}
