import { View, ScrollView, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { colors, spacing, type as typeScale, fontFamily } from '@/theme';
import { ThemedText } from '@/components/ThemedText';
import { Button } from '@/components/Button';
import { HeroPanel } from '@/components/HeroPanel';
import { GAME_LEVELS } from '@/data/gameLevels';

export function LandingScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.screen} edges={['top', 'bottom']}>
      <ScrollView contentContainerStyle={styles.content}>
        <ThemedText variant="caption" color={colors.sageDark} style={styles.eyebrow}>
          FOR THE NEXT CHAPTER
        </ThemedText>

        <HeroPanel
          bleed
          style={styles.hero}
          image={require('../../assets/images/brand/moss-driftwood-sky.jpg')}
          title={
            <ThemedText variant="display" color={colors.cream100}>
              Menopause,{'\n'}
              <ThemedText
                style={[typeScale.display, styles.headlineItalic]}
                color={colors.sage}
              >
                without the guesswork.
              </ThemedText>
            </ThemedText>
          }
          subtitle="Take our 60-second quiz to find your personalized path — then join the waitlist to be the first to unlock it."
        />

        <View style={styles.levelsBlock}>
          <ThemedText variant="caption" color={colors.sageDark} style={styles.levelsEyebrow}>
            LEVEL UP AS YOU LEARN
          </ThemedText>
          <View style={styles.levelsRow}>
            {GAME_LEVELS.map((level, index) => (
              <View key={level.id} style={styles.levelChipWrap}>
                <View style={styles.levelChip}>
                  <ThemedText style={styles.levelEmoji}>{level.emoji}</ThemedText>
                  <ThemedText variant="caption" color={colors.woodBrown} style={styles.levelName}>
                    {level.name}
                  </ThemedText>
                </View>
                {index < GAME_LEVELS.length - 1 && <View style={styles.levelConnector} />}
              </View>
            ))}
          </View>
          <ThemedText variant="bodySmall" color={colors.inkMuted} style={styles.levelsCaption}>
            Points, streaks, and badges for real progress — the menopause app
            that doesn't feel like homework.
          </ThemedText>
        </View>

        <View style={styles.footer}>
          <Button
            label="Take the 60-second quiz"
            variant="primary"
            fullWidth
            onPress={() => router.push('/quiz')}
          />
          <ThemedText variant="bodySmall" color={colors.inkMuted} style={styles.disclaimer}>
            No medical advice, no diagnoses — just a clearer place to start.
          </ThemedText>
          <Pressable onPress={() => router.push('/auth')} style={styles.signInLink}>
            <ThemedText variant="bodySmall" color={colors.woodBrown}>
              Already have an account? Sign in
            </ThemedText>
          </Pressable>
        </View>
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
    flexGrow: 1,
    justifyContent: 'space-between',
    padding: spacing.xl,
    paddingBottom: spacing.xxl,
  },
  eyebrow: {
    marginTop: spacing.lg,
    marginBottom: spacing.lg,
  },
  hero: {
    borderRadius: 28,
    minHeight: 380,
    justifyContent: 'flex-end',
  },
  headlineItalic: {
    fontFamily: fontFamily.serifItalic,
  },
  levelsBlock: {
    marginTop: spacing.xxl,
  },
  levelsEyebrow: {
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  levelsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  levelChipWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1,
  },
  levelChip: {
    alignItems: 'center',
  },
  levelEmoji: {
    fontSize: 22,
    marginBottom: spacing.xs,
  },
  levelName: {
    textAlign: 'center',
  },
  levelConnector: {
    width: 12,
    height: 1,
    backgroundColor: colors.border,
    marginHorizontal: spacing.xs,
  },
  levelsCaption: {
    textAlign: 'center',
    marginTop: spacing.md,
  },
  footer: {
    marginTop: spacing.xl,
  },
  disclaimer: {
    textAlign: 'center',
    marginTop: spacing.md,
  },
  signInLink: {
    alignSelf: 'center',
    marginTop: spacing.lg,
  },
});
