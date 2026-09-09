import { useState } from 'react';
import { ScrollView, View, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { colors, spacing } from '@/theme';
import { ThemedText } from '@/components/ThemedText';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { useAuth } from '@/services/useAuth';
import { useUserProfile } from '@/services/useUserProfile';
import { devSetSubscriptionStatus } from '@/services/subscription';

export function PaywallScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const profile = useUserProfile(user?.uid);
  const [updating, setUpdating] = useState(false);

  const isActive = profile?.subscriptionStatus === 'active';

  async function toggleDevAccess() {
    if (!user || updating) return;
    setUpdating(true);
    await devSetSubscriptionStatus(user.uid, isActive ? 'free' : 'active');
    setUpdating(false);
  }

  return (
    <SafeAreaView style={styles.screen} edges={['top', 'bottom']}>
      <ScrollView contentContainerStyle={styles.content}>
        <Pressable onPress={() => router.back()} hitSlop={12} style={styles.backButton}>
          <ThemedText variant="bodySmall" color={colors.woodBrown}>
            ← Back
          </ThemedText>
        </Pressable>

        <ThemedText variant="caption" color={colors.sageDark} style={styles.eyebrow}>
          MEMBERSHIP
        </ThemedText>
        <ThemedText variant="display" style={styles.spaced}>
          Everything, unlocked.
        </ThemedText>
        <ThemedText variant="bodyLarge" color={colors.inkMuted} style={styles.spacedLarge}>
          Membership unlocks the full content library, the symptom log and
          export, and everything added going forward.
        </ThemedText>

        <Card variant="dark" style={styles.spaced}>
          <ThemedText variant="h3" color={colors.cream100} style={styles.tierTitle}>
            Monthly — $9.99/mo
          </ThemedText>
          <Button label="Subscribe monthly (coming soon)" variant="secondary" fullWidth disabled />
        </Card>
        <Card variant="sage" style={styles.spacedLarge}>
          <ThemedText variant="h3" color={colors.forestDark} style={styles.tierTitle}>
            Annual — $69.99/yr
          </ThemedText>
          <Button label="Subscribe annually (coming soon)" variant="secondary" fullWidth disabled />
        </Card>

        <ThemedText variant="bodySmall" color={colors.inkMuted} style={styles.spacedLarge}>
          Real billing (Apple In-App Purchase and card payments via Stripe)
          isn't connected yet — that needs a paid Apple Developer account,
          a Stripe account, and a small backend to handle purchase receipts
          securely. Until then, here's a way to try the full experience:
        </ThemedText>

        {user ? (
          <Button
            label={
              updating
                ? 'Updating…'
                : isActive
                  ? 'Dev: switch back to free tier'
                  : 'Dev: unlock full access for testing'
            }
            variant="primary"
            fullWidth
            disabled={updating}
            onPress={toggleDevAccess}
          />
        ) : (
          <Button label="Sign in to continue" variant="primary" fullWidth onPress={() => router.push('/auth')} />
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
  eyebrow: {
    marginBottom: spacing.md,
  },
  spaced: {
    marginBottom: spacing.lg,
  },
  spacedLarge: {
    marginBottom: spacing.xl,
  },
  tierTitle: {
    marginBottom: spacing.md,
  },
});
