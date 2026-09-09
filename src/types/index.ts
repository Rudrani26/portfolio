// Shared content types for the portfolio. Keep this in sync with `src/data/portfolio.ts`.

export type SkillCategoryId =
  | 'languages'
  | 'ai-ml'
  | 'backend-apis'
  | 'infrastructure'
  | 'databases'
  | 'dev-tools';

export interface Skill {
  id: string;
  name: string;
}

export interface SkillCategory {
  id: SkillCategoryId;
  label: string;
  skills: Skill[];
}

export type ProjectCategory = 'ai' | 'backend' | 'security' | 'fullstack';

export interface ArchitectureStep {
  id: string;
  label: string;
  description: string;
}

export interface Project {
  id: string;
  name: string;
  /** Outcome-focused one-line description. */
  summary: string;
  /** Longer explanation of what the project does and why it exists. */
  description: string;
  role: string;
  techIds: string[];
  category: ProjectCategory;
  technicalChallenge: string;
  engineeringDecision: string;
  measurableResult: string;
  githubUrl: string | null;
  liveUrl: string | null;
  featured: boolean;
  /** True for editable template cards that are not a real, shipped project. */
  isPlaceholder: boolean;
  /** Only used by the featured SentinelMCP card's architecture diagram. */
  architecture?: ArchitectureStep[];
}

export type TimelineEntryType = 'work' | 'education' | 'research' | 'leadership';

export interface TimelineEntry {
  id: string;
  type: TimelineEntryType;
  organization: string;
  role: string;
  dateRange: string;
  /** ISO-ish sort key, e.g. "2026-05", used only for ordering. */
  sortKey: string;
  location: string;
  bullets: string[];
  techIds: string[];
  link?: { label: string; href: string };
  isPlaceholder?: boolean;
}

export interface CurrentlyPanel {
  building: string;
  learning: string;
  reading: string;
  experimentingWith: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface CommandAction {
  id: string;
  label: string;
  hint?: string;
  kind: 'link' | 'section' | 'theme' | 'external';
  href?: string;
  sectionId?: string;
}

export interface SocialLink {
  id: 'github' | 'linkedin' | 'email' | 'resume';
  label: string;
  href: string;
}

export interface Profile {
  name: string;
  initials: string;
  role: string;
  location: string;
  email: string;
  resumeHref: string;
  social: SocialLink[];
  availabilityBadge: string;
}
