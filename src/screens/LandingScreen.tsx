import { View, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { colors, spacing } from '@/theme';
import { ThemedText } from '@/components/ThemedText';
import { Button } from '@/components/Button';

export function LandingScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.screen} edges={['top', 'bottom']}>
      <View style={styles.content}>
        <View>
          <ThemedText variant="caption" color={colors.sageDark} style={styles.eyebrow}>
            FOR THE NEXT CHAPTER
          </ThemedText>
          <ThemedText variant="display" style={styles.headline}>
            Menopause, without the guesswork.
          </ThemedText>
          <ThemedText variant="bodyLarge" color={colors.inkMuted} style={styles.subhead}>
            Take our 60-second quiz to find your personalized path — then join
            the waitlist to be the first to unlock it.
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
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.cream,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    padding: spacing.xl,
    paddingBottom: spacing.xxl,
  },
  eyebrow: {
    marginTop: spacing.xxxl,
    marginBottom: spacing.md,
  },
  headline: {
    marginBottom: spacing.lg,
  },
  subhead: {
    marginBottom: spacing.lg,
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
