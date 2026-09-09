import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { commandActions } from '../../data/portfolio';
import { scrollToSection } from '../../lib/scroll';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import type { Theme } from '../../hooks/useTheme';

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
  theme: Theme;
  onToggleTheme: () => void;
}

export function CommandPalette({ open, onClose, theme, onToggleTheme }: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [highlighted, setHighlighted] = useState(0);
  const [wasOpen, setWasOpen] = useState(open);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const reduced = useReducedMotion();

  useFocusTrap(containerRef, open);

  // Reset the search state during render when `open` flips true, per React's
  // documented pattern for adjusting state on a prop change (avoids the
  // extra render a useEffect-based reset would cause).
  if (open !== wasOpen) {
    setWasOpen(open);
    if (open) {
      setQuery('');
      setHighlighted(0);
    }
  }

  useEffect(() => {
    if (!open) return;
    const id = requestAnimationFrame(() => inputRef.current?.focus());
    return () => cancelAnimationFrame(id);
  }, [open]);

  const filtered = useMemo(() => {
    const actions = commandActions.map((action) =>
      action.id === 'toggle-theme'
        ? { ...action, label: theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme' }
        : action,
    );
    if (!query.trim()) return actions;
    const q = query.toLowerCase();
    return actions.filter((action) => action.label.toLowerCase().includes(q));
  }, [query, theme]);

  const runAction = (id: string) => {
    const action = filtered.find((a) => a.id === id);
    if (!action) return;

    switch (action.kind) {
      case 'section':
        onClose();
        if (action.sectionId) setTimeout(() => scrollToSection(action.sectionId!), 30);
        break;
      case 'theme':
        onToggleTheme();
        onClose();
        break;
      case 'external':
        window.open(action.href, '_blank', 'noopener,noreferrer');
        onClose();
        break;
      case 'link':
        window.open(action.href, '_self');
        onClose();
        break;
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      onClose();
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      setHighlighted((prev) => Math.min(prev + 1, filtered.length - 1));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setHighlighted((prev) => Math.max(prev - 1, 0));
    } else if (event.key === 'Enter') {
      event.preventDefault();
      const target = filtered[highlighted];
      if (target) runAction(target.id);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[200] flex items-start justify-center px-4 pt-[12vh]">
          <motion.div
            initial={reduced ? undefined : { opacity: 0 }}
            animate={reduced ? undefined : { opacity: 1 }}
            exit={reduced ? undefined : { opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="absolute inset-0 bg-black/50"
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            ref={containerRef}
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            initial={reduced ? undefined : { opacity: 0, y: -12, scale: 0.98 }}
            animate={reduced ? undefined : { opacity: 1, y: 0, scale: 1 }}
            exit={reduced ? undefined : { opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            onKeyDown={handleKeyDown}
            className="rc-card relative z-10 w-full max-w-lg overflow-hidden"
          >
            <div className="border-b border-(--color-border) px-4 py-3">
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setHighlighted(0);
                }}
                type="text"
                placeholder="Type a command or search…"
                aria-label="Search commands"
                className="w-full bg-transparent text-sm text-(--color-text) outline-none placeholder:text-(--color-text-muted)"
              />
            </div>

            <ul role="listbox" aria-label="Commands" className="max-h-80 overflow-y-auto p-2">
              {filtered.length === 0 && (
                <li className="px-3 py-4 text-sm text-(--color-text-muted)">No matching commands.</li>
              )}
              {filtered.map((action, index) => (
                <li key={action.id} role="option" aria-selected={index === highlighted}>
                  <button
                    type="button"
                    onMouseEnter={() => setHighlighted(index)}
                    onClick={() => runAction(action.id)}
                    className="flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors"
                    style={{
                      backgroundColor:
                        index === highlighted ? 'color-mix(in srgb, var(--color-accent-lime) 14%, transparent)' : 'transparent',
                      color: index === highlighted ? 'var(--color-text)' : 'var(--color-text-muted)',
                    }}
                  >
                    <span>{action.label}</span>
                    {index === highlighted && <ArrowRight size={14} aria-hidden="true" />}
                  </button>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-3 border-t border-(--color-border) px-4 py-2.5 text-[11px] text-(--color-text-muted)">
              <span className="flex items-center gap-1">
                <kbd className="rc-kbd">↑</kbd>
                <kbd className="rc-kbd">↓</kbd> navigate
              </span>
              <span className="flex items-center gap-1">
                <kbd className="rc-kbd">↵</kbd> select
              </span>
              <span className="flex items-center gap-1">
                <kbd className="rc-kbd">esc</kbd> close
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
