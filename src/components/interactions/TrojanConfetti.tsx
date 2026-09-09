import { useEffect, useMemo, useState } from 'react';
import { USC_CARDINAL, USC_GOLD } from '../../lib/trojanColors';

interface Particle {
  id: number;
  tx: string;
  ty: string;
  rot: string;
  color: string;
  delay: string;
  left: string;
  top: string;
}

const PARTICLE_COUNT = 14;
const VISIBLE_MS = 1500;

function buildParticles(): Particle[] {
  return Array.from({ length: PARTICLE_COUNT }, (_, i) => {
    const angle = (Math.PI * 2 * i) / PARTICLE_COUNT + Math.random() * 0.4;
    const distance = 50 + Math.random() * 70;
    return {
      id: i,
      tx: `${Math.cos(angle) * distance}px`,
      ty: `${Math.sin(angle) * distance}px`,
      rot: `${Math.round(Math.random() * 360)}deg`,
      color: i % 2 === 0 ? USC_CARDINAL : USC_GOLD,
      delay: `${Math.round(Math.random() * 120)}ms`,
      left: `${40 + Math.random() * 20}%`,
      top: `${30 + Math.random() * 20}%`,
    };
  });
}

/** A small, tasteful cardinal-and-gold burst — mounts once per activation, self-clears. */
export function TrojanConfetti({ active }: { active: boolean }) {
  const [visible, setVisible] = useState(active);
  const [trackedActive, setTrackedActive] = useState(active);
  const particles = useMemo(() => (active ? buildParticles() : []), [active]);

  // Adjust `visible` during render when `active` changes (React's documented
  // pattern for this), rather than in an effect — the effect below only
  // needs to own the auto-clear timeout, whose setState runs inside a
  // callback rather than synchronously in the effect body.
  if (active !== trackedActive) {
    setTrackedActive(active);
    setVisible(active);
  }

  useEffect(() => {
    if (!visible) return;
    const timeout = setTimeout(() => setVisible(false), VISIBLE_MS);
    return () => clearTimeout(timeout);
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {particles.map((p) => (
        <span
          key={p.id}
          className="trojan-confetti-particle"
          style={{
            left: p.left,
            top: p.top,
            backgroundColor: p.color,
            animationDelay: p.delay,
            ['--tx' as string]: p.tx,
            ['--ty' as string]: p.ty,
            ['--rot' as string]: p.rot,
          }}
        />
      ))}
    </div>
  );
}
