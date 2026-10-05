// Shared SVG building blocks for store interiors. Scene coordinate space: 1600 x 900.
import { mulberry32 } from '../lib/util.js';

export const SCENE = { width: 1600, height: 900 };

/** CSS position for an HTML element laid over the scene, in scene units. */
export const place = ({ x, y, w, h }) =>
  `left:${(x / SCENE.width) * 100}%;top:${(y / SCENE.height) * 100}%;width:${(w / SCENE.width) * 100}%;height:${(h / SCENE.height) * 100}%`;

export const sceneSvg = (inner) => `
  <svg class="interior__art" viewBox="0 0 ${SCENE.width} ${SCENE.height}" aria-hidden="true" focusable="false"
       preserveAspectRatio="xMidYMid meet">${inner}</svg>`;

/** Back wall + floor. `floor` is any SVG markup drawn over the floor area (y >= horizon). */
export const room = ({ wall, wainscot, trim = 'var(--trim)', horizon = 660, floor = '' }) => `
  <rect width="1600" height="${horizon}" fill="${wall}"/>
  ${wainscot ? `<rect y="${horizon - 170}" width="1600" height="170" fill="${wainscot}"/>
    <rect y="${horizon - 176}" width="1600" height="10" fill="${trim}"/>` : ''}
  <rect y="${horizon}" width="1600" height="${900 - horizon}" fill="var(--floor-base, #8a6440)"/>
  ${floor}
  <rect y="${horizon - 8}" width="1600" height="12" fill="${trim}"/>
  <rect y="${horizon}" width="1600" height="${900 - horizon}" fill="url(#floor-fade)"/>
  <defs><linearGradient id="floor-fade" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#000" stop-opacity=".18"/><stop offset="1" stop-color="#000" stop-opacity="0"/>
  </linearGradient></defs>`;

export const planks = (horizon, a, b) => Array.from({ length: 9 }, (_, i) => {
  const y = horizon + i * 30;
  return `<rect y="${y}" width="1600" height="30" fill="${i % 2 ? a : b}"/>
    ${Array.from({ length: 6 }, (__, j) => `<line x1="${((j * 290 + i * 137) % 1600)}" y1="${y}" x2="${((j * 290 + i * 137) % 1600)}" y2="${y + 30}" stroke="rgba(0,0,0,.18)" stroke-width="2"/>`).join('')}`;
}).join('');

export const checker = (horizon, a, b, size = 60) => {
  const rows = Math.ceil((900 - horizon) / size);
  return Array.from({ length: rows }, (_, r) => Array.from({ length: Math.ceil(1600 / size) }, (__, c) =>
    `<rect x="${c * size}" y="${horizon + r * size}" width="${size}" height="${size}" fill="${(r + c) % 2 ? a : b}"/>`).join('')).join('');
};

/** A window looking out onto an autumn street. `weather: 'snow'` adds falling flakes (static). */
export const windowView = (x, y, w, h, { frame = 'var(--white-paint)', weather = 'fall' } = {}) => {
  const sky = weather === 'snow' ? ['#9fb3c8', '#dfe8ef'] : ['#bcd9e6', '#f6dcb0'];
  const rand = mulberry32(x + y);
  const id = `sky-${x}-${y}`;
  const trees = Array.from({ length: 4 }, (_, i) => {
    const tx = x + 20 + (i + 0.5) * ((w - 40) / 4);
    const c = weather === 'snow' ? '#eef3f6' : ['var(--leaf-red)', 'var(--leaf-gold)', 'var(--leaf-orange)', 'var(--forest)'][i];
    return `<rect x="${tx - 4}" y="${y + h * 0.62}" width="8" height="${h * 0.2}" fill="var(--trunk)"/>
      <circle cx="${tx}" cy="${y + h * 0.55}" r="${h * 0.13}" fill="${c}"/>`;
  }).join('');
  const flakes = weather === 'snow'
    ? Array.from({ length: 30 }, () => `<circle cx="${x + rand() * w}" cy="${y + rand() * h}" r="${1.5 + rand() * 2.5}" fill="#fff"/>`).join('')
    : '';
  return `
    <defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${sky[0]}"/><stop offset="1" stop-color="${sky[1]}"/></linearGradient></defs>
    <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="url(#${id})"/>
    <rect x="${x}" y="${y + h * 0.78}" width="${w}" height="${h * 0.22}" fill="${weather === 'snow' ? '#f4f7f9' : 'var(--grass)'}"/>
    ${trees}${flakes}
    <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="none" stroke="${frame}" stroke-width="16"/>
    <line x1="${x + w / 2}" y1="${y}" x2="${x + w / 2}" y2="${y + h}" stroke="${frame}" stroke-width="10"/>
    <line x1="${x}" y1="${y + h / 2}" x2="${x + w}" y2="${y + h / 2}" stroke="${frame}" stroke-width="10"/>
    <rect x="${x - 14}" y="${y + h}" width="${w + 28}" height="16" fill="${frame}"/>`;
};

export const pendantLamp = (x, length = 90, shade = 'var(--forest)') => `
  <line x1="${x}" y1="0" x2="${x}" y2="${length}" stroke="var(--ink)" stroke-width="3"/>
  <path d="M${x - 34} ${length + 34} Q${x} ${length - 14} ${x + 34} ${length + 34} Z" fill="${shade}"/>
  <ellipse cx="${x}" cy="${length + 36}" rx="16" ry="7" fill="var(--bulb)" class="twinkle"/>
  <ellipse cx="${x}" cy="${length + 120}" rx="120" ry="80" fill="var(--bulb)" opacity=".08"/>`;

const BOOK_COLORS = ['#9e2b25', '#2f5233', '#1f3b5a', '#d7a54a', '#5a2d55', '#3b2a1f', '#c96a3a', '#4c5a68', '#e8dcc0'];

/** A shelf row of book spines filling width w. */
export const bookRow = (x, y, w, h, seed) => {
  const rand = mulberry32(seed);
  let cx = x;
  const out = [];
  while (cx < x + w - 12) {
    const bw = 12 + rand() * 18;
    const bh = h * (0.72 + rand() * 0.28);
    const lean = rand() > 0.94 ? 8 : 0;
    out.push(`<rect x="${cx}" y="${y + h - bh}" width="${Math.min(bw, x + w - cx)}" height="${bh}" fill="${BOOK_COLORS[Math.floor(rand() * BOOK_COLORS.length)]}" ${lean ? `transform="rotate(${lean} ${cx} ${y + h})"` : ''}/>
      <rect x="${cx + 3}" y="${y + h - bh + 10}" width="${Math.max(bw - 6, 2)}" height="3" fill="rgba(255,255,255,.35)"/>`);
    cx += bw + 1.5;
  }
  return out.join('');
};

/** A full bookcase: frame + n shelves of books. */
export const bookcase = (x, y, w, h, shelves, seed, wood = '#4a2f22') => {
  const sh = h / shelves;
  return `<rect x="${x - 14}" y="${y - 14}" width="${w + 28}" height="${h + 28}" fill="${wood}"/>
    <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#2a1a12"/>
    ${Array.from({ length: shelves }, (_, i) => `${bookRow(x + 6, y + i * sh + 8, w - 12, sh - 20, seed + i)}
      <rect x="${x}" y="${y + (i + 1) * sh - 12}" width="${w}" height="12" fill="${wood}"/>`).join('')}`;
};

export const plant = (x, y, s = 1) => `
  <g transform="translate(${x} ${y}) scale(${s})">
    ${[-40, -15, 10, 35].map((a, i) => `<ellipse cx="0" cy="-60" rx="14" ry="60" fill="${i % 2 ? '#3e6b3f' : '#2f5233'}" transform="rotate(${a} 0 0)"/>`).join('')}
    <path d="M-34 0 h68 l-8 52 h-52 z" fill="#b5653a"/><rect x="-38" y="-6" width="76" height="12" rx="3" fill="#9a5230"/>
  </g>`;

export const frame = (x, y, w, h, inner, color = '#6b4a2f') => `
  <rect x="${x - 10}" y="${y - 10}" width="${w + 20}" height="${h + 20}" fill="${color}"/>
  <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="var(--paper)"/>${inner}`;

export const stringLights = (x1, x2, y, sag = 40, count = 14) => {
  const pts = Array.from({ length: count }, (_, i) => {
    const t = i / (count - 1);
    return [x1 + (x2 - x1) * t, y + Math.sin(Math.PI * t) * sag];
  });
  return `<path d="M${x1} ${y} Q${(x1 + x2) / 2} ${y + sag * 2} ${x2} ${y}" fill="none" stroke="var(--ink)" stroke-width="2"/>
    ${pts.map(([px, py], i) => `<circle cx="${px}" cy="${py + 6}" r="6" fill="var(--bulb)" class="twinkle" style="animation-delay:${(i % 4) * 0.4}s"/>`).join('')}`;
};
