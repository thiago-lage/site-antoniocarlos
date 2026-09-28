# -*- coding: utf-8 -*-
import re

# 1. ScrollIndicator
with open('src/components/ScrollIndicator.tsx', 'r', encoding='utf-8') as f: text = f.read()
text = re.sub(
    r'className="fixed bottom-2 md:bottom-4 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-1 transition-opacity duration-1000"',
    'className="fixed bottom-2 md:bottom-4 right-4 md:right-[max(4rem,calc(50vw-290px))] z-50 flex flex-col items-center gap-1 transition-opacity duration-1000"',
    text
)
with open('src/components/ScrollIndicator.tsx', 'w', encoding='utf-8') as f: f.write(text)

# 2. scrollUtils
with open('src/scrollUtils.ts', 'r', encoding='utf-8') as f: utils = f.read()
utils = re.sub(
    r'const rect = el\.getBoundingClientRect\(\);\n\s*const elTop',
    'const rect = el.getBoundingClientRect();\n    if (rect.height === 0) return;\n    const elTop',
    utils
)
with open('src/scrollUtils.ts', 'w', encoding='utf-8') as f: f.write(utils)

# 3. SideNavigation
with open('src/components/SideNavigation.tsx', 'r', encoding='utf-8') as f: sideNav = f.read()
sideNav = re.sub(
    r'className={elative group flex items-center justify-center transition-all duration-300 w-4 h-4}',
    'className={elative group flex items-center justify-center transition-all duration-300 w-4 h-4 }',
    sideNav
)
with open('src/components/SideNavigation.tsx', 'w', encoding='utf-8') as f: f.write(sideNav)

# 4. ScrollOverlay
with open('src/components/ScrollOverlay.tsx', 'r', encoding='utf-8') as f: overlay = f.read()
overlay = re.sub(
    r'<section\n\s*className="scene min-h-screen w-full flex flex-col justify-center items-center pl-6 pr-12 sm:px-12 md:px-16 \nlg:px-24"\n\s*id="scene-5"',
    '<section\n        className="scene min-h-screen w-full hidden md:flex flex-col justify-center items-center pl-6 pr-12 sm:px-12 md:px-16 lg:px-24"\n        id="scene-5"',
    overlay
)
# fallback for overlay section class just in case:
overlay = re.sub(
    r'className="scene min-h-screen w-full flex flex-col justify-center items-center pl-6 pr-12 sm:px-12 md:px-16 lg:px-24"\n\s*id="scene-5"',
    'className="scene min-h-screen w-full hidden md:flex flex-col justify-center items-center pl-6 pr-12 sm:px-12 md:px-16 lg:px-24"\n        id="scene-5"',
    overlay
)

overlay = re.sub(
    r'<h2 className="text-display text-2xl sm:text-3xl md:text-4xl mt-2 uppercase tracking-wide"',
    '<h2 className="text-display text-2xl sm:text-3xl md:text-4xl mt-2"',
    overlay
)
overlay = re.sub(
    r'<h2 className="text-display text-2xl sm:text-3xl mt-2 uppercase tracking-wide"',
    '<h2 className="text-display text-2xl sm:text-3xl mt-2"',
    overlay
)
with open('src/components/ScrollOverlay.tsx', 'w', encoding='utf-8') as f: f.write(overlay)
