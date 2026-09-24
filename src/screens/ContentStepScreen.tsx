import { useState } from 'react';
import { ScrollView, View, ImageBackground, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useVideoPlayer, VideoView } from 'expo-video';
import { colors, spacing, radius } from '@/theme';
import { ThemedText } from '@/components/ThemedText';
import { Button } from '@/components/Button';
import { PremiumLock } from '@/components/PremiumLock';
import { BrandArcs } from '@/components/BrandArcs';
import {
  getContentSection,
  isStepCompleted,
  isStepUnlocked,
  isSectionComplete,
  stepCompletionId,
} from '@/data/contentLibrary';
import { getStreamPlaybackUrl } from '@/services/cloudflareStream';
import { useAuth } from '@/services/useAuth';
import { useUserProfile } from '@/services/useUserProfile';
import { setStepCompletion } from '@/services/subscription';
import { awardPoints, POINTS } from '@/services/gamification';

const STEP_TYPE_EMOJI: Record<string, string> = {
  article: '📖',
  video: '🎥',
  practice: '🌱',
};

function StreamVideoPlayer({ videoId }: { videoId: string }) {
  const player = useVideoPlayer(getStreamPlaybackUrl(videoId), (instance) => {
    instance.loop = false;
  });

  return <VideoView player={player} style={styles.video} nativeControls />;
}

export function ContentStepScreen() {
  const router = useRouter();
  const { slug, stepId } = useLocalSearchParams<{ slug: string; stepId: string }>();
  const { user } = useAuth();
  const profile = useUserProfile(user?.uid);
  const [saving, setSaving] = useState(false);

  const section = getContentSection(typeof slug === 'string' ? slug : '');
  const stepIndex = section?.steps.findIndex((s) => s.id === stepId) ?? -1;
  const step = stepIndex >= 0 ? section?.steps[stepIndex] : undefined;

  if (!section || !step) {
    return (
      <SafeAreaView style={styles.notFoundScreen} edges={['top', 'bottom']}>
        <View style={styles.content}>
          <ThemedText variant="h2" color={colors.cream100}>
            Step not found.
          </ThemedText>
        </View>
      </SafeAreaView>
    );
  }

  const completedSteps = profile?.completedSteps ?? [];
  const isPremiumLocked = section.isPremium && profile?.subscriptionStatus !== 'active';
  const isSequenceLocked = !isStepUnlocked(section, stepIndex, completedSteps);
  const isDone = isStepCompleted(completedSteps, section.slug, step.id);
  const nextStep = section.steps[stepIndex + 1];

  async function handleComplete() {
    if (!user || !section || !step || saving || isDone) return;
    setSaving(true);
    const wasComplete = isSectionComplete(section, completedSteps);
    const compositeId = stepCompletionId(section.slug, step.id);
    await setStepCompletion(user.uid, compositeId, true);
    await awardPoints(user.uid, POINTS.completeStep);
    const nowComplete = isSectionComplete(section, [...completedSteps, compositeId]);
    if (!wasComplete && nowComplete) {
      await awardPoints(user.uid, POINTS.completeSectionBonus);
    }
    setSaving(false);
    if (nextStep) {
      router.replace(`/library/${section.slug}/${nextStep.id}`);
    } else {
      router.replace(`/library/${section.slug}`);
    }
  }

  return (
    <ImageBackground
      source={require('../../assets/images/brand/wood-grain-dark.jpg')}
      style={styles.background}
    >
      <LinearGradient
        colors={['rgba(22, 36, 27, 0.6)', 'rgba(22, 36, 27, 0.85)', 'rgba(15, 24, 18, 0.95)']}
        locations={[0, 0.3, 1]}
        style={StyleSheet.absoluteFill}
      />
      <BrandArcs size={170} style={styles.headerArcs} />
      <SafeAreaView style={styles.screen} edges={['top', 'bottom']}>
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.navRow}>
            <Pressable onPress={() => router.back()} hitSlop={12}>
              <ThemedText variant="bodySmall" color={colors.sage}>
                ← Back
              </ThemedText>
            </Pressable>
            <Pressable onPress={() => router.replace('/home')} hitSlop={12}>
              <ThemedText variant="bodySmall" color={colors.sage}>
                Home
              </ThemedText>
            </Pressable>
          </View>

          {isPremiumLocked || isSequenceLocked ? (
            <PremiumLock
              title={isPremiumLocked ? 'Members only' : 'Complete the previous step first'}
              message={
                isPremiumLocked
                  ? 'Upgrade to unlock this section.'
                  : 'This section unlocks one step at a time — head back and finish the step before this one.'
              }
              ctaLabel={isPremiumLocked ? 'See membership options' : 'Back to section'}
              onPress={() =>
                isPremiumLocked ? router.push('/paywall') : router.replace(`/library/${section.slug}`)
              }
            />
          ) : (
            <>
              <View style={styles.dotStepper}>
                {section.steps.map((s, index) => {
                  const dotDone = isStepCompleted(completedSteps, section.slug, s.id);
                  const isCurrent = index === stepIndex;
                  return (
                    <View
                      key={s.id}
                      style={[
                        styles.dot,
                        dotDone && styles.dotDone,
                        isCurrent && !dotDone && styles.dotCurrent,
                      ]}
                    />
                  );
                })}
              </View>

              <ThemedText variant="caption" color={colors.sage} style={styles.stepLabel}>
                {STEP_TYPE_EMOJI[step.type]} {step.type.toUpperCase()} · STEP {stepIndex + 1} OF{' '}
                {section.steps.length}
              </ThemedText>
              <ThemedText variant="display" color={colors.cream100} style={styles.title}>
                {step.title}
              </ThemedText>

              <View style={styles.readingPanel}>
                {step.type === 'video' && !step.videoId && (
                  <View style={styles.videoComingSoon}>
                    <ThemedText variant="bodySmall" color={colors.creamMuted}>
                      Video coming soon — here's the short version:
                    </ThemedText>
                  </View>
                )}
                {step.videoId && <StreamVideoPlayer videoId={step.videoId} />}

                {step.body.map((paragraph, index) => (
                  <ThemedText
                    key={index}
                    variant="bodyLarge"
                    color={colors.creamMuted}
                    style={styles.paragraph}
                  >
                    {paragraph}
                  </ThemedText>
                ))}

                <View style={styles.disclaimer}>
                  <ThemedText variant="bodySmall" color={colors.creamMuted}>
                    General information only, not medical advice. If
                    something here concerns you, it's worth bringing to a
                    doctor.
                  </ThemedText>
                </View>
              </View>

              <Button
                label={
                  isDone
                    ? nextStep
                      ? 'Continue'
                      : 'Back to section'
                    : saving
                      ? 'Saving…'
                      : `Mark complete (+${POINTS.completeStep} pts)`
                }
                variant="primary"
                fullWidth
                disabled={saving}
                onPress={
                  isDone
                    ? () =>
                        nextStep
                          ? router.replace(`/library/${section.slug}/${nextStep.id}`)
                          : router.replace(`/library/${section.slug}`)
                    : handleComplete
                }
                style={styles.completeButton}
              />
            </>
          )}
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: colors.forestDark,
  },
  notFoundScreen: {
    flex: 1,
    backgroundColor: colors.forestDark,
  },
  headerArcs: {
    top: -40,
    right: -40,
  },
  screen: {
    flex: 1,
  },
  content: {
    padding: spacing.xl,
    paddingBottom: spacing.huge,
  },
  navRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  dotStepper: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(253, 251, 246, 0.2)',
  },
  dotDone: {
    backgroundColor: colors.sage,
  },
  dotCurrent: {
    backgroundColor: 'rgba(159, 185, 143, 0.6)',
    width: 20,
  },
  stepLabel: {
    marginBottom: spacing.sm,
  },
  title: {
    marginBottom: spacing.lg,
  },
  readingPanel: {
    backgroundColor: 'rgba(15, 24, 18, 0.55)',
    borderWidth: 1,
    borderColor: 'rgba(253, 251, 246, 0.1)',
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.xl,
  },
  paragraph: {
    marginBottom: spacing.lg,
  },
  video: {
    width: '100%',
    height: 220,
    borderRadius: radius.lg,
    marginBottom: spacing.lg,
    backgroundColor: colors.forestDark,
  },
  videoComingSoon: {
    backgroundColor: colors.forestDeep,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  disclaimer: {
    marginTop: spacing.sm,
  },
  completeButton: {
    marginBottom: spacing.xl,
  },
});
