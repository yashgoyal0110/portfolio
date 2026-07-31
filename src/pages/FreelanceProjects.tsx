import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowUpRight, Expand, Mail, Play, X } from 'lucide-react'
import { Github } from '@/components/ui/icons'
import { Reveal } from '@/components/ui/Reveal'
import { profile } from '@/config/profile'
import { email } from '@/config/socials'
import { freelanceIntro, freelanceProjects } from '@/config/freelance'
import type { FreelanceProject } from '@/config/freelance'

export default function FreelanceProjects() {
  const [lightbox, setLightbox] = useState<FreelanceProject | null>(null)

  useEffect(() => {
    const previous = document.title
    document.title = `Freelance Work — ${profile.name}`
    return () => {
      document.title = previous
    }
  }, [])

  return (
    <div className="relative min-h-screen">
      {/* ambient glow */}
      <div className="pointer-events-none fixed inset-0 -z-20 bg-[radial-gradient(65%_45%_at_50%_-10%,rgba(91,108,255,0.20),transparent_70%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[70vh] grid-fade" />

      <TopBar />

      <main className="container-px pb-24 pt-28 sm:pt-32">
        <Hero />

        <div className="mt-16 grid gap-6 lg:mt-20 lg:grid-cols-2">
          {freelanceProjects.map((p, i) => (
            <Reveal key={p.id} delay={(i % 2) * 0.08}>
              <ProjectCard project={p} onExpand={() => setLightbox(p)} />
            </Reveal>
          ))}
        </div>

        <ContactCta />
      </main>

      <Lightbox project={lightbox} onClose={() => setLightbox(null)} />
    </div>
  )
}

/* ------------------------------------------------------------------ *
 *  Chrome
 * ------------------------------------------------------------------ */
function TopBar() {
  const initials = profile.name
    .split(' ')
    .map((w) => w[0])
    .join('')

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <nav className="container-px flex items-center justify-between py-4">
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="glass flex h-10 w-10 items-center justify-center rounded-xl font-display text-sm font-bold text-mist-50"
            aria-label="Back to portfolio"
          >
            {initials}
          </Link>
          <div className="hidden sm:block">
            <div className="font-display text-sm font-semibold text-mist-50">{profile.name}</div>
            <div className="text-xs text-mist-500">Freelance · Full-stack product engineering</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link to="/" className="btn-ghost hidden sm:inline-flex">
            <ArrowLeft className="h-4 w-4" />
            Portfolio
          </Link>
          <a href={`mailto:${email}`} className="btn-primary">
            <Mail className="h-4 w-4" />
            Hire me
          </a>
        </div>
      </nav>
    </header>
  )
}

function Hero() {
  return (
    <Reveal className="max-w-3xl">
      <span className="eyebrow">
        <span className="h-px w-6 bg-accent-400/60" />
        {freelanceIntro.eyebrow}
      </span>
      <h1 className="mt-5 text-4xl font-semibold leading-[1.08] sm:text-6xl">
        <span className="text-gradient">{freelanceIntro.title}</span>
      </h1>
      <p className="mt-6 text-lg leading-relaxed text-mist-400">{freelanceIntro.lede}</p>

      <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {freelanceIntro.stats.map((s) => (
          <div key={s.label} className="rounded-xl border border-ink-700/60 bg-ink-850/40 px-4 py-3">
            <div className="font-display text-xl font-semibold text-mist-50">{s.value}</div>
            <div className="mt-0.5 text-[11px] leading-tight text-mist-500">{s.label}</div>
          </div>
        ))}
      </div>
    </Reveal>
  )
}

/* ------------------------------------------------------------------ *
 *  Project card
 * ------------------------------------------------------------------ */
function ProjectCard({ project, onExpand }: { project: FreelanceProject; onExpand: () => void }) {
  return (
    <article className="card group relative flex h-full flex-col overflow-hidden">
      <div
        className="pointer-events-none absolute -right-20 -top-24 h-56 w-56 rounded-full opacity-20 blur-3xl transition-opacity duration-500 group-hover:opacity-40"
        style={{ background: project.accent }}
      />

      <ProjectVideo project={project} onExpand={onExpand} />

      <div className="flex flex-1 flex-col p-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl font-semibold text-mist-50">{project.name}</h2>
            <p className="mt-1 text-sm" style={{ color: project.accent }}>
              {project.tagline}
            </p>
          </div>
          <span className="shrink-0 font-mono text-xs text-mist-500">{project.year}</span>
        </div>

        <p className="mt-5 text-sm leading-relaxed text-mist-300">{project.description}</p>

        <ul className="mt-5 space-y-2">
          {project.highlights.map((h) => (
            <li key={h} className="flex gap-3 text-sm leading-relaxed text-mist-400">
              <span
                className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ background: project.accent }}
              />
              {h}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap gap-1.5">
          {project.stack.map((t) => (
            <span
              key={t}
              className="rounded-md bg-ink-700/70 px-2 py-0.5 font-mono text-[11px] text-mist-200"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-auto flex flex-wrap gap-3 pt-7">
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noreferrer" className="btn-primary">
              Live site
              <ArrowUpRight className="h-4 w-4" />
            </a>
          )}
          {project.repoUrl && (
            <a href={project.repoUrl} target="_blank" rel="noreferrer" className="btn-ghost">
              <Github className="h-4 w-4" />
              Source
            </a>
          )}
        </div>
      </div>
    </article>
  )
}

/**
 * Muted demo reel that plays only while the card is on screen, and pauses the
 * moment it scrolls away — keeps six videos on one page cheap.
 */
function ProjectVideo({ project, onExpand }: { project: FreelanceProject; onExpand: () => void }) {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) void el.play().catch(() => {})
        else el.pause()
      },
      { threshold: 0.35 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  if (!project.video) return <VideoPlaceholder project={project} />

  return (
    <div className="relative aspect-video w-full overflow-hidden bg-ink-900">
      <video
        ref={ref}
        src={project.video}
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={`${project.name} demo reel`}
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
      />
      {/* bottom fade into the card body */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-ink-850 to-transparent" />
      <div
        className="pointer-events-none absolute inset-0 ring-1 ring-inset"
        style={{ boxShadow: `inset 0 0 80px -30px ${project.accent}` }}
      />

      <button
        type="button"
        onClick={onExpand}
        aria-label={`Play ${project.name} demo full size`}
        className="glass absolute right-3 top-3 flex h-9 items-center gap-2 rounded-full px-3 text-xs text-mist-200 opacity-0 transition-all duration-300 hover:text-mist-50 focus-visible:opacity-100 group-hover:opacity-100"
      >
        <Expand className="h-3.5 w-3.5" />
        Expand
      </button>

      <span className="absolute bottom-3 left-4 flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-mist-400">
        <Play className="h-3 w-3" style={{ color: project.accent }} />
        Live demo reel
      </span>
    </div>
  )
}

/** Shown for projects that don't have a recorded reel yet. */
function VideoPlaceholder({ project }: { project: FreelanceProject }) {
  return (
    <div className="relative flex aspect-video w-full items-center justify-center overflow-hidden bg-ink-900">
      <div
        className="absolute inset-0 opacity-25"
        style={{
          background: `radial-gradient(120% 90% at 50% 0%, ${project.accent}, transparent 65%)`,
        }}
      />
      <div className="absolute inset-0 grid-fade opacity-60" />
      <span className="relative font-display text-3xl font-semibold tracking-tight text-mist-50/85">
        {project.name}
      </span>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-ink-850 to-transparent" />
    </div>
  )
}

/* ------------------------------------------------------------------ *
 *  Lightbox
 * ------------------------------------------------------------------ */
function Lightbox({ project, onClose }: { project: FreelanceProject | null; onClose: () => void }) {
  useEffect(() => {
    if (!project) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [project, onClose])

  return (
    <AnimatePresence>
      {project?.video && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-ink-950/90 backdrop-blur-sm" onClick={onClose} aria-hidden />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${project.name} demo`}
            initial={{ scale: 0.97, opacity: 0, y: 16 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.98, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 280, damping: 30 }}
            className="relative z-10 w-full max-w-5xl"
          >
            <div className="mb-3 flex items-end justify-between gap-4">
              <div>
                <h3 className="font-display text-xl font-semibold text-mist-50">{project.name}</h3>
                <p className="text-sm text-mist-400">{project.tagline}</p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="glass flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-mist-300 hover:text-mist-50"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <video
              key={project.id}
              src={project.video}
              controls
              autoPlay
              loop
              playsInline
              className="max-h-[75vh] w-full rounded-[var(--radius-card)] border border-ink-700/60 bg-black"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ------------------------------------------------------------------ *
 *  Closing CTA
 * ------------------------------------------------------------------ */
function ContactCta() {
  return (
    <Reveal className="mt-20">
      <div className="card relative overflow-hidden p-10 text-center sm:p-14">
        <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-accent-500/25 blur-3xl" />
        <h2 className="relative text-3xl font-semibold sm:text-4xl">Have something to build?</h2>
        <p className="relative mx-auto mt-4 max-w-xl text-mist-400">
          I take products from first sketch to a live, monitored deployment — design, backend,
          infrastructure and the AI layer in between. Tell me what you need and I’ll tell you
          exactly how I’d ship it.
        </p>
        <div className="relative mt-8 flex flex-wrap items-center justify-center gap-3">
          <a href={`mailto:${email}`} className="btn-primary">
            <Mail className="h-4 w-4" />
            {email}
          </a>
          <Link to="/" className="btn-ghost">
            <ArrowLeft className="h-4 w-4" />
            Back to portfolio
          </Link>
        </div>
      </div>
    </Reveal>
  )
}
