import { Modal, View, ImageBackground, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing, radius, type as typeScale, fontFamily } from '@/theme';
import { ThemedText } from './ThemedText';
import { Button } from './Button';
import { BrandArcs } from './BrandArcs';
import type { GameLevel } from '@/data/gameLevels';

interface LevelUpBannerProps {
  level: GameLevel | null;
  onDismiss: () => void;
}

/** Celebratory pop-up shown the moment a member crosses into a new level. */
export function LevelUpBanner({ level, onDismiss }: LevelUpBannerProps) {
  return (
    <Modal visible={!!level} transparent animationType="fade" onRequestClose={onDismiss}>
      <View style={styles.backdrop}>
        <ImageBackground
          source={require('../../assets/images/brand/fern-spiral.jpg')}
          style={styles.card}
          imageStyle={styles.cardImage}
        >
          <LinearGradient
            colors={['rgba(22, 36, 27, 0.3)', 'rgba(22, 36, 27, 0.88)']}
            style={StyleSheet.absoluteFill}
          />
          <BrandArcs size={170} style={styles.arcs} />

          <ThemedText variant="caption" color={colors.sage} style={styles.eyebrow}>
            LEVEL UP
          </ThemedText>
          {level && (
            <>
              <ThemedText style={[typeScale.display, styles.levelName]} color={colors.cream100}>
                {level.name}
              </ThemedText>
              <ThemedText variant="body" color={colors.creamMuted} style={styles.message}>
                You've grown into a new stage — real progress, from real
                engagement.
              </ThemedText>
            </>
          )}

          <Button label="Keep going" variant="secondary" onPress={onDismiss} style={styles.button} />
        </ImageBackground>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(15, 24, 18, 0.7)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  card: {
    width: '100%',
    maxWidth: 360,
    borderRadius: radius.xl,
    overflow: 'hidden',
    padding: spacing.xxl,
    alignItems: 'center',
  },
  cardImage: {
    borderRadius: radius.xl,
  },
  arcs: {
    top: -40,
    right: -40,
  },
  eyebrow: {
    letterSpacing: 2,
    marginBottom: spacing.lg,
  },
  levelName: {
    fontFamily: fontFamily.serifItalic,
    marginTop: spacing.md,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  message: {
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  button: {
    minWidth: 160,
  },
});
