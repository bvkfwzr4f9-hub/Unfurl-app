import { ReactNode } from 'react';
import { View, ImageBackground, ImageSourcePropType, StyleSheet, StyleProp, ViewStyle } from 'react-native';
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
  /** A real background photo (e.g. moss/forest from the pitch deck). Falls back to the forest gradient when omitted. */
  image?: ImageSourcePropType;
}

/**
 * The deck's signature dark hero block — eyebrow label, serif headline,
 * quiet subhead, decorative arc motif, over either a forest gradient or a
 * real background photo. Reused anywhere the app wants a "presentation
 * slide" moment: Landing, Paywall, section intros.
 */
export function HeroPanel({ eyebrow, title, subtitle, children, style, bleed = false, image }: HeroPanelProps) {
  const inner = (
    <>
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
    </>
  );

  if (image) {
    return (
      <ImageBackground
        source={image}
        style={[styles.panel, !bleed && styles.rounded, style]}
        imageStyle={!bleed ? styles.rounded : undefined}
      >
        <LinearGradient
          colors={['rgba(22, 36, 27, 0.55)', 'rgba(30, 50, 38, 0.78)']}
          style={StyleSheet.absoluteFill}
        />
        {inner}
      </ImageBackground>
    );
  }

  return (
    <LinearGradient
      colors={[colors.forestDark, colors.forestDeep]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.panel, !bleed && styles.rounded, style]}
    >
      {inner}
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
