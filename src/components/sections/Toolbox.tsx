import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { skillCategories, projects } from '../../data/portfolio';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';

export function Toolbox() {
  const [selectedSkillId, setSelectedSkillId] = useState<string | null>(null);

  const relatedProjects = useMemo(() => {
    if (!selectedSkillId) return [];
    return projects.filter((project) => project.techIds.includes(selectedSkillId) && !project.isPlaceholder);
  }, [selectedSkillId]);

  const toggleSkill = (id: string) => setSelectedSkillId((prev) => (prev === id ? null : id));

  return (
    <section id="toolbox" data-debug-outline data-debug-label="Toolbox" className="rc-section">
      <Container>
        <SectionHeading
          eyebrow="Toolbox"
          title="My Engineering Toolbox"
          description="Select a skill to see which projects put it to work."
        />

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {skillCategories.map((category) => (
            <div key={category.id} className="rc-card p-5">
              <h3 className="rc-eyebrow mb-4">{category.label}</h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => {
                  const isSelected = selectedSkillId === skill.id;
                  return (
                    <button
                      key={skill.id}
                      type="button"
                      onMouseEnter={() => setSelectedSkillId(skill.id)}
                      onMouseLeave={() => setSelectedSkillId((prev) => (prev === skill.id ? null : prev))}
                      onFocus={() => setSelectedSkillId(skill.id)}
                      onBlur={() => setSelectedSkillId((prev) => (prev === skill.id ? null : prev))}
                      onClick={() => toggleSkill(skill.id)}
                      aria-pressed={isSelected}
                      className="rc-tag transition-colors"
                      style={
                        isSelected
                          ? { borderColor: 'var(--color-accent-lime)', color: 'var(--color-accent-lime)' }
                          : undefined
                      }
                    >
                      {skill.name}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <motion.div
          animate={{ height: selectedSkillId ? 'auto' : 0, opacity: selectedSkillId ? 1 : 0 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 overflow-hidden"
          aria-live="polite"
        >
          {selectedSkillId && (
            <div className="rc-card p-5">
              <p className="rc-eyebrow mb-3">Used in</p>
              {relatedProjects.length > 0 ? (
                <ul className="flex flex-wrap gap-2">
                  {relatedProjects.map((project) => (
                    <li key={project.id} className="rc-tag" style={{ color: 'var(--color-text)' }}>
                      {project.name}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-(--color-text-muted)">Not directly tied to a featured project yet.</p>
              )}
            </div>
          )}
        </motion.div>
      </Container>
    </section>
  );
}
