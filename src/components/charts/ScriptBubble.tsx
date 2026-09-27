import { useState } from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import * as Clipboard from 'expo-clipboard';
import { colors, spacing, radius } from '@/theme';
import { ThemedText } from '../ThemedText';

const SCRIPT =
  "My body is going through real hormonal changes right now — it's not about you, and I want us to figure out together what intimacy looks like while I'm navigating this.";

/** Section 7.3 — the sample line as a borrowable script, with a one-tap copy (clipboard only, never shared or posted). */
export function ScriptBubble() {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await Clipboard.setStringAsync(SCRIPT);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <View style={styles.wrap}>
      <ThemedText variant="caption" color={colors.sage} style={styles.eyebrow}>
        TRY SAYING
      </ThemedText>
      <View style={styles.bubble}>
        <ThemedText variant="h3" color={colors.cream100} style={styles.script}>
          "{SCRIPT}"
        </ThemedText>
      </View>
      <View style={styles.footer}>
        <ThemedText variant="bodySmall" color={colors.creamMuted} style={styles.footerText}>
          Change the words — what matters is saying it out loud.
        </ThemedText>
        <Pressable onPress={handleCopy} style={styles.copyButton}>
          <Svg width={16} height={16} viewBox="0 0 24 24">
            <Path
              d="M8 8h12v12H8z M16 8V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3"
              fill="none"
              stroke={colors.sage}
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
          <ThemedText variant="bodySmall" color={colors.cream100}>
            {copied ? 'Copied' : 'Copy'}
          </ThemedText>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginBottom: spacing.lg,
  },
  eyebrow: {
    letterSpacing: 0.8,
    marginBottom: spacing.sm,
  },
  bubble: {
    backgroundColor: 'rgba(159, 185, 143, 0.16)',
    borderWidth: 1,
    borderColor: 'rgba(159, 185, 143, 0.5)',
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg,
    borderBottomRightRadius: radius.lg,
    borderBottomLeftRadius: 6,
    padding: spacing.lg,
  },
  script: {
    fontStyle: 'italic',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
    marginTop: spacing.md,
  },
  footerText: {
    flex: 1,
  },
  copyButton: {
    height: 40,
    paddingHorizontal: spacing.md,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: 'rgba(253, 251, 246, 0.28)',
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
});
