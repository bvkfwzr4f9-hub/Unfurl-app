import { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { colors, spacing } from '@/theme';
import { ThemedText } from '@/components/ThemedText';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { ProgressBar } from '@/components/ProgressBar';
import { SelectOption } from '@/components/SelectOption';
import { TextField } from '@/components/TextField';
import { quizQuestions, getPathForAnswers } from '@/data/quizQuestions';
import { joinWaitlist } from '@/services/waitlist';

type Phase = 'question' | 'result' | 'success';

export function QuizFlowScreen() {
  const router = useRouter();
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [phase, setPhase] = useState<Phase>('question');
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const totalQuestions = quizQuestions.length;
  const currentQuestion = quizQuestions[questionIndex];
  const path = getPathForAnswers(answers);

  function handleSelect(optionId: string) {
    const nextAnswers = { ...answers, [currentQuestion.id]: optionId };
    setAnswers(nextAnswers);

    if (questionIndex + 1 < totalQuestions) {
      setQuestionIndex(questionIndex + 1);
    } else {
      setPhase('result');
    }
  }

  function handleBack() {
    if (phase === 'result') {
      setPhase('question');
      return;
    }
    if (questionIndex > 0) {
      setQuestionIndex(questionIndex - 1);
    } else {
      router.back();
    }
  }

  async function handleJoinWaitlist() {
    if (submitting) return;
    setError(null);
    setSubmitting(true);
    try {
      await joinWaitlist({ email, pathId: path.id, answers });
      setPhase('success');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Try again.');
    } finally {
      setSubmitting(false);
    }
  }

  if (phase === 'success') {
    return (
      <SafeAreaView style={styles.screen} edges={['top', 'bottom']}>
        <View style={styles.centeredContent}>
          <ThemedText variant="caption" color={colors.sageDark} style={styles.eyebrow}>
            YOU'RE ON THE LIST
          </ThemedText>
          <ThemedText variant="h1" style={styles.spaced}>
            {path.name} is saved for you.
          </ThemedText>
          <ThemedText variant="body" color={colors.inkMuted} style={styles.spaced}>
            We'll email you the moment it's ready. In the meantime, welcome —
            you're not doing this alone.
          </ThemedText>
          <Button
            label="Back to home"
            variant="secondary"
            onPress={() => router.replace('/')}
            style={styles.spaced}
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.screen} edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <Pressable onPress={handleBack} hitSlop={12} style={styles.backButton}>
            <ThemedText variant="bodySmall" color={colors.woodBrown}>
              ← Back
            </ThemedText>
          </Pressable>

          {phase === 'question' && (
            <>
              <ProgressBar progress={(questionIndex + 1) / totalQuestions} />
              <ThemedText variant="caption" color={colors.inkMuted} style={styles.stepLabel}>
                QUESTION {questionIndex + 1} OF {totalQuestions}
              </ThemedText>
              <ThemedText variant="h1" style={styles.question}>
                {currentQuestion.question}
              </ThemedText>
              <View>
                {currentQuestion.options.map((option) => (
                  <SelectOption
                    key={option.id}
                    label={option.label}
                    selected={answers[currentQuestion.id] === option.id}
                    onPress={() => handleSelect(option.id)}
                  />
                ))}
              </View>
            </>
          )}

          {phase === 'result' && (
            <>
              <ThemedText variant="caption" color={colors.sageDark} style={styles.eyebrow}>
                YOUR PATH
              </ThemedText>
              <ThemedText variant="display" style={styles.spaced}>
                {path.name}
              </ThemedText>
              <ThemedText variant="bodyLarge" color={colors.inkMuted} style={styles.spaced}>
                {path.description}
              </ThemedText>

              <Card variant="dark" style={styles.spaced}>
                <ThemedText variant="h3" color={colors.cream100} style={styles.cardTitle}>
                  Unlock your full path
                </ThemedText>
                <ThemedText variant="body" color={colors.creamMuted} style={styles.cardTitle}>
                  Join the waitlist and we'll email you the moment it's ready —
                  plus early access before public launch.
                </ThemedText>
                <TextField
                  value={email}
                  onChangeText={setEmail}
                  placeholder="you@example.com"
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="email-address"
                  textContentType="emailAddress"
                  hasError={!!error}
                  style={styles.emailField}
                />
                {error && (
                  <ThemedText variant="bodySmall" color={colors.error} style={styles.errorText}>
                    {error}
                  </ThemedText>
                )}
                <Button
                  label={submitting ? 'Joining…' : 'Join the waitlist'}
                  variant="primary"
                  fullWidth
                  disabled={submitting || email.trim().length === 0}
                  onPress={handleJoinWaitlist}
                />
              </Card>
            </>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.cream,
  },
  flex: {
    flex: 1,
  },
  content: {
    padding: spacing.xl,
    paddingBottom: spacing.huge,
  },
  centeredContent: {
    flex: 1,
    justifyContent: 'center',
    padding: spacing.xl,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: spacing.lg,
  },
  stepLabel: {
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  question: {
    marginBottom: spacing.xl,
  },
  eyebrow: {
    marginBottom: spacing.md,
  },
  spaced: {
    marginBottom: spacing.lg,
  },
  cardTitle: {
    marginBottom: spacing.md,
  },
  emailField: {
    marginBottom: spacing.md,
  },
  errorText: {
    marginBottom: spacing.md,
  },
});
