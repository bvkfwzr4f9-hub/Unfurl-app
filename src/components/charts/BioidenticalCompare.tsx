import { View, StyleSheet } from 'react-native';
import { colors, spacing, radius } from '@/theme';
import { ThemedText } from '../ThemedText';

const ROWS = [
  { label: 'Reviewed and approved by the FDA', approved: 'Yes', compounded: 'No' },
  { label: 'Dose checked for consistency', approved: 'Yes', compounded: 'Not required' },
  { label: 'Standard safety labeling', approved: 'Yes', compounded: 'Not required' },
];

/** Section 10.3 — FDA-approved vs. compounded hormones, using standard regulatory facts already implied by the body text. */
export function BioidenticalCompare() {
  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <View style={styles.column}>
          <ThemedText variant="h3" color={colors.cream100}>
            FDA-approved
          </ThemedText>
          <ThemedText variant="caption" color={colors.creamMuted}>
            incl. bioidentical
          </ThemedText>
        </View>
        <View style={styles.column}>
          <ThemedText variant="h3" color={colors.cream100}>
            Compounded
          </ThemedText>
          <ThemedText variant="caption" color={colors.creamMuted}>
            custom-mixed by a pharmacy
          </ThemedText>
        </View>
      </View>

      {ROWS.map((row) => (
        <View key={row.label} style={styles.row}>
          <ThemedText variant="caption" color={colors.creamMuted} style={styles.rowLabel}>
            {row.label}
          </ThemedText>
          <View style={styles.rowValues}>
            <View style={styles.valueCell}>
              <View style={[styles.mark, styles.markYes]} />
              <ThemedText variant="bodySmall" color={colors.cream100}>
                {row.approved}
              </ThemedText>
            </View>
            <View style={styles.valueCell}>
              <View style={[styles.mark, styles.markNo]} />
              <ThemedText variant="bodySmall" color={colors.creamMuted}>
                {row.compounded}
              </ThemedText>
            </View>
          </View>
        </View>
      ))}

      <View style={styles.row}>
        <ThemedText variant="caption" color={colors.creamMuted} style={styles.rowLabel}>
          Examples
        </ThemedText>
        <View style={styles.rowValues}>
          <ThemedText variant="bodySmall" color={colors.cream100} style={styles.exampleCell}>
            Estradiol patch, gel, or pill; micronized progesterone
          </ThemedText>
          <ThemedText variant="bodySmall" color={colors.cream100} style={styles.exampleCell}>
            Custom creams, pellets, troches
          </ThemedText>
        </View>
      </View>
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
  },
  headerRow: {
    flexDirection: 'row',
    gap: spacing.md,
    paddingBottom: spacing.md,
  },
  column: {
    flex: 1,
    gap: 3,
  },
  row: {
    gap: spacing.xs,
    paddingVertical: spacing.sm + 2,
    borderTopWidth: 1,
    borderTopColor: 'rgba(253, 251, 246, 0.14)',
  },
  rowLabel: {
    letterSpacing: 0.4,
  },
  rowValues: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  valueCell: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs + 2,
  },
  mark: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  markYes: {
    backgroundColor: colors.sage,
  },
  markNo: {
    borderWidth: 1.5,
    borderColor: colors.woodLight,
  },
  exampleCell: {
    flex: 1,
    lineHeight: 19,
  },
});
