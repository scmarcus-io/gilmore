import './styles/base.css';
import './styles/town.css';
import './styles/sections.css';
import { locations, owner } from './data/content.js';
import { renderSection } from './sections/index.js';
import { createTownMap } from './map/townMap.js';
import { START_VIEW } from './map/scenery.js';
import { initLukes } from './effects/lukes.js';
import { initContactForm } from './effects/contact.js';
import { letItSnow } from './effects/snow.js';

const app = document.querySelector('#app');
const dialog = document.querySelector('#location-dialog');
const dialogContent = dialog.querySelector('.location-dialog__content');

// Per-location "you walked in" behavior, shared by both views.
const onArrive = {
  lukes: (el) => initLukes(el),
  pattys: (el) => { initContactForm(el); letItSnow(); },
};
const arrive = (id, el) => onArrive[id]?.(el);

/* ---------- Town map view ---------- */
let lastTrigger = null;

const openLocation = (id, trigger) => {
  lastTrigger = trigger;
  dialogContent.innerHTML = renderSection(id);
  dialog.setAttribute('aria-labelledby', `heading-${id}`);
  dialog.showModal();
  dialogContent.scrollTop = 0;
  arrive(id, dialogContent);
};

dialog.addEventListener('close', () => {
  dialogContent.innerHTML = '';
  lastTrigger?.focus();
});
// Click on the backdrop closes the dialog.
dialog.addEventListener('click', (e) => { if (e.target === dialog) dialog.close(); });

const renderTown = () => {
  app.innerHTML = '<div id="town-root" class="town-root"></div>';
  const map = createTownMap(app.querySelector('#town-root'), { onEnter: openLocation });
  map.lookAt(START_VIEW.x, START_VIEW.y);
};

/* ---------- "Skip the tour" scroll view ---------- */
const renderList = () => {
  app.innerHTML = `
    <nav class="list-nav" aria-label="Sections">
      ${locations.map((l) => `<a href="#section-${l.id}" data-jump="${l.id}">${l.section}</a>`).join('')}
    </nav>
    <div class="list-view">${locations.map((l) => renderSection(l.id)).join('')}</div>`;

  // Fire each location's arrival hook once, when it scrolls into view.
  const seen = new Set();
  const observer = new IntersectionObserver((entries) => {
    entries.filter((e) => e.isIntersecting).forEach(({ target }) => {
      const id = target.id.replace('section-', '');
      if (seen.has(id)) return;
      seen.add(id);
      arrive(id, target);
    });
  }, { threshold: 0.35 });
  app.querySelectorAll('.section').forEach((s) => observer.observe(s));

  // Nav links scroll within the page without clobbering the #list view hash.
  app.querySelector('.list-nav').addEventListener('click', (e) => {
    const link = e.target.closest('[data-jump]');
    if (!link) return;
    e.preventDefault();
    const target = document.getElementById(`section-${link.dataset.jump}`);
    target.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    target.querySelector('h2').setAttribute('tabindex', '-1');
    target.querySelector('h2').focus({ preventScroll: true });
    if (link.dataset.jump === 'pattys' && seen.has('pattys')) letItSnow(); // "Contact me" click always snows
  });
};

// Header "Contact me": go to Miss Patty's in whichever view is active.
document.querySelector('#contact-me').addEventListener('click', (e) => {
  if (isListMode()) app.querySelector('[data-jump="pattys"]').click();
  else openLocation('pattys', e.currentTarget);
});

/* ---------- View switching (hash-based so it survives refresh + is shareable) ---------- */
const modeToggle = document.querySelector('#mode-toggle');
const isListMode = () => location.hash === '#list';

const render = () => {
  if (dialog.open) dialog.close();
  const list = isListMode();
  document.body.classList.toggle('mode-list', list);
  document.body.classList.toggle('mode-town', !list);
  modeToggle.textContent = list ? 'Explore the town' : 'Skip the tour';
  modeToggle.setAttribute('href', list ? '#town' : '#list');
  (list ? renderList : renderTown)();
};

document.querySelector('#brand-name').textContent = owner.name;
window.addEventListener('hashchange', render);
render();
