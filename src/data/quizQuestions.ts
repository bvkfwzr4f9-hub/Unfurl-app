/**
 * Teaser quiz content.
 * Short, low-commitment questions (~60 seconds) that lead into a
 * personalized-sounding "path" result, which is the hook for waitlist
 * email capture. Not diagnostic, not medical — just enough signal to
 * make the result feel tailored.
 */

export interface QuizOption {
  id: string;
  label: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'stage',
    question: 'Where are you in your journey?',
    options: [
      { id: 'noticing', label: 'Just starting to notice changes' },
      { id: 'thick-of-it', label: "I'm in the thick of it" },
      { id: 'post', label: 'Post-menopause, still figuring it out' },
      { id: 'supporting', label: 'Supporting or curious for someone else' },
    ],
  },
  {
    id: 'symptom',
    question: "What's showing up most for you lately?",
    options: [
      { id: 'heat', label: 'Hot flashes & night sweats' },
      { id: 'sleep-mood', label: 'Sleep & mood swings' },
      { id: 'fog', label: 'Brain fog & low energy' },
      { id: 'body', label: 'Weight & body changes' },
      { id: 'mix', label: 'Honestly, a mix of everything' },
    ],
  },
  {
    id: 'support',
    question: 'How are you navigating it right now?',
    options: [
      { id: 'alone', label: 'Winging it on my own' },
      { id: 'doctor', label: 'Talking to my doctor, want more' },
      { id: 'tried', label: "I've tried things, nothing's stuck" },
      { id: 'havent', label: "Haven't started looking yet" },
    ],
  },
  {
    id: 'need',
    question: 'What would help you most right now?',
    options: [
      { id: 'understand', label: "Understanding what's actually happening" },
      { id: 'plan', label: 'A plan I can actually follow' },
      { id: 'community', label: 'Community — people who get it' },
      { id: 'all', label: 'Honestly, all of the above' },
    ],
  },
];

export interface QuizPath {
  id: string;
  name: string;
  description: string;
}

const PATH_BY_SYMPTOM: Record<string, QuizPath> = {
  heat: {
    id: 'cooling',
    name: 'The Cooling Path',
    description:
      'Practical, body-first tools for hot flashes and night sweats — so you can sleep, and feel like yourself, again.',
  },
  'sleep-mood': {
    id: 'steady',
    name: 'The Steady Path',
    description:
      'Rhythms and rituals to steady your sleep and your mood, one night at a time.',
  },
  fog: {
    id: 'clarity',
    name: 'The Clarity Path',
    description:
      'Sharpen your focus and rebuild your energy with a plan built around how your body works now.',
  },
  body: {
    id: 'grounded',
    name: 'The Grounded Path',
    description:
      'A kinder, more informed relationship with your changing body — no fads, no shame.',
  },
  mix: {
    id: 'whole-self',
    name: 'The Whole-Self Path',
    description:
      "A little bit of everything, because you're not one symptom — you're a whole person moving through a whole transition.",
  },
};

const DEFAULT_PATH = PATH_BY_SYMPTOM.mix;

/** Picks a "personalized" path from the symptom answer. Falls back to the mix path. */
export function getPathForAnswers(answers: Record<string, string>): QuizPath {
  return PATH_BY_SYMPTOM[answers.symptom] ?? DEFAULT_PATH;
}
