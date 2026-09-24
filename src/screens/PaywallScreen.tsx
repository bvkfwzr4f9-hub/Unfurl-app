import { useState } from 'react';
import { ScrollView, View, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { colors, spacing, type as typeScale, fontFamily } from '@/theme';
import { ThemedText } from '@/components/ThemedText';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { HeroPanel } from '@/components/HeroPanel';
import { useAuth } from '@/services/useAuth';
import { useUserProfile } from '@/services/useUserProfile';
import { devSetSubscriptionStatus, setCohortInterest } from '@/services/subscription';

export function PaywallScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const profile = useUserProfile(user?.uid);
  const [updating, setUpdating] = useState(false);
  const [submittingInterest, setSubmittingInterest] = useState(false);

  const isActive = profile?.subscriptionStatus === 'active';
  const cohortInterested = profile?.cohortInterested ?? false;

  async function toggleDevAccess() {
    if (!user || updating) return;
    setUpdating(true);
    await devSetSubscriptionStatus(user.uid, isActive ? 'free' : 'active');
    setUpdating(false);
  }

  async function handleCohortInterest() {
    if (!user || submittingInterest || cohortInterested) return;
    setSubmittingInterest(true);
    await setCohortInterest(user.uid);
    setSubmittingInterest(false);
  }

  return (
    <SafeAreaView style={styles.screen} edges={['top', 'bottom']}>
      <ScrollView contentContainerStyle={styles.content}>
        <Pressable onPress={() => router.back()} hitSlop={12} style={styles.backButton}>
          <ThemedText variant="bodySmall" color={colors.woodBrown}>
            ← Back
          </ThemedText>
        </Pressable>

        <HeroPanel
          style={styles.hero}
          image={require('../../assets/images/brand/fern-spiral.jpg')}
          eyebrow="MEMBERSHIP"
          title={
            <ThemedText variant="display" color={colors.cream100}>
              Everything,{' '}
              <ThemedText style={[typeScale.display, styles.italic]} color={colors.sage}>
                unlocked.
              </ThemedText>
            </ThemedText>
          }
          subtitle="Membership unlocks the full content library, the symptom log and export, and everything added going forward."
        />

        <Card variant="dark" style={styles.spaced}>
          <ThemedText variant="h3" color={colors.cream100} style={styles.tierTitle}>
            Monthly — $9.99/mo
          </ThemedText>
          <Button label="Subscribe monthly (coming soon)" variant="secondary" fullWidth disabled />
        </Card>
        <Card variant="sage" style={styles.spaced}>
          <ThemedText variant="h3" color={colors.forestDark} style={styles.tierTitle}>
            Annual — $69.99/yr
          </ThemedText>
          <Button label="Subscribe annually (coming soon)" variant="secondary" fullWidth disabled />
        </Card>

        <Card variant="dark" style={styles.spacedLarge}>
          <ThemedText variant="caption" color={colors.sage} style={styles.cohortEyebrow}>
            COMING LATER · PHASE 2
          </ThemedText>
          <ThemedText variant="h3" color={colors.cream100} style={styles.tierTitle}>
            3-Month Cohort Course — $249–$299 one-time
          </ThemedText>
          <ThemedText variant="body" color={colors.creamMuted} style={styles.cohortBody}>
            A live, small-group program — media, guided discussion, and an
            identity & self-exploration methodology beyond the self-paced
            library. Launches once a real member-verification approach is
            in place, so the group stays safe.
          </ThemedText>
          {user ? (
            <Button
              label={cohortInterested ? "You're on the list ✓" : "I'm interested"}
              variant="secondary"
              fullWidth
              disabled={submittingInterest || cohortInterested}
              onPress={handleCohortInterest}
            />
          ) : (
            <Button
              label="Sign in to express interest"
              variant="secondary"
              fullWidth
              onPress={() => router.push('/auth')}
            />
          )}
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
  hero: {
    marginBottom: spacing.xl,
    minHeight: 280,
    justifyContent: 'flex-end',
  },
  italic: {
    fontFamily: fontFamily.serifItalic,
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
  cohortEyebrow: {
    marginBottom: spacing.sm,
  },
  cohortBody: {
    marginBottom: spacing.lg,
  },
});
