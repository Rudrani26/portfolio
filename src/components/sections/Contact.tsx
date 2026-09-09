import { Check, Copy, Mail } from 'lucide-react';
import { contactContent, profile } from '../../data/portfolio';
import { useCopyToClipboard } from '../../hooks/useCopyToClipboard';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { GithubIcon, LinkedinIcon } from '../ui/BrandIcons';

const github = profile.social.find((s) => s.id === 'github')!;
const linkedin = profile.social.find((s) => s.id === 'linkedin')!;

export function Contact() {
  const { copied, copy } = useCopyToClipboard();

  return (
    <section id="contact" data-debug-outline data-debug-label="Contact" className="rc-section">
      <Container className="max-w-2xl">
        <SectionHeading eyebrow="Contact" title={contactContent.closingStatement} />

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a href={`mailto:${profile.email}`} className="rc-btn-primary">
            <Mail size={16} aria-hidden="true" />
            Email me
          </a>

          <button type="button" onClick={() => copy(profile.email)} className="rc-btn-secondary" aria-live="polite">
            {copied ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
            {copied ? contactContent.emailCopiedLabel : 'Copy email'}
          </button>

          <a href={github.href} target="_blank" rel="noopener noreferrer" className="rc-btn-secondary">
            <GithubIcon size={16} />
            GitHub
          </a>

          <a href={linkedin.href} target="_blank" rel="noopener noreferrer" className="rc-btn-secondary">
            <LinkedinIcon size={16} />
            LinkedIn
          </a>
        </div>
      </Container>
    </section>
  );
}
