import { projects } from '../../data/portfolio';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { ProjectCard } from '../projects/ProjectCard';

export function Projects() {
  return (
    <section id="projects" data-debug-outline data-debug-label="Projects" className="rc-section">
      <Container>
        <SectionHeading
          eyebrow="Selected work"
          title="Things I’ve Built"
          description="Projects from my résumé — full-stack apps built on real model inference."
        />

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </Container>
    </section>
  );
}
