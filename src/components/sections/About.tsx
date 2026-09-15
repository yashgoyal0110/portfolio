import { profile } from '@/config/profile'
import { Section } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'

export function About() {
  const [lead, ...rest] = profile.about

  return (
    <Section
      id="about"
      title={<span className="text-gradient">Product-minded, infrastructure-deep.</span>}
    >
      {/* stat strip */}
      <Reveal className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {profile.stats.map((s) => (
          <div key={s.label} className="card p-5">
            <div className="font-display text-3xl font-semibold text-mist-50 sm:text-4xl">
              {s.value}
            </div>
            <div className="mt-1 text-xs leading-snug text-mist-500">{s.label}</div>
          </div>
        ))}
      </Reveal>

      {/* narrative — full width at a readable measure, so nothing is left
          hanging beside a taller column */}
      <Reveal delay={0.05} className="mt-14 max-w-3xl">
        <p className="border-l-2 border-accent-400/40 pl-5 text-xl leading-relaxed text-mist-100">
          {lead}
        </p>
        <div className="mt-5 space-y-4 pl-5">
          {rest.map((p, i) => (
            <p key={i} className="leading-relaxed text-mist-300">
              {p}
            </p>
          ))}
        </div>
      </Reveal>

      {/* the three facets, side by side rather than stacked in a side rail */}
      <Reveal delay={0.1} className="mt-14 grid gap-4 md:grid-cols-3">
        <div className="card p-6">
          <div className="eyebrow mb-2">Philosophy</div>
          <p className="text-mist-200">{profile.philosophy}</p>
        </div>
        <div className="card p-6">
          <div className="eyebrow mb-2">Current focus</div>
          <p className="text-mist-200">{profile.currentFocus}</p>
        </div>
        <div className="card p-6">
          <div className="eyebrow mb-3">Interests</div>
          <div className="flex flex-wrap gap-2">
            {profile.interests.map((it) => (
              <span
                key={it}
                className="rounded-full border border-ink-600/70 bg-ink-800/60 px-3 py-1 text-xs text-mist-300"
              >
                {it}
              </span>
            ))}
          </div>
        </div>
      </Reveal>
    </Section>
  )
}
