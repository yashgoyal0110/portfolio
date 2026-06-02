import { Mail, FileText, Phone } from 'lucide-react'
import { Github, Linkedin } from '@/components/ui/icons'
import type { IconType } from '@/components/ui/icons'

export interface Social {
  id: string
  label: string
  /** Shown on hover / as the handle. */
  handle: string
  href: string
  icon: IconType
  /** Whether to surface in the compact nav / footer row. */
  primary?: boolean
}

export const email = 'yashgoyal.dev@zohomail.in'
export const phone = '+91 96905 51636'

export const socials: Social[] = [
  {
    id: 'github',
    label: 'GitHub',
    handle: 'yashgoyal0110',
    href: 'https://github.com/yashgoyal0110',
    icon: Github,
    primary: true,
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    handle: 'yashgoyal0110',
    href: 'https://www.linkedin.com/in/yashgoyal0110',
    icon: Linkedin,
    primary: true,
  },
  {
    id: 'email',
    label: 'Email',
    handle: email,
    href: `mailto:${email}`,
    icon: Mail,
    primary: true,
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
]
