// Scene IDs in order
export const SCENES = ['scene-1', 'scene-2', 'scene-3', 'scene-4', 'scene-5', 'scene-5b', 'scene-6'];

/**
 * Retorna a posição Y exata (em pixels de scroll do documento) onde a cena começa no topo da viewport.
 * Usa as instâncias do GSAP ScrollTrigger para considerar qualquer pinning e espaçamento.
 */
export const getSceneScrollTop = (index: number): number => {
  if (index <= 0) return 0;
  const maxScroll = Math.max(0, (document.documentElement.scrollHeight || document.body.scrollHeight) - window.innerHeight);

  if (index >= SCENES.length - 1) {
    const el = document.getElementById(SCENES[index]);
    if (el) {
      return Math.min(maxScroll, Math.round(el.offsetTop || (el.getBoundingClientRect().top + window.scrollY)));
    }
    return maxScroll;
  }

  const id = SCENES[index];
  const ST = (window as any).ScrollTrigger;
  if (ST) {
    const st = ST.getById(id);
    if (st && typeof st.start === 'number') {
      return Math.min(maxScroll, Math.round(st.start));
    }
  }

  // Fallback se o ScrollTrigger ainda não estiver pronto
  const el = document.getElementById(id);
  if (!el) return 0;
  return Math.min(maxScroll, Math.round(el.offsetTop || (el.getBoundingClientRect().top + window.scrollY)));
};

/**
 * Rola diretamente e de forma forçada para o topo exato da cena, eliminando faixas ou lacunas.
 */
export const scrollToScene = (index: number) => {
  const maxScroll = Math.max(0, (document.documentElement.scrollHeight || document.body.scrollHeight) - window.innerHeight);

  if (index >= SCENES.length - 1) {
    if ((window as any).lenis) {
      (window as any).lenis.scrollTo(maxScroll, { duration: 1.2, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    } else {
      window.scrollTo({ top: maxScroll, behavior: 'smooth' });
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
  const maxScroll = Math.max(0, (document.documentElement.scrollHeight || document.body.scrollHeight) - window.innerHeight);

  // Se o usuário rolou até o fim da página (ou está a menos de 100px do rodapé), garante Contato
  if (maxScroll > 0 && currentY >= maxScroll - 100) {
    return SCENES.length - 1;
  }

  // Se o rodapé já está bem visível na viewport
  const footerEl = document.getElementById(SCENES[SCENES.length - 1]);
  if (footerEl) {
    const rect = footerEl.getBoundingClientRect();
    if (rect.top <= window.innerHeight * 0.45) {
      return SCENES.length - 1;
    }
  }

  let activeIdx = 0;
  for (let i = 0; i < SCENES.length; i++) {
    const top = getSceneScrollTop(i);
    if (currentY >= top - 60) {
      activeIdx = i;
    }
  }
  return activeIdx;
};
