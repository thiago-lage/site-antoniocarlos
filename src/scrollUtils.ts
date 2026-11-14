export const SCENES = [
  'scene-1', 'scene-intro', 'scene-sintomas', 'scene-5b', 'scene-abordagem', 'scene-atendimento', 'scene-6',
];

export const PRIMARY_NAV = [
  { label: 'Início', sceneId: 'scene-1' },
  { label: 'Cuidado', sceneId: 'scene-intro' },
  { label: 'Sintomas', sceneId: 'scene-sintomas' },
  { label: 'Sobre mim', sceneId: 'scene-5b' },
  { label: 'Abordagem', sceneId: 'scene-abordagem' },
  { label: 'Atendimento', sceneId: 'scene-atendimento' },
  { label: 'Contato', sceneId: 'scene-6' },
];

/** Resolve current geometry so fonts and responsive layout cannot leave stale offsets. */
export const getSceneScrollTop = (index: number): number => {
  const el = document.getElementById(SCENES[index]);
  if (!el) return 0;
  const max = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
  return Math.min(max, Math.max(0, Math.ceil(el.getBoundingClientRect().top + window.scrollY)));
};

export const scrollToScene = (index: number) => {
  const top = getSceneScrollTop(index);
  if ((window as any).lenis) (window as any).lenis.scrollTo(top, { duration: 1.2 });
  else window.scrollTo({ top, behavior: 'smooth' });
};

export const getCurrentSceneIndex = (): number => {
  let active = 0;
  for (let i = 0; i < SCENES.length; i++) {
    if (window.scrollY >= getSceneScrollTop(i) - 8) active = i;
  }
  return active;
};
