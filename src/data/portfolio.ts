// ---------------------------------------------------------------------------
// Central portfolio data file.
//
// Everything a recruiter or visitor sees — profile, projects, experience,
// skills, contact links — is defined here so the rest of the app never
// hardcodes personal content. Anything marked PLACEHOLDER below is either a
// real gap (no URL/asset exists yet) or a clearly-labeled template project
// meant to be swapped for real work. Search this file for "PLACEHOLDER" to
// find everything that still needs your input.
// ---------------------------------------------------------------------------

import type {
  CommandAction,
  CurrentlyPanel,
  NavItem,
  Profile,
  Project,
  SkillCategory,
  TimelineEntry,
} from '../types';

/** Sentinel used for links that don't exist yet. Never rendered as a live href. */
export const PLACEHOLDER_URL = '#add-your-link';

export const profile: Profile = {
  name: 'Rudrani Chavarkar',
  initials: 'RC',
  role: 'MS Computer Science @ USC',
  location: 'Los Angeles, CA',
  email: 'chavarka@usc.edu',
  // PLACEHOLDER: add the real résumé PDF at public/resume.pdf — see README.
  resumeHref: '/portfolio/resume.pdf',
  availabilityBadge: 'Seeking 2027 new-grad software and AI engineering roles',
  social: [
    { id: 'github', label: 'GitHub', href: 'https://github.com/Rudrani26' },
    { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/rudranichavarkar/' },
    { id: 'email', label: 'Email', href: 'mailto:chavarka@usc.edu' },
    { id: 'resume', label: 'Résumé', href: '/portfolio/resume.pdf' },
  ],
};

export const navItems: NavItem[] = [
  { label: 'Work', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

export const heroContent = {
  headline: 'I build intelligent systems that are useful, secure, and hard to break.',
  supporting:
    'MS Computer Science student at USC exploring agentic AI, backend engineering, developer infrastructure, and the systems that make ambitious software reliable.',
  ctaPrimary: 'Explore my work',
  ctaSecondary: 'Download résumé',
  terminalLines: ['initializing rudrani.dev...', 'curiosity: online', 'building mode: active'],
};

export const aboutContent = {
  paragraph:
    "I'm a computer science graduate student who enjoys working on systems where intelligence meets reliability. I'm especially interested in agentic AI, backend architecture, security, and developer tools. I like understanding how things fail—not just how they work—and turning that understanding into better software.",
};

// PLACEHOLDER: keep this current — it's meant to change often.
export const currentlyPanel: CurrentlyPanel = {
  building: 'A security-focused authorization proxy for AI tool servers (SentinelMCP)',
  learning: 'Agentic AI and applied NLP coursework at USC',
  reading: 'Papers and postmortems on production LLM-agent security',
  experimentingWith: 'FastMCP and PydanticAI for constrained agent execution',
};

export const contactContent = {
  closingStatement: 'Have an interesting problem? Let’s build something unexpectedly good.',
  emailCopiedLabel: 'Copied—talk soon!',
  // Existing working EmailJS integration, preserved from the previous site.
  emailjs: {
    serviceId: 'service_q66axbl',
    templateId: 'template_5em4yaf',
    publicKey: 'Lw6RgWl0Zf8oAwlT5',
  },
};

export const footerContent = {
  tagline: 'Designed and built with curiosity by Rudrani Chavarkar.',
};

// ---------------------------------------------------------------------------
// Skills — grouped for the Engineering Toolbox. Each skill id is referenced
// by project.techIds so hovering/selecting a skill can highlight the
// projects that use it.
// ---------------------------------------------------------------------------

export const skillCategories: SkillCategory[] = [
  {
    id: 'languages',
    label: 'Languages',
    skills: [
      { id: 'python', name: 'Python' },
      { id: 'java', name: 'Java' },
      { id: 'typescript', name: 'TypeScript' },
      { id: 'javascript', name: 'JavaScript' },
      { id: 'sql', name: 'SQL' },
    ],
  },
  {
    id: 'ai-ml',
    label: 'AI & Machine Learning',
    skills: [
      { id: 'llms', name: 'Large Language Models' },
      { id: 'agentic-ai', name: 'Agentic AI' },
      { id: 'mcp', name: 'Model Context Protocol' },
      { id: 'nlp', name: 'Natural Language Processing' },
      { id: 'pydantic-ai', name: 'PydanticAI' },
      { id: 'fastmcp', name: 'FastMCP' },
    ],
  },
  {
    id: 'backend-apis',
    label: 'Backend & APIs',
    skills: [
      { id: 'fastapi', name: 'FastAPI' },
      { id: 'spring-boot', name: 'Spring Boot' },
      { id: 'react', name: 'React' },
      { id: 'react-native', name: 'React Native' },
      { id: 'nodejs', name: 'Node.js' },
      { id: 'rest-apis', name: 'RESTful APIs' },
    ],
  },
  {
    id: 'infrastructure',
    label: 'Infrastructure',
    skills: [
      { id: 'aws', name: 'AWS (EC2, RDS, Aurora)' },
      { id: 'docker', name: 'Docker' },
      { id: 'vault', name: 'HashiCorp Vault' },
    ],
  },
  {
    id: 'databases',
    label: 'Databases',
    skills: [
      { id: 'postgresql', name: 'PostgreSQL' },
      { id: 'mysql', name: 'MySQL' },
      { id: 'mongodb', name: 'MongoDB' },
    ],
  },
  {
    id: 'dev-tools',
    label: 'Developer Tools',
    skills: [
      { id: 'git', name: 'Git' },
      { id: 'gitlab', name: 'GitLab' },
      { id: 'linux', name: 'Linux / Unix' },
      { id: 'ci-cd', name: 'CI/CD' },
    ],
  },
];

// ---------------------------------------------------------------------------
// Projects
// ---------------------------------------------------------------------------

export const projects: Project[] = [
  {
    id: 'sentinelmcp',
    name: 'SentinelMCP',
    summary:
      'An authorization proxy that stands between AI agents and MCP servers so a tool call can’t become a blank check.',
    description:
      'A security-focused authorization proxy for AI tool servers, with default-deny policies, argument-level controls, per-principal rate and concurrency limits, redacted audit logs, adversarial tests, and reproducible benchmarks.',
    role: 'Creator & Maintainer',
    techIds: ['python', 'mcp', 'agentic-ai', 'rest-apis'],
    category: 'security',
    technicalChallenge:
      'Giving AI agents access to real tool servers without giving them a blank check — every call needed default-deny policy enforcement and argument-level validation before it could reach an MCP server, without adding noticeable latency.',
    engineeringDecision:
      'Built a proxy that sits between AI clients and MCP servers so policy, per-principal rate/concurrency limits, and audit logging live in one enforced layer instead of being re-implemented inside every tool.',
    measurableResult:
      'Verified with adversarial tests and reproducible benchmarks; every request is captured in a redacted audit log for after-the-fact review.',
    githubUrl: PLACEHOLDER_URL,
    liveUrl: null,
    featured: true,
    isPlaceholder: false,
    architecture: [
      { id: 'client', label: 'AI Client', description: 'Sends a tool call on behalf of an agent or user.' },
      { id: 'sentinel', label: 'SentinelMCP', description: 'Authorizes, rate-limits, and audits the request.' },
      { id: 'server', label: 'MCP Server', description: 'Executes the tool only if the request was allowed.' },
      { id: 'policy', label: 'Policy + Limits + Audit', description: 'Default-deny rules, per-principal limits, and a redacted audit trail.' },
    ],
  },
  {
    id: 'maya',
    name: 'Maya — Generative AI Language Learning App',
    summary:
      'A full-stack mobile app for real-time multilingual conversation practice, built on speech and language models.',
    description:
      'Engineered a full-stack mobile app using React Native and FastAPI REST APIs, integrating Firebase Authentication and Realtime Database for secure user access, real-time data synchronization, and community chatrooms. Backend inference workflows integrate LLaMA 3 70B via Groq, Wav2Vec2, and VITS for conversational AI, speech recognition, and text-to-speech.',
    role: 'Full-Stack Engineer',
    techIds: ['react-native', 'fastapi', 'llms', 'nlp'],
    category: 'ai',
    technicalChallenge:
      'Coordinating real-time speech recognition, LLM-based conversation, and text-to-speech across a mobile client without introducing noticeable latency or losing sync with Firebase’s real-time data layer.',
    engineeringDecision:
      'Split inference across specialized models — LLaMA 3 70B via Groq for conversation, Wav2Vec2 for speech-to-text, VITS for text-to-speech — instead of one general-purpose model, so each stage could stay fast and be tuned independently.',
    measurableResult: '92% translation accuracy, 94% speech-to-text accuracy, and 90% text-to-speech accuracy.',
    githubUrl: 'https://github.com/Rudrani26/Maya_LanguageLearningApp',
    liveUrl: null,
    featured: false,
    isPlaceholder: false,
  },
  {
    id: 'serenity',
    name: 'Serenity — AI-Driven Mental Well-Being Platform',
    summary: 'A web app that reads facial emotion and predicted mood to recommend music in real time.',
    description:
      'Built and deployed a Python/Streamlit application on AWS integrating VGG19-based facial emotion recognition, XGBoost mood prediction, and the Spotify API to generate personalized music recommendations.',
    role: 'Full-Stack / ML Engineer',
    techIds: ['python', 'aws', 'nlp'],
    category: 'ai',
    technicalChallenge:
      'Combining a computer-vision emotion classifier with a separate mood-prediction model and turning both into one coherent music recommendation, rather than two disconnected outputs.',
    engineeringDecision:
      'Used VGG19 for facial emotion recognition and XGBoost for mood prediction as separate stages, then fed both signals into the Spotify API layer so each model could be evaluated and improved independently.',
    measurableResult: '94% accuracy on facial emotion recognition, deployed end-to-end on AWS.',
    githubUrl: 'https://github.com/Rudrani26/Serenity-A-Mental-Well-Being-Web-Application',
    liveUrl: null,
    featured: false,
    isPlaceholder: false,
  },
  // --- PLACEHOLDER PROJECTS -------------------------------------------------
  // These three cards are intentionally empty templates (not fabricated case
  // studies) so the grid + category filters have Backend / Full Stack /
  // Security coverage. Replace each one with a real project.
  {
    id: 'placeholder-backend',
    name: 'Your Next Backend Project',
    summary: 'Swap this card for a real backend project — the problem, the stack, and what shipped.',
    description:
      'Replace this entry in src/data/portfolio.ts with a backend project you’ve built: what it does, why it exists, and who it serves.',
    role: '— add your role —',
    techIds: [],
    category: 'backend',
    technicalChallenge: 'Add the hardest technical problem you solved.',
    engineeringDecision: 'Add the key decision you made and why.',
    measurableResult: 'Add a real, measurable outcome.',
    githubUrl: PLACEHOLDER_URL,
    liveUrl: null,
    featured: false,
    isPlaceholder: true,
  },
  {
    id: 'placeholder-fullstack',
    name: 'Your Next Full-Stack Product',
    summary: 'Swap this card for a real full-stack product — the users, the stack, and the outcome.',
    description:
      'Replace this entry in src/data/portfolio.ts with a full-stack project you’ve shipped, from UI to database.',
    role: '— add your role —',
    techIds: [],
    category: 'fullstack',
    technicalChallenge: 'Add the hardest technical problem you solved.',
    engineeringDecision: 'Add the key decision you made and why.',
    measurableResult: 'Add a real, measurable outcome.',
    githubUrl: PLACEHOLDER_URL,
    liveUrl: null,
    featured: false,
    isPlaceholder: true,
  },
  {
    id: 'placeholder-security',
    name: 'Your Next Security Project',
    summary: 'Swap this card for a real security or systems-hardening project you’ve built.',
    description:
      'Replace this entry in src/data/portfolio.ts with a security-focused project: the threat model, the fix, and the result.',
    role: '— add your role —',
    techIds: [],
    category: 'security',
    technicalChallenge: 'Add the hardest technical problem you solved.',
    engineeringDecision: 'Add the key decision you made and why.',
    measurableResult: 'Add a real, measurable outcome.',
    githubUrl: PLACEHOLDER_URL,
    liveUrl: null,
    featured: false,
    isPlaceholder: true,
  },
];

// ---------------------------------------------------------------------------
// Experience, education, research & leadership timeline
// (newest start date first)
// ---------------------------------------------------------------------------

export const timeline: TimelineEntry[] = [
  {
    id: 'zoox',
    type: 'work',
    organization: 'Zoox, Inc',
    role: 'Software Engineering Intern',
    dateRange: 'May 2026 – Aug 2026',
    sortKey: '2026-05',
    location: 'Foster City, California',
    bullets: [
      'Owned end-to-end development of a conversational AI platform serving 3,200+ engineers, integrating Slack, React, and FastAPI to automate read-only diagnostics across 500+ AWS RDS/Aurora instances without database or AWS Console access.',
      'Architected a zero-trust LLM execution pipeline decoupling PydanticAI routing from AWS operations via FastMCP, constraining agents to 28+ predefined skills and 30+ tools with 3-layer read-only guardrails, scoped AWS access, and short-lived Vault credentials.',
      'Reduced recurring database-support tickets by 75% and diagnostic latency from 2 days to <5 seconds, enabling engineers to self-service routine production diagnostics without DBA intervention.',
    ],
    techIds: ['pydantic-ai', 'fastmcp', 'aws', 'vault', 'react', 'fastapi', 'agentic-ai'],
  },
  {
    id: 'usc',
    type: 'education',
    organization: 'University of Southern California',
    role: 'Master of Science in Computer Science',
    dateRange: 'Aug 2025 – May 2027 (Expected)',
    sortKey: '2025-08',
    location: 'Los Angeles, California',
    bullets: [
      'GPA: 3.75 / 4.0.',
      'Relevant coursework: Analysis of Algorithms, Database Systems, Agentic AI, Applied Natural Language Processing.',
    ],
    techIds: ['agentic-ai', 'nlp', 'sql'],
  },
  {
    id: 'clearing-corp',
    type: 'work',
    organization: 'The Clearing Corporation of India',
    role: 'Software Engineering Intern',
    dateRange: 'Jun 2024 – Nov 2024',
    sortKey: '2024-06',
    location: 'Mumbai, India',
    bullets: [
      'Refactored a legacy membership renewal system into Spring Boot microservices with React and SQL, reducing renewal processing time by 20% across workflows serving 50K+ users.',
      'Designed REST APIs and React workflows enforcing backend role- and entitlement-based validation across 20+ membership types, preventing invalid renewal requests from reaching downstream processing.',
      'Optimized SQL queries through indexing, join restructuring, stored-procedure tuning, and pagination, reducing average query response time by 30% across renewal workflows serving 50K+ users.',
    ],
    techIds: ['spring-boot', 'react', 'sql', 'rest-apis'],
  },
  {
    id: 'research-fibroids',
    type: 'research',
    organization: 'Springer LNNS (ICT4SD 2024)',
    role: '"The Random Forest That Found the Fibroids: Machine Learning Algorithms for Uterine Fibroid Detection"',
    dateRange: '2024',
    sortKey: '2024-01',
    location: 'Published research',
    bullets: [
      'Evaluated multiple ML algorithms (SVM, VGG16, GMM, GMM-Stacking, Random Forest), achieving 99% accuracy with improved recall/precision for uterine fibroid detection and low inference time.',
    ],
    techIds: ['python'],
    link: {
      label: 'Read the paper',
      href: 'https://link.springer.com/chapter/10.1007/978-981-97-8605-3_13',
    },
  },
  {
    id: 'clover',
    type: 'work',
    organization: 'Clover Infotech Pvt. Ltd',
    role: 'Software Engineering Intern',
    dateRange: 'Mar 2023 – Jul 2023',
    sortKey: '2023-03',
    location: 'Mumbai, India',
    bullets: [
      'Developed a Spring Boot–based data management service with RESTful APIs and MySQL, implementing CRUD workflows, server-side validation, and Spring Data JPA persistence across 5+ core data entities.',
      'Implemented batch-processing workflows for bulk data imports, processing 10K+ records per run with validation and error handling, reducing ingestion time by 30% compared with individual record processing.',
    ],
    techIds: ['spring-boot', 'mysql', 'rest-apis'],
  },
];

// ---------------------------------------------------------------------------
// Command palette actions (Cmd/Ctrl+K)
// ---------------------------------------------------------------------------

export const commandActions: CommandAction[] = [
  { id: 'go-work', label: 'Go to Work', kind: 'section', sectionId: 'projects', hint: 'Featured projects' },
  { id: 'go-about', label: 'Go to About', kind: 'section', sectionId: 'about' },
  { id: 'go-experience', label: 'Go to Experience', kind: 'section', sectionId: 'experience' },
  { id: 'go-contact', label: 'Go to Contact', kind: 'section', sectionId: 'contact' },
  { id: 'open-github', label: 'Open GitHub', kind: 'external', href: profile.social.find((s) => s.id === 'github')!.href },
  { id: 'open-linkedin', label: 'Open LinkedIn', kind: 'external', href: profile.social.find((s) => s.id === 'linkedin')!.href },
  { id: 'copy-email', label: `Copy email (${profile.email})`, kind: 'link', href: `mailto:${profile.email}` },
  { id: 'download-resume', label: 'Download résumé', kind: 'external', href: profile.resumeHref },
  { id: 'toggle-theme', label: 'Toggle theme', kind: 'theme' },
];
