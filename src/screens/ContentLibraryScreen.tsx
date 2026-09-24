import { ScrollView, Pressable, View, ImageBackground, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { colors, spacing, radius } from '@/theme';
import { ThemedText } from '@/components/ThemedText';
import { BrandArcs } from '@/components/BrandArcs';
import { contentLibrary, isSectionComplete, isStepCompleted } from '@/data/contentLibrary';
import { useAuth } from '@/services/useAuth';
import { useUserProfile } from '@/services/useUserProfile';

export function ContentLibraryScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const profile = useUserProfile(user?.uid);

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

          <ThemedText variant="caption" color={colors.sage} style={styles.eyebrow}>
            THE LIBRARY
          </ThemedText>
          <ThemedText variant="display" color={colors.cream100} style={styles.headline}>
            12 sections, at your pace.
          </ThemedText>
          <ThemedText variant="body" color={colors.creamMuted} style={styles.subhead}>
            General information, not medical advice — start wherever feels
            most relevant right now.
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
                <View style={styles.iconBubble}>
                  <ThemedText style={styles.iconEmoji}>{section.emoji}</ThemedText>
                </View>
                <View style={styles.cardTextBlock}>
                  <View style={styles.cardHeader}>
                    <ThemedText variant="h3" color={colors.cream100} style={styles.cardTitleText}>
                      {section.title}
                    </ThemedText>
                    {isDone && (
                      <View style={styles.donePill}>
                        <ThemedText variant="caption" color={colors.forestDark}>
                          DONE
                        </ThemedText>
                      </View>
                    )}
                  </View>
                  <ThemedText
                    variant="bodySmall"
                    color={colors.creamMuted}
                    style={styles.cardSummary}
                    numberOfLines={2}
                  >
                    {section.summary}
                  </ThemedText>
                  <View style={styles.cardFooterRow}>
                    <ThemedText variant="caption" color={colors.sage}>
                      {stepsDone}/{section.steps.length} STEPS
                    </ThemedText>
                    {section.isPremium && (
                      <ThemedText variant="caption" color={colors.woodLight}>
                        MEMBERS
                      </ThemedText>
                    )}
                  </View>
                </View>
              </Pressable>
            );
          })}
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
    flexDirection: 'row',
    backgroundColor: 'rgba(253, 251, 246, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(253, 251, 246, 0.14)',
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  cardPressed: {
    opacity: 0.8,
  },
  iconBubble: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: 'rgba(159, 185, 143, 0.16)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  iconEmoji: {
    fontSize: 24,
    lineHeight: 32,
  },
  cardTextBlock: {
    flex: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.xs,
  },
  cardTitleText: {
    flex: 1,
    marginRight: spacing.sm,
  },
  cardSummary: {
    marginBottom: spacing.sm,
  },
  cardFooterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  donePill: {
    backgroundColor: colors.sage,
    borderRadius: radius.pill,
    paddingVertical: 2,
    paddingHorizontal: spacing.sm,
  },
});
