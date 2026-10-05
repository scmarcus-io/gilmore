// Reusable content blocks. The "skip the tour" list view and the store pop-ups both build from these,
// so each piece of content has exactly one renderer (DRY).
import {
  owner, lukesMenu, westonsMakes, dragonflyRooms, doosesLedger, bookstoreShelf,
} from '../data/content.js';
import { esc, orBlank, linkOrBlank } from './helpers.js';

const photoOrBlank = (src, alt, label = 'Photo coming soon') => (src
  ? `<img src="${esc(src)}" alt="${esc(alt)}" loading="lazy">`
  : `<div class="photo-blank" role="img" aria-label="${esc(label)}">${esc(label)}</div>`);

const stackList = (stack) => `
  <ul class="room-key__stack" aria-label="Tech stack">
    ${stack.length ? stack.map((t) => `<li>${esc(t)}</li>`).join('') : `<li>${orBlank('', 'Tech stack')}</li>`}
  </ul>`;

/* ---------- Gazebo ---------- */
export const welcomeCard = () => `
  <div class="gazebo-card">
    <p class="gazebo-card__hello">Hi, I'm</p>
    <p class="gazebo-card__name">${esc(owner.name)}</p>
    <p class="gazebo-card__title">${esc(owner.title)}</p>
    <p class="gazebo-card__tagline">${esc(owner.tagline)}</p>
  </div>`;

/* ---------- Luke's ---------- */
export const bioText = () => orBlank(lukesMenu.intro, 'Your bio goes here, like the blurb at the top of a menu.');

export const noPhonesSign = () => `
  <p class="no-phones" role="note"><span class="no-phones__icon" aria-hidden="true"></span>No cell phones</p>`;

/** The skills menu. variant 'paper' = printed diner menu, 'chalk' = the chalkboard pop-up. */
export const dinerMenu = ({ variant = 'paper' } = {}) => `
  <div class="diner-menu diner-menu--${variant}">
    ${variant === 'paper' ? `${noPhonesSign()}<p class="diner-menu__intro">${bioText()}</p>` : ''}
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

/* ---------- Weston's ---------- */
export const makeFigure = (m, { large = false } = {}) => `
  <figure class="make-card ${large ? 'make-card--large' : ''}">
    ${photoOrBlank(m.photo, m.name || `${m.category} piece`)}
    <figcaption>
      <span class="make-card__category">${esc(m.category)}</span>
      <strong>${orBlank(m.name, `${m.category} piece`)}</strong>
      <span class="make-card__date">${orBlank(m.date, 'date')}</span>
      <span>${orBlank(m.description, 'A sentence or two about this piece.')}</span>
    </figcaption>
  </figure>`;

export const makesGrid = () => `<div class="bake-case">${westonsMakes.map((m) => makeFigure(m)).join('')}</div>`;

/* ---------- Dragonfly ---------- */
export const roomKeyCard = (r) => `
  <article class="room-key">
    <span class="room-key__hole" aria-hidden="true"></span>
    <p class="room-key__number">Room ${esc(r.room)}</p>
    <h3 class="room-key__name">${orBlank(r.name, 'Project name')}</h3>
    <p class="room-key__desc">${orBlank(r.description, 'What it does, why it matters, what you learned.')}</p>
    ${stackList(r.stack)}
    <p class="room-key__links">${linkOrBlank(r.repo, 'Repo')} ${linkOrBlank(r.demo, 'Live demo')}</p>
  </article>`;

export const roomKeyRack = () => `
  <p class="section__lede">Guest directory. Every room is a project. Check-in is at 3 p.m.; Michel will judge you regardless.</p>
  <div class="key-rack">${dragonflyRooms.map(roomKeyCard).join('')}</div>`;

export const projectDetail = (r) => `
  <article class="project-detail">
    <p class="room-key__number">Room ${esc(r.room)}</p>
    <h3 class="project-detail__name">${orBlank(r.name, 'Project name')}</h3>
    ${photoOrBlank(r.image, r.name || 'Project screenshot', 'Screenshot coming soon')}
    <p class="project-detail__lede">${orBlank(r.description, 'One-line summary of the project.')}</p>
    <p>${orBlank(r.details, 'The full story: the problem, your approach, architecture, trade-offs, results.')}</p>
    ${stackList(r.stack)}
    <p class="room-key__links">${linkOrBlank(r.repo, 'Repo')} ${linkOrBlank(r.demo, 'Live demo')}</p>
  </article>`;

/* ---------- Doose's ---------- */
export const ledger = () => `
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

/* ---------- Bookstore ---------- */
export const postSummary = (p) => `
  <article class="post">
    <p class="post__meta">${esc(p.category)} &middot; ${orBlank(p.date, 'date')}</p>
    <h3 class="post__title">${p.url ? linkOrBlank(p.url, p.title || 'Untitled') : orBlank(p.title, 'Article title')}</h3>
    <p>${orBlank(p.summary, 'A short summary of the article.')}</p>
  </article>`;

export const shelf = () => `<div class="shelf">${bookstoreShelf.map(postSummary).join('')}</div>`;

export const articleDetail = (p) => `
  <article class="article-detail">
    ${postSummary(p)}
    <p class="article-detail__pick"><strong>Why it's a pick:</strong> ${orBlank(p.pickNote, 'A handwritten note on why this one is worth reading.')}</p>
    <p>${linkOrBlank(p.url, 'Read the full article')}</p>
  </article>`;

/* ---------- Miss Patty's ---------- */
export const socialNotes = () => owner.socials.map((s, i) => `
  <div class="postit postit--${i % 3}">${linkOrBlank(s.url, s.label)}</div>`).join('');

export const meetingFlyer = () => `
  <div class="postit postit--flyer">
    <p class="postit__flyer-title">Town Meeting Tonight!</p>
    <p>Agenda item 1: hiring a software engineer.</p>
  </div>`;

export const contactForm = () => {
  const hasEmail = Boolean(owner.email);
  return `
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
  </form>`;
};
