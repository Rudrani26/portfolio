import { useEffect, useState } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface TerminalIntroProps {
  lines: string[];
}

/** Types `lines` out once, character by character, then stops. No looping. */
export function TerminalIntro({ lines }: TerminalIntroProps) {
  const reduced = useReducedMotion();
  const [typedLines, setTypedLines] = useState<string[]>(reduced ? lines : []);
  const [done, setDone] = useState(reduced);

  useEffect(() => {
    if (reduced) return;

    let lineIndex = 0;
    let charIndex = 0;
    let cancelled = false;
    const result: string[] = [];

    const tick = () => {
      if (cancelled) return;
      if (lineIndex >= lines.length) {
        setDone(true);
        return;
      }

      const currentLine = lines[lineIndex];
      if (charIndex === 0) result.push('');
      result[lineIndex] = currentLine.slice(0, charIndex + 1);
      setTypedLines([...result]);
      charIndex += 1;

      if (charIndex > currentLine.length) {
        lineIndex += 1;
        charIndex = 0;
        setTimeout(tick, 260);
      } else {
        setTimeout(tick, 22 + Math.random() * 30);
      }
    };

    const start = setTimeout(tick, 400);
    return () => {
      cancelled = true;
      clearTimeout(start);
    };
  }, [lines, reduced]);

  return (
    <div
      className="rc-card px-5 py-4 text-left"
      style={{ fontFamily: 'var(--font-mono)' }}
      role="status"
      aria-label="Terminal boot sequence"
    >
      {(reduced ? lines : typedLines).map((line, index) => (
        <div key={index} className="flex gap-2 text-sm leading-relaxed">
          <span className="text-(--color-accent-lime)">{'>'}</span>
          <span className="text-(--color-text-muted)">{line}</span>
        </div>
      ))}
      {!done && !reduced && (
        <span className="ml-4 inline-block h-4 w-2 animate-pulse bg-(--color-accent-lime)" aria-hidden="true" />
      )}
    </div>
  );
}
