import { GraduationCap } from 'lucide-react'
import { education } from '@/config/education'
import { achievements } from '@/config/achievements'
import { Section } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'

export function Education() {
  return (
    <Section id="education" eyebrow="Background" title="Education & achievements">
      <div className="grid gap-5 lg:grid-cols-[1.3fr_1fr]">
        {/* education */}
        <div className="space-y-5">
          {education.map((edu, i) => (
            <Reveal key={edu.id} delay={i * 0.05}>
              <div className="card p-7">
                <div className="flex items-start gap-4">
                  <div className="glass flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-accent-300">
                    <GraduationCap className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                      <h3 className="text-xl font-semibold text-mist-50">{edu.institution}</h3>
                      <span className="font-mono text-xs text-mist-500">
                        {edu.start} — {edu.end}
                      </span>
                    </div>
                    <p className="mt-1 text-mist-300">
                      {edu.degree}, {edu.field}
                    </p>
                    <p className="text-sm text-mist-500">
                      {edu.location}
                      {edu.grade && <span className="text-accent-300"> · {edu.grade}</span>}
                    </p>
                  </div>
                </div>

                <ul className="mt-5 space-y-2">
                  {edu.highlights.map((h, hi) => (
                    <li key={hi} className="flex gap-2.5 text-sm text-mist-300">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-cyan-400" />
                      {h}
                    </li>
                  ))}
                </ul>

                <div className="mt-5 border-t border-ink-700/60 pt-4">
                  <div className="eyebrow mb-2">Coursework</div>
                  <div className="flex flex-wrap gap-1.5">
                    {edu.coursework.map((c) => (
                      <span
                        key={c}
                        className="rounded-md bg-ink-700/70 px-2 py-0.5 text-[11px] text-mist-300"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* achievements */}
        <div className="space-y-4">
          {achievements.map((a, i) => (
            <Reveal key={a.id} delay={0.1 + i * 0.06}>
              <div className="card group flex items-start gap-4 p-5">
                <div className="glass flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-accent-300 transition-colors group-hover:text-cyan-400">
                  <a.icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="flex items-baseline gap-2">
                    <h4 className="font-semibold text-mist-50">{a.title}</h4>
                    <span className="font-mono text-[11px] text-mist-500">{a.year}</span>
                  </div>
                  <p className="mt-1 text-sm leading-snug text-mist-400">{a.detail}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  )
}
