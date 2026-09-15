export interface Experience {
  id: string
  company: string
  /** Company site, when there is a public one. */
  href?: string
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
    id: 'argon',
    company: 'Argon Robotics',
    href: 'https://argonrobotics.ai',
    role: 'Founding Engineering Intern',
    location: 'USA (remote)',
    start: 'Jun 2026',
    end: 'Present',
    summary:
      'Building the real-time teleoperation, data and policy-training pipeline behind a bimanual robotics platform.',
    highlights: [
      'Built a real-time bimanual teleoperation stack driving two 6-DOF AgileX PiPER arms from a Meta Quest, retargeting VR controller poses through a differential-IK solver into a 100 Hz SocketCAN control loop.',
      'Guarded that loop with per-joint slew limiting, pose-jump rejection and hold-on-fault fallback, so the arms stay safe the moment operator input degrades.',
      'Isolated video and recording into separate OS processes with shared-memory frame handoff so encoding can never stall the control loop, and sequence-numbered every controller frame to surface link drops.',
      'Owned the robotics data & observability pipeline on GCP: concurrent real-time video feeds, cloud RTC to the operator dashboard, an out-of-process recorder with hardware-accelerated encoding, RGBD episodes archived to GCS, and arm/operator telemetry streamed to BigQuery.',
      'Stood up Prometheus and Grafana dashboards with ~25 Slack alert rules covering CAN faults, thermals, camera health and operator-link drops.',
      'Built an end-to-end data-to-deployment pipeline for bimanual manipulation: curated 500+ teleoperation episodes into LeRobot datasets on HuggingFace, then trained, benchmarked and deployed ACT and π0.5 VLA policies on the same PiPER arms used for collection.',
    ],
    impact: [
      { label: 'Robot arms driven', value: '2× 6-DOF' },
      { label: 'Control loop', value: '100 Hz' },
      { label: 'Teleop episodes curated', value: '500+' },
      { label: 'Slack alert rules', value: '~25' },
    ],
    stack: ['Python', 'Pinocchio', 'SocketCAN', 'WebRTC', 'BigQuery', 'GCS', 'Prometheus', 'Grafana', 'LeRobot', 'HuggingFace'],
  },
  {
    id: 'emergent',
    company: 'Emergent Labs',
    role: 'Forward Deployed Engineering Intern',
    location: 'Bangalore',
    start: 'Mar 2026',
    end: 'May 2026',
    summary:
      'Primary technical engineer keeping 50+ customers’ production apps online across ~15 Kubernetes clusters.',
    highlights: [
      'Served as primary technical engineer for 50+ customers running production apps, diagnosing and resolving Kubernetes (pod crashloops / scheduling), Nginx, reverse-proxy, and container runtime failures across ~15 clusters.',
      'Cut average support turnaround ~45% and resolved 200+ infrastructure incidents while keeping high-traffic apps online at 99.9% uptime.',
      'Built internal tooling for analytics, data and ops teams, automating repetitive ETL and reporting workflows with Airflow and cron jobs.',
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
    role: 'Software Engineering Intern',
    location: 'Bangalore',
    start: 'Jan 2025',
    end: 'Jul 2025',
    summary:
      'Architected core backend services for a distributor-management platform and an AI-powered AP/AR automation system.',
    highlights: [
      'Led end-to-end development of a distributor-management platform for direct-selling businesses, architecting core inventory (statistical analysis & classification), ledger/double-entry accounting, and payout services with Spring Boot, Redis and PostgreSQL.',
      'Drove the company’s first client signing and first successful payout through the system.',
      'Built an AI-powered AP/AR automation system from scratch using LLM/OCR and LangChain/OpenAI, cutting manual invoice processing by ~40%.',
      'Ran 4+ client demos that validated usability and shaped early product direction.',
      'Improved system reliability and cut server costs ~20% by triaging critical production issues and optimizing Docker images across 5+ services via base-image and multi-stage build strategies and version upgrades.',
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
