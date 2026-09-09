import { ScrollView, View, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { signOut } from 'firebase/auth';
import { colors, spacing, radius, shadow } from '@/theme';
import { ThemedText } from '@/components/ThemedText';
import { useRequireAuth } from '@/services/useRequireAuth';
import { useUserProfile } from '@/services/useUserProfile';
import { auth } from '@/services/firebase';

interface HomeLink {
  title: string;
  description: string;
  route: '/library' | '/doctor-toolkit' | '/intake' | '/paywall';
}

const LINKS: HomeLink[] = [
  { title: 'Content Library', description: '11 sections, at your pace.', route: '/library' },
  { title: 'Doctor Toolkit', description: 'Prep for your next appointment.', route: '/doctor-toolkit' },
];

export function HomeScreen() {
  const router = useRouter();
  const { user, initializing } = useRequireAuth();
  const profile = useUserProfile(user?.uid);

  if (initializing || !user) {
    return <View style={styles.screen} />;
  }

  const isActive = profile?.subscriptionStatus === 'active';
  const hasCompletedIntake = !!profile?.intakeCompletedAt;

  return (
    <SafeAreaView style={styles.screen} edges={['top', 'bottom']}>
      <ScrollView contentContainerStyle={styles.content}>
        <ThemedText variant="caption" color={colors.sageDark} style={styles.eyebrow}>
          {isActive ? 'MEMBER' : 'FREE PLAN'}
        </ThemedText>
        <ThemedText variant="display" style={styles.spacedLarge}>
          Welcome back.
        </ThemedText>

        {!hasCompletedIntake && (
          <Pressable
            onPress={() => router.push('/intake')}
            style={({ pressed }) => [styles.highlightCard, pressed && styles.cardPressed]}
          >
            <ThemedText variant="h3" color={colors.cream100} style={styles.cardTitle}>
              Complete your intake
            </ThemedText>
            <ThemedText variant="body" color={colors.creamMuted}>
              A few questions so we can point you toward what matters most,
              first.
            </ThemedText>
          </Pressable>
        )}

        {LINKS.map((link) => (
          <Pressable
            key={link.route}
            onPress={() => router.push(link.route)}
            style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
          >
            <ThemedText variant="h3" style={styles.cardTitle}>
              {link.title}
            </ThemedText>
            <ThemedText variant="bodySmall" color={colors.inkMuted}>
              {link.description}
            </ThemedText>
          </Pressable>
        ))}

        {!isActive && (
          <Pressable
            onPress={() => router.push('/paywall')}
            style={({ pressed }) => [styles.card, styles.upgradeCard, pressed && styles.cardPressed]}
          >
            <ThemedText variant="h3" style={styles.cardTitle}>
              Upgrade to full membership
            </ThemedText>
            <ThemedText variant="bodySmall" color={colors.inkMuted}>
              Unlock the full library and the symptom log.
            </ThemedText>
          </Pressable>
        )}

        <Pressable onPress={() => signOut(auth)} style={styles.signOut}>
          <ThemedText variant="bodySmall" color={colors.woodBrown}>
            Sign out
          </ThemedText>
        </Pressable>
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
  eyebrow: {
    marginBottom: spacing.md,
  },
  spacedLarge: {
    marginBottom: spacing.xl,
  },
  card: {
    backgroundColor: colors.creamLight,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    ...shadow.card,
  },
  highlightCard: {
    backgroundColor: colors.forestDeep,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    ...shadow.card,
  },
  upgradeCard: {
    backgroundColor: colors.sageLight,
  },
  cardPressed: {
    opacity: 0.85,
  },
  cardTitle: {
    marginBottom: spacing.xs,
  },
  signOut: {
    alignSelf: 'center',
    marginTop: spacing.xl,
  },
});
