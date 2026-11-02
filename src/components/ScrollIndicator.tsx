import React, { useEffect, useState } from 'react';
import { scrollToScene, getCurrentSceneIndex, getSceneScrollTop, SCENES } from '../scrollUtils';

export const ScrollIndicator: React.FC = () => {
  const [atBottom, setAtBottom] = useState(false);
  const [isIdle, setIsIdle] = useState(false);
  const [isAtTimelineEnd, setIsAtTimelineEnd] = useState(false);

  const trajIdx = SCENES.indexOf('scene-4');

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    const resetIdle = () => {
      setIsIdle(false);
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setIsIdle(true);
      }, 2000);
    };

    // Arrow visibility logic
    const checkScroll = () => {
      const idx = getCurrentSceneIndex();
      setAtBottom(idx === SCENES.length - 1);

      // Check if we are at the end of the Scene 4 timeline
      if (idx === trajIdx) {
        const scene5 = document.getElementById('scene-5');
        if (scene5) {
          const maxScroll = scene5.getBoundingClientRect().top + window.scrollY;
          if (window.scrollY >= maxScroll - window.innerHeight * 0.8) {
            setIsAtTimelineEnd(true);
          } else {
            setIsAtTimelineEnd(false);
          }
        }
      } else {
        setIsAtTimelineEnd(false);
      }

      resetIdle();
    };

    window.addEventListener('scroll', checkScroll, { passive: true });

    // Initial check
    checkScroll();
    resetIdle();

    // Keyboard navigation: ArrowDown / ArrowUp
    const onKey = (e: KeyboardEvent) => {
      // Do not intercept arrow keys if a modal dialog is open
      if (document.querySelector('dialog[open]')) return;

      resetIdle();
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();

        const ST = (window as any).ScrollTrigger;
        const currentY = window.scrollY;
        const stPin = ST ? ST.getById('scene-4-pin') : null;

        // Se estiver dentro da animação horizontal da Trajetória (Scene 4)
        if (stPin && currentY >= stPin.start - 20 && currentY < stPin.end - 40) {
          const step = (stPin.end - stPin.start) / 8; // 8 passos para os 9 cards

          if (e.key === 'ArrowDown') {
            const nextCardY = currentY + step;
            // Se passar do último card ("CORPO HABITADO"), força ir direto para a cena seguinte
            if (nextCardY >= stPin.end - step * 0.4) {
              scrollToScene(trajIdx + 1);
            } else {
              if ((window as any).lenis) {
                (window as any).lenis.scrollTo(nextCardY, { duration: 1.0 });
              } else {
                window.scrollTo({ top: nextCardY, behavior: 'smooth' });
              }
            }
            return;
          } else {
            // ArrowUp
            const prevCardY = currentY - step;
            // Se voltar antes do primeiro card ("CORPO TEMIDO"), vai direto para a cena anterior
            if (prevCardY <= stPin.start + step * 0.4) {
              scrollToScene(trajIdx - 1);
            } else {
              if ((window as any).lenis) {
                (window as any).lenis.scrollTo(prevCardY, { duration: 1.0 });
              } else {
                window.scrollTo({ top: prevCardY, behavior: 'smooth' });
              }
            }
            return;
          }
        }

        // Navegação direta entre as demais seções
        if (e.key === 'ArrowDown') {
          let nextIdx = SCENES.length - 1;
          for (let i = 0; i < SCENES.length; i++) {
            const el = document.getElementById(SCENES[i]);
            if (el && el.offsetParent === null) continue;
            const sceneTop = getSceneScrollTop(i);
            if (sceneTop > currentY + 40) {
              nextIdx = i;
              break;
            }
          }
          scrollToScene(nextIdx);
        } else {
          // ArrowUp
          let prevIdx = 0;
          for (let i = SCENES.length - 1; i >= 0; i--) {
            const el = document.getElementById(SCENES[i]);
            if (el && el.offsetParent === null) continue;
            const sceneTop = getSceneScrollTop(i);
            if (sceneTop < currentY - 40) {
              prevIdx = i;
              break;
            }
          }
          scrollToScene(prevIdx);
        }
      }
    };
    window.addEventListener('keydown', onKey);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('scroll', checkScroll);
      window.removeEventListener('keydown', onKey);
    };
  }, [trajIdx]);

  const handleClickDown = () => {
    const ST = (window as any).ScrollTrigger;
    const currentY = window.scrollY;
    const stPin = ST ? ST.getById('scene-4-pin') : null;

    if (stPin && currentY >= stPin.start - 20 && currentY < stPin.end - 40) {
      const step = (stPin.end - stPin.start) / 8;
      const nextCardY = currentY + step;
      if (nextCardY >= stPin.end - step * 0.4) {
        scrollToScene(trajIdx + 1);
      } else {
        if ((window as any).lenis) {
          (window as any).lenis.scrollTo(nextCardY, { duration: 1.0 });
        } else {
          window.scrollTo({ top: nextCardY, behavior: 'smooth' });
        }
      }
      return;
    }

    let nextIdx = SCENES.length - 1;
    for (let i = 0; i < SCENES.length; i++) {
      const el = document.getElementById(SCENES[i]);
      if (el && el.offsetParent === null) continue;
      const sceneTop = getSceneScrollTop(i);
      if (sceneTop > currentY + 40) {
        nextIdx = i;
        break;
      }
    }
    scrollToScene(nextIdx);
  };

  const isVisible = isIdle && !atBottom;

  if (atBottom) return null;

  return (
    <div
      className="hidden md:flex fixed bottom-8 right-8 z-50 w-14 items-center justify-center flex-col transition-opacity duration-1000"
      style={{ opacity: isVisible ? 1 : 0, pointerEvents: isVisible ? 'auto' : 'none' }}
    >
      <button
        id="scroll-indicator-btn"
        onClick={handleClickDown}
        className="w-14 h-14 flex items-center justify-center transition-all duration-300 bg-transparent border-none outline-none cursor-pointer animate-bounce"
        style={{ color: '#EED7A0' }}
        onMouseEnter={(e) => (e.currentTarget.style.color = '#fbf7ed')}
        onMouseLeave={(e) => (e.currentTarget.style.color = '#EED7A0')}
        aria-label="Next section"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-8 h-8">
          {isAtTimelineEnd ? (
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          )}
        </svg>
      </button>
    </div>
  );
};
