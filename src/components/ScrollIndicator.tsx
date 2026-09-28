import React, { useEffect, useState } from 'react';
import { scrollToScene, getCurrentSceneIndex, SCENES } from '../scrollUtils';

export const ScrollIndicator: React.FC = () => {
  const [atBottom, setAtBottom] = useState(false);
  const [isAtTimelineEnd, setIsAtTimelineEnd] = useState(false);

  useEffect(() => {
    // Arrow visibility logic
    const checkScroll = () => {
      const idx = getCurrentSceneIndex();
      setAtBottom(idx === SCENES.length - 1);
      
      // Check if we are at the end of the Scene 4 timeline
      if (idx === 3) {
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
    };

    window.addEventListener('scroll', checkScroll, { passive: true });
    
    // Initial check
    checkScroll();

    // Keyboard navigation: ArrowDown / ArrowUp
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        const idx = getCurrentSceneIndex();

        if (idx === 3) {
          // Custom scrub logic for Scene 4 (Trajetória)
          const scene5 = document.getElementById('scene-5');
          const scene4 = document.getElementById('scene-4');
          if (scene5 && scene4) {
            const maxScroll = scene5.getBoundingClientRect().top + window.scrollY;
            const minScroll = scene4.getBoundingClientRect().top + window.scrollY;
            
            if (e.key === 'ArrowDown') {
              if (window.scrollY < maxScroll - window.innerHeight * 0.8) {
                const nextScroll = window.scrollY + window.innerWidth * 0.4;
                if ((window as any).lenis) (window as any).lenis.scrollTo(nextScroll, { duration: 1.2 });
                else window.scrollTo({ top: nextScroll, behavior: 'smooth' });
                return;
              }
            } else { // ArrowUp
              // The user requested that the UP arrow returns to the beginning of the timeline
              if (window.scrollY > minScroll + 10) {
                if ((window as any).lenis) (window as any).lenis.scrollTo(minScroll, { duration: 1.5 });
                else window.scrollTo({ top: minScroll, behavior: 'smooth' });
                return;
              }
            }
          }
        }

        if (e.key === 'ArrowDown') {
          scrollToScene(Math.min(idx + 1, SCENES.length - 1));
        } else {
          scrollToScene(Math.max(idx - 1, 0));
        }
      }
    };
    window.addEventListener('keydown', onKey);

    return () => {
      window.removeEventListener('scroll', checkScroll);
      window.removeEventListener('keydown', onKey);
    };
  }, []);

  const handleClickDown = () => {
    const idx = getCurrentSceneIndex();
    
    // Scene 4 (Trajetória) is a horizontal scrolljack. 
    // Jumping directly to Scene 5 skips the timeline.
    if (idx === 3) {
      const scene5 = document.getElementById('scene-5');
      const scene4 = document.getElementById('scene-4');
      if (scene5 && scene4) {
        // Absolute position of where Scene 5 begins
        const maxScroll = scene5.getBoundingClientRect().top + window.scrollY;
        const minScroll = scene4.getBoundingClientRect().top + window.scrollY;
        
        // If at the end of timeline, jump back to start
        if (isAtTimelineEnd) {
          if ((window as any).lenis) (window as any).lenis.scrollTo(minScroll, { duration: 1.5 });
          else window.scrollTo({ top: minScroll, behavior: 'smooth' });
          return;
        }

        // If we are more than one viewport away from Scene 5, 
        // we are still scrubbing the horizontal timeline. Scroll down incrementally.
        if (window.scrollY < maxScroll - window.innerHeight * 0.8) {
          const nextScroll = window.scrollY + window.innerWidth * 0.4; // Scroll by about 40vw to match cards
          if ((window as any).lenis) {
            (window as any).lenis.scrollTo(nextScroll, { duration: 1.2 });
          } else {
            window.scrollTo({ top: nextScroll, behavior: 'smooth' });
          }
          return;
        }
      }
    }
    
    scrollToScene(Math.min(idx + 1, SCENES.length - 1));
  };

  if (atBottom) return null;

  return (
    <div
      className="fixed bottom-2 md:bottom-4 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-1 transition-opacity duration-1000"
      style={{ opacity: 1, pointerEvents: 'auto' }}
    >
      <button
        id="scroll-indicator-btn"
        onClick={handleClickDown}
        className="w-12 h-12 flex items-center justify-center transition-colors bg-transparent border-none outline-none cursor-pointer animate-bounce"
        style={{ color: '#EED7A0' }}
        onMouseEnter={e => (e.currentTarget.style.color = '#fbf7ed')}
        onMouseLeave={e => (e.currentTarget.style.color = '#EED7A0')}
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
