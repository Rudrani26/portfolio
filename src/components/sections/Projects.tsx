import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { projects } from '../../data/portfolio';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { ProjectFilters, type FilterValue } from '../projects/ProjectFilters';
import { ProjectCard } from '../projects/ProjectCard';
import { FeaturedProjectCard } from '../projects/FeaturedProjectCard';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export function Projects() {
  const [filter, setFilter] = useState<FilterValue>('all');
  const reduced = useReducedMotion();

  const filtered = useMemo(
    () => projects.filter((project) => filter === 'all' || project.category === filter),
    [filter],
  );

  const featured = filtered.find((project) => project.featured);
  const rest = filtered.filter((project) => !project.featured);

  return (
    <section id="projects" data-debug-outline data-debug-label="Projects" className="rc-section">
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Selected work"
            title="Things I’ve Built"
            description="A mix of shipped products and systems-level projects — from an authorization proxy for AI agents to full-stack apps built on real model inference."
          />
          <ProjectFilters value={filter} onChange={setFilter} />
        </div>

        <div className="mt-12 space-y-6">
          <AnimatePresence mode="popLayout">
            {featured && <FeaturedProjectCard key={featured.id} project={featured} />}
          </AnimatePresence>

          <motion.div layout={!reduced} className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {rest.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <p className="py-12 text-center text-(--color-text-muted)">No projects in this category yet.</p>
          )}
        </div>
      </Container>
    </section>
  );
}
