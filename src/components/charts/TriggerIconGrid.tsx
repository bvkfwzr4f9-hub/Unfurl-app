import { View, StyleSheet } from 'react-native';
import Svg, { Path, Rect } from 'react-native-svg';
import { colors, spacing, radius } from '@/theme';
import { ThemedText } from '../ThemedText';

const ICON_PROPS = {
  fill: 'none' as const,
  stroke: colors.sage,
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

const ITEMS = [
  {
    label: 'Alcohol',
    icon: <Path d="M8 3h8l-1 6a3 3 0 0 1-6 0z M12 12v8 M8 21h8" {...ICON_PROPS} />,
  },
  {
    label: 'Caffeine',
    icon: (
      <>
        <Path d="M5 10h11v4a5 5 0 0 1-5 5h-1a5 5 0 0 1-5-5z" {...ICON_PROPS} />
        <Path d="M16 11h1.5a2 2 0 0 1 0 4H16" {...ICON_PROPS} />
        <Path d="M9 3c-1 1.5 1 2.5 0 4 M12.5 3c-1 1.5 1 2.5 0 4" {...ICON_PROPS} />
      </>
    ),
  },
  {
    label: 'Spicy food',
    icon: <Path d="M5 19c7 0 12-5 12-11 M17 8c1.5 0 3-1 3-3 M5 19c-1-3 2-8 8-11" {...ICON_PROPS} />,
  },
  {
    label: 'Warm rooms',
    icon: (
      <>
        <Path d="M10 14V5a2 2 0 0 1 4 0v9a4 4 0 1 1-4 0z" {...ICON_PROPS} />
        <Path d="M12 11v6" {...ICON_PROPS} />
      </>
    ),
  },
  {
    label: 'Stress',
    icon: <Path d="M3 12h3l2-5 3 10 3-8 2 3h5" {...ICON_PROPS} />,
  },
  {
    label: 'Blood sugar swings',
    icon: (
      <>
        <Rect x={6} y={6} width={12} height={12} rx={2} {...ICON_PROPS} />
        <Path d="M6 12h12 M12 6v12" {...ICON_PROPS} />
      </>
    ),
  },
];

/** Section 5.5 — the six triggers named in the body text; a nudge to notice patterns, not a banned-foods list. */
export function TriggerIconGrid() {
  return (
    <View style={styles.grid}>
      {ITEMS.map((item) => (
        <View key={item.label} style={styles.tile}>
          <Svg width={24} height={24} viewBox="0 0 24 24">
            {item.icon}
          </Svg>
          <ThemedText variant="caption" color={colors.cream100} style={styles.label}>
            {item.label}
          </ThemedText>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  tile: {
    flexBasis: '30%',
    flexGrow: 1,
    backgroundColor: 'rgba(253, 251, 246, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(253, 251, 246, 0.14)',
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xs,
    alignItems: 'center',
    gap: spacing.sm,
  },
  label: {
    textAlign: 'center',
  },
});
