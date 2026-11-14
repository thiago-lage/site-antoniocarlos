import { useEffect, useRef, useState } from 'react';

const SPACING = 30;                          // px between rungs
const RUNGS_PER_TURN = 13;                   // rungs per full twist
const TILE = SPACING * RUNGS_PER_TURN;       // 390px: the helix pattern repeats every turn
const PERIOD = 9;                            // seconds per full rotation
const WIDTH = 170;                           // tile width in CSS px
const AMP = 46;                              // half-width of the helix
const FRAME_MS = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches ? 1000 / 20 : 1000 / 30;

/**
 * One continuous rotating double helix behind a group of sections.
 * The helix repeats every 390px, so it is drawn as stacked tile canvases that live in the page
 * and scroll natively with it (no scroll-synced redraw, hence no jitter). Only the tiles
 * on screen are redrawn (~30 fps) and the loop pauses when the zone is off screen.
 * Must be rendered inside a `position: relative` parent.
 */
export const DnaBackground = () => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [tiles, setTiles] = useState(0);

  useEffect(() => {
    const wrap = wrapRef.current;
    const zone = wrap?.parentElement;
    if (!wrap || !zone) return;
    const measure = () => setTiles(Math.ceil(zone.clientHeight / TILE));
    measure();
    const resize = new ResizeObserver(measure);
    resize.observe(zone);
    return () => resize.disconnect();
  }, []);

  useEffect(() => {
    const wrap = wrapRef.current;
    const zone = wrap?.parentElement;
    if (!wrap || !zone || tiles === 0) return;
    const canvases = Array.from(wrap.querySelectorAll('canvas'));
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const contexts = canvases.map(canvas => {
      canvas.width = Math.round(WIDTH * dpr);
      canvas.height = Math.round(TILE * dpr);
      return canvas.getContext('2d');
    });
    let raf = 0, last = 0, visible = false, disposed = false;

    const drawTile = (ctx: CanvasRenderingContext2D, t: number) => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, WIDTH, TILE);
      const cx = WIDTH / 2;
      for (let j = 0; j < RUNGS_PER_TURN; j++) {
        const y = 20 + j * SPACING;
        const angle = t - (j * Math.PI * 2) / RUNGS_PER_TURN;
        const c = Math.cos(angle), s = Math.sin(angle);
        const xa = cx + c * AMP, xb = cx - c * AMP;
        ctx.strokeStyle = 'rgba(110,170,165,0.5)';
        ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(xa, y); ctx.lineTo(xb, y); ctx.stroke();
        // depth: the node in front (s > 0) is larger and stronger
        ctx.fillStyle = `rgba(83,183,174,${0.65 + s * 0.3})`;
        ctx.beginPath(); ctx.arc(xa, y, 5 + s * 1.6, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = `rgba(215,179,108,${0.65 - s * 0.3})`;
        ctx.beginPath(); ctx.arc(xb, y, 5 - s * 1.6, 0, Math.PI * 2); ctx.fill();
      }
    };

    const drawVisible = (now: number, all = false) => {
      const t = (now / 1000) * ((Math.PI * 2) / PERIOD);
      const vh = window.innerHeight;
      canvases.forEach((canvas, i) => {
        const ctx = contexts[i];
        if (!ctx) return;
        const rect = canvas.getBoundingClientRect();
        if (all || (rect.bottom > -20 && rect.top < vh + 20)) drawTile(ctx, t);
      });
    };

    const loop = (now: number) => {
      raf = 0;
      if (disposed || !visible) return;
      if (now - last >= FRAME_MS) { last = now; drawVisible(now); }
      raf = requestAnimationFrame(loop);
    };
    const start = () => { if (!raf && visible && !reduced && !document.hidden) raf = requestAnimationFrame(loop); };

    drawVisible(performance.now(), true); // first frame (also the static frame for reduced motion)
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; if (visible) start(); }, { rootMargin: '100px' });
    observer.observe(zone);
    const onVis = () => { if (!document.hidden) start(); };
    document.addEventListener('visibilitychange', onVis);
    return () => {
      disposed = true;
      observer.disconnect();
      cancelAnimationFrame(raf);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, [tiles]);

  return (
    <div ref={wrapRef} className="dna-bg" aria-hidden="true">
      {Array.from({ length: tiles }, (_, k) => (
        <canvas key={k} className="dna-canvas" style={{ top: k * TILE, width: WIDTH, height: TILE }} />
      ))}
    </div>
  );
};
