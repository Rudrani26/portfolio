import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { TrojanModeContext, type TerminalMessage } from '../../lib/trojanModeContext';

const ACTIVE_DURATION_MS = 7000;
const KEYBOARD_SEQUENCE = 'fighton';
const KEYBOARD_RESET_MS = 2000;

function isTypingTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  return tag === 'INPUT' || tag === 'TEXTAREA' || target.isContentEditable;
}

export function TrojanModeProvider({ children }: { children: ReactNode }) {
  const [active, setActive] = useState(false);
  const [terminalMessages, setTerminalMessages] = useState<TerminalMessage[]>([]);
  const activeRef = useRef(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const pushTerminalMessage = useCallback((lines: string[]) => {
    setTerminalMessages((prev) => [...prev, { id: `tm-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, lines }]);
  }, []);

  const consumeTerminalMessages = useCallback(() => {
    setTerminalMessages([]);
  }, []);

  const activate = useCallback(
    (options?: { skipTerminalMessage?: boolean }) => {
      // Ignore activation while already active — this is what guarantees a
      // single live timeout and stops rapid clicks/keystrokes from
      // stacking confetti or resetting the 7s window.
      if (activeRef.current) return;
      activeRef.current = true;
      setActive(true);
      if (!options?.skipTerminalMessage) {
        pushTerminalMessage(['✌️ Trojan Mode activated — Fight On!']);
      }
      timeoutRef.current = setTimeout(() => {
        activeRef.current = false;
        setActive(false);
      }, ACTIVE_DURATION_MS);
    },
    [pushTerminalMessage],
  );

  useEffect(
    () => () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    },
    [],
  );

  // Easter egg 4: typing FIGHTON anywhere on the page (outside inputs/editable
  // elements — the terminal handles its own "fighton" command separately).
  useEffect(() => {
    let buffer = '';
    let lastKeyTime = 0;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey || event.altKey) return;
      if (isTypingTarget(event.target)) return;
      if (event.key.length !== 1 || !/[a-zA-Z]/.test(event.key)) return;

      const now = Date.now();
      if (now - lastKeyTime > KEYBOARD_RESET_MS) buffer = '';
      lastKeyTime = now;

      buffer = (buffer + event.key.toLowerCase()).slice(-KEYBOARD_SEQUENCE.length);
      if (buffer === KEYBOARD_SEQUENCE) {
        buffer = '';
        activate();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [activate]);

  const value = useMemo(
    () => ({ active, activate, terminalMessages, consumeTerminalMessages, pushTerminalMessage }),
    [active, activate, terminalMessages, consumeTerminalMessages, pushTerminalMessage],
  );

  return (
    <TrojanModeContext.Provider value={value}>
      {children}
      <div role="status" aria-live="polite" className="sr-only">
        {active ? 'Trojan Mode activated. Fight On!' : ''}
      </div>
    </TrojanModeContext.Provider>
  );
}
