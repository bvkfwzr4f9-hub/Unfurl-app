import { View, StyleSheet } from 'react-native';
import Svg, { Rect, Line, Circle, Text as SvgText } from 'react-native-svg';
import { colors, spacing, radius } from '@/theme';
import { ThemedText } from '../ThemedText';

/** Section 8.1 — depression risk rises during perimenopause and returns to baseline after. A window, not a permanent state. */
export function MoodWindowChart() {
  return (
    <View style={styles.card}>
      <ThemedText variant="caption" color={colors.creamMuted} style={styles.eyebrow}>
        ODDS OF DEPRESSIVE SYMPTOMS, BY STAGE
      </ThemedText>
      <Svg width="100%" height={178} viewBox="0 0 300 178">
        <Rect x={100} y={8} width={100} height={126} rx={14} fill="rgba(159, 185, 143, 0.12)" />
        <Line x1={10} y1={112} x2={290} y2={112} stroke="rgba(253, 251, 246, 0.28)" strokeWidth={1} strokeDasharray="3,4" />
        <Line x1={50} y1={112} x2={150} y2={52} stroke={colors.sage} strokeWidth={2} />
        <Line x1={150} y1={52} x2={250} y2={112} stroke={colors.sage} strokeWidth={2} />
        <Circle cx={50} cy={112} r={5} fill={colors.sageLight} />
        <Circle cx={150} cy={52} r={6} fill={colors.sage} />
        <Circle cx={250} cy={112} r={5} fill={colors.sageLight} />
        <SvgText x={150} y={34} textAnchor="middle" fill={colors.cream100} fontFamily="Playfair Display" fontWeight="700" fontSize={22}>
          ~40% higher
        </SvgText>
        <SvgText x={50} y={98} textAnchor="middle" fill={colors.creamMuted} fontSize={10}>
          baseline
        </SvgText>
        <SvgText x={250} y={98} textAnchor="middle" fill={colors.creamMuted} fontSize={10}>
          back to baseline
        </SvgText>
        <SvgText x={50} y={156} textAnchor="middle" fill={colors.creamMuted} fontSize={10.5}>
          Before
        </SvgText>
        <SvgText x={150} y={156} textAnchor="middle" fill={colors.cream100} fontWeight="600" fontSize={10.5}>
          Perimenopause
        </SvgText>
        <SvgText x={250} y={156} textAnchor="middle" fill={colors.creamMuted} fontSize={10.5}>
          Postmenopause
        </SvgText>
        <SvgText x={150} y={172} textAnchor="middle" fill={colors.sage} fontSize={9.5} letterSpacing={0.6}>
          THE WINDOW
        </SvgText>
      </Svg>
      <ThemedText variant="bodySmall" color={colors.creamMuted} style={styles.caveat}>
        Three stages, not a timeline to scale. Compared with women before perimenopause.
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
  caveat: {
    fontStyle: 'italic',
    marginTop: spacing.sm,
  },
});
