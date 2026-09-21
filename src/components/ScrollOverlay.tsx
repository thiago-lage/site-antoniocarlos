import React, { useEffect, useState, useRef } from 'react';

const HabitatedCardContent: React.FC<{ title: string }> = ({ title }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.6 } // Trigger when 60% of the card is visible
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="w-full h-full flex flex-col justify-center items-center">
      <strong 
        className={`tracking-widest text-xs font-bold text-gray-800 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
        }`}
      >
        {title}
      </strong>
    </div>
  );
};

export const ScrollOverlay: React.FC = () => {
  return (
    <div className="relative w-full text-gray-800 font-sans pointer-events-none">
      {/* 
        We use pointer-events-none on the wrapper so we can still drag/interact with the 3D canvas behind it if needed, 
        but we re-enable pointer-events on the actual content cards.
        Also increased side padding (px-8 pr-12) to ensure cards don't touch the side navigation dots on mobile.
      */}

      {/* ─── SCENE 1: Hero ─── */}
      <section
        className="scene min-h-screen w-full flex flex-col justify-center items-center px-8 pr-12 sm:px-12 md:px-16 lg:px-24"
        id="scene-1"
      >
        <div className="w-full max-w-5xl relative flex flex-col md:flex-row items-center justify-center pointer-events-auto mt-4 md:mt-0 mb-16 md:mb-0">
          
          {/* DESKTOP ONLY: PHOTO (Overlapping Diagonally via Negative Margin) */}
          <div className="hidden md:block glass-card shrink-0 relative w-[260px] lg:w-[300px] h-[360px] lg:h-[400px] overflow-hidden z-20 shadow-xl p-0 -mr-[60px] lg:-mr-[80px]">
            <img
              src="/drAntonioCarlos.png"
              alt="Dr. Antônio Carlos"
              className="absolute inset-0 w-full h-full object-cover object-[center_20%]"
            />
            {/* Subtle inner gradient to blend with the glass edge */}
            <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(255,255,255,0.4)] pointer-events-none rounded-[2rem]"></div>
          </div>

          {/* RIGHT/CENTER: INFO CARD */}
          <div className="glass-card w-full md:flex-1 p-5 sm:p-6 md:p-10 md:pl-[90px] lg:pl-[120px] flex flex-col justify-between text-center md:text-left relative z-10">
            
            {/* MOBILE ONLY: Circular Avatar */}
            <div className="md:hidden flex justify-center mb-3 mt-1">
              <img
                src="/drAntonioCarlos.png"
                alt="Dr. Antônio Carlos"
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover object-top shadow-sm border-[3px] border-white/60"
              />
            </div>

            <div className="flex flex-col items-center md:items-start w-full">
              <span className="text-label text-gray-800">Dr. Antônio Carlos</span>
              <span className="text-[10px] md:text-xs text-gray-500 mt-1 mb-4 md:mb-6 block leading-relaxed">
                Médico CRM-3916 • Homeopatia RQE - 3783 <br className="hidden md:block" /> Saúde Mental, Corpo e Sistema
              </span>

              <h1 className="text-display text-[1.65rem] sm:text-3xl md:text-[2.5rem] text-gray-900 mb-3 md:mb-6 leading-tight">
                Diagnóstico detalhado <br className="hidden md:block" /> do seu corpo
              </h1>
              
              <p className="text-body text-[13px] md:text-sm text-gray-700 leading-snug md:leading-relaxed max-w-lg">
                "Trabalho ajudando pessoas a compreender como o corpo, as emoções, a história e os vínculos participam da forma como elas vivem e adoecem. Meu trabalho é ajudá-las a ampliar a consciência, recuperar a autoridade interior e encontrar maneiras mais inteiras de&nbsp;viver."
              </p>
            </div>
            
            <div className="mt-5 md:mt-8 flex flex-row items-center justify-center md:justify-between w-full">
              <a 
                href="https://wa.me/5527998644435" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-outline inline-flex justify-center items-center gap-2 px-8 py-3 w-full sm:w-auto shrink-0"
              >
                Agendar Consulta
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              </a>

              {/* DESKTOP ONLY: Social Icons */}
              <div className="hidden md:flex items-center gap-5 text-gray-400">
                <a href="https://www.instagram.com/drantoniocarloslage/" target="_blank" rel="noopener noreferrer" className="hover:text-turquesa transition-colors" title="Instagram">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
                <a href="https://open.spotify.com/track/6kkwzB6hXLIONkEk9JciA6" target="_blank" rel="noopener noreferrer" className="hover:text-turquesa transition-colors" title="Spotify">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.24 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15.001 10.62 18.66 12.84c.361.181.54.78.301 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.6.18-1.2.72-1.38 4.26-1.26 11.28-1.02 15.72 1.621.539.3.719 1.02.419 1.56-.239.54-.959.72-1.559.3z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SCENE 2: Promessa ─── */}
      <section
        className="scene min-h-screen w-full flex flex-col justify-center items-center px-8 pr-12 sm:px-12 md:px-16 lg:px-24"
        id="scene-2"
      >
        <div className="glass-card pointer-events-auto w-full max-w-xl p-6 md:p-8 flex flex-col items-center text-center">
          <span className="text-label">A Promessa</span>
          <blockquote className="text-heading text-xl sm:text-2xl md:text-3xl text-gray-800 mt-4 leading-snug">
            "Ajudo pessoas a transformar aquilo que o corpo sente e a história repete em consciência e escolha."
          </blockquote>
          <p className="text-body text-sm md:text-base mt-4 max-w-lg">
            Ajudar pessoas a transformar experiência corporal e história de vida em consciência, autoridade interior e liberdade responsável.
          </p>
        </div>
      </section>

      {/* ─── SCENE 3: Método ─── */}
      <section
        className="scene min-h-screen w-full flex flex-col justify-center items-center px-8 pr-12 sm:px-12 md:px-16 lg:px-24"
        id="scene-3"
      >
        <div className="glass-card pointer-events-auto w-full max-w-xl p-6 md:p-8 flex flex-col items-center text-center">
          <span className="text-label">O Método</span>
          <h2 className="text-display text-2xl sm:text-3xl md:text-4xl text-gray-800 mt-4">
            O Corpo como caminho para a consciência
          </h2>
          <p className="text-body text-sm md:text-base mt-4 max-w-lg">
            Porque o corpo não é o destino final. É o lugar concreto onde a consciência começa, se perde, se reencontra e finalmente precisa aprender a viver.
          </p>
        </div>
      </section>

      {/* ─── SCENE 4: Trajetória Timeline Horizontal (Scrolljack) ─── */}
      <section
        className="scene w-full flex flex-col justify-center items-center py-24 relative overflow-hidden"
        id="scene-4"
      >
        <h2 className="animate-up text-display text-2xl sm:text-3xl md:text-4xl text-gray-900 mt-2 mb-10 text-center w-full">
          A Grande Trajetória
        </h2>

        {/* GSAP Moving Track Container with Fade Edges */}
        <div 
          className="w-full overflow-hidden" 
          style={{
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 80%, transparent 100%)',
            maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 80%, transparent 100%)'
          }}
        >
          <div id="trajectory-track" className="flex items-stretch pb-12 pt-4 w-max px-[15vw] md:px-[25vw] gap-0">
            {[
              { title: 'CORPO TEMIDO', quote: '“Há algo errado comigo.”' },
            { title: 'CORPO OBSERVADO', quote: '“Percebo o que acontece.”' },
            { title: 'CORPO SENTIDO', quote: '“Consigo permanecer com a experiência.”' },
            { title: 'CORPO REGULADO', quote: '“Posso aproximar e afastar sem me perder.”' },
            { title: 'CORPO SIMBÓLICO', quote: '“Uma imagem começa a nascer.”' },
            { title: 'CORPO HISTÓRICO', quote: '“Reconheço como aprendi a reagir.”' },
            { title: 'CORPO AUTORAL', quote: '“Posso escolher outra resposta.”' },
            { title: 'CORPO ENCARNADO', quote: '“Minha nova consciência tornou-se gesto, postura, limite e vida.”' },
            { title: 'CORPO HABITADO', quote: null, highlight: true },
          ].map((item, idx, arr) => (
            <div key={item.title} className="snap-center shrink-0 w-[280px] md:w-[320px] px-3 flex flex-col items-center">
              
              {/* Card - Fundo Vazado */}
              <div 
                className="glass-card-inner w-full h-[160px] p-5 flex flex-col justify-center items-center text-center rounded-2xl border border-white/60 bg-white/30 backdrop-blur-md shadow-sm transition-transform hover:-translate-y-1 relative"
              >
                {item.highlight ? (
                  <HabitatedCardContent title={item.title} />
                ) : (
                  <>
                    <strong className="tracking-widest text-xs font-bold text-gray-800">
                      {item.title}
                    </strong>
                    {item.quote && (
                      <span className="text-[11px] text-gray-600 italic mt-3 leading-snug px-5">
                        {item.quote}
                      </span>
                    )}
                  </>
                )}
              </div>

              {/* Timeline Line & Dot (o----o----o) */}
              <div className="w-full mt-6 flex items-center opacity-70">
                <div className={`flex-1 h-[2px] ${idx === 0 ? 'bg-transparent' : 'bg-turquesa'}`}></div>
                <div className="w-3 h-3 rounded-full bg-turquesa shadow-sm shrink-0"></div>
                <div className={`flex-1 h-[2px] ${idx === arr.length - 1 ? 'bg-transparent' : 'bg-turquesa'}`}></div>
              </div>

            </div>
          ))}
        </div>
        </div>
      </section>

      {/* ─── SCENE 5: Síntese ─── */}
      <section
        className="scene min-h-screen w-full flex flex-col justify-center items-center px-8 pr-12 sm:px-12 md:px-16 lg:px-24"
        id="scene-5"
      >
        <div className="glass-card pointer-events-auto w-full max-w-xl p-6 md:p-8 flex flex-col items-center text-center">
          <span className="text-label">Síntese</span>
          <p className="text-body text-sm md:text-base mt-4 max-w-lg">
            O organismo reage. A sensação informa. A consciência percebe...
          </p>
          <p className="text-heading text-xl sm:text-2xl md:text-3xl text-gray-800 mt-4 leading-snug">
            Torna-se também: casa; fronteira; testemunha; recurso; presença; possibilidade.
          </p>
          <div className="mt-6 p-4 md:p-6 bg-white/30 rounded-2xl border border-white/50 text-center max-w-lg">
            <p className="text-quote text-sm md:text-base italic text-gray-700">
              "Não buscamos libertar a consciência do corpo. Buscamos uma consciência suficientemente ampliada para habitar o corpo com presença, respeito, liberdade e responsabilidade."
            </p>
            <p className="text-[10px] md:text-xs text-gray-500 mt-3 font-bold tracking-widest uppercase">
              — Antônio Carlos Lage
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};
