import { Suspense, lazy } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, FileText, Mail } from 'lucide-react'
import { Github, Linkedin } from '@/components/ui/icons'
import { profile } from '@/config/profile'
import { socials } from '@/config/socials'
import { useTypewriter } from '@/hooks/useTypewriter'
import { MagneticButton } from '@/components/ui/MagneticButton'

const HeroScene = lazy(() => import('@/components/three/HeroScene'))

function social(id: string) {
  return socials.find((s) => s.id === id)?.href ?? '#'
}

export function Hero() {
  const role = useTypewriter(profile.roles)

  return (
    <section id="home" className="relative min-h-[100svh] overflow-hidden">
      {/* 3D backdrop */}
      <div className="absolute inset-0 -z-10">
        <Suspense fallback={<div className="h-full w-full bg-ink-950" />}>
          <HeroScene />
        </Suspense>
      </div>

      {/* ambient layers */}
      <div className="grid-fade pointer-events-none absolute inset-0 -z-10 opacity-60" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-ink-950/30 via-transparent to-ink-950" />

      <div className="container-px flex min-h-[100svh] flex-col justify-center pt-28 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <span className="glass inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs text-mist-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            {profile.availability}
          </span>

          <h1 className="mt-6 text-5xl font-semibold leading-[1.05] sm:text-7xl">
            {profile.name}
          </h1>

          <div className="mt-4 flex items-center gap-1 font-display text-2xl text-accent-300 sm:text-3xl">
            <span>{role}</span>
            <span className="cursor-blink text-accent-400">▍</span>
          </div>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-mist-400">
            {profile.intro}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <MagneticButton href={profile.resumeUrl} variant="primary" download="Yash-Goyal-Resume.pdf">
              <FileText className="h-4 w-4" />
              Résumé
            </MagneticButton>
            <MagneticButton href="#contact">
              <Mail className="h-4 w-4" />
              Get in touch
            </MagneticButton>
            <MagneticButton href={social('github')} external ariaLabel="GitHub">
              <Github className="h-4 w-4" />
              GitHub
            </MagneticButton>
            <MagneticButton href={social('linkedin')} external ariaLabel="LinkedIn">
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </MagneticButton>
          </div>
        </motion.div>

        {/* scroll hint */}
        <motion.a
          href="#about"
          aria-label="Scroll to about"
          className="mt-16 inline-flex w-fit items-center gap-2 text-xs uppercase tracking-[0.2em] text-mist-500"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown className="h-4 w-4" />
          Scroll to explore
        </motion.a>
      </div>
    </section>
  )
}
