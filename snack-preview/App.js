import { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
} from 'react-native';

/**
 * Snack-only preview of the Unfurl teaser quiz + waitlist flow.
 *
 * This is a simplified stand-in for the real app (see app/quiz.tsx and
 * src/screens/QuizFlowScreen.tsx in the main repo) so it can run inside
 * Expo Snack, which doesn't support this project's Expo Router structure
 * or TypeScript path aliases. It uses system fonts instead of the real
 * Playfair Display / Inter pairing, and it fakes the waitlist submission
 * instead of writing to Firestore — everything else (copy, flow, colors,
 * quiz logic) matches the real thing.
 */

const colors = {
  forestDark: '#16241B',
  forestDeep: '#1E3226',
  cream: '#F1EBDD',
  creamLight: '#F8F4EB',
  cream100: '#FDFBF6',
  creamMuted: '#C9C2B0',
  sage: '#9FB98F',
  sageLight: '#C3D4B8',
  sageDark: '#6E8B60',
  woodBrown: '#6B5D4F',
  ink: '#1F2A20',
  inkMuted: '#4A5548',
  border: '#DCD3BE',
  error: '#B3543F',
};

const QUESTIONS = [
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

const PATH_BY_SYMPTOM = {
  heat: {
    name: 'The Cooling Path',
    description:
      'Practical, body-first tools for hot flashes and night sweats — so you can sleep, and feel like yourself, again.',
  },
  'sleep-mood': {
    name: 'The Steady Path',
    description:
      'Rhythms and rituals to steady your sleep and your mood, one night at a time.',
  },
  fog: {
    name: 'The Clarity Path',
    description:
      'Sharpen your focus and rebuild your energy with a plan built around how your body works now.',
  },
  body: {
    name: 'The Grounded Path',
    description:
      'A kinder, more informed relationship with your changing body — no fads, no shame.',
  },
  mix: {
    name: 'The Whole-Self Path',
    description:
      "A little bit of everything, because you're not one symptom — you're a whole person moving through a whole transition.",
  },
};

function getPath(answers) {
  return PATH_BY_SYMPTOM[answers.symptom] ?? PATH_BY_SYMPTOM.mix;
}

function Button({ label, onPress, variant = 'primary', disabled = false, style }) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.buttonBase,
        variant === 'primary' ? styles.buttonPrimary : styles.buttonSecondary,
        disabled && styles.buttonDisabled,
        style,
      ]}
    >
      <Text
        style={[
          styles.buttonLabel,
          { color: variant === 'primary' ? colors.cream100 : colors.forestDark },
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

function Option({ label, selected, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.option, selected && styles.optionSelected]}
    >
      <Text style={styles.optionLabel}>{label}</Text>
    </Pressable>
  );
}

export default function App() {
  const [screen, setScreen] = useState('landing');
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const totalQuestions = QUESTIONS.length;
  const currentQuestion = QUESTIONS[questionIndex];
  const path = getPath(answers);

  function selectOption(optionId) {
    const nextAnswers = { ...answers, [currentQuestion.id]: optionId };
    setAnswers(nextAnswers);
    if (questionIndex + 1 < totalQuestions) {
      setQuestionIndex(questionIndex + 1);
    } else {
      setScreen('result');
    }
  }

  function goBack() {
    if (screen === 'result') {
      setScreen('question');
      return;
    }
    if (questionIndex > 0) {
      setQuestionIndex(questionIndex - 1);
    } else {
      setScreen('landing');
    }
  }

  function submitEmail() {
    const trimmed = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError('Enter a valid email address.');
      return;
    }
    setError(null);
    setSubmitting(true);
    // Snack preview only: no real network call. The real app writes this
    // to Firestore — see src/services/waitlist.ts in the main repo.
    setTimeout(() => {
      setSubmitting(false);
      setScreen('success');
    }, 600);
  }

  if (screen === 'landing') {
    return (
      <SafeAreaView style={styles.screen}>
        <View style={styles.landingContent}>
          <View>
            <Text style={styles.eyebrow}>FOR THE NEXT CHAPTER</Text>
            <Text style={styles.display}>Menopause, without the guesswork.</Text>
            <Text style={styles.subhead}>
              Take our 60-second quiz to find your personalized path — then
              join the waitlist to be the first to unlock it.
            </Text>
          </View>
          <View>
            <Button
              label="Take the 60-second quiz"
              onPress={() => setScreen('question')}
            />
            <Text style={styles.disclaimer}>
              No medical advice, no diagnoses — just a clearer place to start.
            </Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  if (screen === 'success') {
    return (
      <SafeAreaView style={styles.screen}>
        <View style={styles.centered}>
          <Text style={styles.eyebrow}>YOU'RE ON THE LIST</Text>
          <Text style={[styles.h1, styles.spaced]}>{path.name} is saved for you.</Text>
          <Text style={[styles.body, styles.spaced, { color: colors.inkMuted }]}>
            We'll email you the moment it's ready. In the meantime, welcome —
            you're not doing this alone.
          </Text>
          <Button
            label="Back to home"
            variant="secondary"
            onPress={() => {
              setScreen('landing');
              setQuestionIndex(0);
              setAnswers({});
              setEmail('');
            }}
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Pressable onPress={goBack} style={styles.backButton}>
          <Text style={styles.backLabel}>← Back</Text>
        </Pressable>

        {screen === 'question' && (
          <>
            <View style={styles.progressTrack}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${((questionIndex + 1) / totalQuestions) * 100}%` },
                ]}
              />
            </View>
            <Text style={styles.stepLabel}>
              QUESTION {questionIndex + 1} OF {totalQuestions}
            </Text>
            <Text style={[styles.h1, styles.question]}>{currentQuestion.question}</Text>
            <View>
              {currentQuestion.options.map((option) => (
                <Option
                  key={option.id}
                  label={option.label}
                  selected={answers[currentQuestion.id] === option.id}
                  onPress={() => selectOption(option.id)}
                />
              ))}
            </View>
          </>
        )}

        {screen === 'result' && (
          <>
            <Text style={styles.eyebrow}>YOUR PATH</Text>
            <Text style={[styles.display, styles.spaced]}>{path.name}</Text>
            <Text style={[styles.bodyLarge, styles.spaced, { color: colors.inkMuted }]}>
              {path.description}
            </Text>

            <View style={styles.darkCard}>
              <Text style={[styles.h3, styles.cardSpaced, { color: colors.cream100 }]}>
                Unlock your full path
              </Text>
              <Text style={[styles.body, styles.cardSpaced, { color: colors.creamMuted }]}>
                Join the waitlist and we'll email you the moment it's ready —
                plus early access before public launch.
              </Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="you@example.com"
                placeholderTextColor={colors.inkMuted}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                style={[styles.input, error && styles.inputError]}
              />
              {error && <Text style={styles.errorText}>{error}</Text>}
              <Button
                label={submitting ? 'Joining…' : 'Join the waitlist'}
                disabled={submitting || email.trim().length === 0}
                onPress={submitEmail}
              />
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.cream,
  },
  landingContent: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 24,
    paddingTop: 64,
    paddingBottom: 32,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  content: {
    padding: 24,
    paddingBottom: 64,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  backLabel: {
    fontSize: 13,
    color: colors.woodBrown,
  },
  eyebrow: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.4,
    color: colors.sageDark,
    marginBottom: 12,
  },
  display: {
    fontSize: 34,
    fontWeight: '700',
    lineHeight: 40,
    color: colors.ink,
    marginBottom: 16,
  },
  h1: {
    fontSize: 26,
    fontWeight: '700',
    lineHeight: 32,
    color: colors.ink,
  },
  h3: {
    fontSize: 17,
    fontWeight: '600',
    color: colors.ink,
  },
  subhead: {
    fontSize: 17,
    lineHeight: 25,
    color: colors.inkMuted,
    marginBottom: 16,
  },
  bodyLarge: {
    fontSize: 17,
    lineHeight: 25,
    color: colors.ink,
  },
  body: {
    fontSize: 15,
    lineHeight: 22,
    color: colors.ink,
  },
  disclaimer: {
    fontSize: 13,
    color: colors.inkMuted,
    textAlign: 'center',
    marginTop: 12,
  },
  spaced: {
    marginBottom: 16,
  },
  cardSpaced: {
    marginBottom: 12,
  },
  stepLabel: {
    fontSize: 12,
    fontWeight: '500',
    letterSpacing: 0.4,
    color: colors.inkMuted,
    marginTop: 16,
    marginBottom: 8,
  },
  question: {
    marginBottom: 24,
  },
  progressTrack: {
    height: 6,
    borderRadius: 999,
    backgroundColor: colors.border,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 999,
    backgroundColor: colors.sageDark,
  },
  option: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.creamLight,
    marginBottom: 12,
  },
  optionSelected: {
    borderColor: colors.sageDark,
    backgroundColor: colors.sageLight,
  },
  optionLabel: {
    fontSize: 17,
    color: colors.ink,
  },
  darkCard: {
    backgroundColor: colors.forestDeep,
    borderRadius: 20,
    padding: 24,
  },
  input: {
    fontSize: 17,
    color: colors.ink,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.creamLight,
    marginBottom: 12,
  },
  inputError: {
    borderColor: colors.error,
  },
  errorText: {
    fontSize: 13,
    color: colors.error,
    marginBottom: 12,
  },
  buttonBase: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonPrimary: {
    backgroundColor: colors.forestDark,
  },
  buttonSecondary: {
    backgroundColor: colors.creamLight,
    borderWidth: 1,
    borderColor: colors.border,
  },
  buttonDisabled: {
    opacity: 0.4,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
});
