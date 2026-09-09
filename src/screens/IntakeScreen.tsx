import { useState } from 'react';
import { View, ScrollView, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { colors, spacing } from '@/theme';
import { ThemedText } from '@/components/ThemedText';
import { Button } from '@/components/Button';
import { ProgressBar } from '@/components/ProgressBar';
import { SelectOption } from '@/components/SelectOption';
import { intakeQuestions, ARC_LABELS, type IntakeArc } from '@/data/intakeQuestions';
import { saveIntakeResponses } from '@/services/intake';
import { useRequireAuth } from '@/services/useRequireAuth';

export function IntakeScreen() {
  const router = useRouter();
  const { user, initializing } = useRequireAuth();
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [done, setDone] = useState(false);

  const totalQuestions = intakeQuestions.length;
  const currentQuestion = intakeQuestions[questionIndex];
  const arcOrder: IntakeArc[] = ['identity', 'body', 'movement', 'nutrition'];
  const arcNumber = arcOrder.indexOf(currentQuestion.arc) + 1;

  async function selectOption(optionId: string) {
    const nextAnswers = { ...answers, [currentQuestion.id]: optionId };
    setAnswers(nextAnswers);

    if (questionIndex + 1 < totalQuestions) {
      setQuestionIndex(questionIndex + 1);
      return;
    }

    if (!user) return;
    setSaving(true);
    await saveIntakeResponses(user.uid, nextAnswers);
    setSaving(false);
    setDone(true);
  }

  function goBack() {
    if (questionIndex > 0) {
      setQuestionIndex(questionIndex - 1);
    } else {
      router.back();
    }
  }

  if (initializing || !user) {
    return <View style={styles.screen} />;
  }

  if (done) {
    return (
      <SafeAreaView style={styles.screen} edges={['top', 'bottom']}>
        <View style={styles.centeredContent}>
          <ThemedText variant="caption" color={colors.sageDark} style={styles.eyebrow}>
            ALL SET
          </ThemedText>
          <ThemedText variant="h1" style={styles.spaced}>
            Thanks for sharing that.
          </ThemedText>
          <ThemedText variant="body" color={colors.inkMuted} style={styles.spaced}>
            We'll use this to point you toward the sections that matter most
            for you first.
          </ThemedText>
          <Button label="Go to your home" variant="primary" onPress={() => router.replace('/home')} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.screen} edges={['top', 'bottom']}>
      <ScrollView contentContainerStyle={styles.content}>
        <Pressable onPress={goBack} hitSlop={12} style={styles.backButton}>
          <ThemedText variant="bodySmall" color={colors.woodBrown}>
            ← Back
          </ThemedText>
        </Pressable>

        <ProgressBar progress={(questionIndex + 1) / totalQuestions} />
        <ThemedText variant="caption" color={colors.sageDark} style={styles.arcLabel}>
          PART {arcNumber} OF {arcOrder.length} · {ARC_LABELS[currentQuestion.arc].toUpperCase()}
        </ThemedText>
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
              onPress={() => selectOption(option.id)}
            />
          ))}
        </View>
        {saving && (
          <ThemedText variant="bodySmall" color={colors.inkMuted}>
            Saving…
          </ThemedText>
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
  arcLabel: {
    marginTop: spacing.lg,
  },
  stepLabel: {
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
});
