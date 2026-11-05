import React from 'react';

export const Footer: React.FC = () => {
  return (
    <section
      className="scene contact-footer min-h-screen w-full relative flex flex-col justify-between items-center px-5 sm:px-8 md:px-14 lg:px-20 z-10 py-6 md:py-8"
      id="scene-6"
    >
      {/* White band behind the social cards, above the dark contact area. */}
      <div className="contact-surface absolute inset-0 -z-10"></div>

      <div className="fit-content footer-layout w-full max-w-5xl flex flex-col items-center">
      <div className="w-full flex flex-col items-center justify-center">
        {/* DESKTOP ONLY: Compact Social Grid */}
        <div className="footer-social hidden md:grid w-full max-w-3xl grid-cols-2 gap-5 mb-5">
          {/* Instagram Block */}
          <div className="glass-card pointer-events-auto p-4 md:p-5 flex flex-col items-center justify-between" style={{ borderRadius: '1.5rem' }}>
            <div className="flex items-center gap-2 mb-2.5">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4 text-[#28616a]">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
              <span className="text-label text-[10px] text-[#28616a]">Instagram</span>
            </div>

            <div className="social-preview w-full h-[80px] bg-white/30 rounded-xl border border-white/50 flex items-center justify-center mb-3">
              <span className="text-xs text-[#5f7477] font-medium tracking-wide">@drantoniocarloslage</span>
            </div>

            <a
              href="https://www.instagram.com/drantoniocarloslage/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline w-full justify-center py-1.5 text-[11px] text-[#163f49] border-[#163f49] hover:bg-[#163f49] hover:text-[#fbf7ed]"
            >
              Ver Perfil
            </a>
          </div>

          {/* Spotify Block */}
          <div className="glass-card pointer-events-auto p-4 md:p-5 flex flex-col items-center justify-between" style={{ borderRadius: '1.5rem' }}>
            <div className="flex items-center gap-2 mb-2.5">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-[#28616a]">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.24 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15.001 10.62 18.66 12.84c.361.181.54.78.301 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.6.18-1.2.72-1.38 4.26-1.26 11.28-1.02 15.72 1.621.539.3.719 1.02.419 1.56-.239.54-.959.72-1.559.3z" />
              </svg>
              <span className="text-label text-[10px] text-[#28616a]">Spotify</span>
            </div>

            <div className="social-preview w-full h-[80px] flex items-center justify-center mb-3 rounded-xl overflow-hidden shadow-xs">
              <iframe
                style={{ borderRadius: '12px' }}
                src="https://open.spotify.com/embed/track/6kkwzB6hXLIONkEk9JciA6?utm_source=generator&theme=0"
                width="100%"
                height="80"
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
              className="btn-outline w-full justify-center py-1.5 text-[11px] text-[#163f49] border-[#163f49] hover:bg-[#163f49] hover:text-[#fbf7ed]"
            >
              Ouvir Mais
            </a>
          </div>
        </div>

        {/* MOBILE ONLY: Simple Buttons */}
        <div className="w-full max-w-xs flex md:hidden flex-col items-center justify-center gap-3 mb-8 px-2">
          {/* Instagram Button */}
          <a
            href="https://www.instagram.com/drantoniocarloslage/"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card pointer-events-auto flex items-center justify-center gap-2.5 px-6 py-3 hover:bg-white/40 transition-colors w-full"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4 text-[#28616a]">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
            <span className="text-label text-[#163f49] m-0">Siga no Instagram</span>
          </a>

          {/* Spotify Button */}
          <a
            href="https://open.spotify.com/track/6kkwzB6hXLIONkEk9JciA6"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card pointer-events-auto flex items-center justify-center gap-2.5 px-6 py-3 hover:bg-white/40 transition-colors w-full"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-[#28616a]">
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.24 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15.001 10.62 18.66 12.84c.361.181.54.78.301 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.6.18-1.2.72-1.38 4.26-1.26 11.28-1.02 15.72 1.621.539.3.719 1.02.419 1.56-.239.54-.959.72-1.559.3z" />
            </svg>
            <span className="text-label text-[#163f49] m-0">Ouça no Spotify</span>
          </a>
        </div>

        <div className="contact-copy mt-3 flex flex-col items-center gap-3 text-center pointer-events-auto w-full max-w-4xl mb-4 px-2">
          <span className="text-label text-[#d7b36c]">Atendimento e acompanhamento</span>
          <h2 className="text-display text-xl sm:text-2xl text-white">Um cuidado construído com você</h2>
          <div className="care-cards grid sm:grid-cols-3 gap-3 w-full text-left">
            {[
              ['01', 'Escuta e avaliação', 'A primeira consulta acolhe o que você sente e investiga sua história pessoal e clínica.'],
              ['02', 'Plano individualizado', 'Necessidades, objetivos e possibilidades orientam um plano construído em conjunto.'],
              ['03', 'Acompanhamento', 'Consultas médicas, psicoterapia e consciência corporal, conforme a indicação e a escolha compartilhada.'],
            ].map(([number, title, text]) => <div key={number} className="care-card rounded-2xl border border-white/20 bg-white/5 p-4"><span className="text-[10px] tracking-widest text-[#d7b36c]">{number}</span><h3 className="text-heading text-base text-white mt-1">{title}</h3><p className="text-xs text-white/85 leading-relaxed mt-2">{text}</p></div>)}
          </div>
          <div className="care-booking flex flex-col items-center gap-2 rounded-2xl border border-[#d7b36c]/30 bg-white/5 px-5 py-3 w-full mt-1">
            <p className="text-heading text-lg text-white">O primeiro passo é uma conversa.</p>
            <p className="text-xs text-[#fbf7ed]/85">Presencial ou por telemedicina • Consulte a disponibilidade no agendamento.</p>
            <a
              href="https://wa.me/5527998644435?text=Ol%C3%A1%2C%20gostaria%20de%20agendar%20uma%20consulta%20com%20Dr.%20Ant%C3%B4nio%20Carlos%20Lage."
              target="_blank"
              rel="noopener noreferrer"
              className="consultation-cta mt-1 inline-flex items-center justify-center gap-3 px-7 py-2.5 bg-[#d7b36c] text-[#163f49] rounded-full text-[11px] font-bold tracking-widest uppercase transition-transform hover:scale-105 shadow-lg"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              Agende uma consulta
            </a>
          </div>
        </div>
      </div>

      <h2 className="text-display text-xl sm:text-2xl text-center text-white max-w-3xl px-4 mt-3 mb-4">Cuidar do corpo. Compreender a alma. Despertar a consciência.</h2>
      <p className="text-quote text-sm text-[#eed7a0] text-center px-4 mb-4">Da consciência governada pelo medo à consciência guiada pelo amor.</p>

      {/* Simple Footer Credit */}
      <div className="w-full flex flex-col items-center border-t border-[#6eaaa5]/20 pt-3 pb-2 relative z-10">
        <span className="text-label text-[10px] text-[#6eaaa5]/80 text-center px-4 leading-relaxed max-w-[280px] md:max-w-none">
          Dr. Antônio Carlos Lage • Médico CRM-3916 • Homeopatia RQE-3783
        </span>
      </div>
      </div>
    </section>
  );
};
