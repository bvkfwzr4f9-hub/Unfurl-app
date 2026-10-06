import { View, StyleSheet } from 'react-native';
import { colors, spacing, radius, type } from '@/theme';
import { ThemedText } from '../ThemedText';

/** Section 3.6 — the natural transition's gradual shape vs. surgical/medical menopause's sudden one. */
export function OnsetComparisonChart() {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <ThemedText variant="caption" color={colors.creamMuted}>
          Natural transition
        </ThemedText>
        <View style={styles.bar}>
          <View style={[styles.segment, { flex: 1.3, backgroundColor: colors.sageLight, borderTopLeftRadius: radius.sm, borderBottomLeftRadius: radius.sm }]} />
          <View style={[styles.segment, { flex: 1.3, backgroundColor: colors.sage }]} />
          <View style={[styles.segment, { flex: 0.6, backgroundColor: colors.sageDark }]} />
          <View style={[styles.segment, { flex: 1.8, backgroundColor: '#4D6644', borderTopRightRadius: radius.sm, borderBottomRightRadius: radius.sm }]} />
        </View>
        <ThemedText style={[type.h3, styles.stat]} color={colors.cream100}>
          4–10 years
        </ThemedText>
      </View>

      <View style={styles.divider} />

      <View style={styles.row}>
        <ThemedText variant="caption" color={colors.creamMuted}>
          Surgical / medical onset
        </ThemedText>
        <View style={styles.dotRow}>
          <View style={styles.dot} />
          <View style={styles.dashLine} />
        </View>
        <ThemedText style={[type.h3, styles.stat]} color={colors.cream100}>
          Days, not years
        </ThemedText>
      </View>

      <ThemedText variant="bodySmall" color={colors.creamMuted} style={styles.caption}>
        Same destination, a very different road — and a different starting point for the hormone-therapy
        conversation.
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(253, 251, 246, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(253, 251, 246, 0.14)',
    borderRadius: radius.lg,
    padding: spacing.lg + 4,
    marginBottom: spacing.lg,
    gap: spacing.md,
  },
  row: {
    gap: spacing.sm,
  },
  bar: {
    flexDirection: 'row',
    height: 14,
    gap: 3,
  },
  segment: {
    height: 14,
  },
  dotRow: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 14,
  },
  dot: {
    width: 10,
    height: 14,
    borderRadius: radius.sm,
    backgroundColor: colors.sage,
  },
  dashLine: {
    flex: 1,
    height: 1,
    marginLeft: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: 'rgba(253, 251, 246, 0.25)',
    borderStyle: 'dashed',
  },
  stat: {},
  divider: {
    height: 1,
    backgroundColor: 'rgba(253, 251, 246, 0.14)',
  },
  caption: {
    fontStyle: 'italic',
  },
});
