
const fs = require('fs');

// 1. ScrollIndicator: Move to right side
let scrollInd = fs.readFileSync('src/components/ScrollIndicator.tsx', 'utf8');
scrollInd = scrollInd.replace(
  /className="fixed bottom-2 md:bottom-4 left-1\/2 -translate-x-1\/2 z-50 flex flex-col items-center gap-1 transition-opacity duration-1000"/,
  'className="fixed bottom-2 md:bottom-4 right-4 md:right-16 z-50 flex flex-col items-center gap-1 transition-opacity duration-1000"'
);
fs.writeFileSync('src/components/ScrollIndicator.tsx', scrollInd, 'utf8');

// 2. scrollUtils: Skip hidden scenes
let utils = fs.readFileSync('src/scrollUtils.ts', 'utf8');
utils = utils.replace(
  /const rect = el\.getBoundingClientRect\(\);\n\s*const elTop/,
  'const rect = el.getBoundingClientRect();\n    if (rect.height === 0) return;\n    const elTop'
);
fs.writeFileSync('src/scrollUtils.ts', utils, 'utf8');

// 3. SideNavigation: Hide 'Síntese' dot on mobile
let sideNav = fs.readFileSync('src/components/SideNavigation.tsx', 'utf8');
sideNav = sideNav.replace(
  /className=\{\$\{?.*?relative group flex items-center justify-center transition-all duration-300 w-4 h-4\\}/,
  'className={elative group flex items-center justify-center transition-all duration-300 w-4 h-4 }'
);
fs.writeFileSync('src/components/SideNavigation.tsx', sideNav, 'utf8');

// 4. ScrollOverlay: Hide scene 5 on mobile, remove uppercase from titles
let overlay = fs.readFileSync('src/components/ScrollOverlay.tsx', 'utf8');
overlay = overlay.replace(
  /id="scene-5"\s*style=\{\{ background: 'linear-gradient/,
  'className="scene min-h-screen w-full hidden md:flex flex-col justify-center items-center pl-6 pr-12 sm:px-12 md:px-16 lg:px-24"\n        id="scene-5"\n        style={{ background: \'linear-gradient'
);
// Remove uppercase from scene 3 title
overlay = overlay.replace(
  /<h2 className="text-display text-2xl sm:text-3xl md:text-4xl mt-2 uppercase tracking-wide"/,
  '<h2 className="text-display text-2xl sm:text-3xl md:text-4xl mt-2"'
);
// Remove uppercase from scene 5b title
overlay = overlay.replace(
  /<h2 className="text-display text-2xl sm:text-3xl mt-2 uppercase tracking-wide"/,
  '<h2 className="text-display text-2xl sm:text-3xl mt-2"'
);
fs.writeFileSync('src/components/ScrollOverlay.tsx', overlay, 'utf8');

