import { useEffect, useRef } from 'react';

const SPACING = 30;        // px between rungs (zone space)
const RUNGS_PER_TURN = 13; // rungs per full twist
const PERIOD = 9;          // seconds per full rotation
const WIDTH = 170;         // canvas width in CSS px
const AMP = 46;            // half-width of the helix
const FRAME_MS = 1000 / 30;

/**
 * One continuous rotating double helix behind a group of sections.
 * A single sticky canvas redraws only the rungs visible in the viewport (~30 fps),
 * so cost is constant no matter how tall the sections are. Paused when off screen.
 * Must be rendered inside a `position: relative` parent.
 */
export const DnaBackground = () => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const zone = wrap?.parentElement;
    const ctx = canvas?.getContext('2d');
    if (!wrap || !canvas || !zone || !ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let dpr = 1, vh = 0, raf = 0, last = 0, visible = false, disposed = false;

    const size = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      vh = window.innerHeight;
      canvas.width = Math.round(WIDTH * dpr);
      canvas.height = Math.round(vh * dpr);
      canvas.style.width = `${WIDTH}px`;
      canvas.style.height = `${vh}px`;
    };

    const draw = (now: number) => {
      const top = zone.getBoundingClientRect().top;      // zone origin in viewport space
      const t = (now / 1000) * ((Math.PI * 2) / PERIOD);
      const cx = WIDTH / 2;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, WIDTH, vh);
      const first = Math.max(0, Math.floor((-top - 20) / SPACING));
      const lastRung = Math.ceil((vh - top) / SPACING);
      for (let i = first; i <= lastRung; i++) {
        const y = top + 20 + i * SPACING;
        if (y < -10 || y > vh + 10) continue;
        const angle = t - (i * Math.PI * 2) / RUNGS_PER_TURN;
        const c = Math.cos(angle), s = Math.sin(angle);
        const xa = cx + c * AMP, xb = cx - c * AMP;
        ctx.strokeStyle = 'rgba(110,170,165,0.5)';
        ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(xa, y); ctx.lineTo(xb, y); ctx.stroke();
        // depth: the node in front (s > 0) is larger and stronger
        const ra = 5 + s * 1.6, rb = 5 - s * 1.6;
        ctx.fillStyle = `rgba(83,183,174,${0.65 + s * 0.3})`;
        ctx.beginPath(); ctx.arc(xa, y, ra, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = `rgba(215,179,108,${0.65 - s * 0.3})`;
        ctx.beginPath(); ctx.arc(xb, y, rb, 0, Math.PI * 2); ctx.fill();
      }
    };

    const loop = (now: number) => {
      raf = 0;
      if (disposed || !visible) return;
      if (now - last >= FRAME_MS) { last = now; draw(now); }
      raf = requestAnimationFrame(loop);
    };
    const start = () => { if (!raf && visible && !reduced && !document.hidden) raf = requestAnimationFrame(loop); };

    size();
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) { reduced ? draw(performance.now()) : start(); }
    }, { rootMargin: '100px' });
    observer.observe(zone);
    const onResize = () => { size(); if (visible) draw(performance.now()); };
    const onVis = () => { if (!document.hidden) start(); };
    const onScroll = () => { if (reduced && visible) draw(performance.now()); };
    window.addEventListener('resize', onResize);
    document.addEventListener('visibilitychange', onVis);
    if (reduced) window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      disposed = true;
      observer.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVis);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div ref={wrapRef} className="dna-bg" aria-hidden="true">
      <canvas ref={canvasRef} className="dna-canvas" />
    </div>
  );
};
