# Trip Planner — Mobile

The iOS and Android app for Trip Planner, built with Expo and React Native.

## Prerequisites

- [Node.js](https://nodejs.org) 18+
- [Expo Go](https://expo.dev/go) installed on your phone, or an iOS/Android simulator

## Getting Started

```bash
npm install
npx expo start          # open in Expo Go by scanning the QR code
npx expo start --ios    # open in iOS simulator
npx expo start --android
```

## Tech Stack

| Package | Purpose |
|---------|---------|
| Expo SDK 51 | Managed workflow, build tooling |
| React Native 0.74 | Core UI primitives |
| expo-linear-gradient | Gradient fills (Cover, Logo, Avatar) |
| react-native-svg | All icons via `Icon.jsx` |
| react-native-safe-area-context | Safe area insets in all screens |

## Project Structure

```
mobile/
├── App.jsx               # Entry point — owns all state + screen routing
├── app.json              # Expo config
├── babel.config.js
└── src/
    ├── tokens.js         # Design tokens (colours, cover gradients)
    ├── data.js           # Seed trips, date helpers, status logic
    ├── components/
    │   ├── Icon.jsx          # SVG icons via react-native-svg
    │   ├── Logo.jsx          # Brand mark (LinearGradient)
    │   ├── Cover.jsx         # Gradient hero with watermark initials
    │   ├── StatusChip.jsx    # Trip countdown/status pill
    │   ├── Btn.jsx           # TouchableOpacity button
    │   └── Avatar.jsx        # User avatar (LinearGradient)
    └── screens/
        ├── SplashScreen.jsx     # 3-second branded splash, Animated progress bar
        ├── PlannerScreen.jsx    # Trip list with filters + CRUD, Modal menus
        └── TripPageScreen.jsx   # Trip detail + inline edit form
```

## Navigation

No navigation library — `App.jsx` holds a `screen` string (`splash` | `planner` | `trip`) and renders the matching screen component. React Navigation can be added in a future phase for native transitions.

## Known Setup Note

`expo-linear-gradient` must **not** be listed in the `plugins` array in `app.json` — it has no config plugin and will break Metro startup if added there.

## Phase 2 Placeholders

- Day-by-day itinerary (`TripPageScreen.jsx`)
- Cover photo upload (`TripPageScreen.jsx`)
- Native screen transitions (React Navigation)
