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
    id: 'vaultrag',
    name: 'VaultRAG',
    kind: 'featured',
    tagline: 'A privacy-first document Q&A platform running entirely on the edge.',
    problem:
      'Most document-AI tools ship your private documents off to third-party model providers. VaultRAG answers questions about your documents without any data ever leaving Cloudflare’s edge.',
    architecture:
      'Multi-tenant RAG pipeline spanning ten Cloudflare products. PDFs are ingested and split with sentence-aware chunking, embedded with BGE, stored in Vectorize, and answered with Llama 3.1 inference — all on Workers AI. R2 holds documents, D1 holds tenant state, and AI Gateway provides observability and caching.',
    features: [
      'Complete RAG pipeline: PDF ingestion → sentence-aware chunking → vector search → LLM inference',
      'No third-party AI providers — fully self-contained on Workers AI (Llama 3.1, BGE embeddings)',
      'Multi-tenant isolation with per-tenant document stores',
      'Sub-second cached query responses via AI Gateway observability',
    ],
    metrics: [
      { label: 'Cloudflare products', value: '10' },
      { label: 'Ingestion', value: '25 chunks/doc <60s' },
      { label: 'Cached query latency', value: '<1s' },
    ],
    stack: ['TypeScript', 'Cloudflare Workers', 'Workers AI', 'Vectorize', 'R2', 'D1', 'Llama 3.1'],
    links: [
      { label: 'GitHub', href: 'https://github.com/yashgoyal0110' },
      { label: 'Live demo', href: '#' },
    ],
    accent: '#4fd1e0',
    year: '2025',
  },
  {
    id: 'wanderlust',
    name: 'Wanderlust',
    kind: 'featured',
    tagline: 'A 3-tier cloud-native app on a self-managed Kubernetes cluster.',
    problem:
      'A DevOps-first study of running a real 3-tier application without managed Kubernetes — provisioning, orchestrating and operating the whole stack by hand on raw EC2.',
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
