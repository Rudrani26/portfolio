/** Smoothly scrolls to a section id, respecting reduced-motion preference. */
export function scrollToSection(sectionId: string) {
  const target = document.getElementById(sectionId.replace('#', ''));
  if (!target) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  target.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth', block: 'start' });
  target.setAttribute('tabindex', '-1');
  target.focus({ preventScroll: true });
}
