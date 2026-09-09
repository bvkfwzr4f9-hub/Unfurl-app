/**
 * The 11-section content library. General wellness information, not
 * medical advice — every detail screen shows a disclaimer alongside this.
 *
 * `videoId` is an optional Cloudflare Stream video ID (see
 * src/services/cloudflareStream.ts) — left unset until there's real video
 * content to attach; the player only renders when a section has one.
 */

export interface ContentSection {
  slug: string;
  title: string;
  summary: string;
  isPremium: boolean;
  body: string[];
  videoId?: string;
}

export const contentLibrary: ContentSection[] = [
  {
    slug: 'understanding-the-transition',
    title: 'Understanding the Transition',
    summary: 'What perimenopause, menopause, and post-menopause actually mean.',
    isPremium: false,
    body: [
      "Menopause isn't a single event — it's a transition with three loose stages: perimenopause (hormone levels start shifting, periods become irregular), menopause itself (the point 12 months after your last period), and post-menopause (everything after). Most of what people call \"menopause symptoms\" actually happen during perimenopause, which can last anywhere from a few months to over a decade.",
      "There's no one timeline and no one experience. Some people notice small changes they barely register; others feel like their body changed overnight. Both are normal. What's true for almost everyone is that this stage responds well to information — knowing what's happening and why makes it easier to navigate.",
      "Think of this library as a starting point, not a diagnosis. The goal is to help you recognize what you're feeling, understand roughly why, and figure out what's worth bringing to a doctor versus what's worth just riding out with better tools.",
    ],
  },
  {
    slug: 'hot-flashes-night-sweats',
    title: 'Hot Flashes & Night Sweats',
    summary: 'Why they happen, common triggers, and practical ways to cool down.',
    isPremium: false,
    body: [
      "A hot flash is a sudden wave of heat, often starting in the chest or face, sometimes with sweating or a racing heart. They happen because shifting hormone levels affect how your brain regulates body temperature, making it more sensitive to small changes. Night sweats are the same thing, just showing up while you sleep.",
      "Common triggers worth noticing in yourself: caffeine, alcohol, spicy food, stress, warm rooms, and tight clothing. Not everyone reacts to all of them — a few weeks of loosely tracking what preceded a flash can reveal your own personal pattern.",
      "Practical tools that help a lot of people: dressing in light layers you can shed quickly, keeping your bedroom cool, a bedside fan, moisture-wicking sleepwear, and slow paced breathing at the first sign of a flash (in for 4 counts, out for 6). If flashes are frequent enough to disrupt sleep or daily life, that's worth a conversation with a doctor — effective treatments exist.",
    ],
  },
  {
    slug: 'talking-to-your-doctor',
    title: 'Talking to Your Doctor',
    summary: "How to prepare for the conversation, and why it's worth having sooner.",
    isPremium: false,
    body: [
      "A lot of people wait far longer than they need to before bringing menopause symptoms up with a doctor — sometimes because they assume it's just something to push through, sometimes because a single 15-minute appointment doesn't feel like enough time to explain everything they're feeling.",
      "The single biggest thing that helps: showing up with specifics instead of \"I've just been feeling off.\" When did symptoms start? How often do they happen? What makes them better or worse? What have you already tried? This is exactly what the Doctor Toolkit's symptom log is built for — a running record you can share or print before an appointment.",
      "It's also worth going in with a short list of what you actually want out of the visit — relief from a specific symptom, a general check-in, or just ruling things out. Doctors can cover a lot more ground when they know what you're hoping to walk out with.",
    ],
  },
  {
    slug: 'sleep',
    title: 'Sleep',
    summary: 'How hormonal shifts affect sleep, and how to protect it.',
    isPremium: true,
    body: [
      "Sleep is one of the areas hit hardest during this transition, and it's rarely just about night sweats — shifting hormones affect the sleep cycle itself, making it easier to wake up and harder to fall back asleep.",
      "A consistent wind-down routine matters more here than it used to: a fixed bedtime and wake time (even on weekends), dimming lights an hour before bed, and cutting caffeine earlier in the day than you might be used to. Cooling your bedroom (65-68°F / 18-20°C is a common sweet spot) helps with both general sleep quality and night sweats specifically.",
      "If you're lying awake, resist the urge to force it — get up, do something calm and low-stimulation for 15-20 minutes, then try again. And if poor sleep has been a near-nightly pattern for more than a few weeks, it's worth raising with a doctor rather than treating it as something to just tolerate.",
    ],
  },
  {
    slug: 'mood-mental-health',
    title: 'Mood & Mental Health',
    summary: "Why mood can shift during this transition, and when to seek support.",
    isPremium: true,
    body: [
      "Estrogen influences serotonin and other brain chemistry tied to mood, so it's genuinely common to feel more irritable, anxious, or emotionally reactive during perimenopause — even for people with no prior history of mood changes.",
      "It helps to separate situational stress (a hard week, a hard year) from something that feels more persistent or out of proportion to what's going on around you. Grounding tools — short walks, a few minutes of slow breathing, naming what you're feeling out loud or in writing — can take the edge off day to day.",
      "If low mood, anxiety, or irritability are sticking around most days for more than two weeks, or are affecting your relationships or ability to function, that's worth bringing to a doctor or therapist. This is common, treatable, and nothing to feel like you have to push through alone.",
    ],
  },
  {
    slug: 'brain-fog-focus',
    title: 'Brain Fog & Focus',
    summary: 'Why concentration and word-recall can dip — and how to work around it.',
    isPremium: true,
    body: [
      "\"Brain fog\" — trouble concentrating, losing your train of thought, blanking on a familiar word — is one of the most common and most disorienting parts of this transition, and it catches a lot of people off guard because it isn't talked about as much as hot flashes.",
      "It's driven by the same hormonal shifts affecting sleep and mood, and for most people it's temporary, even if it doesn't feel that way in the moment. Externalizing memory helps in the meantime: writing things down immediately rather than trusting you'll remember, keeping a single running list instead of scattered notes, and building in short breaks during demanding mental work.",
      "Protecting your sleep (see the Sleep section) tends to have an outsized effect on focus, since poor sleep alone can produce most of the same symptoms. If fog is significantly affecting your work or daily life, it's a reasonable thing to mention at a doctor's visit alongside your other symptoms.",
    ],
  },
  {
    slug: 'weight-metabolism',
    title: 'Weight & Metabolism',
    summary: 'What actually changes metabolically, without the diet-culture noise.',
    isPremium: true,
    body: [
      "Metabolism does shift during this transition — partly from hormonal changes, partly from age-related muscle loss that happens to everyone over time. It's real, but it's not a reason to reach for a crash diet or a rigid plan you can't sustain.",
      "The single most effective habit for this stage isn't cutting calories further — it's strength training. Building or maintaining muscle mass directly counters the metabolic slowdown and also protects bone density (see Bone & Heart Health). Two to three sessions a week, even short ones, make a measurable difference over months.",
      "Beyond that: prioritizing protein and fiber at meals (both support satiety and muscle maintenance), and treating this as a long-term relationship with your body rather than a problem to solve quickly. Sustainable beats fast, every time, at this stage more than most.",
    ],
  },
  {
    slug: 'bone-heart-health',
    title: 'Bone & Heart Health Basics',
    summary: 'Why these become more important to think about now.',
    isPremium: true,
    body: [
      "Estrogen plays a protective role for both bone density and cardiovascular health, so both become more worth paying attention to once levels start declining. This isn't cause for alarm — it's cause for a few sensible habits and regular checkups.",
      "For bones: weight-bearing exercise (walking counts, strength training counts more), and enough calcium and vitamin D through diet or, if needed, supplements — worth discussing specifics with a doctor rather than guessing at dosages.",
      "For heart health: the basics matter more now, not less — regular movement, tracking blood pressure, and not skipping annual checkups. A bone density scan and a cardiovascular risk conversation are both reasonable things to proactively ask your doctor about around this stage, even without symptoms.",
    ],
  },
  {
    slug: 'skin-hair-changes',
    title: 'Skin & Hair Changes',
    summary: "Collagen, elasticity, and hair thinning — what's normal and what helps.",
    isPremium: true,
    body: [
      "Declining estrogen affects collagen production, which is why skin can feel thinner, drier, or less elastic during this transition, and why some people notice hair thinning or texture changes around the same time.",
      "Gentle adjustments tend to help more than aggressive ones: a richer moisturizer, sunscreen (always, but especially now), and being a little more patient with your skin than you used to need to be. For hair, a scalp-friendly shampoo and avoiding excessive heat styling can reduce additional stress on strands that are already more fragile.",
      "Sudden or significant hair loss — as opposed to gradual thinning — is worth mentioning to a doctor, since it can occasionally point to something else (like a thyroid issue) worth ruling out.",
    ],
  },
  {
    slug: 'sex-intimacy',
    title: 'Sex & Intimacy',
    summary: 'Normalizing changes in desire and comfort, and what actually helps.',
    isPremium: true,
    body: [
      "Changes in libido, arousal, or physical comfort during sex are extremely common during this transition and are almost never talked about as openly as hot flashes, which can make them feel more isolating than they need to be.",
      "Vaginal dryness, in particular, is a direct and very treatable effect of hormonal changes — over-the-counter moisturizers and lubricants help many people, and prescription options exist for those who need more. This is a completely normal thing to bring up with a doctor; you will not be the first person that day to ask.",
      "Just as important: talking with a partner, if you have one, about what's changing rather than letting it go unspoken. Desire and intimacy can look different at this stage without meaning something is wrong — it's worth giving yourselves room to redefine what feels good.",
    ],
  },
  {
    slug: 'nutrition-movement',
    title: 'Nutrition & Movement',
    summary: 'Eating and moving in ways that actually support this stage of life.',
    isPremium: true,
    body: [
      "Nothing here requires an overhaul — small, consistent shifts tend to matter more than a strict new plan. Prioritizing protein at each meal supports muscle maintenance (which, as covered in Weight & Metabolism, becomes more important now), and fiber supports both digestion and steadier energy through the day.",
      "For movement, a mix beats any single type: strength training two to three times a week, some form of cardio for heart health, and flexibility or balance work (yoga, stretching) to support joints that may feel stiffer than they used to.",
      "Hydration matters more than it gets credit for, especially if hot flashes or night sweats are part of your experience. And as with everything in this library — consistency you can actually keep up beats intensity you'll abandon in three weeks.",
    ],
  },
];

export function getContentSection(slug: string): ContentSection | undefined {
  return contentLibrary.find((section) => section.slug === slug);
}
