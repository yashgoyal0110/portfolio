import { ArrowUpRight, GitPullRequest } from 'lucide-react'
import { openSource, openSourceIntro } from '@/config/opensource'
import { Section } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'

export function OpenSource() {
  return (
    <Section
      id="opensource"
      eyebrow="Community"
      title="Open source contributions"
      intro={openSourceIntro.blurb}
    >
      <Reveal className="mb-8">
        <a
          href={openSourceIntro.dashboard.href}
          target="_blank"
          rel="noreferrer"
          className="btn-ghost"
        >
          <GitPullRequest className="h-4 w-4" />
          {openSourceIntro.dashboard.label}
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </Reveal>

      <div className="grid gap-5 md:grid-cols-3">
        {openSource.map((org, i) => (
          <Reveal key={org.id} delay={i * 0.07}>
            <a
              href={org.href}
              target="_blank"
              rel="noreferrer"
              className="card group flex h-full flex-col p-6 transition-colors hover:border-accent-400/40"
            >
              <div className="flex items-start justify-between">
                <h3 className="text-lg font-semibold text-mist-50">{org.org}</h3>
                <ArrowUpRight className="h-4 w-4 text-mist-500 transition-colors group-hover:text-mist-50" />
              </div>
              <p className="mt-1 text-xs text-mist-500">{org.about}</p>

              <ul className="mt-4 flex-1 space-y-2">
                {org.contributions.map((c, ci) => (
                  <li key={ci} className="flex gap-2.5 text-sm leading-snug text-mist-300">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent-400" />
                    {c}
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex flex-wrap gap-1.5">
                {org.areas.map((a) => (
                  <span
                    key={a}
                    className="rounded-md bg-ink-700/70 px-2 py-0.5 font-mono text-[11px] text-accent-300"
                  >
                    {a}
                  </span>
                ))}
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
