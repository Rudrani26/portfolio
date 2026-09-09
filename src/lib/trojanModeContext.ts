import { createContext } from 'react';

export interface TerminalMessage {
  id: string;
  lines: string[];
}

export interface TrojanModeContextValue {
  active: boolean;
  /** Shared activation entry point — every trigger (logo, keyboard, terminal) calls this. */
  activate: (options?: { skipTerminalMessage?: boolean }) => void;
  /** Messages queued for the portfolio terminal to display (hints, success text). */
  terminalMessages: TerminalMessage[];
  /** Called by the terminal once it has appended the queued messages to its own history. */
  consumeTerminalMessages: () => void;
  pushTerminalMessage: (lines: string[]) => void;
}

export const TrojanModeContext = createContext<TrojanModeContextValue | null>(null);
