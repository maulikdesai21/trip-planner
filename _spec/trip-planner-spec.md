# Trip Planner — Project Spec

## Overview

Trip Planner is a cross-platform travel planning app. Users can create and manage trips, track countdowns, and jot down notes. The UI is warm and friendly — terracotta, cream, and amber palette with smooth transitions.

## What Was Built (Phase 1)

### Project structure

Three subfolders were created from a blank repo:

```
trip-planner/
├── web/       React + Vite web app
├── mobile/    Expo React Native app (iOS/Android)
└── backend/   Placeholder — to be built in a later phase
```

### Design source

The UI was implemented from a Claude Design handoff file. The design specified:
- Warm palette: cream `#fbf3ec`, terracotta `#e76f51`, amber `#f0a35e`, deep cocoa `#3a2b25`
- Fonts: Bricolage Grotesque (display) + Plus Jakarta Sans (body)
- Six cover gradient options per trip: coral, amber, rose, sage, sky, plum
- Side-by-side desktop + mobile prototype as the reference

### Phase 1 screens

| Screen | Description |
|--------|-------------|
| Splash | Branded full-screen intro, auto-advances after 3 seconds with animated progress bar |
| Planner | Trip grid with All / Upcoming / Past filters, overflow menu per card (edit / delete with confirm), "New trip" CTA |
| Trip page | Hero cover with status chip, quick facts (dates, nights, status), notes, edit form (destination, country, dates, cover colour picker), delete with confirm |

### Web app (`web/`)

- React 18 + Vite, inline styles throughout
- No router — screen state managed in `App.jsx` via a `screen` string; transitions are CSS keyframe animations replayed on each navigation
- Google Fonts loaded via `<link>` in `index.html`
- Run: `npm install && npm run dev`

### Mobile app (`mobile/`)

- Expo SDK 51 + React Native 0.74
- Same screen-state approach as web (no navigation library in phase 1)
- `expo-linear-gradient` for gradients, `react-native-svg` for icons, `react-native-safe-area-context` for insets
- Run: `npm install && npx expo start`
- **Note:** `expo-linear-gradient` must not appear in the `plugins` array in `app.json` — it has no config plugin and breaks Metro if listed there

## Git Setup

- Repo: `github.com/maulikdesai21/trip-planner`
- Default branch: `main`
- Phase 1 work lives on the `phase-1` branch
- SSH key at `~/.ssh/github` (added to GitHub as `ssh-personal-mac`)
- Remote uses SSH: `git@github.com:maulikdesai21/trip-planner.git`

## Phase 2 Placeholders (in the UI)

- Day-by-day itinerary builder
- Cover photo upload
- Native screen transitions (React Navigation)

## Phase 3 Planned

- Backend API (Node/Express or similar — TBD)
- Auth and user accounts
- Trip collaboration
