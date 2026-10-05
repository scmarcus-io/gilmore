// One renderer per Stars Hollow location. Each returns an HTML string built from content.js.
import {
  owner, lukesMenu, westonsBakes, dragonflyRooms, doosesLedger, bookstoreShelf, locations,
} from '../data/content.js';
import { esc, orBlank, linkOrBlank, sectionShell } from './helpers.js';

const gazebo = () => `
  <div class="gazebo-card">
    <p class="gazebo-card__hello">Hi, I'm</p>
    <p class="gazebo-card__name">${esc(owner.name)}</p>
    <p class="gazebo-card__title">${esc(owner.title)}</p>
    <p class="gazebo-card__tagline">${esc(owner.tagline)}</p>
    <p class="gazebo-card__hint">Wander around town: each building holds part of my story.</p>
  </div>`;

const lukes = () => `
  <div class="diner-menu">
    <div class="diner-menu__rules" role="note">
      <p class="diner-menu__rule-title">House Rules</p>
      <label class="toggle">
        <input type="checkbox" class="toggle__input" data-no-phones checked>
        <span class="toggle__track" aria-hidden="true"><span class="toggle__thumb"></span></span>
        <span class="toggle__label">No cell phones policy</span>
      </label>
      <p class="diner-menu__rule-status" data-no-phones-status aria-live="polite">Enforced. Luke is watching.</p>
    </div>
    <p class="diner-menu__intro">${orBlank(lukesMenu.intro, 'Your bio goes here, like the blurb at the top of a menu.')}</p>
    ${lukesMenu.sections.map((s) => `
      <div class="diner-menu__section">
        <h3 class="diner-menu__heading">${esc(s.heading)} <span>${esc(s.subheading)}</span></h3>
        <ul class="diner-menu__items">
          ${s.items.map((item) => `
            <li class="diner-menu__item">
              <span class="diner-menu__name">${orBlank(item.name, 'Item')}</span>
              <span class="diner-menu__dots" aria-hidden="true"></span>
              <span class="diner-menu__note">${orBlank(item.note, 'detail')}</span>
            </li>`).join('')}
        </ul>
      </div>`).join('')}
  </div>`;

const westons = () => `
  <div class="bake-case">
    ${westonsBakes.map((b) => `
      <figure class="bake-card">
        ${b.photo
          ? `<img src="${esc(b.photo)}" alt="${esc(b.name || 'Recent bake')}" loading="lazy">`
          : '<div class="bake-card__photo-blank" role="img" aria-label="Photo coming soon">Photo coming soon</div>'}
        <figcaption>
          <strong>${orBlank(b.name, 'Bake name')}</strong>
          <span class="bake-card__date">${orBlank(b.date, 'date')}</span>
          <span>${orBlank(b.description, 'A sentence about this bake.')}</span>
        </figcaption>
      </figure>`).join('')}
  </div>`;

const dragonfly = () => `
  <p class="section__lede">Guest directory. Every room is a project. Check-in is at 3 p.m.; Michel will judge you regardless.</p>
  <div class="key-rack">
    ${dragonflyRooms.map((r) => `
      <article class="room-key">
        <span class="room-key__hole" aria-hidden="true"></span>
        <p class="room-key__number">Room ${esc(r.room)}</p>
        <h3 class="room-key__name">${orBlank(r.name, 'Project name')}</h3>
        <p class="room-key__desc">${orBlank(r.description, 'What it does, why it matters, what you learned.')}</p>
        <ul class="room-key__stack" aria-label="Tech stack">
          ${r.stack.length
            ? r.stack.map((t) => `<li>${esc(t)}</li>`).join('')
            : `<li>${orBlank('', 'Tech stack')}</li>`}
        </ul>
        <p class="room-key__links">${linkOrBlank(r.repo, 'Repo')} ${linkOrBlank(r.demo, 'Live demo')}</p>
      </article>`).join('')}
  </div>`;

const dooses = () => `
  <div class="ledger" role="table" aria-label="Career history">
    <div class="ledger__row ledger__row--head" role="row">
      <span role="columnheader">Dates</span><span role="columnheader">Position</span><span role="columnheader">Entries</span>
    </div>
    ${doosesLedger.map((job) => `
      <div class="ledger__row" role="row">
        <span role="cell" class="ledger__dates">${orBlank(job.start, 'Start')} to ${orBlank(job.end, 'End')}</span>
        <span role="cell"><strong>${orBlank(job.role, 'Role')}</strong><br>${orBlank(job.company, 'Company')}</span>
        <span role="cell"><ul>${job.highlights.map((h) => `<li>${orBlank(h, 'Highlight')}</li>`).join('')}</ul></span>
      </div>`).join('')}
    <p class="ledger__stamp" aria-hidden="true">Approved: T. Doose</p>
  </div>`;

const bookstore = () => `
  <div class="shelf">
    ${bookstoreShelf.map((post) => `
      <article class="post">
        <p class="post__meta">${esc(post.category)} &middot; ${orBlank(post.date, 'date')}</p>
        <h3 class="post__title">${post.url ? linkOrBlank(post.url, post.title || 'Untitled') : orBlank(post.title, 'Article title')}</h3>
        <p>${orBlank(post.summary, 'A short summary of the article.')}</p>
      </article>`).join('')}
  </div>`;

const pattys = () => {
  const hasEmail = Boolean(owner.email);
  return `
  <div class="corkboard">
    <div class="corkboard__notes">
      ${owner.socials.map((s, i) => `
        <div class="postit postit--${i % 3}">${linkOrBlank(s.url, s.label)}</div>`).join('')}
      <div class="postit postit--flyer">
        <p class="postit__flyer-title">Town Meeting Tonight!</p>
        <p>Agenda item 1: hiring a software engineer.</p>
      </div>
    </div>
    <form class="contact-form" data-contact-form novalidate>
      <p class="contact-form__title">Drop a note in the box</p>
      <label for="cf-name">Your name</label>
      <input id="cf-name" name="name" autocomplete="name" required>
      <label for="cf-email">Your email</label>
      <input id="cf-email" name="email" type="email" autocomplete="email" required>
      <label for="cf-message">Message</label>
      <textarea id="cf-message" name="message" rows="4" required></textarea>
      <button type="submit" class="btn" ${hasEmail ? '' : 'aria-disabled="true"'}>Send via email</button>
      <p class="contact-form__status" data-contact-status aria-live="polite">
        ${hasEmail ? '' : 'Email address coming soon. Set owner.email in content.js.'}
      </p>
    </form>
  </div>`;
};

const renderers = { gazebo, lukes, westons, dragonfly, dooses, bookstore, pattys };

/** Render a location's full section (header + body) by id. */
export const renderSection = (id) => {
  const location = locations.find((l) => l.id === id);
  return sectionShell(location, renderers[id]());
};
