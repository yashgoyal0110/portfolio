export interface OpenSourceOrg {
  id: string
  org: string
  /** What the org does, one line. */
  about: string
  /** Contribution bullets. */
  contributions: string[]
  /** Themes/areas touched — drive the tag chips. */
  areas: string[]
  href: string
}

export const openSourceIntro = {
  heading: 'Open Source',
  blurb:
    'I contribute upstream to projects I rely on — strengthening CI, observability and developer onboarding across the OWASP, CNCF and Palisadoes ecosystems.',
  dashboard: { label: 'PR Dashboard', href: 'https://github.com/yashgoyal0110' },
}

export const openSource: OpenSourceOrg[] = [
  {
    id: 'owasp-nest',
    org: 'OWASP Nest',
    about: 'The OWASP community’s project & contributor hub.',
    contributions: [
      'Enhanced the frontend — adding new features and improving the UI for a better user experience.',
      'Implemented Django models for new features, with test files ensuring reliability and maintainability.',
      'Built SlackBot commands to improve automation and team collaboration.',
      'Added schema validations and removed unnecessary code for data integrity and a cleaner codebase.',
    ],
    areas: ['React', 'Django', 'SlackBot', 'Testing'],
    href: 'https://github.com/OWASP/Nest',
  },
  {
    id: 'litmuschaos',
    org: 'LitmusChaos',
    about: 'CNCF chaos-engineering platform for Kubernetes.',
    contributions: [
      'Strengthened CI quality gates through Docker linting integration.',
      'Enhanced local setup scripts to streamline contributor onboarding.',
      'Maintained repository consistency via branding and asset updates.',
    ],
    areas: ['CI/CD', 'Docker', 'DX'],
    href: 'https://github.com/litmuschaos',
  },
  {
    id: 'palisadoes',
    org: 'Palisadoes Foundation',
    about: 'Open-source nonprofit behind the Talawa community apps.',
    contributions: [
      'Stabilized CI/CD pipelines by introducing reusable workflows and advanced automation, improving build reliability and deployment consistency.',
      'Led a large-scale repository migration effort, ensuring a seamless transition.',
      'Optimized container images for faster, more efficient builds.',
      'Implemented production-grade observability using OpenTelemetry for improved monitoring and traceability.',
    ],
    areas: ['CI/CD', 'OpenTelemetry', 'Containers', 'Migration'],
    href: 'https://github.com/PalisadoesFoundation',
  },
]
