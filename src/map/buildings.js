// Original "inspired-by" SVG illustrations for each town building (D3: no show assets).
// Each entry: { width, height, door: { x, y, color }, svg }. door.x/y = front door as a fraction
// of width/height (the camera zooms toward it); door.color tints the door-opening transition.

const sign = (x, y, w, text, fill = 'var(--cream)', ink = 'var(--coffee)') => `
  <rect x="${x}" y="${y}" width="${w}" height="26" rx="3" fill="${fill}" stroke="var(--coffee)" stroke-width="2"/>
  <text x="${x + w / 2}" y="${y + 18}" text-anchor="middle" class="bldg-sign" fill="${ink}">${text}</text>`;

const window4 = (x, y, w = 34, h = 42) => `
  <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="var(--window)" stroke="var(--trim)" stroke-width="4"/>
  <line x1="${x + w / 2}" y1="${y}" x2="${x + w / 2}" y2="${y + h}" stroke="var(--trim)" stroke-width="3"/>
  <line x1="${x}" y1="${y + h / 2}" x2="${x + w}" y2="${y + h / 2}" stroke="var(--trim)" stroke-width="3"/>`;

const awning = (x, y, w, a, b, stripes = 8) => {
  const sw = w / stripes;
  const bands = Array.from({ length: stripes }, (_, i) =>
    `<path d="M${x + i * sw} ${y} h${sw} l-4 26 h${-sw + 8} z" fill="${i % 2 ? b : a}"/>`).join('');
  return `${bands}<path d="M${x - 4} ${y + 26} ${Array.from({ length: stripes }, (_, i) =>
    `q${sw / 2} 12 ${sw} 0`).join(' ')}" fill="${a}" stroke="var(--coffee)" stroke-width="1.5"/>`;
};

export const buildings = {
  gazebo: {
    width: 280, height: 250, door: { x: 0.5, y: 0.75, color: 'var(--forest)' },
    svg: `
      <ellipse cx="140" cy="236" rx="138" ry="14" fill="var(--shadow)"/>
      <rect x="30" y="206" width="220" height="26" fill="var(--white-paint)" stroke="var(--trim-dark)" stroke-width="2"/>
      <path d="M60 206 v-14 h160 v14" fill="var(--white-paint)" stroke="var(--trim-dark)" stroke-width="2"/>
      ${[50, 95, 140, 185, 230].map((x) => `<rect x="${x - 5}" y="104" width="10" height="102" fill="var(--white-paint)" stroke="var(--trim-dark)" stroke-width="1.5"/>`).join('')}
      <path d="M45 175 H235" stroke="var(--white-paint)" stroke-width="6"/>
      ${Array.from({ length: 19 }, (_, i) => `<line x1="${48 + i * 10}" y1="175" x2="${48 + i * 10}" y2="200" stroke="var(--white-paint)" stroke-width="3"/>`).join('')}
      <path d="M20 108 L140 40 L260 108 Z" fill="var(--roof-green)" stroke="var(--trim-dark)" stroke-width="2"/>
      <path d="M20 108 q60 14 120 0 q60 14 120 0" fill="none" stroke="var(--white-paint)" stroke-width="5"/>
      <rect x="128" y="20" width="24" height="26" fill="var(--white-paint)" stroke="var(--trim-dark)" stroke-width="1.5"/>
      <path d="M122 22 L140 4 L158 22 Z" fill="var(--roof-green)"/>
      ${Array.from({ length: 9 }, (_, i) => `<circle cx="${36 + i * 26}" cy="${112 + (i % 2) * 4}" r="3.5" class="twinkle" fill="var(--bulb)"/>`).join('')}`,
  },

  lukes: {
    width: 300, height: 260, door: { x: 0.56, y: 0.78, color: 'var(--door)' },
    svg: `
      <ellipse cx="150" cy="250" rx="148" ry="10" fill="var(--shadow)"/>
      <rect x="10" y="40" width="280" height="208" fill="var(--brick)"/>
      ${Array.from({ length: 12 }, (_, r) => `<line x1="10" y1="${52 + r * 16}" x2="290" y2="${52 + r * 16}" stroke="var(--brick-dark)" stroke-width="1"/>`).join('')}
      <rect x="0" y="28" width="300" height="18" fill="var(--trim-dark)"/>
      ${sign(70, 56, 160, "LUKE'S", 'var(--cream)')}
      ${window4(30, 98, 50, 40)}${window4(125, 98, 50, 40)}${window4(220, 98, 50, 40)}
      <rect x="20" y="160" width="120" height="78" fill="var(--window)" stroke="var(--trim-dark)" stroke-width="5"/>
      <rect x="196" y="160" width="84" height="78" fill="var(--window)" stroke="var(--trim-dark)" stroke-width="5"/>
      <rect x="148" y="156" width="42" height="92" fill="var(--door)" stroke="var(--trim-dark)" stroke-width="4"/>
      <circle cx="182" cy="204" r="3" fill="var(--bulb)"/>
      <text x="80" y="206" text-anchor="middle" class="bldg-small" fill="var(--coffee)">DINER</text>
      <path d="M218 214 h40 v8 a20 20 0 0 1 -40 0 z" fill="var(--cream)" opacity=".85"/>
      <path d="M258 216 q10 2 0 10" fill="none" stroke="var(--cream)" stroke-width="3" opacity=".85"/>`,
  },

  westons: {
    width: 230, height: 230, door: { x: 0.72, y: 0.78, color: 'var(--door-green)' },
    svg: `
      <ellipse cx="115" cy="220" rx="112" ry="9" fill="var(--shadow)"/>
      <rect x="12" y="52" width="206" height="166" fill="var(--butter)"/>
      <path d="M4 56 L115 14 L226 56 Z" fill="var(--roof-brown)"/>
      ${sign(45, 64, 140, 'BAKERY', 'var(--pink-soft)')}
      ${awning(16, 104, 198, 'var(--pink)', 'var(--cream)', 9)}
      <rect x="26" y="146" width="96" height="62" fill="var(--window)" stroke="var(--trim)" stroke-width="4"/>
      ${[48, 74, 100].map((x) => `<circle cx="${x}" cy="196" r="9" fill="var(--pink)"/><rect x="${x - 9}" y="196" width="18" height="10" fill="var(--butter-dark)"/>`).join('')}
      <rect x="140" y="140" width="52" height="78" fill="var(--door-green)" stroke="var(--trim)" stroke-width="4"/>
      <circle cx="184" cy="182" r="3" fill="var(--bulb)"/>`,
  },

  dragonfly: {
    width: 420, height: 320, door: { x: 0.49, y: 0.82, color: 'var(--door)' },
    svg: `
      <ellipse cx="210" cy="308" rx="206" ry="12" fill="var(--shadow)"/>
      <rect x="40" y="110" width="320" height="196" fill="var(--inn)"/>
      <path d="M24 116 L200 36 L376 116 Z" fill="var(--roof-slate)"/>
      <rect x="300" y="60" width="78" height="246" fill="var(--inn)"/>
      <path d="M290 66 L339 0 L388 66 Z" fill="var(--roof-slate)"/>
      ${window4(322, 86, 34, 44)}${window4(322, 150, 34, 44)}
      <path d="M176 116 L200 78 L224 116 Z" fill="var(--inn)" stroke="var(--roof-slate)" stroke-width="4"/>
      ${window4(188, 90, 24, 22)}
      ${[66, 136, 230].map((x) => window4(x, 130, 34, 46)).join('')}
      <rect x="20" y="210" width="370" height="12" fill="var(--white-paint)"/>
      <path d="M14 214 L40 196 H370 L396 214 Z" fill="var(--roof-slate)"/>
      ${[30, 100, 170, 240, 310, 380].map((x) => `<rect x="${x - 4}" y="220" width="8" height="78" fill="var(--white-paint)"/>`).join('')}
      <path d="M26 270 H384" stroke="var(--white-paint)" stroke-width="5"/>
      ${Array.from({ length: 36 }, (_, i) => `<line x1="${28 + i * 10}" y1="270" x2="${28 + i * 10}" y2="296" stroke="var(--white-paint)" stroke-width="2.5"/>`).join('')}
      <rect x="184" y="226" width="44" height="72" fill="var(--door)" stroke="var(--white-paint)" stroke-width="4"/>
      ${window4(80, 232, 40, 34)}${window4(286, 232, 40, 34)}
      <rect x="0" y="296" width="410" height="14" fill="var(--white-paint)" stroke="var(--trim-dark)" stroke-width="1.5"/>
      <g transform="translate(150 6)">${sign(0, 0, 120, 'THE INN', 'var(--cream)')}</g>`,
  },

  dooses: {
    width: 320, height: 240, door: { x: 0.5, y: 0.76, color: 'var(--door-green)' },
    svg: `
      <ellipse cx="160" cy="230" rx="158" ry="10" fill="var(--shadow)"/>
      <rect x="10" y="48" width="300" height="180" fill="var(--white-paint)"/>
      ${Array.from({ length: 11 }, (_, r) => `<line x1="10" y1="${60 + r * 15}" x2="310" y2="${60 + r * 15}" stroke="var(--clapboard)" stroke-width="1.5"/>`).join('')}
      <path d="M0 52 L20 26 H300 L320 52 Z" fill="var(--roof-green)"/>
      ${sign(70, 58, 180, "DOOSE'S MARKET", 'var(--forest)', 'var(--cream)')}
      ${awning(14, 98, 292, 'var(--forest)', 'var(--white-paint)', 12)}
      <rect x="24" y="140" width="100" height="70" fill="var(--window)" stroke="var(--trim)" stroke-width="4"/>
      <rect x="196" y="140" width="100" height="70" fill="var(--window)" stroke="var(--trim)" stroke-width="4"/>
      <rect x="138" y="136" width="46" height="92" fill="var(--door-green)" stroke="var(--trim)" stroke-width="4"/>
      ${[[30, 'var(--apple)'], [74, 'var(--pumpkin)'], [214, 'var(--apple)'], [258, 'var(--butter-dark)']].map(([x, c]) => `
        <rect x="${x}" y="206" width="38" height="20" fill="var(--crate)" stroke="var(--coffee)" stroke-width="1.5"/>
        ${[8, 19, 30].map((dx) => `<circle cx="${x + dx}" cy="204" r="6" fill="${c}"/>`).join('')}`).join('')}`,
  },

  bookstore: {
    width: 200, height: 260, door: { x: 0.74, y: 0.82, color: 'var(--ink)' },
    svg: `
      <ellipse cx="100" cy="250" rx="98" ry="9" fill="var(--shadow)"/>
      <rect x="14" y="30" width="172" height="218" fill="var(--brick-dark)"/>
      ${Array.from({ length: 13 }, (_, r) => `<line x1="14" y1="${42 + r * 16}" x2="186" y2="${42 + r * 16}" stroke="var(--brick)" stroke-width="1"/>`).join('')}
      <rect x="6" y="20" width="188" height="14" fill="var(--ink)"/>
      ${window4(34, 52, 36, 44)}${window4(130, 52, 36, 44)}
      ${sign(30, 112, 140, 'BOOKS', 'var(--white-paint)', 'var(--ink)')}
      ${awning(16, 146, 168, 'var(--ink)', 'var(--white-paint)', 8)}
      <rect x="24" y="186" width="86" height="56" fill="var(--window)" stroke="var(--ink)" stroke-width="4"/>
      ${[30, 40, 50, 62, 72, 84, 96].map((x, i) => `<rect x="${x}" y="${214 - (i % 3) * 4}" width="8" height="${24 + (i % 3) * 4}" fill="${['var(--apple)', 'var(--forest)', 'var(--butter-dark)'][i % 3]}"/>`).join('')}
      <rect x="124" y="180" width="48" height="68" fill="var(--ink)" stroke="var(--white-paint)" stroke-width="3"/>`,
  },

  pattys: {
    width: 260, height: 240, door: { x: 0.5, y: 0.86, color: 'var(--roof-plum)' },
    svg: `
      <ellipse cx="130" cy="230" rx="128" ry="10" fill="var(--shadow)"/>
      <rect x="12" y="56" width="236" height="172" fill="var(--lavender)"/>
      <path d="M2 60 L130 10 L258 60 Z" fill="var(--roof-plum)"/>
      <circle cx="130" cy="40" r="12" fill="var(--window)" stroke="var(--white-paint)" stroke-width="3"/>
      ${sign(40, 68, 180, "MISS PATTY'S", 'var(--cream)', 'var(--plum)')}
      <rect x="24" y="108" width="212" height="70" fill="var(--window)" stroke="var(--white-paint)" stroke-width="5"/>
      <line x1="24" y1="150" x2="236" y2="150" stroke="var(--trim-dark)" stroke-width="3"/>
      ${[60, 130, 200].map((x) => `<line x1="${x}" y1="108" x2="${x}" y2="178" stroke="var(--white-paint)" stroke-width="3"/>`).join('')}
      <text x="130" y="138" text-anchor="middle" class="bldg-small" fill="var(--plum)">SCHOOL OF BALLET</text>
      <rect x="104" y="186" width="52" height="42" fill="var(--roof-plum)" stroke="var(--white-paint)" stroke-width="3"/>
      <rect x="30" y="184" width="54" height="40" fill="var(--cork)" stroke="var(--coffee)" stroke-width="3"/>
      ${[[36, 'var(--postit-yellow)'], [52, 'var(--postit-pink)'], [66, 'var(--postit-blue)']].map(([x, c], i) => `<rect x="${x}" y="${190 + (i % 2) * 8}" width="12" height="12" fill="${c}" transform="rotate(${i * 7 - 6} ${x + 6} ${196 + (i % 2) * 8})"/>`).join('')}`,
  },
};
