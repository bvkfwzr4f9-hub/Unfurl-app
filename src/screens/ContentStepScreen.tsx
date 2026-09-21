import { useState } from 'react';
import { ScrollView, View, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useVideoPlayer, VideoView } from 'expo-video';
import { colors, spacing, radius } from '@/theme';
import { ThemedText } from '@/components/ThemedText';
import { Button } from '@/components/Button';
import { PremiumLock } from '@/components/PremiumLock';
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
      <SafeAreaView style={styles.screen} edges={['top', 'bottom']}>
        <View style={styles.content}>
          <ThemedText variant="h2">Step not found.</ThemedText>
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
    <SafeAreaView style={styles.screen} edges={['top', 'bottom']}>
      <ScrollView contentContainerStyle={styles.content}>
        <Pressable onPress={() => router.back()} hitSlop={12} style={styles.backButton}>
          <ThemedText variant="bodySmall" color={colors.woodBrown}>
            ← Back
          </ThemedText>
        </Pressable>

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
            <ThemedText variant="caption" color={colors.woodBrown} style={styles.stepLabel}>
              {step.type.toUpperCase()} · STEP {stepIndex + 1} OF {section.steps.length}
            </ThemedText>
            <ThemedText variant="display" style={styles.title}>
              {step.title}
            </ThemedText>

            {step.type === 'video' && !step.videoId && (
              <View style={styles.videoComingSoon}>
                <ThemedText variant="bodySmall" color={colors.creamMuted}>
                  Video coming soon — here's the short version:
                </ThemedText>
              </View>
            )}
            {step.videoId && <StreamVideoPlayer videoId={step.videoId} />}

            {step.body.map((paragraph, index) => (
              <ThemedText key={index} variant="bodyLarge" color={colors.ink} style={styles.paragraph}>
                {paragraph}
              </ThemedText>
            ))}

            <View style={styles.disclaimer}>
              <ThemedText variant="bodySmall" color={colors.inkMuted}>
                General information only, not medical advice. If something
                here concerns you, it's worth bringing to a doctor.
              </ThemedText>
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
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: spacing.lg,
  },
  stepLabel: {
    marginBottom: spacing.sm,
  },
  title: {
    marginBottom: spacing.lg,
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
    marginBottom: spacing.xl,
  },
  completeButton: {
    marginBottom: spacing.xl,
  },
});
