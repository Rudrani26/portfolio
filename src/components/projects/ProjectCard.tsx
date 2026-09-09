import { motion } from 'framer-motion';
import type { Project } from '../../types';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { GithubIcon } from '../ui/BrandIcons';

export function ProjectCard({ project }: { project: Project }) {
  const reduced = useReducedMotion();

  return (
    <motion.article
      initial={reduced ? undefined : { opacity: 0, y: 20 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      whileHover={reduced ? undefined : { y: -4 }}
      className="rc-card flex h-full flex-col overflow-hidden p-6"
    >
      <span
        className="-mx-6 -mt-6 mb-6 block h-1.5"
        style={{ backgroundColor: 'var(--color-accent-lime)' }}
        aria-hidden="true"
      />

      <h3 className="rc-heading-md text-lg">{project.name}</h3>
      <p className="mt-3 text-sm text-(--color-text-muted)">{project.description}</p>

      {project.highlights && project.highlights.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-2">
          {project.highlights.map((highlight) => (
            <li
              key={highlight}
              className="rounded-full border px-3 py-1 text-xs font-medium"
              style={{ borderColor: 'var(--color-accent-lime)', color: 'var(--color-accent-lime)' }}
            >
              {highlight}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.techTags.map((tag) => (
          <span key={tag} className="rc-tag">
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-auto pt-6">
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-(--color-text) underline decoration-(--color-border) underline-offset-4 hover:decoration-(--color-text)"
          >
            <GithubIcon size={14} />
            View source
          </a>
        )}
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-4 inline-flex items-center gap-1.5 text-sm font-medium text-(--color-text) underline decoration-(--color-border) underline-offset-4 hover:decoration-(--color-text)"
          >
            View live
          </a>
        )}
      </div>
    </motion.article>
  );
}
