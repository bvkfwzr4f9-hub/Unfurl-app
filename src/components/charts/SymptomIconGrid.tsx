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
    title: 'Hot flashes & night sweats',
    detail: 'The most talked-about symptom of all',
    icon: <Path d="M12 3c1 3 4 4.5 4 9a4 4 0 0 1-8 0c0-2.5 1.5-3.5 2-5.5 1 1 1.5 2 2 3" {...ICON_PROPS} />,
  },
  {
    title: 'Brain fog',
    detail: 'Losing a word, forgetting why you walked in',
    icon: <Path d="M7 17a4 4 0 1 1 1-7.9A5 5 0 0 1 18 11a3 3 0 0 1 0 6z" {...ICON_PROPS} />,
  },
  {
    title: 'A racing or fluttering heart',
    detail: 'Often dismissed as "just anxiety"',
    icon: (
      <>
        <Path d="M12 20s-7-4.35-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.65-7 10-7 10z" {...ICON_PROPS} />
        <Path d="M8 11h2l1-2 2 4 1-2h2" {...ICON_PROPS} />
      </>
    ),
  },
  {
    title: 'Irritability that feels unlike you',
    detail: 'Snapping, then wondering who that was',
    icon: (
      <>
        <Path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" {...ICON_PROPS} />
      </>
    ),
  },
];

/** Section 1.3 — the four sample symptoms from the body text, as a scannable grid instead of a wall of paragraphs. */
export function SymptomIconGrid() {
  return (
    <View style={styles.grid}>
      {ITEMS.map((item) => (
        <View key={item.title} style={styles.tile}>
          <Svg width={26} height={26} viewBox="0 0 24 24">
            {item.icon}
          </Svg>
          <ThemedText variant="bodySmall" color={colors.cream100} style={styles.title}>
            {item.title}
          </ThemedText>
          <ThemedText variant="caption" color={colors.creamMuted}>
            {item.detail}
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
    gap: spacing.sm + 2,
    marginBottom: spacing.lg,
  },
  tile: {
    flexBasis: '47%',
    flexGrow: 1,
    backgroundColor: 'rgba(253, 251, 246, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(253, 251, 246, 0.14)',
    borderRadius: radius.md,
    padding: spacing.md + 2,
    gap: spacing.sm,
  },
  title: {
    fontWeight: '600',
    lineHeight: 17,
  },
});
