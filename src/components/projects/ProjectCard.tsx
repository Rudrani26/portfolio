import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import type { Project } from '../../types';
import { getSkillName } from '../../lib/skills';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { GithubIcon } from '../ui/BrandIcons';

const CATEGORY_LABEL: Record<Project['category'], string> = {
  ai: 'AI',
  backend: 'Backend',
  security: 'Security',
  fullstack: 'Full Stack',
};

export function ProjectCard({ project }: { project: Project }) {
  const [expanded, setExpanded] = useState(false);
  const reduced = useReducedMotion();
  const hasRealRepo = project.githubUrl && !project.githubUrl.startsWith('#');

  return (
    <motion.article
      layout={!reduced}
      initial={reduced ? undefined : { opacity: 0, y: 20 }}
      animate={reduced ? undefined : { opacity: 1, y: 0 }}
      exit={reduced ? undefined : { opacity: 0, y: -10 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      whileHover={reduced ? undefined : { y: -4 }}
      className="rc-card flex h-full flex-col p-6"
      style={project.isPlaceholder ? { borderStyle: 'dashed' } : undefined}
    >
      <div className="mb-3 flex items-center justify-between gap-2">
        <span className="rc-tag">{CATEGORY_LABEL[project.category]}</span>
        {project.isPlaceholder && (
          <span className="text-[10px] uppercase tracking-wide text-(--color-text-muted)" style={{ fontFamily: 'var(--font-mono)' }}>
            Template — edit me
          </span>
        )}
      </div>

      <h3 className="rc-heading-md text-lg">{project.name}</h3>
      <p className="mt-2 text-sm text-(--color-text-muted)">{project.summary}</p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.techIds.map((id) => (
          <span key={id} className="rc-tag">
            {getSkillName(id)}
          </span>
        ))}
      </div>

      <button
        type="button"
        onClick={() => setExpanded((prev) => !prev)}
        aria-expanded={expanded}
        className="mt-5 flex items-center gap-1.5 text-xs font-semibold text-(--color-text-muted) transition-colors hover:text-(--color-text)"
      >
        <motion.span animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={14} aria-hidden="true" />
        </motion.span>
        {expanded ? 'Hide the hardest decision' : 'Show the hardest decision'}
      </button>

      {expanded && (
        <motion.div
          initial={reduced ? undefined : { opacity: 0, height: 0 }}
          animate={reduced ? undefined : { opacity: 1, height: 'auto' }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="mt-3 space-y-3 overflow-hidden border-t border-(--color-border) pt-3 text-sm text-(--color-text-muted)"
        >
          <p>
            <span className="font-semibold text-(--color-text)">Challenge: </span>
            {project.technicalChallenge}
          </p>
          <p>
            <span className="font-semibold text-(--color-text)">Decision: </span>
            {project.engineeringDecision}
          </p>
          <p>
            <span className="font-semibold text-(--color-text)">Result: </span>
            {project.measurableResult}
          </p>
        </motion.div>
      )}

      <div className="mt-auto pt-5">
        {hasRealRepo ? (
          <a
            href={project.githubUrl!}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-(--color-text) underline decoration-(--color-border) underline-offset-4 hover:decoration-(--color-text)"
          >
            <GithubIcon size={14} />
            View source
          </a>
        ) : (
          <span className="inline-flex items-center gap-1.5 text-sm text-(--color-text-muted) opacity-60">
            <GithubIcon size={14} />
            {project.isPlaceholder ? 'Add a repo link' : 'Repo link coming soon'}
          </span>
        )}
      </div>
    </motion.article>
  );
}
