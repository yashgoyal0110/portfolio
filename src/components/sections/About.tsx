import { Compass, Sparkles, Target } from 'lucide-react'
import { profile } from '@/config/profile'
import { Section } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'

export function About() {
  return (
    <Section
      id="about"
      eyebrow="About"
      title={<span className="text-gradient">Product-minded, infrastructure-deep.</span>}
    >
      {/* stat strip */}
      <Reveal className="mb-14 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {profile.stats.map((s) => (
          <div key={s.label} className="card p-5">
            <div className="font-display text-3xl font-semibold text-mist-50 sm:text-4xl">
              {s.value}
            </div>
            <div className="mt-1 text-xs leading-snug text-mist-500">{s.label}</div>
          </div>
        ))}
      </Reveal>

      <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <Reveal className="space-y-5">
          {profile.about.map((p, i) => (
            <p key={i} className="text-lg leading-relaxed text-mist-300">
              {p}
            </p>
          ))}
        </Reveal>

        <Reveal delay={0.1} className="space-y-4">
          <div className="card p-6">
            <div className="eyebrow mb-2">
              <Sparkles className="h-3.5 w-3.5" /> Philosophy
            </div>
            <p className="text-mist-200">{profile.philosophy}</p>
          </div>
          <div className="card p-6">
            <div className="eyebrow mb-2">
              <Target className="h-3.5 w-3.5" /> Current focus
            </div>
            <p className="text-mist-200">{profile.currentFocus}</p>
          </div>
          <div className="card p-6">
            <div className="eyebrow mb-3">
              <Compass className="h-3.5 w-3.5" /> Interests
            </div>
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
      </div>
    </Section>
  )
}
