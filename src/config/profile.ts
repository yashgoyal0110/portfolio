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
  about: [
    'I’m an engineer who is happiest where product, infrastructure and hardware meet. My range is deliberate: I’ve driven real-time robotics control loops, architected backend services that move real money through ledgers and payouts, and operated the Kubernetes clusters that keep production apps online.',
    'Right now I’m a founding engineer at Argon Robotics, building a real-time bimanual teleoperation stack that drives two 6-DOF arms at 100 Hz, and owning the pipeline that turns the episodes it records into trained, deployed manipulation policies. Before that I was the primary technical engineer keeping 50+ customers’ apps online across ~15 clusters, and I led end-to-end development of an inventory, ledger and payout platform in Spring Boot.',
    'I care about the unglamorous parts: reliability, observability, clean migrations. That’s what keeps software trustworthy. Outside of work I contribute upstream to open source (OWASP, LitmusChaos, Palisadoes) and build things end-to-end, most recently Axon, a multi-tenant WhatsApp automation platform with a drag-and-drop flow builder.',
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
