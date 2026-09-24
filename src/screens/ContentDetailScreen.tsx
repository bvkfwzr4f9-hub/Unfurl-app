import { ScrollView, View, ImageBackground, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { colors, spacing, radius } from '@/theme';
import { ThemedText } from '@/components/ThemedText';
import { Button } from '@/components/Button';
import { PremiumLock } from '@/components/PremiumLock';
import { BrandArcs } from '@/components/BrandArcs';
import { getContentSection, isStepCompleted, isStepUnlocked } from '@/data/contentLibrary';
import { useAuth } from '@/services/useAuth';
import { useUserProfile } from '@/services/useUserProfile';

const STEP_TYPE_LABEL: Record<string, string> = {
  article: 'ARTICLE',
  video: 'VIDEO',
  practice: 'PRACTICE',
};

const STEP_TYPE_EMOJI: Record<string, string> = {
  article: '📖',
  video: '🎥',
  practice: '🌱',
};

export function ContentDetailScreen() {
  const router = useRouter();
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const { user } = useAuth();
  const profile = useUserProfile(user?.uid);

  const section = getContentSection(typeof slug === 'string' ? slug : '');

  if (!section) {
    return (
      <SafeAreaView style={styles.notFoundScreen} edges={['top', 'bottom']}>
        <View style={styles.content}>
          <ThemedText variant="h2" color={colors.cream100}>
            Section not found.
          </ThemedText>
        </View>
      </SafeAreaView>
    );
  }

  const isLocked = section.isPremium && profile?.subscriptionStatus !== 'active';
  const completedSteps = profile?.completedSteps ?? [];
  const nextUpIndex = section.steps.findIndex(
    (step, index) =>
      isStepUnlocked(section, index, completedSteps) &&
      !isStepCompleted(completedSteps, section.slug, step.id)
  );

  return (
    <ImageBackground
      source={require('../../assets/images/brand/wood-grain-dark.jpg')}
      style={styles.background}
    >
      <LinearGradient
        colors={['rgba(22, 36, 27, 0.55)', 'rgba(22, 36, 27, 0.8)', 'rgba(15, 24, 18, 0.92)']}
        locations={[0, 0.35, 1]}
        style={StyleSheet.absoluteFill}
      />
      <BrandArcs size={190} style={styles.headerArcs} />
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

          <View style={styles.iconBubble}>
            <ThemedText style={styles.iconEmoji}>{section.emoji}</ThemedText>
          </View>

          {section.isPremium && (
            <ThemedText variant="caption" color={colors.woodLight} style={styles.premiumLabel}>
              MEMBERS
            </ThemedText>
          )}
          <ThemedText variant="display" color={colors.cream100} style={styles.title}>
            {section.title}
          </ThemedText>

          <ThemedText variant="bodyLarge" color={colors.creamMuted} style={styles.paragraph}>
            {section.teaser}
          </ThemedText>

          {isLocked ? (
            <PremiumLock
              message={
                user
                  ? 'Upgrade to unlock this section, along with the rest of the membership library.'
                  : 'Sign in and upgrade to unlock this section, along with the rest of the membership library.'
              }
              ctaLabel={user ? 'See membership options' : 'Sign in'}
              onPress={() => router.push(user ? '/paywall' : '/auth')}
            />
          ) : (
            <>
              <ThemedText variant="caption" color={colors.sage} style={styles.stepsLabel}>
                STEPS
              </ThemedText>
              {section.steps.map((step, index) => {
                const done = isStepCompleted(completedSteps, section.slug, step.id);
                const unlocked = isStepUnlocked(section, index, completedSteps);
                const isNextUp = index === nextUpIndex;
                return (
                  <Pressable
                    key={step.id}
                    disabled={!unlocked}
                    onPress={() => router.push(`/library/${section.slug}/${step.id}`)}
                    style={({ pressed }) => [
                      styles.stepRow,
                      isNextUp && styles.stepRowNextUp,
                      !unlocked && styles.stepRowLocked,
                      pressed && unlocked && styles.stepRowPressed,
                    ]}
                  >
                    <View
                      style={[
                        styles.stepIconCircle,
                        done && styles.stepIconCircleDone,
                        isNextUp && styles.stepIconCircleNextUp,
                      ]}
                    >
                      <ThemedText style={styles.stepIconEmoji}>
                        {done ? '✓' : unlocked ? STEP_TYPE_EMOJI[step.type] : '🔒'}
                      </ThemedText>
                    </View>
                    <View style={styles.stepText}>
                      <ThemedText variant="caption" color={colors.sage}>
                        {STEP_TYPE_LABEL[step.type]}
                        {isNextUp ? ' · UP NEXT' : ''}
                      </ThemedText>
                      <ThemedText
                        variant="h3"
                        color={unlocked ? colors.cream100 : colors.creamMuted}
                      >
                        {step.title}
                      </ThemedText>
                    </View>
                    {unlocked && (
                      <ThemedText variant="h3" color={done ? colors.sage : colors.creamMuted}>
                        ›
                      </ThemedText>
                    )}
                  </Pressable>
                );
              })}

              {section.slug === 'doctor-talk-toolkit' && (
                <Button
                  label="Open the full Doctor Toolkit"
                  variant="secondary"
                  onPress={() => router.push('/doctor-toolkit')}
                  style={styles.toolkitButton}
                />
              )}
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
  iconBubble: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(159, 185, 143, 0.16)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  iconEmoji: {
    fontSize: 30,
    lineHeight: 38,
  },
  premiumLabel: {
    marginBottom: spacing.sm,
  },
  title: {
    marginBottom: spacing.lg,
  },
  paragraph: {
    marginBottom: spacing.xl,
  },
  stepsLabel: {
    marginBottom: spacing.md,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(253, 251, 246, 0.08)',
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(253, 251, 246, 0.14)',
  },
  stepRowNextUp: {
    borderColor: colors.sage,
    backgroundColor: 'rgba(159, 185, 143, 0.14)',
  },
  stepRowLocked: {
    opacity: 0.55,
  },
  stepRowPressed: {
    opacity: 0.85,
  },
  stepIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(253, 251, 246, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  stepIconCircleDone: {
    backgroundColor: colors.sage,
  },
  stepIconCircleNextUp: {
    backgroundColor: 'rgba(159, 185, 143, 0.3)',
  },
  stepIconEmoji: {
    fontSize: 18,
    lineHeight: 24,
  },
  stepText: {
    flex: 1,
    marginRight: spacing.md,
  },
  toolkitButton: {
    marginTop: spacing.md,
  },
});
