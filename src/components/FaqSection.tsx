import { useState } from 'react';

type Faq = { question: string; answer: string | null };

/**
 * Questions written from the patient's point of view.
 * DRAFT answers (written from the site's approved texts) waiting for Dr. Antônio Carlos's review.
 * `answer: null` hides a question until an answer is filled in.
 */
const FAQ: Faq[] = [
  {
    question: 'Como funciona a primeira consulta?',
    answer: 'É uma avaliação clínica e compreensão dos sintomas, da história pessoal e dos fatores relevantes para sua saúde. A partir dela, definimos juntos as prioridades, os recursos indicados e os objetivos do tratamento.',
  },
  {
    question: 'Preciso levar exames?',
    answer: 'Se você tiver exames recentes, leve-os à primeira consulta. Eles ajudam na avaliação, mas não são obrigatórios: quando necessário, novos exames são solicitados.',
  },
  {
    question: 'O atendimento é presencial, online ou os dois? Em qual cidade?',
    answer: 'Os atendimentos são presenciais, em Vila Velha – ES, e online, por telemedicina. Consulte a disponibilidade de cada modalidade no agendamento.',
  },
  {
    question: 'Quanto tempo dura a consulta e qual a frequência dos retornos?',
    answer: 'A primeira consulta é mais longa, para uma avaliação completa. A frequência dos retornos é definida em conjunto, de acordo com a evolução de cada pessoa.',
  },
  {
    question: 'Quanto tempo dura o acompanhamento?',
    answer: 'A duração e a frequência do acompanhamento respeitam as necessidades de cada pessoa. Quando necessário, encontros periódicos para avaliar a evolução e ajustar as condutas.',
  },
  {
    question: 'A homeopatia substitui o tratamento convencional?',
    answer: 'Não necessariamente. A homeopatia e os demais recursos integrativos podem ser utilizados de forma complementar, sem substituir a investigação e os tratamentos médicos necessários. Medicamentos em uso não devem ser suspensos sem orientação médica.',
  },
  {
    question: 'Atende por convênio? Emite recibo para reembolso?',
    answer: 'As informações sobre convênios e sobre a emissão de recibo para reembolso pelo seu plano de saúde são passadas no agendamento, pelo WhatsApp.',
  },
  {
    question: 'Quais são os valores e as formas de pagamento?',
    answer: 'Os valores e as formas de pagamento são informados no agendamento, pelo WhatsApp.',
  },
  {
    question: 'Posso usar este site em uma urgência?',
    answer: 'Não. Este site e o agendamento não são canais de atendimento de urgência. Em caso de urgência ou emergência, procure o pronto-socorro mais próximo ou ligue 192 (SAMU).',
  },
];

const WHATSAPP_QUESTION = `https://wa.me/5527998644435?text=${encodeURIComponent('Olá, tenho uma dúvida sobre a consulta com Dr. Antônio Carlos Lage.')}`;

export const FaqSection = () => {
  const items = FAQ.filter((item): item is { question: string; answer: string } => item.answer !== null);
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="scene-duvidas" className="scene faq-scene pointer-events-auto" aria-labelledby="faq-title">
      <div className="faq-layout">
        <div className="faq-intro">
          <span className="faq-kicker">✳ Dúvidas</span>
          <h2 id="faq-title" className="faq-title">Perguntas <em>frequentes</em></h2>
          <p className="faq-lead">Se a sua dúvida não estiver aqui, fale comigo. Será um prazer conversar.</p>
          <a href={WHATSAPP_QUESTION} target="_blank" rel="noopener noreferrer" className="faq-button">Tirar uma dúvida</a>
        </div>
        <ul className="faq-list">
          {items.map((item, index) => {
            const isOpen = open === index;
            return (
              <li key={item.question} className={`faq-item${isOpen ? ' is-open' : ''}`}>
                <h3>
                  <button
                    type="button"
                    id={`faq-q-${index}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-a-${index}`}
                    onClick={() => setOpen(isOpen ? null : index)}
                  >
                    <span>{item.question}</span>
                    <span className="faq-icon" aria-hidden="true" />
                  </button>
                </h3>
                <div id={`faq-a-${index}`} role="region" aria-labelledby={`faq-q-${index}`} className="faq-answer">
                  <div><p>{item.answer}</p></div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};
