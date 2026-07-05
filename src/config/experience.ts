export interface Experience {
  id: string
  company: string
  role: string
  location: string
  start: string
  end: string
  /** Short summary shown before expansion. */
  summary: string
  /** Detailed achievement bullets, revealed on expand. */
  highlights: string[]
  /** Quantified impact chips. */
  impact: { label: string; value: string }[]
  stack: string[]
}

export const experience: Experience[] = [
  {
    id: 'mrfood',
    company: 'mrfood.ai',
    role: 'Founding Engineering Intern',
    location: 'USA (remote)',
    start: 'Jun 2026',
    end: 'Present',
    summary:
      'Building the real-time teleoperation and data pipeline behind a bimanual robotics platform.',
    highlights: [
      'Built a real-time bimanual teleop loop driving 2× 6-DOF AgileX PiPER arms from Meta Quest controllers — 250 Hz Pink/Pinocchio IK feeding a 100 Hz SocketCAN loop with 3 m/s jump-rejection and 180°/s slew clamps.',
      'Hardened teleop for remote use across 4 transports with frame_seq packet-drop detection and a CAN circuit breaker that held control stable over lossy networks.',
      'Owned the data & observability pipeline: 4 video paths (WebRTC / Agora / Adamo + an isolated GCS recorder) plus arm/operator telemetry to BigQuery and RGBD to GCS via async sinks.',
      'Stood up Prometheus & Grafana monitoring with Slack alerting, and a LeRobot writer that chunked and pushed training-ready datasets to HuggingFace.',
    ],
    impact: [
      { label: 'Control loop', value: '100 Hz' },
      { label: 'IK solve rate', value: '250 Hz' },
      { label: 'Robot arms', value: '2× 6-DOF' },
      { label: 'Video paths', value: '4' },
    ],
    stack: ['Python', 'Pinocchio', 'SocketCAN', 'WebRTC', 'BigQuery', 'GCS', 'Prometheus', 'Grafana', 'LeRobot'],
  },
  {
    id: 'emergent',
    company: 'Emergent Labs',
    role: 'Forward Deployed Engineer — Intern',
    location: 'Bangalore',
    start: 'Mar 2026',
    end: 'May 2026',
    summary:
      'Primary technical engineer keeping 50+ customers’ production apps online across ~15 Kubernetes clusters.',
    highlights: [
      'Served as primary technical engineer for 50+ customers running production apps, diagnosing and resolving Kubernetes (pod crashloops / scheduling), Nginx, reverse-proxy, and container runtime failures across ~15 clusters.',
      'Cut average support turnaround ~45% and resolved 200+ infrastructure incidents while keeping high-traffic apps online at 99.9% uptime.',
      'Built internal tooling for analytics, data and ops teams — automating repetitive ETL and reporting workflows with Airflow / cron jobs.',
      'Overhauled observability by instrumenting services with Prometheus metrics and Grafana dashboards, cutting mean-time-to-diagnosis and driving ~30% productivity gains across engineering and support.',
    ],
    impact: [
      { label: 'Support turnaround', value: '−45%' },
      { label: 'Infra incidents resolved', value: '200+' },
      { label: 'Uptime', value: '99.9%' },
      { label: 'Team productivity', value: '+30%' },
    ],
    stack: ['Kubernetes', 'Nginx', 'Docker', 'Prometheus', 'Grafana', 'Airflow', 'Linux'],
  },
  {
    id: 'succesship',
    company: 'Successship Technologies',
    role: 'Software Engineer — Intern',
    location: 'Bangalore',
    start: 'Jan 2025',
    end: 'Jul 2025',
    summary:
      'Architected core backend services for a distributor-management platform and an AI-powered AP/AR automation system.',
    highlights: [
      'Led end-to-end development of a distributor-management platform for direct-selling businesses — architecting core inventory (statistical analysis & classification), ledger / double-entry accounting, and payout services with Spring Boot, Redis and PostgreSQL.',
      'Drove the company’s first client signing and first successful payout through the system.',
      'Built an AI-powered AP/AR automation system from scratch using LLM / OCR and LangChain / OpenAI, cutting manual invoice processing by ~40%.',
      'Ran 4+ client demos that validated usability and shaped early product direction.',
      'Improved system reliability and cut server costs ~20% by triaging critical production issues and optimizing Docker images across 5+ services via base-image / multi-stage build strategies and version upgrades.',
    ],
    impact: [
      { label: 'Manual invoice work', value: '−40%' },
      { label: 'Server costs', value: '−20%' },
      { label: 'Services optimized', value: '5+' },
      { label: 'Client demos', value: '4+' },
    ],
    stack: ['Spring Boot', 'PostgreSQL', 'Redis', 'Docker', 'LangChain', 'OpenAI', 'OCR'],
  },
]
