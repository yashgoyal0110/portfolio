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
  tagline: 'I build reliable, production-grade systems, from real-time robotics to multi-tenant SaaS.',
  location: 'Delhi, India',
  availability: 'Open to internships & full-time opportunities',
  /** First entry is the lead line — set larger in the About section. */
  about: [
    'I’m happiest where product, infrastructure and hardware meet: real-time control loops, backend services that move real money, and the Kubernetes clusters keeping it all online.',
    'Today I’m a founding engineer at Argon Robotics, driving two 6-DOF arms at 100 Hz and owning the pipeline that turns recorded episodes into deployed manipulation policies. Before that: 50+ customers’ apps online across ~15 clusters, and an inventory, ledger and payout platform built end-to-end in Spring Boot.',
    'I care about the unglamorous parts: reliability, observability, clean migrations. Outside work I contribute upstream to OWASP, LitmusChaos and Palisadoes, most recently shipping Axon, a multi-tenant WhatsApp automation platform.',
  ],
  philosophy:
    'Make it correct, make it observable, then make it fast. Reliability is a feature.',
  currentFocus:
    'Real-time robotics, teleoperation & robot learning, LLM-backed product systems, and distributed reliability.',
  interests: ['Robotics & teleoperation', 'Distributed systems', 'Edge & serverless', 'Observability', 'Competitive programming'],
  resumeUrl: '/yashgoyalcv.pdf',
  /** One headline number per area of the CV: robotics, infra, product, open source. */
  stats: [
    { label: 'Robot teleoperation at Argon Robotics', value: 'Real-time' },
    { label: 'Production customers at Emergent', value: '50+' },
    { label: 'Invoice work cut at Successship', value: '−40%' },
    { label: 'Open-source orgs contributed to', value: '3' },
  ],
}
