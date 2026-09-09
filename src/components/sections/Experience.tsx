import { useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, ChevronDown, ExternalLink, FlaskConical, GraduationCap, Users } from 'lucide-react';
import { timeline } from '../../data/portfolio';
import { getSkillName } from '../../lib/skills';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import type { TimelineEntry, TimelineEntryType } from '../../types';

const TYPE_ICON: Record<TimelineEntryType, typeof Briefcase> = {
  work: Briefcase,
  education: GraduationCap,
  research: FlaskConical,
  leadership: Users,
};

function TimelineItem({ entry, index }: { entry: TimelineEntry; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const reduced = useReducedMotion();
  const Icon = TYPE_ICON[entry.type];

  return (
    <motion.li
      initial={reduced ? undefined : { opacity: 0, x: -16 }}
      whileInView={reduced ? undefined : { opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.05, 0.3), ease: [0.16, 1, 0.3, 1] }}
      className="relative pl-12"
    >
      <span
        className="absolute left-0 top-0 flex h-9 w-9 items-center justify-center rounded-full border"
        style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface)' }}
        aria-hidden="true"
      >
        <Icon size={15} className="text-(--color-accent-lime)" />
      </span>

      <div className="rc-card p-5">
        <button
          type="button"
          onClick={() => setExpanded((prev) => !prev)}
          aria-expanded={expanded}
          className="flex w-full flex-col items-start gap-1 text-left sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <p className="rc-eyebrow">{entry.dateRange}</p>
            <h3 className="mt-1 text-base font-semibold text-(--color-text)">{entry.organization}</h3>
            <p className="text-sm text-(--color-text-muted)">
              {entry.role} · {entry.location}
            </p>
          </div>
          <motion.span animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.2 }} className="mt-2 shrink-0 sm:mt-0">
            <ChevronDown size={18} className="text-(--color-text-muted)" aria-hidden="true" />
          </motion.span>
        </button>

        {expanded && (
          <motion.div
            initial={reduced ? undefined : { opacity: 0, height: 0 }}
            animate={reduced ? undefined : { opacity: 1, height: 'auto' }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="mt-4 overflow-hidden border-t border-(--color-border) pt-4"
          >
            <ul className="space-y-2">
              {entry.bullets.map((bullet, i) => (
                <li key={i} className="flex gap-2 text-sm text-(--color-text-muted)">
                  <span className="text-(--color-accent-lime)" aria-hidden="true">
                    ·
                  </span>
                  {bullet}
                </li>
              ))}
            </ul>

            {entry.techIds.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-1.5">
                {entry.techIds.map((id) => (
                  <span key={id} className="rc-tag">
                    {getSkillName(id)}
                  </span>
                ))}
              </div>
            )}

            {entry.link && (
              <a
                href={entry.link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-(--color-text) underline decoration-(--color-border) underline-offset-4 hover:decoration-(--color-text)"
              >
                {entry.link.label}
                <ExternalLink size={13} aria-hidden="true" />
              </a>
            )}
          </motion.div>
        )}
      </div>
    </motion.li>
  );
}

export function Experience() {
  return (
    <section id="experience" data-debug-outline data-debug-label="Experience" className="rc-section">
      <Container>
        <SectionHeading
          eyebrow="Timeline"
          title="Where I’ve Been Building"
          description="Internships, education, and research — expand any entry for the details."
        />

        <ol className="relative mt-12 space-y-6">
          <span
            className="absolute left-[18px] top-2 bottom-2 w-px"
            style={{ backgroundColor: 'var(--color-border)' }}
            aria-hidden="true"
          />
          {timeline.map((entry, index) => (
            <TimelineItem key={entry.id} entry={entry} index={index} />
          ))}
        </ol>
      </Container>
    </section>
  );
}
