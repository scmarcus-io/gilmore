// Tiny rendering helpers shared by every section renderer.

const ESCAPES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

/** Escape a value for safe interpolation into HTML. */
export const esc = (value) => String(value ?? '').replace(/[&<>"']/g, (ch) => ESCAPES[ch]);

/** Render the value, or a styled "fill me in" placeholder when it's blank. */
export const orBlank = (value, label = 'Coming soon') =>
  value ? esc(value) : `<span class="blank" title="Placeholder: fill in src/data/content.js">${esc(label)}</span>`;

/** Render a link only when a URL exists; otherwise a disabled-looking placeholder. */
export const linkOrBlank = (url, label) =>
  url
    ? `<a href="${esc(url)}" target="_blank" rel="noopener noreferrer">${esc(label)}</a>`
    : `<span class="blank" aria-disabled="true">${esc(label)} (link coming soon)</span>`;

/** Shared section wrapper so both views get identical headings and landmarks. */
export const sectionShell = ({ id, name, section }, body) => `
  <section class="section section--${id}" id="section-${id}" aria-labelledby="heading-${id}">
    <header class="section__header">
      <p class="section__eyebrow">${esc(section)}</p>
      <h2 class="section__title" id="heading-${id}">${esc(name)}</h2>
    </header>
    <div class="section__body">${body}</div>
  </section>`;
