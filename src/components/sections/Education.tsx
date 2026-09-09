import { education } from '../../data/portfolio';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { TimelineList } from '../ui/TimelineList';

export function Education() {
  return (
    <section id="education" data-debug-outline data-debug-label="Education" className="rc-section">
      <Container>
        <SectionHeading
          eyebrow="Education"
          title="Academic Background"
          description="Degree in progress, plus a peer-reviewed publication from earlier research work."
        />
        <TimelineList entries={education} />
      </Container>
    </section>
  );
}
