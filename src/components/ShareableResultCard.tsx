import { forwardRef } from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import ViewShot, { type ViewShotRef } from 'react-native-view-shot';
import { colors, spacing, fontFamily, type as typeScale } from '@/theme';
import { ThemedText } from './ThemedText';
import { BrandArcs } from './BrandArcs';

interface ShareableResultCardProps {
  pathName: string;
  pathDescription: string;
}

/**
 * The branded, screenshot-shareable version of a quiz result — captured via
 * ref (see QuizFlowScreen's handleShare) and sent through the native share
 * sheet. Fixed aspect ratio so it looks intentional wherever it lands.
 */
export const ShareableResultCard = forwardRef<ViewShotRef, ShareableResultCardProps>(
  ({ pathName, pathDescription }, ref) => {
    return (
      <ViewShot ref={ref} options={{ format: 'png', quality: 1 }} style={styles.shot}>
        <ImageBackground
          source={require('../../assets/images/brand/moss-driftwood-sky.jpg')}
          style={styles.image}
        >
          <LinearGradient
            colors={['rgba(22, 36, 27, 0.3)', 'rgba(22, 36, 27, 0.88)']}
            style={StyleSheet.absoluteFill}
          />
          <BrandArcs size={170} style={styles.arcs} />

          <ThemedText variant="caption" color={colors.sage} style={styles.wordmark}>
            🌿 UNFURL
          </ThemedText>

          <View style={styles.bottom}>
            <ThemedText variant="caption" color={colors.creamMuted} style={styles.eyebrow}>
              MY PATH
            </ThemedText>
            <ThemedText
              style={[typeScale.display, styles.pathName]}
              color={colors.cream100}
            >
              {pathName}
            </ThemedText>
            <ThemedText variant="body" color={colors.creamMuted}>
              {pathDescription}
            </ThemedText>
          </View>
        </ImageBackground>
      </ViewShot>
    );
  }
);

ShareableResultCard.displayName = 'ShareableResultCard';

const styles = StyleSheet.create({
  shot: {
    width: '100%',
    aspectRatio: 4 / 5,
    borderRadius: 24,
    overflow: 'hidden',
  },
  image: {
    flex: 1,
    padding: spacing.xl,
    justifyContent: 'space-between',
  },
  arcs: {
    top: -40,
    right: -40,
  },
  wordmark: {
    letterSpacing: 2,
  },
  bottom: {
    marginBottom: spacing.md,
  },
  eyebrow: {
    marginBottom: spacing.sm,
  },
  pathName: {
    fontFamily: fontFamily.serifItalic,
    marginBottom: spacing.md,
  },
});
