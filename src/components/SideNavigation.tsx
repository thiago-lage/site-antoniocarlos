import React, { useEffect, useState } from 'react';
import { scrollToScene, getCurrentSceneIndex, SCENES } from '../scrollUtils';

export const SideNavigation: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const update = () => setActiveIdx(getCurrentSceneIndex());
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  const labels = ['Início', 'Promessa', 'Método', 'Trajetória', 'Síntese', 'Contato'];

  return (
    <nav className="fixed right-4 md:right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-3 select-none">
      {SCENES.map((_, i) => (
        <button
          key={i}
          onClick={() => scrollToScene(i)}
          title={labels[i]}
          className={`relative group flex items-center justify-center transition-all duration-300 w-4 h-4`}
        >
          {/* Tooltip label */}
          <span className="absolute right-6 whitespace-nowrap text-[10px] uppercase tracking-widest font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-[#fbf7ed]/80 backdrop-blur-md rounded-full px-3 py-1 border border-white/50 shadow-sm pointer-events-none" style={{ color: '#163f49' }}>
            {labels[i]}
          </span>
          {/* Dot */}
          <span
            className="block rounded-full transition-all duration-300"
            style={{
              width: activeIdx === i ? '10px' : '6px',
              height: activeIdx === i ? '10px' : '6px',
              backgroundColor: activeIdx === i ? '#d7b36c' : 'rgba(95, 116, 119, 0.4)',
              boxShadow: activeIdx === i ? '0 0 0 3px rgba(215, 179, 108, 0.25)' : 'none',
            }}
          />
        </button>
      ))}
    </nav>
  );
};
