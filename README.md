# Stars Hollow Portfolio

A software engineer portfolio styled as a cozy small town. Pan around the map, click a building, step inside.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # static output in dist/ (GitHub Pages ready)
```

## Fill in your content

Everything lives in **`src/data/content.js`**. Blank strings show up as striped "coming soon" placeholders.

| Building | Section | Key in `content.js` |
|---|---|---|
| Town Square Gazebo | Welcome | `owner` |
| Luke's Diner | About Me | `lukesMenu` |
| Weston's Bakery | Recent Bakes | `westonsBakes` (put photos in `public/bakes/`) |
| The Dragonfly Inn | Projects | `dragonflyRooms` |
| Doose's Market | Experience | `doosesLedger` |
| Black, White & Read | Blog | `bookstoreShelf` |
| Miss Patty's | Contact | `owner.email`, `owner.socials` |

## Project layout

```
src/
  data/content.js   single source of truth for copy
  sections/         one renderer per location (used by both views)
  map/              scenery, building SVGs, pan/drag engine
  effects/          snow, Luke's bubble, contact form
  styles/           base, town map, section themes
```

Design decisions and iteration history are in [`DESIGN_NOTES.md`](DESIGN_NOTES.md).

*An original fan-inspired design. Not affiliated with or endorsed by Warner Bros. or the creators of Gilmore Girls.*
