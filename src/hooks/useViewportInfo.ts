import { useEffect, useState } from 'react';

const BREAKPOINTS: [string, number][] = [
  ['2xl', 1536],
  ['xl', 1280],
  ['lg', 1024],
  ['md', 768],
  ['sm', 640],
];

function getBreakpoint(width: number): string {
  return BREAKPOINTS.find(([, min]) => width >= min)?.[0] ?? 'base';
}

/** Live viewport width/height + current Tailwind-style breakpoint name. Debug overlay only. */
export function useViewportInfo(enabled: boolean) {
  const [info, setInfo] = useState(() => ({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
    breakpoint: typeof window !== 'undefined' ? getBreakpoint(window.innerWidth) : 'base',
  }));

  useEffect(() => {
    if (!enabled) return;
    const handleResize = () => {
      const width = window.innerWidth;
      setInfo({ width, height: window.innerHeight, breakpoint: getBreakpoint(width) });
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [enabled]);

  return info;
}
