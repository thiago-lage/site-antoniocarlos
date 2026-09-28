import React, { useEffect, useState } from 'react';

export const ScrollToTop: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const checkScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = docHeight > 0 ? scrollY / docHeight : 0;
      setProgress(currentProgress);
    };

    window.addEventListener('scroll', checkScroll, { passive: true });
    checkScroll();
    
    return () => {
      window.removeEventListener('scroll', checkScroll);
    };
  }, []);

  const handleScrollTop = () => {
    if ((window as any).lenis) {
      (window as any).lenis.scrollTo(0, { duration: 1.5 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Only show when the user is basically at the footer
  const showButton = progress > 0.95;

  return (
    <div 
      className={`fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 transition-all duration-700 ${showButton ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-10 pointer-events-none'}`}
    >
      <button 
        onClick={handleScrollTop}
        className="relative w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full backdrop-blur-md shadow-lg transition-all hover:scale-105 group"
        style={{
          background: 'rgba(251, 247, 237, 0.1)',
          border: '1px solid rgba(251, 247, 237, 0.2)',
          color: '#fbf7ed'
        }}
        onMouseEnter={e => (e.currentTarget.style.background = 'rgba(251, 247, 237, 0.2)')}
        onMouseLeave={e => (e.currentTarget.style.background = 'rgba(251, 247, 237, 0.1)')}
        aria-label="Voltar ao topo"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6 md:w-7 md:h-7 transition-transform group-hover:-translate-y-1">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
        </svg>
      </button>
    </div>
  );
};
