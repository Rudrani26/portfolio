// Shared content types for the portfolio. Keep this in sync with `src/data/portfolio.ts`.
//
// Every field here is meant to be fillable only with facts from the résumé
// or existing portfolio content — there is no "placeholder" project or
// experience concept in this data model on purpose.

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

export interface Project {
  id: string;
  name: string;
  /** Factual description, drawn directly from résumé bullets. */
  description: string;
  /** Literal stats/results quoted from the résumé (e.g. "92% translation accuracy"). */
  highlights?: string[];
  /** All technologies used, as displayed tags. */
  techTags: string[];
  githubUrl: string | null;
  liveUrl: string | null;
}

export type TimelineEntryType = 'work' | 'education' | 'research';

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
  /** Path to an official logo image under public/. Falls back to `monogram` if absent. */
  logoSrc?: string;
  /** Short monogram (2-3 chars) shown in a badge when no official logo is available. */
  monogram?: string;
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
  id: 'github' | 'linkedin' | 'email';
  label: string;
  href: string;
}

export interface Profile {
  name: string;
  initials: string;
  role: string;
  location: string;
  email: string;
  social: SocialLink[];
  availabilityBadge: string;
}
