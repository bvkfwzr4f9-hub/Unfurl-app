import { View, StyleSheet } from 'react-native';
import { colors, spacing, radius, type, fontFamily } from '@/theme';
import { ThemedText } from '../ThemedText';

// Verbatim from Section 1.6's body text — keep both in sync if the glossary
// changes, so the audio narration matches exactly.
const TERMS = [
  {
    term: 'Perimenopause',
    definition:
      'The long run-up — sometimes years — before your periods stop for good, when hormones don\'t decline smoothly so much as lurch. This is usually when symptoms start, often well before anyone mentions the word "menopause" at all.',
  },
  {
    term: 'Menopause',
    definition:
      "Strictly speaking, a single day: the one that marks twelve full months since your last period. Most people use the word loosely to mean the whole transition, but technically, it's one specific point you pass through, not a place you stay.",
  },
  { term: 'Postmenopause', definition: 'Everything after that day — the rest of the map.' },
  {
    term: 'Vasomotor symptoms',
    definition:
      "The clinical umbrella for hot flashes and night sweats. If a doctor uses this phrase, you'll know exactly what's being discussed.",
  },
  {
    term: 'Brain fog',
    definition:
      "Not an official diagnosis, but a real, widely recognized experience: trouble concentrating, losing a word mid-sentence, forgetfulness that tracks with your hormones, not your character.",
  },
  {
    term: 'HRT (Hormone Replacement Therapy / MHT)',
    definition:
      "Medical treatment using hormones to ease symptoms. We don't prescribe it here — but we'll make sure you understand it clearly enough to ask your own doctor a real, specific question.",
  },
];

/** Section 1.6 — the glossary as term cards instead of a wall of "Term — definition" paragraphs. */
export function VocabularyCards() {
  return (
    <View style={styles.stack}>
      {TERMS.map((item) => (
        <View key={item.term} style={styles.card}>
          <ThemedText style={[type.h3, styles.term]} color={colors.cream100}>
            {item.term}
          </ThemedText>
          <ThemedText variant="bodySmall" color={colors.creamMuted}>
            {item.definition}
          </ThemedText>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  stack: {
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  card: {
    backgroundColor: 'rgba(253, 251, 246, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(253, 251, 246, 0.14)',
    borderRadius: radius.md,
    padding: spacing.md + 2,
    gap: spacing.xs,
  },
  term: {
    fontFamily: fontFamily.serifBold,
  },
});
