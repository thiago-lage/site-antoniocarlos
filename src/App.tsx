import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { ScrollOverlay } from './components/ScrollOverlay';
import { Footer } from './components/Footer';
import { SideNavigation } from './components/SideNavigation';
import { ScrollIndicator } from './components/ScrollIndicator';
import { AudioPlayer } from './components/AudioPlayer';
import { ScrollToTop } from './components/ScrollToTop';
import { SymptomPage } from './components/SymptomPage';
import { SYMPTOMS } from './components/SymptomsSection';
import { SCENES } from './scrollUtils';

gsap.registerPlugin(ScrollTrigger);

function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    (window as any).lenis = lenis;
    const tick = (time: number) => lenis.raf(time * 1000);
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    const ctx = gsap.context(() => {
      SCENES.filter(id => id !== 'scene-1').forEach(id => {
        gsap.fromTo(`#${id} .glass-card`, { opacity: 0, y: 30 }, {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: `#${id}`, start: 'top 85%', toggleActions: 'play none none none' },
        });
      });
    }, containerRef);
    let disposed = false;
    const alignInitialHash = () => {
      if (disposed) return;
      ScrollTrigger.refresh();
      const target = document.getElementById(window.location.hash.slice(1));
      if (target) lenis.scrollTo(target, { immediate: true });
    };
    void document.fonts.ready.then(alignInitialHash);
    return () => {
      disposed = true;
      ctx.revert();
      gsap.ticker.remove(tick);
      lenis.destroy();
      delete (window as any).lenis;
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full min-h-screen overflow-x-hidden bg-[#F8F7F3] text-gray-800 font-sans selection:bg-turquesa/30">
      <ScrollOverlay />
      <Footer />
      <SideNavigation />
      <ScrollIndicator />
      <AudioPlayer />
      <ScrollToTop />
    </div>
  );
}

export default function App() {
  const match = window.location.pathname.match(/^\/sintomas\/([^/]+)\/?$/);
  if (match) {
    const symptom = SYMPTOMS.find(item => item.id === match[1]);
    if (symptom) return <SymptomPage symptom={symptom} />;
    return <main className="min-h-screen flex flex-col items-center justify-center gap-5"><h1 className="text-display text-2xl">Página não encontrada</h1><a href="/#scene-sintomas" className="booking-link">Ver sintomas</a></main>;
  }
  return <HomePage />;
}
