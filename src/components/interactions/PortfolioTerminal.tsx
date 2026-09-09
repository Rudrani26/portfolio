import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Check, CornerDownLeft, Copy } from 'lucide-react';
import { education, internships, profile, projects, terminalSkillIds, terminalWhoami } from '../../data/portfolio';
import { getSkillName } from '../../lib/skills';
import { scrollToSection } from '../../lib/scroll';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useCopyToClipboard } from '../../hooks/useCopyToClipboard';
import { useTrojanMode } from '../../hooks/useTrojanMode';

type TerminalAction = { kind: 'nav'; label: string; sectionId: string } | { kind: 'email' } | { kind: 'copy' };

interface TerminalEntry {
  id: string;
  command?: string;
  lines: string[];
  actions?: TerminalAction[];
}

const WELCOME_ENTRY: TerminalEntry = {
  id: 'welcome',
  lines: ['Welcome to rudrani.dev', 'Choose a command to explore.'],
};

const COMMANDS: { id: string; label: string; aliases: string[] }[] = [
  { id: 'whoami', label: 'whoami', aliases: ['whoami'] },
  { id: 'projects', label: 'view projects', aliases: ['view projects', 'projects'] },
  { id: 'experience', label: 'show experience', aliases: ['show experience', 'experience'] },
  { id: 'education', label: 'show education', aliases: ['show education', 'education'] },
  { id: 'skills', label: 'show skills', aliases: ['show skills', 'skills'] },
  { id: 'contact', label: 'contact', aliases: ['contact'] },
  { id: 'clear', label: 'clear', aliases: ['clear', 'cls'] },
];

function buildEntry(commandId: string, label: string, entryId: string): TerminalEntry | null {
  switch (commandId) {
    case 'whoami':
      return { id: entryId, command: label, lines: terminalWhoami };
    case 'projects':
      return {
        id: entryId,
        command: label,
        lines: projects.map((p) => `• ${p.name}`),
        actions: [{ kind: 'nav', label: 'View Projects', sectionId: 'projects' }],
      };
    case 'experience':
      return {
        id: entryId,
        command: label,
        lines: internships.map((entry) => `• ${entry.organization} — ${entry.role} (${entry.dateRange})`),
        actions: [{ kind: 'nav', label: 'View Experience', sectionId: 'experience' }],
      };
    case 'education':
      return {
        id: entryId,
        command: label,
        lines: education
          .filter((entry) => entry.type === 'education')
          .map((entry) => `• ${entry.organization} — ${entry.role}`),
        actions: [{ kind: 'nav', label: 'View Education', sectionId: 'education' }],
      };
    case 'skills':
      return {
        id: entryId,
        command: label,
        lines: [terminalSkillIds.map(getSkillName).join(' · ')],
        actions: [{ kind: 'nav', label: 'View Toolbox', sectionId: 'toolbox' }],
      };
    case 'contact':
      return { id: entryId, command: label, lines: [profile.email], actions: [{ kind: 'email' }, { kind: 'copy' }] };
    default:
      return null;
  }
}

export function PortfolioTerminal() {
  const reduced = useReducedMotion();
  const { copied, copy } = useCopyToClipboard();
  const { activate, terminalMessages, consumeTerminalMessages } = useTrojanMode();
  const [history, setHistory] = useState<TerminalEntry[]>([WELCOME_ENTRY]);
  const [inputValue, setInputValue] = useState('');
  const [revealCount, setRevealCount] = useState(reduced ? WELCOME_ENTRY.lines.length : 0);
  const containerRef = useRef<HTMLDivElement>(null);
  const entryCounter = useRef(0);

  const latest = history[history.length - 1];

  // System messages pushed from elsewhere (the USC logo's click hint, and a
  // brief success line when Trojan Mode is activated by a non-terminal
  // trigger) land here and get appended like any other terminal output.
  useEffect(() => {
    if (terminalMessages.length === 0) return;
    setHistory((prev) => [
      ...prev,
      ...terminalMessages.map((message) => ({ id: `sys-${message.id}`, lines: message.lines })),
    ]);
    consumeTerminalMessages();
  }, [terminalMessages, consumeTerminalMessages]);

  useEffect(() => {
    if (reduced) {
      setRevealCount(latest.lines.length);
      return;
    }
    setRevealCount(0);
    let cancelled = false;
    let i = 0;
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    const step = () => {
      if (cancelled) return;
      i += 1;
      setRevealCount(i);
      if (i < latest.lines.length) timeouts.push(setTimeout(step, 90));
    };
    timeouts.push(setTimeout(step, 90));
    return () => {
      cancelled = true;
      timeouts.forEach(clearTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history.length, reduced]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && containerRef.current?.contains(document.activeElement)) {
        setRevealCount(latest.lines.length);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [latest.lines.length]);

  const runCommand = (commandId: string, label: string) => {
    if (commandId === 'clear') {
      setHistory([WELCOME_ENTRY]);
      return;
    }
    entryCounter.current += 1;
    const entry = buildEntry(commandId, label, `${commandId}-${entryCounter.current}`);
    if (entry) setHistory((prev) => [...prev, entry]);
  };

  const handleSubmitTyped = (event: React.FormEvent) => {
    event.preventDefault();
    const raw = inputValue.trim().toLowerCase();
    if (!raw) return;
    setInputValue('');

    // Hidden command — intentionally not in COMMANDS, so it never appears as
    // a chip and never shows up in the "not a command" suggestion list.
    if (raw === 'fighton') {
      entryCounter.current += 1;
      setHistory((prev) => [
        ...prev,
        {
          id: `fighton-${entryCounter.current}`,
          command: raw,
          lines: ['[success] Trojan Mode activated', 'Cardinal: #990000', 'Gold: #FFCC00', 'Status: ✌️ Fight On!'],
        },
      ]);
      activate({ skipTerminalMessage: true });
      return;
    }

    const match = COMMANDS.find((c) => c.aliases.includes(raw));
    if (match) {
      runCommand(match.id, match.label);
    } else {
      entryCounter.current += 1;
      setHistory((prev) => [
        ...prev,
        {
          id: `unknown-${entryCounter.current}`,
          command: raw,
          lines: [`Not a command. Try: ${COMMANDS.filter((c) => c.id !== 'clear').map((c) => c.label).join(', ')}.`],
        },
      ]);
    }
  };

  return (
    <div
      ref={containerRef}
      role="region"
      aria-label="Interactive portfolio terminal, rudrani.dev"
      className="rc-card overflow-hidden"
    >
      <div className="flex items-center gap-2 border-b px-4 py-3" style={{ borderColor: 'var(--color-border)' }}>
        <span className="h-2 w-2 rounded-full" style={{ backgroundColor: 'var(--color-accent-lime)' }} aria-hidden="true" />
        <span className="text-xs" style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}>
          rudrani.dev
        </span>
      </div>

      <div aria-live="polite" className="space-y-4 px-4 py-4 text-sm" style={{ fontFamily: 'var(--font-mono)' }}>
        {history.map((entry, entryIndex) => {
          const isLatest = entryIndex === history.length - 1;
          const shown = isLatest ? entry.lines.slice(0, revealCount) : entry.lines;

          return (
            <div key={entry.id}>
              {entry.command && (
                <p className="text-(--color-accent-lime)">
                  <span aria-hidden="true">$ </span>
                  {entry.command}
                </p>
              )}
              <div className="mt-1 space-y-1 text-(--color-text-muted)">
                {shown.map((line, i) => (
                  <p key={i} className="break-words">
                    {line}
                  </p>
                ))}
              </div>
              {entry.actions && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {entry.actions.map((action) => {
                    if (action.kind === 'nav') {
                      return (
                        <button
                          key={action.sectionId}
                          type="button"
                          onClick={() => scrollToSection(action.sectionId)}
                          className="rc-btn-secondary !px-3 !py-1.5 text-xs"
                        >
                          {action.label}
                          <ArrowRight size={12} aria-hidden="true" />
                        </button>
                      );
                    }
                    if (action.kind === 'email') {
                      return (
                        <a key="email" href={`mailto:${profile.email}`} className="rc-btn-secondary !px-3 !py-1.5 text-xs">
                          Email me
                          <ArrowRight size={12} aria-hidden="true" />
                        </a>
                      );
                    }
                    return (
                      <button
                        key="copy"
                        type="button"
                        onClick={() => copy(profile.email)}
                        className="rc-btn-secondary !px-3 !py-1.5 text-xs"
                        aria-live="polite"
                      >
                        {copied ? <Check size={12} aria-hidden="true" /> : <Copy size={12} aria-hidden="true" />}
                        {copied ? 'Copied—talk soon!' : 'Copy email'}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex flex-wrap gap-2 border-t px-4 py-3" style={{ borderColor: 'var(--color-border)' }}>
        {COMMANDS.map((cmd) => (
          <button
            key={cmd.id}
            type="button"
            onClick={() => runCommand(cmd.id, cmd.label)}
            className="rc-tag"
            style={{ minHeight: 32, fontSize: '11px' }}
          >
            <span aria-hidden="true">$ </span>
            {cmd.label}
          </button>
        ))}
      </div>

      <form
        onSubmit={handleSubmitTyped}
        className="flex items-center gap-2 border-t px-4 py-2.5"
        style={{ borderColor: 'var(--color-border)' }}
      >
        <span aria-hidden="true" className="text-(--color-text-muted)" style={{ fontFamily: 'var(--font-mono)' }}>
          $
        </span>
        <label htmlFor="terminal-input" className="sr-only">
          Type a command
        </label>
        <input
          id="terminal-input"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="type a command…"
          autoComplete="off"
          className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-(--color-text-muted)"
          style={{ fontFamily: 'var(--font-mono)' }}
        />
        <button
          type="submit"
          aria-label="Run command"
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-(--color-text-muted) transition-colors hover:text-(--color-accent-lime)"
        >
          <CornerDownLeft size={14} aria-hidden="true" />
        </button>
      </form>
    </div>
  );
}
