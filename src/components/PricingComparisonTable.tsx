import { View, StyleSheet } from 'react-native';
import { colors, spacing, radius } from '@/theme';
import { ThemedText } from './ThemedText';

interface ComparisonRow {
  label: string;
  free: boolean;
  membership: boolean;
  cohort: boolean;
}

const ROWS: ComparisonRow[] = [
  { label: 'Self-discovery quiz', free: true, membership: true, cohort: true },
  { label: 'Recognition, Doctor Toolkit & HRT sections', free: true, membership: true, cohort: true },
  { label: 'Daily habits, levels & streaks', free: true, membership: true, cohort: true },
  { label: 'Full 12-section content library', free: false, membership: true, cohort: true },
  { label: 'Symptom log + PDF export', free: false, membership: true, cohort: true },
  { label: 'Personalized recommendations', free: false, membership: true, cohort: true },
  { label: 'Live small-group sessions', free: false, membership: false, cohort: true },
  { label: 'Identity & self-exploration methodology', free: false, membership: false, cohort: true },
];

/** Column widths as flex ratios — label:data = 1.5:1, and every data column
 *  uses the same ratio in both the header and body rows so marks line up
 *  exactly under their header, regardless of screen width. */
const LABEL_FLEX = 1.5;
const DATA_FLEX = 1;

function Mark({ included, highlighted }: { included: boolean; highlighted?: boolean }) {
  const color = highlighted
    ? included
      ? colors.forestDark
      : 'rgba(31, 42, 32, 0.3)'
    : included
      ? colors.sage
      : 'rgba(253, 251, 246, 0.25)';
  return (
    <View style={styles.markCell}>
      <ThemedText variant="h3" color={color}>
        {included ? '✓' : '—'}
      </ThemedText>
    </View>
  );
}

/** A feature-by-tier comparison — what Free, Membership, and the (not-yet-launched) Cohort Course each include. */
export function PricingComparisonTable() {
  return (
    <View style={styles.table}>
      {/* Highlights the full Membership column, header through the last row — a
       *  ghost row sharing the exact flex proportions of the real rows below it. */}
      <View style={styles.highlightOverlay} pointerEvents="none">
        <View style={styles.highlightLabelSpacer} />
        <View style={styles.highlightSpacer} />
        <View style={[styles.highlightSpacer, styles.highlightFill]} />
        <View style={styles.highlightSpacer} />
      </View>

      <View style={styles.headerRow}>
        <View style={styles.labelHeaderCell} />
        <View style={styles.headerCell}>
          <ThemedText variant="caption" color={colors.creamMuted} numberOfLines={1}>
            FREE
          </ThemedText>
          <ThemedText variant="bodySmall" color={colors.cream100} style={styles.headerPrice}>
            $0
          </ThemedText>
        </View>
        <View style={styles.headerCell}>
          <ThemedText variant="caption" color={colors.forestDark} numberOfLines={1}>
            MEMBER
          </ThemedText>
          <ThemedText variant="bodySmall" color={colors.forestDark} style={styles.headerPrice}>
            $9.99/mo
          </ThemedText>
          <ThemedText variant="caption" color={colors.forestDark} numberOfLines={1}>
            or $69.99/yr
          </ThemedText>
        </View>
        <View style={styles.headerCell}>
          <ThemedText variant="caption" color={colors.creamMuted} numberOfLines={1}>
            COHORT
          </ThemedText>
          <ThemedText variant="bodySmall" color={colors.cream100} style={styles.headerPrice}>
            $249–299
          </ThemedText>
          <ThemedText variant="caption" color={colors.sage} numberOfLines={1}>
            Phase 2
          </ThemedText>
        </View>
      </View>

      {ROWS.map((row, index) => (
        <View
          key={row.label}
          style={[styles.bodyRow, index < ROWS.length - 1 && styles.bodyRowBorder]}
        >
          <ThemedText variant="bodySmall" color={colors.creamMuted} style={styles.labelCell}>
            {row.label}
          </ThemedText>
          <Mark included={row.free} />
          <Mark included={row.membership} highlighted />
          <Mark included={row.cohort} />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  table: {
    backgroundColor: 'rgba(253, 251, 246, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(253, 251, 246, 0.14)',
    borderRadius: radius.lg,
    overflow: 'hidden',
    marginBottom: spacing.xl,
  },
  highlightOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    paddingHorizontal: spacing.md,
  },
  highlightLabelSpacer: {
    flex: LABEL_FLEX,
    marginRight: spacing.sm,
  },
  highlightSpacer: {
    flex: DATA_FLEX,
  },
  highlightFill: {
    backgroundColor: colors.sage,
    borderRadius: radius.md,
    marginVertical: spacing.sm,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'stretch',
    paddingHorizontal: spacing.md,
    paddingTop: spacing.lg,
  },
  labelHeaderCell: {
    flex: LABEL_FLEX,
  },
  headerCell: {
    flex: DATA_FLEX,
    alignItems: 'center',
    paddingHorizontal: spacing.xs,
  },
  headerPrice: {
    marginTop: spacing.xs,
    marginBottom: spacing.xs,
  },
  bodyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
  },
  bodyRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(253, 251, 246, 0.1)',
  },
  labelCell: {
    flex: LABEL_FLEX,
    marginRight: spacing.sm,
  },
  markCell: {
    flex: DATA_FLEX,
    alignItems: 'center',
  },
});
