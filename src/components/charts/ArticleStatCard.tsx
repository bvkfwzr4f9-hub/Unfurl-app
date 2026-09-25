import { View, StyleSheet } from 'react-native';
import { colors, spacing, radius, type, fontFamily } from '@/theme';
import { ThemedText } from '../ThemedText';

export interface StatCardItem {
  value: string;
  label: string;
}

/**
 * A reusable "headline stat" callout — one big highlighted number when there's
 * a single stat to make, or a row of smaller cards when an article states
 * several at once (e.g. the three stats in "Why Doctors Dismiss This").
 */
export function ArticleStatCard({ items }: { items: StatCardItem[] }) {
  if (items.length === 1) {
    return (
      <View style={styles.singleCard}>
        <ThemedText style={[type.statNumber, styles.singleValue]}>{items[0].value}</ThemedText>
        <ThemedText variant="bodySmall" color={colors.creamMuted}>
          {items[0].label}
        </ThemedText>
      </View>
    );
  }

  return (
    <View style={styles.row}>
      {items.map((item, index) => (
        <View key={index} style={styles.rowCard}>
          <ThemedText style={styles.rowValue}>{item.value}</ThemedText>
          <ThemedText variant="caption" color={colors.creamMuted} style={styles.rowLabel}>
            {item.label}
          </ThemedText>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  singleCard: {
    backgroundColor: 'rgba(253, 251, 246, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(253, 251, 246, 0.14)',
    borderRadius: radius.lg,
    padding: spacing.lg,
    alignItems: 'flex-start',
    gap: spacing.xs,
    marginBottom: spacing.lg,
  },
  singleValue: {
    color: colors.sage,
  },
  row: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  rowCard: {
    flex: 1,
    backgroundColor: 'rgba(253, 251, 246, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(253, 251, 246, 0.14)',
    borderRadius: radius.md,
    padding: spacing.sm + 4,
    gap: spacing.xs,
  },
  rowValue: {
    fontFamily: fontFamily.serifBold,
    fontSize: 24,
    lineHeight: 28,
    color: colors.cream100,
  },
  rowLabel: {
    lineHeight: 15,
  },
});
