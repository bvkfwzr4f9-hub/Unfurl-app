import { View, StyleSheet } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import { colors, spacing, radius } from '@/theme';
import { ThemedText } from '../ThemedText';

// Verbatim from Section 2.5's body text — no items added beyond what's actually written there.
const RED_FLAGS = [
  'Fainting or near-fainting',
  'Chest pain or pressure',
  'Shortness of breath',
  'Happening during exercise rather than at rest',
  'Feeling irregular rather than simply fast',
  'Disrupting your sleep',
  'A family history of sudden cardiac problems before fifty',
];

/** Section 2.5 — the safety list, as a card distinct enough from body copy that it can't be skimmed past. */
export function RedFlagChecklist() {
  return (
    <View style={styles.card}>
      <ThemedText variant="h3" color={colors.cream100} style={styles.title}>
        Seek prompt medical evaluation if you notice
      </ThemedText>
      {RED_FLAGS.map((flag, index) => (
        <View key={flag} style={[styles.row, index > 0 && styles.rowDivider]}>
          <Svg width={20} height={20} viewBox="0 0 24 24" style={styles.icon}>
            <Circle cx={12} cy={12} r={9} fill="none" stroke={colors.sage} strokeWidth={1.5} />
            <Path d="M12 7.5v5.5" stroke={colors.sage} strokeWidth={1.5} strokeLinecap="round" />
            <Circle cx={12} cy={16.5} r={0.6} fill={colors.sage} />
          </Svg>
          <ThemedText variant="body" color={colors.cream100} style={styles.flagText}>
            {flag}
          </ThemedText>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.forestDeep,
    borderWidth: 1.5,
    borderColor: colors.sage,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.sm,
    marginBottom: spacing.lg,
  },
  title: {
    marginBottom: spacing.sm,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
    paddingVertical: spacing.sm + 3,
  },
  rowDivider: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(253, 251, 246, 0.14)',
  },
  icon: {
    marginTop: 1,
  },
  flagText: {
    flex: 1,
  },
});
