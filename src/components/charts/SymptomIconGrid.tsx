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

const CLUSTERS = [
  {
    label: 'Physical — nobody connects',
    items: [
      {
        title: 'Hot flashes, night sweats',
        icon: <Path d="M12 3c1 3 4 4.5 4 9a4 4 0 0 1-8 0c0-2.5 1.5-3.5 2-5.5 1 1 1.5 2 2 3" {...ICON_PROPS} />,
      },
      {
        title: 'Joint pain, stiffness',
        icon: <Path d="M6 6a2 2 0 1 1 2.8 2.8L15.2 15.2A2 2 0 1 1 18 18a2 2 0 1 1-2.8-2.8L8.8 8.8A2 2 0 1 1 6 6z" {...ICON_PROPS} />,
      },
      {
        title: 'A heart that races for no reason',
        icon: (
          <>
            <Path d="M12 20s-7-4.35-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.65-7 10-7 10z" {...ICON_PROPS} />
            <Path d="M8 11h2l1-2 2 4 1-2h2" {...ICON_PROPS} />
          </>
        ),
      },
    ],
  },
  {
    label: 'Mental — nobody names',
    items: [
      {
        title: 'Brain fog — losing a word mid-sentence',
        icon: (
          <>
            <Path d="M7 15a4 4 0 0 1 0-8 5 5 0 0 1 9.8-1.2A4 4 0 0 1 17 15H7z" {...ICON_PROPS} />
            <Path d="M4 18h16" {...ICON_PROPS} />
          </>
        ),
      },
      {
        title: 'Trouble concentrating',
        icon: (
          <>
            <Path d="M12 12m-7 0a7 7 0 1 0 14 0 7 7 0 1 0-14 0" {...ICON_PROPS} />
            <Path d="M12 12m-2.5 0a2.5 2.5 0 1 0 5 0 2.5 2.5 0 1 0-5 0" {...ICON_PROPS} />
          </>
        ),
      },
    ],
  },
  {
    label: 'Emotional — nobody validates',
    items: [
      {
        title: 'Irritability that surprises even you',
        icon: <Path d="M13 3L6 13h5l-1 8 7-10h-5l1-8z" {...ICON_PROPS} />,
      },
      {
        title: 'A new kind of anxiety',
        icon: <Path d="M3 12c2-4 4 4 6 0s4 4 6 0 3 2 6 0" {...ICON_PROPS} />,
      },
    ],
  },
  {
    label: 'Quiet — nobody mentions',
    items: [
      {
        title: 'Vaginal dryness, bladder changes, shifts in desire',
        icon: <Path d="M12 3c3 4 6 7.5 6 11a6 6 0 0 1-12 0c0-3.5 3-7 6-11z" {...ICON_PROPS} />,
      },
      {
        title: 'Changes in skin, hair, texture',
        icon: (
          <>
            <Path d="M5 12a7 7 0 0 1 14 0" {...ICON_PROPS} />
            <Path d="M5 12v3a2 2 0 0 0 2 2h1" {...ICON_PROPS} />
            <Path d="M19 12v3a2 2 0 0 1-2 2h-1" {...ICON_PROPS} />
          </>
        ),
      },
    ],
  },
];

/** Section 1.3 — all four clusters from the body text, exactly as it names them, as a scannable grid instead of a wall of paragraphs. */
export function SymptomIconGrid() {
  return (
    <View style={styles.stack}>
      {CLUSTERS.map((cluster) => (
        <View key={cluster.label} style={styles.cluster}>
          <ThemedText variant="caption" color={colors.sage} style={styles.clusterLabel}>
            {cluster.label}
          </ThemedText>
          <View style={styles.grid}>
            {cluster.items.map((item) => (
              <View key={item.title} style={styles.tile}>
                <Svg width={22} height={22} viewBox="0 0 24 24">
                  {item.icon}
                </Svg>
                <ThemedText variant="bodySmall" color={colors.cream100} style={styles.title}>
                  {item.title}
                </ThemedText>
              </View>
            ))}
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  stack: {
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  cluster: {
    gap: spacing.sm,
  },
  clusterLabel: {
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    fontWeight: '600',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  tile: {
    flexBasis: '47%',
    flexGrow: 1,
    backgroundColor: 'rgba(253, 251, 246, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(253, 251, 246, 0.14)',
    borderRadius: radius.md,
    padding: spacing.md,
    gap: spacing.sm,
  },
  title: {
    fontWeight: '600',
    lineHeight: 17,
  },
});
