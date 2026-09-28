// Scene IDs in order
export const SCENES = ['scene-1', 'scene-2', 'scene-3', 'scene-4', 'scene-5', 'scene-5b', 'scene-6'];

export const scrollToScene = (index: number) => {
  // If clicking the last dot (footer/contact), scroll to the absolute bottom
  if (index === SCENES.length - 1) {
    if ((window as any).lenis) {
      (window as any).lenis.scrollTo('bottom', { duration: 1.5, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    } else {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }
    return;
  }

  const el = document.getElementById(SCENES[index]);
  if (el) {
    if ((window as any).lenis) {
      (window as any).lenis.scrollTo(el, { duration: 1.5, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    } else {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }
};

export const getCurrentSceneIndex = (): number => {
  const viewportMid = window.scrollY + window.innerHeight * 0.5;
  let closest = 0;
  let minDist = Infinity;
  SCENES.forEach((id, i) => {
    const el = document.getElementById(id);
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.height === 0) return;
    const elTop = window.scrollY + rect.top;
    const dist = Math.abs(viewportMid - (elTop + rect.height / 2));
    if (dist < minDist) { minDist = dist; closest = i; }
  });
  return closest;
};
