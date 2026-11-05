import React from 'react';
import { HeroSection } from './HeroSection';
import { SymptomsSection } from './SymptomsSection';
import { TrajectorySection } from './TrajectorySection';

const METHOD_STEPS = [
  {
    number: '1',
    title: 'Escutar',
    description:
      'Acolher a queixa e conhecer a história de vida, os sintomas, os exames e as experiências significativas.',
  },
  {
    number: '2',
    title: 'Investigar',
    description:
      'Identificar fatores físicos, emocionais, comportamentais e relacionais que possam contribuir para o sofrimento.',
  },
  {
    number: '3',
    title: 'Perceber',
    description:
      'Ampliar a consciência das sensações, emoções, respostas corporais e padrões habituais.',
  },
  {
    number: '4',
    title: 'Integrar',
    description:
      'Utilizar recursos médicos, psicoterapêuticos e corporais conforme as necessidades e indicações individuais.',
  },
  {
    number: '5',
    title: 'Transformar',
    description:
      'Favorecer escolhas mais conscientes, autonomia, capacidade de autorregulação e qualidade de vida.',
  },
];

export const ScrollOverlay: React.FC = () => {
  return (
    <div className="relative w-full text-gray-800 font-sans pointer-events-none">
      {/* SCENE 1: Hero (1. Seção de acolhimento — Um olhar para além dos sintomas) */}
      <HeroSection />

      {/* SCENE 2 (SINTOMAS): O que seu corpo e suas emoções estão expressando? */}
      <SymptomsSection />

      {/* SCENE 3 (CAMINHO): Como o método integra essas experiências — Do sintoma à consciência */}
      <section
        className="scene content-scene min-h-screen w-full flex flex-col justify-center items-center py-8 md:py-10 pl-5 pr-10 sm:px-10 md:px-14 lg:px-20 bg-cover bg-center bg-no-repeat"
        id="scene-caminho"
        style={{ backgroundImage: 'url(/background2.png)' }}
      >
        <div className="glass-card pointer-events-auto w-full max-w-3xl p-5 sm:p-6 md:p-7 flex flex-col items-center">
          <span className="text-label uppercase tracking-widest text-[#d7b36c] font-bold text-[10px] mb-1 text-center">
            Como o Método Integra Essas Experiências
          </span>
          <h2
            className="text-display text-xl sm:text-2xl md:text-[28px] leading-tight text-center"
            style={{ color: '#163f49' }}
          >
            Do sintoma à consciência
          </h2>

          {/* Lista compacta com linha conectora que cabe 100% em telas de notebook, tablet e celular */}
          <div className="mt-7 md:mt-8 w-full max-w-2xl space-y-4 sm:space-y-5">
            {METHOD_STEPS.map((step, idx) => (
              <div key={step.number} className="relative flex items-stretch gap-3 sm:gap-4 text-left">
                {/* Coluna do número + linha vertical */}
                <div className="flex flex-col items-center shrink-0">
                  <div
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-bold text-xs shadow-xs border"
                    style={{
                      background: '#163f49',
                      color: '#fbf7ed',
                      borderColor: 'rgba(215, 179, 108, 0.5)',
                    }}
                  >
                    {step.number}
                  </div>
                  {idx < METHOD_STEPS.length - 1 && (
                    <div
                      className="w-[2px] flex-1 min-h-[1rem] mt-1"
                      style={{ background: 'rgba(83, 183, 174, 0.35)' }}
                    />
                  )}
                </div>

                {/* Conteúdo compacto do passo */}
                <div
                  className="flex-1 py-3.5 px-4 sm:py-4 sm:px-5 rounded-xl border transition-transform duration-300 hover:translate-x-1"
                  style={{
                    background: 'rgba(251, 247, 237, 0.75)',
                    borderColor: 'rgba(255, 255, 255, 0.78)',
                  }}
                >
                  <h3 className="text-heading text-sm sm:text-base font-semibold text-[#163f49] leading-tight">
                    {step.title}
                  </h3>
                  <p className="text-body text-[11.5px] sm:text-xs md:text-[13px] mt-1.5 text-[#5f7477] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SCENE 4: Promessa */}
      <section
        className="scene content-scene min-h-screen w-full flex flex-col justify-center items-center py-10 pl-5 pr-10 sm:px-12 md:px-16 lg:px-24 bg-cover bg-center bg-no-repeat"
        id="scene-2"
        style={{ backgroundImage: 'url(/background2.png)' }}
      >
        <div className="glass-card pointer-events-auto w-full max-w-xl p-6 md:p-8 flex flex-col items-center text-center">
          <span className="text-label text-[10px]">A Promessa</span>
          <blockquote className="text-heading text-lg sm:text-xl md:text-2xl mt-3 leading-snug" style={{ color: '#163f49' }}>
            "Transformar o que o corpo revela e a história repete em consciência, autoridade interior e novas escolhas."
          </blockquote>
          <p className="text-body text-xs sm:text-sm md:text-[15px] mt-3 max-w-lg leading-relaxed">
            Um cuidado que integra corpo, emoções, história e relações para que você compreenda seus padrões e encontre uma forma mais livre e consciente de viver.
          </p>
        </div>
      </section>

      {/* SCENE 5 (MÉTODO): O Corpo como Caminho para a Consciência */}
      <section
        className="scene content-scene min-h-screen w-full flex flex-col justify-center items-center py-10 pl-5 pr-10 sm:px-12 md:px-16 lg:px-24 bg-cover bg-center bg-no-repeat"
        id="scene-3"
        style={{ backgroundImage: 'url(/background2.png)' }}
      >
        <div className="glass-card pointer-events-auto w-full max-w-3xl p-6 md:p-8 flex flex-col items-center text-center">
          <span className="text-label uppercase tracking-widest text-[#d7b36c] font-bold text-[10px] mb-1.5">
            Método Autoral
          </span>
          <h2 className="text-display text-xl sm:text-2xl md:text-3xl mt-1" style={{ color: '#163f49' }}>
            O Corpo como Caminho para a Consciência
          </h2>
          <p className="text-body font-semibold text-sm sm:text-base md:text-[17px] mt-4" style={{ color: '#28616a' }}>
            O corpo não é o destino final.<br />
            É o lugar onde a consciência começa e se reencontra.
          </p>
          <p
            className="text-body text-xs sm:text-sm md:text-[15px] mt-3 text-center max-w-xl leading-relaxed"
            style={{ color: '#5f7477' }}
          >
            O corpo guarda e expressa nossa história. Ao escutá-lo, sensações, sintomas, emoções e vínculos ganham significado. Padrões tornam-se conscientes e novas escolhas podem emergir — mais livres, coerentes e próprias.
          </p>
        </div>
      </section>

      {/* SCENE 6 (TRAJETÓRIA): A Grande Trajetória */}
      <TrajectorySection />

      {/* SCENE 7: Síntese */}
      <section
        className="scene content-scene min-h-screen w-full hidden md:flex flex-col justify-center items-center py-10 pl-6 pr-12 sm:px-12 md:px-16 lg:px-24"
        id="scene-5"
        style={{ background: 'linear-gradient(170deg, #f3e7d1 0%, #f8f4ec 50%, #eef6f5 100%)' }}
      >
        <div className="glass-card pointer-events-auto w-full max-w-2xl p-6 md:p-8 flex flex-col items-center text-center">
          <span className="text-label uppercase tracking-widest text-[#d7b36c] font-bold text-[10px] mb-1.5">
            A Síntese
          </span>

          {/* Cards elegantes e centralizados */}
          <div
            className="flex md:flex-wrap overflow-x-auto md:overflow-visible snap-x snap-mandatory md:justify-center gap-2.5 md:gap-3 mt-5 mb-5 w-full max-w-2xl px-4 md:px-0 pb-2 md:pb-0 scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {[
              'O organismo reage',
              'A sensação informa',
              'A consciência percebe',
              'A regulação permanece',
              'O símbolo amplia',
              'A história contextualiza',
              'A autoridade escolhe',
              'A ação encarna',
            ].map((text, i) => (
              <div
                key={i}
                className="snap-center shrink-0 px-4 py-2.5 rounded-full border text-[11px] md:text-xs font-bold tracking-wider uppercase flex items-center justify-center text-center"
                style={{
                  background: 'rgba(251, 247, 237, 0.76)',
                  borderColor: 'rgba(255, 255, 255, 0.68)',
                  color: '#163f49',
                  boxShadow: '0 4px 16px rgba(22, 63, 73, 0.05)',
                }}
              >
                {text}
              </div>
            ))}
          </div>

          <div className="text-body text-xs sm:text-sm md:text-[15px] mt-3 text-[#5f7477]">
            <p>
              O corpo deixa de ser apenas aquilo que dói, que envelhece ou precisa ser corrigido.<br />
              <span className="text-[#163f49] font-bold mt-1.5 block">
                Torna-se casa, recurso, presença e possibilidade.
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* SCENE 8: O Princípio */}
      <section
        className="scene content-scene min-h-screen w-full flex flex-col justify-center items-center py-10 pl-5 pr-10 sm:px-12 md:px-16 lg:px-24"
        id="scene-5b"
        style={{ background: 'linear-gradient(170deg, #eef6f5 0%, #f8f4ec 50%, #f3e7d1 100%)' }}
      >
        <div className="glass-card pointer-events-auto w-full max-w-xl p-6 md:p-8 flex flex-col items-center text-center">
          <span className="text-label uppercase tracking-widest text-[#d7b36c] font-bold text-[10px] mb-1.5">
            O Princípio
          </span>
          <h2 className="text-display text-xl sm:text-2xl md:text-3xl mt-1" style={{ color: '#163f49' }}>
            A Essência do Método
          </h2>
          <div
            className="mt-5 p-4 md:p-6 rounded-2xl text-center w-full"
            style={{
              background: 'rgba(251, 247, 237, 0.7)',
              border: '1px solid rgba(22, 63, 73, 0.1)',
            }}
          >
            <p className="text-quote text-sm sm:text-base md:text-lg font-playfair text-[#163f49] italic leading-relaxed">
              “O caminho não é libertar a consciência do corpo, mas ampliar a consciência para habitá-lo com presença, liberdade, responsabilidade e sentido.”
            </p>
          </div>
        </div>
      </section>

      {/* SCENE 9 (ACOMPANHAMENTO): Um cuidado construído com você */}
      <section
        className="scene content-scene min-h-screen w-full flex flex-col justify-center items-center py-10 pl-5 pr-10 sm:px-12 md:px-16 lg:px-24 bg-cover bg-center bg-no-repeat"
        id="scene-acompanhamento"
        style={{ backgroundImage: 'url(/background2.png)' }}
      >
        <div className="glass-card pointer-events-auto w-full max-w-2xl p-5 sm:p-7 md:p-8 flex flex-col items-center text-center">
          <span className="text-label uppercase tracking-widest text-[#d7b36c] font-bold text-[10px] mb-1">
            Apresentação do Acompanhamento
          </span>
          <h2 className="text-display text-xl sm:text-2xl md:text-3xl mt-1" style={{ color: '#163f49' }}>
            Um cuidado construído com você
          </h2>

          <p className="text-body text-xs sm:text-sm md:text-[14.5px] mt-4 max-w-xl text-[#5f7477] leading-relaxed">
            A primeira consulta é dedicada à escuta e à avaliação abrangente da pessoa. A partir dela, construímos uma proposta individualizada de acompanhamento, considerando necessidades clínicas, objetivos terapêuticos e o momento de vida.
          </p>

          <p className="text-body text-xs sm:text-sm md:text-[14.5px] mt-2.5 max-w-xl text-[#5f7477] leading-relaxed">
            As sessões podem ocorrer semanalmente, mensalmente ou em intervalos maiores, de acordo com a estratégia definida em conjunto.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-5 w-full">
            {[
              {
                title: '1ª Consulta',
                subtitle: 'Escuta profunda e avaliação clínica abrangente',
              },
              {
                title: 'Plano Singular',
                subtitle: 'Proposta terapêutica alinhada ao seu momento de vida',
              },
              {
                title: 'Ritmo Flexível',
                subtitle: 'Encontros semanais, mensais ou conforme a necessidade',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="p-3 rounded-xl border text-center"
                style={{
                  background: 'rgba(251, 247, 237, 0.75)',
                  borderColor: 'rgba(255, 255, 255, 0.78)',
                }}
              >
                <strong className="text-[11px] uppercase tracking-widest font-bold text-[#163f49] block">
                  {item.title}
                </strong>
                <span className="text-[11.5px] text-[#5f7477] mt-1 block leading-snug">
                  {item.subtitle}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
