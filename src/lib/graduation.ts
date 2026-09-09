// May 14, 2027 — USC expected graduation date for the Education-card countdown easter egg.
const GRADUATION_YEAR = 2027;
const GRADUATION_MONTH_INDEX = 4; // May (0-indexed)
const GRADUATION_DAY = 14;

/**
 * Whole calendar days until graduation, computed from each date's own
 * Y/M/D components mapped to UTC midnight — this avoids the fractional-day
 * drift that a raw `target - now` millisecond diff would produce depending
 * on the visitor's local time-of-day or timezone.
 */
export function daysUntilGraduation(now: Date = new Date()): number {
  const todayUTC = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
  const targetUTC = Date.UTC(GRADUATION_YEAR, GRADUATION_MONTH_INDEX, GRADUATION_DAY);
  return Math.round((targetUTC - todayUTC) / 86_400_000);
}

export function formatGraduationCountdown(now: Date = new Date()): string {
  const days = daysUntilGraduation(now);
  if (days <= 0) return 'USC graduate — Fight On!';
  return `Graduation in ${days} day${days === 1 ? '' : 's'}`;
}
