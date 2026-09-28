
import os
import re

path = "src/components/TrajectorySection.tsx"
with open(path, "r", encoding="utf-8", errors="ignore") as f:
    content = f.read()

replacement = """const CARDS = [
  { title: "CORPO TEMIDO", quote: "“Há algo errado comigo.”" },
  { title: "CORPO OBSERVADO", quote: "“Percebo o que acontece.”" },
  { title: "CORPO SENTIDO", quote: "“Consigo permanecer com a experiência.”" },
  { title: "CORPO REGULADO", quote: "“Posso aproximar e afastar sem me perder.”" },
  { title: "CORPO SIMBÓLICO", quote: "“Uma imagem começa a nascer.”" },
  { title: "CORPO HISTÓRICO", quote: "“Reconheço como aprendi a reagir.”" },
  { title: "CORPO AUTORAL", quote: "“Posso escolher outra resposta.”" },
  { title: "CORPO ENCARNADO", quote: "“Minha nova consciência tornou-se gesto, postura, limite e vida.”" },
  { title: "CORPO HABITADO", quote: null, highlight: true },
];"""

content = re.sub(r'const CARDS = \[\s*\{.*?\}\,\s*\];', replacement, content, flags=re.DOTALL)

with open(path, "w", encoding="utf-8") as f:
    f.write(content)

