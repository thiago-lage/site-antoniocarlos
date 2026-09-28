import React, { useEffect, useRef, useState } from 'react';

/**
 * HeroSection â€” composiÃ§Ã£o em camadas 2D puramente estÃ¡tica e leve
 *
 * Parallax: rAF + lerp 0.08 | somente transform/opacity
 */

const LERP = 0.08;
const AMP  = { bg: 12, person: 20, fgR: 45, fgL: 55 } as const;

interface Layer { el: HTMLElement; amp: number; cx: number; cy: number }

export const HeroSection: React.FC = () => {
  const bgRef     = useRef<HTMLDivElement>(null);
  const personRef = useRef<HTMLDivElement>(null);
  const fgRRef    = useRef<HTMLDivElement>(null);
  const fgLRef    = useRef<HTMLDivElement>(null);
  const rafRef    = useRef<number>(0);
  const mouse     = useRef({ nx: 0, ny: 0 });
  const layersRef = useRef<Layer[]>([]);
  
  const [isMobileState, setIsMobileState] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileState(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    layersRef.current = [
      { el: bgRef.current!,     amp: AMP.bg,     cx: 0, cy: 0 },
      { el: personRef.current!, amp: AMP.person,  cx: 0, cy: 0 },
      { el: fgRRef.current!,    amp: AMP.fgR,     cx: 0, cy: 0 },
      { el: fgLRef.current!,    amp: AMP.fgL,     cx: 0, cy: 0 },
    ].filter(l => Boolean(l.el));

    const onMove = (e: MouseEvent) => {
      mouse.current = {
        nx: (e.clientX / window.innerWidth  - 0.5) * 2,
        ny: (e.clientY / window.innerHeight - 0.5) * 2,
      };
    };

    const tick = () => {
      const { nx, ny } = mouse.current;
      for (const l of layersRef.current) {
        const tx = nx * l.amp;
        const ty = ny * l.amp * 0.6;
        l.cx += (tx - l.cx) * LERP;
        l.cy += (ty - l.cy) * LERP;
        l.el.style.transform = `translate3d(${l.cx.toFixed(2)}px,${l.cy.toFixed(2)}px,0)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    if (!isMobileState) {
      window.addEventListener('mousemove', onMove, { passive: true });
      rafRef.current = requestAnimationFrame(tick);
    }

    const onVis = () => {
      if (document.hidden) cancelAnimationFrame(rafRef.current);
      else if (!isMobileState) rafRef.current = requestAnimationFrame(tick);
    };
    document.addEventListener('visibilitychange', onVis);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, [isMobileState]);

  return (
    <section
      id="scene-1"
      className="scene hero-root"
      aria-label="ApresentaÃ§Ã£o do Dr. AntÃ´nio Carlos"
    >
      {/* â”€â”€ 0: Efeito de Sol Lens Flare â”€â”€ */}
      <div className="sun-flare" />

      {/* â”€â”€ 1: Background â”€â”€ */}
      <div ref={bgRef} className="h-layer h-bg" aria-hidden="true" style={{ willChange: 'transform' }}>
        <img
          src="/background.png" alt=""
          className="h-bg-img"
          loading="eager" decoding="async" aria-hidden="true"
        />
      </div>

      {/* â”€â”€ 2: Homem + Poltrona â”€â”€ */}
      <div 
        ref={personRef} 
        className="h-layer h-person" 
        aria-hidden="true" 
        style={{ willChange: 'transform' }}
      >
        {isMobileState ? (
          <img src="/drAntonioCarlos.png" alt="" className="h-person-media h-person-static" loading="eager" />
        ) : (
          <img src="/antonio-carlos.png" alt="" className="h-person-media h-person-static" loading="eager" />
        )}
      </div>

      {/* â”€â”€ 3: Foliagem Direita Animada (Sway) â”€â”€ */}
      <div ref={fgRRef} className="h-layer h-fg-right" aria-hidden="true" style={{ willChange: 'transform' }}>
        <img src="/05-folhagem-direita-layer.png" className="sway-1 w-full h-full object-cover" alt="" loading="lazy" decoding="async" aria-hidden="true" />
      </div>

      {/* â”€â”€ 4: Foliagem Esquerda Animada (Sway) â”€â”€ */}
      <div ref={fgLRef} className="h-layer h-fg-left" aria-hidden="true" style={{ willChange: 'transform' }}>
        <img src="/04-folhagem-esquerda-layer.png" className="sway-2 w-full h-full object-cover" alt="" loading="lazy" decoding="async" aria-hidden="true" />
      </div>

      {/* â”€â”€ 5: Gradiente de contraste â”€â”€ */}
      <div className="h-gradient" aria-hidden="true" />

      {/* â”€â”€ 6: ConteÃºdo â”€â”€ */}
      <div className="h-content">
        <p className="h-credentials animate-up text-[#EED7A0] tracking-wider text-[11px] md:text-xs uppercase font-bold mb-4">
          Dr. Antônio Carlos • Médico CRM-3916 • Homeopatia RQE-3783
        </p>
        <div className="h-divider animate-up delay-1" aria-hidden="true" />
        <h1 className="h-title animate-up delay-1">
          Sou mÃ©dico e<br />
          <em>psicoterapeuta</em>
        </h1>
        <p className="h-body animate-up delay-2">
          "Ajudo vocÃª a compreender como corpo, emoÃ§Ãµes e histÃ³ria se unem na sua forma de viver e adoecer. Meu objetivo Ã© despertar sua autoridade interior para uma vida mais plena e consciente."
        </p>
        <div className="h-cta-row animate-up delay-3">
          <a
            href="https://wa.me/5527998644435?text=Ol%C3%A1%2C%20gostaria%20de%20falar%20com%20a%20secret%C3%A1ria%20do%20Dr.%20Ant%C3%B4nio%20Carlos%20para%20agendar%20uma%20consulta."
            target="_blank"
            rel="noopener noreferrer"
            className="h-cta"
          >
            Agendar Consulta
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true" width="14" height="14">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
          <div className="h-social" aria-label="Redes sociais">
            <span className="h-social-sep" aria-hidden="true" />
            <a href="https://www.instagram.com/drantoniocarloslage/" target="_blank" rel="noopener noreferrer"
               aria-label="Instagram do Dr. AntÃ´nio Carlos" className="h-social-link">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} width="18" height="18" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
            <a href="https://open.spotify.com/track/6kkwzB6hXLIONkEk9JciA6" target="_blank" rel="noopener noreferrer"
               aria-label="Spotify do Dr. AntÃ´nio Carlos" className="h-social-link">
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.36-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.24 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.62 18.66 12.84c.361.181.54.78.301 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.6.18-1.2.72-1.38 4.26-1.26 11.28-1.02 15.72 1.621.539.3.719 1.02.419 1.56-.239.54-.959.72-1.559.3z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <style>{`
        /* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
           Hero â€” base (desktop first)
        â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
        .hero-root {
          position: relative;
          overflow: hidden;
          isolation: isolate;
          min-height: 100svh;
          min-height: 100dvh;
          display: flex;
          align-items: center;
          background: #2a5260;
          padding-top: env(safe-area-inset-top);
          padding-bottom: env(safe-area-inset-bottom);
          overflow-x: hidden;
        }

        /* AnimaÃ§Ãµes (Vento, Fade-in, Sol) */
        @keyframes sway {
          0%, 100% { transform: rotate(0deg) translate(0, 0); }
          25% { transform: rotate(1deg) translate(2px, 1px); }
          50% { transform: rotate(-0.5deg) translate(-1px, 0); }
          75% { transform: rotate(1.5deg) translate(1px, -1px); }
        }
        @keyframes fadeUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulseFlare {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 0.9; transform: scale(1.05); }
        }

        .sway-1 { transform-origin: bottom right; animation: sway 8s ease-in-out infinite; }
        .sway-2 { transform-origin: bottom left; animation: sway 11s ease-in-out infinite reverse; }
        
        .animate-up {
          opacity: 0;
          animation: fadeUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .delay-1 { animation-delay: 0.2s; }
        .delay-2 { animation-delay: 0.4s; }
        .delay-3 { animation-delay: 0.6s; }

        .sun-flare {
          position: absolute;
          top: -10%; left: -10%;
          width: 70vmin; height: 70vmin;
          background: radial-gradient(circle, rgba(255, 245, 215, 0.45) 0%, rgba(255, 245, 215, 0.1) 40%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
          z-index: 2;
          animation: pulseFlare 6s ease-in-out infinite;
          mix-blend-mode: screen;
        }

        /* Shared layer base */
        .h-layer {
          position: absolute;
          inset: 0;
          pointer-events: none;
          user-select: none;
        }

        /* 1 â€” Background */
        .h-bg { z-index: 1; }
        .h-bg-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          display: block;
          scale: 1.04; 
        }

        /* 2 â€” Homem + poltrona */
        .h-person { z-index: 3; }
        .h-person-media {
          position: absolute;
          bottom: -5%;
          left: -10%;
          height: 115%;
          width: auto;
          max-width: 150vw; /* Remove restriÃ§Ãµes laterais que encolhem vÃ­deos 16:9 */
          object-fit: contain;
          object-position: bottom left;
          display: block;
          filter: drop-shadow(0 20px 40px rgba(0,0,0,0.3));
        }

        /* 3 â€” Foliagem direita */
        .h-fg-right {
          z-index: 4;
          inset: auto;
          bottom: 0; right: 0;
          width: 32%; height: 60%;
        }
        .h-fg-right img {
          width: 100%; height: 100%;
          object-fit: contain;
          object-position: bottom right;
          display: block;
        }

        /* 4 â€” Foliagem esquerda */
        .h-fg-left {
          z-index: 5;
          inset: auto;
          bottom: 0; left: 0;
          width: 28%; height: 55%;
        }
        .h-fg-left img {
          width: 100%; height: 100%;
          object-fit: contain;
          object-position: bottom left;
          display: block;
        }

        /* 5 â€” Gradiente de contraste */
        .h-gradient {
          position: absolute;
          inset: 0;
          z-index: 6;
          pointer-events: none;
          background: linear-gradient(
            to right,
            rgba(32,62,70,0.05) 0%,
            rgba(32,62,70,0.45) 40%,
            rgba(32,62,70,0.85) 100%
          );
        }

        /* 6 â€” ConteÃºdo */
        .h-content {
          position: relative;
          z-index: 10;
          margin-left: auto;
          width: 100%;
          max-width: 540px;
          padding-right: clamp(2rem, 8vw, 6rem);
          padding-left: 1rem;
          pointer-events: auto; /* IMPORTANTE: Permite interagir com os botÃµes */
        }

        .h-eyebrow {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #F4F1E8;
          margin: 0 0 0.4rem;
        }
        .h-credentials {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 11px;
          letter-spacing: 0.06em;
          color: rgba(244,241,232,0.7);
          margin: 0 0 1.5rem;
          line-height: 1.7;
        }
        .h-divider {
          width: 3rem;
          height: 1px;
          background: rgba(238,215,160,0.6);
          margin-bottom: 1.5rem;
        }
        .h-title {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(2rem, 3.8vw, 3.2rem);
          font-weight: 500;
          line-height: 1.1;
          color: #F4F1E8;
          margin: 0 0 1.2rem;
        }
        .h-title em {
          font-style: italic;
          color: #EED7A0;
        }
        .h-body {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: clamp(0.85rem, 1.2vw, 0.95rem);
          line-height: 1.8;
          color: rgba(244,241,232,0.85);
          max-width: 44ch;
          margin: 0 0 2.2rem;
        }

        /* CTA */
        .h-cta-row {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          flex-wrap: wrap;
        }
        .h-cta {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          min-height: 48px;
          padding: 0.75rem 2rem;
          background: #EED7A0;
          color: #163f49;
          border-radius: 999px;
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          text-decoration: none;
          transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.3s ease, background-color 0.3s ease;
          box-shadow: 0 4px 20px rgba(238,215,160,0.25);
        }
        .h-cta:hover { transform: translateY(-3px) scale(1.02); box-shadow: 0 8px 30px rgba(238,215,160,0.45); background: #fbf7ed; }
        .h-cta:focus-visible { outline: 2px solid #EED7A0; outline-offset: 3px; }

        /* Social */
        .h-social {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .h-social-sep {
          display: inline-block;
          width: 1px;
          height: 1.5rem;
          background: rgba(244,241,232,0.3);
        }
        .h-social-link {
          color: rgba(244,241,232,0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 44px;
          min-height: 44px;
          text-decoration: none;
          transition: color 0.3s, transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .h-social-link:hover { color: #EED7A0; transform: translateY(-3px) scale(1.15); }
        .h-social-link:focus-visible { outline: 2px solid #EED7A0; border-radius: 4px; }

        /* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
           MOBILE  320â€“767px
           Layout: conteÃºdo no topo / Avatar circular no MOBILE
        â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
        @media (max-width: 767px) {
          .hero-root {
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;
          }

          /* Avatar circular para Mobile */
          .h-person {
            position: relative !important;
            inset: auto !important;
            width: 150px !important; /* Rosto reduzido conforme solicitado */
            height: 150px !important;
            margin-top: calc(env(safe-area-inset-top) + 2rem);
            margin-bottom: 1rem;
            border-radius: 50%;
            overflow: hidden;
            border: 3px solid rgba(238,215,160,0.5);
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            flex-shrink: 0;
            z-index: 10;
          }
          .h-person-media {
            position: absolute !important;
            inset: 0 !important;
            width: 100% !important;
            height: 100% !important;
            max-width: none !important;
            object-fit: cover !important;
            object-position: top center !important;
            /* Zoom ajustado */
            transform: scale(1.4) translateY(5%) !important;
            filter: none !important;
          }

          /* Foliages hidden on mobile */
          .h-fg-right, .h-fg-left { display: none !important; }

          /* Content */
          .h-content {
            margin-left: 0;
            max-width: 100%;
            padding: 0 2.5rem 0rem; /* EspaÃ§o extra nas laterais para nÃ£o encostar nos dots */
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          .h-title { font-size: clamp(1.8rem, 8vw, 2.4rem); margin-bottom: 0.5rem; }
          .h-body { font-size: 0.85rem; margin-bottom: 1.5rem; max-width: 100%; line-height: 1.6; }
          .h-divider { margin-left: auto; margin-right: auto; margin-bottom: 0.75rem; }

          /* Gradient: full elegant cover */
          .h-gradient {
            background: linear-gradient(
              to bottom,
              rgba(32,62,70,0.4) 0%,
              rgba(32,62,70,0.85) 40%,
              rgba(32,62,70,0.95) 100%
            ) !important;
          }

          /* CTA row */
          .h-cta-row {
            flex-direction: column;
            align-items: center;
            gap: 1.25rem;
            margin-bottom: 12rem; /* Sobe o botÃ£o ainda mais */
          }
          .h-social { display: none !important; } /* Esconde redes sociais no mobile */
          .h-social-sep { display: none; }
        }

        /* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
           TABLET  768â€“1023px
        â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
        @media (min-width: 768px) and (max-width: 1023px) {
          .h-person-media { max-width: 60% !important; left: -5%; }
          .h-content { padding-right: clamp(1.5rem, 4vw, 3rem); }
        }

        /* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
           prefers-reduced-motion
        â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
        @media (prefers-reduced-motion: reduce) {
          .h-layer { will-change: auto !important; transform: none !important; }
          .sway-1, .sway-2, .animate-up, .sun-flare { animation: none !important; opacity: 1 !important; transform: none !important; }
        }
      `}</style>
    </section>
  );
};

