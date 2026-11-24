import React from 'react';
import { HeroSection } from './HeroSection';
import { SymptomsSection } from './SymptomsSection';
import { SymptomsCarousel } from './SymptomsCarousel';
import { FaqSection } from './FaqSection';
import { MobileCarousel } from './MobileCarousel';

/** Test layout for the symptoms scene. Set to false to go back to the card grid. */
const SYMPTOMS_AS_CAROUSEL = true;

// All texts below come from the client's rewritten copy (concise version).
const CARE_STEPS = [
  ['Escutar e investigar', 'compreender sintomas, história e contexto clínico.'],
  ['Definir o caminho', 'construir um plano terapêutico adequado às necessidades identificadas.'],
  ['Acompanhar e ajustar', 'avaliar a evolução e rever condutas quando necessário.'],
];

// "Como são os encontros comigo?" — written by Dr. Antônio Carlos himself (more personal tone).
const ENCOUNTER_PARAGRAPHS = [
  'Cada encontro começa com uma boa conversa. Quero conhecer você, ouvir o que está vivendo, o que está sentindo e o que o trouxe até aqui.',
  'Não olho apenas para a doença ou para os sintomas. Olho para você como um todo. Seu corpo, suas emoções, sua história, seus relacionamentos, suas crenças e o sentido que dá à própria vida.',
  'Ao longo do nosso trabalho, utilizo diferentes recursos da medicina integrativa e da psicoterapia, de acordo com o que você precisa. Às vezes, precisamos cuidar do corpo. Outras vezes, olhar para antigas feridas, compreender conflitos ou descobrir novas maneiras de lidar com a vida.',
  'Não tenho respostas prontas para você. Meu papel é ajudar a encontrar suas próprias respostas, reconhecer suas forças e recuperar a confiança em si mesmo.',
  'É um caminho que construímos juntos, respeitando seu tempo, sua história e sua maneira única de ser.',
];
const ENCOUNTER_CLOSING = 'Mais do que aliviar sintomas, meu propósito é ajudar você a viver com mais saúde, consciência, liberdade e sentido.';


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

      <section id="scene-abordagem" className="scene encounters pointer-events-auto" aria-labelledby="approach-title">
        <figure className="encounters-photo">
          <img src="/dr-antonio-encontros.webp" alt="Dr. Antônio Carlos de Lacerda Lage em seu consultório" width="900" height="940" loading="lazy" decoding="async" />
        </figure>
        <div className="encounters-text">
          <h2 id="approach-title">Como são os encontros comigo?</h2>
          {ENCOUNTER_PARAGRAPHS.map(text => <p key={text}>{text}</p>)}
          <p className="encounters-closing">{ENCOUNTER_CLOSING}</p>
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


    <FaqSection />
  </div>
);
