import { motion } from 'framer-motion';
import type { ProjectCategory } from '../../types';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export type FilterValue = 'all' | ProjectCategory;

const FILTERS: { value: FilterValue; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'ai', label: 'AI' },
  { value: 'backend', label: 'Backend' },
  { value: 'security', label: 'Security' },
  { value: 'fullstack', label: 'Full Stack' },
];

interface ProjectFiltersProps {
  value: FilterValue;
  onChange: (value: FilterValue) => void;
}

export function ProjectFilters({ value, onChange }: ProjectFiltersProps) {
  const reduced = useReducedMotion();

  return (
    <div role="radiogroup" aria-label="Filter projects by category" className="flex flex-wrap gap-2">
      {FILTERS.map((filter) => {
        const isActive = value === filter.value;
        return (
          <button
            key={filter.value}
            type="button"
            role="radio"
            aria-checked={isActive}
            onClick={() => onChange(filter.value)}
            className="relative rounded-full px-4 py-2 text-sm font-medium transition-colors"
            style={{ color: isActive ? '#0d0f0e' : 'var(--color-text-muted)', minHeight: 44 }}
          >
            {isActive && (
              <motion.span
                layoutId="project-filter-pill"
                className="absolute inset-0 rounded-full"
                style={{ backgroundColor: 'var(--color-accent-lime)' }}
                transition={reduced ? { duration: 0 } : { type: 'spring', stiffness: 400, damping: 32 }}
              />
            )}
            <span className="relative">{filter.label}</span>
          </button>
        );
      })}
    </div>
  );
}
