import re
with open('src/components/ScrollOverlay.tsx', 'w', encoding='utf-8') as f:
    f.write('''import React, { useEffect, useState, useRef } from 'react';
import { HeroSection } from './HeroSection';
import { TrajectorySection } from './TrajectorySection';

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
        className={\	racking-widest text-xs font-bold text-gray-800 transition-all duration-1000 \\}
      >
        {title}
      </strong>
    </div>
  );
};

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
            Porque o corpo não é o destino final.<br/>
            É o lugar concreto onde a consciência começa, se perde, se reencontra e finalmente precisa aprender a viver.
          </p>
          <p className="text-body text-sm md:text-base mt-6 text-left" style={{ color: '#5f7477', lineHeight: '1.8' }}>
            O corpo, em O Corpo como Caminho para a Consciência, é simultaneamente realidade biológica, experiência vivida, campo de regulação, lugar de expressão relacional e via possível de simbolização. Sua escuta não autoriza causalidades psicológicas automáticas nem interpretações universais. O trabalho corporal busca ampliar percepção, flexibilidade regulatória, diferenciação entre passado e presente, capacidade de reconhecer impulsos sem ser governado por eles e possibilidade de encarnar novas escolhas. O corpo não é oráculo nem mero objeto: é território de experiência onde história, organismo, relação e consciência se encontram.
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
        <div className="glass-card pointer-events-auto w-full max-w-2xl p-6 md:p-10 flex flex-col items-center text-center">
          <span className="text-label uppercase tracking-widest text-[#d7b36c] font-bold text-xs mb-2">A Síntese</span>
          
          <div className="text-body font-semibold text-sm md:text-base mt-4 text-[#28616a] leading-relaxed">
            <p>O organismo reage.</p>
            <p>A sensação informa.</p>
            <p>A consciência percebe.</p>
            <p>A regulação permite permanecer.</p>
            <p>O símbolo amplia significado.</p>
            <p>A história contextualiza.</p>
            <p>A autoridade interior escolhe.</p>
            <p>A ação encarna.</p>
          </div>

          <div className="text-body text-sm md:text-base mt-6 text-[#5f7477]">
            <p>E o corpo deixa de ser apenas:<br/>
            aquilo que dói; aquilo que envelhece; aquilo que precisa ser corrigido.</p>
            <p className="mt-4 text-[#163f49] font-bold">
            Torna-se também:<br/>
            casa; fronteira; testemunha; recurso; presença; possibilidade.
            </p>
          </div>

          <p className="text-body text-sm mt-6 text-[#5f7477] italic">
            Por isso, o princípio corporal mais profundo do método pode ser formulado assim:
          </p>

          <div className="mt-4 p-4 md:p-6 rounded-2xl text-center w-full" style={{ background: 'rgba(251, 247, 237, 0.7)', border: '1px solid rgba(22, 63, 73, 0.1)' }}>
            <p className="text-quote text-base md:text-lg font-playfair text-[#163f49] italic leading-snug">
              "Não buscamos libertar a consciência do corpo. Buscamos uma consciência suficientemente ampliada para habitar o corpo com presença, respeito, liberdade e responsabilidade."
            </p>
          </div>
        </div>
      </section>
      
    </div>
  );
};
''')
