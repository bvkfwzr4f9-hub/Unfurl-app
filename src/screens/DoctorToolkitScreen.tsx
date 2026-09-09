import { ScrollView, View, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { colors, spacing, radius, shadow } from '@/theme';
import { ThemedText } from '@/components/ThemedText';
import { Button } from '@/components/Button';
import { conversationStarters, prepChecklist } from '@/data/doctorToolkit';

export function DoctorToolkitScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.screen} edges={['top', 'bottom']}>
      <ScrollView contentContainerStyle={styles.content}>
        <Pressable onPress={() => router.back()} hitSlop={12} style={styles.backButton}>
          <ThemedText variant="bodySmall" color={colors.woodBrown}>
            ← Back
          </ThemedText>
        </Pressable>

        <ThemedText variant="caption" color={colors.sageDark} style={styles.eyebrow}>
          DOCTOR TOOLKIT
        </ThemedText>
        <ThemedText variant="display" style={styles.spacedLarge}>
          Walk in prepared.
        </ThemedText>

        <ThemedText variant="h3" style={styles.sectionTitle}>
          Conversation starters
        </ThemedText>
        {conversationStarters.map((line, index) => (
          <View key={index} style={styles.listRow}>
            <ThemedText variant="body" color={colors.inkMuted}>
              "{line}"
            </ThemedText>
          </View>
        ))}

        <ThemedText variant="h3" style={[styles.sectionTitle, styles.spacedTop]}>
          Before your visit
        </ThemedText>
        {prepChecklist.map((item, index) => (
          <View key={index} style={styles.listRow}>
            <ThemedText variant="body" color={colors.inkMuted}>
              • {item}
            </ThemedText>
          </View>
        ))}

        <View style={styles.card}>
          <ThemedText variant="h3" style={styles.cardTitle}>
            Symptom Log
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
    backgroundColor: colors.cream,
  },
  content: {
    padding: spacing.xl,
    paddingBottom: spacing.huge,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: spacing.lg,
  },
  eyebrow: {
    marginBottom: spacing.md,
  },
  spacedLarge: {
    marginBottom: spacing.xl,
  },
  spacedTop: {
    marginTop: spacing.xl,
  },
  sectionTitle: {
    marginBottom: spacing.md,
  },
  listRow: {
    marginBottom: spacing.md,
  },
  card: {
    backgroundColor: colors.creamLight,
    borderRadius: radius.lg,
    padding: spacing.xl,
    marginTop: spacing.xxl,
    ...shadow.card,
  },
  cardTitle: {
    marginBottom: spacing.sm,
  },
  cardBody: {
    marginBottom: spacing.lg,
  },
});
