import { profile } from '@/config/profile'
import { socials } from '@/config/socials'
import { Section } from '@/components/ui/Section'

/**
 * The single place social + contact links live. The hero deliberately carries
 * only intent CTAs (résumé, "get in touch") and the footer carries none, so the
 * same six links aren't repeated across three sections.
 */
export function Contact() {
  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title={<span className="text-gradient">Let's build something reliable.</span>}
      intro={`${profile.availability}, remote or on-site. Email is the fastest way to reach me.`}
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {socials.map((s) => (
          <a
            key={s.id}
            href={s.href}
            target={s.href.startsWith('http') ? '_blank' : undefined}
            rel="noreferrer"
            download={s.id === 'resume' ? 'Yash-Goyal-Resume.pdf' : undefined}
            className="card group flex items-center gap-4 p-4 transition-colors hover:border-accent-400/40"
          >
            <div className="glass flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-accent-300">
              <s.icon className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <div className="text-sm font-medium text-mist-50">{s.label}</div>
              <div className="truncate font-mono text-xs text-mist-500">{s.handle}</div>
            </div>
          </a>
        ))}
      </div>
    </Section>
  )
}
