import { useCallback, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface GraphNode {
  id: string;
  label: string;
  description: string;
  x: number;
  y: number;
  depth: number;
}

const NODES: GraphNode[] = [
  { id: 'agents', label: 'Agents', description: 'Autonomous LLM-driven workflows scoped to a fixed set of tools.', x: 50, y: 10, depth: 1 },
  { id: 'apis', label: 'APIs', description: 'REST interfaces that connect agents, services, and clients.', x: 88, y: 38, depth: 0.7 },
  { id: 'security', label: 'Security', description: 'Default-deny policy, auth, and audit around every request.', x: 73, y: 88, depth: 1.1 },
  { id: 'data', label: 'Data', description: 'The databases and stores every system reads from and writes to.', x: 27, y: 88, depth: 0.8 },
  { id: 'infrastructure', label: 'Infrastructure', description: 'The cloud, containers, and pipelines everything runs on.', x: 12, y: 38, depth: 1 },
];

const EDGES: [string, string][] = [
  ['agents', 'apis'],
  ['agents', 'security'],
  ['agents', 'data'],
  ['agents', 'infrastructure'],
  ['apis', 'security'],
  ['apis', 'infrastructure'],
  ['security', 'data'],
  ['data', 'infrastructure'],
  ['apis', 'data'],
  ['security', 'infrastructure'],
];

function nodeById(id: string) {
  return NODES.find((n) => n.id === id)!;
}

export function HeroNodeGraph() {
  const reduced = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const [activeId, setActiveId] = useState<string | null>(null);
  const rafRef = useRef<number | undefined>(undefined);

  const handlePointerMove = useCallback(
    (event: React.PointerEvent) => {
      if (reduced || event.pointerType !== 'mouse' || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const nx = (event.clientX - rect.left) / rect.width - 0.5;
      const ny = (event.clientY - rect.top) / rect.height - 0.5;

      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => setPointer({ x: nx, y: ny }));
    },
    [reduced],
  );

  const handlePointerLeave = useCallback(() => setPointer({ x: 0, y: 0 }), []);

  const activeNode = activeId ? nodeById(activeId) : null;

  return (
    <div className="w-full">
      <div
        ref={containerRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        className="relative aspect-square w-full max-w-md mx-auto select-none"
        role="group"
        aria-label="Interactive diagram of connected systems: agents, APIs, security, data, and infrastructure"
      >
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
          {EDGES.map(([a, b]) => {
            const nodeA = nodeById(a);
            const nodeB = nodeById(b);
            const isHighlighted = activeId === a || activeId === b;
            return (
              <line
                key={`${a}-${b}`}
                x1={nodeA.x}
                y1={nodeA.y}
                x2={nodeB.x}
                y2={nodeB.y}
                stroke="var(--color-accent-lime)"
                strokeWidth={isHighlighted ? 0.5 : 0.25}
                opacity={isHighlighted ? 0.55 : 0.18}
                style={{ transition: 'opacity 200ms ease, stroke-width 200ms ease' }}
              />
            );
          })}
        </svg>

        {NODES.map((node, index) => {
          const isActive = activeId === node.id;
          const offsetX = reduced ? 0 : pointer.x * 14 * node.depth;
          const offsetY = reduced ? 0 : pointer.y * 14 * node.depth;

          return (
            <motion.button
              key={node.id}
              type="button"
              aria-pressed={isActive}
              aria-describedby={isActive ? 'hero-node-description' : undefined}
              onFocus={() => setActiveId(node.id)}
              onBlur={() => setActiveId((current) => (current === node.id ? null : current))}
              onMouseEnter={() => setActiveId(node.id)}
              onMouseLeave={() => setActiveId((current) => (current === node.id ? null : current))}
              onClick={() => setActiveId((current) => (current === node.id ? null : node.id))}
              className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5 rounded-full"
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              animate={
                reduced
                  ? { x: offsetX, y: offsetY }
                  : { x: offsetX, y: [offsetY - 3, offsetY + 3, offsetY - 3] }
              }
              transition={
                reduced
                  ? { duration: 0 }
                  : { y: { duration: 4 + index * 0.4, repeat: Infinity, ease: 'easeInOut' }, x: { duration: 0.2 } }
              }
            >
              <span
                className="flex h-14 w-14 items-center justify-center rounded-full border text-[11px] font-semibold uppercase tracking-wide transition-colors"
                style={{
                  fontFamily: 'var(--font-mono)',
                  borderColor: isActive ? 'var(--color-accent-lime)' : 'var(--color-border)',
                  backgroundColor: isActive ? 'color-mix(in srgb, var(--color-accent-lime) 16%, var(--color-surface))' : 'var(--color-surface)',
                  color: isActive ? 'var(--color-accent-lime)' : 'var(--color-text-muted)',
                }}
              >
                {node.label.slice(0, 3)}
              </span>
              <span className="text-[11px] text-(--color-text-muted)">{node.label}</span>
            </motion.button>
          );
        })}
      </div>

      <p
        id="hero-node-description"
        role="status"
        className="rc-card mx-auto mt-6 max-w-md px-4 py-3 text-center text-sm text-(--color-text-muted)"
      >
        {activeNode ? (
          <>
            <span className="font-semibold text-(--color-text)">{activeNode.label}: </span>
            {activeNode.description}
          </>
        ) : (
          'Hover, focus, or tap a node to see how it connects to the rest of the system.'
        )}
      </p>
    </div>
  );
}
