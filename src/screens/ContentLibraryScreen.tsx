import { ScrollView, Pressable, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { colors, spacing, radius, shadow } from '@/theme';
import { ThemedText } from '@/components/ThemedText';
import { contentLibrary, isSectionComplete, isStepCompleted } from '@/data/contentLibrary';
import { useAuth } from '@/services/useAuth';
import { useUserProfile } from '@/services/useUserProfile';

export function ContentLibraryScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const profile = useUserProfile(user?.uid);

  return (
    <SafeAreaView style={styles.screen} edges={['top', 'bottom']}>
      <ScrollView contentContainerStyle={styles.content}>
        <Pressable onPress={() => router.back()} hitSlop={12} style={styles.backButton}>
          <ThemedText variant="bodySmall" color={colors.woodBrown}>
            ← Back
          </ThemedText>
        </Pressable>

        <ThemedText variant="caption" color={colors.sageDark} style={styles.eyebrow}>
          THE LIBRARY
        </ThemedText>
        <ThemedText variant="display" style={styles.headline}>
          11 sections, at your pace.
        </ThemedText>
        <ThemedText variant="body" color={colors.inkMuted} style={styles.subhead}>
          General information, not medical advice — start wherever feels most
          relevant right now.
        </ThemedText>

        {contentLibrary.map((section) => {
          const completedSteps = profile?.completedSteps ?? [];
          const isDone = isSectionComplete(section, completedSteps);
          const stepsDone = section.steps.filter((step) =>
            isStepCompleted(completedSteps, section.slug, step.id)
          ).length;
          return (
            <Pressable
              key={section.slug}
              onPress={() => router.push(`/library/${section.slug}`)}
              style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
            >
              <View style={styles.cardHeader}>
                <ThemedText variant="h3">{section.title}</ThemedText>
                <View style={styles.cardBadges}>
                  {isDone && (
                    <ThemedText variant="caption" color={colors.sageDark}>
                      DONE
                    </ThemedText>
                  )}
                  {section.isPremium && (
                    <ThemedText variant="caption" color={colors.woodBrown}>
                      MEMBERS
                    </ThemedText>
                  )}
                </View>
              </View>
              <ThemedText variant="bodySmall" color={colors.inkMuted} style={styles.cardSummary}>
                {section.summary}
              </ThemedText>
              <ThemedText variant="caption" color={colors.woodBrown}>
                {stepsDone}/{section.steps.length} STEPS
              </ThemedText>
            </Pressable>
          );
        })}
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
  eyebrow: {
    marginBottom: spacing.md,
  },
  headline: {
    marginBottom: spacing.md,
  },
  subhead: {
    marginBottom: spacing.xl,
  },
  card: {
    backgroundColor: colors.creamLight,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    ...shadow.card,
  },
  cardPressed: {
    opacity: 0.85,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  cardSummary: {
    marginBottom: spacing.sm,
  },
  cardBadges: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
});
