import React, { useEffect, useRef, useState } from 'react';

/**
 * HeroSection — composição em camadas 2D com parallax de mouse (desktop)
 *
 * Camadas:
 *   1 (fundo)  → background.png    amp: 8px
 *   2 (meio)   → dr-antonio-carlos.png  amp: 20px
 *   3 (frente) → folhagens.png     amp: 38px
 *
 * Mobile: sem parallax, exibe avatar.png circular centralizado.
 * Parallax: rAF + lerp suave apenas no eixo X (esquerda/direita predominante)
 */

const LERP = 0.07;

// Amplitude do deslocamento por camada (px)
const AMP = { bg: 8, person: 20, fg: 38 } as const;

interface Layer { el: HTMLElement; ampX: number; ampY: number; cx: number; cy: number }

/** Configuração de cada folha: posição X (%), delay (s), duração (s), tamanho (px), rotação inicial (deg), cor */
const LEAVES: Array<{ x: number; delay: number; dur: number; size: number; rot: number; color: string }> = [
  // — Grandes —
  { x: 8,  delay: 0,    dur: 18, size: 40, rot: -20, color: 'rgba(63,140,120,0.28)' },
  { x: 30, delay: 5,    dur: 20, size: 36, rot: -10, color: 'rgba(82,183,160,0.22)' },
  { x: 72, delay: 2,    dur: 22, size: 42, rot:  25, color: 'rgba(63,140,120,0.25)' },
  { x: 88, delay: 9,    dur: 19, size: 38, rot: -30, color: 'rgba(82,183,160,0.20)' },
  { x: 50, delay: 14,   dur: 21, size: 34, rot:  15, color: 'rgba(63,140,120,0.24)' },

  // — Médias —
  { x: 18, delay: 2.5,  dur: 14, size: 20, rot:  30, color: 'rgba(82,183,160,0.42)' },
  { x: 42, delay: 1,    dur: 13, size: 22, rot:  50, color: 'rgba(99,200,170,0.38)' },
  { x: 60, delay: 7,    dur: 15, size: 18, rot: -35, color: 'rgba(63,140,120,0.40)' },
  { x: 80, delay: 3.5,  dur: 12, size: 24, rot:  15, color: 'rgba(82,183,160,0.36)' },
  { x: 25, delay: 11,   dur: 16, size: 19, rot: -15, color: 'rgba(99,200,170,0.44)' },
  { x: 65, delay: 6,    dur: 14, size: 21, rot:  40, color: 'rgba(82,183,160,0.38)' },
  { x: 38, delay: 8,    dur: 17, size: 17, rot: -45, color: 'rgba(63,140,120,0.35)' },

  // — Pequenas —
  { x: 12, delay: 4,    dur: 11, size: 9,  rot:  60, color: 'rgba(99,200,170,0.55)' },
  { x: 48, delay: 0.5,  dur: 10, size: 7,  rot: -55, color: 'rgba(82,183,160,0.60)' },
  { x: 75, delay: 9,    dur: 12, size: 10, rot:  10, color: 'rgba(63,140,120,0.52)' },
  { x: 90, delay: 13,   dur: 11, size: 8,  rot: -40, color: 'rgba(99,200,170,0.50)' },
  { x: 55, delay: 3,    dur: 9,  size: 6,  rot:  70, color: 'rgba(82,183,160,0.58)' },
  { x: 22, delay: 16,   dur: 10, size: 11, rot: -25, color: 'rgba(63,140,120,0.48)' },

  // — Minúsculas —
  { x: 35, delay: 6.5,  dur: 8,  size: 5,  rot:  45, color: 'rgba(99,200,170,0.65)' },
  { x: 68, delay: 1.5,  dur: 9,  size: 5,  rot: -60, color: 'rgba(82,183,160,0.62)' },
  { x: 82, delay: 12,   dur: 8,  size: 6,  rot:  30, color: 'rgba(63,140,120,0.58)' },
  { x: 5,  delay: 7.5,  dur: 10, size: 5,  rot: -35, color: 'rgba(99,200,170,0.60)' },
];

export const HeroSection: React.FC = () => {
  const bgRef     = useRef<HTMLDivElement>(null);
  const personRef = useRef<HTMLDivElement>(null);
  const rafRef    = useRef<number>(0);
  const mouse     = useRef({ nx: 0, ny: 0 });
  const layersRef = useRef<Layer[]>([]);

  const [isMobile, setIsMobile] = useState(false);

  // Detecta mobile (apenas para renderização condicional do avatar)
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Parallax — roda uma única vez no mount, checa mobile inline no tick
  useEffect(() => {
    // Forçando parallax independente das configs de redução de movimento do SO

    // Aguarda o próximo frame para garantir que os refs estejam no DOM
    const initId = requestAnimationFrame(() => {
      layersRef.current = [
        bgRef.current     ? { el: bgRef.current,     ampX: AMP.bg,     ampY: AMP.bg * 0.4,     cx: 0, cy: 0 } : null,
        personRef.current ? { el: personRef.current,  ampX: AMP.person, ampY: AMP.person * 0.4,  cx: 0, cy: 0 } : null,
      ].filter(Boolean) as Layer[];
    });

    const onMove = (e: MouseEvent) => {
      if (window.innerWidth < 768) return;
      mouse.current = {
        nx: (e.clientX / window.innerWidth  - 0.5) * 2, // -1 … +1
        ny: (e.clientY / window.innerHeight - 0.5) * 2,
      };
    };

    const tick = () => {
      if (window.innerWidth >= 768) {
        const { nx, ny } = mouse.current;
        for (const l of layersRef.current) {
          // Direção oposta ao mouse → efeito janela (parallax de profundidade)
          const tx = -nx * l.ampX;
          const ty = -ny * l.ampY;
          l.cx += (tx - l.cx) * LERP;
          l.cy += (ty - l.cy) * LERP;
          l.el.style.transform = `translate3d(${l.cx.toFixed(2)}px,${l.cy.toFixed(2)}px,0)`;
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    rafRef.current = requestAnimationFrame(tick);

    const onVis = () => {
      if (document.hidden) cancelAnimationFrame(rafRef.current);
      else rafRef.current = requestAnimationFrame(tick);
    };
    document.addEventListener('visibilitychange', onVis);

    return () => {
      cancelAnimationFrame(initId);
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, []); // ← deps vazio: inicializa uma única vez, sem re-runs

  return (
    <section
      id="scene-1"
      className="scene hero-root"
      aria-label="Apresentação do Dr. Antônio Carlos"
    >
      {/* ── Camada 1: Background (fundo) ── */}
      <div ref={bgRef} className="h-layer h-bg" aria-hidden="true" style={{ willChange: 'transform' }}>
        <img
          src="/background.png" alt=""
          className="h-bg-img"
          loading="eager" decoding="async" aria-hidden="true"
        />
      </div>

      {/* ── Camada 1.5: Folhas caindo (apenas desktop, atrás da pessoa) ── */}
      {!isMobile && (
        <div className="h-layer h-leaves" aria-hidden="true">
          {LEAVES.map((leaf, i) => (
            <span
              key={i}
              className="leaf-item"
              style={{
                left: `${leaf.x}%`,
                animationDelay: `${leaf.delay}s`,
                animationDuration: `${leaf.dur}s`,
                color: leaf.color,
                fontSize: `${leaf.size}px`,
                '--rot': `${leaf.rot}deg`,
              } as React.CSSProperties}
            >
              {/* Folha SVG orgânica */}
              <svg viewBox="0 0 24 24" fill="currentColor" width={leaf.size} height={leaf.size}>
                <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 2-5 8z"/>
              </svg>
            </span>
          ))}
        </div>
      )}

      {/* ── Camada 2: Dr. Antônio Carlos (meio) — desktop | avatar circular — mobile ── */}
      <div
        ref={personRef}
        className="h-layer h-person"
        aria-hidden="true"
        style={isMobile ? undefined : { willChange: 'transform' }}
      >
        {isMobile ? (
          <img
            src="/avatar.png"
            alt=""
            className="h-person-media"
            loading="eager"
          />
        ) : (
          <img
            src="/dr-antonio-carlos.png"
            alt=""
            className="h-person-media"
            loading="eager"
          />
        )}
      </div>

      {/* ── Camada 3: Foliagens (frente) com balanço de vento elegante — apenas desktop ── */}
      {!isMobile && (
        <div className="h-layer h-fg" aria-hidden="true">
          <img
            src="/folhagens.png"
            className="h-fg-img"
            alt="" loading="lazy" decoding="async" aria-hidden="true"
          />
        </div>
      )}

      {/* Gradiente de contraste */}
      <div className="h-gradient" aria-hidden="true" />

      {/* ── Conteúdo ── */}
      <div className="h-content">
        <p className="h-credentials animate-up text-[#EED7A0] tracking-wider text-[11px] md:text-xs uppercase font-bold mb-4">
          DR. ANTÔNIO CARLOS<br />
          <span className="font-medium text-white/80 normal-case tracking-normal">
            Médico CRM-3916 • Homeopatia RQE - 3783<br />Saúde Mental, Corpo e Sistema
          </span>
        </p>
        <div className="h-divider animate-up delay-1" aria-hidden="true" />
        <h1 className="h-title animate-up delay-1">
          Diagnóstico detalhado<br />
          <em>do seu corpo</em>
        </h1>
        <p className="h-body animate-up delay-2">
          "Trabalho ajudando pessoas a compreender como o corpo, as emoções, a história e os vínculos participam da forma como elas vivem e adoecem. Meu trabalho é ajudá-las a ampliar a consciência, recuperar a autoridade interior e encontrar maneiras mais inteiras de viver."
        </p>
        <div className="h-cta-row animate-up delay-3">
          <a
            href="https://wa.me/5527998644435?text=Ol%C3%A1%2C%20gostaria%20de%20agendar%20uma%20consulta%20com%20Dr.%20Ant%C3%B4nio%20Carlos."
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
               aria-label="Instagram do Dr. Antônio Carlos" className="h-social-link">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} width="22" height="22" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
            <a href="https://open.spotify.com/track/6kkwzB6hXLIONkEk9JciA6" target="_blank" rel="noopener noreferrer"
               aria-label="Spotify do Dr. Antônio Carlos" className="h-social-link">
              <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22" aria-hidden="true">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.36-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.24 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.62 18.66 12.84c.361.181.54.78.301 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.6.18-1.2.72-1.38 4.26-1.26 11.28-1.02 15.72 1.621.539.3.719 1.02.419 1.56-.239.54-.959.72-1.559.3z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <style>{`
        /* ══════════════════════════════════════════════
           Hero — base (desktop first)
        ══════════════════════════════════════════════ */
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
        }

        /* Pseudo-elemento para balancear o layout em monitores ultrawide */
        .hero-root::before {
          content: "";
          flex: 0 0 45vw;
        }

        /* Animações de entrada */
        @keyframes fadeUp {
          0%   { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-up {
          opacity: 0;
          animation: fadeUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .delay-1 { animation-delay: 0.2s; }
        .delay-2 { animation-delay: 0.4s; }
        .delay-3 { animation-delay: 0.6s; }

        /* ── Camadas base ── */
        .h-layer {
          position: absolute;
          inset: 0;
          pointer-events: none;
          user-select: none;
        }

        /* Camada 1 – Background */
        .h-bg { z-index: 1; }
        .h-bg-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          display: block;
          /* extra margin para o parallax não mostrar bordas */
          scale: 1.06;
        }

        /* Camada 1.5 – Folhas caindo */
        .h-leaves { z-index: 2; overflow: hidden; }

        @keyframes leafFall {
          0% {
            transform: translateX(0)      translateY(-80px)   rotate(var(--rot));
            opacity: 0;
          }
          6% { opacity: 1; }
          /* Sway suave: 3 pontos de oscilação lateral enquanto cai */
          30% {
            transform: translateX(-40px)  translateY(30vh)    rotate(calc(var(--rot) + 90deg));
          }
          60% {
            transform: translateX(20px)   translateY(62vh)    rotate(calc(var(--rot) + 200deg));
          }
          90% { opacity: 0.6; }
          100% {
            transform: translateX(-60px)  translateY(110vh)   rotate(calc(var(--rot) + 340deg));
            opacity: 0;
          }
        }

        .leaf-item {
          position: absolute;
          top: -60px;
          display: block;
          animation-name: leafFall;
          animation-timing-function: cubic-bezier(0.42, 0, 0.58, 1);
          animation-iteration-count: infinite;
          animation-fill-mode: both;
          will-change: transform, opacity;
          pointer-events: none;
          user-select: none;
          filter: blur(0.4px);
        }

        /* Camada 2 – Pessoa */
        .h-person { z-index: 3; }
        .h-person-media {
          position: absolute;
          bottom: -5%;
          left: -10%;
          height: 115%;
          width: auto;
          max-width: 150vw;
          object-fit: contain;
          object-position: bottom left;
          display: block;
          filter: drop-shadow(0 20px 40px rgba(0,0,0,0.3));
          /* extra margin para o parallax não mostrar bordas */
          scale: 1.06;
        }

        /* Camada 3 – Foliagens com balanço de vento sutil e sem vazamento */
        .h-fg {
          z-index: 5;
          overflow: hidden;
          pointer-events: none;
        }

        @keyframes foliageWind {
          0% {
            transform: scale(1.14) rotate(0deg) translate3d(0, 0, 0);
          }
          25% {
            transform: scale(1.145) rotate(0.5deg) translate3d(4px, 1px, 0);
          }
          50% {
            transform: scale(1.14) rotate(-0.35deg) translate3d(-3px, 2px, 0);
          }
          75% {
            transform: scale(1.145) rotate(0.6deg) translate3d(5px, 0px, 0);
          }
          100% {
            transform: scale(1.14) rotate(0deg) translate3d(0, 0, 0);
          }
        }

        .h-fg-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          display: block;
          pointer-events: none;
          transform-origin: center center;
          animation: foliageWind 11s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          will-change: transform;
        }

        /* Gradiente de contraste (entre pessoas e conteúdo) */
        .h-gradient {
          position: absolute;
          inset: 0;
          z-index: 6;
          pointer-events: none;
          background: linear-gradient(
            to right,
            rgba(32,62,70,0.0)  0%,
            rgba(32,62,70,0.45) 42%,
            rgba(32,62,70,0.88) 100%
          );
        }

        /* Conteúdo */
        .h-content {
          position: relative;
          z-index: 10;
          margin: 0 auto;
          width: 100%;
          max-width: 600px;
          padding: 0 2rem;
          pointer-events: auto;
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
        .h-title em { font-style: italic; color: #EED7A0; }
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
          transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275),
                      box-shadow 0.3s ease, background-color 0.3s ease;
          box-shadow: 0 4px 20px rgba(238,215,160,0.25);
        }
        .h-cta:hover { transform: translateY(-3px) scale(1.02); box-shadow: 0 8px 30px rgba(238,215,160,0.45); background: #fbf7ed; }
        .h-cta:focus-visible { outline: 2px solid #EED7A0; outline-offset: 3px; }

        /* Social */
        .h-social { display: flex; align-items: center; gap: 0.5rem; }
        .h-social-sep {
          display: inline-block; width: 1px; height: 1.5rem;
          background: rgba(244,241,232,0.3);
          margin-right: 0.4rem;
        }
        .h-social-link {
          color: rgba(244,241,232,0.75);
          display: flex; align-items: center; justify-content: center;
          width: 32px; height: 32px;
          text-decoration: none;
          transition: color 0.3s, transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .h-social-link:hover { color: #EED7A0; transform: translateY(-2px) scale(1.12); }
        .h-social-link:focus-visible { outline: 2px solid #EED7A0; border-radius: 4px; }

        /* ══════════════════════════════════════════════
           MOBILE ≤ 767px
           Layout: avatar circular + conteúdo centralizado
           SEM parallax
        ══════════════════════════════════════════════ */
        @media (max-width: 767px) {
          .hero-root {
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;
          }
          .hero-root::before { display: none; }

          /* Esconde background layers absolutas no mobile */
          .h-bg { opacity: 0.7; }

          /* Avatar circular */
          .h-person {
            position: relative !important;
            inset: auto !important;
            width: 150px !important;
            height: 150px !important;
            margin-top: calc(env(safe-area-inset-top) + 2rem);
            margin-bottom: 1rem;
            border-radius: 50%;
            overflow: hidden;
            border: 3px solid rgba(238,215,160,0.5);
            box-shadow: 0 10px 30px rgba(0,0,0,0.25);
            flex-shrink: 0;
            z-index: 10;
            will-change: auto !important;
          }
          .h-person-media {
            position: absolute !important;
            inset: 0 !important;
            bottom: auto !important;
            left: auto !important;
            width: 100% !important;
            height: 100% !important;
            max-width: none !important;
            object-fit: cover !important;
            object-position: top center !important;
            filter: none !important;
            scale: 1 !important;
            transform: none !important;
          }

          /* Foliagens: escondidas no mobile */
          .h-fg { display: none !important; }

          /* Gradiente mobile */
          .h-gradient {
            background: linear-gradient(
              to bottom,
              rgba(32,62,70,0.35) 0%,
              rgba(32,62,70,0.82) 40%,
              rgba(32,62,70,0.95) 100%
            ) !important;
          }

          /* Conteúdo */
          .h-content {
            margin: 0;
            max-width: 100%;
            padding: 0 2.5rem 0rem;
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .h-title { font-size: clamp(1.8rem, 8vw, 2.4rem); margin-bottom: 0.5rem; }
          .h-body  { font-size: 0.85rem; margin-bottom: 1.5rem; max-width: 100%; line-height: 1.6; }
          .h-divider { margin-left: auto; margin-right: auto; margin-bottom: 0.75rem; }

          /* CTA row */
          .h-cta-row {
            flex-direction: column;
            align-items: center;
            gap: 1.25rem;
            margin-bottom: 12rem;
          }
          .h-social { display: none !important; }
          .h-social-sep { display: none; }
        }

        /* ══════════════════════════════════════════════
           TABLET & TELAS MENORES (768px – 1100px)
        ══════════════════════════════════════════════ */
        @media (min-width: 768px) and (max-width: 1100px) {
          .hero-root::before { display: none; }
          .h-person-media {
            position: absolute !important;
            bottom: -5% !important;
            left: -12% !important;
            height: 112% !important;
            width: auto !important;
            max-width: none !important;
            object-fit: contain !important;
            object-position: bottom left !important;
            scale: 1.08 !important;
          }
          .h-content {
            margin-left: clamp(1.5rem, 43vw, 460px) !important;
            max-width: 520px !important;
            padding-right: clamp(1.5rem, 4vw, 3rem) !important;
            padding-left: 0.5rem !important;
          }
          .h-title {
            font-size: clamp(1.8rem, 3.4vw, 2.6rem) !important;
          }
          .h-body {
            font-size: clamp(0.82rem, 1.1vw, 0.9rem) !important;
            max-width: 42ch !important;
          }
          .h-gradient {
            background: linear-gradient(
              to right,
              rgba(32,62,70,0.0) 0%,
              rgba(32,62,70,0.3) 35%,
              rgba(32,62,70,0.78) 55%,
              rgba(32,62,70,0.92) 100%
            ) !important;
          }
        }

        @media (min-width: 768px) and (max-width: 1023px) and (orientation: portrait) {
          .h-person-media {
            height: 75vh !important;
            left: -18% !important;
            bottom: -2% !important;
          }
          .h-content {
            margin-left: 36vw !important;
            max-width: 60vw !important;
          }
        }

      `}</style>
    </section>
  );
};
