
import os
import re

path = "src/components/ScrollOverlay.tsx"
with open(path, "r", encoding="utf-8", errors="ignore") as f:
    content = f.read()

# Fix Scene 2
scene2_old = r'<div className="glass-card pointer-events-auto w-full max-w-xl p-6 md:p-10 flex flex-col items-center text-center">.*?</div>\s*</section>'
scene2_new = """<div className="glass-card pointer-events-auto w-full max-w-xl p-6 md:p-10 flex flex-col items-center text-center">
          <span className="text-label">A Promessa</span>
          <blockquote className="text-heading text-xl sm:text-2xl md:text-3xl mt-4 leading-snug" style={{ color: '#163f49' }}>
            "Ajudo pessoas a transformar aquilo que o corpo sente e a história repete em consciência e escolha."
          </blockquote>
          <p className="text-body text-sm md:text-base mt-4 max-w-lg">
            Ajudar pessoas a transformar experiência corporal e história de vida em consciência, autoridade interior e liberdade responsável.
          </p>
        </div>
      </section>"""
content = re.sub(scene2_old, scene2_new, content, flags=re.DOTALL)

# Fix Scene 3
scene3_old = r'<div className="glass-card pointer-events-auto w-full max-w-4xl p-6 md:p-10 flex flex-col items-center text-center">.*?</div>\s*</section>'
scene3_new = """<div className="glass-card pointer-events-auto w-full max-w-4xl p-6 md:p-10 flex flex-col items-center text-center">
          <span className="text-label uppercase tracking-widest text-[#d7b36c] font-bold text-xs mb-2">Método Autoral</span>
          <h2 className="text-display text-2xl sm:text-3xl md:text-4xl mt-2 uppercase tracking-wide" style={{ color: '#163f49' }}>
            O Corpo como Caminho para a Consciência
          </h2>
          <p className="text-body font-semibold text-base md:text-lg mt-6" style={{ color: '#28616a' }}>
            Porque o corpo não é o destino final.<br/>
            É o lugar concreto onde a consciência começa, se perde, se reencontra e finalmente precisa aprender a viver.
          </p>
          <p className="text-body text-sm md:text-base mt-6 text-left" style={{ color: '#5f7477', lineHeight: '1.8' }}>
            O corpo, em O Corpo como Caminho para a Consciência, é simultaneamente realidade biológica, experiência vivida, campo de regulação, lugar de expressão relacional e via possível de simbolização. Sua escuta não autoriza causalidades psicológicas automáticas nem interpretações universais. O trabalho corporal busca ampliar percepção, flexibilidade regulatória, diferenciação entre passado e presente, capacidade de reconhecer impulsos sem ser governado por eles e possibilidade de encarnar novas escolhas. O corpo não é oráculo nem mero objeto: é território de experiência onde história, organismo, relação e consciência se encontram.
          </p>
        </div>
      </section>"""
content = re.sub(scene3_old, scene3_new, content, flags=re.DOTALL)

# Fix Scene 5
scene5_old = r'<div className="glass-card pointer-events-auto w-full max-w-2xl p-6 md:p-10 flex flex-col items-center text-center">.*?</div>\s*</section>'
scene5_new = """<div className="glass-card pointer-events-auto w-full max-w-2xl p-6 md:p-10 flex flex-col items-center text-center">
          <span className="text-label uppercase tracking-widest text-[#d7b36c] font-bold text-xs mb-2">A Síntese</span>
          
          <div className="text-body font-semibold text-sm md:text-base mt-4 text-[#28616a] leading-relaxed">
            <p>O organismo reage.</p>
            <p>A sensação informa.</p>
            <p>A consciência percebe.</p>
            <p>A regulação permite permanecer.</p>
            <p>O símbolo amplia significado.</p>
            <p>A história contextualiza.</p>
            <p>A autoridade interior escolhe.</p>
            <p>A ação encarna.</p>
          </div>

          <div className="text-body text-sm md:text-base mt-6 text-[#5f7477]">
            <p>E o corpo deixa de ser apenas:<br/>
            aquilo que dói; aquilo que envelhece; aquilo que precisa ser corrigido.</p>
            <p className="mt-4 text-[#163f49] font-bold">
            Torna-se também:<br/>
            casa; fronteira; testemunha; recurso; presença; possibilidade.
            </p>
          </div>

          <p className="text-body text-sm mt-6 text-[#5f7477] italic">
            Por isso, o princípio corporal mais profundo do método pode ser formulado assim:
          </p>

          <div className="mt-4 p-4 md:p-6 rounded-2xl text-center w-full" style={{ background: 'rgba(251, 247, 237, 0.7)', border: '1px solid rgba(22, 63, 73, 0.1)' }}>
            <p className="text-quote text-base md:text-lg font-playfair text-[#163f49] italic leading-snug">
              “Não buscamos libertar a consciência do corpo. Buscamos uma consciência suficientemente ampliada para habitar o corpo com presença, respeito, liberdade e responsabilidade.”
            </p>
          </div>
        </div>
      </section>"""
content = re.sub(scene5_old, scene5_new, content, flags=re.DOTALL)

with open(path, "w", encoding="utf-8") as f:
    f.write(content)

