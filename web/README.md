# Trip Planner — Web

The web app for Trip Planner, built with React 18 and Vite.

## Getting Started

```bash
npm install
npm run dev        # dev server → http://localhost:5173
npm run build      # production build → dist/
npm run preview    # preview production build locally
```

## Tech Stack

| Tool | Purpose |
|------|---------|
| React 18 | UI |
| Vite 5 | Dev server + bundler |
| Google Fonts | Bricolage Grotesque + Plus Jakarta Sans |

No CSS framework — all styling is inline React styles with a small set of global utility classes in `src/index.css`.

## Project Structure

```
web/
├── index.html
├── vite.config.js
└── src/
    ├── main.jsx          # Entry point
    ├── App.jsx           # Root — owns all state + screen routing
    ├── index.css         # Resets, hover classes, keyframe animations
    ├── tokens.js         # Design tokens (colours, font stacks, cover gradients)
    ├── data.js           # Seed trips, date helpers, status logic
    ├── components/
    │   ├── Icon.jsx          # SVG icon switcher
    │   ├── Logo.jsx          # Brand mark
    │   ├── Cover.jsx         # Gradient hero with watermark initials
    │   ├── StatusChip.jsx    # Trip countdown/status pill
    │   ├── Btn.jsx           # Button (primary / soft / ghost / danger)
    │   ├── Avatar.jsx        # User avatar
    │   └── ConfirmDelete.jsx # Delete confirmation modal
    └── screens/
        ├── Splash.jsx        # 3-second branded splash, auto-advances
        ├── Planner.jsx       # Trip grid with filters + CRUD
        └── TripPage.jsx      # Trip detail + inline edit form
```

## Navigation

There is no router. `App.jsx` holds a `screen` string (`splash` | `planner` | `trip`) and renders the matching screen component. Transitions are CSS keyframe animations replayed by bumping a `key` on the wrapper div on each navigation.

## Phase 2 Placeholders

- Day-by-day itinerary (marked `// coming in phase 2` in `TripPage.jsx`)
- Cover photo upload (same file)
