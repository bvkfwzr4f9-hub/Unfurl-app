/**
 * Deep-intake questionnaire, taken once after sign-up. Longer and more
 * specific than the teaser quiz (src/data/quizQuestions.ts) — answers are
 * saved to the user's profile and used to tailor which content library
 * sections get surfaced first. Still not diagnostic.
 *
 * Organized into the plan's 4-arc structure (emotional/identity entry ->
 * body literacy/symptoms -> movement -> nutrition), sourced from a mix of
 * the original question set and a 100-question bank spanning physician,
 * therapist, personal-trainer, and nutrition-specialist lenses. Every
 * question from the bank that overlapped an existing one (e.g. period
 * changes, hot flashes, joint pain, bladder changes, mood, brain fog,
 * current medications) was skipped rather than asked twice.
 */

export type IntakeArc = 'identity' | 'body' | 'movement' | 'nutrition';

export const ARC_LABELS: Record<IntakeArc, string> = {
  identity: 'Getting to know you',
  body: 'Body & symptoms',
  movement: 'Movement',
  nutrition: 'Nutrition',
};

export interface IntakeOption {
  id: string;
  label: string;
}

export interface IntakeQuestion {
  id: string;
  arc: IntakeArc;
  question: string;
  options: IntakeOption[];
}

export const intakeQuestions: IntakeQuestion[] = [
  // ── Arc 1: Getting to know you (emotional/identity entry point) ──
  {
    id: 'feelDifferentPerson',
    arc: 'identity',
    question: 'Compared to five years ago, do you feel like a different person?',
    options: [
      { id: 'completely-different', label: 'Yes, a completely different person' },
      { id: 'somewhat-different', label: 'A somewhat different version of myself' },
      { id: 'same', label: 'Pretty much the same' },
      { id: 'not-sure', label: "Haven't really thought about it" },
    ],
  },
  {
    id: 'senseOfPurpose',
    arc: 'identity',
    question: 'How connected do you feel to your sense of purpose right now?',
    options: [
      { id: 'very-connected', label: 'Very connected' },
      { id: 'somewhat-connected', label: 'Somewhat' },
      { id: 'not-very-connected', label: 'Not very' },
      { id: 'havent-thought-about-it', label: "Haven't thought about it" },
    ],
  },
  {
    id: 'identityRoles',
    arc: 'identity',
    question: "Has your sense of identity — tied to roles like partner, parent, or career — been shifting lately?",
    options: [
      { id: 'yes-significantly', label: 'Yes, significantly' },
      { id: 'somewhat', label: 'Somewhat' },
      { id: 'not-really', label: 'Not really' },
      { id: 'never-thought-of-it', label: 'Never thought of it that way' },
    ],
  },
  {
    id: 'fertilityGrief',
    arc: 'identity',
    question: 'Do you feel any sense of loss around your reproductive years ending?',
    options: [
      { id: 'yes-strongly', label: 'Yes, strongly' },
      { id: 'a-little', label: 'A little' },
      { id: 'not-really', label: 'Not really' },
      { id: 'prefer-not-to-say', label: 'Prefer not to say' },
    ],
  },
  {
    id: 'selfTalk',
    arc: 'identity',
    question: "When you're struggling lately, how do you tend to talk to yourself?",
    options: [
      { id: 'pretty-critical', label: 'Pretty critical' },
      { id: 'in-between', label: 'Somewhere in between' },
      { id: 'mostly-kind', label: 'Mostly kind' },
      { id: 'varies-a-lot', label: 'It varies a lot' },
    ],
  },
  {
    id: 'permissionToPrioritize',
    arc: 'identity',
    question: 'Do you feel like you have permission to prioritize yourself right now?',
    options: [
      { id: 'yes-fully', label: 'Yes, fully' },
      { id: 'somewhat', label: 'Somewhat' },
      { id: 'not-really', label: 'Not really' },
      { id: 'working-on-it', label: "Working on it" },
    ],
  },
  {
    id: 'mourningOrCurious',
    arc: 'identity',
    question: "If you're being honest, are you mourning who you were, curious about who you're becoming, or both?",
    options: [
      { id: 'mostly-mourning', label: 'Mostly mourning' },
      { id: 'mostly-curious', label: 'Mostly curious' },
      { id: 'both-equally', label: 'Both, equally' },
      { id: 'feeling-neutral', label: 'Feeling pretty neutral about it' },
    ],
  },
  {
    id: 'bodyRelationship',
    arc: 'identity',
    question: 'How would you describe your relationship with your changing body right now?',
    options: [
      { id: 'curious', label: 'Curious and open to it' },
      { id: 'frustrated', label: 'Frustrated' },
      { id: 'grieving', label: "Grieving what's changing" },
      { id: 'figuring-out', label: 'Still figuring it out' },
    ],
  },
  {
    id: 'stressLevel',
    arc: 'identity',
    question: 'How would you rate your overall stress level lately?',
    options: [
      { id: 'low', label: 'Low' },
      { id: 'moderate', label: 'Moderate' },
      { id: 'high', label: 'High' },
      { id: 'overwhelming', label: 'Overwhelming' },
    ],
  },
  {
    id: 'workImpact',
    arc: 'identity',
    question: 'Is this affecting your work or daily responsibilities?',
    options: [
      { id: 'not-at-all', label: 'Not at all' },
      { id: 'a-little', label: 'A little' },
      { id: 'moderately', label: 'Moderately' },
      { id: 'significantly', label: 'Significantly' },
    ],
  },
  {
    id: 'socialSupport',
    arc: 'identity',
    question: 'Do you have people in your life you can talk to about this?',
    options: [
      { id: 'several', label: 'Yes, several' },
      { id: 'one-or-two', label: 'Yes, one or two' },
      { id: 'not-really', label: 'Not really' },
      { id: 'prefer-not-to-say', label: 'Prefer not to say' },
    ],
  },
  {
    id: 'goal',
    arc: 'identity',
    question: 'What would you most like out of Unfurl right now?',
    options: [
      { id: 'feel-better', label: 'Feel physically better day to day' },
      { id: 'understand', label: "Understand what's happening to my body" },
      { id: 'routine', label: 'Build a routine I can stick with' },
      { id: 'community', label: 'Connect with others going through this' },
    ],
  },

  // ── Arc 2: Body & symptoms ──
  {
    id: 'ageRange',
    arc: 'body',
    question: "What's your age range?",
    options: [
      { id: 'under40', label: 'Under 40' },
      { id: '40-44', label: '40–44' },
      { id: '45-49', label: '45–49' },
      { id: '50-54', label: '50–54' },
      { id: '55-59', label: '55–59' },
      { id: '60plus', label: '60 or older' },
    ],
  },
  {
    id: 'stage',
    arc: 'body',
    question: 'Which best describes where you are?',
    options: [
      { id: 'peri', label: 'Perimenopause (periods becoming irregular)' },
      { id: 'menopause', label: 'Menopause (12+ months without a period)' },
      { id: 'post', label: 'Post-menopause' },
      { id: 'unsure', label: "Not sure" },
    ],
  },
  {
    id: 'cycleRegularity',
    arc: 'body',
    question: 'How regular are your periods currently?',
    options: [
      { id: 'regular', label: 'Still regular' },
      { id: 'somewhat-irregular', label: 'Somewhat irregular' },
      { id: 'very-irregular', label: 'Very irregular or unpredictable' },
      { id: 'none', label: 'No periods anymore' },
      { id: 'not-applicable', label: 'Not applicable to me' },
    ],
  },
  {
    id: 'symptomDuration',
    arc: 'body',
    question: 'How long have you been noticing symptoms?',
    options: [
      { id: 'under6mo', label: 'Less than 6 months' },
      { id: '6to12mo', label: '6–12 months' },
      { id: '1to3yr', label: '1–3 years' },
      { id: '3yrplus', label: '3+ years' },
      { id: 'unsure', label: "Not sure" },
    ],
  },
  {
    id: 'hotFlashes',
    arc: 'body',
    question: 'How often do you get hot flashes or night sweats?',
    options: [
      { id: 'none', label: "Rarely or never" },
      { id: 'weekly', label: 'A few times a week' },
      { id: 'daily', label: 'About once a day' },
      { id: 'multiple-daily', label: 'Multiple times a day' },
    ],
  },
  {
    id: 'sleep',
    arc: 'body',
    question: 'How would you describe your sleep lately?',
    options: [
      { id: 'good', label: 'Sleeping well' },
      { id: 'occasional', label: 'Occasional trouble falling or staying asleep' },
      { id: 'frequent', label: 'Frequent trouble' },
      { id: 'rare-good-night', label: 'Rarely get a good night' },
    ],
  },
  {
    id: 'mood',
    arc: 'body',
    question: "How's your mood been?",
    options: [
      { id: 'stable', label: 'Pretty stable' },
      { id: 'some-ups-downs', label: 'Some ups and downs' },
      { id: 'noticeable-swings', label: 'Noticeable mood swings' },
      { id: 'significant', label: 'Significant changes I want to understand' },
    ],
  },
  {
    id: 'focus',
    arc: 'body',
    question: 'How about focus and energy?',
    options: [
      { id: 'sharp', label: 'Sharp and steady' },
      { id: 'occasional-fog', label: 'Occasional brain fog' },
      { id: 'frequent-fog', label: 'Frequent brain fog' },
      { id: 'low-energy', label: 'Persistently low energy' },
    ],
  },
  {
    id: 'jointAches',
    arc: 'body',
    question: 'How often do you notice joint aches, stiffness, or muscle pain?',
    options: [
      { id: 'rarely', label: 'Rarely' },
      { id: 'occasionally', label: 'Occasionally' },
      { id: 'frequently', label: 'Frequently' },
      { id: 'daily', label: 'Nearly every day' },
    ],
  },
  {
    id: 'palpitations',
    arc: 'body',
    question: 'Do you ever notice heart palpitations or a racing heart without exercise?',
    options: [
      { id: 'never', label: 'Never' },
      { id: 'rarely', label: 'Rarely' },
      { id: 'sometimes', label: 'Sometimes' },
      { id: 'often', label: 'Often' },
    ],
  },
  {
    id: 'headaches',
    arc: 'body',
    question: 'Have you noticed new or worsened headaches?',
    options: [
      { id: 'no', label: 'No change' },
      { id: 'occasionally', label: 'Occasionally' },
      { id: 'frequently', label: 'Frequently' },
      { id: 'always-had', label: "I've always gotten these" },
    ],
  },
  {
    id: 'skinHairChanges',
    arc: 'body',
    question: 'Have you noticed changes in your skin or hair?',
    options: [
      { id: 'not-really', label: 'Not really' },
      { id: 'a-little', label: 'A little' },
      { id: 'noticeably', label: 'Noticeably' },
      { id: 'significantly', label: 'Significantly' },
    ],
  },
  {
    id: 'bladderChanges',
    arc: 'body',
    question: 'Any changes in bladder control or urinary urgency?',
    options: [
      { id: 'none', label: 'None' },
      { id: 'occasional', label: 'Occasional' },
      { id: 'frequent', label: 'Frequent' },
      { id: 'prefer-not-to-say', label: 'Prefer not to say' },
    ],
  },
  {
    id: 'breastTenderness',
    arc: 'body',
    question: 'Have you experienced breast tenderness or changes in breast tissue?',
    options: [
      { id: 'yes-noticeably', label: 'Yes, noticeably' },
      { id: 'a-little', label: 'A little' },
      { id: 'no', label: 'No' },
      { id: 'not-sure', label: 'Not sure' },
    ],
  },
  {
    id: 'symptomTriggers',
    arc: 'body',
    question: 'Do certain foods or drinks seem to trigger your symptoms (caffeine, alcohol, spicy food)?',
    options: [
      { id: 'yes-definitely', label: 'Yes, definitely' },
      { id: 'maybe', label: "Maybe, haven't tracked it" },
      { id: 'no', label: "No, doesn't seem to" },
      { id: 'havent-noticed', label: "Haven't paid attention" },
    ],
  },
  {
    id: 'familyHistory',
    arc: 'body',
    question: 'Do you know your family history of menopause age and experience?',
    options: [
      { id: 'yes-pretty-well', label: 'Yes, pretty well' },
      { id: 'vaguely', label: 'Vaguely' },
      { id: 'no-idea', label: 'No idea' },
      { id: 'never-asked', label: 'Never asked' },
    ],
  },
  {
    id: 'boneDensity',
    arc: 'body',
    question: 'Do you know your current bone density status, or when you last had it checked?',
    options: [
      { id: 'recently-checked', label: 'Checked recently' },
      { id: 'checked-a-while-ago', label: 'Checked a while ago' },
      { id: 'no-idea', label: 'No idea' },
      { id: 'never-checked', label: 'Never been checked' },
    ],
  },
  {
    id: 'recentBloodwork',
    arc: 'body',
    question: 'Have you had recent bloodwork done (thyroid, hormones, cholesterol) and understood the results?',
    options: [
      { id: 'yes-understood', label: 'Yes, and I understood it' },
      { id: 'yes-but-confused', label: 'Yes, but I found it confusing' },
      { id: 'not-recently', label: 'Not recently' },
      { id: 'never-had-it-done', label: 'Never had it done' },
    ],
  },
  {
    id: 'chronicConditions',
    arc: 'body',
    question: 'Do you have any chronic conditions (diabetes, thyroid, autoimmune) that might interact with this transition?',
    options: [
      { id: 'yes', label: 'Yes' },
      { id: 'possibly-undiagnosed', label: 'Possibly, undiagnosed' },
      { id: 'no', label: 'No' },
      { id: 'not-sure', label: 'Not sure' },
    ],
  },
  {
    id: 'currentSupport',
    arc: 'body',
    question: 'Are you currently taking anything for your symptoms?',
    options: [
      { id: 'nothing', label: 'Nothing right now' },
      { id: 'otc', label: 'Over-the-counter supplements' },
      { id: 'prescription', label: 'Prescription treatment / HRT' },
      { id: 'unsure', label: "Not sure" },
    ],
  },
  {
    id: 'hrtInterest',
    arc: 'body',
    question: 'Where are you with hormone therapy (HRT)?',
    options: [
      { id: 'currently-taking', label: "I'm currently taking it" },
      { id: 'considering', label: "I'm considering it" },
      { id: 'not-interested', label: "Not interested right now" },
      { id: 'unfamiliar', label: "Not sure what it is" },
    ],
  },
  {
    id: 'doctorConversation',
    arc: 'body',
    question: 'Have you talked to a doctor about this?',
    options: [
      { id: 'regularly', label: 'Yes, I check in regularly' },
      { id: 'once', label: 'Yes, once' },
      { id: 'not-yet', label: 'Not yet' },
      { id: 'planning', label: "Not yet, but I'm planning to" },
    ],
  },
  {
    id: 'doctorDismissed',
    arc: 'body',
    question: 'Have you ever felt dismissed or rushed when raising these symptoms with a doctor?',
    options: [
      { id: 'yes-more-than-once', label: 'Yes, more than once' },
      { id: 'once', label: 'Once' },
      { id: 'no-never', label: 'No, never' },
      { id: 'havent-brought-it-up', label: "Haven't brought it up yet" },
    ],
  },
  {
    id: 'confidentDistinguishing',
    arc: 'body',
    question: 'Do you feel confident telling the difference between menopause symptoms and something else that needs attention?',
    options: [
      { id: 'yes-confident', label: 'Yes, confident' },
      { id: 'somewhat', label: 'Somewhat' },
      { id: 'not-really', label: 'Not really' },
      { id: 'no-idea', label: 'No idea, honestly' },
    ],
  },

  // ── Arc 3: Movement ──
  {
    id: 'energyForActivity',
    arc: 'movement',
    question: 'How has your energy for physical activity changed in the last year?',
    options: [
      { id: 'about-the-same', label: 'About the same' },
      { id: 'a-bit-lower', label: 'A bit lower' },
      { id: 'significantly-lower', label: 'Significantly lower' },
      { id: 'actually-higher', label: 'Actually higher' },
    ],
  },
  {
    id: 'activity',
    arc: 'movement',
    question: 'How active are you day to day?',
    options: [
      { id: 'regular', label: 'Regularly active' },
      { id: 'sometimes', label: 'Sometimes active' },
      { id: 'rarely', label: 'Rarely active' },
      { id: 'not-active', label: 'Not very active right now' },
    ],
  },
  {
    id: 'strengthTrainingBarrier',
    arc: 'movement',
    question: 'Do you currently do any strength training?',
    options: [
      { id: 'yes-regularly', label: 'Yes, regularly' },
      { id: 'occasionally', label: 'Occasionally' },
      { id: 'no-but-want-to', label: "No, but I'd like to" },
      { id: 'not-interested', label: 'Not interested' },
    ],
  },
  {
    id: 'movementPreference',
    arc: 'movement',
    question: 'What kind of movement do you enjoy most?',
    options: [
      { id: 'walking-cardio', label: 'Walking or cardio' },
      { id: 'strength', label: 'Strength training' },
      { id: 'yoga-stretching', label: 'Yoga or stretching' },
      { id: 'none-right-now', label: 'None right now' },
    ],
  },
  {
    id: 'gymConfidence',
    arc: 'movement',
    question: 'Do you feel confident in a gym or fitness setting?',
    options: [
      { id: 'very-confident', label: 'Very confident' },
      { id: 'somewhat', label: 'Somewhat' },
      { id: 'not-very', label: 'Not very' },
      { id: 'avoid-it-entirely', label: 'I avoid it entirely' },
    ],
  },
  {
    id: 'hotFlashesExercise',
    arc: 'movement',
    question: 'Have hot flashes or overheating affected how or when you exercise?',
    options: [
      { id: 'yes-significantly', label: 'Yes, significantly' },
      { id: 'somewhat', label: 'Somewhat' },
      { id: 'not-really', label: 'Not really' },
      { id: 'no', label: 'No' },
    ],
  },
  {
    id: 'restRelationship',
    arc: 'movement',
    question: "What's your relationship with rest — do you feel guilty resting, or does it come easily?",
    options: [
      { id: 'guilty-resting', label: 'I feel guilty resting' },
      { id: 'bit-of-both', label: 'A bit of both' },
      { id: 'rest-easily', label: 'It comes easily' },
      { id: 'rarely-get-the-chance', label: 'I rarely get the chance' },
    ],
  },
  {
    id: 'modifiedActivities',
    arc: 'movement',
    question: 'Have you had to modify or give up activities you used to love because of how your body feels now?',
    options: [
      { id: 'yes-several', label: 'Yes, several' },
      { id: 'one-or-two', label: 'One or two' },
      { id: 'not-yet', label: 'Not yet' },
      { id: 'no', label: 'No' },
    ],
  },
  {
    id: 'pelvicFloor',
    arc: 'movement',
    question: 'Have you noticed pelvic floor changes that affect how you exercise or move?',
    options: [
      { id: 'yes-noticeably', label: 'Yes, noticeably' },
      { id: 'a-little', label: 'A little' },
      { id: 'not-noticed', label: "Haven't noticed" },
      { id: 'prefer-not-to-say', label: 'Prefer not to say' },
    ],
  },

  // ── Arc 4: Nutrition ──
  {
    id: 'appetiteChanges',
    arc: 'nutrition',
    question: 'Have you noticed changes in your appetite or hunger cues recently?',
    options: [
      { id: 'yes-noticeably', label: 'Yes, noticeably' },
      { id: 'a-little', label: 'A little' },
      { id: 'not-really', label: 'Not really' },
      { id: 'hard-to-tell', label: 'Hard to tell' },
    ],
  },
  {
    id: 'foodRelationship',
    arc: 'nutrition',
    question: 'Has your relationship with food changed as your body has changed?',
    options: [
      { id: 'yes-significantly', label: 'Yes, significantly' },
      { id: 'somewhat', label: 'Somewhat' },
      { id: 'not-really', label: 'Not really' },
      { id: 'complicated', label: "It's complicated" },
    ],
  },
  {
    id: 'bodyComposition',
    arc: 'nutrition',
    question: 'Have you noticed changes in your weight or body shape?',
    options: [
      { id: 'no-change', label: 'No real change' },
      { id: 'some-change', label: 'Some change' },
      { id: 'noticeable-change', label: 'Noticeable change' },
      { id: 'significant-change', label: 'Significant change' },
    ],
  },
  {
    id: 'emotionalEating',
    arc: 'nutrition',
    question: 'Do you eat in response to stress or emotion more than you used to?',
    options: [
      { id: 'yes-definitely', label: 'Yes, definitely' },
      { id: 'sometimes', label: 'Sometimes' },
      { id: 'not-really', label: 'Not really' },
      { id: 'hard-to-say', label: 'Hard to say' },
    ],
  },
  {
    id: 'alcoholRelationship',
    arc: 'nutrition',
    question: 'Has your relationship with alcohol shifted recently?',
    options: [
      { id: 'drinking-less', label: "I'm drinking less" },
      { id: 'drinking-more', label: "I'm drinking more" },
      { id: 'no-change', label: 'No change' },
      { id: 'not-applicable', label: "Doesn't apply to me" },
    ],
  },
  {
    id: 'cookingIntention',
    arc: 'nutrition',
    question: 'Do you cook for yourself with intention, or is food often an afterthought?',
    options: [
      { id: 'mostly-intentional', label: 'Mostly with intention' },
      { id: 'a-mix', label: 'A mix' },
      { id: 'mostly-afterthought', label: 'Mostly an afterthought' },
      { id: 'rarely-cook', label: 'I rarely cook for myself' },
    ],
  },
  {
    id: 'nourishConfidence',
    arc: 'nutrition',
    question: 'Do you feel equipped to nourish yourself through this transition, or are you mostly guessing?',
    options: [
      { id: 'feel-equipped', label: 'I feel equipped' },
      { id: 'somewhat', label: 'Somewhat' },
      { id: 'mostly-guessing', label: 'Mostly guessing' },
      { id: 'havent-thought-about-it', label: "Haven't thought about it" },
    ],
  },
  {
    id: 'priorityFix',
    arc: 'nutrition',
    question: 'If you could feel better in just one area right now, which would it be?',
    options: [
      { id: 'sleep', label: 'Sleep' },
      { id: 'hot-flashes', label: 'Hot flashes' },
      { id: 'mood', label: 'Mood' },
      { id: 'energy-focus', label: 'Energy & focus' },
    ],
  },
];
