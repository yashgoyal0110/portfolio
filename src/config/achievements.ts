import { Trophy, Users, Code2 } from 'lucide-react'
import type { IconType } from '@/components/ui/icons'

export type AchievementKind = 'leadership' | 'competition' | 'community'

export interface Achievement {
  id: string
  title: string
  detail: string
  year: string
  kind: AchievementKind
  icon: IconType
}

export const achievements: Achievement[] = [
  {
    id: 'gdg-lead',
    title: 'GDG on Campus — Lead',
    detail:
      'Led flagship tech events, workshops and community initiatives, strengthening the campus developer ecosystem in collaboration with Google’s GDG network.',
    year: '2024',
    kind: 'leadership',
    icon: Users,
  },
  {
    id: 'icpc',
    title: 'ICPC Prelims — All India Rank 1200',
    detail:
      'Ranked 1200 nationally in the ICPC preliminary round, competing in algorithmic problem solving.',
    year: '2023',
    kind: 'competition',
    icon: Trophy,
  },
  {
    id: 'oss',
    title: 'Open Source Contributor',
    detail:
      'Sustained upstream contributions across OWASP, LitmusChaos (CNCF) and the Palisadoes Foundation.',
    year: 'Ongoing',
    kind: 'community',
    icon: Code2,
  },
]
