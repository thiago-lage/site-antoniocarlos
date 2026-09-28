import re
with open('src/components/ScrollOverlay.tsx', 'r', encoding='utf-8', errors='ignore') as f:
    content = f.read()

scene4_regex = r'<section\s+className=\"scene [^\"]+\"\s+id=\"scene-4\"\s+style={{[^}]+}}\s*>.*?</section>'
content = re.sub(scene4_regex, '<TrajectorySection />', content, flags=re.DOTALL)

with open('src/components/ScrollOverlay.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
