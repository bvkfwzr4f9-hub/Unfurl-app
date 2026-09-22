import { ReactNode } from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing, radius } from '@/theme';
import { ThemedText } from './ThemedText';
import { BrandArcs } from './BrandArcs';

interface HeroPanelProps {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: string;
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
  bleed?: boolean;
}

/**
 * The deck's signature dark forest-gradient hero block — eyebrow label,
 * serif headline, quiet subhead, decorative arc motif. Reused anywhere the
 * app wants a "presentation slide" moment: Landing, Paywall, section
 * intros.
 */
export function HeroPanel({ eyebrow, title, subtitle, children, style, bleed = false }: HeroPanelProps) {
  return (
    <LinearGradient
      colors={[colors.forestDark, colors.forestDeep]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.panel, !bleed && styles.rounded, style]}
    >
      <BrandArcs size={190} style={styles.arcsTopRight} />
      <BrandArcs
        size={150}
        color="rgba(159, 185, 143, 0.22)"
        dotColor="rgba(159, 185, 143, 0.65)"
        style={styles.arcsBottomLeft}
      />

      {eyebrow && (
        <ThemedText variant="caption" color={colors.sage} style={styles.eyebrow}>
          {eyebrow}
        </ThemedText>
      )}
      <View style={styles.titleWrap}>{title}</View>
      {subtitle && (
        <ThemedText variant="bodyLarge" color={colors.creamMuted} style={styles.subtitle}>
          {subtitle}
        </ThemedText>
      )}
      {children}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  panel: {
    padding: spacing.xl,
    overflow: 'hidden',
  },
  rounded: {
    borderRadius: radius.xl,
  },
  arcsTopRight: {
    top: -40,
    right: -40,
  },
  arcsBottomLeft: {
    bottom: -30,
    left: -50,
  },
  eyebrow: {
    marginBottom: spacing.md,
  },
  titleWrap: {
    marginBottom: spacing.sm,
  },
  subtitle: {
    marginTop: spacing.sm,
  },
});
