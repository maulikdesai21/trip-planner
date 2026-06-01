# Trip Planner

A warm, friendly travel planner app built for web and mobile. Plan trips, track upcoming adventures, and organise notes — all in one place.

## Project Structure

```
trip-planner/
├── web/          # React + Vite web app
├── mobile/       # Expo React Native iOS/Android app
└── backend/      # API server (coming in a later phase)
```

## Apps

| App | Stack | Docs |
|-----|-------|------|
| Web | React 18, Vite | [web/README.md](./web/README.md) |
| Mobile | Expo SDK 51, React Native | [mobile/README.md](./mobile/README.md) |
| Backend | TBD | — |

## Design System

Both apps share the same design language:

- **Palette** — cream `#fbf3ec`, terracotta `#e76f51`, amber `#f0a35e`, deep cocoa `#3a2b25`
- **Fonts** — Bricolage Grotesque (display headings) + Plus Jakarta Sans (body)
- **Cover gradients** — six named options: coral, amber, rose, sage, sky, plum

Tokens live in `src/tokens.js` in each app and are kept in sync manually until a shared package is introduced.

## Phase Roadmap

| Phase | Scope | Status |
|-------|-------|--------|
| 1 | Splash → Planner → Trip detail + CRUD | ✅ Done |
| 2 | Day-by-day itinerary, cover photos, packing lists | Planned |
| 3 | Auth, collaboration, backend API | Planned |
