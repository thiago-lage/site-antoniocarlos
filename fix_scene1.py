import re
with open('src/components/ScrollOverlay.tsx', 'r', encoding='utf-8', errors='ignore') as f:
    content = f.read()

content = content.replace('import React, { useEffect, useState, useRef } from \'react\';', 'import React, { useEffect, useState, useRef } from \'react\';\nimport { HeroSection } from \'./HeroSection\';\nimport { TrajectorySection } from \'./TrajectorySection\';')

scene1_regex = r'<section\s+className=\"scene [^\"]+\"\s+id=\"scene-1\"\s*>.*?</section>'
content = re.sub(scene1_regex, '<HeroSection />', content, flags=re.DOTALL)

with open('src/components/ScrollOverlay.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
