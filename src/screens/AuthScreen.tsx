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
import { colors, spacing, type as typeScale, fontFamily } from '@/theme';
import { ThemedText } from '@/components/ThemedText';
import { Button } from '@/components/Button';
import { TextField } from '@/components/TextField';
import { BrandArcs } from '@/components/BrandArcs';
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

  const isSignUp = mode === 'signUp';

  async function handleSubmit() {
    if (submitting) return;
    setError(null);
    setSubmitting(true);
    try {
      const trimmedEmail = email.trim();
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, trimmedEmail, password);
      } else {
        await signInWithEmailAndPassword(auth, trimmedEmail, password);
      }
      router.replace('/home');
    } catch (err) {
      setError(getAuthErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
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

          <View style={styles.headerWrap}>
            <BrandArcs
              size={140}
              style={styles.arcs}
              color="rgba(30, 50, 38, 0.1)"
              dotColor="rgba(110, 139, 96, 0.5)"
            />
            <ThemedText variant="display" style={styles.spaced}>
              {isSignUp ? 'Create your ' : 'Welcome '}
              <ThemedText style={[typeScale.display, styles.italic]} color={colors.sageDark}>
                {isSignUp ? 'account' : 'back'}
              </ThemedText>
            </ThemedText>
            <ThemedText variant="body" color={colors.inkMuted} style={styles.spacedLarge}>
              {isSignUp
                ? 'Save your path and pick up where you left off.'
                : 'Sign in to pick up where you left off.'}
            </ThemedText>
          </View>

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
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: spacing.lg,
  },
  headerWrap: {
    position: 'relative',
  },
  arcs: {
    top: -20,
    right: -30,
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
