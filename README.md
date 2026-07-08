# Portfolio — Selected Work

A portfolio slider built with **Pug + SCSS + JS (Babel)**. Responsive, seamlessly looped, with touch swipe support and keyboard arrow navigation.

All data is **baked into the final HTML at build time** — the page loads nothing at runtime (no JSON, no fetch). Browser-side JS only handles the slider behavior.

## Getting started

```bash
npm install        # once
npm run dev        # build + watchers + live-reload server (http://localhost:3000)
npm run build      # build into dist/ only
```

## Data

Your personal data lives in **`data/portfolio.js`**. The file is listed in `.gitignore` and **never reaches the repository**; only the template `data/portfolio.example.js` is committed. If `data/portfolio.js` is missing (e.g. right after cloning the repo), the build creates it from the template automatically.

```js
module.exports = {
  settings: {
    label: 'Selected Work',          // header label
    accent: 'oklch(0.78 0.16 250)',  // accent color
    placeholderText: 'Drop screenshot',
  },
  projects: [
    {
      title: 'Project name',
      stack: ['Vue 3', 'SCSS'],          // technology chips
      desc:  'Short description.',
      link:  'https://example.com',      // '' — hides the "View project" button
      image: 'images/screenshot.jpg',    // '' — shows a placeholder
      fit:   'cover',                    // optional: fill the frame (crops edges);
                                         // omit to show the whole image
    },
  ],
};
```

- **Add a project** — copy an object and paste it into the `projects` array.
- **Remove** — delete the object.
- Numbering `01, 02…`, indicator dots and the counter are recalculated at build time.
- After editing the data, rerun `npm run build` (in `npm run dev` mode rebuilds happen automatically).

Put project screenshots into `data/images/` — the folder is gitignored (like `data/portfolio.js`) and is copied to `dist/images/` during the build. `src/images/` is for public assets that **are** committed; both folders end up merged in `dist/images/`.

## Structure

```
data/
  portfolio.js           — DATA (gitignored)          ← edit here
  portfolio.example.js   — data template (committed)
  images/                — project screenshots (gitignored)
scripts/
  render.js              — Pug + data → dist/index.html
src/
  pug/index.pug          — markup (slides are rendered at build time)
  scss/                  — styles (variables, base, page, header, slider, footer)
  js/app.js              — slider behavior (ES6+, compiled with Babel)
  images/                — public assets (committed)
  static/                — files copied to the site root (robots.txt, …)
dist/                    — built site (gitignored)
```
