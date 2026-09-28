import React, { useEffect, useRef } from 'react';
import { scrollState } from '../store';

const CARDS = [
  { title: "CORPO TEMIDO",     quote: "\u201cHá algo errado comigo.\u201d" },
  { title: "CORPO OBSERVADO",  quote: "\u201cPercebo o que acontece.\u201d" },
  { title: "CORPO SENTIDO",    quote: "\u201cConsigo permanecer com a experiência.\u201d" },
  { title: "CORPO REGULADO",   quote: "\u201cPosso aproximar e afastar sem me perder.\u201d" },
  { title: "CORPO SIMBÓLICO",  quote: "\u201cUma imagem começa a nascer.\u201d" },
  { title: "CORPO HISTÓRICO",  quote: "\u201cReconheço como aprendi a reagir.\u201d" },
  { title: "CORPO AUTORAL",    quote: "\u201cPosso escolher outra resposta.\u201d" },
  { title: "CORPO ENCARNADO",  quote: "\u201cMinha nova consciência tornou-se gesto, postura, limite e vida.\u201d" },
  { title: "CORPO HABITADO",   quote: null, highlight: true },
];

function lerpRGB(c1: [number, number, number], c2: [number, number, number], t: number): [number, number, number] {
  return [
    Math.round(c1[0] + (c2[0] - c1[0]) * t),
    Math.round(c1[1] + (c2[1] - c1[1]) * t),
    Math.round(c1[2] + (c2[2] - c1[2]) * t),
  ];
}

export const TrajectorySection: React.FC = () => {
  const bubbleRef = useRef<HTMLDivElement>(null);
  const auraRef   = useRef<HTMLDivElement>(null);
  const rafRef    = useRef<number>(0);

  useEffect(() => {
    const bubble = bubbleRef.current;
    const aura   = auraRef.current;
    if (!bubble || !aura) return;

    const update = () => {
      const p = Math.max(0, Math.min(1, scrollState.scene4Progress));

      // ─── Interpolação cromática volumétrica estilo Motion Graphic ───
      // Fase 1 (p=0.0): Vermelho vivo / Laranja Quente / Violeta (Corpo Temido - foto de referência)
      // Fase 2 (p=0.5): Azul Elétrico / Ciano / Índigo (Corpo Regulado)
      // Fase 3 (p=1.0): Verde Aqua / Dourado / Petróleo do site (Corpo Habitado)
      let cLight: [number, number, number];
      let cCore: [number, number, number];
      let cShadow: [number, number, number];
      let glowR: number, glowG: number, glowB: number;

      if (p < 0.5) {
        const t = p / 0.5;
        cLight  = lerpRGB([255, 145, 55], [60, 210, 255], t);
        cCore   = lerpRGB([240, 42, 50],  [30, 95, 235],  t);
        cShadow = lerpRGB([120, 18, 115], [45, 12, 105],  t);
        const glow = lerpRGB([240, 45, 45], [30, 100, 240], t);
        [glowR, glowG, glowB] = glow;
      } else {
        const t = (p - 0.5) / 0.5;
        cLight  = lerpRGB([60, 210, 255], [225, 195, 120], t);
        cCore   = lerpRGB([30, 95, 235],  [83, 183, 174],  t);
        cShadow = lerpRGB([45, 12, 105],  [22, 63, 73],    t);
        const glow = lerpRGB([30, 100, 240], [83, 183, 174], t);
        [glowR, glowG, glowB] = glow;
      }

      // Tamanho: presente e visível desde o 1º card (340px) até o último (540px)
      const size = 340 + p * 200;
      const auraSize = size * 1.35;

      bubble.style.width  = `${size}px`;
      bubble.style.height = `${size}px`;
      aura.style.width    = `${auraSize}px`;
      aura.style.height   = `${auraSize}px`;

      // Suave e translúcida para facilitar a leitura dos textos e cards
      bubble.style.opacity = '0.58';
      aura.style.opacity   = '0.65';

      // Gradiente esférico 3D volumétrico com iluminação assimétrica e transparência elegante
      bubble.style.background = `
        radial-gradient(
          circle at 38% 35%,
          rgba(${cLight.join(',')}, 0.95) 0%,
          rgba(${cCore.join(',')}, 0.85) 42%,
          rgba(${cShadow.join(',')}, 0.75) 85%,
          rgba(${cShadow.join(',')}, 0.45) 100%
        )
      `;

      // Sombra volumétrica interna esférica + glow de borda suave
      bubble.style.boxShadow = `
        inset -25px -25px 50px rgba(${cShadow.join(',')}, 0.6),
        inset 20px 20px 40px rgba(${cLight.join(',')}, 0.55),
        0 0 70px rgba(${glowR}, ${glowG}, ${glowB}, 0.35),
        0 0 120px rgba(${glowR}, ${glowG}, ${glowB}, 0.18)
      `;

      // Aura ambiente suave no fundo
      aura.style.background = `
        radial-gradient(
          circle at 50% 50%,
          rgba(${glowR}, ${glowG}, ${glowB}, 0.35) 0%,
          rgba(${glowR}, ${glowG}, ${glowB}, 0.12) 55%,
          transparent 75%
        )
      `;

      rafRef.current = requestAnimationFrame(update);
    };

    rafRef.current = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <section
      className="scene w-full min-h-screen flex flex-col justify-center items-center py-24 relative overflow-hidden bg-[#F8F7F3]"
      id="scene-4"
    >
      {/* ── Bubble Motion Graphic Volumétrico Centralizado ── */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0 flex items-center justify-center"
        aria-hidden="true"
      >
        {/* Camada 1: Aura difusa expansiva */}
        <div
          ref={auraRef}
          style={{
            position: 'absolute',
            borderRadius: '50%',
            filter: 'blur(65px)',
            pointerEvents: 'none',
            willChange: 'width, height, background',
            transition: 'width 0.3s ease, height 0.3s ease',
          }}
        />

        {/* Camada 2: Esfera 3D Motion Graphic com blur suave e pulso orgânico */}
        <div
          ref={bubbleRef}
          className="bubble-motion-sphere"
          style={{
            position: 'absolute',
            borderRadius: '50%',
            pointerEvents: 'none',
            willChange: 'width, height, background, box-shadow, transform',
            transition: 'width 0.3s ease, height 0.3s ease',
            filter: 'blur(26px)', // blur suave que preserva a leitura dos textos e cards
          }}
        />
      </div>

      <style>{`
        @keyframes bubbleMotionPulse {
          0% {
            transform: scale(0.97);
          }
          50% {
            transform: scale(1.05);
          }
          100% {
            transform: scale(0.97);
          }
        }
        .bubble-motion-sphere {
          animation: bubbleMotionPulse 3.8s ease-in-out infinite alternate;
        }
      `}</style>

      <h2 className="animate-up font-playfair text-4xl md:text-5xl lg:text-6xl text-[#163f49] mt-2 mb-10 text-center w-full relative z-10">
        A Grande Trajetória
      </h2>

      {/* GSAP Moving Track Container with Fade Edges */}
      <div
        className="w-full overflow-hidden relative z-10"
        style={{
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 80%, transparent 100%)',
          maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 80%, transparent 100%)'
        }}
      >
        <div id="trajectory-track" className="relative flex items-stretch pb-12 pt-4 w-max px-[15vw] md:px-[25vw] gap-0">
          {CARDS.map((item, idx, arr) => (
            <div key={item.title} className="snap-center shrink-0 w-[280px] md:w-[320px] px-3 flex flex-col items-center">

              {/* Card */}
              <div
                className="w-full h-[160px] p-5 flex flex-col justify-center items-center text-center rounded-2xl border border-white/60 shadow-sm transition-transform hover:-translate-y-1 relative"
                style={{
                  background: item.highlight ? '#163f49' : 'rgba(251, 247, 237, 0.5)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)'
                }}
              >
                {item.highlight ? (
                  <>
                    <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full flex items-center justify-center animate-pulse" style={{ background: '#d7b36c', color: '#163f49' }}>
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                    </div>
                    <strong className="tracking-widest text-sm font-bold text-[#fbf7ed] uppercase font-inter">
                      {item.title}
                    </strong>
                    <div className="mt-3 text-[#d7b36c] text-xs max-w-[80%] opacity-90 uppercase tracking-[0.2em] font-semibold">
                      Integração Plena
                    </div>
                  </>
                ) : (
                  <>
                    <strong className="tracking-widest text-xs font-bold text-[#163f49] uppercase font-inter">
                      {item.title}
                    </strong>
                    {item.quote && (
                      <span className="text-[12.5px] text-[#28616a] font-playfair italic mt-3 leading-snug px-5">
                        {item.quote}
                      </span>
                    )}
                  </>
                )}
              </div>

              {/* Timeline Line & Dot */}
              <div className="w-full mt-6 flex items-center opacity-70">
                <div className="flex-1 h-[2px]" style={{ background: idx === 0 ? 'transparent' : '#53b7ae' }}></div>
                <div className="w-4 h-4 rounded-full shadow-sm shrink-0 transition-colors duration-500" style={{ background: item.highlight ? '#d7b36c' : '#53b7ae' }}></div>
                <div className="flex-1 h-[2px]" style={{ background: idx === arr.length - 1 ? 'transparent' : '#53b7ae' }}></div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
