# Unfurl

Non-medical menopause wellness app. Expo (React Native) + Firebase.

## What's built so far

- **Design system** (`src/theme/`) — colors, typography, spacing, matching the
  brand deck: deep forest green, warm cream, sage accent, elegant serif
  (Playfair Display) + clean sans (Inter).
- **UI primitives** (`src/components/`) — `ThemedText`, `Button`, `Card`,
  `SelectOption`, `TextField`, `ProgressBar`, all wired to the design system.
- **Teaser quiz + waitlist capture** (`/quiz`) — a 4-question, ~60-second quiz
  that resolves to one of five "path" results, then captures an email into
  Firestore's `waitlist` collection to unlock it. This is the app's front
  door and its only job right now is validating demand.
- **Landing screen** (`/`, `app/index.tsx`) — the entry point, CTA into the
  quiz, with a secondary "Sign in" link for returning users.
- **Auth** (`/auth`) — email/password sign-up and sign-in, wired to Firebase
  Auth. "Continue with Apple" and "Continue with Google" are visible but
  disabled ("coming soon") — real OAuth needs Apple/Google developer
  credentials that don't exist yet, so they're honestly marked rather than
  wired to something broken.
- **A Style Guide screen** (`/dev-style-guide`) — dev-only route that renders
  the whole design system for reference; not part of the real app flow.
- **Firebase service** (`src/services/firebase.ts`) — placeholder, ready for
  your project config.

## Running it on your machine

You'll need [Node.js](https://nodejs.org) (LTS version) and the **Expo Go**
app on your phone (free, App Store).

```bash
npm install
npx expo install --fix   # auto-corrects any package version mismatches
npx expo start
```

This prints a QR code in your terminal. Scan it with your phone's camera
(iOS) — it opens directly in Expo Go, and you'll land on the Unfurl landing
screen. Any code changes reload automatically while `expo start` is running.

## Connecting Firebase

1. Open your Firebase project at console.firebase.google.com
2. Project Settings → General → scroll to "Your apps" → if you don't have a
   Web app yet, click "Add app" → Web (the `</>` icon)
3. Copy the `firebaseConfig` object it gives you
4. Paste it into `src/services/firebase.ts`, replacing the `REPLACE_ME`
   placeholders
5. In Firestore, create a `waitlist` collection (or just let the first quiz
   submission create it automatically) and set security rules that allow
   `create` on that collection from unauthenticated clients but not `read`,
   `update`, or `delete` — this app only ever writes to it.
6. In the Firebase Console, go to Authentication → Sign-in method → enable
   "Email/Password" — that's all sign-up/sign-in needs to work.

Until real config is in place, submitting the quiz's email form or the
sign-up/sign-in form will show an inline error instead of crashing — that's
expected.

## What's next (in build order)

1. ~~Teaser quiz + waitlist capture~~ — done, see above
2. ~~Auth~~ — email/password done, see above; Apple/Google sign-in still
   need real developer credentials before they can be wired up
3. Full deep-intake quiz (post-signup)
4. 11-section content library + Cloudflare Stream video integration
5. Freemium paywall (Firestore security rules)
6. Doctor toolkit (free informational + paid symptom-log export)
7. Apple IAP + Stripe checkout
8. Virtual events (Zoom link-out)

## Project structure

```
app/                  Expo Router screens (file-based routing, thin wrappers)
  index.tsx           Landing screen
  quiz.tsx            Teaser quiz + waitlist capture flow
  auth.tsx            Sign-up / sign-in
  dev-style-guide.tsx Dev-only design system reference
src/
  theme/              Design system: colors, typography, spacing
  components/          Reusable UI: Button, Card, ThemedText, SelectOption,
                        TextField, ProgressBar
  screens/             Real screen implementations, one per app/ route
  data/                Static content, e.g. quiz questions and path results
  services/            Firebase, auth error messages, waitlist writes, and
                        later: Cloudflare Stream, Stripe
```
