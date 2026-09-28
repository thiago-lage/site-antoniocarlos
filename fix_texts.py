# -*- coding: utf-8 -*-
import re

# Fix Hero
with open('src/components/HeroSection.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

text = re.sub(
    r'Trabalho ajudando pessoas a compreender.*?encontrar maneiras mais inteiras de viver\.',
    'Ajudo você a compreender como corpo, emoções e história se unem na sua forma de viver e adoecer. Meu objetivo é despertar sua autoridade interior para uma vida mais plena e consciente.',
    text,
    flags=re.DOTALL
)

with open('src/components/HeroSection.tsx', 'w', encoding='utf-8') as f:
    f.write(text)


# Fix Overlay
with open('src/components/ScrollOverlay.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

# Scene 3
text = re.sub(
    r'Porque o corpo não é o destino final\.<br/>.*?onde história, organismo, relação e consciência se encontram\.\s*</p>',
    '''O corpo é o território vivo onde história, organismo, relação e consciência se encontram.<br/><br/>
            O trabalho corporal busca ampliar a percepção e a flexibilidade para encarnar novas escolhas de vida, sem buscar causas automáticas ou interpretações universais.
          </p>''',
    text,
    flags=re.DOTALL
)

# Scene 5
text = re.sub(
    r'<div className=\"text-body font-semibold text-sm md:text-base mt-4 text-\[\#28616a\] leading-relaxed\">\s*<p>O organismo reage\.</p>.*?<p>A ação encarna\.</p>\s*</div>',
    '''<div className="text-body font-semibold text-sm md:text-base mt-4 text-[#28616a] leading-relaxed">
            <p>O organismo reage • A sensação informa • A consciência percebe • A regulação permite permanecer • O símbolo amplia • A história contextualiza • A autoridade escolhe • A ação encarna.</p>
          </div>''',
    text,
    flags=re.DOTALL
)

text = re.sub(
    r'E o corpo deixa de ser apenas:<br/>\s*aquilo que dói; aquilo que envelhece; aquilo que precisa ser corrigido\.</p>\s*<p className=\"mt-4 text-\[\#163f49\] font-bold\">\s*Torna-se também:<br/>\s*casa; fronteira; testemunha; recurso; presença; possibilidade\.',
    'O corpo deixa de ser apenas aquilo que dói ou envelhece, e torna-se presença, casa, recurso e possibilidade.',
    text,
    flags=re.DOTALL
)

with open('src/components/ScrollOverlay.tsx', 'w', encoding='utf-8') as f:
    f.write(text)
