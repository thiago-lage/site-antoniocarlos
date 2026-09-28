# -*- coding: utf-8 -*-
import re

with open('src/components/HeroSection.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

# 1. Update AMP
text = re.sub(
    r'const AMP\s*=\s*\{ bg: 12, person: 20, fgR: 45, fgL: 55 \}\s*as\s*const;',
    'const AMP  = { bg: 12, person: 20, fg: 45 } as const;',
    text
)

# 2. Update Refs
text = re.sub(
    r'const fgRRef\s*=\s*useRef<HTMLDivElement>\(null\);\n\s*const fgLRef\s*=\s*useRef<HTMLDivElement>\(null\);',
    'const fgRef    = useRef<HTMLDivElement>(null);',
    text
)

# 3. Update layers initialization in useEffect
text = re.sub(
    r'layersRef\.current\s*=\s*\[\s*\{\s*el:\s*bgRef\.current!,\s*amp:\s*AMP\.bg,\s*cx:\s*0,\s*cy:\s*0\s*\},.*?\].filter\(l => Boolean\(l\.el\)\);',
    '''    layersRef.current = [
      { el: bgRef.current!,     amp: AMP.bg,      cx: 0, cy: 0 },
      { el: personRef.current!, amp: AMP.person,  cx: 0, cy: 0 },
      { el: fgRef.current!,     amp: AMP.fg,      cx: 0, cy: 0 },
    ].filter(l => Boolean(l.el));''',
    text,
    flags=re.DOTALL
)

# 4. Update the JSX for images
start_idx = text.find('      {/*')
end_idx = text.find('      {/* ', start_idx) # wait, this will match the next comment
end_idx = text.find('<div className="h-gradient" aria-hidden="true" />')

jsx_replace = '''      {/* ── 1: Background ── */}
      <div ref={bgRef} className="h-layer h-bg" aria-hidden="true" style={{ willChange: 'transform' }}>
        <img
          src="/background.png" alt=""
          className="h-bg-img"
          loading="eager" decoding="async" aria-hidden="true"
        />
      </div>

      {/* ── 2: Homem + poltrona ── */}
      <div 
        ref={personRef} 
        className="h-layer h-person" 
        aria-hidden="true" 
        style={isMobileState ? undefined : { willChange: 'transform' }}
      >
        {isMobileState ? (
          <img src="/avatar.png" alt="" className="h-person-media h-person-static" loading="eager" />
        ) : (
          <img src="/dr-antonio-carlos.png" alt="" className="h-person-media h-person-static" loading="eager" />
        )}
      </div>

      {/* ── 3: Foliagens Animadas (Sway) ── */}
      {!isMobileState && (
        <div ref={fgRef} className="h-layer h-fg" aria-hidden="true" style={{ willChange: 'transform' }}>
          <img src="/folhagens.png" className="sway-1 w-full h-full object-cover" alt="" loading="lazy" decoding="async" aria-hidden="true" />
        </div>
      )}

      '''

# Safely replace only that block
old_block = text[start_idx:end_idx]
text = text.replace(old_block, jsx_replace)

# 5. Update CSS for foreground
css_start = text.find('/* 3')
css_end = text.find('/* 5')

css_replace = '''/* 3 — Foliagens frontais */
        .h-fg { z-index: 4; }
        .h-fg img {
          width: 100%; height: 100%;
          object-fit: cover;
          object-position: center;
          display: block;
          pointer-events: none;
        }

        '''
old_css_block = text[css_start:css_end]
text = text.replace(old_css_block, css_replace)

with open('src/components/HeroSection.tsx', 'w', encoding='utf-8') as f:
    f.write(text)

