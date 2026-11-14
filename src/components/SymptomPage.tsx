import { useEffect } from 'react';
import type { SymptomItem } from './SymptomsSection';

/** Short symptom pages, built only from the client's new sentences. Set to false to bring back the long sections. */
const CONCISE_SYMPTOM_PAGES = true;
const CONCISE_PARAGRAPHS = [
  'Corpo, emoções, vínculos, consciência e busca de sentido são dimensões importantes da experiência humana.',
  'Considerá-las, quando pertinentes, amplia a compreensão das necessidades de cada pessoa, sem substituir a investigação e os tratamentos médicos necessários.',
  'O objetivo é favorecer saúde, autonomia e qualidade de vida.',
  'O primeiro passo é uma avaliação cuidadosa.',
];

export const SymptomPage = ({ symptom }: { symptom: SymptomItem }) => {
  useEffect(() => {
    const previous = document.title;
    document.title = `${symptom.title} | Dr. Antônio Carlos Lage`;
    return () => { document.title = previous; };
  }, [symptom.title]);

  return (
    <main className="min-h-screen bg-[#f5f4ec] px-5 py-8 sm:py-12 text-[#173847]">
      <div className="max-w-3xl mx-auto">
        <a href="/#scene-sintomas" className="back-link">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true" width="14" height="14"><path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5M12 19l-7-7 7-7" /></svg>
          Voltar aos sintomas
        </a>
        <article className="glass-card mt-6 p-6 sm:p-9">
          <img src={symptom.image ?? `/symptoms/${symptom.id}.webp`} alt="" width="1200" height="750" decoding="async" className="w-full h-44 sm:h-60 object-cover rounded-2xl mb-6" style={{ objectPosition: "center 30%" }} onError={e => { e.currentTarget.style.display = 'none'; }} />
          <span className="text-label">Compreensão e cuidado</span>
          <h1 className="text-display text-3xl sm:text-4xl mt-3">{symptom.title}</h1>
          <p className="text-heading text-lg text-[#28616a] mt-4">{symptom.subtitle}</p>
          <p className="editorial-body mt-3">{symptom.summary}</p>
          {symptom.provisional || CONCISE_SYMPTOM_PAGES ? (
            <section className="glass-card-inner p-5 mt-6 space-y-3">
              {(symptom.provisional ?? CONCISE_PARAGRAPHS).map(text => <p key={text} className="editorial-body">{text}</p>)}
            </section>
          ) : (
            <>
              <section className="glass-card-inner p-5 mt-6" aria-labelledby="feel-title">
                <h2 id="feel-title" className="text-heading text-xl">1. O que você pode sentir</h2>
                <ul className="editorial-body list-disc pl-5 mt-3 space-y-2">{symptom.details.whatYouFeel.map(item => <li key={item}>{item}</li>)}</ul>
              </section>
              {[
                ['2. O que pode estar relacionado', symptom.details.whatIsRelated],
                ['3. Como investigo', symptom.details.howWeInvestigate],
                ['4. Como posso cuidar', symptom.details.howWeCare],
              ].map(([title, body]) => (
                <section key={title} className="glass-card-inner p-5 mt-4" aria-label={title}>
                  <h2 className="text-heading text-xl">{title}</h2>
                  <p className="editorial-body mt-3">{body}</p>
                </section>
              ))}
            </>
          )}
          <p className="editorial-body mt-6">Conteúdo educativo; não substitui o diagnóstico nem a avaliação individual. O cuidado respeita suas crenças e sua visão de mundo.</p>
          <div className="flex justify-center mt-8"><a className="booking-link" href={`https://wa.me/5527998644435?text=${encodeURIComponent(`Olá, gostaria de agendar uma consulta com Dr. Antônio Carlos Lage (tema: ${symptom.title}).`)}`} target="_blank" rel="noopener noreferrer">Agende sua consulta →</a></div>
        </article>
        <p className="text-center text-xs text-[#49666c] mt-6">Dr. Antônio Carlos Lage<br />Médico CRM-3916 • Homeopatia RQE - 3783</p>
      </div>
    </main>
  );
};
