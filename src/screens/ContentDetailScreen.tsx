import { ScrollView, View, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useVideoPlayer, VideoView } from 'expo-video';
import { colors, spacing, radius } from '@/theme';
import { ThemedText } from '@/components/ThemedText';
import { Button } from '@/components/Button';
import { PremiumLock } from '@/components/PremiumLock';
import { getContentSection } from '@/data/contentLibrary';
import { getStreamPlaybackUrl } from '@/services/cloudflareStream';
import { useAuth } from '@/services/useAuth';
import { useUserProfile } from '@/services/useUserProfile';
import { setSectionWatched } from '@/services/subscription';

function StreamVideoPlayer({ videoId }: { videoId: string }) {
  const player = useVideoPlayer(getStreamPlaybackUrl(videoId), (instance) => {
    instance.loop = false;
  });

  return <VideoView player={player} style={styles.video} nativeControls />;
}

export function ContentDetailScreen() {
  const router = useRouter();
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const { user } = useAuth();
  const profile = useUserProfile(user?.uid);

  const section = getContentSection(typeof slug === 'string' ? slug : '');

  if (!section) {
    return (
      <SafeAreaView style={styles.screen} edges={['top', 'bottom']}>
        <View style={styles.content}>
          <ThemedText variant="h2">Section not found.</ThemedText>
        </View>
      </SafeAreaView>
    );
  }

  const isLocked = section.isPremium && profile?.subscriptionStatus !== 'active';
  const isWatched = !!profile?.watchedSections.includes(section.slug);

  return (
    <SafeAreaView style={styles.screen} edges={['top', 'bottom']}>
      <ScrollView contentContainerStyle={styles.content}>
        <Pressable onPress={() => router.back()} hitSlop={12} style={styles.backButton}>
          <ThemedText variant="bodySmall" color={colors.woodBrown}>
            ← Back
          </ThemedText>
        </Pressable>

        {section.isPremium && (
          <ThemedText variant="caption" color={colors.woodBrown} style={styles.premiumLabel}>
            MEMBERS
          </ThemedText>
        )}
        <ThemedText variant="display" style={styles.title}>
          {section.title}
        </ThemedText>

        {section.videoId && <StreamVideoPlayer videoId={section.videoId} />}

        <ThemedText variant="bodyLarge" color={colors.ink} style={styles.paragraph}>
          {section.teaser}
        </ThemedText>

        {isLocked ? (
          <PremiumLock
            message={
              user
                ? 'Upgrade to unlock the rest of this section, along with the rest of the membership library.'
                : 'Sign in and upgrade to unlock the rest of this section, along with the rest of the membership library.'
            }
            ctaLabel={user ? 'See membership options' : 'Sign in'}
            onPress={() => router.push(user ? '/paywall' : '/auth')}
          />
        ) : (
          <>
            {section.body.map((paragraph, index) => (
              <ThemedText
                key={index}
                variant="bodyLarge"
                color={colors.ink}
                style={styles.paragraph}
              >
                {paragraph}
              </ThemedText>
            ))}

            {section.slug === 'doctor-talk-toolkit' && (
              <Button
                label="Open the full Doctor Toolkit"
                variant="secondary"
                onPress={() => router.push('/doctor-toolkit')}
                style={styles.toolkitButton}
              />
            )}

            <View style={styles.disclaimer}>
              <ThemedText variant="bodySmall" color={colors.inkMuted}>
                General information only, not medical advice. If something
                here concerns you, it's worth bringing to a doctor.
              </ThemedText>
            </View>

            {user && (
              <Pressable
                onPress={() => setSectionWatched(user.uid, section.slug, !isWatched)}
                style={styles.watchedRow}
              >
                <ThemedText variant="bodySmall" color={isWatched ? colors.sageDark : colors.woodBrown}>
                  {isWatched ? '✓ Marked as done' : 'Mark as done'}
                </ThemedText>
              </Pressable>
            )}
          </>
        )}
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
  premiumLabel: {
    marginBottom: spacing.sm,
  },
  title: {
    marginBottom: spacing.lg,
  },
  paragraph: {
    marginBottom: spacing.lg,
  },
  video: {
    width: '100%',
    height: 220,
    borderRadius: radius.lg,
    marginBottom: spacing.lg,
    backgroundColor: colors.forestDark,
  },
  toolkitButton: {
    marginBottom: spacing.lg,
  },
  disclaimer: {
    marginTop: spacing.md,
  },
  watchedRow: {
    alignSelf: 'flex-start',
    marginTop: spacing.xl,
  },
});
