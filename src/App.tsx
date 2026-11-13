import { useEffect, useRef, useState } from 'react';
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
import { useViewportFit } from './useViewportFit';

gsap.registerPlugin(ScrollTrigger);

function HomePage() {
  useViewportFit();
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // Touch devices already scroll natively and smoothly; Lenis would only add per-frame JS.
    const useSmooth = !window.matchMedia('(pointer: coarse)').matches;
    const lenis = useSmooth ? new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) }) : null;
    const tick = (time: number) => lenis?.raf(time * 1000);
    if (lenis) {
      (window as any).lenis = lenis;
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
    }
    const ctx = gsap.context(() => {
      SCENES.filter(id => id !== 'scene-1').forEach(id => {
        gsap.fromTo(`#${id} .glass-card`, { opacity: 0, y: 30 }, {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: `#${id}`, start: 'top 85%', toggleActions: 'play none none none' },
        });
      });
      // Therapeutic journey: reveal one step at a time.
      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.fromTo('#scene-caminho .method-steps > li', { opacity: 0, y: 18 }, {
          opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', stagger: 0.55,
          scrollTrigger: { trigger: '#scene-caminho .method-steps', start: 'top 80%', toggleActions: 'play none none none' },
        });
      }
    }, containerRef);
    let disposed = false;
    const alignInitialHash = () => {
      if (disposed) return;
      ScrollTrigger.refresh();
      const target = document.getElementById(window.location.hash.slice(1));
      if (target) { if (lenis) lenis.scrollTo(target, { immediate: true }); else target.scrollIntoView(); }
    };
    void document.fonts.ready.then(alignInitialHash);
    return () => {
      disposed = true;
      ctx.revert();
      if (lenis) gsap.ticker.remove(tick);
      lenis?.destroy();
      delete (window as any).lenis;
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full min-h-screen overflow-x-clip bg-[#F8F7F3] text-gray-800 font-sans selection:bg-turquesa/30">
      <ScrollOverlay />
      <Footer />
      <SideNavigation />
      <ScrollIndicator />
      <ScrollToTop />
    </div>
  );
}

/** In-app navigation: keeps the page (and the ambient music) alive between routes. */
function useLocationPath() {
  const [path, setPath] = useState(window.location.pathname);
  useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = (event.target as Element).closest<HTMLAnchorElement>('a[href]');
      if (!anchor || anchor.target === '_blank' || anchor.origin !== window.location.origin || anchor.hasAttribute('download')) return;
      const samePage = anchor.pathname === window.location.pathname;
      if (samePage && anchor.pathname === '/') return; // in-page hash links keep native behavior
      event.preventDefault();
      history.pushState(null, '', anchor.pathname + anchor.search + anchor.hash);
      setPath(anchor.pathname);
      if (!anchor.hash) window.scrollTo(0, 0);
    };
    window.addEventListener('popstate', onPop);
    document.addEventListener('click', onClick);
    return () => { window.removeEventListener('popstate', onPop); document.removeEventListener('click', onClick); };
  }, []);
  return path;
}

export default function App() {
  const path = useLocationPath();
  const match = path.match(/^\/sintomas\/([^/]+)\/?$/);
  let page;
  if (match) {
    const symptom = SYMPTOMS.find(item => item.id === match[1]);
    page = symptom
      ? <SymptomPage symptom={symptom} />
      : <main className="min-h-screen flex flex-col items-center justify-center gap-5"><h1 className="text-display text-2xl">Página não encontrada</h1><a href="/#scene-sintomas" className="booking-link">Ver sintomas</a></main>;
  } else page = <HomePage />;
  return <>{page}<AudioPlayer /></>;
}
