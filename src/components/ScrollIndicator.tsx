import { useEffect, useState } from 'react';
import { SCENES, getCurrentSceneIndex, getSceneScrollTop, scrollToScene } from '../scrollUtils';

export const ScrollIndicator = () => {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const update = () => setActive(getCurrentSceneIndex());
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      if (target.closest('input, textarea, select, [contenteditable="true"], dialog[open]')) return;
      if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;
      event.preventDefault();
      const direction = event.key === 'ArrowDown' ? 1 : -1;
      // Long sections stay readable before advancing to the next section.
      const index = getCurrentSceneIndex();
      const next = getSceneScrollTop(index + 1);
      if (direction === 1 && index < SCENES.length - 1 && next > window.scrollY + window.innerHeight) {
        if ((window as any).lenis) (window as any).lenis.scrollTo(window.scrollY + window.innerHeight * 0.8);
        else window.scrollBy({ top: window.innerHeight * 0.8, behavior: 'smooth' });
      } else scrollToScene(Math.max(0, Math.min(SCENES.length - 1, index + direction)));
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('keydown', onKey);
    return () => { window.removeEventListener('scroll', update); window.removeEventListener('keydown', onKey); };
  }, []);
  if (active === SCENES.length - 1) return null;
  return <button type="button" aria-label="Próxima seção" onClick={() => scrollToScene(active + 1)} className="hidden md:flex fixed bottom-8 right-8 z-50 w-12 h-12 items-center justify-center text-[#d7b36c]">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-8 h-8" aria-hidden="true"><path d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
  </button>;
};
