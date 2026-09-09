import { ScrollView, View, Pressable, Linking, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { colors, spacing, radius, shadow } from '@/theme';
import { ThemedText } from '@/components/ThemedText';
import { Button } from '@/components/Button';
import { upcomingEvents } from '@/data/events';

export function EventsScreen() {
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
          VIRTUAL EVENTS
        </ThemedText>
        <ThemedText variant="display" style={styles.spacedLarge}>
          Live, together.
        </ThemedText>

        {upcomingEvents.map((event) => {
          const hasLink = event.zoomUrl !== 'REPLACE_ME';
          return (
            <View key={event.id} style={styles.card}>
              <ThemedText variant="h3" style={styles.cardTitle}>
                {event.title}
              </ThemedText>
              <ThemedText variant="caption" color={colors.woodBrown} style={styles.cardDate}>
                {event.dateLabel.toUpperCase()}
              </ThemedText>
              <ThemedText variant="body" color={colors.inkMuted} style={styles.cardBody}>
                {event.description}
              </ThemedText>
              <Button
                label={hasLink ? 'Join on Zoom' : 'Link coming soon'}
                variant="primary"
                disabled={!hasLink}
                onPress={() => Linking.openURL(event.zoomUrl)}
              />
            </View>
          );
        })}
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
  card: {
    backgroundColor: colors.creamLight,
    borderRadius: radius.lg,
    padding: spacing.xl,
    marginBottom: spacing.lg,
    ...shadow.card,
  },
  cardTitle: {
    marginBottom: spacing.xs,
  },
  cardDate: {
    marginBottom: spacing.md,
  },
  cardBody: {
    marginBottom: spacing.lg,
  },
});
