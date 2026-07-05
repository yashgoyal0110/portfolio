/**
 * Core identity + narrative. Edit here to change the hero, about and
 * recruiter-mode copy everywhere — nothing downstream is hardcoded.
 */
export interface Profile {
  name: string
  /** Rotating specializations shown in the hero typewriter. */
  roles: string[]
  tagline: string
  location: string
  availability: string
  /** Short hero paragraph. */
  intro: string
  /** Longer about-section narrative paragraphs. */
  about: string[]
  philosophy: string
  currentFocus: string
  interests: string[]
  resumeUrl: string
  /** Headline numbers for recruiter mode / about strip. */
  stats: { label: string; value: string }[]
}

export const profile: Profile = {
  name: 'Yash Goyal',
  roles: [
    'Full Stack Engineer',
    'Robotics & Real-Time Systems',
    'Cloud & Reliability Engineer',
    'Open Source Contributor',
  ],
  tagline: 'I build reliable, production-grade systems — from real-time robotics to the cloud edge.',
  location: 'Delhi, India',
  availability: 'Open to internships & full-time opportunities',
  intro:
    'Full stack engineer who lives across the stack. Driving real-time control loops, ' +
    'shipping product backends, taming Kubernetes clusters, and wiring up observability so things stay online at 3am.',
  about: [
    'I’m an engineer who is happiest where product, infrastructure and hardware meet. My range is deliberate: I’ve driven real-time robotics control loops, architected backend services that move real money through ledgers and payouts, and operated the Kubernetes clusters that keep production apps online.',
    'Right now I’m a founding engineer at a robotics startup, building a real-time bimanual teleoperation system — sub-100 Hz control loops hardened against lossy networks — and owning its data & observability pipeline. Before that I was the primary technical engineer keeping 50+ customers’ apps online across ~15 clusters, and I led end-to-end development of an inventory, ledger and payout platform in Spring Boot.',
    'I care about the unglamorous parts — reliability, observability, clean migrations — because that’s what keeps software trustworthy. Outside of work I contribute upstream to open source (OWASP, LitmusChaos, Palisadoes) and build things end-to-end, most recently a privacy-first RAG platform running entirely on Cloudflare’s edge.',
  ],
  philosophy:
    'Make it correct, make it observable, then make it fast. Reliability is a feature.',
  currentFocus:
    'Real-time robotics & teleoperation, edge-native AI systems, and distributed reliability.',
  interests: ['Robotics & teleoperation', 'Distributed systems', 'Edge & serverless', 'Observability', 'Competitive programming'],
  resumeUrl: '/yashgoyalcv.pdf',
  stats: [
    { label: 'Real-time control loop', value: '100 Hz' },
    { label: 'Production customers supported', value: '50+' },
    { label: 'Uptime maintained', value: '99.9%' },
    { label: 'Open-source orgs contributed to', value: '3' },
  ],
}
