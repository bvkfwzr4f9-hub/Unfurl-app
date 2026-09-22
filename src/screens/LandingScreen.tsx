import { View, ScrollView, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { colors, spacing, type as typeScale, fontFamily } from '@/theme';
import { ThemedText } from '@/components/ThemedText';
import { Button } from '@/components/Button';
import { HeroPanel } from '@/components/HeroPanel';

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
  },
  headlineItalic: {
    fontFamily: fontFamily.serifItalic,
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
