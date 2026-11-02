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
      {/* SCENE 1: Hero */}
      <HeroSection />

      {/* SCENE 2: Seção de Acolhimento + A Promessa */}
      <section
        className="scene min-h-screen w-full flex flex-col justify-center items-center py-20 pl-6 pr-12 sm:px-12 md:px-16 lg:px-24 bg-cover bg-center bg-no-repeat"
        id="scene-2"
        style={{ backgroundImage: 'url(/background2.png)' }}
      >
        <div className="glass-card pointer-events-auto w-full max-w-3xl p-6 sm:p-8 md:p-12 flex flex-col items-center text-center">
          <span className="text-label uppercase tracking-widest text-[#d7b36c] font-bold text-xs mb-2">
            Um Olhar Para Além dos Sintomas
          </span>
          <h2
            className="text-display text-2xl sm:text-3xl md:text-4xl mt-2 leading-snug"
            style={{ color: '#163f49' }}
          >
            Você chega com um sintoma.<br className="hidden sm:inline" /> Nós acolhemos a pessoa inteira.
          </h2>

          <p className="text-body text-sm md:text-base mt-6 max-w-2xl text-[#5f7477]">
            Ansiedade, tristeza, crises de pânico, insônia, cansaço e dores persistentes podem comprometer o bem-estar, os relacionamentos e a qualidade de vida.
          </p>

          <p className="text-body text-sm md:text-base mt-4 max-w-2xl text-[#5f7477]">
            Cada sintoma merece ser investigado com atenção, considerando tanto suas possíveis causas clínicas quanto a história singular de quem o vivencia.
          </p>

          <p
            className="text-body font-semibold text-base md:text-lg mt-6 max-w-2xl"
            style={{ color: '#163f49' }}
          >
            Cuidar é aliviar o sofrimento, compreender a pessoa e ampliar suas possibilidades de viver.
          </p>

          <div
            className="mt-8 p-5 md:p-6 rounded-2xl w-full max-w-2xl"
            style={{
              background: 'rgba(251, 247, 237, 0.72)',
              border: '1px solid rgba(215, 179, 108, 0.35)',
            }}
          >
            <span className="text-label text-[10px] uppercase tracking-widest text-[#6eaaa5] block mb-2">
              A Promessa
            </span>
            <blockquote
              className="text-quote text-base md:text-lg leading-relaxed"
              style={{ color: '#28616a' }}
            >
              “Transformar o que o corpo revela e a história repete em consciência, autoridade interior e novas escolhas.”
            </blockquote>
          </div>
        </div>
      </section>

      {/* SCENE 3 (SINTOMAS): O que seu corpo e suas emoções estão expressando? */}
      <SymptomsSection />

      {/* SCENE 4 (CAMINHO): Como o método integra essas experiências — Do sintoma à consciência */}
      <section
        className="scene min-h-screen w-full flex flex-col justify-center items-center py-20 pl-6 pr-12 sm:px-12 md:px-16 lg:px-24 bg-cover bg-center bg-no-repeat"
        id="scene-caminho"
        style={{ backgroundImage: 'url(/background2.png)' }}
      >
        <div className="glass-card pointer-events-auto w-full max-w-4xl p-6 sm:p-8 md:p-12 flex flex-col items-center">
          <span className="text-label uppercase tracking-widest text-[#d7b36c] font-bold text-xs mb-2 text-center">
            Como o Método Integra Essas Experiências
          </span>
          <h2
            className="text-display text-2xl sm:text-3xl md:text-4xl mt-1 text-center"
            style={{ color: '#163f49' }}
          >
            Do sintoma à consciência
          </h2>
          <p className="text-body text-sm md:text-base mt-3 text-center max-w-2xl text-[#5f7477]">
            Uma travessia cuidadosa que respeita o ritmo de cada pessoa, unindo o rigor clínico à escuta profunda da vida.
          </p>

          {/* Lista vertical com linha conectora fiel ao layout proposto */}
          <div className="mt-8 md:mt-10 w-full max-w-2xl space-y-6">
            {METHOD_STEPS.map((step, idx) => (
              <div key={step.number} className="relative flex items-start gap-4 sm:gap-6 text-left">
                {/* Coluna do número + linha vertical */}
                <div className="flex flex-col items-center shrink-0">
                  <div
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-sm shadow-sm border"
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
                      className="w-[2px] flex-1 min-h-[2.5rem] mt-2"
                      style={{ background: 'rgba(83, 183, 174, 0.35)' }}
                    />
                  )}
                </div>

                {/* Conteúdo do passo */}
                <div
                  className="flex-1 p-4 sm:p-5 rounded-2xl border transition-transform duration-300 hover:translate-x-1"
                  style={{
                    background: 'rgba(251, 247, 237, 0.72)',
                    borderColor: 'rgba(255, 255, 255, 0.75)',
                  }}
                >
                  <h3 className="text-heading text-lg sm:text-xl font-semibold text-[#163f49]">
                    {step.title}
                  </h3>
                  <p className="text-body text-xs sm:text-sm md:text-base mt-1.5 text-[#5f7477] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SCENE 5 (MÉTODO): O Corpo como Caminho para a Consciência */}
      <section
        className="scene min-h-screen w-full flex flex-col justify-center items-center py-20 pl-6 pr-12 sm:px-12 md:px-16 lg:px-24 bg-cover bg-center bg-no-repeat"
        id="scene-3"
        style={{ backgroundImage: 'url(/background2.png)' }}
      >
        <div className="glass-card pointer-events-auto w-full max-w-4xl p-6 md:p-10 flex flex-col items-center text-center">
          <span className="text-label uppercase tracking-widest text-[#d7b36c] font-bold text-xs mb-2">
            Método Autoral
          </span>
          <h2 className="text-display text-2xl sm:text-3xl md:text-4xl mt-2" style={{ color: '#163f49' }}>
            O Corpo como Caminho para a Consciência
          </h2>
          <p className="text-body font-semibold text-base md:text-lg mt-6" style={{ color: '#28616a' }}>
            O corpo não é o destino final.<br />
            É o lugar onde a consciência começa e se reencontra.
          </p>
          <p
            className="text-body text-sm md:text-base mt-4 text-center max-w-2xl"
            style={{ color: '#5f7477', lineHeight: '1.8' }}
          >
            Ao escutar o corpo, sensações e emoções ganham significado. Padrões tornam-se conscientes e novas escolhas podem emergir — mais livres, coerentes e próprias.
          </p>
        </div>
      </section>

      {/* SCENE 6 (TRAJETÓRIA): A Grande Trajetória */}
      <TrajectorySection />

      {/* SCENE 7: Síntese */}
      <section
        className="scene min-h-screen w-full hidden md:flex flex-col justify-center items-center pl-6 pr-12 sm:px-12 md:px-16 lg:px-24"
        id="scene-5"
        style={{ background: 'linear-gradient(170deg, #f3e7d1 0%, #f8f4ec 50%, #eef6f5 100%)' }}
      >
        <div className="glass-card pointer-events-auto w-full max-w-3xl p-6 md:p-10 flex flex-col items-center text-center">
          <span className="text-label uppercase tracking-widest text-[#d7b36c] font-bold text-xs mb-2">
            A Síntese
          </span>

          {/* Cards elegantes e centralizados */}
          <div
            className="flex md:flex-wrap overflow-x-auto md:overflow-visible snap-x snap-mandatory md:justify-center gap-3 md:gap-4 mt-8 mb-8 w-full max-w-3xl px-6 md:px-0 pb-4 md:pb-0 scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
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
                className="snap-center shrink-0 px-5 py-3 rounded-full border text-xs md:text-[13px] font-bold tracking-wider uppercase flex items-center justify-center text-center"
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

          <div className="text-body text-sm md:text-base mt-6 text-[#5f7477]">
            <p>
              O corpo deixa de ser apenas aquilo que dói, que envelhece ou precisa ser corrigido.<br />
              <span className="text-[#163f49] font-bold mt-2 block">
                Torna-se casa, recurso, presença e possibilidade.
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* SCENE 8: O Princípio */}
      <section
        className="scene min-h-screen w-full flex flex-col justify-center items-center pl-6 pr-12 sm:px-12 md:px-16 lg:px-24"
        id="scene-5b"
        style={{ background: 'linear-gradient(170deg, #eef6f5 0%, #f8f4ec 50%, #f3e7d1 100%)' }}
      >
        <div className="glass-card pointer-events-auto w-full max-w-2xl p-6 md:p-10 flex flex-col items-center text-center">
          <span className="text-label uppercase tracking-widest text-[#d7b36c] font-bold text-xs mb-2">
            O Princípio
          </span>
          <h2 className="text-display text-2xl sm:text-3xl mt-2" style={{ color: '#163f49' }}>
            A Essência do Método
          </h2>
          <div
            className="mt-8 p-4 md:p-8 rounded-2xl text-center w-full"
            style={{
              background: 'rgba(251, 247, 237, 0.7)',
              border: '1px solid rgba(22, 63, 73, 0.1)',
            }}
          >
            <p className="text-quote text-base md:text-xl font-playfair text-[#163f49] italic leading-relaxed">
              “O caminho não é libertar a consciência do corpo, mas ampliar a consciência para habitá-lo com presença, liberdade, responsabilidade e sentido.”
            </p>
          </div>
        </div>
      </section>

      {/* SCENE 9 (ACOMPANHAMENTO): Um cuidado construído com você */}
      <section
        className="scene min-h-screen w-full flex flex-col justify-center items-center py-20 pl-6 pr-12 sm:px-12 md:px-16 lg:px-24 bg-cover bg-center bg-no-repeat"
        id="scene-acompanhamento"
        style={{ backgroundImage: 'url(/background2.png)' }}
      >
        <div className="glass-card pointer-events-auto w-full max-w-3xl p-6 sm:p-8 md:p-12 flex flex-col items-center text-center">
          <span className="text-label uppercase tracking-widest text-[#d7b36c] font-bold text-xs mb-2">
            Apresentação do Acompanhamento
          </span>
          <h2 className="text-display text-2xl sm:text-3xl md:text-4xl mt-2" style={{ color: '#163f49' }}>
            Um cuidado construído com você
          </h2>

          <p className="text-body text-sm md:text-base mt-6 max-w-2xl text-[#5f7477] leading-relaxed">
            A primeira consulta é dedicada à escuta e à avaliação abrangente da pessoa. A partir dela, construímos uma proposta individualizada de acompanhamento, considerando necessidades clínicas, objetivos terapêuticos e o momento de vida.
          </p>

          <p className="text-body text-sm md:text-base mt-4 max-w-2xl text-[#5f7477] leading-relaxed">
            As sessões podem ocorrer semanalmente, mensalmente ou em intervalos maiores, de acordo com a estratégia definida em conjunto.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 w-full">
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
                className="p-4 rounded-2xl border text-center"
                style={{
                  background: 'rgba(251, 247, 237, 0.72)',
                  borderColor: 'rgba(255, 255, 255, 0.75)',
                }}
              >
                <strong className="text-xs uppercase tracking-widest font-bold text-[#163f49] block">
                  {item.title}
                </strong>
                <span className="text-xs text-[#5f7477] mt-1.5 block leading-snug">
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
