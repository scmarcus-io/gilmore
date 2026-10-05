// "I smell snow." Canvas snowfall triggered by the Contact section (Miss Patty's).
// Respects prefers-reduced-motion: shows the caption only, no falling flakes.

const DURATION_MS = 9000;
const FLAKE_COUNT = 160;
const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let running = false;

const showCaption = (layer) => {
  const caption = document.createElement('p');
  caption.className = 'snow-caption';
  caption.setAttribute('role', 'status');
  caption.textContent = 'I smell snow.';
  layer.appendChild(caption);
};

export function letItSnow() {
  if (running) return;
  running = true;

  const layer = document.createElement('div');
  layer.className = 'snow-layer';
  document.body.appendChild(layer);
  // Modal dialogs live in the browser's top layer, above any z-index.
  // A manual popover joins the top layer too (opened later = painted on top).
  if (layer.showPopover) { layer.popover = 'manual'; layer.showPopover(); }
  showCaption(layer);

  const cleanup = () => {
    layer.classList.add('is-fading');
    setTimeout(() => { layer.remove(); running = false; }, 1200);
  };

  if (reducedMotion()) {
    setTimeout(cleanup, 3000);
    return;
  }

  const canvas = document.createElement('canvas');
  canvas.setAttribute('aria-hidden', 'true');
  layer.prepend(canvas);
  const ctx = canvas.getContext('2d');
  const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
  resize();
  window.addEventListener('resize', resize);

  const flakes = Array.from({ length: FLAKE_COUNT }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * -canvas.height,
    r: 1.5 + Math.random() * 3.5,
    speed: 0.6 + Math.random() * 1.6,
    drift: Math.random() * Math.PI * 2,
  }));

  const start = performance.now();
  const frame = (now) => {
    const elapsed = now - start;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    for (const f of flakes) {
      f.y += f.speed;
      f.drift += 0.01;
      f.x += Math.sin(f.drift) * 0.6;
      // Stop recycling flakes near the end so the snow tapers off naturally.
      if (f.y > canvas.height && elapsed < DURATION_MS - 2500) { f.y = -10; f.x = Math.random() * canvas.width; }
      ctx.beginPath();
      ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
      ctx.fill();
    }
    if (elapsed < DURATION_MS) requestAnimationFrame(frame);
    else { window.removeEventListener('resize', resize); cleanup(); }
  };
  requestAnimationFrame(frame);
}
