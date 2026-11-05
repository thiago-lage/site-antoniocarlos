// Scene IDs in order
export const SCENES = [
  'scene-1',
  'scene-sintomas',
  'scene-2',
  'scene-3',
  'scene-caminho',
  'scene-4',
  'scene-5',
  'scene-5b',
  'scene-acompanhamento',
  'scene-encerramento',
  'scene-6',
];

export const SCENE_LABELS = [
  'Início', 'Sintomas', 'Dimensões do ser', 'O Método', 'Percurso terapêutico',
  'Trajetória', 'Abordagens', 'Sobre Mim', 'Contato', 'Encerramento', 'Redes e agendamento',
];

// Six primary areas; arrows still visit every section within each area.
export const PRIMARY_NAV = [
  { label: 'Início', sceneId: 'scene-1' },
  { label: 'Sintomas', sceneId: 'scene-sintomas' },
  { label: 'O Método', sceneId: 'scene-2' },
  { label: 'Abordagens', sceneId: 'scene-5' },
  { label: 'Sobre Mim', sceneId: 'scene-5b' },
  { label: 'Contato', sceneId: 'scene-acompanhamento' },
];

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
  // Pinned trajectory needs its ScrollTrigger position; ordinary sections use
  // current document geometry, which stays accurate after fonts/images load.
  const ST = (window as any).ScrollTrigger;
  if (id === 'scene-4' && ST) {
    const pin = ST.getById('scene-4-pin');
    if (pin && typeof pin.start === 'number') {
      return Math.min(maxScroll, Math.ceil(pin.start));
    }
  }
  const el = document.getElementById(id);
  if (!el) return 0;
  return Math.min(maxScroll, Math.ceil(el.getBoundingClientRect().top + window.scrollY));
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
    const el = document.getElementById(SCENES[i]);
    // Ignora cenas ocultas no viewport atual (ex: hidden no mobile)
    if (el && el.offsetParent === null) continue;
    const top = getSceneScrollTop(i);
    if (currentY >= top - 80) {
      activeIdx = i;
    }
  }
  return activeIdx;
};
