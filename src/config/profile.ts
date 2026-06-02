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
    'Cloud & DevOps Practitioner',
    'Open Source Contributor',
    'AI Systems Builder',
  ],
  tagline: 'I build reliable, production-grade systems — from the infrastructure up.',
  location: 'Bangalore, India',
  availability: 'Open to full-time SWE roles',
  intro:
    'Full stack engineer who lives across the stack — shipping product features, ' +
    'taming Kubernetes clusters, and wiring up observability so things stay online at 3am.',
  about: [
    'I’m an engineer who is happiest where product and infrastructure meet. I’ve served as the primary technical engineer for 50+ customers running production apps, debugged failing clusters across ~15 Kubernetes environments, and built the backend services that move real money through ledgers and payouts.',
    'My range is deliberate: I can architect a double-entry accounting service in Spring Boot in the morning and tune Docker multi-stage builds to cut server costs in the afternoon. I care about the unglamorous parts — reliability, observability, clean migrations — because that’s what keeps software trustworthy.',
    'Outside of work I contribute to open source (OWASP, LitmusChaos, Palisadoes) and build things end-to-end — most recently a privacy-first RAG platform running entirely on Cloudflare’s edge.',
  ],
  philosophy:
    'Make it correct, make it observable, then make it fast. Reliability is a feature.',
  currentFocus:
    'Edge-native AI systems, distributed reliability, and developer tooling.',
  interests: ['Distributed systems', 'Edge & serverless', 'Observability', 'Competitive programming', 'Developer experience'],
  resumeUrl: '/yashgoyalcv.pdf',
  stats: [
    { label: 'Production customers supported', value: '50+' },
    { label: 'Infra incidents resolved', value: '200+' },
    { label: 'Uptime maintained', value: '99.9%' },
    { label: 'Open-source orgs contributed to', value: '3' },
  ],
}
