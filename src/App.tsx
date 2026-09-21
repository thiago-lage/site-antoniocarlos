import React, { useEffect, useRef, Suspense, lazy } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const CanvasContainer = lazy(() => import('./components/CanvasContainer').then(m => ({ default: m.CanvasContainer })));
import { ScrollOverlay } from './components/ScrollOverlay';
import { Footer } from './components/Footer';
import { SideNavigation } from './components/SideNavigation';
import { ScrollIndicator } from './components/ScrollIndicator';
import { AudioPlayer } from './components/AudioPlayer';
import { ScrollToTop } from './components/ScrollToTop';
import { scrollState } from './store';
import { SCENES } from './scrollUtils';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // standard easing
    });

    // Add Lenis to window for global access
    (window as any).lenis = lenis;

    const el = containerRef.current as unknown as HTMLElement;
    if (el) {
      // Synchronize Lenis with GSAP ScrollTrigger
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
    }

    let ctx = gsap.context(() => {
      // --- Create Pins FIRST so they wrap the DOM correctly before other triggers measure it ---
      // --- Scene 4 Horizontal Scrolljack ---
      const track = document.getElementById('trajectory-track');
      if (track) {
        const getScrollAmount = () => {
          const lastCard = track.lastElementChild as HTMLElement;
          if (!lastCard) return track.scrollWidth - window.innerWidth;
          // Calculate distance to perfectly center the last card in the viewport
          const lastCardCenter = lastCard.offsetLeft + lastCard.offsetWidth / 2;
          const maxScroll = lastCardCenter - window.innerWidth / 2;
          return Math.max(0, maxScroll);
        };

        gsap.to(track, {
          x: () => -getScrollAmount(),
          ease: "none",
          scrollTrigger: {
            trigger: "#scene-4",
            start: "center center",
            end: () => "+=" + getScrollAmount(),
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              scrollState.scene4Progress = self.progress;
            }
          }
        });
      }

      // Create ScrollTriggers for each scene simply to track active state
      SCENES.forEach((id, index) => {
        ScrollTrigger.create({
          trigger: `#${id}`,
          start: "top center",
          end: "bottom center",
          onEnter: () => scrollState.currentScene = index + 1,
          onEnterBack: () => scrollState.currentScene = index + 1,
          snap: id !== 'scene-4' ? {
            snapTo: 0.5, // 0.5 means the exact center of the element aligns with the center of the viewport
            duration: { min: 0.2, max: 0.8 },
            delay: 0.1, // Wait 100ms after user stops scrolling before snapping
            ease: "power2.inOut"
          } : undefined
        });

        // For scene-4, don't use the default fade up on the entire section because it's pinned
        // It conflicts with the horizontal movement.
        if (id !== 'scene-4') {
          gsap.fromTo(`#${id} .glass-card, #${id} .animate-up`, 
            { opacity: 0, y: 80 },
            {
              opacity: 1,
              y: 0,
              duration: 1.2,
              ease: "power3.out",
              stagger: 0.2,
              scrollTrigger: {
                trigger: `#${id}`,
                start: "top 75%",
                end: "bottom 25%",
                toggleActions: "play reverse play reverse",
              }
            }
          );
        } else {
          // Manual fade for Scene 4 title only
          gsap.fromTo(`#scene-4 .animate-up`, 
            { opacity: 0, y: 80 },
            {
              opacity: 1,
              y: 0,
              duration: 1.2,
              ease: "power3.out",
              scrollTrigger: {
                trigger: "#scene-4",
                start: "top 75%",
                end: "bottom 25%",
                toggleActions: "play reverse play reverse",
              }
            }
          );
        }
      });

      // Overall progress tracking for 3D logic
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          scrollState.progress = self.progress;
        },
      });
    }, containerRef);

    return () => {
      ctx.revert();
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full min-h-screen overflow-x-hidden bg-[#F8F7F3] text-gray-800 font-sans selection:bg-turquesa/30">
      
      {/* 3D Background */}
      <div className="fixed inset-0 w-full h-full z-0">
        <Suspense fallback={null}>
          <CanvasContainer eventSource={containerRef as unknown as React.RefObject<HTMLElement>} />
        </Suspense>
      </div>

      {/* Global Glassmorphism Blur Effect */}
      <div className="fixed inset-0 w-full h-full z-0 pointer-events-none backdrop-blur-[60px] bg-white/30"></div>

      {/* Foreground Content */}
      <div className="relative z-10 w-full">
        <ScrollOverlay />
        <Footer />
      </div>

      <SideNavigation />
      <ScrollIndicator />
      <AudioPlayer />
      <ScrollToTop />
    </div>
  );
}

export default App;
