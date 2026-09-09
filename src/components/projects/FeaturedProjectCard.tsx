import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lightbulb } from 'lucide-react';
import type { Project } from '../../types';
import { getSkillName } from '../../lib/skills';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { ArchitectureDiagram } from './ArchitectureDiagram';
import { GithubIcon } from '../ui/BrandIcons';

export function FeaturedProjectCard({ project }: { project: Project }) {
  const [active, setActive] = useState(false);
  const reduced = useReducedMotion();
  const hasRealRepo = project.githubUrl && !project.githubUrl.startsWith('#');

  return (
    <motion.article
      initial={reduced ? undefined : { opacity: 0, y: 24 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
      className="rc-card grid grid-cols-1 gap-8 p-6 md:grid-cols-2 md:p-10"
    >
      <div className="flex flex-col">
        <span className="rc-eyebrow mb-3">Featured project</span>
        <h3 className="rc-heading-md">{project.name}</h3>
        <p className="mt-3 text-(--color-text-muted)">{project.summary}</p>
        <p className="mt-4 text-sm text-(--color-text-muted)">{project.description}</p>

        <dl className="mt-6 space-y-4">
          <div>
            <dt className="rc-eyebrow flex items-center gap-1.5">
              <Lightbulb size={12} aria-hidden="true" /> Hardest engineering decision
            </dt>
            <dd className="mt-1.5 text-sm text-(--color-text-muted)">{project.engineeringDecision}</dd>
          </div>
          <div>
            <dt className="rc-eyebrow">Result</dt>
            <dd className="mt-1.5 text-sm text-(--color-text-muted)">{project.measurableResult}</dd>
          </div>
        </dl>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.techIds.map((id) => (
            <span key={id} className="rc-tag">
              {getSkillName(id)}
            </span>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          {hasRealRepo ? (
            <a href={project.githubUrl!} target="_blank" rel="noopener noreferrer" className="rc-btn-secondary !px-4 !py-2.5 text-sm">
              <GithubIcon size={15} />
              View source
            </a>
          ) : (
            <span className="rc-btn-secondary !px-4 !py-2.5 text-sm opacity-50" aria-disabled="true">
              <GithubIcon size={15} />
              Repo link coming soon
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-col justify-center">
        <span className="rc-eyebrow mb-3">Request flow</span>
        {project.architecture && <ArchitectureDiagram steps={project.architecture} active={active} />}
        <p className="mt-3 text-xs text-(--color-text-muted)">
          Hover or focus this card to watch a request move through the authorization path.
        </p>
      </div>
    </motion.article>
  );
}
