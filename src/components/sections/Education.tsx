import { education } from '../../data/portfolio';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { TimelineItem } from '../ui/TimelineList';
import { UscEducationCard } from '../interactions/UscEducationCard';

export function Education() {
  return (
    <section id="education" data-debug-outline data-debug-label="Education" className="rc-section">
      <Container>
        <SectionHeading
          eyebrow="Education"
          title="Academic Background"
          description="Degree in progress, plus a peer-reviewed publication from earlier research work."
        />

        <ol className="relative mt-12 space-y-6">
          <span
            className="absolute left-[18px] top-2 bottom-2 w-px"
            style={{ backgroundColor: 'var(--color-border)' }}
            aria-hidden="true"
          />
          {education.map((entry, index) =>
            entry.id === 'usc' ? (
              <UscEducationCard key={entry.id} entry={entry} index={index} />
            ) : (
              <TimelineItem key={entry.id} entry={entry} index={index} />
            ),
          )}
        </ol>
      </Container>
    </section>
  );
}
