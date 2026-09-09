import { motion } from 'framer-motion';
import { ExternalLink, FlaskConical } from 'lucide-react';
import type { TimelineEntry } from '../../types';
import { getSkillName } from '../../lib/skills';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { CompanyLogo } from './CompanyLogo';

export function TimelineItem({ entry, index }: { entry: TimelineEntry; index: number }) {
  const reduced = useReducedMotion();

  return (
    <motion.li
      initial={reduced ? undefined : { opacity: 0, x: -16 }}
      whileInView={reduced ? undefined : { opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.05, 0.3), ease: [0.16, 1, 0.3, 1] }}
      className="group relative pl-12"
    >
      <span className="absolute left-0 top-0" aria-hidden="true">
        {entry.type === 'research' ? (
          <span
            className="flex h-9 w-9 items-center justify-center rounded-full border"
            style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface)' }}
          >
            <FlaskConical size={15} className="text-(--color-accent-lime)" />
          </span>
        ) : (
          <span className="grayscale-[65%] opacity-90 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100">
            <CompanyLogo logoSrc={entry.logoSrc} monogram={entry.monogram} organization={entry.organization} />
          </span>
        )}
      </span>

      <div className="rc-card p-5">
        <div>
          <p className="rc-eyebrow">{entry.dateRange}</p>
          <h3 className="mt-1 text-base font-semibold text-(--color-text)">{entry.organization}</h3>
          <p className="text-sm text-(--color-text-muted)">
            {entry.role} · {entry.location}
          </p>
        </div>

        <div className="mt-4 border-t border-(--color-border) pt-4">
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
        </div>
      </div>
    </motion.li>
  );
}

export function TimelineList({ entries }: { entries: TimelineEntry[] }) {
  return (
    <ol className="relative mt-12 space-y-6">
      <span
        className="absolute left-[18px] top-2 bottom-2 w-px"
        style={{ backgroundColor: 'var(--color-border)' }}
        aria-hidden="true"
      />
      {entries.map((entry, index) => (
        <TimelineItem key={entry.id} entry={entry} index={index} />
      ))}
    </ol>
  );
}
