import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Boxes, X } from 'lucide-react'
import { Github } from '@/components/ui/icons'
import { projects } from '@/config/projects'
import type { Project, ProjectKind } from '@/config/projects'
import { Section } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'

const kindLabel: Record<ProjectKind, string> = {
  featured: 'Featured',
  opensource: 'Open Source',
  startup: 'Startup',
  research: 'Research',
}

export function Projects() {
  const [active, setActive] = useState<Project | null>(null)

  return (
    <Section
      id="projects"
      eyebrow="Selected Work"
      title="Things I've built"
      intro="A few systems I designed and shipped end-to-end. Open one to see the problem, architecture and impact."
    >
      <div className="grid gap-5 md:grid-cols-2">
        {projects.map((p, i) => (
          <Reveal key={p.id} delay={i * 0.06}>
            <button
              type="button"
              onClick={() => setActive(p)}
              className="card group relative h-full w-full overflow-hidden p-7 text-left"
            >
              <div
                className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full opacity-25 blur-3xl transition-opacity duration-500 group-hover:opacity-50"
                style={{ background: p.accent }}
              />
              <div className="flex items-center justify-between">
                <span
                  className="rounded-full px-2.5 py-1 text-[11px] font-medium"
                  style={{ background: `${p.accent}22`, color: p.accent }}
                >
                  {kindLabel[p.kind]}
                </span>
                <span className="font-mono text-xs text-mist-500">{p.year}</span>
              </div>

              <h3 className="mt-5 flex items-center gap-2 text-2xl font-semibold text-mist-50">
                {p.name}
                <ArrowUpRight className="h-5 w-5 text-mist-500 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-mist-50" />
              </h3>
              <p className="mt-2 text-mist-400">{p.tagline}</p>

              <div className="mt-5 flex flex-wrap gap-1.5">
                {p.stack.slice(0, 6).map((t) => (
                  <span
                    key={t}
                    className="rounded-md bg-ink-700/70 px-2 py-0.5 font-mono text-[11px] text-mist-300"
                  >
                    {t}
                  </span>
                ))}
                {p.stack.length > 6 && (
                  <span className="px-1 font-mono text-[11px] text-mist-500">
                    +{p.stack.length - 6}
                  </span>
                )}
              </div>
            </button>
          </Reveal>
        ))}
      </div>

      <ProjectModal project={active} onClose={() => setActive(null)} />
    </Section>
  )
}

function ProjectModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-end justify-center p-3 sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 bg-ink-950/80 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={project.name}
            initial={{ y: 40, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 280, damping: 30 }}
            className="card relative z-10 max-h-[88vh] w-full max-w-2xl overflow-y-auto p-7 sm:p-9"
          >
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-32 opacity-30 blur-2xl"
              style={{ background: `linear-gradient(${project.accent}, transparent)` }}
            />
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="glass absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-mist-300 hover:text-mist-50"
            >
              <X className="h-4 w-4" />
            </button>

            <span
              className="rounded-full px-2.5 py-1 text-[11px] font-medium"
              style={{ background: `${project.accent}22`, color: project.accent }}
            >
              {kindLabel[project.kind]} · {project.year}
            </span>
            <h3 className="mt-4 text-3xl font-semibold text-mist-50">{project.name}</h3>
            <p className="mt-1 text-mist-400">{project.tagline}</p>

            <Block icon={<Boxes className="h-4 w-4" />} label="Problem">
              {project.problem}
            </Block>
            <Block label="Architecture">{project.architecture}</Block>

            <div className="mt-6">
              <h4 className="eyebrow mb-3">Highlights</h4>
              <ul className="space-y-2">
                {project.features.map((f, i) => (
                  <li key={i} className="flex gap-3 text-sm leading-relaxed text-mist-300">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: project.accent }} />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              {project.metrics.map((m) => (
                <div key={m.label} className="rounded-xl border border-ink-700/60 bg-ink-800/50 p-3">
                  <div className="font-display text-base font-semibold text-mist-50">{m.value}</div>
                  <div className="mt-0.5 text-[11px] leading-tight text-mist-500">{m.label}</div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-1.5">
              {project.stack.map((t) => (
                <span key={t} className="rounded-md bg-ink-700/70 px-2 py-0.5 font-mono text-[11px] text-mist-300">
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              {project.links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  className={l.label.toLowerCase().includes('demo') ? 'btn-primary' : 'btn-ghost'}
                >
                  {l.label.toLowerCase().includes('git') && <Github className="h-4 w-4" />}
                  {l.label}
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function Block({
  label,
  icon,
  children,
}: {
  label: string
  icon?: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <div className="mt-6">
      <h4 className="eyebrow mb-2">
        {icon}
        {label}
      </h4>
      <p className="text-sm leading-relaxed text-mist-300">{children}</p>
    </div>
  )
}
