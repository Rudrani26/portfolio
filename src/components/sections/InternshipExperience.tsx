import { internships } from '../../data/portfolio';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { TimelineList } from '../ui/TimelineList';

export function InternshipExperience() {
  return (
    <section id="experience" data-debug-outline data-debug-label="Internship Experience" className="rc-section">
      <Container>
        <SectionHeading
          eyebrow="Internships"
          title="Where I’ve Been Building"
          description="Software engineering internships, most recent first."
        />
        <TimelineList entries={internships} />
      </Container>
    </section>
  );
}
