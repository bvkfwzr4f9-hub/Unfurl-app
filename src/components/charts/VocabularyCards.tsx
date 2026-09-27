import { View, StyleSheet } from 'react-native';
import { colors, spacing, radius, type, fontFamily } from '@/theme';
import { ThemedText } from '../ThemedText';

// Mirrors Section 1.6's body text exactly — keep both in sync if the glossary grows.
const TERMS = [
  { term: 'Perimenopause', definition: 'The transition years before menopause, when hormones fluctuate and cycles begin to change.' },
  { term: 'Menopause', definition: 'A single point in time: 12 months in a row without a period.' },
  { term: 'Postmenopause', definition: 'Every year that follows that single point in time.' },
  { term: 'Vasomotor symptoms', definition: 'The clinical term for hot flashes and night sweats.' },
  { term: 'Brain fog', definition: 'A real, widely recognized experience — difficulty concentrating and word-finding tied to hormonal fluctuation.' },
  { term: 'HRT (Hormone Replacement Therapy)', definition: "Medical treatment using hormones to ease symptoms — we don't prescribe it, but help you understand it." },
  { term: 'GSM', definition: 'Genitourinary Syndrome of Menopause — vaginal dryness, discomfort, and bladder changes linked to declining estrogen.' },
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
