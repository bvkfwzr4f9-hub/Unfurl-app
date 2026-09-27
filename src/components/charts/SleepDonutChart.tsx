import { View, StyleSheet } from 'react-native';
import Svg, { G, Circle } from 'react-native-svg';
import { colors, spacing, radius } from '@/theme';
import { ThemedText } from '../ThemedText';

/** Section 6.1 — hot flashes account for only about a third of menopausal night waking. */
export function SleepDonutChart() {
  return (
    <View style={styles.card}>
      <ThemedText variant="caption" color={colors.creamMuted} style={styles.eyebrow}>
        WHAT'S BEHIND NIGHT WAKING
      </ThemedText>
      <View style={styles.row}>
        <Svg width={110} height={110} viewBox="0 0 150 150">
          <G transform="rotate(-90 75 75)">
            <Circle
              cx={75}
              cy={75}
              r={60}
              fill="none"
              stroke={colors.sageDark}
              strokeWidth={18}
              strokeDasharray="121.66 255.33"
              strokeDashoffset={-2}
            />
            <Circle
              cx={75}
              cy={75}
              r={60}
              fill="none"
              stroke={colors.sageLight}
              strokeWidth={18}
              strokeDasharray="247.33 129.66"
              strokeDashoffset={-127.66}
            />
          </G>
        </Svg>
        <View style={styles.legend}>
          <View style={styles.legendRow}>
            <View style={[styles.dot, { backgroundColor: colors.sageDark }]} />
            <View>
              <ThemedText variant="h2" color={colors.cream100}>
                ~1 in 3
              </ThemedText>
              <ThemedText variant="caption" color={colors.creamMuted}>
                wakings linked to hot flashes
              </ThemedText>
            </View>
          </View>
          <View style={styles.legendRow}>
            <View style={[styles.dot, { backgroundColor: colors.sageLight }]} />
            <View>
              <ThemedText variant="h2" color={colors.sageLight}>
                ~2 in 3
              </ThemedText>
              <ThemedText variant="caption" color={colors.creamMuted}>
                have other causes
              </ThemedText>
            </View>
          </View>
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
  eyebrow: {
    letterSpacing: 0.8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
  },
  legend: {
    flex: 1,
    gap: spacing.md,
  },
  legendRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginTop: 8,
  },
});
