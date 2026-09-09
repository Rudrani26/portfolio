import { useCallback, useRef, useState } from 'react';

/** Copies text to the clipboard and reports a "copied" state for a fixed window. */
export function useCopyToClipboard(resetAfterMs = 2500) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const copy = useCallback(
    async (text: string) => {
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => setCopied(false), resetAfterMs);
        return true;
      } catch {
        return false;
      }
    },
    [resetAfterMs],
  );

  return { copied, copy };
}
