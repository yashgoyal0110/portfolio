/** Section anchors used by the nav rail and scroll-spy. Order = page order. */
export interface NavItem {
  id: string
  label: string
}

export const navItems: NavItem[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'opensource', label: 'Open Source' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
]
