import { useRef, type ReactNode } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  as?: 'button' | 'a';
  href?: string;
  onClick?: () => void;
  target?: string;
  rel?: string;
  'aria-label'?: string;
}

/** Wraps a button/link with a restrained pointer-following pull, pointer devices only. */
export function MagneticButton({ children, className, as = 'button', href, onClick, target, rel, ...aria }: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement & HTMLAnchorElement>(null);
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 300, damping: 20, mass: 0.5 });

  const handlePointerMove = (event: React.PointerEvent) => {
    if (reduced || event.pointerType !== 'mouse' || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((event.clientX - rect.left - rect.width / 2) * 0.25);
    y.set((event.clientY - rect.top - rect.height / 2) * 0.25);
  };

  const handlePointerLeave = () => {
    x.set(0);
    y.set(0);
  };

  const style = reduced ? undefined : { x: springX, y: springY };

  if (as === 'a') {
    return (
      <motion.a
        ref={ref}
        className={className}
        style={style}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        href={href}
        target={target}
        rel={rel}
        whileTap={{ scale: 0.96 }}
        {...aria}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref}
      type="button"
      className={className}
      style={style}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onClick={onClick}
      whileTap={{ scale: 0.96 }}
      {...aria}
    >
      {children}
    </motion.button>
  );
}
