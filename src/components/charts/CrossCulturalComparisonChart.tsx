import { View, StyleSheet } from 'react-native';
import { colors, spacing, radius } from '@/theme';
import { ThemedText } from '../ThemedText';

const ROWS = [
  { label: 'Japan', value: '~1 in 10', pillWidth: 70, color: colors.sage },
  { label: 'Canada', value: '~1 in 3', pillWidth: 210, color: colors.sageDark },
];

/** Section 1.5 — how differently hot-flash frequency is reported across two studied cultures. */
export function CrossCulturalComparisonChart() {
  return (
    <View style={styles.card}>
      <ThemedText variant="caption" color={colors.creamMuted} style={styles.eyebrow}>
        HOT FLASHES, PAST 2 WEEKS
      </ThemedText>
      {ROWS.map((row) => (
        <View key={row.label} style={styles.row}>
          <ThemedText variant="bodySmall" color={colors.cream100} style={styles.rowLabel}>
            {row.label}
          </ThemedText>
          <View style={styles.pillRow}>
            <View style={[styles.pill, { width: row.pillWidth, backgroundColor: row.color }]} />
            <ThemedText variant="h2" color={colors.cream100}>
              {row.value}
            </ThemedText>
          </View>
        </View>
      ))}
      <ThemedText variant="bodySmall" color={colors.creamMuted} style={styles.caveat}>
        Diet, culture, and expectation likely all play a role in how differently this transition
        is experienced.
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
    padding: spacing.lg,
    marginBottom: spacing.lg,
    gap: spacing.md,
  },
  eyebrow: {
    letterSpacing: 0.8,
  },
  row: {
    gap: spacing.xs,
  },
  rowLabel: {
    fontWeight: '500',
  },
  pillRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm + 2,
  },
  pill: {
    height: 26,
    borderRadius: radius.pill,
  },
  caveat: {
    fontStyle: 'italic',
    marginTop: spacing.xs,
  },
});
