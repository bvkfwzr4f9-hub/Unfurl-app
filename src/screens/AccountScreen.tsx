import { useState } from 'react';
import { ScrollView, View, ImageBackground, Pressable, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import {
  signOut,
  EmailAuthProvider,
  reauthenticateWithCredential,
  deleteUser,
} from 'firebase/auth';
import { colors, spacing, radius } from '@/theme';
import { ThemedText } from '@/components/ThemedText';
import { Button } from '@/components/Button';
import { TextField } from '@/components/TextField';
import { BrandArcs } from '@/components/BrandArcs';
import { useRequireAuth } from '@/services/useRequireAuth';
import { useUserProfile } from '@/services/useUserProfile';
import { auth } from '@/services/firebase';
import { cancelMembership } from '@/services/subscription';
import { deleteAllUserData } from '@/services/account';
import { getAuthErrorMessage } from '@/services/authErrors';

export function AccountScreen() {
  const router = useRouter();
  const { user, initializing } = useRequireAuth();
  const profile = useUserProfile(user?.uid);
  const [cancelling, setCancelling] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);
  const [password, setPassword] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (initializing || !user) {
    return <View style={styles.screen} />;
  }

  const isActive = profile?.subscriptionStatus === 'active';

  function handleCancelMembership() {
    if (!user) return;
    Alert.alert(
      'Cancel membership?',
      "You'll lose access to the full library and symptom log. You can resubscribe any time.",
      [
        { text: 'Never mind', style: 'cancel' },
        {
          text: 'Cancel membership',
          style: 'destructive',
          onPress: async () => {
            setCancelling(true);
            await cancelMembership(user.uid);
            setCancelling(false);
          },
        },
      ]
    );
  }

  function confirmDelete() {
    Alert.alert(
      'Delete your account?',
      'This permanently deletes your profile, intake answers, symptom log, and habits. This cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Continue', style: 'destructive', onPress: () => setDeleteMode(true) },
      ]
    );
  }

  async function handleDeleteAccount() {
    if (!user || !user.email || deleting) return;
    setError(null);
    setDeleting(true);
    try {
      const credential = EmailAuthProvider.credential(user.email, password);
      await reauthenticateWithCredential(user, credential);
      await deleteAllUserData(user.uid);
      await deleteUser(user);
      router.replace('/');
    } catch (err) {
      setError(getAuthErrorMessage(err));
      setDeleting(false);
    }
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

          <ThemedText variant="caption" color={colors.sage} style={styles.eyebrow}>
            ACCOUNT
          </ThemedText>
          <ThemedText variant="h1" color={colors.cream100} style={styles.headline}>
            {user.email}
          </ThemedText>
          <ThemedText variant="body" color={colors.creamMuted} style={styles.subhead}>
            {isActive ? 'Active member' : 'Free plan'}
          </ThemedText>

          {isActive && (
            <View style={[styles.glassCard, styles.section]}>
              <ThemedText variant="h3" color={colors.cream100} style={styles.sectionTitle}>
                Membership
              </ThemedText>
              <ThemedText variant="body" color={colors.creamMuted} style={styles.sectionBody}>
                You're an active member. Cancelling reverts your account to
                the free plan.
              </ThemedText>
              <Button
                label={cancelling ? 'Cancelling…' : 'Cancel membership'}
                variant="secondary"
                onPress={handleCancelMembership}
                disabled={cancelling}
              />
            </View>
          )}

          <Pressable
            onPress={() => signOut(auth)}
            style={({ pressed }) => [styles.glassCard, styles.section, pressed && styles.pressed]}
          >
            <ThemedText variant="h3" color={colors.cream100}>
              Sign out
            </ThemedText>
          </Pressable>

          <View style={[styles.glassCard, styles.dangerSection]}>
            <ThemedText variant="h3" color={colors.error} style={styles.sectionTitle}>
              Delete account
            </ThemedText>
            <ThemedText variant="body" color={colors.creamMuted} style={styles.sectionBody}>
              Permanently deletes your profile, intake answers, symptom log,
              and habits. This can't be undone.
            </ThemedText>

            {!deleteMode ? (
              <Button label="Delete my account" variant="secondary" onPress={confirmDelete} />
            ) : (
              <>
                <ThemedText variant="bodySmall" color={colors.creamMuted} style={styles.reauthNote}>
                  Confirm your password to finish deleting your account.
                </ThemedText>
                <TextField
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Password"
                  secureTextEntry
                  hasError={!!error}
                  style={styles.field}
                />
                {error && (
                  <ThemedText variant="bodySmall" color={colors.error} style={styles.field}>
                    {error}
                  </ThemedText>
                )}
                <Button
                  label={deleting ? 'Deleting…' : 'Permanently delete my account'}
                  variant="primary"
                  fullWidth
                  disabled={deleting || password.length === 0}
                  onPress={handleDeleteAccount}
                />
              </>
            )}
          </View>
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
    marginBottom: spacing.sm,
  },
  subhead: {
    marginBottom: spacing.xl,
  },
  glassCard: {
    backgroundColor: 'rgba(253, 251, 246, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(253, 251, 246, 0.14)',
    borderRadius: radius.lg,
  },
  pressed: {
    opacity: 0.8,
  },
  section: {
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  dangerSection: {
    padding: spacing.lg,
    marginBottom: spacing.xl,
    borderColor: 'rgba(179, 84, 63, 0.35)',
  },
  sectionTitle: {
    marginBottom: spacing.sm,
  },
  sectionBody: {
    marginBottom: spacing.lg,
  },
  reauthNote: {
    marginBottom: spacing.md,
  },
  field: {
    marginBottom: spacing.md,
  },
});
