interface CompanyLogoProps {
  logoSrc?: string;
  monogram?: string;
  organization: string;
}

/**
 * Shows the company's official logo when one exists locally under public/
 * (never hotlinked), inside a consistent light plate so square logos with
 * their own baked-in background stay legible on both themes. Falls back to
 * a decorative text-monogram badge when no logo asset is available.
 */
export function CompanyLogo({ logoSrc, monogram, organization }: CompanyLogoProps) {
  if (logoSrc) {
    return (
      <span
        className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-xl border bg-white p-1"
        style={{ borderColor: 'var(--color-border)' }}
      >
        <img src={logoSrc} alt={`${organization} logo`} className="h-full w-full object-contain" loading="lazy" />
      </span>
    );
  }

  const fallback = organization
    .split(' ')
    .filter((word) => /^[A-Za-z]/.test(word))
    .slice(0, 3)
    .map((word) => word[0])
    .join('');

  return (
    <span
      aria-hidden="true"
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border text-[11px] font-semibold"
      style={{
        borderColor: 'var(--color-border)',
        backgroundColor: 'var(--color-surface)',
        fontFamily: 'var(--font-mono)',
        color: 'var(--color-accent-lime)',
      }}
    >
      {(monogram ?? fallback).slice(0, 3)}
    </span>
  );
}
