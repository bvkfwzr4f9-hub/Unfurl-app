import { ScrollView, View, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { colors, spacing, radius } from '@/theme';
import { ThemedText } from '@/components/ThemedText';
import { Button } from '@/components/Button';
import { AudioPlayer } from '@/components/AudioPlayer';
import { conversationStarters, prepChecklist } from '@/data/doctorToolkit';

export function DoctorToolkitScreen() {
  const router = useRouter();
  const listenParagraphs = [
    'What to say.',
    ...conversationStarters,
    'Before your visit.',
    ...prepChecklist,
  ];

  return (
    <SafeAreaView style={styles.screen} edges={['top', 'bottom']}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.navRow}>
          <Pressable onPress={() => router.back()} hitSlop={12}>
            <ThemedText variant="bodySmall" color={colors.woodBrown}>
              ← Back
            </ThemedText>
          </Pressable>
          <Pressable onPress={() => router.replace('/home')} hitSlop={12}>
            <ThemedText variant="bodySmall" color={colors.woodBrown}>
              Home
            </ThemedText>
          </Pressable>
        </View>

        <View style={styles.iconBadge}>
          <ThemedText style={styles.iconEmoji}>🩺</ThemedText>
        </View>
        <ThemedText variant="caption" color={colors.forestDeep} style={styles.eyebrow}>
          DOCTOR TOOLKIT
        </ThemedText>
        <ThemedText variant="display" style={styles.headline}>
          Walk in prepared.
        </ThemedText>
        <ThemedText variant="body" color={colors.inkMuted} style={styles.subhead}>
          A short, structured prep sheet for your next appointment — bring
          it with you, screenshot it, or just review it beforehand.
        </ThemedText>
        <AudioPlayer paragraphs={listenParagraphs} theme="light" style={styles.listenButton} />
        <View style={styles.rule} />

        <ThemedText variant="caption" color={colors.forestDeep} style={styles.sectionLabel}>
          WHAT TO SAY
        </ThemedText>
        {conversationStarters.map((line, index) => (
          <View key={index} style={styles.starterRow}>
            <View style={styles.numberBadge}>
              <ThemedText variant="caption" color={colors.cream100}>
                {index + 1}
              </ThemedText>
            </View>
            <ThemedText variant="body" color={colors.ink} style={styles.starterText}>
              {line}
            </ThemedText>
          </View>
        ))}

        <ThemedText variant="caption" color={colors.forestDeep} style={[styles.sectionLabel, styles.spacedTop]}>
          BEFORE YOUR VISIT
        </ThemedText>
        {prepChecklist.map((item, index) => (
          <View key={index} style={styles.checklistRow}>
            <View style={styles.checkbox} />
            <ThemedText variant="body" color={colors.ink} style={styles.checklistText}>
              {item}
            </ThemedText>
          </View>
        ))}

        <View style={styles.referralCard}>
          <ThemedText variant="caption" color={colors.forestDeep} style={styles.sectionLabel}>
            RECOMMENDED
          </ThemedText>
          <ThemedText variant="h3" style={styles.cardTitle}>
            Bring your Symptom Log
          </ThemedText>
          <ThemedText variant="body" color={colors.inkMuted} style={styles.cardBody}>
            Track symptoms over time and export a clean PDF to bring to your
            next appointment. Part of membership.
          </ThemedText>
          <Button label="Open Symptom Log" variant="primary" onPress={() => router.push('/symptom-log')} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.creamLight,
  },
  content: {
    padding: spacing.xl,
    paddingBottom: spacing.huge,
  },
  navRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  iconBadge: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 1.5,
    borderColor: colors.forestDeep,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  iconEmoji: {
    fontSize: 26,
    lineHeight: 34,
  },
  eyebrow: {
    letterSpacing: 1.5,
    marginBottom: spacing.sm,
  },
  headline: {
    marginBottom: spacing.md,
  },
  subhead: {
    marginBottom: spacing.lg,
  },
  listenButton: {
    marginBottom: spacing.lg,
  },
  rule: {
    height: 1,
    backgroundColor: colors.woodBrown,
    opacity: 0.3,
    marginBottom: spacing.xl,
  },
  sectionLabel: {
    letterSpacing: 1.5,
    marginBottom: spacing.md,
  },
  spacedTop: {
    marginTop: spacing.xl,
  },
  starterRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    backgroundColor: colors.white,
  },
  numberBadge: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: colors.forestDeep,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
    marginTop: 1,
  },
  starterText: {
    flex: 1,
  },
  checklistRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingVertical: spacing.md,
  },
  checkbox: {
    width: 16,
    height: 16,
    borderRadius: 3,
    borderWidth: 1.5,
    borderColor: colors.woodBrown,
    marginRight: spacing.md,
    marginTop: 2,
  },
  checklistText: {
    flex: 1,
  },
  referralCard: {
    backgroundColor: colors.white,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.forestDeep,
    padding: spacing.xl,
    marginTop: spacing.xxl,
  },
  cardTitle: {
    marginBottom: spacing.sm,
  },
  cardBody: {
    marginBottom: spacing.lg,
  },
});
