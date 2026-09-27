import { View, StyleSheet } from 'react-native';
import { colors, spacing, radius } from '@/theme';
import { ThemedText } from '../ThemedText';

/** Section 5.2 — how many people actually produce equol from soy, by population. The "majority" figure has no exact number in the source, so it's shown open-ended, not as a specific bar. */
export function EquolSplitChart() {
  return (
    <View style={styles.card}>
      <ThemedText variant="caption" color={colors.creamMuted} style={styles.eyebrow}>
        EQUOL PRODUCERS
      </ThemedText>

      <View style={styles.row}>
        <View style={styles.rowHeader}>
          <ThemedText variant="bodySmall" color={colors.cream100} style={styles.rowLabel}>
            Western populations
          </ThemedText>
          <ThemedText variant="h3" color={colors.cream100}>
            ~25–33%
          </ThemedText>
        </View>
        <View style={styles.track}>
          <View style={[styles.fillLight, { width: '33%' }]} />
          <View style={[styles.fillSolid, { width: '25%' }]} />
        </View>
        <ThemedText variant="caption" color={colors.creamMuted}>
          About 1 in 4 to 1 in 3 people
        </ThemedText>
      </View>

      <View style={styles.row}>
        <View style={styles.rowHeader}>
          <ThemedText variant="bodySmall" color={colors.cream100} style={styles.rowLabel}>
            Some Asian populations
          </ThemedText>
          <ThemedText variant="h3" color={colors.cream100}>
            A majority
          </ThemedText>
        </View>
        <View style={styles.track}>
          <View style={styles.halfMark} />
          <View style={[styles.fillSage, { width: '50%' }]} />
          <View style={styles.trailingDots}>
            <View style={styles.dot} />
            <View style={[styles.dot, styles.dotFaint]} />
            <View style={[styles.dot, styles.dotFainter]} />
          </View>
        </View>
        <View style={styles.halfLabelRow}>
          <ThemedText variant="caption" color={colors.creamMuted}>
            More than half
          </ThemedText>
          <ThemedText variant="caption" color={colors.creamMuted} style={styles.halfLabelCenter}>
            half
          </ThemedText>
        </View>
      </View>

      <ThemedText variant="bodySmall" color={colors.creamMuted} style={styles.caveat}>
        Equol is made by gut bacteria from a compound in soy. Whether you make it may shape how
        much soy does for you.
      </ThemedText>
    </View>
  );
}

const TRACK_HEIGHT = 30;

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(253, 251, 246, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(253, 251, 246, 0.14)',
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    gap: spacing.lg,
  },
  eyebrow: {
    letterSpacing: 0.8,
  },
  row: {
    gap: spacing.sm,
  },
  rowHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  rowLabel: {
    fontWeight: '500',
  },
  track: {
    height: TRACK_HEIGHT,
    borderRadius: TRACK_HEIGHT / 2,
    backgroundColor: 'rgba(253, 251, 246, 0.06)',
    position: 'relative',
    overflow: 'visible',
  },
  fillLight: {
    position: 'absolute',
    left: 0,
    top: 0,
    height: TRACK_HEIGHT,
    borderRadius: TRACK_HEIGHT / 2,
    backgroundColor: 'rgba(159, 185, 143, 0.35)',
  },
  fillSolid: {
    position: 'absolute',
    left: 0,
    top: 0,
    height: TRACK_HEIGHT,
    borderRadius: TRACK_HEIGHT / 2,
    backgroundColor: colors.sage,
  },
  fillSage: {
    position: 'absolute',
    left: 0,
    top: 0,
    height: TRACK_HEIGHT,
    borderTopLeftRadius: TRACK_HEIGHT / 2,
    borderBottomLeftRadius: TRACK_HEIGHT / 2,
    backgroundColor: colors.sageDark,
  },
  halfMark: {
    position: 'absolute',
    left: '50%',
    top: -4,
    width: 1,
    height: TRACK_HEIGHT + 8,
    backgroundColor: 'rgba(253, 251, 246, 0.4)',
  },
  trailingDots: {
    position: 'absolute',
    left: '52%',
    top: TRACK_HEIGHT / 2 - 3,
    flexDirection: 'row',
    gap: 3,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.sageDark,
  },
  dotFaint: {
    opacity: 0.7,
  },
  dotFainter: {
    opacity: 0.4,
  },
  halfLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'relative',
    height: 16,
  },
  halfLabelCenter: {
    position: 'absolute',
    left: '50%',
    transform: [{ translateX: -12 }],
  },
  caveat: {
    fontStyle: 'italic',
  },
});
