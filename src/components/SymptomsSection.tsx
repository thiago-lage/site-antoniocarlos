import React from 'react';

export interface SymptomItem {
  id: string;
  title: string;
  subtitle: string;
  summary: string;
  gradient: string;
  accentColor: string;
  /** Photo shown on the card and the page; defaults to /symptoms/<id>.webp */
  image?: string;
  /** Paragraphs of the symptom page; when absent the page uses the shared concise paragraphs. */
  provisional?: string[];
  icon: React.ReactNode;
}

export const SYMPTOMS: SymptomItem[] = [
  {
    id: 'ansiedade',
    title: 'Ansiedade',
    subtitle: 'Quando a mente antecipa perigos e o corpo permanece em alerta.',
    summary:
      'Investigação clínica, regulação corporal e compreensão dos medos e inseguranças.',
    gradient: 'linear-gradient(135deg, rgba(83, 183, 174, 0.22) 0%, rgba(215, 179, 108, 0.18) 100%)',
    accentColor: '#28616a',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
  {
    id: 'depressao',
    title: 'Depressão',
    subtitle: 'Quando a vitalidade diminui e a vida perde suas cores.',
    summary:
      'Cuidado dos aspectos físicos, emocionais e existenciais, favorecendo vínculos e sentido.',
    gradient: 'linear-gradient(135deg, rgba(22, 63, 73, 0.18) 0%, rgba(110, 170, 165, 0.22) 100%)',
    accentColor: '#163f49',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
      </svg>
    ),
  },
  {
    id: 'panico',
    title: 'Pânico',
    subtitle: 'Quando o corpo dispara um alarme intenso.',
    summary:
      'Avaliação clínica, compreensão do ciclo do medo e recursos para recuperar segurança.',
    gradient: 'linear-gradient(135deg, rgba(215, 179, 108, 0.25) 0%, rgba(83, 183, 174, 0.18) 100%)',
    accentColor: '#28616a',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
  },
  {
    id: 'insonia',
    title: 'Insônia',
    subtitle: 'Quando o corpo está cansado, mas o descanso não chega.',
    summary:
      'Investigação do sono, das tensões emocionais e das inquietações que dificultam o repouso.',
    gradient: 'linear-gradient(135deg, rgba(22, 63, 73, 0.22) 0%, rgba(215, 179, 108, 0.16) 100%)',
    accentColor: '#163f49',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
      </svg>
    ),
  },
  {
    id: 'cansaco',
    title: 'Cansaço',
    subtitle: 'Quando descansar parece não ser suficiente.',
    summary:
      'Busca das causas físicas e psicossociais, com atenção à vitalidade e ao propósito.',
    gradient: 'linear-gradient(135deg, rgba(110, 170, 165, 0.24) 0%, rgba(243, 231, 209, 0.5) 100%)',
    accentColor: '#28616a',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
      </svg>
    ),
  },
  {
    id: 'conflitos',
    title: 'Conflitos emocionais',
    subtitle: 'Corpo, emoções, vínculos, consciência e busca de sentido.',
    summary:
      'Corpo, emoções, vínculos, consciência e busca de sentido são dimensões importantes da experiência humana.',
    image: '/symptoms/dores.webp',
    gradient: 'linear-gradient(135deg, rgba(215, 179, 108, 0.22) 0%, rgba(22, 63, 73, 0.16) 100%)',
    accentColor: '#163f49',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
    // Page paragraphs: this one drops the first shared sentence, because the summary above already says it.
    provisional: [
      'Considerá-las, quando pertinentes, amplia a compreensão das necessidades de cada pessoa, sem substituir a investigação e os tratamentos médicos necessários.',
      'O objetivo é favorecer saúde, autonomia e qualidade de vida.',
      'O primeiro passo é uma avaliação cuidadosa.',
    ],
  },
];

export const SymptomsSection: React.FC = () => (
  <section id="scene-sintomas" className="scene content-scene centered-scene w-full flex flex-col items-center pl-5 pr-10 sm:px-10 md:px-14 lg:px-20" aria-labelledby="symptoms-title">
    <div className="fit-content pointer-events-auto w-full max-w-6xl flex flex-col items-center">
      <div className="text-center max-w-2xl mb-6 md:mb-8 px-2">
                <h2 id="symptoms-title" className="text-display text-2xl sm:text-3xl md:text-4xl text-[#163f49]">Em que posso ajudar</h2>
      </div>
      <div className="symptoms-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 w-full">
        {SYMPTOMS.map(item => (
          <a key={item.id} href={`/sintomas/${item.id}`} aria-label={`Ver detalhes sobre ${item.title}`} className="glass-card relative overflow-hidden p-5 md:p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-lg group focus-visible:outline-2 focus-visible:outline-[#28616a]" style={{ borderRadius: '1.35rem' }}>
            {/* Soft background photo: drop /public/symptoms/<id>.webp to enable; hidden if missing. */}
            <img src={item.image ?? `/symptoms/${item.id}.webp`} alt="" aria-hidden="true" loading="lazy" decoding="async" className="symptom-card-bg" onError={e => { e.currentTarget.style.display = 'none'; }} />
            <div className="relative flex items-center justify-between gap-2 mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border border-white/70" style={{ background: item.gradient, color: item.accentColor }}>{item.icon}</div>
            </div>
            <h3 className="relative text-heading text-base sm:text-lg md:text-[19px] font-semibold text-[#163f49]">{item.title}</h3>
            <p className="relative mt-2 text-[14px] text-[#244f59] leading-relaxed">{item.subtitle}</p>
          </a>
        ))}
      </div>
      <div className="clinical-note mt-5 w-full py-3 px-4 rounded-2xl text-center border border-[#d7b36c]/45 bg-[#fbf7ed]/80">
        <p className="text-xs text-[#163f49] leading-relaxed"><strong className="uppercase tracking-wider text-[10px] text-[#28616a]">Distinção Clínica Essencial</strong>{' '}Nem todo sintoma tem origem emocional ou espiritual. Compreendê-lo não substitui o diagnóstico nem o tratamento clínico.</p>
      </div>
    </div>
  </section>
);
