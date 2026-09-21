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
          className={`relative group flex items-center justify-center transition-all duration-300`}
        >
          {/* Tooltip label */}
          <span className="absolute right-6 whitespace-nowrap text-xs text-gray-500 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white/70 backdrop-blur-sm rounded-full px-2 py-0.5 border border-white/50 shadow-sm pointer-events-none">
            {labels[i]}
          </span>
          {/* Dot */}
          <span
            className="block rounded-full transition-all duration-300"
            style={{
              width: activeIdx === i ? '10px' : '7px',
              height: activeIdx === i ? '10px' : '7px',
              backgroundColor: activeIdx === i ? '#009688' : '#C9D1D9',
              boxShadow: activeIdx === i ? '0 0 0 3px rgba(0,150,136,0.2)' : 'none',
            }}
          />
        </button>
      ))}
    </nav>
  );
};
