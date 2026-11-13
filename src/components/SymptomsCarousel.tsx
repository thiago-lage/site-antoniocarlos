import { useCallback, useEffect, useRef, useState } from 'react';
import { SYMPTOMS } from './SymptomsSection';

type Layout = { w: number; h: number; radius: number; angle: number };
const LAYOUTS: Record<'desktop' | 'tablet' | 'mobile', Layout> = {
  desktop: { w: 300, h: 350, radius: 820, angle: 17 },
  tablet: { w: 270, h: 330, radius: 700, angle: 19 },
  mobile: { w: 232, h: 300, radius: 520, angle: 21 },
};

const pickLayout = (): Layout => {
  const width = window.innerWidth;
  return width < 640 ? LAYOUTS.mobile : width < 1024 ? LAYOUTS.tablet : LAYOUTS.desktop;
};

/** Signed circular distance from the active card, in the range [-n/2, n/2). */
const offsetFrom = (index: number, active: number, count: number) => {
  let d = (index - active) % count;
  if (d >= count / 2) d -= count;
  if (d < -count / 2) d += count;
  return d;
};

const Arrow = ({ dir }: { dir: 'left' | 'right' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} width="18" height="18" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d={dir === 'left' ? 'M19 12H5M12 19l-7-7 7-7' : 'M5 12h14M12 5l7 7-7 7'} />
  </svg>
);

/**
 * Test layout: symptoms as an arc ("spiral") carousel. Arrows (buttons and keyboard),
 * swipe on touch screens and a click on a side card all move the active card.
 * The centered card opens the symptom page. Toggle with SYMPTOMS_AS_CAROUSEL in ScrollOverlay.
 */
export const SymptomsCarousel = () => {
  const count = SYMPTOMS.length;
  const [active, setActive] = useState(0);
  const [layout, setLayout] = useState<Layout>(pickLayout);
  const sectionRef = useRef<HTMLElement>(null);
  const visibleRef = useRef(false);
  const previous = useRef<number[]>(SYMPTOMS.map((_, i) => offsetFrom(i, 0, count)));
  const swipe = useRef({ x: 0, moved: false, down: false });

  const go = useCallback((delta: number) => setActive(current => (current + delta + count) % count), [count]);

  useEffect(() => {
    const onResize = () => setLayout(pickLayout());
    window.addEventListener('resize', onResize);
    const section = sectionRef.current;
    const observer = new IntersectionObserver(([entry]) => { visibleRef.current = entry.intersectionRatio > 0.4; }, { threshold: [0, 0.4, 0.7] });
    if (section) observer.observe(section);
    const onKey = (event: KeyboardEvent) => {
      if (!visibleRef.current || (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight')) return;
      const target = event.target;
      if (target instanceof Element && target.closest('input, textarea, select, [contenteditable="true"], dialog[open]')) return;
      event.preventDefault();
      go(event.key === 'ArrowRight' ? 1 : -1);
    };
    window.addEventListener('keydown', onKey);
    return () => { window.removeEventListener('resize', onResize); window.removeEventListener('keydown', onKey); observer.disconnect(); };
  }, [go]);

  const offsets = SYMPTOMS.map((_, i) => offsetFrom(i, active, count));
  // A card that wraps from one end to the other must not sweep across the stage.
  const jumped = offsets.map((d, i) => Math.abs(d - previous.current[i]) > count / 2);
  useEffect(() => { previous.current = offsets; });

  const onPointerDown = (event: React.PointerEvent) => { swipe.current = { x: event.clientX, moved: false, down: true }; };
  const onPointerUp = (event: React.PointerEvent) => {
    if (!swipe.current.down) return;
    swipe.current.down = false;
    const dx = event.clientX - swipe.current.x;
    if (Math.abs(dx) > 45) { swipe.current.moved = true; go(dx < 0 ? 1 : -1); }
  };

  const stageHeight = layout.h + 110;

  return (
    <section ref={sectionRef} id="scene-sintomas" className="scene content-scene centered-scene symptoms-carousel-scene w-full flex flex-col items-center pl-5 pr-10 sm:px-10 md:px-14 lg:px-20" aria-labelledby="symptoms-title">
      <div className="fit-content pointer-events-auto w-full max-w-6xl flex flex-col items-center">
        <div className="text-center max-w-2xl px-2">
          <span className="text-label text-[10px] block mb-1.5">Escuta Clínica e Integrativa</span>
          <h2 id="symptoms-title" className="text-display text-2xl sm:text-3xl md:text-4xl text-[#163f49]">O que você está vivendo hoje?</h2>
          <div className="clinical-note sc-note mt-3 py-2.5 px-4 rounded-2xl text-center border border-[#d7b36c]/45 bg-[#fbf7ed]/80">
            <p className="text-xs text-[#163f49] leading-relaxed"><strong className="uppercase tracking-wider text-[10px] text-[#28616a]">Distinção Clínica Essencial</strong>{' '}Nem todo sintoma tem origem emocional ou espiritual. Compreendê-lo não substitui o diagnóstico nem o tratamento clínico.</p>
          </div>
        </div>

        <div className="sc-arrows" role="group" aria-label="Navegar pelos sintomas">
          <button type="button" onClick={() => go(-1)} aria-label="Sintoma anterior"><Arrow dir="left" /></button>
          <button type="button" onClick={() => go(1)} aria-label="Próximo sintoma"><Arrow dir="right" /></button>
        </div>

        <div
          className="sc-stage"
          style={{ height: stageHeight }}
          role="region"
          aria-roledescription="carrossel"
          aria-label="Sintomas"
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerCancel={() => { swipe.current.down = false; }}
        >
          {SYMPTOMS.map((item, i) => {
            const d = offsets[i];
            const isActive = d === 0;
            const hidden = Math.abs(d) > 2;
            return (
              <a
                key={item.id}
                href={`/sintomas/${item.id}`}
                className={`sc-card${isActive ? ' is-active' : ''}`}
                aria-label={isActive ? `Ver detalhes sobre ${item.title}` : `Mostrar ${item.title}`}
                aria-current={isActive}
                tabIndex={isActive ? 0 : -1}
                draggable={false}
                onClick={event => {
                  if (swipe.current.moved) { event.preventDefault(); swipe.current.moved = false; return; }
                  if (!isActive) { event.preventDefault(); setActive(i); }
                }}
                style={{
                  width: layout.w,
                  height: layout.h,
                  left: `calc(50% - ${layout.w / 2}px)`,
                  transformOrigin: `50% ${layout.h + layout.radius}px`,
                  transform: `rotate(${d * layout.angle}deg)`,
                  opacity: hidden ? 0 : isActive ? 1 : Math.abs(d) === 1 ? 0.6 : 0.36,
                  filter: isActive || hidden ? 'none' : `blur(${Math.abs(d) === 1 ? 2.2 : 3.6}px)`,
                  zIndex: 10 - Math.abs(d) * 2,
                  pointerEvents: hidden ? 'none' : 'auto',
                  transition: jumped[i] ? 'none' : undefined,
                }}
              >
                <img src={`/symptoms/${item.id}.webp`} alt="" decoding="async" draggable={false} />
                <span className="sc-shade" aria-hidden="true" />
                <span className="sc-info">
                  <span className="sc-icon" style={{ background: item.gradient, color: item.accentColor }}>{item.icon}</span>
                  <span className="sc-text">
                    <span className="sc-title">{item.title}</span>
                    <span className="sc-sub">{item.subtitle}</span>
                  </span>
                  <span className="sc-go" aria-hidden="true"><Arrow dir="right" /></span>
                </span>
              </a>
            );
          })}
        </div>
        <p className="sr-only" aria-live="polite">{SYMPTOMS[active].title}, {active + 1} de {count}</p>
      </div>
    </section>
  );
};
