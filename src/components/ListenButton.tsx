import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import * as Speech from 'expo-speech';
import { colors, spacing, radius } from '@/theme';
import { ThemedText } from './ThemedText';

interface ListenButtonProps {
  /** Paragraphs to read aloud, in order. */
  paragraphs: string[];
  /** 'dark' for use on dark/photo backgrounds, 'light' for use on cream cards. */
  theme?: 'dark' | 'light';
  style?: StyleProp<ViewStyle>;
}

/**
 * A small toggle that reads the given text aloud with the on-device voice,
 * for anyone who'd rather listen than read. No audio files needed — this
 * covers every piece of content today, ahead of any real narration.
 */
export function ListenButton({ paragraphs, theme = 'dark', style }: ListenButtonProps) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const text = paragraphs.join('.\n\n');

  useEffect(() => {
    return () => {
      Speech.stop();
    };
  }, []);

  useEffect(() => {
    Speech.stop();
    setIsSpeaking(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  function toggle() {
    if (isSpeaking) {
      Speech.stop();
      setIsSpeaking(false);
      return;
    }
    setIsSpeaking(true);
    Speech.speak(text, {
      rate: 0.95,
      onDone: () => setIsSpeaking(false),
      onStopped: () => setIsSpeaking(false),
      onError: () => setIsSpeaking(false),
    });
  }

  const palette = theme === 'dark' ? darkPalette : lightPalette;

  return (
    <Pressable
      onPress={toggle}
      style={[styles.base, { backgroundColor: palette.bg, borderColor: palette.border }, style]}
      hitSlop={8}
    >
      <ThemedText variant="bodySmall" color={palette.text}>
        {isSpeaking ? '⏹ Stop listening' : '🔊 Listen to this'}
      </ThemedText>
    </Pressable>
  );
}

const darkPalette = {
  bg: 'rgba(253, 251, 246, 0.08)',
  border: 'rgba(253, 251, 246, 0.14)',
  text: colors.cream100,
};

const lightPalette = {
  bg: colors.white,
  border: colors.forestDeep,
  text: colors.forestDeep,
};

const styles = StyleSheet.create({
  base: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: radius.pill,
    borderWidth: 1,
  },
});
