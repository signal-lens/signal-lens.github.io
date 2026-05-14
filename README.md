# Signal Lens, Showcase Website

A self-contained, single-page website for showing Signal Lens. Live at https://signal-lens.github.io.

No build step. No npm. No dependencies beyond the browser.

## Run it locally

### Easiest: just open the file

Double-click `index.html` in this folder. Any modern browser opens it instantly.

### Or serve it on a tiny local server

If you want a real `http://` URL (cleaner cursor behavior, smoother fonts, can be opened from another device on your wifi):

Python 3:
```bash
python3 -m http.server 8000
```
Then open: http://localhost:8000

Node:
```bash
npx serve .
```

VS Code: install the "Live Server" extension, right-click `index.html`, open with Live Server.

## What's in the page

1. Hero with title, tagline and animated stat bar
2. The Problem, three problem cards
3. Two-tier solution: Quick Read, Deep Analysis, Privacy
4. Live interactive demo, mock browser plus side panel that animates on click
5. Features grid, 8 features
6. Architecture, a visual two-tier diagram
7. Competitive matrix against Ground News, Biasly, NewsGuard, Otherweb and Tangle
8. 12-month roadmap
9. Team
10. CTA and footer

## The interactive demo

The demo section has three buttons under the mock browser.

- Run Quick Read: populates the side panel with TL;DR, animated gauges and quick fallacy flags. Click it again (the button switches to "Deep Analysis") or click the gradient button inside the side panel to trigger Deep Analysis with steel-man, story timeline and red fallacy underlines on the article.
- Reset: clears the demo back to the empty state.
- حالت فارسی, RTL: flips the side panel to Persian right-to-left mode.

The demo is a self-contained simulation, no API calls, no server required. Same data and visual flow as the real extension.

## Customizing

- Stats: edit `<div class="stat__num" data-count="100">` in `index.html` to change displayed numbers.
- Team avatars: in `index.html` find `.team-card__avatar` and change the initials or replace with `<img>` tags.
- Colors: edit the CSS custom properties at the top of `styles.css` (`--emerald-500`, `--cyan-500` and friends).
- Demo article: edit `<article class="article">` in `index.html` to change the demo content.

## Browser support

Modern Chrome, Edge, Firefox and Safari on desktop and mobile. Uses CSS `backdrop-filter`, CSS Grid and standard ES2020 JavaScript.
