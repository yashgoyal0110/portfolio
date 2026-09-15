import { Suspense, lazy, useState } from 'react'
import { ArrowDown, FileText, Mail, MapPin } from 'lucide-react'
import type { HeroTopic } from '@/components/three/HeroScene'
import { profile } from '@/config/profile'
import { experience } from '@/config/experience'
import { skills } from '@/config/skills'
import { useTypewriter } from '@/hooks/useTypewriter'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/cn'

const HeroScene = lazy(() => import('@/components/three/HeroScene'))

/** Current role = the experience still marked "Present". */
const current = experience.find((e) => e.end === 'Present')

/** Deepest skills only — a compact signal of the stack, not a second Skills section. */
const coreStack = skills.filter((s) => s.level === 5).map((s) => s.name)

export function Hero() {
  const role = useTypewriter(profile.roles)
  const [topic, setTopic] = useState<HeroTopic | null>(null)

  return (
    <section id="home" className="relative min-h-[100svh] overflow-hidden">
      {/* Interactive 3D backdrop. It sits at z-0 rather than a negative z-index
          on purpose: a negative z-index paints below the <section> box, which
          then hit-tests above it and swallows every pointer event. */}
      <div className="absolute inset-0 z-0 lg:left-[30%]">
        <Suspense fallback={<div className="h-full w-full bg-ink-950" />}>
          <HeroScene onFocusTopic={setTopic} />
        </Suspense>
      </div>

      {/* ambient layers — later in DOM order, so they still paint over the canvas */}
      <div className="grid-fade pointer-events-none absolute inset-0 z-0 opacity-60" />
      <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-ink-950/30 via-transparent to-ink-950" />

      {/* click-through by default so the constellation behind stays reachable;
          anything interactive re-enables pointer events on itself */}
      <div className="container-px pointer-events-none relative z-10 flex min-h-[100svh] flex-col justify-center pt-28 pb-28">
        <div className="max-w-3xl">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="glass inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs text-mist-300">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              {profile.availability}
            </span>
            <span className="glass inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs text-mist-400">
              <MapPin className="h-3.5 w-3.5 text-accent-300" />
              {profile.location}
            </span>
          </div>

          <h1 className="mt-6 text-5xl font-semibold leading-[1.05] sm:text-7xl">
            {profile.name}
          </h1>

          <div className="mt-4 flex items-center gap-1 font-display text-2xl text-accent-300 sm:text-3xl">
            <span>{role}</span>
            <span className="cursor-blink text-accent-400">▍</span>
          </div>

          <p className="mt-5 max-w-xl text-lg leading-relaxed text-mist-400">
            {profile.tagline}
          </p>

          {current && (
            <div className="mt-5 inline-flex items-center gap-2 text-sm text-mist-400">
              <span className="font-mono text-xs uppercase tracking-[0.18em] text-mist-500">Now</span>
              <span className="h-3 w-px bg-ink-600" />
              <span className="text-mist-200">{current.role}</span>
              <span className="text-accent-300">@ {current.company}</span>
            </div>
          )}

          <div className="pointer-events-auto mt-9 flex flex-wrap items-center gap-3">
            <Button href={profile.resumeUrl} variant="primary" download="Yash-Goyal-Resume.pdf">
              <FileText className="h-4 w-4" />
              Résumé
            </Button>
            <Button href="#contact">
              <Mail className="h-4 w-4" />
              Get in touch
            </Button>
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-xs text-mist-500">
            <span className="uppercase tracking-[0.18em] text-mist-600">Working with</span>
            {coreStack.map((name) => (
              <span key={name} className="flex items-center gap-3">
                <span className="h-1 w-1 rounded-full bg-ink-600" />
                <span className="text-mist-400">{name}</span>
              </span>
            ))}
          </div>
        </div>

        <div className="container-px absolute inset-x-0 bottom-8 flex flex-wrap items-center justify-between gap-4">
          {/* scroll hint */}
          <a
            href="#about"
            aria-label="Scroll to about"
            className="pointer-events-auto inline-flex w-fit items-center gap-2 text-xs uppercase tracking-[0.2em] text-mist-500 transition-colors hover:text-mist-200"
          >
            <ArrowDown className="h-4 w-4" />
            Scroll to explore
          </a>

          {/* captions the focused constellation node, and hints that it's interactive */}
          <div className="hidden items-center gap-2 font-mono text-[11px] text-mist-500 sm:flex">
            <span
              className={cn(
                'h-1.5 w-1.5 rounded-full',
                topic ? 'bg-accent-300' : 'bg-ink-600',
              )}
            />
            {topic ? (
              <span className="text-mist-200">
                {topic.label}
                <span className="ml-2 text-mist-500">click to open</span>
              </span>
            ) : (
              <span>Hover the nodes to explore what I build</span>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
