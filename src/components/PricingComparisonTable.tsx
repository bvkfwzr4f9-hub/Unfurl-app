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

function Mark({ included }: { included: boolean }) {
  return (
    <View style={styles.markCell}>
      <ThemedText
        variant="h3"
        color={included ? colors.sage : 'rgba(253, 251, 246, 0.25)'}
      >
        {included ? '✓' : '—'}
      </ThemedText>
    </View>
  );
}

/** A feature-by-tier comparison — what Free, Membership, and the (not-yet-launched) Cohort Course each include. */
export function PricingComparisonTable() {
  return (
    <View style={styles.table}>
      <View style={styles.headerRow}>
        <View style={styles.labelHeaderCell} />
        <View style={styles.headerCell}>
          <ThemedText variant="caption" color={colors.creamMuted}>
            FREE
          </ThemedText>
          <ThemedText variant="bodySmall" color={colors.cream100} style={styles.headerPrice}>
            $0
          </ThemedText>
        </View>
        <View style={[styles.headerCell, styles.membershipHeaderCell]}>
          <ThemedText variant="caption" color={colors.forestDark}>
            MEMBERSHIP
          </ThemedText>
          <ThemedText variant="bodySmall" color={colors.forestDark} style={styles.headerPrice}>
            $9.99/mo
          </ThemedText>
          <ThemedText variant="caption" color={colors.forestDark}>
            or $69.99/yr
          </ThemedText>
        </View>
        <View style={styles.headerCell}>
          <ThemedText variant="caption" color={colors.creamMuted}>
            COHORT
          </ThemedText>
          <ThemedText variant="bodySmall" color={colors.cream100} style={styles.headerPrice}>
            $249–299
          </ThemedText>
          <ThemedText variant="caption" color={colors.sage}>
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
          <Mark included={row.membership} />
          <Mark included={row.cohort} />
        </View>
      ))}
    </View>
  );
}

const COLUMN_WIDTH = 66;

const styles = StyleSheet.create({
  table: {
    backgroundColor: 'rgba(253, 251, 246, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(253, 251, 246, 0.14)',
    borderRadius: radius.lg,
    overflow: 'hidden',
    marginBottom: spacing.xl,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'stretch',
    paddingHorizontal: spacing.md,
    paddingTop: spacing.lg,
  },
  labelHeaderCell: {
    flex: 1,
  },
  headerCell: {
    width: COLUMN_WIDTH,
    alignItems: 'center',
  },
  membershipHeaderCell: {
    backgroundColor: colors.sage,
    borderTopLeftRadius: radius.md,
    borderTopRightRadius: radius.md,
    paddingTop: spacing.sm,
    marginTop: -spacing.sm,
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
    flex: 1,
    marginRight: spacing.sm,
  },
  markCell: {
    width: COLUMN_WIDTH,
    alignItems: 'center',
  },
});
