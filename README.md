# Unfurl

Non-medical menopause wellness app. Expo (React Native) + Firebase.

## What's built so far

- **Design system** (`src/theme/`) — colors, typography, spacing, matching the
  brand deck: deep forest green, warm cream, sage accent, elegant serif
  (Playfair Display) + clean sans (Inter).
- **UI primitives** (`src/components/`) — `ThemedText`, `Button`, `Card`, all
  wired to the design system.
- **A Style Guide screen** (`app/index.tsx`) — renders the whole system so you
  can see it working right now, before the real quiz/onboarding flow exists.
- **Firebase service** (`src/services/firebase.ts`) — placeholder, ready for
  your project config.

## Running it on your machine

You'll need [Node.js](https://nodejs.org) (LTS version) and the **Expo Go**
app on your phone (free, App Store).

```bash
cd unfurl-app
npm install
npx expo install --fix   # auto-corrects any package version mismatches
npx expo start
```

> The `expo install --fix` step matters: I wrote `package.json` by hand without
> being able to run `npm install` myself (this environment has no internet
> access), so exact patch versions may need a small correction — that command
> does it automatically and safely.

This prints a QR code in your terminal. Scan it with your phone's camera
(iOS) — it opens directly in Expo Go, and you'll see the Style Guide screen
render live. Any code changes reload automatically while `expo start` is
running.

## Connecting Firebase

1. Open your Firebase project at console.firebase.google.com
2. Project Settings → General → scroll to "Your apps" → if you don't have a
   Web app yet, click "Add app" → Web (the `</>` icon)
3. Copy the `firebaseConfig` object it gives you
4. Paste it into `src/services/firebase.ts`, replacing the `REPLACE_ME`
   placeholders

## What's next (in build order)

1. **Teaser quiz + waitlist capture** — the highest-priority feature: get the
   quiz live, collect emails, validate demand before building anything else
2. Auth (email/password + Sign in with Apple + Google)
3. Full deep-intake quiz (post-signup)
4. 11-section content library + Cloudflare Stream video integration
5. Freemium paywall (Firestore security rules)
6. Doctor toolkit (free informational + paid symptom-log export)
7. Apple IAP + Stripe checkout
8. Virtual events (Zoom link-out)

## Project structure

```
app/                  Expo Router screens (file-based routing)
src/
  theme/              Design system: colors, typography, spacing
  components/          Reusable UI: Button, Card, ThemedText
  services/            Firebase, and later: Cloudflare Stream, Stripe
  screens/             (empty for now — real screens land here as we build)
```
