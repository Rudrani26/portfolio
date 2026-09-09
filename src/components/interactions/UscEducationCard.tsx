import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import type { TimelineEntry } from '../../types';
import { getSkillName } from '../../lib/skills';
import { formatGraduationCountdown } from '../../lib/graduation';
import { USC_CARDINAL, USC_GOLD } from '../../lib/trojanColors';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useTrojanMode } from '../../hooks/useTrojanMode';
import { TrojanConfetti } from './TrojanConfetti';

const CLICK_RESET_MS = 1500;

export function UscEducationCard({ entry, index }: { entry: TimelineEntry; index: number }) {
  const reduced = useReducedMotion();
  const { active, activate, pushTerminalMessage } = useTrojanMode();
  const [logoHover, setLogoHover] = useState(false);
  const [showCountdown, setShowCountdown] = useState(false);
  const [countdownLabel, setCountdownLabel] = useState(() => formatGraduationCountdown());
  const clickCountRef = useRef(0);
  const clickResetTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // Only the recurring refresh lives in the effect (its setState runs inside
  // the interval callback); the initial value is set synchronously in
  // toggleCountdown below, when the visitor opens the countdown.
  useEffect(() => {
    if (!showCountdown) return;
    const interval = setInterval(() => setCountdownLabel(formatGraduationCountdown()), 60_000);
    return () => clearInterval(interval);
  }, [showCountdown]);

  useEffect(() => () => clearTimeout(clickResetTimer.current), []);

  // Easter egg 1: two clicks/taps/keyboard-activations on the USC logo,
  // within a short window, activate Trojan Mode.
  const handleLogoActivate = () => {
    clickCountRef.current += 1;
    clearTimeout(clickResetTimer.current);

    if (clickCountRef.current === 1) {
      pushTerminalMessage(["Hint: some commands aren't listed."]);
      clickResetTimer.current = setTimeout(() => {
        clickCountRef.current = 0;
      }, CLICK_RESET_MS);
      return;
    }

    clickCountRef.current = 0;
    activate();
  };

  const toggleCountdown = () => {
    setShowCountdown((prev) => {
      const next = !prev;
      if (next) setCountdownLabel(formatGraduationCountdown());
      return next;
    });
  };

  return (
    <motion.li
      initial={reduced ? undefined : { opacity: 0, x: -16 }}
      whileInView={reduced ? undefined : { opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.05, 0.3), ease: [0.16, 1, 0.3, 1] }}
      className="relative pl-12"
    >
      <button
        type="button"
        onClick={handleLogoActivate}
        onMouseEnter={() => setLogoHover(true)}
        onMouseLeave={() => setLogoHover(false)}
        onFocus={() => setLogoHover(true)}
        onBlur={() => setLogoHover(false)}
        onTouchEnd={() => setLogoHover(false)}
        aria-label="USC logo. Activate twice to discover an easter egg."
        className="absolute left-0 top-0 flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl border bg-white p-1 transition-transform duration-200"
        style={{
          borderColor: logoHover || active ? USC_CARDINAL : 'var(--color-border)',
          transform: logoHover && !reduced ? 'translateY(-2px) rotate(-2deg)' : undefined,
        }}
      >
        {entry.logoSrc && (
          <img
            src={entry.logoSrc}
            alt="University of Southern California logo"
            className="h-full w-full object-contain"
            loading="lazy"
          />
        )}
      </button>

      {logoHover && (
        <span
          className="pointer-events-none absolute -top-7 left-0 rounded-full border px-2 py-0.5 text-[10px] font-semibold whitespace-nowrap transition-opacity duration-200"
          style={{
            borderColor: USC_CARDINAL,
            backgroundColor: 'var(--color-surface-raised)',
            color: USC_GOLD,
            fontFamily: 'var(--font-mono)',
          }}
        >
          Fight On!
        </span>
      )}

      <div
        className={`rc-card relative p-5 transition-colors duration-300 ${
          active ? (reduced ? 'trojan-active-static' : 'trojan-active') : ''
        }`}
        style={!active && logoHover ? { borderColor: 'color-mix(in srgb, #990000 55%, var(--color-border))' } : undefined}
      >
        <TrojanConfetti active={active && !reduced} />

        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="rc-eyebrow">{entry.dateRange}</p>
          {active && (
            <span
              className="rounded-full border px-2.5 py-1 text-[11px] font-semibold"
              style={{ borderColor: USC_CARDINAL, color: USC_GOLD, fontFamily: 'var(--font-mono)' }}
            >
              ✌️ Fight On!
            </span>
          )}
        </div>

        <h3 className="mt-1 text-base font-semibold text-(--color-text)">{entry.organization}</h3>
        <p className="text-sm text-(--color-text-muted)">
          {entry.role} · {entry.location}
        </p>

        <button
          type="button"
          onClick={toggleCountdown}
          aria-label={showCountdown ? 'Show expected graduation date' : 'Show live countdown to graduation'}
          className="mt-2 text-sm font-medium text-(--color-text-muted) underline decoration-dotted underline-offset-4 transition-colors hover:text-(--color-text)"
        >
          {showCountdown ? countdownLabel : 'Expected May 2027'}
        </button>

        <div className="mt-4 border-t border-(--color-border) pt-4">
          <ul className="space-y-2">
            {entry.bullets.map((bullet, i) => (
              <li key={i} className="flex gap-2 text-sm text-(--color-text-muted)">
                <span className="text-(--color-accent-lime)" aria-hidden="true">
                  ·
                </span>
                {bullet}
              </li>
            ))}
          </ul>

          {entry.techIds.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {entry.techIds.map((id) => (
                <span key={id} className="rc-tag">
                  {getSkillName(id)}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.li>
  );
}
