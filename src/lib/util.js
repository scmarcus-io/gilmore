/** Deterministic PRNG (mulberry32). Same seed = same scenery on every load. */
export const mulberry32 = (seed) => () => {
  let t = (seed += 0x6d2b79f5);
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

export const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Resolve on the element's transitionend, or after `ms` as a safety net (reduced motion, no-op transitions). */
export const afterTransition = (el, ms) => new Promise((resolve) => {
  let done = false;
  const finish = () => { if (!done) { done = true; el.removeEventListener('transitionend', onEnd); resolve(); } };
  const onEnd = (e) => { if (e.target === el) finish(); };
  el.addEventListener('transitionend', onEnd);
  setTimeout(finish, ms);
});

export const nextFrame = () => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
