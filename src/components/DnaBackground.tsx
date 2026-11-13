import { useEffect, useRef, useState } from 'react';

const SPACING = 30;       // px between rungs
const AMP = 44;           // half-width of the helix (must match --dna-amp in CSS)
const CX = 60;
const PERIOD = 8;         // seconds per full rotation
const RUNGS_PER_TURN = 13;

/**
 * One continuous rotating double helix centered behind a group of sections.
 * Built from CSS transforms only (cheap on phones) and paused while off screen.
 * Must be rendered inside a `position: relative` parent; its height follows the parent.
 */
export const DnaBackground = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const node = ref.current;
    const zone = node?.parentElement;
    if (!node || !zone) return;
    const measure = () => setHeight(zone.clientHeight);
    measure();
    const resize = new ResizeObserver(measure);
    resize.observe(zone);
    const visibility = new IntersectionObserver(([entry]) => node.classList.toggle('dna-running', entry.isIntersecting), { rootMargin: '150px' });
    visibility.observe(zone);
    return () => { resize.disconnect(); visibility.disconnect(); };
  }, []);

  const rungs = Math.max(0, Math.floor((height - 40) / SPACING));

  return (
    <div ref={ref} className="dna-bg" aria-hidden="true">
      {rungs > 0 && (
        <svg viewBox={`0 0 ${CX * 2} ${height}`} width={CX * 2} height={height} className="dna-helix" focusable="false">
          {Array.from({ length: rungs }, (_, i) => {
            const y = 20 + i * SPACING;
            const delay = `${(-i * PERIOD) / RUNGS_PER_TURN}s`;
            return (
              <g key={i} className="dna-rung">
                <line className="dna-bar" x1={CX - AMP} x2={CX + AMP} y1={y} y2={y} style={{ animationDelay: delay }} />
                <circle className="dna-node dna-node-a" cx={CX} cy={y} r="5" style={{ animationDelay: delay }} />
                <circle className="dna-node dna-node-b" cx={CX} cy={y} r="5" style={{ animationDelay: delay }} />
              </g>
            );
          })}
        </svg>
      )}
    </div>
  );
};
