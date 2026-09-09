import { skillCategories } from '../../data/portfolio';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';

export function Toolbox() {
  return (
    <section id="toolbox" data-debug-outline data-debug-label="Toolbox" className="rc-section">
      <Container>
        <SectionHeading eyebrow="Toolbox" title="My Engineering Toolbox" />

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {skillCategories.map((category) => (
            <div key={category.id} className="rc-card p-5">
              <h3 className="rc-eyebrow mb-4">{category.label}</h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span key={skill.id} className="rc-tag">
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
