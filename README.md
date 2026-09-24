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
- **Brand motif** (`BrandArcs`, `HeroPanel` in `src/components/`) — the pitch
  deck's recurring visual signature (thin overlapping circle arcs with small
  dot "nodes", dark forest-gradient hero panels, mixed regular/italic serif
  headlines) brought into the app itself, not just the deck. `HeroPanel` is
  the reusable dark gradient block used for Landing's hero, the Paywall
  intro, and section headers; `BrandArcs` is the standalone decorative motif
  layered onto Home's level card and Auth's header for the same texture in
  smaller doses. `HeroPanel` also accepts a real photo (`image` prop) with a
  dark overlay for legibility — Landing uses the mossy-driftwood shot
  (`assets/images/brand/moss-driftwood-sky.jpg`) and Paywall uses the fern
  spiral (`fern-spiral.jpg`, a nod to the app's own name). Two more brand
  photos (`moss-trunk-closeup.jpg`, `terraces-aerial.jpg`) are already in
  the repo, unused, ready for future sections.
- **Landing screen** (`/`) — the mossy-driftwood photo runs full-bleed behind
  the *entire* screen (not just a hero card), with a dark gradient overlay
  for legibility; entry point, CTA into the teaser quiz, a "Sign in" link
  for returning users, and a **level-system teaser** (Seed → Sprout → Bud →
  Bloom → Unfurled) so the gamification hook — "doesn't feel like homework"
  — is visible before signup, not hidden behind login.
- **Teaser quiz + waitlist capture** (`/quiz`) — a 6-question, ~90-second quiz
  (opens with two identity/emotional questions, then the four original
  practical ones) that resolves to one of five "path" results, then captures
  an email into Firestore's `waitlist` collection to unlock it. The result
  screen renders as a **shareable branded card** (`ShareableResultCard`,
  `react-native-view-shot`) — a "Share my path" button captures it as a PNG
  and opens the native share sheet, turning a quiz result into a low-cost
  acquisition loop.
- **Auth** (`/auth`) — email/password sign-up and sign-in, wired to Firebase
  Auth. "Continue with Apple" / "Continue with Google" are visible but
  disabled ("coming soon") — real OAuth needs Apple/Google developer
  credentials that don't exist yet.
- **A Style Guide screen** (`/dev-style-guide`) — dev-only route rendering the
  whole design system for reference; not part of the real app flow.

**Signed-in**
- **Home** (`/home`) — the post-signin dashboard, redesigned as a dark,
  layered space: a wood-grain photo (`assets/images/brand/wood-grain-dark.jpg`)
  runs full-bleed behind the whole screen under a forest-green gradient, with
  every card now a translucent "glass" panel (`rgba` fill + hairline border)
  floating over the texture instead of a flat card on a cream page. Symptom
  Log and Doctor Toolkit sit **side by side** as a quick-actions row instead
  of stacked links. Two **horizontal, snap-scrolling rails** replace what
  used to be vertical lists: "Recommended for you" (members, from intake
  answers) and "Explore the Library" (all 12 sections, each with its own
  emoji, ending in a "See all 12" card) — closer to a browse experience than
  a link list. Still prompts you to complete the deep-intake quiz if you
  haven't, and surfaces an "unlock your personalized plan" upsell for free
  users.
- **Deep-intake quiz** (`/intake`) — a 53-question questionnaire, organized
  into the 4-arc structure from the build plan and question bank: **Getting
  to know you** (identity/emotional entry — 12 questions), **Body &
  symptoms** (24 — the full physician-lens picture: cycle, hot flashes,
  sleep, mood, focus, joint aches, palpitations, headaches, skin/hair,
  bladder, family history, bone density, bloodwork, chronic conditions,
  doctor history, HRT), **Movement** (9), and **Nutrition** (8, including
  stress/social support/priority). Saved to your profile; requires being
  signed in. `src/data/intakeQuestions.ts` documents which of the 100-question
  bank's items were skipped as duplicates of existing questions.
- **Content library** (`/library`, `/library/[slug]`, `/library/[slug]/[stepId]`)
  — the 11 sections named in the build plan, plus a 12th added as a
  differentiator: Recognition & Validation, The Mishandled Symptom Cluster,
  Body Literacy, Movement, Nutrition, Sleep, Sexual Health, Mental &
  Emotional Health, Doctor-Talk Toolkit, HRT Education, Identity &
  Life-Stage Exploration, and **Wisdom From Around the World** — six short
  cultural perspectives on this life stage (Japan, India, Mesoamerica, West
  Africa, China, Indigenous North America), framed as general/cultural
  information, not medical claims. No app in the comp set combines
  personalization with this cross-cultural lens. Recognition & Validation,
  Doctor-Talk Toolkit, and HRT Education are fully free; the other 9 always
  show a free teaser paragraph on the section overview, with the section's
  steps gated behind membership.
  Each section is a short **ordered course of 3 steps** — an article, a
  video, and a hands-on practice (`src/data/contentLibrary.ts`) — that
  **unlock sequentially**: step 2 stays locked until step 1 is marked
  complete, and so on (`isStepUnlocked`). A step can carry a Cloudflare
  Stream video (`src/services/cloudflareStream.ts`); none are attached yet,
  so video steps show a "coming soon" note with a short text summary
  instead, so nobody's blocked from progressing. Completing all of a
  section's steps is what counts as "finishing" it for badges and points.
  All three library screens (list, section overview, step reading) now
  match Home's dark, layered look — the wood-grain photo full-bleed behind
  glass-panel cards, each section's `emoji` in a circular icon bubble, a
  highlighted "UP NEXT" step in the section overview, and a small dot
  stepper on the step-reading screen showing progress through the section.
- **Your Plan** (`src/services/recommendations.ts`, `getYourPlan`) — Home's
  former "Recommended for you" rail is now a vertical checklist of concrete
  next actions, not whole sections: for each intake-matched section it
  surfaces only the next incomplete step (e.g. "🌱 Practice: Name what
  you're noticing — 💚 Recognition & Validation"), tapping jumps straight
  into that step. Members whose recommended sections are all finished see a
  "you're caught up" message instead of an empty gap. Shown only once
  intake is complete, for active members. Still built on `tags`
  (question:answer pairs on each section, matched against intake answers).
- **Daily Habits** (`/habits`, free for all signed-in users) — a
  build-your-own daily checklist: pick from suggested habits (breathing
  exercise, movement, hydration, journaling, etc.) or add a custom one,
  then tap a habit done each day you do it. Each habit tracks its own
  streak (`getHabitStreak` in `src/services/habits.ts`, based on
  consecutive local-date completions), and checking one off awards
  `POINTS.completeHabit` — unchecking deducts the same amount, so repeated
  toggling can't farm points. Habits live in their own Firestore
  subcollection (`users/{uid}/habits`), separate from the profile doc so
  they can be subscribed to independently. Home's quick-actions row shows
  "X/Y today" once habits exist.
- **Doctor Toolkit** (`/doctor-toolkit`) — free conversation-starter prompts
  and an appointment-prep checklist, plus a link into the Symptom Log. The
  library's Doctor-Talk Toolkit section links back here for the full version.
- **Symptom Log** (`/symptom-log`, membership-gated) — log symptoms over time
  (category, severity, notes) to Firestore, then **export as a PDF**
  (`expo-print` + `expo-sharing`) to bring to an appointment. A **Trends**
  chart (`SymptomChart`, `react-native-svg`) sits above the history list —
  one small severity-over-time line per category actually logged, dots
  colored on a mild→severe sequential ramp, tap a dot to see its date. A
  **Your Patterns** insights card (`src/services/symptomInsights.ts`) sits
  just below the chart once there are at least 5 entries — client-side
  pattern-spotting over the member's own data (a category trending up or
  down, a recurring worst weekday, or their most-logged category as a
  fallback) with no server round-trip. Below that, the full text history
  remains as the detailed/tabular view.
- **Paywall** (`/paywall`) — now built around a **plan comparison table**
  (`PricingComparisonTable`) instead of stacked pricing cards: rows are
  features (quiz, full library, symptom log, live sessions, etc.), columns
  are Free / Membership / the 3-Month Cohort Course, with checkmarks
  showing what each tier includes. The Cohort Course column is clearly
  labeled "Phase 2" since it isn't launched — no purchase flow (it needs a
  real member-verification approach first, per the build plan), just an
  "I'm interested" button that records real demand (`cohortInterested` on
  the profile) instead of faking a buy button. Below the table, a
  **dev-only toggle** flips your own account between free and active so
  you can test every gated screen today.
- **Account** (`/account`, linked from Home) — cancel membership (reverts
  to the free plan — there's no real subscription to cancel yet, see
  "Billing" below), sign out, and **delete account**. Deletion is real:
  after re-entering your password (Firebase requires a recent sign-in to
  delete a user) it removes the `symptomLogs` and `habits` subcollections,
  the profile doc, and the Firebase Auth user itself
  (`src/services/account.ts`, `deleteAllUserData`) — nothing left behind.
- **Symptom Log summary card** (`/home`) — its own dark forest-gradient card
  on the dashboard (same treatment as the level card), showing entry count
  and most recent date, or a prompt to start tracking. Tapping it opens the
  full Symptom Log.
- **Levels & streaks** (`/home`) — a plant-growth level system tied to the
  app's own name (Seed → Sprout → Bud → Bloom → Unfurled,
  `src/data/gameLevels.ts`) that turns real engagement into points: +50 for
  finishing intake, +10 per content step completed plus a +20 bonus for
  finishing every step in a section, +5 per symptom logged, +5 for opening
  the app on a new day (which also builds a daily streak —
  `src/services/gamification.ts`). A handful of badges
  (`src/data/achievements.ts`) are derived purely from existing profile
  stats — no extra storage — and shown on Home alongside a level progress
  bar.
- **Level-up pop-up** (`LevelUpBanner`, using the fern-spiral photo) —
  Home detects the moment a member's points cross into a new level
  (comparing the previous render's level to the current one) and shows a
  celebratory modal over the fern image, distinct from the moss/wood photos
  used elsewhere. Only fires on a real level-up within the session, never
  on initial load for a returning member already past level one.

## Deliberately deferred from the build plan

A few things in the "App Build Plan (MVP)" doc were discussed and
intentionally left out for now, by request rather than by oversight:

- **Virtual events / Zoom registration** — removed; can be re-added later.
- **Storing quiz/intake answers separately from identity data, linked only
  by an internal ID** — the plan calls for this as a privacy safeguard;
  intake answers currently live directly on the user's own `users/{uid}`
  profile doc instead, for simplicity. Worth revisiting before handling real
  sensitive health data at scale.
- **Promo/discount codes** on the paywall — not built.

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

## Project structure

```
app/                  Expo Router screens (file-based routing, thin wrappers)
  index.tsx           Landing screen
  quiz.tsx            Teaser quiz + waitlist capture flow
  auth.tsx            Sign-up / sign-in
  home.tsx            Signed-in dashboard
  intake.tsx           Deep-intake questionnaire
  library/            Content library (list, [slug] overview, [slug]/[stepId] step)
  doctor-toolkit.tsx  Free doctor-prep content + link to symptom log
  symptom-log.tsx     Symptom tracking + PDF export (membership-gated)
  paywall.tsx         Membership screen + dev unlock toggle
  dev-style-guide.tsx Dev-only design system reference
src/
  theme/              Design system: colors, typography, spacing
  components/          Reusable UI: Button, Card, ThemedText, SelectOption,
                        TextField, ProgressBar, PremiumLock
  screens/             Real screen implementations, one per app/ route
  data/                Static content: quiz/intake questions, content
                        library, doctor toolkit tips, game levels,
                        achievements
  services/            Firebase, auth hooks, subscription/paywall state,
                        intake + symptom log writes, PDF export, Cloudflare
                        Stream URL builder, points/streaks (gamification.ts)
firestore.rules        Security rules — deploy via Firebase Console
```
