# Stars Hollow Portfolio: Design Notes

> Running log of our iterations, decisions, and open questions.
> Newest iteration goes on top of the Iteration Log. Decisions are numbered so we can refer to them ("per D3...").

---

## 1. Vision (one-liner)

An interactive software-engineer portfolio set in a Gilmore Girls–*inspired* small town.
Visitors explore the town and enter buildings, and each building is a portfolio section.

---

## 2. Section → Location Map (current draft)

| Traditional Section | Stars Hollow Location | Creative Execution | Status |
|---|---|---|---|
| Hero / Intro | Town Square Gazebo | "Welcome to my corner of the internet. Grab a coffee, let's talk code." | Agreed |
| About Me | Luke's Diner Menu | Bio as a diner menu: Specialties = Core Languages, Sides = Soft Skills, Bottomless Coffee = Tools. "No Cell Phones" toggle + Luke speech bubble on entry | Built (D6, D12) |
| Projects | Dragonfly Inn Directory | Projects as numbered room keys | Built |
| Experience | Doose's Market Timecard | Lined ledger, newest first, "Approved: T. Doose" stamp | Built |
| Blog / Thoughts | Black, White & Read Bookstore | Plain white, 68ch column, minimal styling | Built |
| Contact | Miss Patty's Bulletin Board | Corkboard post-its + mailto contact form + "I smell snow" snowfall | Built (D10, D12) |
| Recent Bakes | Weston's Bakery | Bake-case photo grid (photo, name, date, blurb) | Built (D6) |

---

## 3. Navigation / "3D" Feasibility Options

| Option | What it is | Effort | Risk | Notes |
|---|---|---|---|---|
| **A. Full 3D walkable town** | Three.js / React Three Fiber, WASD/click-to-walk | Very high | High | Needs 3D models of every building (custom or paid assets), heavy on mobile, hard to make accessible (WCAG 2.2 AA), recruiters may bounce before it loads |
| **B. 2.5D illustrated town map** | One large illustrated (or SVG) town you can pan/drag/scroll around; hover a building and it lifts or glows; click to "enter" | Medium | Low | Feels explorable and "3D-ish" through parallax layers + depth. Works on mobile (swipe). Each building is a real `<a>`/`<button>`, so it's keyboard and screen-reader friendly |
| **C. Side-scrolling Main Street** | Horizontal parallax walk down one street (like a 2D game) | Medium-low | Low | Simplest "moving through town" feel; order of buildings = narrative order |
| **D. Themed scroll site** | Normal vertical site with themed section headings | Low | Low | Least immersive, but most practical |

**Tahini's recommendation:** **B (or C) as the hub + D as the fallback.**
- Explorable town map = the "wow."
- Every building opens a themed section page/modal = the content.
- A persistent **"Recruiter Mode / Skip the tour"** link renders the same content as a plain scrolling page.
  One content source, two views (DRY: content lives in data files, not hard-coded per view).
- Can upgrade to real 3D later (A) without rewriting content, since the views just consume the same data.

---

## 4. Decisions Log

| # | Date | Decision | Why |
|---|---|---|---|
| D1 | 2026-10-03 | Plan before building; keep this notes doc updated each iteration | Requested by Samantha |
| D2 | 2026-10-03 | Section → location mapping from Samantha's table is the baseline (see §2) | Strong, recognizable concept |
| D3 | 2026-10-03 | Art must be **original "inspired-by" illustration**, not show screenshots/logos/stills | Gilmore Girls is Warner Bros. IP; a public portfolio shouldn't use copyrighted stills. Fan-art style, own wording, own art = safe and more personal |
| D4 | 2026-10-03 | Accessibility is non-negotiable: keyboard nav, reduced-motion support, alt text, text fallback view | WCAG 2.2 AA; also recruiters with slow laptops / phones |
| D5 | 2026-10-03 | Content separated from presentation (JSON/Markdown data files) | Lets us swap or upgrade the nav style (B → A) without touching content |
| D6 | 2026-10-03 | Q1 = (a): Luke's is About Me; bakes moved to **Weston's Bakery** | Keeps each building to one job |
| D7 | 2026-10-03 | Nav = **2.5D pannable map** + **"Skip the tour"** scroll view (`#list` hash) | Immersive + recruiter-friendly; hash makes the view shareable and refresh-safe |
| D8 | 2026-10-03 | Art = AI-assisted + stock later; prototype uses **hand-coded original SVG** placeholders | Zero asset licensing for now; buildings are swappable per entry in `src/map/buildings.js` |
| D9 | 2026-10-03 | Stack = **Vite + vanilla JS**, no framework | YAGNI: no state complexity that warrants React. `base: './'` for GitHub Pages |
| D10 | 2026-10-03 | Hosting = GitHub Pages; contact = `mailto:` built from the form (no backend) | Free and simple. Form stays disabled until `owner.email` is set |
| D11 | 2026-10-03 | All copy left as visible striped placeholders until Samantha fills in `src/data/content.js` | Single file to edit; blanks are obvious in the UI |
| D12 | 2026-10-03 | Easter eggs v1: Luke "No phones" bubble on entering Luke's; snowfall + "I smell snow." on Contact | Requested. Snow respects reduced-motion (caption only) and renders in the top layer above modals |
| D13 | 2026-10-03 | Palette: autumn small-town (cream, coffee, forest, flannel red). Fonts: Playfair Display, Lora, Special Elite, Caveat | Cozy fall-in-Connecticut feel; text colors pass AA contrast |

---

## 5. Open Questions

Resolved: Q1 to Q8 (see D6 to D12).

- **Q9. Your name, title and email** for `content.js`?
- **Q10. More easter eggs** (later): coffee counter, Kirk cameo, town-meeting bell, "Oy with the poodles already" 404?
- **Q11. GitHub Pages deploy:** set up a GitHub Actions workflow now or later? Which repo name?
- **Q12. Art pass:** which buildings get AI/stock art first? Same flat-vector style, or a different look?
- **Q13. Map extras:** a minimap or "jump to building" compass? Ambient sound (off by default)?

---

## 6. Iteration Log

### Iteration 3: 2026-10-05 (published + store-interior groundwork)
- **Published** to https://github.com/scmarcus-io/gilmore (public). Commits use the GitHub noreply email so no work email or hostname is public.
- **Deploy:** `.github/workflows/deploy.yml` builds with Vite and publishes `dist/` to GitHub Pages on every push to `main`. Pages must be enabled once in repo Settings (Source: GitHub Actions).
- **Decisions:** Weston's = things made by hand (baking + pottery); Dragonfly Inn stays Projects; the No Cell Phones toggle is gone and is now a static sign with Luke's greeting on entry; clouds removed.
- **In progress:** store interiors (each store gets its own background plus a clickable item that opens the details pop-up), door-opening walk-in animation, background music (official YouTube embed with a music on/off icon). Shared parts are in `src/sections/parts.js` and `src/stores/art.js`; skip-the-tour layout unchanged.

### Iteration 2: 2026-10-03 (working prototype)
- Built Vite + vanilla JS prototype in this folder. `npm run dev` to run.
- **Map:** 2400x1500 SVG town; pan by drag, wheel/trackpad, or arrow keys; buildings are `<button>`s with hover lift + name tags; clouds drift as a parallax layer.
- **Sections:** open in a native `<dialog>` (Esc closes, focus goes back to the building).
- **Skip the tour:** same renderers, sticky section nav; easter eggs fire when a section scrolls into view.
- **Header "Contact me"** opens Miss Patty's and starts the snow.
- **Content:** everything lives in `src/data/content.js`; blanks render as striped placeholders.
- **QA (Playwright + Chrome):** drag, keyboard entry, focus return, Luke bubble, toggle, snow, form guard, list view, mobile 390px. No console errors.
- **Fixes from screenshots:** buildings were floating off the roads, clouds blocked the view, the camera started too low, House Rules overlapped the menu, snow rendered *behind* the modal (now uses the top layer via popover), the snow caption covered the title, the mobile header wrapped.
- **Code layout:** `data/` (content), `sections/` (renderers), `map/` (scenery, buildings, pan engine), `effects/` (snow, Luke, contact), `styles/` (base, town, sections).

### Iteration 1: 2026-10-03
- Captured initial concept + section/location mapping.
- Laid out 4 navigation options with effort/risk.
- Recommended 2.5D map hub + recruiter-mode fallback.
- Flagged IP (D3) and accessibility (D4) constraints.
- Waiting on answers to Q1–Q8.
