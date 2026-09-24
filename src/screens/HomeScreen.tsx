import { useEffect, useRef, useState } from 'react';
import { ScrollView, View, ImageBackground, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { colors, spacing, radius } from '@/theme';
import { ThemedText } from '@/components/ThemedText';
import { ProgressBar } from '@/components/ProgressBar';
import { useRequireAuth } from '@/services/useRequireAuth';
import { useUserProfile } from '@/services/useUserProfile';
import { getYourPlan } from '@/services/recommendations';
import { recordDailyVisit } from '@/services/gamification';
import { getLevelProgress, GAME_LEVELS, type GameLevel } from '@/data/gameLevels';
import { getEarnedAchievements } from '@/data/achievements';
import { contentLibrary } from '@/data/contentLibrary';
import { BrandArcs } from '@/components/BrandArcs';
import { LevelUpBanner } from '@/components/LevelUpBanner';
import { subscribeToSymptomLogs, type SymptomLogEntry } from '@/services/symptomLog';
import { subscribeToHabits, isHabitDoneToday, type Habit } from '@/services/habits';

const STEP_TYPE_EMOJI: Record<string, string> = {
  article: '📖',
  video: '🎥',
  practice: '🌱',
};

export function HomeScreen() {
  const router = useRouter();
  const { user, initializing } = useRequireAuth();
  const profile = useUserProfile(user?.uid);
  const [symptomEntries, setSymptomEntries] = useState<SymptomLogEntry[]>([]);
  const [habits, setHabits] = useState<Habit[]>([]);
  const [leveledUpTo, setLeveledUpTo] = useState<GameLevel | null>(null);
  const previousLevelId = useRef<string | null>(null);
  const hasInitializedLevel = useRef(false);

  useEffect(() => {
    if (!user || !profile) return;
    recordDailyVisit(user.uid, profile.lastActiveDate, profile.streakDays);
    // Only re-run if the identity of the user or their stored streak state
    // changes — not on every profile field update (points/completedSteps
    // etc. change far more often and would spam this write).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, profile?.lastActiveDate]);

  useEffect(() => {
    if (!user) return;
    return subscribeToSymptomLogs(user.uid, setSymptomEntries);
  }, [user]);

  useEffect(() => {
    if (!user) return;
    return subscribeToHabits(user.uid, setHabits);
  }, [user]);

  useEffect(() => {
    if (!profile) return;
    const currentId = getLevelProgress(profile.points ?? 0).level.id;

    if (!hasInitializedLevel.current) {
      // Don't celebrate the level a returning member is already at.
      hasInitializedLevel.current = true;
      previousLevelId.current = currentId;
      return;
    }

    if (previousLevelId.current && previousLevelId.current !== currentId) {
      const previousIndex = GAME_LEVELS.findIndex((l) => l.id === previousLevelId.current);
      const currentIndex = GAME_LEVELS.findIndex((l) => l.id === currentId);
      if (currentIndex > previousIndex) {
        setLeveledUpTo(GAME_LEVELS[currentIndex]);
      }
    }
    previousLevelId.current = currentId;
  }, [profile?.points]);

  if (initializing || !user) {
    return <View style={styles.screen} />;
  }

  const isActive = profile?.subscriptionStatus === 'active';
  const hasCompletedIntake = !!profile?.intakeCompletedAt;
  const plan =
    isActive && hasCompletedIntake
      ? getYourPlan(profile?.intake, profile?.completedSteps ?? [])
      : [];
  const levelProgress = getLevelProgress(profile?.points ?? 0);
  const earnedAchievements = profile ? getEarnedAchievements(profile) : [];

  return (
    <>
      <ImageBackground
        source={require('../../assets/images/brand/wood-grain-dark.jpg')}
        style={styles.background}
      >
      <LinearGradient
        colors={['rgba(22, 36, 27, 0.55)', 'rgba(22, 36, 27, 0.8)', 'rgba(15, 24, 18, 0.92)']}
        locations={[0, 0.4, 1]}
        style={StyleSheet.absoluteFill}
      />
      <SafeAreaView style={styles.screen} edges={['top', 'bottom']}>
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.headerRow}>
            <View>
              <ThemedText variant="caption" color={colors.sage} style={styles.eyebrow}>
                {isActive ? 'MEMBER' : 'FREE PLAN'}
              </ThemedText>
              <ThemedText variant="display" color={colors.cream100}>
                Welcome back.
              </ThemedText>
            </View>
          </View>

          {/* Level + streak */}
          <View style={[styles.glassCard, styles.levelCard]}>
            <BrandArcs size={150} style={styles.cornerArcs} />
            <View style={styles.levelHeader}>
              <ThemedText variant="h2" color={colors.cream100}>
                {levelProgress.level.emoji} {levelProgress.level.name}
              </ThemedText>
              {(profile?.streakDays ?? 0) > 1 && (
                <ThemedText variant="bodySmall" color={colors.sage}>
                  🔥 {profile?.streakDays}-day streak
                </ThemedText>
              )}
            </View>
            <ProgressBar progress={levelProgress.progress} />
            <ThemedText variant="bodySmall" color={colors.creamMuted} style={styles.levelSubtext}>
              {levelProgress.nextLevel
                ? `${levelProgress.pointsToNextLevel} pts to ${levelProgress.nextLevel.name} ${levelProgress.nextLevel.emoji}`
                : `${profile?.points ?? 0} pts — fully unfurled!`}
            </ThemedText>

            {earnedAchievements.length > 0 && (
              <View style={styles.badgeRow}>
                {earnedAchievements.map((achievement) => (
                  <View key={achievement.id} style={styles.badge}>
                    <ThemedText variant="bodySmall" color={colors.cream100}>
                      {achievement.emoji} {achievement.title}
                    </ThemedText>
                  </View>
                ))}
              </View>
            )}
          </View>

          {/* Quick actions — side by side, not stacked */}
          <View style={styles.quickActionsRow}>
            <Pressable
              onPress={() => router.push('/symptom-log')}
              style={({ pressed }) => [
                styles.glassCard,
                styles.quickActionCard,
                pressed && styles.cardPressed,
              ]}
            >
              <ThemedText style={styles.quickActionEmoji}>📋</ThemedText>
              <ThemedText variant="h3" color={colors.cream100} style={styles.quickActionTitle}>
                Symptom Log
              </ThemedText>
              <ThemedText variant="caption" color={colors.creamMuted}>
                {symptomEntries.length === 0
                  ? 'Start tracking'
                  : `${symptomEntries.length} logged`}
              </ThemedText>
            </Pressable>

            <Pressable
              onPress={() => router.push('/habits')}
              style={({ pressed }) => [
                styles.glassCard,
                styles.quickActionCard,
                pressed && styles.cardPressed,
              ]}
            >
              <ThemedText style={styles.quickActionEmoji}>✅</ThemedText>
              <ThemedText variant="h3" color={colors.cream100} style={styles.quickActionTitle}>
                Daily Habits
              </ThemedText>
              <ThemedText variant="caption" color={colors.creamMuted}>
                {habits.length === 0
                  ? 'Start building'
                  : `${habits.filter(isHabitDoneToday).length}/${habits.length} today`}
              </ThemedText>
            </Pressable>

            <Pressable
              onPress={() => router.push('/doctor-toolkit')}
              style={({ pressed }) => [
                styles.glassCard,
                styles.quickActionCard,
                pressed && styles.cardPressed,
              ]}
            >
              <ThemedText style={styles.quickActionEmoji}>🩺</ThemedText>
              <ThemedText variant="h3" color={colors.cream100} style={styles.quickActionTitle}>
                Doctor Toolkit
              </ThemedText>
              <ThemedText variant="caption" color={colors.creamMuted}>
                Prep for your visit
              </ThemedText>
            </Pressable>
          </View>

          {!hasCompletedIntake && (
            <Pressable
              onPress={() => router.push('/intake')}
              style={({ pressed }) => [
                styles.glassCard,
                styles.highlightCard,
                pressed && styles.cardPressed,
              ]}
            >
              <ThemedText variant="h3" color={colors.cream100} style={styles.cardTitle}>
                Complete your intake
              </ThemedText>
              <ThemedText variant="body" color={colors.creamMuted}>
                A few questions so we can point you toward what matters most,
                first.
              </ThemedText>
            </Pressable>
          )}

          {isActive && hasCompletedIntake && (
            <View style={styles.railBlock}>
              <ThemedText variant="caption" color={colors.sage} style={styles.railLabel}>
                YOUR PLAN
              </ThemedText>
              {plan.length > 0 ? (
                <View style={[styles.glassCard, styles.planCard]}>
                  {plan.map((item, index) => (
                    <Pressable
                      key={`${item.sectionSlug}:${item.stepId}`}
                      onPress={() => router.push(`/library/${item.sectionSlug}/${item.stepId}`)}
                      style={({ pressed }) => [
                        styles.planRow,
                        index < plan.length - 1 && styles.planRowBorder,
                        pressed && styles.cardPressed,
                      ]}
                    >
                      <ThemedText style={styles.planEmoji}>
                        {STEP_TYPE_EMOJI[item.stepType]}
                      </ThemedText>
                      <View style={styles.planTextBlock}>
                        <ThemedText variant="caption" color={colors.sage}>
                          {item.sectionEmoji} {item.sectionTitle}
                        </ThemedText>
                        <ThemedText variant="h3" color={colors.cream100}>
                          {item.stepTitle}
                        </ThemedText>
                      </View>
                      <ThemedText variant="h3" color={colors.creamMuted}>
                        ›
                      </ThemedText>
                    </Pressable>
                  ))}
                </View>
              ) : (
                <View style={[styles.glassCard, styles.planEmptyCard]}>
                  <ThemedText variant="body" color={colors.creamMuted}>
                    You've completed everything recommended for you — nice
                    work. Explore the full library below for what's next.
                  </ThemedText>
                </View>
              )}
            </View>
          )}

          <View style={styles.railBlock}>
            <ThemedText variant="caption" color={colors.sage} style={styles.railLabel}>
              EXPLORE THE LIBRARY
            </ThemedText>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.railContent}
              decelerationRate="fast"
              snapToInterval={132}
            >
              {contentLibrary.map((section) => (
                <Pressable
                  key={section.slug}
                  onPress={() => router.push(`/library/${section.slug}`)}
                  style={({ pressed }) => [
                    styles.glassCard,
                    styles.libraryRailCard,
                    pressed && styles.cardPressed,
                  ]}
                >
                  <ThemedText style={styles.libraryRailEmoji}>{section.emoji}</ThemedText>
                  <ThemedText
                    variant="bodySmall"
                    color={colors.cream100}
                    style={styles.libraryRailTitle}
                    numberOfLines={3}
                  >
                    {section.title}
                  </ThemedText>
                </Pressable>
              ))}
              <Pressable
                onPress={() => router.push('/library')}
                style={({ pressed }) => [
                  styles.glassCard,
                  styles.libraryRailCard,
                  styles.seeAllCard,
                  pressed && styles.cardPressed,
                ]}
              >
                <ThemedText variant="h3" color={colors.sage}>
                  →
                </ThemedText>
                <ThemedText variant="bodySmall" color={colors.sage} style={styles.libraryRailTitle}>
                  See all 12
                </ThemedText>
              </Pressable>
            </ScrollView>
          </View>

          {!isActive && (
            <Pressable
              onPress={() => router.push('/paywall')}
              style={({ pressed }) => [styles.upgradeCard, pressed && styles.cardPressed]}
            >
              <ThemedText variant="h3" color={colors.forestDark} style={styles.cardTitle}>
                {hasCompletedIntake ? 'Your personalized plan is ready' : 'Upgrade to full membership'}
              </ThemedText>
              <ThemedText variant="bodySmall" color={colors.forestDeep}>
                {hasCompletedIntake
                  ? 'Unlock the recommendations built from your answers, plus the full library and symptom log.'
                  : 'Unlock the full library and the symptom log.'}
              </ThemedText>
            </Pressable>
          )}

          <Pressable onPress={() => router.push('/account')} style={styles.signOut}>
            <ThemedText variant="bodySmall" color={colors.creamMuted}>
              Account
            </ThemedText>
          </Pressable>
        </ScrollView>
      </SafeAreaView>
      </ImageBackground>
      <LevelUpBanner level={leveledUpTo} onDismiss={() => setLeveledUpTo(null)} />
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  background: {
    flex: 1,
    backgroundColor: colors.forestDark,
  },
  content: {
    padding: spacing.xl,
    paddingBottom: spacing.huge,
  },
  headerRow: {
    marginBottom: spacing.xl,
  },
  eyebrow: {
    marginBottom: spacing.md,
  },
  glassCard: {
    backgroundColor: 'rgba(253, 251, 246, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(253, 251, 246, 0.14)',
    borderRadius: radius.lg,
  },
  cardPressed: {
    opacity: 0.8,
  },
  cornerArcs: {
    top: -30,
    right: -30,
  },
  levelCard: {
    padding: spacing.lg,
    marginBottom: spacing.lg,
    overflow: 'hidden',
  },
  levelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  levelSubtext: {
    marginTop: spacing.sm,
  },
  badgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginTop: spacing.lg,
  },
  badge: {
    backgroundColor: 'rgba(253, 251, 246, 0.12)',
    borderRadius: radius.pill,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
  },
  quickActionsRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  quickActionCard: {
    flex: 1,
    padding: spacing.lg,
  },
  quickActionEmoji: {
    fontSize: 26,
    lineHeight: 34,
    marginBottom: spacing.sm,
  },
  quickActionTitle: {
    marginBottom: spacing.xs,
  },
  highlightCard: {
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  cardTitle: {
    marginBottom: spacing.xs,
  },
  railBlock: {
    marginBottom: spacing.lg,
  },
  railLabel: {
    marginBottom: spacing.md,
  },
  railContent: {
    paddingRight: spacing.md,
  },
  planCard: {
    overflow: 'hidden',
  },
  planEmptyCard: {
    padding: spacing.lg,
  },
  planRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
  },
  planRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(253, 251, 246, 0.1)',
  },
  planEmoji: {
    fontSize: 22,
    lineHeight: 30,
    marginRight: spacing.md,
  },
  planTextBlock: {
    flex: 1,
    marginRight: spacing.sm,
  },
  libraryRailCard: {
    width: 116,
    minHeight: 116,
    padding: spacing.md,
    marginRight: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  libraryRailEmoji: {
    fontSize: 28,
    lineHeight: 36,
    marginBottom: spacing.sm,
  },
  libraryRailTitle: {
    textAlign: 'center',
  },
  seeAllCard: {
    backgroundColor: 'rgba(159, 185, 143, 0.12)',
    borderColor: 'rgba(159, 185, 143, 0.35)',
  },
  upgradeCard: {
    backgroundColor: colors.sageLight,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  signOut: {
    alignSelf: 'center',
    marginTop: spacing.lg,
  },
});
