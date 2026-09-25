import { View, StyleSheet } from 'react-native';
import Svg, { Line, Circle, Text as SvgText } from 'react-native-svg';
import { colors, spacing, radius, type } from '@/theme';
import { ThemedText } from '../ThemedText';

const CHART_WIDTH = 320;
const CHART_HEIGHT = 130;

/** Section 10.1 — HRT usage, 1999-2020, stopping at the last real data point (no invented recovery). */
export function HRTTrendChart() {
  return (
    <View style={styles.card}>
      <ThemedText variant="caption" color={colors.creamMuted} style={styles.eyebrow}>
        HRT USE AMONG POSTMENOPAUSAL WOMEN
      </ThemedText>

      <Svg width="100%" height={CHART_HEIGHT} viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}>
        <Line x1={10} y1={100} x2={300} y2={100} stroke="rgba(253, 251, 246, 0.18)" strokeWidth={1} />
        <Line x1={10} y1={14} x2={290} y2={78} stroke={colors.sage} strokeWidth={2} />
        <Circle cx={10} cy={14} r={5} fill={colors.sage} />
        <Circle cx={290} cy={78} r={5} fill={colors.sage} />
        <Line
          x1={55}
          y1={24}
          x2={55}
          y2={100}
          stroke="rgba(253, 251, 246, 0.35)"
          strokeWidth={1}
          strokeDasharray="3,3"
        />
        <Circle cx={55} cy={25.6} r={3.5} fill={colors.cream100} />
        <SvgText x={55} y={116} textAnchor="middle" fill={colors.creamMuted} fontSize={10}>
          2002
        </SvgText>
        <SvgText x={55} y={128} textAnchor="middle" fill={colors.creamMuted} fontSize={9}>
          WHI study
        </SvgText>
      </Svg>

      <View style={styles.valueRow}>
        <View>
          <ThemedText style={type.h1} color={colors.cream100}>
            27%
          </ThemedText>
          <ThemedText variant="caption" color={colors.creamMuted}>
            1999
          </ThemedText>
        </View>
        <View style={styles.valueRight}>
          <ThemedText style={type.h1} color={colors.cream100}>
            5%
          </ThemedText>
          <ThemedText variant="caption" color={colors.creamMuted}>
            2020
          </ThemedText>
        </View>
      </View>

      <View style={styles.annotation}>
        <View style={styles.dot} />
        <ThemedText variant="bodySmall" color={colors.cream100} style={styles.annotationText}>
          Nov 2025 — FDA removes the black-box warning on hormone therapy labels
        </ThemedText>
      </View>

      <ThemedText variant="bodySmall" color={colors.creamMuted} style={styles.caveat}>
        No usage data exists yet for after 2025 — this marks the policy change, not a new trend.
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
  },
  eyebrow: {
    letterSpacing: 0.8,
    marginBottom: spacing.xs,
  },
  valueRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.xs,
  },
  valueRight: {
    alignItems: 'flex-end',
  },
  annotation: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: 'rgba(253, 251, 246, 0.14)',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.sage,
  },
  annotationText: {
    flex: 1,
  },
  caveat: {
    fontStyle: 'italic',
    marginTop: spacing.sm,
  },
});
