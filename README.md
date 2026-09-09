# Unfurl

Non-medical menopause wellness app. Expo (React Native) + Firebase.

## What's built so far

**Public / pre-signup**
- **Design system** (`src/theme/`) — colors, typography, spacing, matching the
  brand deck: deep forest green, warm cream, sage accent, elegant serif
  (Playfair Display) + clean sans (Inter).
- **UI primitives** (`src/components/`) — `ThemedText`, `Button`, `Card`,
  `SelectOption`, `TextField`, `ProgressBar`, `PremiumLock`, all wired to the
  design system.
- **Landing screen** (`/`) — entry point, CTA into the teaser quiz, plus a
  "Sign in" link for returning users.
- **Teaser quiz + waitlist capture** (`/quiz`) — a 4-question, ~60-second quiz
  that resolves to one of five "path" results, then captures an email into
  Firestore's `waitlist` collection to unlock it.
- **Auth** (`/auth`) — email/password sign-up and sign-in, wired to Firebase
  Auth. "Continue with Apple" / "Continue with Google" are visible but
  disabled ("coming soon") — real OAuth needs Apple/Google developer
  credentials that don't exist yet.
- **A Style Guide screen** (`/dev-style-guide`) — dev-only route rendering the
  whole design system for reference; not part of the real app flow.

**Signed-in**
- **Home** (`/home`) — the post-signin dashboard: prompts you to complete the
  deep-intake quiz if you haven't, and links into the library, doctor
  toolkit, events, and upgrade.
- **Deep-intake quiz** (`/intake`) — an 11-question questionnaire (age range,
  stage, symptom specifics, current support, goals) saved to your profile.
  Longer and more specific than the teaser quiz; requires being signed in.
- **Content library** (`/library`, `/library/[slug]`) — 11 written sections
  covering the transition, symptoms, and lifestyle topics. 3 are free
  (Understanding the Transition, Hot Flashes & Night Sweats, Talking to Your
  Doctor); the other 8 are membership-gated. Each section can optionally
  carry a Cloudflare Stream video (`src/services/cloudflareStream.ts`) — none
  are attached yet since there's no video content, but the player is fully
  wired for when there is.
- **Doctor Toolkit** (`/doctor-toolkit`) — free conversation-starter prompts
  and an appointment-prep checklist, plus a link into the Symptom Log.
- **Symptom Log** (`/symptom-log`, membership-gated) — log symptoms over time
  (category, severity, notes) to Firestore, then **export as a PDF**
  (`expo-print` + `expo-sharing`) to bring to an appointment.
- **Virtual Events** (`/events`) — upcoming live sessions with a "Join on
  Zoom" link-out. Currently placeholder events — swap in real Zoom links in
  `src/data/events.ts` once sessions are scheduled.
- **Paywall** (`/paywall`) — membership pricing (monthly/annual, currently
  disabled pending real billing) plus a **dev-only toggle** to flip your own
  account between free and active so you can test every gated screen today.

## Billing (Apple IAP + Stripe) — what's real vs. not

This is the one area that genuinely can't be finished without accounts and
infrastructure I don't have access to:

- **Stripe** needs a Stripe account and, critically, a small backend (e.g. a
  Cloud Function) to create checkout sessions and handle webhooks — the
  secret key can never live in the app itself.
- **Apple In-App Purchase** needs a paid Apple Developer Program membership,
  subscription products configured in App Store Connect, and the
  `react-native-iap` library — which requires a custom dev client / EAS
  Build, since it isn't available in Expo Go.

What exists instead: the full paywall UI, the Firestore-backed
`subscriptionStatus` field that every gated screen actually checks
(`src/services/subscription.ts`), and a **dev-only "unlock for testing"
button** on `/paywall` that flips your own account's status directly — so
the entire membership experience (library, symptom log) is testable right
now, without real payments. When real billing is ready, replace
`devSetSubscriptionStatus` with a webhook-driven update to the same field
(and, per the note in `firestore.rules`, move that field off the
user-writable document so it can't be self-granted).

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
5. In the Firebase Console, go to **Firestore Database → Rules**, paste in
   the contents of `firestore.rules` from this repo, and Publish
6. In the Firebase Console, go to **Authentication → Sign-in method** and
   enable **Email/Password**

Until real config is in place, anything that talks to Firebase (the quiz's
waitlist form, sign-up/sign-in, intake, symptom log) will show an inline
error instead of crashing — that's expected.

## What's next (in build order)

1. ~~Teaser quiz + waitlist capture~~ — done
2. ~~Auth~~ — email/password done; Apple/Google sign-in need real developer
   credentials
3. ~~Full deep-intake quiz~~ — done
4. ~~11-section content library~~ — done; Cloudflare Stream needs a real
   account + uploaded videos (see `src/services/cloudflareStream.ts`)
5. ~~Freemium paywall~~ — done (Firestore-rules-backed gating); see the
   "Billing" section above for the one real gap
6. ~~Doctor toolkit~~ — done (free tips + paid symptom log with PDF export)
7. Apple IAP + Stripe checkout — needs real accounts/backend, see "Billing"
   above
8. ~~Virtual events~~ — done; needs real Zoom links in `src/data/events.ts`

## Project structure

```
app/                  Expo Router screens (file-based routing, thin wrappers)
  index.tsx           Landing screen
  quiz.tsx            Teaser quiz + waitlist capture flow
  auth.tsx            Sign-up / sign-in
  home.tsx            Signed-in dashboard
  intake.tsx           Deep-intake questionnaire
  library/            Content library (list + [slug] detail)
  doctor-toolkit.tsx  Free doctor-prep content + link to symptom log
  symptom-log.tsx     Symptom tracking + PDF export (membership-gated)
  events.tsx          Virtual events (Zoom link-out)
  paywall.tsx         Membership screen + dev unlock toggle
  dev-style-guide.tsx Dev-only design system reference
src/
  theme/              Design system: colors, typography, spacing
  components/          Reusable UI: Button, Card, ThemedText, SelectOption,
                        TextField, ProgressBar, PremiumLock
  screens/             Real screen implementations, one per app/ route
  data/                Static content: quiz/intake questions, content
                        library, doctor toolkit tips, events
  services/            Firebase, auth hooks, subscription/paywall state,
                        intake + symptom log writes, PDF export, Cloudflare
                        Stream URL builder
firestore.rules        Security rules — deploy via Firebase Console
```
