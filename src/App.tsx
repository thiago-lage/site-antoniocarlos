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

    // Toggle glass overlay class: active only after scrolling past hero
    const heroEl = document.getElementById('scene-1');
    const toggleGlass = () => {
      const heroH = heroEl ? heroEl.offsetHeight : window.innerHeight;
      document.documentElement.classList.toggle('scrolled-past-hero', window.scrollY > heroH * 0.8);
    };
    window.addEventListener('scroll', toggleGlass, { passive: true });
    toggleGlass();

    const el = containerRef.current as unknown as HTMLElement;
    if (el) {
      // Synchronize Lenis with GSAP ScrollTrigger
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
    }

    // Add ScrollTrigger to window for global access
    (window as any).ScrollTrigger = ScrollTrigger;

    let ctx = gsap.context(() => {
      // --- Scene 4 Horizontal Scrolljack ---
      const track = document.getElementById('trajectory-track');
      if (track) {
        const getScrollAmount = () => Math.max(0, track.scrollWidth - window.innerWidth);

        gsap.to(track, {
          x: () => -getScrollAmount(),
          ease: "none",
          scrollTrigger: {
            id: "scene-4-pin",
            trigger: "#scene-4",
            start: "top top",
            // 2.5× o tamanho do track → scroll muito mais lento, dá tempo de ver cada card
            end: () => "+=" + getScrollAmount() * 2.5,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            scrub: 2.5, // mais suave (era 1)
            invalidateOnRefresh: true,
            onEnter: () => {
              scrollState.currentScene = 4;
            },
            onEnterBack: () => {
              scrollState.currentScene = 4;
            },
            onLeave: () => {
              scrollState.currentScene = 5;
            },
            onLeaveBack: () => {
              scrollState.currentScene = 3;
            },
            onUpdate: (self) => {
              scrollState.scene4Progress = self.progress;
              if (self.isActive) {
                scrollState.currentScene = 4;
              }
            }
          }
        });
      }

      // Create ScrollTriggers for each scene simply to track active state and exact positions
      SCENES.forEach((id, index) => {
        if (id === 'scene-4') return;
        const isFooter = id === 'scene-6';
        ScrollTrigger.create({
          id: id,
          trigger: `#${id}`,
          start: isFooter ? "top 70%" : "top top",
          end: isFooter ? "bottom bottom" : "bottom top",
          onEnter: () => scrollState.currentScene = index + 1,
          onEnterBack: () => scrollState.currentScene = index + 1,
        });

        if (id !== 'scene-1' && id !== 'scene-4') {
          // Fade-up animation for text inside glass cards
          gsap.fromTo(`#${id} .glass-card, #${id} .animate-up`, 
            { opacity: 0, y: 60 },
            {
              opacity: 1,
              y: 0,
              duration: 1.0,
              ease: "power3.out",
              scrollTrigger: {
                trigger: `#${id}`,
                start: "top 80%",
                end: "bottom 20%",
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
      
      {/* 3D Background — only shown from Scene 2 onwards via CSS, hidden behind hero */}
      <div className="fixed inset-0 w-full h-full" style={{ zIndex: 0 }}>
        <Suspense fallback={null}>
          <CanvasContainer eventSource={containerRef as unknown as React.RefObject<HTMLElement>} />
        </Suspense>
      </div>

      {/* Global Glassmorphism Blur Effect — only for scenes 2+ */}
      <div className="fixed inset-0 w-full h-full pointer-events-none scene-glass-overlay" style={{ zIndex: 0 }} />

      {/* Foreground Content */}
      <div className="relative w-full" style={{ zIndex: 10 }}>
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
