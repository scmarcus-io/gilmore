// Pannable 2.5D town map. Buildings are real <button>s so keyboard + screen readers work (D4).
import { locations } from '../data/content.js';
import { buildings } from './buildings.js';
import { WORLD, placements, sceneryMarkup } from './scenery.js';

const DRAG_THRESHOLD = 6; // px moved before a press counts as a drag, not a click
const KEY_STEP = 80;
const CLOUD_PARALLAX = 0.35; // clouds move slower than the ground, which reads as depth

const buildingButton = ({ id, name, section }) => {
  const { width, height, svg } = buildings[id];
  const { x, y } = placements[id];
  return `
    <button class="building" data-location="${id}" style="left:${x}px;top:${y}px;width:${width}px;height:${height}px"
            aria-label="${name}: ${section}">
      <svg viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" aria-hidden="true" focusable="false">${svg}</svg>
      <span class="building__tag" aria-hidden="true">${name}<small>${section}</small></span>
    </button>`;
};

const cloudsMarkup = () => Array.from({ length: 7 }, (_, i) => `
  <div class="cloud" style="left:${i * 420 + (i % 2) * 120}px;top:${60 + (i % 3) * 380}px;--s:${0.8 + (i % 3) * 0.3}"></div>`).join('');

export function createTownMap(root, { onEnter }) {
  root.innerHTML = `
    <div class="town" tabindex="0" role="region" aria-label="Town map. Use arrow keys or drag to look around. Tab to buildings and press Enter to go inside.">
      <div class="town__world" style="width:${WORLD.width}px;height:${WORLD.height}px">
        ${sceneryMarkup()}
        ${locations.map(buildingButton).join('')}
      </div>
      <div class="town__clouds" aria-hidden="true">${cloudsMarkup()}</div>
    </div>`;

  const viewport = root.querySelector('.town');
  const world = root.querySelector('.town__world');
  const clouds = root.querySelector('.town__clouds');
  const pos = { x: 0, y: 0 };

  const clamp = () => {
    pos.x = Math.min(0, Math.max(viewport.clientWidth - WORLD.width, pos.x));
    pos.y = Math.min(0, Math.max(viewport.clientHeight - WORLD.height, pos.y));
  };

  const apply = () => {
    clamp();
    world.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
    clouds.style.transform = `translate3d(${pos.x * CLOUD_PARALLAX}px, ${pos.y * CLOUD_PARALLAX}px, 0)`;
  };

  const lookAt = (worldX, worldY) => {
    pos.x = viewport.clientWidth / 2 - worldX;
    pos.y = viewport.clientHeight / 2 - worldY;
    apply();
  };

  const centerOn = (id) => {
    const { x, y } = placements[id];
    const { width, height } = buildings[id];
    lookAt(x + width / 2, y + height / 2);
  };

  // Drag to pan (mouse, pen, touch via pointer events).
  let drag = null;
  viewport.addEventListener('pointerdown', (e) => {
    if (e.button !== 0) return;
    drag = { startX: e.clientX, startY: e.clientY, originX: pos.x, originY: pos.y, moved: false };
  });
  window.addEventListener('pointermove', (e) => {
    if (!drag) return;
    const dx = e.clientX - drag.startX;
    const dy = e.clientY - drag.startY;
    if (!drag.moved && Math.hypot(dx, dy) < DRAG_THRESHOLD) return;
    if (!drag.moved) viewport.setPointerCapture?.(e.pointerId);
    drag.moved = true;
    viewport.classList.add('is-dragging');
    pos.x = drag.originX + dx;
    pos.y = drag.originY + dy;
    apply();
  });
  const endDrag = () => {
    viewport.classList.remove('is-dragging');
    // Defer reset so the click handler can see whether this was a drag.
    setTimeout(() => { drag = null; }, 0);
  };
  window.addEventListener('pointerup', endDrag);
  window.addEventListener('pointercancel', endDrag);

  // Wheel / trackpad pans instead of zooming the page.
  viewport.addEventListener('wheel', (e) => {
    e.preventDefault();
    pos.x -= e.shiftKey ? e.deltaY : e.deltaX;
    pos.y -= e.shiftKey ? 0 : e.deltaY;
    apply();
  }, { passive: false });

  // Arrow keys pan when the map itself has focus.
  viewport.addEventListener('keydown', (e) => {
    const moves = { ArrowLeft: [1, 0], ArrowRight: [-1, 0], ArrowUp: [0, 1], ArrowDown: [0, -1] };
    const move = moves[e.key];
    if (!move) return;
    e.preventDefault();
    pos.x += move[0] * KEY_STEP;
    pos.y += move[1] * KEY_STEP;
    apply();
  });

  // Keep focused buildings in view when tabbing around.
  viewport.addEventListener('focusin', (e) => {
    const id = e.target.closest?.('.building')?.dataset.location;
    if (id && e.target.matches(':focus-visible')) centerOn(id);
  });

  viewport.addEventListener('click', (e) => {
    const button = e.target.closest('.building');
    if (!button || drag?.moved) return;
    onEnter(button.dataset.location, button);
  });

  window.addEventListener('resize', apply);

  return { centerOn, lookAt, refresh: apply };
}
