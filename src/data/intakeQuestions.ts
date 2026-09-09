/**
 * Deep-intake questionnaire, taken once after sign-up. Longer and more
 * specific than the teaser quiz (src/data/quizQuestions.ts) — answers are
 * saved to the user's profile and used to tailor which content library
 * sections get surfaced first. Still not diagnostic.
 */

export interface IntakeOption {
  id: string;
  label: string;
}

export interface IntakeQuestion {
  id: string;
  question: string;
  options: IntakeOption[];
}

export const intakeQuestions: IntakeQuestion[] = [
  {
    id: 'ageRange',
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
    question: 'Which best describes where you are?',
    options: [
      { id: 'peri', label: 'Perimenopause (periods becoming irregular)' },
      { id: 'menopause', label: 'Menopause (12+ months without a period)' },
      { id: 'post', label: 'Post-menopause' },
      { id: 'unsure', label: "Not sure" },
    ],
  },
  {
    id: 'symptomDuration',
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
    question: 'How about focus and energy?',
    options: [
      { id: 'sharp', label: 'Sharp and steady' },
      { id: 'occasional-fog', label: 'Occasional brain fog' },
      { id: 'frequent-fog', label: 'Frequent brain fog' },
      { id: 'low-energy', label: 'Persistently low energy' },
    ],
  },
  {
    id: 'activity',
    question: 'How active are you day to day?',
    options: [
      { id: 'regular', label: 'Regularly active' },
      { id: 'sometimes', label: 'Sometimes active' },
      { id: 'rarely', label: 'Rarely active' },
      { id: 'not-active', label: 'Not very active right now' },
    ],
  },
  {
    id: 'currentSupport',
    question: 'Are you currently taking anything for your symptoms?',
    options: [
      { id: 'nothing', label: 'Nothing right now' },
      { id: 'otc', label: 'Over-the-counter supplements' },
      { id: 'prescription', label: 'Prescription treatment / HRT' },
      { id: 'unsure', label: "Not sure" },
    ],
  },
  {
    id: 'doctorConversation',
    question: 'Have you talked to a doctor about this?',
    options: [
      { id: 'regularly', label: 'Yes, I check in regularly' },
      { id: 'once', label: 'Yes, once' },
      { id: 'not-yet', label: 'Not yet' },
      { id: 'planning', label: "Not yet, but I'm planning to" },
    ],
  },
  {
    id: 'goal',
    question: 'What would you most like out of Unfurl right now?',
    options: [
      { id: 'feel-better', label: 'Feel physically better day to day' },
      { id: 'understand', label: "Understand what's happening to my body" },
      { id: 'routine', label: 'Build a routine I can stick with' },
      { id: 'community', label: 'Connect with others going through this' },
    ],
  },
  {
    id: 'hrtInterest',
    question: 'Where are you with hormone therapy (HRT)?',
    options: [
      { id: 'currently-taking', label: "I'm currently taking it" },
      { id: 'considering', label: "I'm considering it" },
      { id: 'not-interested', label: "Not interested right now" },
      { id: 'unfamiliar', label: "Not sure what it is" },
    ],
  },
  {
    id: 'bodyRelationship',
    question: 'How would you describe your relationship with your changing body right now?',
    options: [
      { id: 'curious', label: 'Curious and open to it' },
      { id: 'frustrated', label: 'Frustrated' },
      { id: 'grieving', label: "Grieving what's changing" },
      { id: 'figuring-out', label: 'Still figuring it out' },
    ],
  },
  {
    id: 'cycleRegularity',
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
    id: 'jointAches',
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
    question: 'Have you noticed changes in your skin or hair?',
    options: [
      { id: 'not-really', label: 'Not really' },
      { id: 'a-little', label: 'A little' },
      { id: 'noticeably', label: 'Noticeably' },
      { id: 'significantly', label: 'Significantly' },
    ],
  },
  {
    id: 'bodyComposition',
    question: 'Have you noticed changes in your weight or body shape?',
    options: [
      { id: 'no-change', label: 'No real change' },
      { id: 'some-change', label: 'Some change' },
      { id: 'noticeable-change', label: 'Noticeable change' },
      { id: 'significant-change', label: 'Significant change' },
    ],
  },
  {
    id: 'bladderChanges',
    question: 'Any changes in bladder control or urinary urgency?',
    options: [
      { id: 'none', label: 'None' },
      { id: 'occasional', label: 'Occasional' },
      { id: 'frequent', label: 'Frequent' },
      { id: 'prefer-not-to-say', label: 'Prefer not to say' },
    ],
  },
  {
    id: 'symptomTriggers',
    question: 'Do certain foods or drinks seem to trigger your symptoms (caffeine, alcohol, spicy food)?',
    options: [
      { id: 'yes-definitely', label: 'Yes, definitely' },
      { id: 'maybe', label: "Maybe, haven't tracked it" },
      { id: 'no', label: "No, doesn't seem to" },
      { id: 'havent-noticed', label: "Haven't paid attention" },
    ],
  },
  {
    id: 'stressLevel',
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
    question: 'Do you have people in your life you can talk to about this?',
    options: [
      { id: 'several', label: 'Yes, several' },
      { id: 'one-or-two', label: 'Yes, one or two' },
      { id: 'not-really', label: 'Not really' },
      { id: 'prefer-not-to-say', label: 'Prefer not to say' },
    ],
  },
  {
    id: 'movementPreference',
    question: 'What kind of movement do you enjoy most?',
    options: [
      { id: 'walking-cardio', label: 'Walking or cardio' },
      { id: 'strength', label: 'Strength training' },
      { id: 'yoga-stretching', label: 'Yoga or stretching' },
      { id: 'none-right-now', label: 'None right now' },
    ],
  },
  {
    id: 'priorityFix',
    question: 'If you could feel better in just one area right now, which would it be?',
    options: [
      { id: 'sleep', label: 'Sleep' },
      { id: 'hot-flashes', label: 'Hot flashes' },
      { id: 'mood', label: 'Mood' },
      { id: 'energy-focus', label: 'Energy & focus' },
    ],
  },
];
