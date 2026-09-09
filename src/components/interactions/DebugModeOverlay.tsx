import { Bug } from 'lucide-react';
import { useViewportInfo } from '../../hooks/useViewportInfo';

interface DebugModeOverlayProps {
  active: boolean;
  onExit: () => void;
}

export function DebugModeOverlay({ active, onExit }: DebugModeOverlayProps) {
  const viewport = useViewportInfo(active);

  if (!active) return null;

  return (
    <div
      role="region"
      aria-label="Debug mode panel"
      className="fixed bottom-5 left-1/2 z-[150] flex -translate-x-1/2 items-center gap-4 rounded-full border px-5 py-3 shadow-lg"
      style={{ backgroundColor: 'var(--color-surface-raised)', borderColor: 'var(--color-border)' }}
    >
      <span className="flex items-center gap-2 text-xs" style={{ fontFamily: 'var(--font-mono)' }}>
        <Bug size={14} className="text-(--color-accent-lavender)" aria-hidden="true" />
        debug mode
      </span>
      <span className="text-xs text-(--color-text-muted)" style={{ fontFamily: 'var(--font-mono)' }}>
        {viewport.width}×{viewport.height} · {viewport.breakpoint}
      </span>
      <button type="button" onClick={onExit} className="rc-btn-ghost !px-3 !py-1.5 text-xs underline">
        Exit debug mode
      </button>
    </div>
  );
}
