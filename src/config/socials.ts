import { Mail, FileText, Phone } from 'lucide-react'
import { Github, Linkedin, XLogo } from '@/components/ui/icons'
import type { IconType } from '@/components/ui/icons'

export interface Social {
  id: string
  label: string
  /** Shown on hover / as the handle. */
  handle: string
  href: string
  icon: IconType
}

export const email = 'yashgoyal.dev@zohomail.in'
export const phone = '+91 96905 51636'

/**
 * Rendered as one grid in the Contact section — the only place these live.
 * Ordered so the direct channels lead and the profile links follow.
 */
export const socials: Social[] = [
  {
    id: 'email',
    label: 'Email',
    handle: email,
    href: `mailto:${email}`,
    icon: Mail,
  },
  {
    id: 'phone',
    label: 'Phone',
    handle: phone,
    href: `tel:${phone.replace(/\s/g, '')}`,
    icon: Phone,
  },
  {
    id: 'resume',
    label: 'Résumé',
    handle: 'Download PDF',
    href: '/yashgoyalcv.pdf',
    icon: FileText,
  },
  {
    id: 'github',
    label: 'GitHub',
    handle: 'yashgoyal0110',
    href: 'https://github.com/yashgoyal0110',
    icon: Github,
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    handle: 'yashgoyal0110',
    href: 'https://www.linkedin.com/in/yashgoyal0110',
    icon: Linkedin,
  },
  {
    id: 'x',
    label: 'X',
    handle: 'yashgoyal0110',
    href: 'https://x.com/yashgoyal0110',
    icon: XLogo,
  },
]
