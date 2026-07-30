export type SkillCategory =
  | 'Languages'
  | 'Frontend'
  | 'Backend'
  | 'Databases'
  | 'Cloud & DevOps'
  | 'AI / ML'

export interface Skill {
  name: string
  category: SkillCategory
  /** 1–5 self-assessed proficiency, drives node size / glow. */
  level: number
  /** project ids (see projects.ts) where this was used. */
  usedIn?: string[]
  note?: string
}

export const skillCategories: { id: SkillCategory; blurb: string }[] = [
  { id: 'Languages', blurb: 'Core programming languages' },
  { id: 'Frontend', blurb: 'Interfaces & client apps' },
  { id: 'Backend', blurb: 'Services & APIs' },
  { id: 'Databases', blurb: 'Storage & state' },
  { id: 'Cloud & DevOps', blurb: 'Ship, run & observe' },
  { id: 'AI / ML', blurb: 'LLM & retrieval systems' },
]

export const skills: Skill[] = [
  // Languages
  { name: 'Python', category: 'Languages', level: 5 },
  { name: 'Java', category: 'Languages', level: 5 },
  { name: 'JavaScript', category: 'Languages', level: 5 },
  { name: 'TypeScript', category: 'Languages', level: 4, usedIn: ['axon'] },

  // Frontend
  { name: 'React', category: 'Frontend', level: 4, usedIn: ['axon'] },
  { name: 'HTML / CSS', category: 'Frontend', level: 4 },
  { name: 'Tailwind CSS', category: 'Frontend', level: 4 },

  // Backend
  { name: 'Node.js', category: 'Backend', level: 4, usedIn: ['wanderlust'] },
  { name: 'Express', category: 'Backend', level: 4 },
  { name: 'NestJS', category: 'Backend', level: 4, usedIn: ['axon'], note: 'Multi-tenant conversation engine' },
  { name: 'Spring Boot', category: 'Backend', level: 4, usedIn: ['succesship'] as string[], note: 'Ledger, inventory & payout services' },
  { name: 'WebRTC / Real-time', category: 'Backend', level: 3, usedIn: ['mrfood'], note: 'Low-latency teleop video & control transports' },

  // Databases
  { name: 'PostgreSQL', category: 'Databases', level: 4, usedIn: ['axon'], note: 'Double-entry accounting & workspace state' },
  { name: 'Prisma', category: 'Databases', level: 4, usedIn: ['axon'] },
  { name: 'MongoDB', category: 'Databases', level: 4, usedIn: ['wanderlust'] },
  { name: 'Redis', category: 'Databases', level: 4, usedIn: ['axon', 'wanderlust'] },
  { name: 'SQL', category: 'Databases', level: 4 },

  // Cloud & DevOps
  { name: 'Kubernetes', category: 'Cloud & DevOps', level: 5, usedIn: ['wanderlust'], note: 'Self-managed clusters, ~15 in production' },
  { name: 'Docker', category: 'Cloud & DevOps', level: 5, usedIn: ['axon', 'wanderlust'] },
  { name: 'AWS (EC2/ECR/ECS)', category: 'Cloud & DevOps', level: 4, usedIn: ['wanderlust'] },
  { name: 'Cloudflare', category: 'Cloud & DevOps', level: 4 },
  { name: 'GCP (BigQuery / GCS)', category: 'Cloud & DevOps', level: 3, usedIn: ['mrfood', 'axon'], note: 'Telemetry & RGBD data sinks' },
  { name: 'CI/CD', category: 'Cloud & DevOps', level: 4 },
  { name: 'Nginx', category: 'Cloud & DevOps', level: 4 },
  { name: 'Linux', category: 'Cloud & DevOps', level: 4 },
  { name: 'OpenTelemetry', category: 'Cloud & DevOps', level: 3 },
  { name: 'Prometheus / Grafana', category: 'Cloud & DevOps', level: 4, usedIn: ['mrfood'], note: 'Monitoring & Slack alerting' },

  // AI / ML
  { name: 'LangChain', category: 'AI / ML', level: 3, usedIn: ['succesship'] },
  { name: 'OpenAI / LLMs', category: 'AI / ML', level: 3, usedIn: ['succesship'] },
  { name: 'Gemini', category: 'AI / ML', level: 3, usedIn: ['axon'], note: 'Persona-scoped off-script fallback' },
  { name: 'RAG / Vector search', category: 'AI / ML', level: 3 },
  { name: 'OCR', category: 'AI / ML', level: 3, usedIn: ['succesship'] },
]
