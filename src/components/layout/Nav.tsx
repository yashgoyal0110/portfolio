import { useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { Command, Menu, X } from 'lucide-react'
import { navItems } from '@/config/navigation'
import { profile } from '@/config/profile'
import { useScrollSpy } from '@/hooks/useScrollSpy'
import { cn } from '@/lib/cn'

interface NavProps {
  onOpenRecruiter: () => void
}

export function Nav({ onOpenRecruiter }: NavProps) {
  const active = useScrollSpy(navItems.map((n) => n.id))
  const [open, setOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 })

  const initials = profile.name
    .split(' ')
    .map((w) => w[0])
    .join('')

  return (
    <>
      {/* scroll progress */}
      <motion.div
        className="fixed inset-x-0 top-0 z-50 h-0.5 origin-left bg-gradient-to-r from-accent-400 to-cyan-400"
        style={{ scaleX: progress }}
      />

      <header className="fixed inset-x-0 top-0 z-40">
        <nav className="container-px flex items-center justify-between py-4">
          {/* monogram */}
          <a
            href="#home"
            className="glass flex h-10 w-10 items-center justify-center rounded-xl font-display text-sm font-bold text-mist-50"
            aria-label="Home"
          >
            {initials}
          </a>

          {/* desktop links */}
          <div className="glass hidden items-center gap-1 rounded-full px-2 py-1.5 md:flex">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={cn(
                  'relative rounded-full px-3.5 py-1.5 text-sm transition-colors',
                  active === item.id ? 'text-ink-950' : 'text-mist-400 hover:text-mist-50',
                )}
              >
                {active === item.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-gradient-to-b from-accent-300 to-accent-500"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onOpenRecruiter}
              className="btn-primary hidden sm:inline-flex"
            >
              <Command className="h-4 w-4" />
              Recruiter Mode
            </button>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="glass flex h-10 w-10 items-center justify-center rounded-xl text-mist-200 md:hidden"
              aria-label="Toggle menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>

        {/* mobile sheet */}
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="container-px md:hidden"
          >
            <div className="card flex flex-col gap-1 p-3">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setOpen(false)}
                  className={cn(
                    'rounded-xl px-4 py-2.5 text-sm',
                    active === item.id ? 'bg-ink-700 text-mist-50' : 'text-mist-400',
                  )}
                >
                  {item.label}
                </a>
              ))}
              <button
                type="button"
                onClick={() => {
                  setOpen(false)
                  onOpenRecruiter()
                }}
                className="btn-primary mt-2"
              >
                <Command className="h-4 w-4" />
                Recruiter Mode
              </button>
            </div>
          </motion.div>
        )}
      </header>
    </>
  )
}
