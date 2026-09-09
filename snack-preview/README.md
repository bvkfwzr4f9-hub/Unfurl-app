# Snack preview

A single-file, simplified stand-in for the real app, made to run inside
[Expo Snack](https://snack.expo.dev) — which doesn't support this project's
Expo Router folder structure or TypeScript path aliases.

Differences from the real app:
- Plain system fonts instead of Playfair Display / Inter
- The waitlist "join" button simulates success instead of writing to
  Firestore

Everything else — copy, colors, quiz questions and logic, screen flow —
matches `app/quiz.tsx` / `src/screens/QuizFlowScreen.tsx` in the main app.

## Using it

1. Go to [snack.expo.dev](https://snack.expo.dev)
2. Open this file on GitHub, tap "Raw", select all, copy
3. In Snack, replace the contents of `App.js` with it
4. Scan the QR (or tap the on-device link) to open it in Expo Go
