import { ScrollView, View, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { colors, spacing, radius } from '@/theme';
import { ThemedText } from '@/components/ThemedText';
import { Button } from '@/components/Button';
import { PremiumLock } from '@/components/PremiumLock';
import { getContentSection, isStepCompleted, isStepUnlocked } from '@/data/contentLibrary';
import { useAuth } from '@/services/useAuth';
import { useUserProfile } from '@/services/useUserProfile';

const STEP_TYPE_LABEL: Record<string, string> = {
  article: 'ARTICLE',
  video: 'VIDEO',
  practice: 'PRACTICE',
};

export function ContentDetailScreen() {
  const router = useRouter();
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const { user } = useAuth();
  const profile = useUserProfile(user?.uid);

  const section = getContentSection(typeof slug === 'string' ? slug : '');

  if (!section) {
    return (
      <SafeAreaView style={styles.screen} edges={['top', 'bottom']}>
        <View style={styles.content}>
          <ThemedText variant="h2">Section not found.</ThemedText>
        </View>
      </SafeAreaView>
    );
  }

  const isLocked = section.isPremium && profile?.subscriptionStatus !== 'active';
  const completedSteps = profile?.completedSteps ?? [];

  return (
    <SafeAreaView style={styles.screen} edges={['top', 'bottom']}>
      <ScrollView contentContainerStyle={styles.content}>
        <Pressable onPress={() => router.back()} hitSlop={12} style={styles.backButton}>
          <ThemedText variant="bodySmall" color={colors.woodBrown}>
            ← Back
          </ThemedText>
        </Pressable>

        {section.isPremium && (
          <ThemedText variant="caption" color={colors.woodBrown} style={styles.premiumLabel}>
            MEMBERS
          </ThemedText>
        )}
        <ThemedText variant="display" style={styles.title}>
          {section.title}
        </ThemedText>

        <ThemedText variant="bodyLarge" color={colors.ink} style={styles.paragraph}>
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
            <ThemedText variant="caption" color={colors.woodBrown} style={styles.stepsLabel}>
              STEPS
            </ThemedText>
            {section.steps.map((step, index) => {
              const done = isStepCompleted(completedSteps, section.slug, step.id);
              const unlocked = isStepUnlocked(section, index, completedSteps);
              return (
                <Pressable
                  key={step.id}
                  disabled={!unlocked}
                  onPress={() => router.push(`/library/${section.slug}/${step.id}`)}
                  style={({ pressed }) => [
                    styles.stepRow,
                    !unlocked && styles.stepRowLocked,
                    pressed && unlocked && styles.stepRowPressed,
                  ]}
                >
                  <View style={styles.stepText}>
                    <ThemedText variant="caption" color={colors.woodBrown}>
                      {STEP_TYPE_LABEL[step.type]}
                    </ThemedText>
                    <ThemedText variant="h3" color={unlocked ? colors.ink : colors.inkMuted}>
                      {step.title}
                    </ThemedText>
                  </View>
                  <ThemedText variant="h3" color={done ? colors.sageDark : colors.inkMuted}>
                    {done ? '✓' : unlocked ? '›' : '🔒'}
                  </ThemedText>
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
    justifyContent: 'space-between',
    backgroundColor: colors.creamLight,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  stepRowLocked: {
    opacity: 0.5,
  },
  stepRowPressed: {
    opacity: 0.85,
  },
  stepText: {
    flex: 1,
    marginRight: spacing.md,
  },
  toolkitButton: {
    marginTop: spacing.md,
  },
});
