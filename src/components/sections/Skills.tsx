import { skillCategories, skills } from '@/config/skills'
import type { Skill, SkillCategory } from '@/config/skills'
import { projects } from '@/config/projects'
import { experience } from '@/config/experience'
import { Section } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'

const projectName = (id: string) =>
  projects.find((p) => p.id === id)?.name ??
  experience.find((e) => e.id === id)?.company ??
  id

/** Strongest first within each category, so the eye lands on the deepest skills. */
const byCategory = (category: SkillCategory) =>
  skills.filter((s) => s.category === category).sort((a, b) => b.level - a.level)

/** Native tooltip copy: what it was used for and where it shipped. */
function detail(s: Skill) {
  const where = s.usedIn?.length ? `Shipped in ${s.usedIn.map(projectName).join(', ')}` : ''
  return [s.note, where].filter(Boolean).join(' · ') || undefined
}

export function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Capabilities"
      title="The stack I build with"
      intro="Grouped by where each piece sits in the stack, from the languages up to the tooling that keeps things running in production."
    >
      <Reveal>
        {/* masonry columns so cards pack by height instead of leaving dead grid cells */}
        <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
          {skillCategories.map((c) => {
            const items = byCategory(c.id)
            if (items.length === 0) return null

            return (
              <div
                key={c.id}
                className="card relative mb-5 break-inside-avoid overflow-hidden p-6"
              >
                {/* static category glow */}
                <div
                  className="pointer-events-none absolute -right-14 -top-14 h-36 w-36 rounded-full opacity-20 blur-3xl"
                  style={{ background: c.accent }}
                />

                <div className="flex items-center gap-3">
                  <span
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border"
                    style={{
                      background: `${c.accent}18`,
                      borderColor: `${c.accent}40`,
                      color: c.accent,
                    }}
                  >
                    <c.icon className="h-4 w-4" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-display text-base font-medium text-mist-50">{c.id}</h3>
                    <p className="text-xs leading-snug text-mist-500">{c.blurb}</p>
                  </div>
                  <span className="ml-auto font-mono text-[11px] text-mist-500">
                    {String(items.length).padStart(2, '0')}
                  </span>
                </div>

                <ul className="mt-5 flex flex-wrap gap-2">
                  {items.map((s) => {
                    const core = s.level >= 5
                    return (
                      <li
                        key={s.name}
                        title={detail(s)}
                        className="rounded-lg border px-3 py-1.5 text-sm"
                        style={
                          core
                            ? {
                                background: `${c.accent}14`,
                                borderColor: `${c.accent}55`,
                                color: c.accent,
                              }
                            : {
                                background: 'rgb(20 22 31 / 0.5)',
                                borderColor: 'rgb(42 46 66 / 0.6)',
                                color: 'var(--color-mist-200)',
                              }
                        }
                      >
                        {s.name}
                      </li>
                    )
                  })}
                </ul>
              </div>
            )
          })}
        </div>
      </Reveal>

      <Reveal>
        <p className="mt-2 font-mono text-[11px] text-mist-500">
          Tinted entries are the tools I reach for daily. Hover any item to see where I shipped it.
        </p>
      </Reveal>
    </Section>
  )
}
