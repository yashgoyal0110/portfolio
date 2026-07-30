export type ProjectKind = 'featured' | 'opensource' | 'startup' | 'research'

export interface Project {
  id: string
  name: string
  kind: ProjectKind
  tagline: string
  /** Problem the project solves. */
  problem: string
  /** Architecture / approach narrative. */
  architecture: string
  /** Headline feature bullets. */
  features: string[]
  /** Quantified or notable metrics. */
  metrics: { label: string; value: string }[]
  stack: string[]
  links: { label: string; href: string }[]
  /** Accent used for the project's card glow. */
  accent: string
  year: string
}

export const projects: Project[] = [
  {
    id: 'axon',
    name: 'Axon',
    kind: 'featured',
    tagline: 'A multi-tenant WhatsApp automation SaaS with a drag-and-drop flow builder.',
    problem:
      'Teams that live in WhatsApp still need engineers to change a single reply. Axon lets non-technical teams design chatbot conversations themselves on a drag-and-drop canvas, then publish them as immutable, versioned flows.',
    architecture:
      'A provider-agnostic conversation engine sits behind one code path serving the Meta Cloud API, Twilio, and a credential-free in-app sandbox. Inbound webhooks are verified with HMAC-SHA256/SHA1, de-duplicated against Redis-backed redelivery tracking, and matched to 24-hour session windows; anything off-script falls back to Gemini answering inside a configured persona. NestJS, PostgreSQL and Prisma hold workspace state.',
    features: [
      'Drag-and-drop flow canvas across 8 node types, with immutable published flow versions',
      'Workspace-scoped RBAC with 4 roles for multi-tenant isolation',
      'One code path for Meta Cloud API, Twilio and a credential-free in-app sandbox',
      'Redis-backed redelivery de-duplication, 24-hour session windows and a Gemini persona fallback',
      'Ships as a single Docker image (API + SPA on one port) on GCP behind Caddy',
      'Quota metering before every send, AES-256-GCM credential encryption and rotating refresh tokens',
    ],
    metrics: [
      { label: 'Flow node types', value: '8' },
      { label: 'RBAC roles', value: '4' },
      { label: 'Messaging providers', value: '3' },
      { label: 'Session window', value: '24 h' },
    ],
    stack: ['NestJS', 'React', 'PostgreSQL', 'Prisma', 'Redis', 'Gemini', 'Docker', 'GCP'],
    links: [
      { label: 'GitHub', href: 'https://github.com/yashgoyal0110' },
      { label: 'Live demo', href: '#' },
    ],
    accent: '#4fd1e0',
    year: '2026',
  },
  {
    id: 'wanderlust',
    name: 'Wanderlust',
    kind: 'featured',
    tagline: 'A 3-tier cloud-native app on a self-managed Kubernetes cluster.',
    problem:
      'A DevOps-first study of running a real 3-tier application without managed Kubernetes: provisioning, orchestrating and operating the whole stack by hand on raw EC2.',
    architecture:
      'Self-managed Kubernetes cluster provisioned on AWS EC2. Workloads orchestrated with Deployments, Services and ConfigMaps; a Node.js API tier, MongoDB data tier and Redis cache, containerized with Docker and designed around infrastructure reliability and container orchestration.',
    features: [
      'Self-managed Kubernetes control plane on AWS EC2 (no EKS)',
      'Orchestrated with Deployments, Services and ConfigMaps',
      '3-tier architecture: Node.js API, MongoDB, Redis',
      'DevOps-first design focused on reliability and reproducibility',
    ],
    metrics: [
      { label: 'Tiers', value: '3' },
      { label: 'Orchestration', value: 'K8s (self-managed)' },
      { label: 'Cloud', value: 'AWS EC2' },
    ],
    stack: ['Kubernetes', 'AWS EC2', 'Docker', 'Node.js', 'MongoDB', 'Redis'],
    links: [{ label: 'GitHub', href: 'https://github.com/yashgoyal0110' }],
    accent: '#7c8bff',
    year: '2024',
  },
]
