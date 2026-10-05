// Luke's "No Cell Phones" speech bubble + the house-rules toggle on the diner menu.

const LINES = [
  'Hey! No cell phones in here. Read the sign.',
  "Phones away. This is a diner, not a phone booth.",
  "I'm serious. There's a sign. It's right there.",
];
const OFF_LINES = [
  'Fine. FINE. But I am watching you.',
  "You're lucky I'm in a good mood.",
];
const pick = (list) => list[Math.floor(Math.random() * list.length)];

const showBubble = (container, text) => {
  container.querySelector('.luke-bubble')?.remove();
  const bubble = document.createElement('div');
  bubble.className = 'luke-bubble';
  bubble.setAttribute('role', 'status');
  bubble.innerHTML = `
    <span class="luke-bubble__avatar" aria-hidden="true">
      <svg viewBox="0 0 40 40" width="40" height="40"><circle cx="20" cy="22" r="14" fill="var(--skin)"/>
        <path d="M5 18 Q20 2 35 18 V14 Q20 -2 5 14 Z" fill="var(--flannel-dark)"/><rect x="4" y="15" width="32" height="5" fill="var(--flannel-dark)"/>
        <circle cx="15" cy="22" r="1.6" fill="var(--ink)"/><circle cx="25" cy="22" r="1.6" fill="var(--ink)"/>
        <path d="M14 30 q6 -3 12 0" stroke="var(--ink)" stroke-width="1.6" fill="none"/></svg>
    </span>
    <span class="luke-bubble__text"><strong>Luke:</strong> ${text}</span>
    <button type="button" class="luke-bubble__close" aria-label="Dismiss">&times;</button>`;
  bubble.querySelector('button').addEventListener('click', () => bubble.remove());
  container.prepend(bubble);
};

/** Wire up Luke's section inside `container`. `greet` shows the bubble on entry. */
export function initLukes(container, { greet = true } = {}) {
  const toggle = container.querySelector('[data-no-phones]');
  const status = container.querySelector('[data-no-phones-status]');
  if (!toggle) return;
  const body = container.querySelector('.section__body') ?? container;

  if (greet) showBubble(body, pick(LINES));

  toggle.addEventListener('change', () => {
    status.textContent = toggle.checked ? 'Enforced. Luke is watching.' : 'Suspended (begrudgingly).';
    showBubble(body, toggle.checked ? pick(LINES) : pick(OFF_LINES));
  });
}
