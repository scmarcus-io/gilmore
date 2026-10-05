// Luke's "No Cell Phones" speech bubble, shown when a visitor walks into the diner.
// The rule itself is a static sign in the scene (no toggle: Luke doesn't negotiate).

const LINES = [
  'Hey! No cell phones in here. Read the sign.',
  'Phones away. This is a diner, not a phone booth.',
  "I'm serious. There's a sign. It's right there.",
];
const pick = (list) => list[Math.floor(Math.random() * list.length)];

const bubbleMarkup = (text) => `
  <span class="luke-bubble__avatar" aria-hidden="true">
    <svg viewBox="0 0 40 40" width="40" height="40"><circle cx="20" cy="22" r="14" fill="var(--skin)"/>
      <path d="M5 18 Q20 2 35 18 V14 Q20 -2 5 14 Z" fill="var(--flannel-dark)"/><rect x="4" y="15" width="32" height="5" fill="var(--flannel-dark)"/>
      <circle cx="15" cy="22" r="1.6" fill="var(--ink)"/><circle cx="25" cy="22" r="1.6" fill="var(--ink)"/>
      <path d="M14 30 q6 -3 12 0" stroke="var(--ink)" stroke-width="1.6" fill="none"/></svg>
  </span>
  <span class="luke-bubble__text"><strong>Luke:</strong> ${text}</span>
  <button type="button" class="luke-bubble__close" aria-label="Dismiss">&times;</button>`;

/** Show Luke's greeting at the top of `container` (replaces any existing bubble). */
export function initLukes(container) {
  const body = container.querySelector('.section__body') ?? container;
  body.querySelector('.luke-bubble')?.remove();
  const bubble = document.createElement('div');
  bubble.className = 'luke-bubble';
  bubble.setAttribute('role', 'status');
  bubble.innerHTML = bubbleMarkup(pick(LINES));
  bubble.querySelector('button').addEventListener('click', () => bubble.remove());
  body.prepend(bubble);
}
