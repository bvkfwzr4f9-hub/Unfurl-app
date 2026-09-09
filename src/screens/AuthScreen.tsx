import { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { colors, spacing } from '@/theme';
import { ThemedText } from '@/components/ThemedText';
import { Button } from '@/components/Button';
import { TextField } from '@/components/TextField';
import { auth } from '@/services/firebase';
import { getAuthErrorMessage } from '@/services/authErrors';

type Mode = 'signIn' | 'signUp';

export function AuthScreen() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>('signIn');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [signedInEmail, setSignedInEmail] = useState<string | null>(null);

  const isSignUp = mode === 'signUp';

  async function handleSubmit() {
    if (submitting) return;
    setError(null);
    setSubmitting(true);
    try {
      const trimmedEmail = email.trim();
      const credential = isSignUp
        ? await createUserWithEmailAndPassword(auth, trimmedEmail, password)
        : await signInWithEmailAndPassword(auth, trimmedEmail, password);
      setSignedInEmail(credential.user.email);
    } catch (err) {
      setError(getAuthErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  }

  if (signedInEmail) {
    return (
      <SafeAreaView style={styles.screen} edges={['top', 'bottom']}>
        <View style={styles.centeredContent}>
          <ThemedText variant="caption" color={colors.sageDark} style={styles.eyebrow}>
            YOU'RE IN
          </ThemedText>
          <ThemedText variant="h1" style={styles.spaced}>
            Welcome, {signedInEmail}.
          </ThemedText>
          <ThemedText variant="body" color={colors.inkMuted} style={styles.spaced}>
            The full Unfurl experience is still being built — for now, this
            just confirms your account works. More is coming soon.
          </ThemedText>
          <Button label="Back to home" variant="secondary" onPress={() => router.replace('/')} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.screen} edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <Pressable onPress={() => router.back()} hitSlop={12} style={styles.backButton}>
            <ThemedText variant="bodySmall" color={colors.woodBrown}>
              ← Back
            </ThemedText>
          </Pressable>

          <ThemedText variant="display" style={styles.spaced}>
            {isSignUp ? 'Create your account' : 'Welcome back'}
          </ThemedText>
          <ThemedText variant="body" color={colors.inkMuted} style={styles.spacedLarge}>
            {isSignUp
              ? 'Save your path and pick up where you left off.'
              : 'Sign in to pick up where you left off.'}
          </ThemedText>

          <TextField
            value={email}
            onChangeText={setEmail}
            placeholder="you@example.com"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            textContentType="emailAddress"
            style={styles.field}
          />
          <TextField
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            secureTextEntry
            textContentType={isSignUp ? 'newPassword' : 'password'}
            hasError={!!error}
            style={styles.field}
          />
          {error && (
            <ThemedText variant="bodySmall" color={colors.error} style={styles.field}>
              {error}
            </ThemedText>
          )}

          <Button
            label={submitting ? 'Please wait…' : isSignUp ? 'Create account' : 'Sign in'}
            variant="primary"
            fullWidth
            disabled={submitting || email.trim().length === 0 || password.length === 0}
            onPress={handleSubmit}
            style={styles.spacedLarge}
          />

          <Pressable
            onPress={() => {
              setMode(isSignUp ? 'signIn' : 'signUp');
              setError(null);
            }}
            style={styles.toggle}
          >
            <ThemedText variant="bodySmall" color={colors.woodBrown}>
              {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
            </ThemedText>
          </Pressable>

          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <ThemedText variant="caption" color={colors.inkMuted} style={styles.dividerLabel}>
              OR
            </ThemedText>
            <View style={styles.dividerLine} />
          </View>

          <Button
            label="Continue with Apple (coming soon)"
            variant="secondary"
            fullWidth
            disabled
            style={styles.field}
          />
          <Button
            label="Continue with Google (coming soon)"
            variant="secondary"
            fullWidth
            disabled
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.cream,
  },
  flex: {
    flex: 1,
  },
  content: {
    padding: spacing.xl,
    paddingBottom: spacing.huge,
  },
  centeredContent: {
    flex: 1,
    justifyContent: 'center',
    padding: spacing.xl,
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
  field: {
    marginBottom: spacing.md,
  },
  toggle: {
    alignSelf: 'center',
    marginBottom: spacing.xl,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },
  dividerLabel: {
    marginHorizontal: spacing.md,
  },
});
