/**
 * The content library: the 11 sections from the build plan, plus a 12th —
 * "Wisdom From Around the World" — added as a differentiator, since none of
 * the comparable apps combine personalization with a cross-cultural lens on
 * this stage of life.
 * General wellness information, not medical advice — every step screen
 * shows a disclaimer alongside this.
 *
 * Each section is a short ordered course of `steps` (article -> video ->
 * practice) rather than one long scroll. Steps unlock sequentially — see
 * `isStepUnlocked` — and completing all of a section's steps is what
 * counts as "finishing" it for achievements and points.
 *
 * `teaser` is always visible, even for premium sections and signed-out
 * visitors, on the section overview. The step list itself (and therefore
 * all step content) is gated behind membership when `isPremium` is true —
 * see ContentDetailScreen.
 *
 * `tags` are `${intakeQuestionId}:${answerId}` pairs (see
 * src/data/intakeQuestions.ts) used to recommend sections based on a
 * member's intake answers — see src/services/recommendations.ts.
 *
 * A step's `videoId` is an optional Cloudflare Stream video ID (see
 * src/services/cloudflareStream.ts) — left unset until there's real video
 * content to attach; the player only renders when a step has one, and a
 * "video coming soon" note with a short summary shows instead so nobody's
 * blocked from progressing.
 */

export type ContentStepType = 'article' | 'video' | 'practice';

export interface ContentStep {
  id: string;
  type: ContentStepType;
  title: string;
  body: string[];
  videoId?: string;
}

export interface ContentSection {
  slug: string;
  title: string;
  summary: string;
  isPremium: boolean;
  teaser: string;
  steps: ContentStep[];
  tags: string[];
}

export const contentLibrary: ContentSection[] = [
  {
    slug: 'recognition-validation',
    title: 'Recognition & Validation',
    summary: "You're not imagining this — and you're not alone in it.",
    isPremium: false,
    teaser:
      "If you've felt like something is different in your body and the people around you don't seem to be naming it, you're not imagining it. What you're going through has a name, a pattern, and millions of people navigating it alongside you — even if it doesn't always feel that way.",
    steps: [
      {
        id: 'article',
        type: 'article',
        title: 'Why this gets missed',
        body: [
          "Menopause and the years leading up to it get talked about far less than they should, given how many people go through it. That silence can make ordinary symptoms feel confusing or even alarming, when they're actually part of a well-documented transition.",
          "This isn't about having an answer for everything you're feeling — it's about starting from a place where your experience is taken seriously, by yourself first. That's the whole premise of this app: information and tools, not dismissal.",
          "Wherever you are in this — just noticing changes, deep in it, or years past it and still working through what it meant — you belong here.",
        ],
      },
      {
        id: 'video',
        type: 'video',
        title: "You're not alone: real stories",
        body: [
          'A short video with real people describing what recognition felt like for them.',
        ],
      },
      {
        id: 'practice',
        type: 'practice',
        title: 'Name what you\'re noticing',
        body: [
          "Write down three things you've noticed changing in your body or mood over the last few months — without judging them as good or bad. Just name them.",
          "That's it. Naming something is the first step toward not feeling confused by it.",
        ],
      },
    ],
    tags: ['general'],
  },
  {
    slug: 'mishandled-symptom-cluster',
    title: 'The Mishandled Symptom Cluster',
    summary: 'Hot flashes, palpitations, joint pain — often treated separately, but frequently connected.',
    isPremium: true,
    teaser:
      "Hot flashes, night sweats, heart palpitations, joint aches, itchy skin — on their own, each of these can get waved off as unrelated, or misdiagnosed as something else entirely. Grouped together, they tell a more coherent story.",
    steps: [
      {
        id: 'article',
        type: 'article',
        title: 'Why these symptoms cluster together',
        body: [
          "These symptoms cluster together because they share a root cause: declining and fluctuating estrogen affects temperature regulation, blood vessels, joints, and skin more broadly than most people realize. Seen individually, each one can send you down a separate, sometimes fruitless, diagnostic path.",
          "Knowing they're connected changes how you talk about them. Instead of \"I've had some random joint pain and my heart races sometimes,\" you can say \"I'm noticing a cluster of symptoms that fit a hormonal pattern.\" That framing gets taken more seriously, faster.",
          "None of this replaces a proper workup for chest pain or new palpitations, which should always be checked. But knowing the pattern exists means you're not starting that conversation from zero.",
        ],
      },
      {
        id: 'video',
        type: 'video',
        title: 'Spotting the pattern',
        body: ['A short video walking through how to recognize your own version of this cluster.'],
      },
      {
        id: 'practice',
        type: 'practice',
        title: "Track today's cluster",
        body: [
          'Over the next 24 hours, jot down any hot flashes, joint aches, or palpitations as they happen, noting the time of day.',
          'Look back at the end of the day for a pattern — that pattern is worth bringing to a doctor.',
        ],
      },
    ],
    tags: [
      'hotFlashes:weekly',
      'hotFlashes:daily',
      'hotFlashes:multiple-daily',
      'jointAches:frequently',
      'jointAches:daily',
      'palpitations:sometimes',
      'palpitations:often',
      'headaches:occasionally',
      'headaches:frequently',
      'skinHairChanges:noticeably',
      'skinHairChanges:significantly',
      'priorityFix:hot-flashes',
      'breastTenderness:yes-noticeably',
      'hotFlashesExercise:yes-significantly',
      'hotFlashesExercise:somewhat',
    ],
  },
  {
    slug: 'body-literacy',
    title: 'Body Literacy',
    summary: "What's actually happening hormonally, in plain language.",
    isPremium: true,
    teaser:
      "Perimenopause, menopause, post-menopause — the words get used loosely, but they mark real, distinct hormonal phases. Understanding which one you're roughly in helps everything else make more sense.",
    steps: [
      {
        id: 'article',
        type: 'article',
        title: 'The three phases',
        body: [
          "Perimenopause is the run-up: estrogen and progesterone start fluctuating, sometimes wildly, well before periods stop. This is where most of the disruptive symptoms actually happen, and it can last anywhere from a couple of years to over a decade.",
          "Menopause itself is a single point in time: 12 consecutive months without a period. Post-menopause is everything after — hormone levels settle at a new, lower baseline, and while some symptoms often ease, new considerations like bone density become more relevant.",
          "You don't need lab work to have a rough sense of where you are — your cycle pattern and symptom timeline are usually enough of a clue. But if you want confirmation, that's a completely reasonable thing to ask a doctor for.",
        ],
      },
      {
        id: 'video',
        type: 'video',
        title: 'Your hormones, visualized',
        body: ['A short animated walkthrough of how estrogen and progesterone shift across the three phases.'],
      },
      {
        id: 'practice',
        type: 'practice',
        title: 'Map your stage',
        body: [
          'Write one sentence describing which stage you think you\'re in and why, based on your cycle and symptom timeline.',
          "Bring that sentence to your next doctor's visit — it's a great opener.",
        ],
      },
    ],
    tags: [
      'goal:understand',
      'stage:unsure',
      'symptomDuration:unsure',
      'cycleRegularity:somewhat-irregular',
      'cycleRegularity:very-irregular',
      'priorityFix:energy-focus',
      'familyHistory:no-idea',
      'familyHistory:never-asked',
      'boneDensity:no-idea',
      'boneDensity:never-checked',
      'recentBloodwork:yes-but-confused',
      'chronicConditions:possibly-undiagnosed',
      'confidentDistinguishing:not-really',
      'confidentDistinguishing:no-idea',
    ],
  },
  {
    slug: 'movement',
    title: 'Movement',
    summary: 'Why strength training matters more now, and how to build a routine that sticks.',
    isPremium: true,
    teaser:
      "Movement needs change during this transition — mostly because muscle mass becomes harder to maintain, which makes strength training the single highest-leverage habit you can build right now.",
    steps: [
      {
        id: 'article',
        type: 'article',
        title: 'Why strength training matters most now',
        body: [
          "Estrogen decline accelerates age-related muscle loss, which is part of why strength training — not just cardio — becomes so important now. It protects metabolism, bone density, and functional strength all at once. Two to three short sessions a week is enough to see real change over a few months.",
          "Cardio still matters for heart health, and doesn't need to be intense — brisk walking counts. Flexibility and balance work (yoga, simple stretching) becomes more valuable too, as joints can feel stiffer than they used to.",
          "The habit that sticks beats the routine that's perfect on paper. Start with whatever version of this you'll actually keep doing.",
        ],
      },
      {
        id: 'video',
        type: 'video',
        title: 'A 10-minute starter routine',
        body: ['A short beginner-friendly strength routine you can do at home with no equipment.'],
      },
      {
        id: 'practice',
        type: 'practice',
        title: 'Two-minute strength',
        body: [
          'Right now, do one set of bodyweight squats or wall push-ups, for as long as feels comfortable.',
          "That's the whole practice. Small and repeatable beats ambitious and abandoned.",
        ],
      },
    ],
    tags: [
      'activity:rarely',
      'activity:not-active',
      'activity:sometimes',
      'bodyComposition:noticeable-change',
      'bodyComposition:significant-change',
      'movementPreference:walking-cardio',
      'movementPreference:strength',
      'movementPreference:yoga-stretching',
      'movementPreference:none-right-now',
      'energyForActivity:a-bit-lower',
      'energyForActivity:significantly-lower',
      'strengthTrainingBarrier:no-but-want-to',
      'gymConfidence:not-very',
      'gymConfidence:avoid-it-entirely',
      'hotFlashesExercise:yes-significantly',
      'restRelationship:guilty-resting',
      'modifiedActivities:yes-several',
      'modifiedActivities:one-or-two',
      'pelvicFloor:yes-noticeably',
      'pelvicFloor:a-little',
    ],
  },
  {
    slug: 'nutrition',
    title: 'Nutrition',
    summary: 'Small, sustainable shifts — not another diet.',
    isPremium: true,
    teaser:
      "Nothing here requires an overhaul. A few consistent shifts — more protein, more fiber, steadier hydration — tend to matter more than any strict new plan, especially at this stage.",
    steps: [
      {
        id: 'article',
        type: 'article',
        title: 'What actually shifts nutritionally',
        body: [
          "Protein at each meal supports the muscle maintenance covered in Movement, and tends to keep energy and fullness steadier through the day. Fiber supports digestion, which can shift during this transition, and helps regulate blood sugar swings that can worsen mood and energy dips.",
          "Hydration is worth paying more attention to than it usually gets credit for, especially if hot flashes or night sweats are part of your experience — they increase fluid loss more than people expect.",
          "This is a long-term relationship with your body, not a short-term fix. Consistent and sustainable beats intense and abandoned in three weeks, every time.",
        ],
      },
      {
        id: 'video',
        type: 'video',
        title: 'Building a balanced plate',
        body: ['A short visual guide to balancing protein, fiber, and hydration without counting anything.'],
      },
      {
        id: 'practice',
        type: 'practice',
        title: 'Protein check',
        body: [
          'Before your next meal, look at it and ask: is there a clear protein source?',
          "If not, add one — an egg, some yogurt, a handful of nuts. That's the whole adjustment.",
        ],
      },
    ],
    tags: [
      'goal:feel-better',
      'hotFlashes:daily',
      'hotFlashes:multiple-daily',
      'bodyComposition:noticeable-change',
      'bodyComposition:significant-change',
      'symptomTriggers:yes-definitely',
      'appetiteChanges:yes-noticeably',
      'foodRelationship:yes-significantly',
      'emotionalEating:yes-definitely',
      'emotionalEating:sometimes',
      'alcoholRelationship:drinking-more',
      'cookingIntention:mostly-afterthought',
      'cookingIntention:rarely-cook',
      'nourishConfidence:mostly-guessing',
    ],
  },
  {
    slug: 'sleep',
    title: 'Sleep',
    summary: 'Why it gets harder during this transition, and how to protect it.',
    isPremium: true,
    teaser:
      "Sleep is one of the hardest-hit areas during this transition — and it's rarely just about night sweats. Shifting hormones affect the sleep cycle itself, making it easier to wake and harder to fall back asleep.",
    steps: [
      {
        id: 'article',
        type: 'article',
        title: 'Why sleep gets harder',
        body: [
          "A consistent wind-down routine matters more here than it used to: a fixed bedtime and wake time, dimming lights an hour before bed, and cutting caffeine earlier in the day. Cooling your bedroom helps with both general sleep quality and night sweats specifically.",
          "If you're lying awake, resist forcing it — get up, do something calm and low-stimulation for 15-20 minutes, then try again. A near-nightly pattern of poor sleep for more than a few weeks is worth raising with a doctor rather than treating as something to just tolerate.",
        ],
      },
      {
        id: 'video',
        type: 'video',
        title: 'A wind-down routine, demonstrated',
        body: ['A short walkthrough of a realistic hour-before-bed routine.'],
      },
      {
        id: 'practice',
        type: 'practice',
        title: "Tonight's wind-down",
        body: [
          'Pick one thing to change tonight: dim the lights an hour early, or set the bedroom a few degrees cooler.',
          'Just one. See how it feels before adding another.',
        ],
      },
    ],
    tags: ['sleep:occasional', 'sleep:frequent', 'sleep:rare-good-night', 'priorityFix:sleep'],
  },
  {
    slug: 'sexual-health',
    title: 'Sexual Health',
    summary: 'Normalizing changes in desire and comfort, and what actually helps.',
    isPremium: true,
    teaser:
      "Changes in libido, arousal, or physical comfort during sex are extremely common during this transition, and are talked about far less openly than hot flashes — which can make them feel more isolating than they need to be.",
    steps: [
      {
        id: 'article',
        type: 'article',
        title: "What's changing, and what helps",
        body: [
          "Vaginal dryness is a direct, very treatable effect of hormonal change — over-the-counter moisturizers and lubricants help many people, and prescription options exist for those who need more. This is a completely ordinary thing to bring up with a doctor.",
          "Just as important: talking with a partner, if you have one, about what's changing rather than letting it go unspoken. Desire and intimacy can look different at this stage without meaning something is wrong — it's worth giving yourselves room to redefine what feels good.",
        ],
      },
      {
        id: 'video',
        type: 'video',
        title: 'Talking about it, without the awkwardness',
        body: ['A short video on opening this conversation with a partner or a doctor.'],
      },
      {
        id: 'practice',
        type: 'practice',
        title: 'Start the conversation',
        body: [
          "Write down one sentence you could say to a partner or doctor about what's changed for you.",
          "You don't have to say it out loud yet — just have it ready.",
        ],
      },
    ],
    tags: [
      'bodyRelationship:frustrated',
      'bodyRelationship:grieving',
      'goal:understand',
      'bladderChanges:occasional',
      'bladderChanges:frequent',
      'pelvicFloor:yes-noticeably',
      'pelvicFloor:a-little',
    ],
  },
  {
    slug: 'mental-emotional-health',
    title: 'Mental & Emotional Health',
    summary: "Why mood can shift, and when it's worth seeking support.",
    isPremium: true,
    teaser:
      "Estrogen influences the brain chemistry tied to mood, so it's genuinely common to feel more irritable, anxious, or emotionally reactive during this transition — even with no prior history of mood changes.",
    steps: [
      {
        id: 'article',
        type: 'article',
        title: 'Why mood shifts, and when to get support',
        body: [
          "It helps to separate situational stress from something more persistent. Grounding tools — short walks, slow breathing, naming what you're feeling out loud or in writing — can take the edge off day to day.",
          "If low mood, anxiety, or irritability stick around most days for more than two weeks, or affect your relationships or ability to function, that's worth bringing to a doctor or therapist. This is common, treatable, and nothing to push through alone.",
        ],
      },
      {
        id: 'video',
        type: 'video',
        title: 'A grounding exercise, guided',
        body: ['A short guided breathing and grounding exercise you can follow along with.'],
      },
      {
        id: 'practice',
        type: 'practice',
        title: '60-second reset',
        body: [
          'Try slow breathing right now: in for 4 counts, hold for 4, out for 6.',
          'Repeat 5 times. Notice if anything shifted, even a little.',
        ],
      },
    ],
    tags: [
      'mood:some-ups-downs',
      'mood:noticeable-swings',
      'mood:significant',
      'stressLevel:high',
      'stressLevel:overwhelming',
      'workImpact:moderately',
      'workImpact:significantly',
      'priorityFix:mood',
      'selfTalk:pretty-critical',
      'emotionalEating:yes-definitely',
    ],
  },
  {
    slug: 'doctor-talk-toolkit',
    title: 'Doctor-Talk Toolkit',
    summary: "How to prepare for the conversation, and why it's worth having sooner.",
    isPremium: false,
    teaser:
      "A lot of people wait far longer than they need to before bringing menopause symptoms up with a doctor — often because a single 15-minute appointment doesn't feel like enough time to explain everything.",
    steps: [
      {
        id: 'article',
        type: 'article',
        title: 'How to prepare',
        body: [
          "The biggest thing that helps: showing up with specifics instead of \"I've just been feeling off.\" When did symptoms start? How often? What makes them better or worse? What have you already tried?",
          "It's worth going in with a short list of what you actually want from the visit. Doctors can cover far more ground when they know what you're hoping to walk out with.",
        ],
      },
      {
        id: 'video',
        type: 'video',
        title: 'A mock appointment, walked through',
        body: ['A short video modeling how to open this conversation with a doctor.'],
      },
      {
        id: 'practice',
        type: 'practice',
        title: 'Build your list',
        body: [
          "Write down the one symptom you'd most want a doctor to take seriously, and one question you want answered.",
          'Keep it in your notes app so it\'s ready before your next visit — or use the full Doctor Toolkit for more.',
        ],
      },
    ],
    tags: [
      'doctorConversation:not-yet',
      'doctorConversation:planning',
      'doctorDismissed:yes-more-than-once',
      'doctorDismissed:once',
      'chronicConditions:yes',
      'chronicConditions:possibly-undiagnosed',
    ],
  },
  {
    slug: 'hrt-education',
    title: 'HRT Education',
    summary: "What hormone therapy is, in plain terms — not a recommendation, just information.",
    isPremium: false,
    teaser:
      "Hormone replacement therapy (HRT) — sometimes called menopause hormone therapy — replaces some of the estrogen (and often progesterone) your body stops producing. It's one of the most effective treatments for hot flashes and several other symptoms, and also one of the most misunderstood.",
    steps: [
      {
        id: 'article',
        type: 'article',
        title: 'What HRT actually is',
        body: [
          "It comes in several forms — pills, patches, gels, and vaginal preparations — each with different risk and benefit profiles depending on your health history. There isn't a single \"right\" version; it's a genuinely individual decision made with a doctor.",
          "Older research once led to widespread fear around HRT that more recent, better-designed studies have significantly walked back for most healthy people within about 10 years of menopause onset. That said, it isn't right for everyone, and the details of your own history matter.",
          "This section exists to help you walk into that doctor's conversation informed, not to tell you what to decide. If you haven't discussed it yet, the Doctor-Talk Toolkit can help you prepare.",
        ],
      },
      {
        id: 'video',
        type: 'video',
        title: 'The forms of HRT, compared',
        body: ['A short visual comparison of pills, patches, gels, and vaginal preparations.'],
      },
      {
        id: 'practice',
        type: 'practice',
        title: 'One question',
        body: [
          "Write down one specific question about HRT you'd want to ask a doctor, even if you're not ready to start it.",
          'Having the question ready is progress on its own.',
        ],
      },
    ],
    tags: [
      'currentSupport:unsure',
      'hrtInterest:considering',
      'hrtInterest:unfamiliar',
      'recentBloodwork:yes-but-confused',
      'recentBloodwork:never-had-it-done',
    ],
  },
  {
    slug: 'identity-life-stage-exploration',
    title: 'Identity & Life-Stage Exploration',
    summary: "Redefining who you are through this transition, not just what's happening to your body.",
    isPremium: true,
    teaser:
      "This transition isn't only physical. For a lot of people, it coincides with bigger questions — about identity, purpose, relationships, what the next chapter looks like — that deserve their own space.",
    steps: [
      {
        id: 'article',
        type: 'article',
        title: 'Mourning and becoming, at once',
        body: [
          "It's common to feel a kind of grief for a version of yourself that's shifting, alongside curiosity about who you're becoming. Both can be true at once, and neither needs to be resolved quickly.",
          "Some people find this stage clarifying — a real permission to reprioritize what matters after years of putting other things first. If that's not where you are yet, that's completely fine too. There's no timeline you're supposed to be on.",
        ],
      },
      {
        id: 'video',
        type: 'video',
        title: 'Others on this same chapter',
        body: ['A short video of others reflecting on identity shifts during this transition.'],
      },
      {
        id: 'practice',
        type: 'practice',
        title: 'One word',
        body: [
          'Write down one word for how you feel about this chapter right now.',
          'No explanation needed — just notice it.',
        ],
      },
    ],
    tags: [
      'bodyRelationship:grieving',
      'bodyRelationship:figuring-out',
      'bodyRelationship:curious',
      'socialSupport:not-really',
      'feelDifferentPerson:completely-different',
      'feelDifferentPerson:somewhat-different',
      'senseOfPurpose:not-very-connected',
      'senseOfPurpose:havent-thought-about-it',
      'identityRoles:yes-significantly',
      'identityRoles:somewhat',
      'fertilityGrief:yes-strongly',
      'fertilityGrief:a-little',
      'permissionToPrioritize:not-really',
      'permissionToPrioritize:working-on-it',
      'mourningOrCurious:mostly-mourning',
      'mourningOrCurious:mostly-curious',
      'mourningOrCurious:both-equally',
    ],
  },
  {
    slug: 'global-wisdom',
    title: 'Wisdom From Around the World',
    summary: 'How other cultures have framed this stage of life — beyond the Western clinical lens.',
    isPremium: true,
    teaser:
      "Most of what gets written about menopause comes from a narrow, Western, clinical point of view — symptoms to manage, a decline to slow down. That's not the only way this stage of life has ever been understood. Cultures around the world have long treated it as a shift worth marking, not just enduring.",
    steps: [
      {
        id: 'article',
        type: 'article',
        title: 'Six ways this stage has been understood',
        body: [
          "This isn't a medical comparison and it isn't a claim that any one tradition has it 'right' — it's a reminder that the Western framing of menopause as a problem to solve is a choice, not the only lens available. Here are a few others.",
          "Japan: the word often used is konenki — roughly 'renewal years.' Traditional framing treats this as a gradual transition rather than a medical event, and some researchers have noted that hot flashes are reported far less frequently there, a reminder that culture and expectation shape lived experience.",
          "India: in Ayurvedic tradition, this stage is associated with the transition into the vata life phase — a time associated with lightness, movement, and change, where diet and daily rhythm (not just symptom management) are treated as the main tools for staying steady.",
          "Mesoamerica: among Maya communities studied by anthropologists, menopause has often been described with far less distress than in Western populations, tied to an increase in social status and freedom rather than a loss — elder women frequently take on more respected roles, not fewer.",
          "West Africa: in several traditions, this stage is tied to eldership and the transition into a role as a community knowledge-holder — the physical change is one part of a broader, honored life passage, not the headline of it.",
          "China: in Traditional Chinese Medicine, this transition is understood through the lens of balance — particularly a shift in yin and yang — with food, rest, and daily rhythm treated as the primary levers, long before it would be framed as something to 'fix.'",
          "North America (Indigenous traditions): several Indigenous nations mark this stage as the beginning of a woman's role as a Grandmother — a time of increased standing and spiritual responsibility within the community, actively welcomed rather than quietly endured.",
          "None of this replaces medical care, and none of it is offered as 'the' answer. It's offered as evidence that how you're taught to expect this stage to feel shapes how it actually feels — and you get to choose which story you tell yourself about it.",
        ],
      },
      {
        id: 'video',
        type: 'video',
        title: 'Voices from different traditions',
        body: [
          'A short video conversation with women describing how this stage is talked about in their own cultural backgrounds.',
        ],
      },
      {
        id: 'practice',
        type: 'practice',
        title: 'Write your own story of this stage',
        body: [
          "Across every tradition above, this transition is marked, not ignored — with a role, a ritual, or a new kind of standing. Western culture mostly skips that step.",
          "Take five minutes and write one paragraph: if this stage of your life were being marked or celebrated, instead of just managed, what would that look like? There's no wrong answer — this is just practice at telling yourself a different story than 'something to get through.'",
        ],
      },
    ],
    tags: [
      'goal:community',
      'mourningOrCurious:mostly-curious',
      'mourningOrCurious:both-equally',
      'bodyRelationship:curious',
      'bodyRelationship:figuring-out',
      'permissionToPrioritize:working-on-it',
    ],
  },
];

export function getContentSection(slug: string): ContentSection | undefined {
  return contentLibrary.find((section) => section.slug === slug);
}

export function getContentStep(slug: string, stepId: string): ContentStep | undefined {
  return getContentSection(slug)?.steps.find((step) => step.id === stepId);
}

/** Composite id used to track a step's completion on the user's profile. */
export function stepCompletionId(sectionSlug: string, stepId: string): string {
  return `${sectionSlug}:${stepId}`;
}

export function isStepCompleted(
  completedSteps: string[],
  sectionSlug: string,
  stepId: string
): boolean {
  return completedSteps.includes(stepCompletionId(sectionSlug, stepId));
}

/** A step unlocks once every step before it in the section is completed; the first step is always unlocked. */
export function isStepUnlocked(
  section: ContentSection,
  stepIndex: number,
  completedSteps: string[]
): boolean {
  if (stepIndex === 0) return true;
  const previousStep = section.steps[stepIndex - 1];
  return isStepCompleted(completedSteps, section.slug, previousStep.id);
}

export function isSectionComplete(section: ContentSection, completedSteps: string[]): boolean {
  return section.steps.every((step) => isStepCompleted(completedSteps, section.slug, step.id));
}

export function countCompletedSections(completedSteps: string[]): number {
  return contentLibrary.filter((section) => isSectionComplete(section, completedSteps)).length;
}
