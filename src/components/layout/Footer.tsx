import { ArrowUp } from 'lucide-react'
import { profile } from '@/config/profile'
import { socials } from '@/config/socials'

export function Footer() {
  const year = 2026 // build-time constant; bump as needed
  return (
    <footer className="border-t border-ink-700/60 py-10">
      <div className="container-px flex flex-col items-center justify-between gap-6 sm:flex-row">
        <div className="text-sm text-mist-500">
          © {year} {profile.name}
        </div>
        <div className="flex items-center gap-4">
          {socials
            .filter((s) => s.primary)
            .map((s) => (
              <a
                key={s.id}
                href={s.href}
                target={s.href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                aria-label={s.label}
                className="text-mist-400 transition-colors hover:text-mist-50"
              >
                <s.icon className="h-5 w-5" />
              </a>
            ))}
          <a
            href="#home"
            aria-label="Back to top"
            className="glass ml-2 flex h-9 w-9 items-center justify-center rounded-full text-mist-200 transition-colors hover:text-mist-50"
          >
            <ArrowUp className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  )
}
