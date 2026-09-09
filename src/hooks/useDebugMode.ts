import { useCallback, useEffect, useRef, useState } from 'react';

const ACTIVATION_CLICKS = 5;
const ACTIVATION_WINDOW_MS = 3000;

/** Five activations of the footer symbol within 3s toggles a temporary debug overlay. */
export function useDebugMode() {
  const [active, setActive] = useState(false);
  const clickTimestamps = useRef<number[]>([]);

  const registerActivation = useCallback(() => {
    const now = Date.now();
    clickTimestamps.current = [...clickTimestamps.current, now].filter(
      (timestamp) => now - timestamp < ACTIVATION_WINDOW_MS,
    );
    if (clickTimestamps.current.length >= ACTIVATION_CLICKS) {
      clickTimestamps.current = [];
      setActive((prev) => !prev);
    }
  }, []);

  const deactivate = useCallback(() => setActive(false), []);

  useEffect(() => {
    document.documentElement.dataset.debugMode = String(active);
    return () => {
      delete document.documentElement.dataset.debugMode;
    };
  }, [active]);

  return { active, registerActivation, deactivate };
}
