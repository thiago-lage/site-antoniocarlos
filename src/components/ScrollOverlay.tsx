import React from 'react';
import { HeroSection } from './HeroSection';
import { TrajectorySection } from './TrajectorySection';

export const ScrollOverlay: React.FC = () => {
  return (
    <div className="relative w-full text-gray-800 font-sans pointer-events-none">
      
      {/* SCENE 1: Hero */}
      <HeroSection />

      {/* SCENE 2: Promessa */}
      <section
        className="scene min-h-screen w-full flex flex-col justify-center items-center pl-6 pr-12 sm:px-12 md:px-16 lg:px-24"
        id="scene-2"
        style={{ background: 'linear-gradient(160deg, #f8f4ec 0%, #eef6f5 60%, #f3e7d1 100%)' }}
      >
        <div className="glass-card pointer-events-auto w-full max-w-xl p-6 md:p-10 flex flex-col items-center text-center">
          <span className="text-label">A Promessa</span>
          <blockquote className="text-heading text-xl sm:text-2xl md:text-3xl mt-4 leading-snug" style={{ color: '#163f49' }}>
            "Ajudo pessoas a transformar aquilo que o corpo sente e a história repete em consciência e escolha."
          </blockquote>
          <p className="text-body text-sm md:text-base mt-4 max-w-lg">
            Ajudar pessoas a transformar experiência corporal e história de vida em consciência, autoridade interior e liberdade responsável.
          </p>
        </div>
      </section>

      {/* SCENE 3: Método */}
      <section
        className="scene min-h-screen w-full flex flex-col justify-center items-center pl-6 pr-12 sm:px-12 md:px-16 lg:px-24"
        id="scene-3"
        style={{ background: 'linear-gradient(145deg, #eef6f5 0%, #f8f4ec 50%, #eef6f5 100%)' }}
      >
        <div className="glass-card pointer-events-auto w-full max-w-4xl p-6 md:p-10 flex flex-col items-center text-center">
          <span className="text-label uppercase tracking-widest text-[#d7b36c] font-bold text-xs mb-2">Método Autoral</span>
          <h2 className="text-display text-2xl sm:text-3xl md:text-4xl mt-2 uppercase tracking-wide" style={{ color: '#163f49' }}>
            O Corpo como Caminho para a Consciência
          </h2>
          <p className="text-body font-semibold text-base md:text-lg mt-6" style={{ color: '#28616a' }}>
            O corpo não é o destino final.<br/>
            É o lugar onde a consciência começa e se reencontra.
          </p>
          <p className="text-body text-sm md:text-base mt-4 text-center max-w-2xl" style={{ color: '#5f7477', lineHeight: '1.8' }}>
            O trabalho corporal busca reconectar você à sua percepção, oferecendo flexibilidade para encarnar novas escolhas de vida, sem a necessidade de interpretações prontas ou regras universais.
          </p>
        </div>
      </section>

      {/* SCENE 4: Trajetória */}
      <TrajectorySection />

      {/* SCENE 5: Síntese */}
      <section
        className="scene min-h-screen w-full flex flex-col justify-center items-center pl-6 pr-12 sm:px-12 md:px-16 lg:px-24"
        id="scene-5"
        style={{ background: 'linear-gradient(170deg, #f3e7d1 0%, #f8f4ec 50%, #eef6f5 100%)' }}
      >
        <div className="glass-card pointer-events-auto w-full max-w-3xl p-6 md:p-10 flex flex-col items-center text-center">
          <span className="text-label uppercase tracking-widest text-[#d7b36c] font-bold text-xs mb-2">A Síntese</span>
          
          {/* Cards elegantes e centralizados substituindo os tópicos */}
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 mt-8 mb-8 w-full max-w-3xl">
            {[
              'O organismo reage', 'A sensação informa', 
              'A consciência percebe', 'A regulação permanece', 
              'O símbolo amplia', 'A história contextualiza', 
              'A autoridade escolhe', 'A ação encarna'
            ].map((text, i) => (
              <div 
                key={i} 
                className="px-5 py-3 rounded-full border text-xs md:text-[13px] font-bold tracking-wider uppercase flex items-center justify-center text-center" 
                style={{ 
                  background: 'rgba(251, 247, 237, 0.76)', 
                  borderColor: 'rgba(255, 255, 255, 0.68)',
                  color: '#163f49',
                  boxShadow: '0 4px 16px rgba(22, 63, 73, 0.05)'
                }}
              >
                {text}
              </div>
            ))}
          </div>

          <div className="text-body text-sm md:text-base mt-6 text-[#5f7477]">
            <p>
              O corpo deixa de ser apenas aquilo que dói, que envelhece ou precisa ser corrigido.<br/>
              <span className="text-[#163f49] font-bold mt-2 block">Torna-se casa, recurso, presença e possibilidade.</span>
            </p>
          </div>
        </div>
      </section>

      {/* SCENE 5B: O Princípio */}
      <section
        className="scene min-h-screen w-full flex flex-col justify-center items-center pl-6 pr-12 sm:px-12 md:px-16 lg:px-24"
        id="scene-5b"
        style={{ background: 'linear-gradient(170deg, #eef6f5 0%, #f8f4ec 50%, #f3e7d1 100%)' }}
      >
        <div className="glass-card pointer-events-auto w-full max-w-2xl p-6 md:p-10 flex flex-col items-center text-center">
          <span className="text-label uppercase tracking-widest text-[#d7b36c] font-bold text-xs mb-2">O Princípio</span>
          <h2 className="text-display text-2xl sm:text-3xl mt-2 uppercase tracking-wide" style={{ color: '#163f49' }}>
            A Essência do Método
          </h2>
          <div className="mt-8 p-4 md:p-8 rounded-2xl text-center w-full" style={{ background: 'rgba(251, 247, 237, 0.7)', border: '1px solid rgba(22, 63, 73, 0.1)' }}>
            <p className="text-quote text-base md:text-xl font-playfair text-[#163f49] italic leading-relaxed">
              "Não buscamos libertar a consciência do corpo. Buscamos uma consciência suficientemente ampliada para habitar o corpo com presença, respeito, liberdade e responsabilidade."
            </p>
          </div>
        </div>
      </section>
      
    </div>
  );
};
