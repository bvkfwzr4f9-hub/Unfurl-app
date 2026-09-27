import { View, Pressable, Linking, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { colors, spacing, radius } from '@/theme';
import { ThemedText } from '../ThemedText';

/**
 * Sections 8.2 & 8.3 — the 988 crisis line. Always fully expanded, real
 * tel:/sms: links, never dismissible, and — critically — rendered even when
 * the surrounding section is paywall-locked (see ContentStepScreen).
 */
export function CrisisResourceCard() {
  return (
    <View style={styles.card} accessibilityRole="alert">
      <View style={styles.header}>
        <Svg width={22} height={22} viewBox="0 0 24 24">
          <Path
            d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1z"
            fill="none"
            stroke={colors.sage}
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
        <ThemedText variant="bodySmall" color={colors.cream100} style={styles.headerLabel}>
          If you're struggling right now
        </ThemedText>
      </View>

      <View style={styles.numberRow}>
        <ThemedText variant="display" color={colors.sageLight} style={styles.number}>
          988
        </ThemedText>
        <ThemedText variant="bodySmall" color={colors.cream100} style={styles.numberDetail}>
          Suicide & Crisis Lifeline{'\n'}Free, confidential, 24/7 (US)
        </ThemedText>
      </View>

      <View style={styles.buttonRow}>
        <Pressable
          onPress={() => Linking.openURL('tel:988')}
          style={styles.callButton}
          accessibilityRole="link"
          accessibilityLabel="Call 988"
        >
          <ThemedText variant="button" color={colors.forestDark}>
            Call 988
          </ThemedText>
        </Pressable>
        <Pressable
          onPress={() => Linking.openURL('sms:988')}
          style={styles.textButton}
          accessibilityRole="link"
          accessibilityLabel="Text 988"
        >
          <ThemedText variant="button" color={colors.cream100}>
            Text 988
          </ThemedText>
        </Pressable>
      </View>

      <Pressable onPress={() => Linking.openURL('https://988lifeline.org')}>
        <ThemedText variant="bodySmall" color={colors.creamMuted} style={styles.chatLine}>
          or chat at <ThemedText variant="bodySmall" color={colors.sageLight}>988lifeline.org</ThemedText>
        </ThemedText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.forest,
    borderWidth: 1.5,
    borderColor: colors.sage,
    borderRadius: radius.lg,
    padding: spacing.lg,
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  headerLabel: {
    fontWeight: '600',
  },
  numberRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: spacing.md,
  },
  number: {
    fontSize: 48,
    lineHeight: 48,
  },
  numberDetail: {
    lineHeight: 19,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: spacing.sm + 2,
  },
  callButton: {
    flex: 1,
    height: 46,
    borderRadius: radius.pill,
    backgroundColor: colors.sage,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textButton: {
    flex: 1,
    height: 46,
    borderRadius: radius.pill,
    borderWidth: 1.5,
    backgroundColor: 'transparent',
    borderColor: colors.sage,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chatLine: {
    textAlign: 'center',
  },
});
