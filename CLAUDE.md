# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project structure

```
web/       — React (Vite) web app
mobile/    — React Native (Expo) mobile app
backend/   — Backend (not yet built)
```

## Web (`web/`)

**Stack:** React 18 + Vite, inline styles throughout (no CSS-in-JS lib), Google Fonts via `<link>` in `index.html`.

**Commands:**
```bash
cd web && npm install
npm run dev      # dev server on localhost:5173
npm run build    # production build
```

**Architecture:**
- `src/App.jsx` — root; owns all state (trips list + current screen), drives navigation via `screen` string + CSS animation class
- `src/screens/` — `Splash`, `Planner`, `TripPage` (full-screen components, `position:absolute inset:0`)
- `src/components/` — `Icon`, `Logo`, `Cover`, `StatusChip`, `Btn`, `Avatar`, `ConfirmDelete`
- `src/tokens.js` — design tokens (colors, font stacks) and `COVERS` gradient map
- `src/data.js` — `SEED_TRIPS`, date helpers (`fmtRange`, `nights`, `tripStatus`, `initials`, `uid`)
- `src/index.css` — global resets, hover utility classes (`.tcard`, `.addcard`, `.iconbtn`, `.menurow`), and keyframe animations (`screenIn`, `slideUp`, `rise`, `fade`, `pulse`, `drift`)

Navigation is entirely in `App.jsx` — no router. Screen transitions are CSS animations replayed by bumping a `key` on the wrapper div.

## Mobile (`mobile/`)

**Stack:** Expo SDK 51, React Native. State management identical to web (no navigation library — screen switching via `useState` in `App.jsx`).

**Commands:**
```bash
cd mobile && npm install
npx expo start        # scan QR with Expo Go
npx expo start --ios
npx expo start --android
```

**Key dependencies:** `expo-linear-gradient` (gradients in `Cover`, `Logo`, `Avatar`), `react-native-svg` (all icons via `Icon.jsx`), `react-native-safe-area-context` (insets in all screens).

**Note:** `expo-linear-gradient` must NOT be listed in the `plugins` array in `app.json` — it has no config plugin and doing so breaks Metro startup.

**Architecture mirrors web:**
- `App.jsx` — root, owns trips state + current screen
- `src/screens/` — `SplashScreen`, `PlannerScreen`, `TripPageScreen`
- `src/components/` — `Icon` (uses react-native-svg), `Logo`, `Cover`, `StatusChip`, `Btn`, `Avatar`
- `src/tokens.js` / `src/data.js` — identical data layer to web

## Design system

Warm & friendly palette: cream `#fbf3ec`, terracotta `#e76f51`, amber `#f0a35e`, deep cocoa `#3a2b25`. Six cover gradients (coral, amber, rose, sage, sky, plum). Fonts: Bricolage Grotesque (display) + Plus Jakarta Sans (body).

## Phase 1 scope

Splash (3 s auto-advance) → Planner (trip grid, filters, CRUD) → Trip page (view + inline edit). Itinerary and cover photo upload are marked as phase 2 placeholders in the UI.
