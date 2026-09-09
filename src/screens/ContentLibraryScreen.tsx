import { ScrollView, Pressable, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { colors, spacing, radius, shadow } from '@/theme';
import { ThemedText } from '@/components/ThemedText';
import { contentLibrary } from '@/data/contentLibrary';

export function ContentLibraryScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.screen} edges={['top', 'bottom']}>
      <ScrollView contentContainerStyle={styles.content}>
        <ThemedText variant="caption" color={colors.sageDark} style={styles.eyebrow}>
          THE LIBRARY
        </ThemedText>
        <ThemedText variant="display" style={styles.headline}>
          11 sections, at your pace.
        </ThemedText>
        <ThemedText variant="body" color={colors.inkMuted} style={styles.subhead}>
          General information, not medical advice — start wherever feels most
          relevant right now.
        </ThemedText>

        {contentLibrary.map((section) => (
          <Pressable
            key={section.slug}
            onPress={() => router.push(`/library/${section.slug}`)}
            style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
          >
            <View style={styles.cardHeader}>
              <ThemedText variant="h3">{section.title}</ThemedText>
              {section.isPremium && (
                <ThemedText variant="caption" color={colors.woodBrown}>
                  PREMIUM
                </ThemedText>
              )}
            </View>
            <ThemedText variant="bodySmall" color={colors.inkMuted}>
              {section.summary}
            </ThemedText>
          </Pressable>
        ))}
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
  eyebrow: {
    marginBottom: spacing.md,
  },
  headline: {
    marginBottom: spacing.md,
  },
  subhead: {
    marginBottom: spacing.xl,
  },
  card: {
    backgroundColor: colors.creamLight,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    ...shadow.card,
  },
  cardPressed: {
    opacity: 0.85,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
});
