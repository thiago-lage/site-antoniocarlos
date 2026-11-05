import { useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/** Scale each centered group within the viewport, preserving its natural width. */
export function useViewportFit() {
  useEffect(() => {
    const groups = Array.from(document.querySelectorAll<HTMLElement>('.scene .fit-content'));
    let frame = 0;
    let disposed = false;
    const fit = () => {
      frame = 0;
      let changed = false;
      for (const group of groups) {
        const section = group.closest<HTMLElement>('.scene');
        if (!section) continue;
        const style = getComputedStyle(section);
        const width = section.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
        const height = window.innerHeight - parseFloat(style.paddingTop) - parseFloat(style.paddingBottom) - 2;
        const nextWidth = `${Math.floor(width)}px`;
        if (group.style.width !== nextWidth) { group.style.width = nextWidth; changed = true; }
        // Keep text readable on phones; longer content can still scroll naturally.
        const minimum = window.innerWidth < 480 ? 0.85 : 0.65;
        const scale = Math.max(minimum, Math.min(1, height / Math.max(1, group.offsetHeight)));
        const zoom = Math.floor(scale * 1000) / 1000;
        if (Math.abs(parseFloat(group.style.zoom || '1') - zoom) > 0.001) { group.style.zoom = String(zoom); changed = true; }
      }
      const footer = document.getElementById('scene-6');
      const social = footer?.querySelector<HTMLElement>('.footer-social');
      const mobileSocial = footer?.querySelector<HTMLElement>('.footer-layout .md\\:hidden');
      const visibleSocial = social && social.offsetHeight ? social : mobileSocial;
      if (footer && visibleSocial) {
        const rect = visibleSocial.getBoundingClientRect();
        const end = rect.top - footer.getBoundingClientRect().top + rect.height * 0.65;
        footer.style.setProperty('--social-band-end', `${Math.round(end)}px`);
      }
      if (changed) ScrollTrigger.refresh();
    };
    const schedule = () => { if (!disposed && !frame) frame = requestAnimationFrame(fit); };
    const observer = new ResizeObserver(schedule);
    groups.forEach(group => observer.observe(group));
    window.addEventListener('resize', schedule);
    void document.fonts.ready.then(schedule);
    schedule();
    return () => { disposed = true; observer.disconnect(); window.removeEventListener('resize', schedule); cancelAnimationFrame(frame); };
  }, []);
}
