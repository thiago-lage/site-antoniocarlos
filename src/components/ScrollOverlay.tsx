import React from 'react';
import { HeroSection } from './HeroSection';
import { SymptomsSection } from './SymptomsSection';
import { DnaBackground } from './DnaBackground';

const METHOD_STEPS = [
  { title: 'Acolher e escutar', description: 'Compreender o sofrimento, a história de vida e as expectativas da pessoa.' },
  { title: 'Investigar e compreender', description: 'Avaliar sintomas, condições clínicas, hábitos, emoções, vínculos e questões existenciais.' },
  { title: 'Perceber e reconhecer', description: 'Desenvolver consciência corporal, identificar padrões e reconhecer recursos internos.' },
  { title: 'Integrar e cuidar', description: 'Construir um plano individualizado, utilizando abordagens médicas e psicoterapêuticas apropriadas.' },
  { title: 'Transformar e transcender', description: 'Ampliar a autonomia, fortalecer escolhas e cultivar uma vida coerente com os próprios valores.' },
];

const DIMENSIONS = [
  { title: 'Corpo', dimension: 'Dimensão biológica', text: 'Fisiologia, metabolismo, sintomas e doenças.' },
  { title: 'Psique', dimension: 'Dimensão emocional', text: 'Sentimentos, traumas, crenças e padrões de resposta.' },
  { title: 'Relações', dimension: 'Dimensão sistêmica', text: 'Vínculos, pertencimento e história familiar.' },
  { title: 'Transcendência', dimension: 'Dimensão existencial', text: 'Sentido, valores, espiritualidade e liberdade interior.' },
];

const APPROACHES = [
  { title: 'Medicina Integrativa', text: 'Investigação clínica abrangente, hábitos de vida, alimentação, sono, metabolismo e prevenção, articulando tratamentos convencionais e recursos complementares quando apropriados.' },
  { title: 'Psicoterapia e Autoconhecimento', text: 'Escuta das emoções, experiências de vida, conflitos, padrões relacionais e processos de desenvolvimento da consciência.' },
  { title: 'Consciência e Expressão Corporal', text: 'Recursos de percepção corporal, respiração, movimento e expressão emocional para ampliar a presença e a autorregulação.' },
  { title: 'Dimensão Existencial e Transcendente', text: 'Reflexão sobre propósito, valores, finitude, espiritualidade e liberdade interior, respeitando as crenças e a visão de mundo de cada pessoa.' },
];

const sectionClass = 'scene content-scene centered-scene w-full flex flex-col items-center px-5 pr-10 sm:px-10 md:px-14 lg:px-20 bg-cover bg-center bg-no-repeat';
const cardClass = 'fit-content glass-card editorial-card pointer-events-auto w-full max-w-4xl p-6 md:p-8 text-center';
const background = { backgroundImage: 'url(/background2.webp)' };

export const ScrollOverlay: React.FC = () => (
  <div className="relative w-full text-gray-800 font-sans pointer-events-none">
    <HeroSection />
    <div className="light-flow">
    <SymptomsSection />

    <div className="dna-zone">
      <DnaBackground />
    <section id="scene-2" className={sectionClass} aria-labelledby="dimensions-title">
      <div className={`${cardClass} max-w-5xl`}>
        <span className="text-label">O ser humano para além dos sintomas</span>
        <h2 id="dimensions-title" className="text-display editorial-title mt-2">Corpo, psique, relações e transcendência</h2>
        <div className="mt-5 grid md:grid-cols-2 gap-6 text-left items-center">
          <div className="editorial-body space-y-3">
            <p className="dimensions-lead">O adoecimento é um processo complexo, que pode envolver fatores biológicos, psicológicos, comportamentais, sociais e existenciais.</p>
            <p>Minha abordagem considera também a dimensão transcendente do ser: sua busca por sentido, seus valores fundamentais, sua espiritualidade e sua relação com aquilo que ultrapassa a própria individualidade.</p>
            <p>Perdas, rupturas de sentido, conflitos de valores e crises existenciais podem participar da experiência de sofrimento e influenciar a saúde. Essa dimensão é acolhida sem presumir que toda doença tenha uma origem espiritual ou emocional.</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {DIMENSIONS.map(item => (
              <div key={item.title} className="glass-card-inner p-4">
                <span className="text-label text-[9px]">{item.dimension}</span>
                <h3 className="text-heading text-lg text-[#163f49] mt-1">{item.title}</h3>
                <p className="editorial-body mt-2">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
        <p className="editorial-body mt-5 text-center"><strong>Integração das dimensões do ser</strong><br />Uma compreensão ampliada da saúde e do sofrimento</p>
      </div>
    </section>

    <section id="scene-3" className={sectionClass} aria-labelledby="method-title">
      <div className={cardClass}>
        <span className="text-label">O método</span>
        <h2 id="method-title" className="text-display editorial-title mt-2">O Corpo como Caminho para a Consciência</h2>
        <p className="text-heading text-base sm:text-lg text-[#28616a] mt-4">O corpo não é o destino final. É um dos lugares onde a consciência começa e se reencontra.</p>
        <p className="editorial-body mt-4">Por meio da percepção corporal, da escuta emocional e da reflexão sobre a própria história, busco reconhecer padrões, ampliar a liberdade interior e favorecer escolhas mais conscientes.</p>
        <p className="text-label mt-5">Três perguntas fundamentais</p>
        <div className="grid md:grid-cols-3 gap-3 mt-3 text-left">
          {[
            ['O que está acontecendo?', 'A identificação e investigação do sintoma.'],
            ['Como isso se relaciona com minha história?', 'A compreensão dos fatores que participam do sofrimento.'],
            ['Que novas possibilidades de vida podem emergir?', 'A construção de recursos, autonomia e sentido.'],
          ].map(([question, answer]) => (
            <div className="glass-card-inner p-4" key={question}>
              <h3 className="text-heading text-base text-[#163f49]">{question}</h3>
              <p className="editorial-body mt-2">{answer}</p>
            </div>
          ))}
        </div>
        <p className="editorial-body mt-4">A dimensão transcendente amplia essa investigação, convidando a pessoa, quando fizer sentido para ela, a reconhecer seus valores essenciais, sua espiritualidade e aquilo que confere direção à existência.</p>
      </div>
    </section>

    <section id="scene-caminho" className={sectionClass} aria-labelledby="journey-title">
      <div className={`${cardClass} max-w-3xl`}>
        <span className="text-label">O percurso terapêutico</span>
        <h2 id="journey-title" className="text-display editorial-title mt-2">Da escuta à transformação</h2>
        <p className="editorial-body mt-3">Do sintoma à compreensão. Da compreensão à consciência.<br className="hidden sm:block" /> Da consciência à transformação.</p>
        <ol className="method-steps mt-5 space-y-2.5 text-left">
          {METHOD_STEPS.map((step, index) => (
            <li key={step.title} className="flex items-start gap-3">
              <span className="w-7 h-7 shrink-0 rounded-full bg-[#163f49] text-[#fbf7ed] flex items-center justify-center text-xs font-semibold mt-1">{index + 1}</span>
              <div className="method-step glass-card-inner flex-1 px-4 py-2.5">
                <h3 className="text-heading text-base text-[#163f49]">{step.title}</h3>
                <p className="editorial-body mt-1">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>


    <section id="scene-5" className={sectionClass} aria-labelledby="approaches-title">
      <div className={cardClass}>
        <span className="text-label">Abordagens terapêuticas</span>
        <h2 id="approaches-title" className="text-display editorial-title mt-2">Diferentes saberes a serviço de uma pessoa única</h2>
        <p className="editorial-body mt-4">O atendimento integra conhecimentos da medicina, da psicoterapia e de práticas corporais, respeitando as indicações, os limites e o grau de evidência de cada recurso.</p>
        <div className="grid md:grid-cols-2 gap-4 mt-5 text-left">
          {APPROACHES.map(item => (
            <div className="glass-card-inner p-4" key={item.title}>
              <h3 className="text-heading text-lg text-[#163f49]">{item.title}</h3>
              <p className="editorial-body mt-2">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    </div>
    </div>

    <section id="scene-5b" className={sectionClass} style={background} aria-labelledby="about-title">
      <div className={cardClass}>
        <span className="text-label">Sobre o médico</span>
        <img src="/avatar.webp" alt="Dr. Antônio Carlos de Lacerda Lage" loading="lazy" width="96" height="96" className="w-24 h-24 rounded-full object-cover object-top mx-auto mt-4 border-2 border-[#d7b36c]/50" />
        <h2 id="about-title" className="text-display editorial-title mt-4">Dr. Antônio Carlos de Lacerda Lage</h2>
        <p className="text-heading text-base text-[#28616a] mt-2">Médico integrativo e psicoterapeuta</p>
        <p className="text-xs text-[#49666c] mt-2">Médico CRM-3916 • Homeopatia RQE - 3783</p>
        <div className="about-cards grid sm:grid-cols-3 gap-3 mt-5 text-left">
          {[
            ['Trajetória', 'Com quatro décadas de experiência médica e uma trajetória dedicada ao estudo do ser humano, desenvolveu uma abordagem que articula investigação clínica, psicoterapia, consciência corporal e compreensão existencial.'],
            ['Formação', 'Sua formação reúne experiências em Homeopatia, Medicina Tradicional Chinesa, Medicina Antroposófica, Ayurveda, Medicina Funcional Integrativa e diferentes abordagens psicoterapêuticas.'],
            ['Filosofia de cuidado', 'Seu trabalho é orientado pelo respeito à singularidade humana e pela convicção de que o cuidado deve contemplar tanto o sofrimento quanto as possibilidades de desenvolvimento da pessoa.'],
          ].map(([title, text]) => <div key={title} className="glass-card-inner p-4"><h3 className="text-heading text-lg text-[#163f49]">{title}</h3><p className="editorial-body mt-2">{text}</p></div>)}
        </div>
      </div>
    </section>

  </div>
);
