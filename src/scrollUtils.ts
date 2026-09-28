// Scene IDs in order
export const SCENES = ['scene-1', 'scene-2', 'scene-3', 'scene-4', 'scene-5', 'scene-5b', 'scene-6'];

/**
 * Retorna a posição Y exata (em pixels de scroll do documento) onde a cena começa no topo da viewport.
 * Usa as instâncias do GSAP ScrollTrigger para considerar qualquer pinning e espaçamento.
 */
export const getSceneScrollTop = (index: number): number => {
  if (index <= 0) return 0;
  if (index >= SCENES.length - 1) return document.body.scrollHeight;

  const id = SCENES[index];
  const ST = (window as any).ScrollTrigger;
  if (ST) {
    const st = ST.getById(id);
    if (st && typeof st.start === 'number') {
      return Math.round(st.start);
    }
  }

  // Fallback se o ScrollTrigger ainda não estiver pronto
  const el = document.getElementById(id);
  if (!el) return 0;
  return Math.round(el.offsetTop || (el.getBoundingClientRect().top + window.scrollY));
};

/**
 * Rola diretamente e de forma forçada para o topo exato da cena, eliminando faixas ou lacunas.
 */
export const scrollToScene = (index: number) => {
  if (index >= SCENES.length - 1) {
    if ((window as any).lenis) {
      (window as any).lenis.scrollTo('bottom', { duration: 1.2, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    } else {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }
    return;
  }

  const targetY = getSceneScrollTop(index);
  if ((window as any).lenis) {
    (window as any).lenis.scrollTo(targetY, {
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      lock: false,
    });
  } else {
    window.scrollTo({ top: targetY, behavior: 'smooth' });
  }
};

/**
 * Identifica em qual cena o scroll atual se encontra com base nos pontos de início exatos.
 */
export const getCurrentSceneIndex = (): number => {
  const currentY = window.scrollY;
  let activeIdx = 0;
  for (let i = 0; i < SCENES.length; i++) {
    const top = getSceneScrollTop(i);
    if (currentY >= top - 40) {
      activeIdx = i;
    }
  }
  return activeIdx;
};
