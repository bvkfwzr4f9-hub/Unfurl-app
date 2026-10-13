import { useEffect, useRef, useState } from 'react';
import {
  View,
  Pressable,
  StyleSheet,
  StyleProp,
  ViewStyle,
  PanResponder,
  Platform,
  LayoutChangeEvent,
} from 'react-native';
import * as Speech from 'expo-speech';
import { useAudioPlayer, useAudioPlayerStatus } from 'expo-audio';
import { colors, spacing, radius } from '@/theme';
import { ThemedText } from './ThemedText';

interface AudioPlayerProps {
  /** Paragraphs to read aloud, in order — used for the on-device speech fallback. */
  paragraphs: string[];
  /** Resolved narration audio URL for this piece (see src/services/narration.ts). Falls back to on-device speech when absent or unreachable (e.g. not generated yet). */
  narrationUrl?: string;
  /** 'dark' for use on dark/photo backgrounds, 'light' for use on cream cards. */
  theme?: 'dark' | 'light';
  style?: StyleProp<ViewStyle>;
}

/**
 * Plays real narration audio when it exists, falling back to on-device
 * speech for pieces that don't have it yet (the narration batch rolls out
 * gradually — see scripts/narration/). Same play/pause/seek/stop UI either
 * way; the two backends are swapped underneath it.
 */
export function AudioPlayer({ paragraphs, narrationUrl, theme = 'dark', style }: AudioPlayerProps) {
  // null = still checking whether the file exists; false = use speech.
  const [audioAvailable, setAudioAvailable] = useState<boolean | null>(narrationUrl ? null : false);

  useEffect(() => {
    if (!narrationUrl) {
      setAudioAvailable(false);
      return;
    }
    let cancelled = false;
    setAudioAvailable(null);
    fetch(narrationUrl, { method: 'HEAD' })
      .then((res) => {
        if (!cancelled) setAudioAvailable(res.ok);
      })
      .catch(() => {
        if (!cancelled) setAudioAvailable(false);
      });
    return () => {
      cancelled = true;
    };
  }, [narrationUrl]);

  // While checking, render the speech player — the check is a single small
  // HEAD request and resolves well before anyone reaches for the play
  // button, so this avoids a layout flash rather than adding a loading state.
  if (audioAvailable) {
    return <RealAudioPlayer url={narrationUrl!} theme={theme} style={style} />;
  }
  return <SpeechPlayer paragraphs={paragraphs} theme={theme} style={style} />;
}

function RealAudioPlayer({
  url,
  theme,
  style,
}: {
  url: string;
  theme: 'dark' | 'light';
  style?: StyleProp<ViewStyle>;
}) {
  const player = useAudioPlayer(url);
  const status = useAudioPlayerStatus(player);
  const [trackWidth, setTrackWidth] = useState(0);

  const duration = status.duration ?? 0;
  const progress = duration > 0 ? Math.min(status.currentTime / duration, 1) : 0;

  function handlePlayPause() {
    if (status.playing) {
      player.pause();
      return;
    }
    if (status.didJustFinish) {
      player.seekTo(0);
    }
    player.play();
  }

  function handleStop() {
    player.pause();
    player.seekTo(0);
  }

  function handleSeek(locationX: number) {
    if (trackWidth === 0 || duration === 0) return;
    const ratio = Math.max(0, Math.min(1, locationX / trackWidth));
    player.seekTo(ratio * duration);
  }

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (event) => handleSeek(event.nativeEvent.locationX),
      onPanResponderMove: (event) => handleSeek(event.nativeEvent.locationX),
    })
  ).current;

  function handleTrackLayout(event: LayoutChangeEvent) {
    setTrackWidth(event.nativeEvent.layout.width);
  }

  const palette = theme === 'dark' ? darkPalette : lightPalette;
  const atStart = status.currentTime === 0 && !status.playing;

  return (
    <View style={[styles.base, { backgroundColor: palette.bg, borderColor: palette.border }, style]}>
      <Pressable onPress={handlePlayPause} hitSlop={8} style={styles.playButton}>
        <ThemedText variant="h3" color={palette.text}>
          {status.playing ? '⏸' : '▶'}
        </ThemedText>
      </Pressable>

      <View style={styles.track} onLayout={handleTrackLayout} {...panResponder.panHandlers}>
        <View style={[styles.trackLine, { backgroundColor: palette.trackLine }]} />
        <View
          style={[
            styles.trackFill,
            { backgroundColor: palette.trackFill, width: `${progress * 100}%` },
          ]}
        />
        <View style={[styles.thumb, { backgroundColor: palette.text, left: `${progress * 100}%` }]} />
      </View>

      <Pressable onPress={handleStop} hitSlop={8} disabled={atStart} style={styles.stopButton}>
        <ThemedText variant="body" color={atStart ? palette.disabled : palette.text}>
          ⏹
        </ThemedText>
      </Pressable>
    </View>
  );
}

type SpeechStatus = 'idle' | 'playing' | 'paused';

// expo-speech doesn't re-export this type from its root module.
type BoundaryEvent = { charIndex: number; charLength: number };

// expo-speech has no native seek — pause()/resume() only exist on iOS/web, and
// nothing can jump to an arbitrary offset mid-utterance. We fake both by
// tracking how far into `text` we are (via onBoundary) and, when we need to
// jump or Android needs to "pause", stopping and re-speaking from that offset.
const CAN_TRUE_PAUSE = Platform.OS === 'ios' || Platform.OS === 'web';

/** On-device speech fallback — used until a piece has real narration uploaded. */
function SpeechPlayer({
  paragraphs,
  theme,
  style,
}: {
  paragraphs: string[];
  theme: 'dark' | 'light';
  style?: StyleProp<ViewStyle>;
}) {
  const text = paragraphs.join('.\n\n');
  const [status, setStatus] = useState<SpeechStatus>('idle');
  const [progress, setProgress] = useState(0); // 0..1, absolute position in `text`
  const [trackWidth, setTrackWidth] = useState(0);

  // Character offset `text` was last (re)started from — absolute charIndex
  // from onBoundary is relative to whatever substring we last passed to speak().
  const baseOffsetRef = useRef(0);
  const statusRef = useRef<SpeechStatus>('idle');
  statusRef.current = status;

  useEffect(() => {
    return () => {
      Speech.stop();
    };
  }, []);

  useEffect(() => {
    Speech.stop();
    baseOffsetRef.current = 0;
    setStatus('idle');
    setProgress(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  function speakFrom(charOffset: number) {
    baseOffsetRef.current = charOffset;
    setProgress(text.length > 0 ? charOffset / text.length : 0);
    Speech.speak(text.slice(charOffset), {
      rate: 0.95,
      onBoundary: (event: BoundaryEvent) => {
        const absolute = baseOffsetRef.current + event.charIndex;
        setProgress(text.length > 0 ? Math.min(absolute / text.length, 1) : 0);
      },
      onDone: () => {
        setStatus('idle');
        setProgress(0);
        baseOffsetRef.current = 0;
      },
      onStopped: () => {
        // Fires for every Speech.stop() call, including our own pause/seek —
        // only the explicit Stop control and text change should reset to idle.
      },
      onError: () => {
        setStatus('idle');
      },
    });
    setStatus('playing');
  }

  function handlePlayPause() {
    if (status === 'idle') {
      speakFrom(0);
    } else if (status === 'playing') {
      if (CAN_TRUE_PAUSE) {
        Speech.pause().catch(() => {});
      } else {
        Speech.stop().catch(() => {});
      }
      setStatus('paused');
    } else {
      if (CAN_TRUE_PAUSE) {
        Speech.resume().catch(() => {});
        setStatus('playing');
      } else {
        speakFrom(Math.round(progress * text.length));
      }
    }
  }

  function handleStop() {
    Speech.stop();
    baseOffsetRef.current = 0;
    setStatus('idle');
    setProgress(0);
  }

  function handleSeek(locationX: number) {
    if (trackWidth === 0) return;
    const ratio = Math.max(0, Math.min(1, locationX / trackWidth));
    setProgress(ratio);
    if (statusRef.current !== 'idle') {
      speakFrom(Math.round(ratio * text.length));
    } else {
      baseOffsetRef.current = Math.round(ratio * text.length);
    }
  }

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (event) => handleSeek(event.nativeEvent.locationX),
      onPanResponderMove: (event) => handleSeek(event.nativeEvent.locationX),
    })
  ).current;

  function handleTrackLayout(event: LayoutChangeEvent) {
    setTrackWidth(event.nativeEvent.layout.width);
  }

  const palette = theme === 'dark' ? darkPalette : lightPalette;

  return (
    <View style={[styles.base, { backgroundColor: palette.bg, borderColor: palette.border }, style]}>
      <Pressable onPress={handlePlayPause} hitSlop={8} style={styles.playButton}>
        <ThemedText variant="h3" color={palette.text}>
          {status === 'playing' ? '⏸' : '▶'}
        </ThemedText>
      </Pressable>

      <View style={styles.track} onLayout={handleTrackLayout} {...panResponder.panHandlers}>
        <View style={[styles.trackLine, { backgroundColor: palette.trackLine }]} />
        <View
          style={[
            styles.trackFill,
            { backgroundColor: palette.trackFill, width: `${progress * 100}%` },
          ]}
        />
        <View style={[styles.thumb, { backgroundColor: palette.text, left: `${progress * 100}%` }]} />
      </View>

      <Pressable onPress={handleStop} hitSlop={8} disabled={status === 'idle'} style={styles.stopButton}>
        <ThemedText variant="body" color={status === 'idle' ? palette.disabled : palette.text}>
          ⏹
        </ThemedText>
      </Pressable>
    </View>
  );
}

const darkPalette = {
  bg: 'rgba(253, 251, 246, 0.08)',
  border: 'rgba(253, 251, 246, 0.14)',
  text: colors.cream100,
  trackLine: 'rgba(253, 251, 246, 0.2)',
  trackFill: colors.sage,
  disabled: colors.creamMuted,
};

const lightPalette = {
  bg: colors.white,
  border: colors.forestDeep,
  text: colors.forestDeep,
  trackLine: colors.border,
  trackFill: colors.forestDeep,
  disabled: colors.woodLight,
};

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.sm + 2,
    paddingHorizontal: spacing.md,
    borderRadius: radius.pill,
    borderWidth: 1,
  },
  playButton: {
    width: 24,
    alignItems: 'center',
  },
  stopButton: {
    width: 24,
    alignItems: 'center',
  },
  track: {
    flex: 1,
    height: 24,
    justifyContent: 'center',
  },
  trackLine: {
    height: 3,
    borderRadius: 1.5,
  },
  trackFill: {
    position: 'absolute',
    height: 3,
    borderRadius: 1.5,
  },
  thumb: {
    position: 'absolute',
    width: 12,
    height: 12,
    borderRadius: 6,
    marginLeft: -6,
  },
});
