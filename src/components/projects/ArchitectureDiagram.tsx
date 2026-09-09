import { motion } from 'framer-motion';
import type { ArchitectureStep } from '../../types';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface ArchitectureDiagramProps {
  steps: ArchitectureStep[];
  active: boolean;
}

function Box({ step }: { step: ArchitectureStep }) {
  return (
    <div
      className="rc-tag flex min-h-[44px] items-center justify-center rounded-lg border px-3 py-2 text-center text-[11px] normal-case tracking-normal"
      style={{ color: 'var(--color-text)' }}
      title={step.description}
    >
      {step.label}
    </div>
  );
}

/**
 * Renders: AI Client → SentinelMCP → MCP Server, with SentinelMCP also
 * connected down to Policy + Limits + Audit. On `active`, a request "dot"
 * animates through the path (skipped under reduced motion).
 */
export function ArchitectureDiagram({ steps, active }: ArchitectureDiagramProps) {
  const reduced = useReducedMotion();
  const [client, sentinel, server, policy] = steps;
  const shouldAnimate = active && !reduced;

  return (
    <div
      className="relative rounded-xl border p-4"
      style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-bg)' }}
      aria-label="Architecture diagram: AI Client connects to SentinelMCP, which forwards approved requests to the MCP Server and logs every decision through Policy, Limits, and Audit."
    >
      <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-x-1">
        <Box step={client} />
        <span className="h-px w-4 sm:w-6" style={{ backgroundColor: 'var(--color-border)' }} aria-hidden="true" />
        <Box step={sentinel} />
        <span className="h-px w-4 sm:w-6" style={{ backgroundColor: 'var(--color-border)' }} aria-hidden="true" />
        <Box step={server} />
      </div>

      <div className="flex justify-center py-1">
        <span className="h-4 w-px" style={{ backgroundColor: 'var(--color-border)' }} aria-hidden="true" />
      </div>

      <div className="flex justify-center">
        <div className="w-1/3 min-w-[9rem]">
          <Box step={policy} />
        </div>
      </div>

      {shouldAnimate && (
        <motion.span
          key={active ? 'run' : 'idle'}
          className="absolute h-2 w-2 rounded-full"
          style={{ backgroundColor: 'var(--color-accent-lime)', boxShadow: '0 0 8px var(--color-accent-lime)', top: '1.3rem' }}
          initial={{ left: '6%', opacity: 0 }}
          animate={{ left: ['6%', '6%', '46%', '46%', '90%'], opacity: [0, 1, 1, 1, 0] }}
          transition={{ duration: 1.6, ease: 'easeInOut', times: [0, 0.1, 0.45, 0.55, 1] }}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
