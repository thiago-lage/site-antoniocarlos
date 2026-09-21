import React from 'react';

export const Footer: React.FC = () => {
  return (
    <section
      className="scene h-screen min-h-[700px] w-full relative flex flex-col justify-end items-center px-6 sm:px-8 md:px-16 lg:px-24 z-10 pb-6 pt-24"
      id="scene-6"
    >
      {/* Dark background block covering the lower half */}
      <div className="absolute bottom-0 left-0 w-full h-[65%] md:h-[55%] bg-[#28201e] -z-10 transition-all duration-300"></div>

      <div className="w-full flex flex-col items-center flex-grow justify-center mt-8">
        {/* DESKTOP ONLY: Original Iframe Layout */}
        <div className="hidden md:grid w-full max-w-4xl grid-cols-2 gap-6 mb-8">
          {/* Instagram Block */}
          <div className="glass-card pointer-events-auto p-5 md:p-6 flex flex-col items-center justify-between">
            <div className="flex items-center gap-2 mb-4">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5 text-gray-600">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
              <span className="text-label text-gray-600">Instagram</span>
            </div>
            
            <div className="w-full h-40 bg-white/20 rounded-xl border border-white/40 flex items-center justify-center mb-4">
              <span className="text-xs text-gray-500 font-medium tracking-wide">@drantoniocarloslage</span>
            </div>

            <a 
              href="https://www.instagram.com/drantoniocarloslage/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-outline w-full justify-center py-2 text-xs"
            >
              Ver Perfil
            </a>
          </div>

          {/* Spotify Block */}
          <div className="glass-card pointer-events-auto p-5 md:p-6 flex flex-col items-center justify-between">
            <div className="flex items-center gap-2 mb-4">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-gray-600">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.24 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15.001 10.62 18.66 12.84c.361.181.54.78.301 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.6.18-1.2.72-1.38 4.26-1.26 11.28-1.02 15.72 1.621.539.3.719 1.02.419 1.56-.239.54-.959.72-1.559.3z" />
              </svg>
              <span className="text-label text-gray-600">Spotify</span>
            </div>

            <div className="w-full h-40 flex items-center justify-center mb-4 rounded-2xl overflow-hidden">
              <iframe 
                style={{ borderRadius: '12px' }} 
                src="https://open.spotify.com/embed/track/6kkwzB6hXLIONkEk9JciA6?utm_source=generator&theme=0" 
                width="100%" 
                height="152" 
                frameBorder="0" 
                allowFullScreen={false} 
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                loading="lazy"
              ></iframe>
            </div>

            <a 
              href="https://open.spotify.com/track/6kkwzB6hXLIONkEk9JciA6" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-outline w-full justify-center py-2 text-xs"
            >
              Ouvir Mais
            </a>
          </div>
        </div>

        {/* MOBILE ONLY: Simple Buttons */}
        <div className="w-full max-w-sm flex md:hidden flex-col items-center justify-center gap-4 mb-16 px-4">
          {/* Instagram Button */}
          <a 
            href="https://www.instagram.com/drantoniocarloslage/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="glass-card pointer-events-auto flex items-center justify-center gap-3 px-8 py-4 hover:bg-white/40 transition-colors w-full"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5 text-gray-700">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
            <span className="text-label text-gray-800 m-0">Siga no Instagram</span>
          </a>

          {/* Spotify Button */}
          <a 
            href="https://open.spotify.com/track/6kkwzB6hXLIONkEk9JciA6" 
            target="_blank" 
            rel="noopener noreferrer"
            className="glass-card pointer-events-auto flex items-center justify-center gap-3 px-8 py-4 hover:bg-white/40 transition-colors w-full"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-gray-700">
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.24 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15.001 10.62 18.66 12.84c.361.181.54.78.301 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.6.18-1.2.72-1.38 4.26-1.26 11.28-1.02 15.72 1.621.539.3.719 1.02.419 1.56-.239.54-.959.72-1.559.3z" />
            </svg>
            <span className="text-label text-gray-800 m-0">Ouça no Spotify</span>
          </a>
        </div>

        {/* Call to Action Final & Footer Info - Single Flow */}
        <div className="mt-8 md:mt-4 flex flex-col items-center gap-5 text-center pointer-events-auto w-full mb-16 md:mb-6">
          <div className="flex flex-col items-center gap-4">
            <h2 className="text-display text-2xl sm:text-3xl md:text-4xl text-white font-medium">
              Pronto para dar o primeiro passo?
            </h2>
            <a 
              href="https://wa.me/5527998644435" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-2 px-8 py-3 bg-white text-[#28201e] rounded-full text-xs font-bold tracking-widest uppercase transition-transform hover:scale-105 shadow-lg"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              AGENDAR CONSULTA
            </a>
          </div>
        </div>
      </div>
      
      {/* Simple Footer Credit */}
      <div className="w-full flex flex-col items-center mt-auto border-t border-white/10 pt-6 pb-12 md:pb-8 relative z-10">
        <span className="text-label text-gray-400 text-center px-4 leading-relaxed max-w-[280px] md:max-w-none">
          Dr. Antônio Carlos • Médico CRM-3916 • Homeopatia RQE-3783
        </span>
      </div>
    </section>
  );
};
