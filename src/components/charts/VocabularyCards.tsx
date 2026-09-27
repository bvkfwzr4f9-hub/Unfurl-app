import { View, StyleSheet } from 'react-native';
import { colors, spacing, radius, type, fontFamily } from '@/theme';
import { ThemedText } from '../ThemedText';

// Verbatim from Section 1.6's body text (the part after the em dash) — keep
// both in sync if the glossary grows, so the audio narration matches exactly.
const TERMS = [
  {
    term: 'Perimenopause',
    definition:
      'The transitional years leading up to your final period, when hormones fluctuate rather than steadily decline. This is often when symptoms start — sometimes years before periods actually stop.',
  },
  {
    term: 'Menopause',
    definition:
      'Technically, a single point in time: the day marking 12 full months since your last period. Everything after that is "postmenopause," though most people use "menopause" loosely to mean the whole transition.',
  },
  { term: 'Postmenopause', definition: 'Every year that follows that single point in time.' },
  {
    term: 'Vasomotor symptoms',
    definition:
      "The clinical term for hot flashes and night sweats. If a doctor uses this phrase, now you'll know exactly what they mean.",
  },
  {
    term: 'Brain fog',
    definition:
      'Not a formal medical diagnosis, but a widely recognized, real experience: difficulty concentrating, word-finding trouble, forgetfulness tied to hormonal fluctuation.',
  },
  {
    term: 'HRT (Hormone Replacement Therapy)',
    definition:
      "Medical treatment using hormones to ease symptoms. We don't prescribe or deliver HRT here — but we'll help you understand it well enough to have an informed conversation with your doctor.",
  },
  {
    term: 'GSM (Genitourinary Syndrome of Menopause)',
    definition:
      'Vaginal dryness, discomfort, and related bladder changes linked to declining estrogen. Covered in full in the Sexual Health section.',
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
