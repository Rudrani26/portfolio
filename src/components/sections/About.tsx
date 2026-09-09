import { motion } from 'framer-motion';
import { BookOpen, FlaskConical, Hammer, Lightbulb } from 'lucide-react';
import { aboutContent, currentlyPanel } from '../../data/portfolio';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';

const CURRENTLY_ITEMS = [
  { icon: Hammer, label: 'Building', value: currentlyPanel.building },
  { icon: BookOpen, label: 'Learning', value: currentlyPanel.learning },
  { icon: Lightbulb, label: 'Reading', value: currentlyPanel.reading },
  { icon: FlaskConical, label: 'Experimenting with', value: currentlyPanel.experimentingWith },
];

export function About() {
  const reduced = useReducedMotion();

  return (
    <section id="about" data-debug-outline data-debug-label="About" className="rc-section">
      <Container className="grid grid-cols-1 gap-12 md:grid-cols-[1.1fr_0.9fr] md:gap-10">
        <div>
          <SectionHeading eyebrow="About" title="A little about how I work" />
          <p className="rc-body-lg mt-6 max-w-xl text-(--color-text-muted)">{aboutContent.paragraph}</p>
        </div>

        <motion.div
          initial={reduced ? undefined : { opacity: 0, y: 16 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="rc-card p-6"
        >
          <p className="rc-eyebrow mb-4">Currently</p>
          <ul className="space-y-4">
            {CURRENTLY_ITEMS.map(({ icon: Icon, label, value }) => (
              <li key={label} className="flex items-start gap-3">
                <span
                  className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
                  style={{ backgroundColor: 'color-mix(in srgb, var(--color-accent-lavender) 16%, transparent)' }}
                  aria-hidden="true"
                >
                  <Icon size={14} className="text-(--color-accent-lavender)" />
                </span>
                <div>
                  <p className="rc-eyebrow">{label}</p>
                  <p className="mt-0.5 text-sm text-(--color-text)">{value}</p>
                </div>
              </li>
            ))}
          </ul>
        </motion.div>
      </Container>
    </section>
  );
}
