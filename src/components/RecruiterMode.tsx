import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Download, FileText, X } from 'lucide-react'
import { profile } from '@/config/profile'
import { experience } from '@/config/experience'
import { projects } from '@/config/projects'
import { skills } from '@/config/skills'
import { achievements } from '@/config/achievements'

/** Top skills by proficiency for the snapshot. */
const topSkills = [...skills].sort((a, b) => b.level - a.level).slice(0, 14)

interface RecruiterModeProps {
  open: boolean
  onClose: () => void
}

export function RecruiterMode({ open, onClose }: RecruiterModeProps) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[70] flex justify-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-ink-950/80 backdrop-blur-sm" onClick={onClose} aria-hidden />

          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Recruiter snapshot"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 34 }}
            className="relative z-10 flex h-full w-full max-w-md flex-col border-l border-ink-700/60 bg-ink-900/95 shadow-2xl"
          >
            {/* header */}
            <div className="flex items-center justify-between border-b border-ink-700/60 px-6 py-4">
              <div>
                <div className="eyebrow">Technical Snapshot</div>
                <h3 className="mt-1 text-lg font-semibold text-mist-50">{profile.name}</h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="glass flex h-9 w-9 items-center justify-center rounded-full text-mist-300 hover:text-mist-50"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 space-y-7 overflow-y-auto px-6 py-6">
              {/* stats */}
              <div className="grid grid-cols-2 gap-3">
                {profile.stats.map((s) => (
                  <div key={s.label} className="rounded-xl border border-ink-700/60 bg-ink-850/60 p-3">
                    <div className="font-display text-2xl font-semibold text-mist-50">{s.value}</div>
                    <div className="mt-0.5 text-[11px] leading-tight text-mist-500">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* experience snapshot */}
              <Group title="Experience">
                {experience.map((e) => (
                  <div key={e.id} className="flex items-baseline justify-between gap-3 py-1.5 text-sm">
                    <div>
                      <span className="text-mist-100">{e.role}</span>
                      <span className="text-mist-500"> · {e.company}</span>
                    </div>
                    <span className="shrink-0 font-mono text-[11px] text-mist-600">
                      {e.start.split(' ')[1]}–{e.end === 'Present' ? 'now' : e.end.split(' ')[1]}
                    </span>
                  </div>
                ))}
              </Group>

              {/* key projects */}
              <Group title="Key projects">
                {projects.map((p) => (
                  <div key={p.id} className="py-1.5 text-sm">
                    <span className="text-mist-100">{p.name}</span>
                    <span className="text-mist-500"> — {p.tagline}</span>
                  </div>
                ))}
              </Group>

              {/* skills */}
              <Group title="Core stack">
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {topSkills.map((s) => (
                    <span
                      key={s.name}
                      className="rounded-md bg-ink-700/70 px-2 py-0.5 font-mono text-[11px] text-mist-200"
                    >
                      {s.name}
                    </span>
                  ))}
                </div>
              </Group>

              {/* achievements */}
              <Group title="Highlights">
                {achievements.map((a) => (
                  <div key={a.id} className="flex gap-2.5 py-1 text-sm text-mist-300">
                    <a.icon className="mt-0.5 h-4 w-4 shrink-0 text-accent-300" />
                    {a.title}
                  </div>
                ))}
              </Group>
            </div>

            {/* footer CTA */}
            <div className="border-t border-ink-700/60 p-5">
              <a href={profile.resumeUrl} download="Yash-Goyal-Resume.pdf" className="btn-primary w-full">
                <Download className="h-4 w-4" />
                Download full résumé
                <FileText className="h-4 w-4" />
              </a>
            </div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="eyebrow mb-2">{title}</h4>
      <div className="divide-y divide-ink-700/40">{children}</div>
    </div>
  )
}
