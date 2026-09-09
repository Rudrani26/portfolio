import type { ReactNode } from 'react';

export function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`rc-container ${className}`}>{children}</div>;
}
