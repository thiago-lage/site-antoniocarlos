import React from 'react';
import { HeroSection } from './HeroSection';
import { SymptomsSection } from './SymptomsSection';
import { SymptomsCarousel } from './SymptomsCarousel';
import { DnaBackground } from './DnaBackground';
import { MobileCarousel } from './MobileCarousel';

/** Test layout for the symptoms scene. Set to false to go back to the card grid. */
const SYMPTOMS_AS_CAROUSEL = true;

// All texts below come from the client's rewritten copy (concise version).
const CARE_STEPS = [
  ['Escutar e investigar', 'compreender sintomas, história e contexto clínico.'],
  ['Definir o caminho', 'construir um plano terapêutico adequado às necessidades identificadas.'],
  ['Acompanhar e ajustar', 'avaliar a evolução e rever condutas quando necessário.'],
];

const APPROACH_PARAGRAPHS = [
  'O ser humano não se resume ao funcionamento de seus órgãos nem aos sintomas que apresenta.',
  'Sua saúde envolve fatores biológicos, emocionais, comportamentais, relacionais e existenciais que podem interagir de maneiras diferentes.',
  'Minha abordagem considera essas dimensões sem perder o rigor da avaliação médica.',
  'O tratamento é construído a partir das necessidades identificadas, com recursos adequados, objetivos claros e acompanhamento quando necessário.',
];

const ATTENDANCE = [
  ['Primeira consulta', 'Avaliação clínica e compreensão dos sintomas, da história pessoal e dos fatores relevantes para sua saúde.'],
  ['Plano terapêutico', 'Definição compartilhada das prioridades, dos recursos indicados e dos objetivos do tratamento.'],
  ['Acompanhamento', 'Quando necessário, encontros periódicos para avaliar a evolução e ajustar as condutas.'],
];

const ABOUT = [
  // Featured first: the client asked for his experience with groups and human development to stand out.
  ['Experiência', 'Minha experiência inclui atendimento individual, grupos vivenciais e acompanhamento de processos de amadurecimento emocional, relacional e existencial.'],
  ['Trajetória', 'Sou médico, homeopata e psicoterapeuta, com trajetória em medicina integrativa, diferentes abordagens psicoterapêuticas e processos de desenvolvimento humano.'],
  ['Formação', 'Minha formação abrange Homeopatia, Medicina Tradicional Chinesa, Medicina Antroposófica, Ayurveda, Medicina Funcional Integrativa e Medicina do Esporte, além de estudos em Psicologia Junguiana, Psicodrama, Arteterapia, terapias corporais e outras abordagens de desenvolvimento humano.'],
];

const sectionClass = 'scene content-scene centered-scene w-full flex flex-col items-center px-5 pr-10 sm:px-10 md:px-14 lg:px-20 bg-cover bg-center bg-no-repeat';
const cardClass = 'fit-content glass-card editorial-card pointer-events-auto w-full max-w-4xl p-6 md:p-8 text-center';

export const ScrollOverlay: React.FC = () => (
  <div className="relative w-full text-gray-800 font-sans pointer-events-none">
    <HeroSection />
    <div className="light-flow">
      <section id="scene-intro" className={sectionClass} aria-labelledby="intro-title">
        <div className={cardClass}>
          <h2 id="intro-title" className="text-display intro-lead">A doença tem um diagnóstico. A pessoa tem uma história.</h2>
          <p className="editorial-body mt-4">Pessoas com o mesmo diagnóstico podem apresentar necessidades diferentes.</p>
          <p className="editorial-body mt-3">Minha abordagem integra investigação médica e escuta da história de vida para compreender os fatores envolvidos no adoecimento e orientar um cuidado individualizado.</p>
          <p className="text-label mt-6">Como funciona o cuidado</p>
          <MobileCarousel className="grid md:grid-cols-3 gap-3 mt-3 text-left" dotsClassName="text-[#28616a]" label="Como funciona o cuidado">
            {CARE_STEPS.map(([title, text], index) => (
              <div key={title} className="glass-card-inner p-4">
                <span className="text-label text-[9px]">0{index + 1}</span>
                <h3 className="text-heading text-lg text-[#163f49] mt-1">{title}</h3>
                <p className="editorial-body mt-1.5">{text}</p>
              </div>
            ))}
          </MobileCarousel>
        </div>
      </section>

      {SYMPTOMS_AS_CAROUSEL ? <SymptomsCarousel /> : <SymptomsSection />}
    </div>

    <section id="scene-5b" className={sectionClass} style={{ backgroundImage: 'url(/background-sobre-realista.webp)' }} aria-labelledby="about-title">
      <div className="fit-content glass-card editorial-card pointer-events-auto w-full max-w-5xl p-4 md:p-6">
        <div className="about-grid grid grid-cols-[minmax(0,1fr)] lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] gap-3 md:gap-4 text-left">
          <div className="about-left flex flex-col gap-3 md:gap-4 order-2 lg:order-1">
            <div className="about-item about-heading glass-card-inner p-5">
              <span className="about-pill">Sobre mim</span>
              <h2 id="about-title" className="text-display editorial-title mt-3">Dr. Antônio Carlos de Lacerda Lage</h2>
              <p className="text-heading text-base text-[#28616a] mt-1.5">Quatro décadas dedicadas à medicina e à compreensão do ser humano.</p>
            </div>
            <MobileCarousel className="about-cards" dotsClassName="text-[#28616a]" label="Sobre mim">
              {ABOUT.map(([title, text]) => (
                <div key={title} className={`about-item about-card glass-card-inner p-4 md:p-5${title === 'Experiência' ? ' is-featured' : ''}`}>
                  <h3 className="text-heading text-lg text-[#163f49]">{title}</h3>
                  <p className="editorial-body mt-1.5">{text}</p>
                </div>
              ))}
            </MobileCarousel>
            <p className="about-item about-closing text-heading text-[#28616a]">O que orienta meu trabalho é a integração entre conhecimento médico, escuta profunda e respeito à singularidade de cada pessoa.</p>
          </div>
          <figure className="about-item about-photo order-1 lg:order-2">
            <span className="about-chip about-chip-top">Médico CRM-3916</span>
            <img src="/dr-antonio-retrato.webp" alt="Dr. Antônio Carlos de Lacerda Lage" width="540" height="600" decoding="async" />
            <span className="about-chip about-chip-bottom">Homeopatia RQE - 3783</span>
          </figure>
        </div>
      </div>
    </section>

    <div className="dna-zone">
      <DnaBackground />
      <section id="scene-abordagem" className={sectionClass} aria-labelledby="approach-title">
        <div className={`${cardClass} max-w-5xl`}>
          <span className="text-label">Abordagem</span>
          <h2 id="approach-title" className="text-display editorial-title mt-2">Medicina integrativa: compreender para cuidar.</h2>
          <MobileCarousel className="grid md:grid-cols-2 gap-3 mt-5 text-left" dotsClassName="text-[#28616a]" label="Abordagem">
            {APPROACH_PARAGRAPHS.map(text => (
              <div key={text} className="glass-card-inner p-4">
                <p className="editorial-body">{text}</p>
              </div>
            ))}
          </MobileCarousel>
          <p className="approach-sync mt-6">
            <span>Escutar com profundidade.</span> <span>Investigar com critério.</span> <span>Cuidar com direção.</span>
          </p>
        </div>
      </section>

      <section id="scene-atendimento" className={sectionClass} aria-labelledby="attendance-title">
        <div className={cardClass}>
          <span className="text-label">Atendimento</span>
          <h2 id="attendance-title" className="text-display editorial-title mt-2">Um cuidado construído a partir de você.</h2>
          <MobileCarousel className="grid md:grid-cols-3 gap-3 mt-5 text-left" dotsClassName="text-[#28616a]" label="Atendimento">
            {ATTENDANCE.map(([title, text]) => (
              <div key={title} className="glass-card-inner p-4">
                <h3 className="text-heading text-lg text-[#163f49]">{title}</h3>
                <p className="editorial-body mt-1.5">{text}</p>
              </div>
            ))}
          </MobileCarousel>
          <p className="editorial-body mt-5">A duração e a frequência do acompanhamento respeitam as necessidades de cada pessoa.</p>
          <p className="text-heading text-base sm:text-lg text-[#28616a] mt-3">Mais do que repetir consultas, acompanhar é oferecer continuidade e direção ao cuidado.</p>
        </div>
      </section>
    </div>
  </div>
);
