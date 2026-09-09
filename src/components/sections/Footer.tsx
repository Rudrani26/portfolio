import { Mail } from 'lucide-react';
import { footerContent, profile } from '../../data/portfolio';
import { useDebugMode } from '../../hooks/useDebugMode';
import { Container } from '../ui/Container';
import { DebugModeOverlay } from '../interactions/DebugModeOverlay';
import { GithubIcon, LinkedinIcon } from '../ui/BrandIcons';

const github = profile.social.find((s) => s.id === 'github')!;
const linkedin = profile.social.find((s) => s.id === 'linkedin')!;

export function Footer() {
  const { active, registerActivation, deactivate } = useDebugMode();
  const year = new Date().getFullYear();

  return (
    <footer data-debug-outline data-debug-label="Footer" className="border-t border-(--color-border) py-10">
      <Container className="flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
        <p className="text-sm text-(--color-text-muted)">
          {footerContent.tagline}{' '}
          <button
            type="button"
            onClick={registerActivation}
            aria-label="Portfolio footer symbol"
            className="inline-block rounded px-0.5 text-(--color-text-muted) transition-colors hover:text-(--color-accent-lime)"
            title=" "
          >
            ·
          </button>{' '}
          © {year}
        </p>

        <div className="flex items-center gap-3">
          <a href={github.href} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-(--color-text-muted) hover:text-(--color-text)">
            <GithubIcon size={18} />
          </a>
          <a href={linkedin.href} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-(--color-text-muted) hover:text-(--color-text)">
            <LinkedinIcon size={18} />
          </a>
          <a href={`mailto:${profile.email}`} aria-label="Email" className="text-(--color-text-muted) hover:text-(--color-text)">
            <Mail size={18} />
          </a>
        </div>
      </Container>

      <DebugModeOverlay active={active} onExit={deactivate} />
    </footer>
  );
}
