import React, { useEffect, useState } from 'react';
import { scrollToScene, getCurrentSceneIndex, SCENES, PRIMARY_NAV } from '../scrollUtils';

export const SideNavigation: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const update = () => setActiveIdx(getCurrentSceneIndex());
    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => window.removeEventListener('scroll', update);
  }, []);

  // Hero and contact scenes have a dark background: use light dots there so they stay visible.
  const onDark = activeIdx === 0 || activeIdx === SCENES.length - 1;
  const idleDot = onDark ? 'rgba(251, 247, 237, 0.5)' : 'rgba(95, 116, 119, 0.4)';

  const activeArea = PRIMARY_NAV.reduce((active, item, index) =>
    activeIdx >= SCENES.indexOf(item.sceneId) ? index : active, 0);


  return (
    <nav aria-label="Navegação principal" className="fixed right-3 md:right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-2.5 select-none">
      {PRIMARY_NAV.map(({ sceneId, label }, i) => (
        <button
          key={sceneId}
          onClick={() => scrollToScene(SCENES.indexOf(sceneId))}
          title={label}
          aria-label={label}
          aria-current={activeArea === i ? 'location' : undefined}
          className="relative group flex items-center justify-center transition-all duration-300 w-6 h-6"
        >
          {/* Tooltip label */}
          <span
            className="absolute right-6 whitespace-nowrap text-[10px] uppercase tracking-widest font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-[#fbf7ed]/80 backdrop-blur-md rounded-full px-3 py-1 border border-white/50 shadow-sm pointer-events-none"
            style={{ color: '#163f49' }}
          >
            {label}
          </span>
          {/* Dot */}
          <span
            className="block rounded-full transition-all duration-300"
            style={{
              width: activeArea === i ? '10px' : '6px',
              height: activeArea === i ? '10px' : '6px',
              backgroundColor: activeArea === i ? '#d7b36c' : idleDot,
              boxShadow: activeArea === i ? '0 0 0 3px rgba(215, 179, 108, 0.25)' : 'none',
            }}
          />
        </button>
      ))}
    </nav>
  );
};
