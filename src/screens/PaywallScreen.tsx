import { useState } from 'react';
import { ScrollView, View, ImageBackground, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { colors, spacing, type as typeScale, fontFamily } from '@/theme';
import { ThemedText } from '@/components/ThemedText';
import { Button } from '@/components/Button';
import { HeroPanel } from '@/components/HeroPanel';
import { PricingComparisonTable } from '@/components/PricingComparisonTable';
import { BrandArcs } from '@/components/BrandArcs';
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

          <ThemedText variant="caption" color={colors.sage} style={styles.tableLabel}>
            COMPARE PLANS
          </ThemedText>
          <PricingComparisonTable />

          <View style={styles.actionsBlock}>
            <Button
              label="Subscribe monthly — $9.99/mo (coming soon)"
              variant="secondary"
              fullWidth
              disabled
              style={styles.actionButton}
            />
            <Button
              label="Subscribe annually — $69.99/yr (coming soon)"
              variant="secondary"
              fullWidth
              disabled
              style={styles.actionButton}
            />
            {user ? (
              <Button
                label={
                  cohortInterested
                    ? "You're on the Cohort Course list ✓"
                    : "I'm interested in the Cohort Course"
                }
                variant="secondary"
                fullWidth
                disabled={submittingInterest || cohortInterested}
                onPress={handleCohortInterest}
              />
            ) : (
              <Button
                label="Sign in to express Cohort Course interest"
                variant="secondary"
                fullWidth
                onPress={() => router.push('/auth')}
              />
            )}
          </View>

          <ThemedText variant="bodySmall" color={colors.creamMuted} style={styles.spacedLarge}>
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
              variant="secondary"
              fullWidth
              disabled={updating}
              onPress={toggleDevAccess}
            />
          ) : (
            <Button
              label="Sign in to continue"
              variant="secondary"
              fullWidth
              onPress={() => router.push('/auth')}
            />
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
  hero: {
    marginBottom: spacing.xl,
    minHeight: 280,
    justifyContent: 'flex-end',
  },
  italic: {
    fontFamily: fontFamily.serifItalic,
  },
  tableLabel: {
    marginBottom: spacing.md,
  },
  actionsBlock: {
    marginBottom: spacing.xl,
  },
  actionButton: {
    marginBottom: spacing.md,
  },
  spacedLarge: {
    marginBottom: spacing.xl,
  },
});
