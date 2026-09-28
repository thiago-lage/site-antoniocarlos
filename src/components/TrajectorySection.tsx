import React from 'react';

const CARDS = [
  { title: "CORPO TEMIDO", quote: "“Há algo errado comigo.”" },
  { title: "CORPO OBSERVADO", quote: "“Percebo o que acontece.”" },
  { title: "CORPO SENTIDO", quote: "“Consigo permanecer com a experiência.”" },
  { title: "CORPO REGULADO", quote: "“Posso aproximar e afastar sem me perder.”" },
  { title: "CORPO SIMBÓLICO", quote: "“Uma imagem começa a nascer.”" },
  { title: "CORPO HISTÓRICO", quote: "“Reconheço como aprendi a reagir.”" },
  { title: "CORPO AUTORAL", quote: "“Posso escolher outra resposta.”" },
  { title: "CORPO ENCARNADO", quote: "“Minha nova consciência tornou-se gesto, postura, limite e vida.”" },
  { title: "CORPO HABITADO", quote: null, highlight: true },
];

export const TrajectorySection: React.FC = () => {
  return (
    <section
      className="scene w-full flex flex-col justify-center items-center py-24 relative overflow-hidden"
      id="scene-4"
    >
      <h2 
        className="animate-up text-display text-2xl sm:text-3xl md:text-4xl mt-2 mb-10 text-center w-full"
        style={{ color: '#163f49' }}
      >
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
        <div id="trajectory-track" className="relative flex items-stretch pb-12 pt-4 w-max px-[15vw] md:px-[25vw] gap-0">
          {CARDS.map((item, idx, arr) => (
            <div key={item.title} className="snap-center shrink-0 w-[280px] md:w-[320px] px-3 flex flex-col items-center">
              
              {/* Card - Fundo Vazado */}
              <div 
                className="w-full h-[160px] p-5 flex flex-col justify-center items-center text-center rounded-2xl border border-white/60 shadow-sm transition-transform hover:-translate-y-1 relative"
                style={{
                  background: item.highlight ? '#163f49' : 'rgba(251, 247, 237, 0.5)',
                  backdropFilter: 'blur(5px)',
                  WebkitBackdropFilter: 'blur(5px)'
                }}
              >
                {item.highlight ? (
                  <>
                    <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full flex items-center justify-center animate-pulse" style={{ background: '#d7b36c', color: '#163f49' }}>
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                    </div>
                    <strong className="tracking-widest text-sm font-bold text-[#fbf7ed] uppercase font-inter">
                      {item.title}
                    </strong>
                    <div className="mt-3 text-[#d7b36c] text-xs max-w-[80%] opacity-90 uppercase tracking-[0.2em] font-semibold">
                      Integração Plena
                    </div>
                  </>
                ) : (
                  <>
                    <strong className="tracking-widest text-xs font-bold text-[#163f49] uppercase font-inter">
                      {item.title}
                    </strong>
                    {item.quote && (
                      <span className="text-[12.5px] text-[#28616a] font-playfair italic mt-3 leading-snug px-5">
                        {item.quote}
                      </span>
                    )}
                  </>
                )}
              </div>

              {/* Timeline Line & Dot (o----o----o) */}
              <div className="w-full mt-6 flex items-center opacity-70">
                <div className="flex-1 h-[2px]" style={{ background: idx === 0 ? 'transparent' : '#53b7ae' }}></div>
                <div className="w-4 h-4 rounded-full shadow-sm shrink-0 transition-colors duration-500" style={{ background: item.highlight ? '#d7b36c' : '#53b7ae' }}></div>
                <div className="flex-1 h-[2px]" style={{ background: idx === arr.length - 1 ? 'transparent' : '#53b7ae' }}></div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
