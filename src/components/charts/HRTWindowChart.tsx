import { View, StyleSheet } from 'react-native';
import { colors, spacing, radius } from '@/theme';
import { ThemedText } from '../ThemedText';

const AGE_TICKS = ['45', '50', '55', '60', '65', '70'];
const YEARS_TICKS = ['0', '5', '10', '15'];

/** Section 10.2 — the HRT timing window: before 60, or within 10 years of menopause. Only one condition needs to be true. */
export function HRTWindowChart() {
  return (
    <View style={styles.card}>
      <View style={styles.track}>
        <View style={styles.trackHeader}>
          <ThemedText variant="bodySmall" color={colors.cream100} style={styles.trackLabel}>
            Your age
          </ThemedText>
          <ThemedText variant="h3" color={colors.sage}>
            before 60
          </ThemedText>
        </View>
        <View style={styles.bar}>
          <View style={[styles.barSegment, { flex: 15, backgroundColor: colors.sage, borderTopLeftRadius: 7, borderBottomLeftRadius: 7 }]} />
          <View style={[styles.barSegment, { flex: 10, backgroundColor: 'rgba(253, 251, 246, 0.14)', borderTopRightRadius: 7, borderBottomRightRadius: 7 }]} />
        </View>
        <View style={styles.tickRow}>
          {AGE_TICKS.map((tick) => (
            <ThemedText key={tick} variant="caption" color={tick === '60' ? colors.cream100 : colors.creamMuted} style={styles.tick}>
              {tick}
            </ThemedText>
          ))}
        </View>
      </View>

      <View style={styles.orRow}>
        <View style={styles.orLine} />
        <ThemedText variant="body" color={colors.creamMuted} style={styles.orText}>
          or
        </ThemedText>
        <View style={styles.orLine} />
      </View>

      <View style={styles.track}>
        <View style={styles.trackHeader}>
          <ThemedText variant="bodySmall" color={colors.cream100} style={styles.trackLabel}>
            Years since menopause
          </ThemedText>
          <ThemedText variant="h3" color={colors.sage}>
            within 10
          </ThemedText>
        </View>
        <View style={styles.bar}>
          <View style={[styles.barSegment, { flex: 10, backgroundColor: colors.sage, borderTopLeftRadius: 7, borderBottomLeftRadius: 7 }]} />
          <View style={[styles.barSegment, { flex: 5, backgroundColor: 'rgba(253, 251, 246, 0.14)', borderTopRightRadius: 7, borderBottomRightRadius: 7 }]} />
        </View>
        <View style={styles.tickRow}>
          {YEARS_TICKS.map((tick) => (
            <ThemedText key={tick} variant="caption" color={tick === '10' ? colors.cream100 : colors.creamMuted} style={styles.tick}>
              {tick}
            </ThemedText>
          ))}
        </View>
      </View>

      <View style={styles.legend}>
        <View style={styles.legendRow}>
          <View style={[styles.legendSwatch, { backgroundColor: colors.sage }]} />
          <ThemedText variant="bodySmall" color={colors.cream100}>
            Favorable window for starting HRT
          </ThemedText>
        </View>
        <View style={styles.legendRow}>
          <View style={[styles.legendSwatch, styles.legendSwatchOutline]} />
          <ThemedText variant="bodySmall" color={colors.creamMuted}>
            A more individual conversation
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
    gap: spacing.md,
  },
  track: {
    gap: spacing.sm,
  },
  trackHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  trackLabel: {
    fontWeight: '500',
  },
  bar: {
    flexDirection: 'row',
    height: 14,
    gap: 3,
  },
  barSegment: {
    height: 14,
  },
  tickRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tick: {
    width: 20,
    textAlign: 'center',
  },
  orRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  orLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(253, 251, 246, 0.14)',
  },
  orText: {
    fontStyle: 'italic',
  },
  legend: {
    gap: spacing.xs,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: 'rgba(253, 251, 246, 0.14)',
  },
  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  legendSwatch: {
    width: 18,
    height: 8,
    borderRadius: 4,
  },
  legendSwatchOutline: {
    backgroundColor: 'rgba(253, 251, 246, 0.14)',
    borderWidth: 1,
    borderColor: 'rgba(253, 251, 246, 0.28)',
  },
});
