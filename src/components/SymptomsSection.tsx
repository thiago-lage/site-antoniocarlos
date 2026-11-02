import React, { useEffect, useRef, useState } from 'react';

export interface SymptomItem {
  id: string;
  title: string;
  subtitle: string;
  summary: string;
  gradient: string;
  accentColor: string;
  icon: React.ReactNode;
  details: {
    whatYouFeel: string[];
    whatIsRelated: string;
    howWeInvestigate: string;
    howWeCare: string;
  };
}

const SYMPTOMS: SymptomItem[] = [
  {
    id: 'ansiedade',
    title: 'Ansiedade',
    subtitle: 'Quando a mente antecipa perigos e o corpo permanece em alerta.',
    summary:
      'Compreendemos preocupações excessivas, tensão muscular, palpitações, desconfortos digestivos e padrões de hipervigilância, integrando avaliação clínica, regulação corporal e escuta emocional.',
    gradient: 'linear-gradient(135deg, rgba(83, 183, 174, 0.22) 0%, rgba(215, 179, 108, 0.18) 100%)',
    accentColor: '#28616a',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4 md:w-5 md:h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    details: {
      whatYouFeel: [
        'Mente acelerada, preocupações constantes e dificuldade de desacelerar',
        'Tensão muscular frequente (pescoço, ombros, mandíbula ou peito)',
        'Palpitações, respiração curta ou sensação de aperto no tórax',
        'Desconfortos digestivos, inquietação física e estado de hipervigilância',
      ],
      whatIsRelated:
        'A ansiedade envolve tanto a ativação fisiológica do sistema nervoso autônomo quanto a forma como aprendemos a lidar com exigências, incertezas, vínculos e ameaças ao longo da nossa história. Condições clínicas, alterações hormonais, uso de substâncias e privação de sono também podem intensificar esse estado de alerta.',
      howWeInvestigate:
        'Realizamos uma escuta médica detalhada para mapear o início e o ritmo dos sintomas, avaliando exames laboratoriais, rotina de sono, estilo de vida e possíveis causas orgânicas, ao mesmo tempo em que observamos como o corpo reage às tensões cotidianas e relacionais.',
      howWeCare:
        'O cuidado combina recursos médicos e clínicos (quando indicados) com práticas de regulação corporal e ampliação da consciência emocional, ajudando o organismo a sair do estado crônico de defesa e recuperar presença, segurança interna e autonomia.',
    },
  },
  {
    id: 'depressao',
    title: 'Depressão',
    subtitle: 'Quando a vitalidade diminui e a vida parece perder suas cores.',
    summary:
      'Acolhemos tristeza persistente, perda de prazer (anedonia) e alterações do sono, apetite e energia, considerando fatores biológicos e psicossociais para reconstruir vínculos e sentido.',
    gradient: 'linear-gradient(135deg, rgba(22, 63, 73, 0.18) 0%, rgba(110, 170, 165, 0.22) 100%)',
    accentColor: '#163f49',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4 md:w-5 md:h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
      </svg>
    ),
    details: {
      whatYouFeel: [
        'Tristeza persistente, sensação de vazio ou embotamento afetivo',
        'Perda de interesse ou prazer em atividades antes significativas (anedonia)',
        'Queda importante da vitalidade, cansaço constante e lentidão física ou mental',
        'Alterações no sono, no apetite, na concentração e na autoestima',
      ],
      whatIsRelated:
        'Os quadros depressivos resultam de uma interação complexa entre fatores biológicos, neuroquímicos, hormonais e inflamatórios, somados a perdas, lutos não elaborados, sobrecarga prolongada, desenraizamento ou conflitos relacionais profundos.',
      howWeInvestigate:
        'Avaliamos criteriosamente a intensidade, a duração e a gravidade dos sintomas, investigando também deficiências nutricionais, função tireoidiana, condições clínicas associadas e o contexto biográfico e relacional em que o recolhimento vital se instalou.',
      howWeCare:
        'Construímos um plano terapêutico seguro e individualizado — que pode incluir suporte medicamentoso, homeopático e psicoterapêutico — voltado não apenas à remissão dos sintomas, mas à retomada gradual do tônus vital, dos vínculos e do sentido de existir.',
    },
  },
  {
    id: 'panico',
    title: 'Crises de pânico',
    subtitle: 'Quando o corpo dispara um alarme intenso, mesmo sem um perigo evidente.',
    summary:
      'Cuidamos de episódios de taquicardia, falta de ar, tontura e medo de perder o controle. Diferenciamos crises de pânico de outras condições clínicas e trabalhamos o ciclo do medo.',
    gradient: 'linear-gradient(135deg, rgba(215, 179, 108, 0.25) 0%, rgba(83, 183, 174, 0.18) 100%)',
    accentColor: '#28616a',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4 md:w-5 md:h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
    details: {
      whatYouFeel: [
        'Disparo súbito de taquicardia, palpitações e sensação de falta de ar',
        'Tontura, sudorese, tremores, formigamentos ou ondas de frio e calor',
        'Sensação aguda de estranhamento da realidade ou de si mesmo',
        'Medo intenso de morrer, desmaiar, enlouquecer ou perder o controle',
      ],
      whatIsRelated:
        'Na crise de pânico, o sistema de alarme do organismo é acionado de forma abrupta e desproporcional. Muitas vezes, instala-se o "medo de sentir medo": a hipervigilância sobre as próprias sensações corporais retroalimenta a descarga autonômica.',
      howWeInvestigate:
        'O primeiro passo essencial é diferenciar as crises de pânico de condições clínicas cardiológicas, respiratórias, vestibulares ou endócrinas. Paralelamente, mapeamos o contexto de vida e as tensões silenciosas que antecederam o início das crises.',
      howWeCare:
        'Oferecemos tratamento clínico e estratégias fundamentadas de autorregulação corporal e compreensão do ciclo do medo. Ao perder o terror diante da sensação física e reconhecer o que o organismo expressa, o paciente recupera a confiança em seu próprio corpo.',
    },
  },
  {
    id: 'insonia',
    title: 'Insônia',
    subtitle: 'Quando o corpo está cansado, mas o descanso não chega.',
    summary:
      'Investigamos hábitos, ritmo circadiano, medicamentos, apneia e ansiedade, integrando o cuidado médico a estratégias comportamentais (incluindo TCC para insônia quando indicada).',
    gradient: 'linear-gradient(135deg, rgba(22, 63, 73, 0.22) 0%, rgba(215, 179, 108, 0.16) 100%)',
    accentColor: '#163f49',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4 md:w-5 md:h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
      </svg>
    ),
    details: {
      whatYouFeel: [
        'Dificuldade para iniciar o sono, mesmo sentindo exaustão física',
        'Despertares noturnos frequentes com dificuldade para voltar a adormecer',
        'Despertar precoce antes do horário desejado, com sensação de sono superficial',
        'Sonolência diurna, irritabilidade e queda na memória e na atenção',
      ],
      whatIsRelated:
        'A insônia pode estar ligada a desalinhamentos do ritmo circadiano, hiperalerta noturno, quadros ansiosos ou depressivos, apneia obstrutiva do sono, dores crônicas, efeitos de medicamentos ou ao hábito de manter o organismo em estado constante de produtividade e vigilância.',
      howWeInvestigate:
        'Avaliamos detalhadamente a arquitetura e a rotina do sono, hábitos diurnos e noturnos, medicações em uso, sintomas respiratórios noturnos e os estados emocionais que dificultam a entrega ao repouso.',
      howWeCare:
        'Integramos o cuidado médico criterioso a mudanças estruturadas de rotina, desaceleração fisiológica e estratégias comportamentais — incluindo recursos da terapia cognitivo-comportamental para insônia (TCC-I) quando indicada — para restaurar um sono natural e reparador.',
    },
  },
  {
    id: 'cansaco',
    title: 'Cansaço persistente',
    subtitle: 'Quando descansar parece não ser suficiente.',
    summary:
      'Investigamos sono, anemia, tireoide, medicamentos, condições metabólicas, humor e sobrecarga para identificar causas tratáveis sem atribuir automaticamente a exaustão ao estresse.',
    gradient: 'linear-gradient(135deg, rgba(110, 170, 165, 0.24) 0%, rgba(243, 231, 209, 0.5) 100%)',
    accentColor: '#28616a',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4 md:w-5 md:h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
      </svg>
    ),
    details: {
      whatYouFeel: [
        'Sensação contínua de esgotamento que não melhora após fins de semana ou férias',
        'Corpo pesado, falta de disposição logo ao acordar e queda de rendimento',
        'Necessidade de grande esforço para realizar tarefas cotidianas simples',
        'Desgaste emocional associado à sensação de carregar peso excessivo',
      ],
      whatIsRelated:
        'A fadiga persistente exige olhar amplo: pode decorrer de anemias, disfunções da tireoide, carências vitamínicas, distúrbios metabólicos, infecções prévias, sono não reparador, uso de fármacos, depressão ou sobrecarga crônica de responsabilidades e autoexigência.',
      howWeInvestigate:
        'Não atribuímos automaticamente a exaustão ao estresse. Realizamos investigação clínica e laboratorial minuciosa para rastrear causas orgânicas e metabólicas tratáveis, junto à escuta de como a pessoa administra sua energia, seus limites e suas relações.',
      howWeCare:
        'Tratamos as alterações clínicas identificadas e trabalhamos a reconstrução gradual da vitalidade, auxiliando o paciente a reconhecer seus limites reais, reorganizar prioridades e habitar o corpo de modo mais sustentável.',
    },
  },
  {
    id: 'dores',
    title: 'Dores e sintomas físicos recorrentes',
    subtitle: 'Quando o desconforto interfere na liberdade de viver.',
    summary:
      'Investigamos causas orgânicas, mecanismos de sensibilização, tensão muscular, sono e fatores emocionais que modulam a dor, com um cuidado que respeita a realidade do sintoma.',
    gradient: 'linear-gradient(135deg, rgba(215, 179, 108, 0.22) 0%, rgba(22, 63, 73, 0.16) 100%)',
    accentColor: '#163f49',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4 md:w-5 md:h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    details: {
      whatYouFeel: [
        'Cefaleias, dores musculares, articulares ou lombares que se repetem',
        'Alterações gastrointestinais, tonturas, opressão torácica ou dermatites recorrentes',
        'Frustração por conviver com sintomas reais que persistem apesar de diversos tratamentos',
        'Limitação da espontaneidade, do trabalho e do prazer de viver pelo desconforto físico',
      ],
      whatIsRelated:
        'A dor e os sintomas persistentes envolvem tanto processos orgânicos e inflamatórios locais quanto mecanismos de sensibilização do sistema nervoso central, padrões crônicos de contração muscular, qualidade do sono e vivências emocionais que modulam a percepção da dor.',
      howWeInvestigate:
        'Avaliamos exames complementares, histórico médico e tratamentos já realizados com rigor clínico, validando a realidade física do que o paciente sente e investigando as interações entre organismo, sistema nervoso e biografia.',
      howWeCare:
        'Oferecemos uma abordagem integrativa que une manejo médico, dessensibilização e escuta corporal. Quando o sintoma é acolhido com seriedade clínica e compreendido em seu contexto amplo, abrem-se novos caminhos de alívio e qualidade de vida.',
    },
  },
];

export const SymptomsSection: React.FC = () => {
  const [selectedSymptom, setSelectedSymptom] = useState<SymptomItem | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const openSymptomModal = (item: SymptomItem) => {
    setSelectedSymptom(item);
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) {
      dialog.showModal();
      if ((window as any).lenis) {
        (window as any).lenis.stop();
      }
    }
  };

  const closeSymptomModal = () => {
    const dialog = dialogRef.current;
    if (dialog && dialog.open) {
      dialog.close();
    }
  };

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = () => {
      if ((window as any).lenis) {
        (window as any).lenis.start();
      }
      setSelectedSymptom(null);
    };

    dialog.addEventListener('close', handleClose);

    // Fallback for browsers without closedby="any" support
    const handleBackdropClick = (event: MouseEvent) => {
      if (event.target !== dialog) return;
      const rect = dialog.getBoundingClientRect();
      const isDialogContent =
        rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width;

      if (!isDialogContent) {
        dialog.close();
      }
    };

    if (!('closedBy' in HTMLDialogElement.prototype)) {
      dialog.addEventListener('click', handleBackdropClick);
    }

    return () => {
      dialog.removeEventListener('close', handleClose);
      dialog.removeEventListener('click', handleBackdropClick);
    };
  }, []);

  return (
    <section
      className="scene min-h-screen w-full flex flex-col justify-center items-center py-8 md:py-10 pl-5 pr-10 sm:px-10 md:px-14 lg:px-20"
      id="scene-sintomas"
      style={{ background: 'linear-gradient(170deg, #f8f4ec 0%, #eef6f5 50%, #f3e7d1 100%)' }}
    >
      <div className="pointer-events-auto w-full max-w-5xl flex flex-col items-center">
        {/* Cabeçalho Compacto */}
        <div className="text-center max-w-2xl mb-4 md:mb-5 px-2">
          <span className="text-label uppercase tracking-widest text-[#d7b36c] font-bold text-[10px] mb-1 block">
            Escuta Clínica e Integrativa
          </span>
          <h2 className="text-display text-xl sm:text-2xl md:text-[28px] leading-tight" style={{ color: '#163f49' }}>
            O que seu corpo e suas emoções estão expressando?
          </h2>
          <p className="text-body text-xs md:text-[13px] mt-1.5 text-[#5f7477] leading-snug">
            Toque em cada área abaixo para compreender como investigamos as causas clínicas e cuidamos da pessoa por inteiro.
          </p>
        </div>

        {/* Grade Compacta com os 6 Cartões de Sintomas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-3.5 w-full">
          {SYMPTOMS.map((item) => (
            <article
              key={item.id}
              onClick={() => openSymptomModal(item)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  openSymptomModal(item);
                }
              }}
              tabIndex={0}
              role="button"
              aria-haspopup="dialog"
              aria-label={`Ver detalhes sobre ${item.title}`}
              className="glass-card p-4 md:p-4.5 flex flex-col justify-between text-left cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg group focus-visible:outline-2 focus-visible:outline-[#28616a]"
              style={{ borderRadius: '1.25rem' }}
            >
              <div>
                {/* Linha de Topo: Ícone + Título + Aprofundar */}
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div
                      className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border border-white/70 shadow-xs transition-transform duration-300 group-hover:scale-105"
                      style={{ background: item.gradient, color: item.accentColor }}
                    >
                      {item.icon}
                    </div>
                    <h3 className="text-heading text-base md:text-[17px] font-semibold text-[#163f49] leading-tight truncate">
                      {item.title}
                    </h3>
                  </div>
                  <span className="text-[10px] uppercase tracking-wider font-bold text-[#6eaaa5] group-hover:text-[#163f49] transition-colors shrink-0">
                    Ver +
                  </span>
                </div>

                {/* Frase de impacto (Itálico Playfair) */}
                <p className="text-quote text-xs md:text-[12.5px] text-[#28616a] font-medium leading-snug">
                  “{item.subtitle}”
                </p>

                {/* Resumo conciso */}
                <p className="text-body text-[11.5px] md:text-xs mt-1.5 text-[#5f7477] leading-relaxed">
                  {item.summary}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* Nota de Distinção Clínica Essencial Compacta */}
        <div
          className="mt-4 md:mt-5 w-full max-w-4xl py-2.5 px-4 md:py-3 md:px-6 rounded-xl text-center border"
          style={{
            background: 'rgba(251, 247, 237, 0.85)',
            borderColor: 'rgba(215, 179, 108, 0.45)',
            boxShadow: '0 2px 12px rgba(22, 63, 73, 0.04)',
          }}
        >
          <p className="text-[11px] md:text-xs text-[#163f49] leading-snug">
            <strong className="uppercase tracking-wider text-[10px] text-[#28616a] mr-1.5">
              Distinção Clínica Essencial:
            </strong>
            Nem todo sintoma corporal tem origem emocional, e compreender seu significado pessoal não substitui o diagnóstico nem o tratamento clínico.
          </p>
        </div>
      </div>

      {/* Modal / Dialog Nativo para Aprofundamento Individual */}
      <dialog
        ref={dialogRef}
        closedby="any"
        aria-labelledby="symptom-dialog-title"
        className="symptom-modal pointer-events-auto m-auto w-[92vw] max-w-xl rounded-3xl p-0 border border-white/80 shadow-2xl text-left bg-[#fbf7ed]/95 backdrop-blur-xl text-[#173847]"
      >
        {selectedSymptom && (
          <div className="p-5 sm:p-6 md:p-7 max-h-[85vh] overflow-y-auto">
            {/* Cabeçalho do Modal */}
            <div className="flex items-start justify-between gap-3 pb-3.5 border-b border-[#163f49]/10">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border border-white/80"
                  style={{ background: selectedSymptom.gradient, color: selectedSymptom.accentColor }}
                >
                  {selectedSymptom.icon}
                </div>
                <div>
                  <span className="text-label text-[9px] uppercase tracking-widest text-[#6eaaa5] block">
                    Compreensão e Cuidado
                  </span>
                  <h3 id="symptom-dialog-title" className="text-display text-xl md:text-2xl text-[#163f49]">
                    {selectedSymptom.title}
                  </h3>
                </div>
              </div>

              <button
                type="button"
                onClick={closeSymptomModal}
                aria-label="Fechar janela"
                className="w-8 h-8 rounded-full flex items-center justify-center text-[#5f7477] hover:text-[#163f49] hover:bg-[#163f49]/10 transition-colors cursor-pointer shrink-0"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Subtítulo Poético */}
            <p className="text-quote text-sm md:text-base text-[#28616a] mt-3">
              “{selectedSymptom.subtitle}”
            </p>

            {/* As 4 Partes Estruturadas */}
            <div className="mt-4 space-y-3">
              {/* 1. O que você pode sentir */}
              <div className="p-3.5 rounded-2xl bg-white/60 border border-white/80">
                <h4 className="text-[11px] font-bold uppercase tracking-widest text-[#163f49] mb-1.5 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#d7b36c]"></span>
                  1. O que você pode sentir
                </h4>
                <ul className="space-y-1 text-xs text-[#5f7477] list-disc list-inside leading-snug">
                  {selectedSymptom.details.whatYouFeel.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>

              {/* 2. O que pode estar relacionado */}
              <div className="p-3.5 rounded-2xl bg-white/60 border border-white/80">
                <h4 className="text-[11px] font-bold uppercase tracking-widest text-[#163f49] mb-1 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#53b7ae]"></span>
                  2. O que pode estar relacionado
                </h4>
                <p className="text-xs text-[#5f7477] leading-relaxed">
                  {selectedSymptom.details.whatIsRelated}
                </p>
              </div>

              {/* 3. Como investigamos */}
              <div className="p-3.5 rounded-2xl bg-white/60 border border-white/80">
                <h4 className="text-[11px] font-bold uppercase tracking-widest text-[#163f49] mb-1 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#28616a]"></span>
                  3. Como investigamos
                </h4>
                <p className="text-xs text-[#5f7477] leading-relaxed">
                  {selectedSymptom.details.howWeInvestigate}
                </p>
              </div>

              {/* 4. Como podemos cuidar */}
              <div className="p-3.5 rounded-2xl bg-white/60 border border-white/80">
                <h4 className="text-[11px] font-bold uppercase tracking-widest text-[#163f49] mb-1 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#163f49]"></span>
                  4. Como podemos cuidar
                </h4>
                <p className="text-xs text-[#5f7477] leading-relaxed">
                  {selectedSymptom.details.howWeCare}
                </p>
              </div>
            </div>

            {/* Nota Clínica + CTA no Rodapé do Modal */}
            <div className="mt-4 pt-3.5 border-t border-[#163f49]/10 flex flex-col sm:flex-row items-center justify-between gap-3">
              <p className="text-[11px] text-[#5f7477] italic text-center sm:text-left">
                Avaliação médica individualizada presencial ou por telemedicina.
              </p>
              <div className="flex items-center gap-2.5 w-full sm:w-auto justify-center">
                <button
                  type="button"
                  onClick={closeSymptomModal}
                  className="px-3.5 py-2 rounded-full text-xs font-semibold text-[#5f7477] hover:text-[#163f49] cursor-pointer"
                >
                  Fechar
                </button>
                <a
                  href={`https://wa.me/5527998644435?text=${encodeURIComponent(
                    `Olá, gostaria de agendar uma consulta com Dr. Antônio Carlos (tema: ${selectedSymptom.title}).`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2 rounded-full bg-[#163f49] text-[#fbf7ed] hover:bg-[#28616a] transition-colors text-[11px] font-bold uppercase tracking-wider shadow-md"
                >
                  Agendar Consulta
                </a>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
};
