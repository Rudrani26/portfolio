// ---------------------------------------------------------------------------
// Central portfolio data file.
//
// Every project, internship, and education entry here is drawn directly
// from the résumé (or the pre-existing portfolio content) — nothing is
// invented, and there are no placeholder/template cards. If a résumé detail
// was ambiguous or missing, the field was omitted rather than guessed.
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

export const profile: Profile = {
  name: 'Rudrani Chavarkar',
  initials: 'RC',
  role: 'MS Computer Science @ USC',
  location: 'Los Angeles, CA',
  email: 'chavarkar.rudrani8251@gmail.com',
  availabilityBadge: 'Seeking 2027 new-grad software and AI engineering roles',
  social: [
    { id: 'github', label: 'GitHub', href: 'https://github.com/Rudrani26' },
    { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/rudranichavarkar/' },
    { id: 'email', label: 'Email', href: 'mailto:chavarkar.rudrani8251@gmail.com' },
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
};

// Content for the interactive hero terminal's `whoami` command — a concise,
// résumé-grounded introduction (kept separate from aboutContent, which is
// the longer About-section copy).
export const terminalWhoami = [
  'Rudrani Chavarkar',
  'MS Computer Science student @ USC — expected May 2027',
  'Focused on agentic AI, backend systems, and security tooling.',
];

// Curated, concise subset of skillCategories for the terminal's `show
// skills` command — every id must exist in skillCategories below.
export const terminalSkillIds = ['python', 'typescript', 'fastapi', 'react', 'aws', 'agentic-ai', 'llms'];

export const aboutContent = {
  paragraph:
    "I'm a computer science graduate student who enjoys working on systems where intelligence meets reliability. I'm especially interested in agentic AI, backend architecture, security, and developer tools. I like understanding how things fail—not just how they work—and turning that understanding into better software.",
};

// PLACEHOLDER: keep this current — it's meant to change often. Not sourced
// from the résumé, since it describes ongoing/day-to-day activity rather
// than a fixed accomplishment.
export const currentlyPanel: CurrentlyPanel = {
  building: 'Side projects exploring agentic AI and backend systems',
  learning: 'Agentic AI and applied NLP coursework at USC',
  reading: 'Papers and postmortems on production LLM-agent security',
  experimentingWith: 'FastMCP and PydanticAI for constrained agent execution',
};

export const contactContent = {
  closingStatement: 'Have an interesting problem? Let’s build something unexpectedly good.',
  emailCopiedLabel: 'Copied—talk soon!',
};

export const footerContent = {
  tagline: 'Designed and built with curiosity by Rudrani Chavarkar.',
};

// ---------------------------------------------------------------------------
// Skills — grouped for the Engineering Toolbox, taken from the résumé's
// "TECHNICAL SKILLS" section. Also referenced by terminalSkillIds below.
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
// Projects — only the two projects listed on the résumé under
// "PROJECTS & PUBLICATIONS". No categories, no filters, no placeholders.
// ---------------------------------------------------------------------------

export const projects: Project[] = [
  {
    id: 'maya',
    name: 'Maya — Generative AI Language Learning App',
    description:
      'Engineered a full-stack mobile app using React Native and FastAPI REST APIs, integrating Firebase Authentication and Realtime Database for secure user access, real-time data synchronization, and community chatrooms. Built backend inference workflows integrating LLaMA 3 70B via Groq, Wav2Vec2, and VITS for conversational AI, speech recognition, and text-to-speech.',
    highlights: ['92% translation accuracy', '94% speech-to-text accuracy', '90% text-to-speech accuracy'],
    techTags: ['React Native', 'FastAPI', 'Firebase Authentication', 'Firebase Realtime Database', 'LLaMA 3 70B (Groq)', 'Wav2Vec2', 'VITS'],
    githubUrl: 'https://github.com/Rudrani26/Maya_LanguageLearningApp',
    liveUrl: null,
  },
  {
    id: 'serenity',
    name: 'Serenity — AI-Driven Mental Well-Being Platform',
    description:
      'Built and deployed a Python/Streamlit application on AWS integrating VGG19-based facial emotion recognition, XGBoost mood prediction, and the Spotify API to generate personalized music recommendations.',
    highlights: ['94% facial emotion recognition accuracy'],
    techTags: ['Python', 'Streamlit', 'AWS', 'VGG19', 'XGBoost', 'Spotify API'],
    githubUrl: 'https://github.com/Rudrani26/Serenity-A-Mental-Well-Being-Web-Application',
    liveUrl: null,
  },
];

// ---------------------------------------------------------------------------
// Internship experience — work entries only (newest start date first).
// ---------------------------------------------------------------------------

export const internships: TimelineEntry[] = [
  {
    id: 'zoox',
    type: 'work',
    organization: 'Zoox, Inc',
    role: 'Software Engineering Intern',
    dateRange: 'May 2026 – Aug 2026',
    sortKey: '2026-05',
    location: 'Foster City, California',
    logoSrc: '/portfolio/logos/zoox.jpg',
    monogram: 'ZX',
    bullets: [
      'Owned end-to-end development of a conversational AI platform serving 3,200+ engineers, integrating Slack, React, and FastAPI to automate read-only diagnostics across 500+ AWS RDS/Aurora instances without database or AWS Console access.',
      'Architected a zero-trust LLM execution pipeline decoupling PydanticAI routing from AWS operations via FastMCP, constraining agents to 28+ predefined skills and 30+ tools with 3-layer read-only guardrails, scoped AWS access, and short-lived Vault credentials.',
      'Reduced recurring database-support tickets by 75% and diagnostic latency from 2 days to <5 seconds, enabling engineers to self-service routine production diagnostics without DBA intervention.',
    ],
    techIds: ['pydantic-ai', 'fastmcp', 'aws', 'vault', 'react', 'fastapi', 'agentic-ai'],
  },
  {
    id: 'clearing-corp',
    type: 'work',
    organization: 'The Clearing Corporation of India',
    role: 'Software Engineering Intern',
    dateRange: 'Jun 2024 – Nov 2024',
    sortKey: '2024-06',
    location: 'Mumbai, India',
    logoSrc: '/portfolio/logos/ccil.jpg',
    monogram: 'CCI',
    bullets: [
      'Refactored a legacy membership renewal system into Spring Boot microservices with React and SQL, reducing renewal processing time by 20% across workflows serving 50K+ users.',
      'Designed REST APIs and React workflows enforcing backend role- and entitlement-based validation across 20+ membership types, preventing invalid renewal requests from reaching downstream processing.',
      'Optimized SQL queries through indexing, join restructuring, stored-procedure tuning, and pagination, reducing average query response time by 30% across renewal workflows serving 50K+ users.',
    ],
    techIds: ['spring-boot', 'react', 'sql', 'rest-apis'],
  },
  {
    id: 'clover',
    type: 'work',
    organization: 'Clover Infotech Pvt. Ltd',
    role: 'Software Engineering Intern',
    dateRange: 'Mar 2023 – Jul 2023',
    sortKey: '2023-03',
    location: 'Mumbai, India',
    logoSrc: '/portfolio/logos/clover-infotech.jpg',
    monogram: 'CLV',
    bullets: [
      'Developed a Spring Boot–based data management service with RESTful APIs and MySQL, implementing CRUD workflows, server-side validation, and Spring Data JPA persistence across 5+ core data entities.',
      'Implemented batch-processing workflows for bulk data imports, processing 10K+ records per run with validation and error handling, reducing ingestion time by 30% compared with individual record processing.',
    ],
    techIds: ['spring-boot', 'mysql', 'rest-apis'],
  },
];

// ---------------------------------------------------------------------------
// Education — academic degree plus the peer-reviewed publication from
// earlier research work (no internships here).
// ---------------------------------------------------------------------------

export const education: TimelineEntry[] = [
  {
    id: 'usc',
    type: 'education',
    organization: 'University of Southern California',
    role: 'Master of Science in Computer Science',
    dateRange: 'Aug 2025 – May 2027 (Expected)',
    sortKey: '2025-08',
    location: 'Los Angeles, California',
    logoSrc: '/portfolio/logos/usc.jpg',
    monogram: 'USC',
    bullets: [
      'GPA: 3.75 / 4.0.',
      'Relevant coursework: Analysis of Algorithms, Database Systems, Agentic AI, Applied Natural Language Processing.',
    ],
    techIds: ['agentic-ai', 'nlp', 'sql'],
  },
  {
    id: 'university-of-mumbai',
    type: 'education',
    organization: 'University of Mumbai',
    role: 'Bachelor of Engineering in Information Technology',
    dateRange: 'Jul 2021 – May 2025',
    sortKey: '2021-07',
    location: 'Mumbai, India',
    logoSrc: '/portfolio/logos/uom.jpg',
    monogram: 'UOM',
    bullets: ['GPA: 9.21 / 10.'],
    techIds: [],
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
  { id: 'toggle-theme', label: 'Toggle theme', kind: 'theme' },
];
