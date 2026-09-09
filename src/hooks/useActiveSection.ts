import { useEffect, useState } from 'react';

/**
 * Tracks which section id is currently most visible in the viewport, for
 * driving the active state of nav links.
 */
export function useActiveSection(sectionIds: string[], rootMargin = '-40% 0px -50% 0px'): string {
  const [activeId, setActiveId] = useState(sectionIds[0] ?? '');

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length > 0) {
          const topMost = visible.reduce((a, b) => (a.intersectionRatio > b.intersectionRatio ? a : b));
          setActiveId(topMost.target.id);
        }
      },
      { rootMargin, threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sectionIds, rootMargin]);

  return activeId;
}
