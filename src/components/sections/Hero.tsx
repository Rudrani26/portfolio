import { motion } from 'framer-motion';
import { ArrowDown, Download, Sparkles } from 'lucide-react';
import { heroContent, profile } from '../../data/portfolio';
import { scrollToSection } from '../../lib/scroll';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { Container } from '../ui/Container';
import { MagneticButton } from '../interactions/MagneticButton';
import { TerminalIntro } from '../interactions/TerminalIntro';
import { HeroNodeGraph } from '../interactions/HeroNodeGraph';

export function Hero() {
  const reduced = useReducedMotion();

  return (
    <section
      id="hero"
      data-debug-outline
      data-debug-label="Hero"
      className="relative overflow-hidden py-16 md:py-0 md:min-h-[90vh] md:flex md:items-center"
    >
      <div className="rc-grid-motif pointer-events-none absolute inset-0" aria-hidden="true" />

      <Container className="relative grid grid-cols-1 items-center gap-12 md:grid-cols-[1.1fr_0.9fr] md:gap-8">
        <motion.div
          initial={reduced ? undefined : { opacity: 0, y: 20 }}
          animate={reduced ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="rc-badge mb-6">
            <Sparkles size={12} aria-hidden="true" />
            {profile.availabilityBadge}
          </div>

          <h1 className="rc-heading-xl max-w-xl">{heroContent.headline}</h1>

          <p className="rc-body-lg mt-6 max-w-lg text-(--color-text-muted)">{heroContent.supporting}</p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <MagneticButton
              as="button"
              className="rc-btn-primary"
              onClick={() => scrollToSection('projects')}
            >
              {heroContent.ctaPrimary}
              <ArrowDown size={16} aria-hidden="true" />
            </MagneticButton>
            <MagneticButton as="a" href={profile.resumeHref} target="_blank" rel="noopener noreferrer" className="rc-btn-secondary">
              <Download size={16} aria-hidden="true" />
              {heroContent.ctaSecondary}
            </MagneticButton>
          </div>

          <div className="mt-10 max-w-sm">
            <TerminalIntro lines={heroContent.terminalLines} />
          </div>
        </motion.div>

        <motion.div
          initial={reduced ? undefined : { opacity: 0, scale: 0.95 }}
          animate={reduced ? undefined : { opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <HeroNodeGraph />
        </motion.div>
      </Container>

      <button
        type="button"
        onClick={() => scrollToSection('projects')}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 text-(--color-text-muted) md:flex"
        aria-label="Scroll to featured projects"
      >
        <span className="rc-eyebrow">scroll</span>
        <motion.span
          animate={reduced ? undefined : { y: [0, 6, 0] }}
          transition={reduced ? undefined : { duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={16} aria-hidden="true" />
        </motion.span>
      </button>
    </section>
  );
}
