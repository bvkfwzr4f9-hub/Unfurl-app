import { View, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';
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
];

/** Section 5.5 — exactly the three triggers named in the body text (no invented additions). */
export function TriggerIconGrid() {
  return (
    <View style={styles.grid}>
      {ITEMS.map((item) => (
        <View key={item.label} style={styles.tile}>
          <Svg width={24} height={24} viewBox="0 0 24 24">
            {item.icon}
          </Svg>
          <ThemedText variant="bodySmall" color={colors.cream100} style={styles.label}>
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
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  tile: {
    flex: 1,
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
