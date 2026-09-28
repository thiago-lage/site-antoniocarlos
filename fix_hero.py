
import os
import re

path = "src/components/HeroSection.tsx"
with open(path, "r", encoding="utf-8", errors="ignore") as f:
    content = f.read()

replacement = """<div className="h-content">
        <p className="h-eyebrow animate-up">Dr. Antônio Carlos</p>
        <p className="h-credentials animate-up">
          Médico e psicoterapeuta, criador de<br />O Corpo como Caminho para a Consciência.
        </p>
        <div className="h-divider animate-up delay-1" aria-hidden="true" />
        <h1 className="h-title animate-up delay-1">
          Sou médico e<br />
          <em>psicoterapeuta</em>
        </h1>
        <p className="h-body animate-up delay-2">
          "Trabalho ajudando pessoas a compreender como o corpo, as emoções, a história e os vínculos participam da forma como elas vivem e adoecem. Meu trabalho é ajudá-las a ampliar a consciência, recuperar a autoridade interior e encontrar maneiras mais inteiras de viver."
        </p>
        <div className="h-cta-row animate-up delay-3">"""

content = re.sub(r'<div className="h-content">.*?<div className="h-cta-row animate-up delay-3">', replacement, content, flags=re.DOTALL)

with open(path, "w", encoding="utf-8") as f:
    f.write(content)

