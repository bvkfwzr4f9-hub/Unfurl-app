import { View, StyleSheet } from 'react-native';
import { colors, spacing, radius, type } from '@/theme';
import { ThemedText } from '../ThemedText';

const STAGES = [
  { label: 'Early\nPerimenopause', flex: 1.3, color: colors.sageLight },
  { label: 'Late\nPerimenopause', flex: 1.3, color: colors.sage },
  { label: 'Menopause', flex: 0.6, color: colors.sageDark },
  { label: 'Postmenopause', flex: 1.8, color: '#4D6644' },
];

/** Section 3.3 — a general shape for the transition's stages, not a personal countdown. */
export function PerimenopauseTimelineChart() {
  return (
    <View style={styles.card}>
      <View style={styles.bar}>
        {STAGES.map((stage, index) => (
          <View
            key={stage.label}
            style={[
              styles.segment,
              {
                flex: stage.flex,
                backgroundColor: stage.color,
                borderTopLeftRadius: index === 0 ? radius.sm : 0,
                borderBottomLeftRadius: index === 0 ? radius.sm : 0,
                borderTopRightRadius: index === STAGES.length - 1 ? radius.sm : 0,
                borderBottomRightRadius: index === STAGES.length - 1 ? radius.sm : 0,
              },
            ]}
          />
        ))}
      </View>
      <View style={styles.labelRow}>
        {STAGES.map((stage) => (
          <ThemedText
            key={stage.label}
            variant="caption"
            color={colors.creamMuted}
            style={[styles.label, { flex: stage.flex }]}
          >
            {stage.label}
          </ThemedText>
        ))}
      </View>
      <View style={styles.divider} />
      <ThemedText style={[type.h2, styles.stat]} color={colors.cream100}>
        4–10 years
      </ThemedText>
      <ThemedText variant="bodySmall" color={colors.creamMuted} style={styles.caption}>
        ~7.4 years average total symptom duration
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
  },
  bar: {
    flexDirection: 'row',
    height: 14,
    gap: 3,
  },
  segment: {
    height: 14,
  },
  labelRow: {
    flexDirection: 'row',
    gap: 3,
    marginTop: spacing.sm,
  },
  label: {
    textAlign: 'center',
    lineHeight: 14,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(253, 251, 246, 0.14)',
    marginTop: spacing.md,
    marginBottom: spacing.md,
  },
  stat: {
    textAlign: 'center',
  },
  caption: {
    textAlign: 'center',
    marginTop: spacing.xs,
  },
});
