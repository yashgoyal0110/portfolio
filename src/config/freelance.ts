/**
 * Client-facing freelance portfolio.
 * Surfaced only at /freelancing/projects — intentionally unlinked from the
 * main site navigation. Edit here to change that page; nothing is hardcoded.
 */
export interface FreelanceProject {
  id: string
  name: string
  /** One-line positioning statement. */
  tagline: string
  /** Client-facing narrative: problem → what was built → outcome. */
  description: string
  /** Short outcome bullets shown under the description. */
  highlights: string[]
  stack: string[]
  /** Path to the demo reel in /public. Omit when no video exists yet. */
  video?: string
  liveUrl?: string
  repoUrl?: string
  /** Card glow + chip colour. */
  accent: string
  year: string
}

export const freelanceIntro = {
  eyebrow: 'Freelance Portfolio',
  title: 'Products I design, build and ship end-to-end',
  lede:
    'Full-stack products taken from an empty repo to a live, HTTPS-secured deployment — ' +
    'AI-backed SaaS, internal tooling and customer-facing platforms. Every project below ' +
    'is running in production right now; press play on any reel to see the real thing.',
  stats: [
    { label: 'Products shipped', value: '6' },
    { label: 'Live deployments', value: '100%' },
    { label: 'Self-hosted & owned', value: 'Docker' },
    { label: 'AI-integrated builds', value: '4' },
  ],
}

export const freelanceProjects: FreelanceProject[] = [
  {
    id: 'axon',
    name: 'Axon',
    tagline: 'WhatsApp automation your team edits without a developer.',
    description:
      'Businesses lose customers to unanswered WhatsApp messages, and the questions are nearly always the same. Axon lets teams design their conversation visually on a drag-and-drop canvas, publish it to a live number, and let AI answer anything the script missed — inside a persona they define. Non-technical staff update the bot in minutes.',
    highlights: [
      'Drag-and-drop flow builder — no developer needed to change a reply',
      'Shared team inbox with human handoff mid-conversation',
      'Analytics that show exactly which question loses customers',
      'Built-in simulator runs the real bot with no WhatsApp account, so clients test before paying for Meta or Twilio setup',
    ],
    stack: ['Next.js', 'NestJS', 'PostgreSQL', 'Prisma', 'Redis', 'Gemini', 'Docker'],
    video: '/axon.mp4',
    liveUrl: 'https://axon.8.229.88.229.sslip.io/',
    repoUrl: 'https://github.com/yashgoyal0110/axon',
    accent: '#4fd1e0',
    year: '2026',
  },
  {
    id: 'ledgernest',
    name: 'LedgerNest',
    tagline: 'Receipts and invoices in, searchable financial records out.',
    description:
      'A secure, self-hosted platform that turns receipts, invoices and financial documents into structured, searchable transaction records. Google Gemini handles document analysis, field extraction and intelligent categorisation, so the manual data entry simply disappears.',
    highlights: [
      'AI document analysis with automatic field extraction and categorisation',
      'Structured, searchable transaction history replacing manual entry',
      'Containerised with Docker Compose, deployed behind Caddy with HTTPS and access protection',
      'Fully self-hosted — sensitive business data stays under the owner’s control',
    ],
    stack: ['Next.js', 'PostgreSQL', 'Prisma', 'Gemini', 'Docker Compose', 'Caddy'],
    video: '/ledgernest.mp4',
    liveUrl: 'https://ledgernest.8.229.88.229.sslip.io/',
    repoUrl: 'https://github.com/yashgoyal0110/LedgerNest',
    accent: '#34d399',
    year: '2026',
  },
  {
    id: 'distiq',
    name: 'Distiq',
    tagline: 'An AI sales-intelligence CRM for B2B distribution teams.',
    description:
      'A production-ready CRM built for distribution sales teams. Reps enrich account data, manage leads, track opportunities, monitor pipeline activity and coordinate follow-ups from a single workspace — with demo-ready accounts and realistic sample data so a client can walk the product on day one.',
    highlights: [
      'Lead, opportunity and pipeline tracking in one workspace',
      'Account enrichment and AI-assisted sales intelligence',
      'Email/password auth with demo-ready accounts and seeded CRM data',
      'Docker deployment with PostgreSQL, background jobs, file storage and HTTPS routing',
    ],
    stack: ['Next.js', 'PostgreSQL', 'Background jobs', 'Object storage', 'Docker', 'Caddy'],
    video: '/distiq-1.mp4',
    liveUrl: 'https://distiq.8.229.88.229.sslip.io/',
    repoUrl: 'https://github.com/yashgoyal0110/crm',
    accent: '#7c8bff',
    year: '2026',
  },
  {
    id: 'astramail',
    name: 'AstraMail',
    tagline: 'A cluttered Gmail inbox, turned into a decision-ready workspace.',
    description:
      'Users sign in with Google, grant read-only access, and every message runs through an AI triage engine that assigns priority, category and sentiment, writes a one-line summary, and flags whether action is required along with the suggested next step — so you know what to open first without reading a single full email.',
    highlights: [
      'Read-only Google OAuth — the inbox is never written to',
      'AI triage: priority, category, sentiment, one-line summary and next step',
      'Structured-JSON contract with a deterministic fallback, so the product never breaks when the model does',
      'Per-account AI quota metering and admin overrides for cost control',
      'Dockerised end-to-end behind Caddy: one exposed port, private API/DB network, HTTPS on a live domain',
    ],
    stack: ['React', 'Vite', 'NestJS', 'TypeScript', 'MongoDB', 'Gemini', 'Docker Compose'],
    video: '/astramail.mp4',
    liveUrl: 'https://astramail.yashgoyal.sbs/',
    repoUrl: 'https://github.com/yashgoyal0110/astrailmail',
    accent: '#c084fc',
    year: '2026',
  },
  {
    id: 'servicedock',
    name: 'ServiceDock',
    tagline: 'Professional online service catalogs for local businesses.',
    description:
      'Local service businesses still share outdated PDFs, quote prices by hand and answer the same questions every week. ServiceDock gives operators one dashboard to manage locations, services and pricing, then publishes a polished public catalog they can share by QR code and keep current in seconds.',
    highlights: [
      'Dashboard for locations, services and pricing',
      'Public, customer-facing catalog pages',
      'QR-code sharing for print, storefront and social',
      'Update once — every shared link reflects it instantly',
    ],
    stack: ['Next.js', 'PostgreSQL', 'Prisma', 'Docker', 'Caddy'],
    video: '/servicedock.mp4',
    liveUrl: 'https://servicedock.8.229.88.229.sslip.io/',
    repoUrl: 'https://github.com/yashgoyal0110/servicedock',
    accent: '#fbbf24',
    year: '2026',
  },
  {
    id: 'vaultrag',
    name: 'VaultRAG',
    tagline: 'Private document Q&A running entirely on the edge.',
    description:
      'A multi-tenant, privacy-first document Q&A platform running entirely on Cloudflare’s edge with no third-party AI providers — documents never leave the network they are hosted on. A complete RAG pipeline handles PDF ingestion, sentence-aware chunking, vector search and inference.',
    highlights: [
      'No third-party AI providers — inference runs on Cloudflare Workers AI',
      '~25 chunks processed per document in under 60 seconds',
      'Sub-second responses on cached queries',
      'Multi-tenant isolation with observability via AI Gateway',
    ],
    stack: ['TypeScript', 'Workers AI', 'Llama 3.1', 'Vectorize', 'R2', 'D1'],
    liveUrl: 'https://vaultrag-frontend.pages.dev/',
    repoUrl: 'https://github.com/yashgoyal0110/vaultRAG',
    accent: '#fb7185',
    year: '2026',
  },
]
