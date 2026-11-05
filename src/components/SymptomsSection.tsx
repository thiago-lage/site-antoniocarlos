import React from 'react';

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
      'Investigação do sono, das tensões emocionais e das inquietações que dificultam o repouso.',
    gradient: 'linear-gradient(135deg, rgba(22, 63, 73, 0.22) 0%, rgba(215, 179, 108, 0.16) 100%)',
    accentColor: '#163f49',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
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
      'Busca das causas físicas e psicossociais, com atenção à vitalidade e ao propósito.',
    gradient: 'linear-gradient(135deg, rgba(110, 170, 165, 0.24) 0%, rgba(243, 231, 209, 0.5) 100%)',
    accentColor: '#28616a',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
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
    title: 'Dores e sintomas físicos',
    subtitle: 'Quando o desconforto limita a liberdade de viver.',
    summary:
      'Investigação médica e compreensão integrada dos fatores que influenciam o sofrimento.',
    gradient: 'linear-gradient(135deg, rgba(215, 179, 108, 0.22) 0%, rgba(22, 63, 73, 0.16) 100%)',
    accentColor: '#163f49',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
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

export const SymptomsSection: React.FC = () => (
  <section id="scene-sintomas" className="scene content-scene centered-scene w-full flex flex-col items-center pl-5 pr-10 sm:px-10 md:px-14 lg:px-20" style={{ background: 'linear-gradient(170deg, #f8f4ec 0%, #eef6f5 50%, #f3e7d1 100%)' }} aria-labelledby="symptoms-title">
    <div className="pointer-events-auto w-full max-w-6xl flex flex-col items-center">
      <div className="text-center max-w-2xl mb-6 md:mb-8 px-2">
        <span className="text-label text-[10px] block mb-1.5">Escuta Clínica e Integrativa</span>
        <h2 id="symptoms-title" className="text-display text-2xl sm:text-3xl md:text-4xl text-[#163f49]">O que você está vivendo hoje?</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 w-full">
        {SYMPTOMS.map(item => (
          <a key={item.id} href={`/sintomas/${item.id}`} aria-label={`Ver detalhes sobre ${item.title}`} className="glass-card p-5 md:p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-lg group focus-visible:outline-2 focus-visible:outline-[#28616a]" style={{ borderRadius: '1.35rem' }}>
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border border-white/70" style={{ background: item.gradient, color: item.accentColor }}>{item.icon}</div>
              <span className="text-[10px] uppercase tracking-widest font-bold text-[#28616a]">Saiba mais →</span>
            </div>
            <h3 className="text-heading text-base sm:text-lg md:text-[19px] font-semibold text-[#163f49]">{item.title}</h3>
            <p className="mt-2 text-[14px] text-[#244f59] leading-relaxed">{item.subtitle}</p>
          </a>
        ))}
      </div>
      <div className="clinical-note mt-5 w-full py-3 px-4 rounded-2xl text-center border border-[#d7b36c]/45 bg-[#fbf7ed]/80">
        <p className="text-xs text-[#163f49] leading-relaxed"><strong className="uppercase tracking-wider text-[10px] text-[#28616a]">Distinção Clínica Essencial</strong>{' '}Nem todo sintoma tem origem emocional ou espiritual. Compreendê-lo não substitui o diagnóstico nem o tratamento clínico.</p>
      </div>
    </div>
  </section>
);
