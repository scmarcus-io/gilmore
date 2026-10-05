// Static scenery for the town map: ground, roads, square, trees, leaves.
// Seeded RNG keeps tree placement identical between loads (no layout jitter).
import { mulberry32 } from '../lib/util.js';

export const WORLD = { width: 2400, height: 1500 };

// Opening camera target: square plus the north shop row, so Luke's is visible on arrival.
export const START_VIEW = { x: 1200, y: 590 };

// Building placement in world pixels (top-left). Kept here so layout lives in one place.
export const placements = {
  // North-side shops sit with their bottom edge just above the north road (y=480).
  gazebo: { x: 1060, y: 610 },
  lukes: { x: 450, y: 218 },
  westons: { x: 900, y: 248 },
  bookstore: { x: 1250, y: 218 },
  dooses: { x: 1660, y: 238 },
  pattys: { x: 560, y: 1000 },
  dragonfly: { x: 1660, y: 990 },
};

const TREE_COLORS = ['var(--leaf-red)', 'var(--leaf-orange)', 'var(--leaf-gold)', 'var(--forest)', 'var(--leaf-rust)'];

const tree = (x, y, scale, color) => `
  <g transform="translate(${x} ${y}) scale(${scale})">
    <ellipse cx="0" cy="58" rx="34" ry="8" fill="var(--shadow)"/>
    <rect x="-6" y="18" width="12" height="42" fill="var(--trunk)"/>
    <circle cx="0" cy="0" r="32" fill="${color}"/>
    <circle cx="-22" cy="14" r="22" fill="${color}"/>
    <circle cx="22" cy="14" r="22" fill="${color}"/>
    <circle cx="-8" cy="-10" r="14" fill="var(--leaf-highlight)" opacity=".25"/>
  </g>`;

const lamp = (x, y) => `
  <g transform="translate(${x} ${y})">
    <rect x="-3" y="0" width="6" height="70" fill="var(--ink)"/>
    <rect x="-10" y="-14" width="20" height="18" rx="3" fill="var(--bulb)" stroke="var(--ink)" stroke-width="3" class="twinkle"/>
    <ellipse cx="0" cy="72" rx="14" ry="4" fill="var(--shadow)"/>
  </g>`;

// Keep trees off roads and buildings with a simple rectangle-overlap check.
const BLOCKED = [
  { x: 820, y: 560, w: 760, h: 380 }, // town square green (trees placed separately)
  ...Object.entries(placements).map(([, p]) => ({ x: p.x - 40, y: p.y - 40, w: 500, h: 380 })),
  { x: 0, y: 900, w: 2400, h: 90 }, // south road
  { x: 0, y: 470, w: 2400, h: 80 }, // north road
];
const isBlocked = (x, y) => BLOCKED.some((b) => x > b.x && x < b.x + b.w && y > b.y && y < b.y + b.h);

const scatterTrees = (count, seed) => {
  const rand = mulberry32(seed);
  const out = [];
  for (let tries = 0; out.length < count && tries < count * 20; tries += 1) {
    const x = 40 + rand() * (WORLD.width - 80);
    const y = 80 + rand() * (WORLD.height - 160);
    if (!isBlocked(x, y)) out.push(tree(x, y, 0.8 + rand() * 0.6, TREE_COLORS[Math.floor(rand() * TREE_COLORS.length)]));
  }
  return out.join('');
};

const scatterLeaves = (count, seed) => {
  const rand = mulberry32(seed);
  return Array.from({ length: count }, () => {
    const c = TREE_COLORS[Math.floor(rand() * 4)];
    return `<ellipse cx="${rand() * WORLD.width}" cy="${rand() * WORLD.height}" rx="5" ry="2.5" fill="${c}" opacity=".7" transform="rotate(${rand() * 180})"/>`;
  }).join('');
};

export const sceneryMarkup = () => `
  <svg class="town-scenery" viewBox="0 0 ${WORLD.width} ${WORLD.height}" width="${WORLD.width}" height="${WORLD.height}" aria-hidden="true" focusable="false">
    <rect width="100%" height="100%" fill="var(--grass)"/>
    ${scatterLeaves(260, 7)}
    <!-- roads -->
    <rect x="0" y="480" width="${WORLD.width}" height="60" fill="var(--road)"/>
    <rect x="0" y="912" width="${WORLD.width}" height="60" fill="var(--road)"/>
    <rect x="780" y="480" width="60" height="492" fill="var(--road)"/>
    <rect x="1560" y="480" width="60" height="492" fill="var(--road)"/>
    <path d="M0 510 H${WORLD.width} M0 942 H${WORLD.width} M810 540 V912 M1590 540 V912" stroke="var(--road-line)" stroke-width="3" stroke-dasharray="22 18"/>
    <!-- town square -->
    <rect x="840" y="540" width="720" height="372" rx="10" fill="var(--grass-light)"/>
    <path d="M840 726 H1560 M1200 540 V912" stroke="var(--path)" stroke-width="22"/>
    <circle cx="1200" cy="726" r="150" fill="none" stroke="var(--path)" stroke-width="22"/>
    ${[[880, 580], [1520, 580], [880, 872], [1520, 872]].map(([x, y]) => tree(x, y - 40, 0.9, TREE_COLORS[(x + y) % 5])).join('')}
    ${[[850, 560], [1550, 560], [850, 892], [1550, 892], [1200, 520]].map(([x, y]) => lamp(x, y - 60)).join('')}
    <!-- welcome sign -->
    <g transform="translate(120 600)">
      <rect x="-4" y="40" width="8" height="70" fill="var(--trunk)"/><rect x="132" y="40" width="8" height="70" fill="var(--trunk)"/>
      <rect x="-20" y="0" width="176" height="70" rx="8" fill="var(--forest)" stroke="var(--cream)" stroke-width="4"/>
      <text x="68" y="30" text-anchor="middle" class="bldg-small" fill="var(--cream)">WELCOME TO</text>
      <text x="68" y="54" text-anchor="middle" class="bldg-sign" fill="var(--cream)">OUR TOWN</text>
    </g>
    ${scatterTrees(70, 42)}
  </svg>`;
