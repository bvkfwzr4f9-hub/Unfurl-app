import { useEffect, useState } from 'react';
import { ScrollView, View, ImageBackground, Pressable, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { colors, spacing, radius } from '@/theme';
import { ThemedText } from '@/components/ThemedText';
import { Button } from '@/components/Button';
import { TextField } from '@/components/TextField';
import { BrandArcs } from '@/components/BrandArcs';
import { useRequireAuth } from '@/services/useRequireAuth';
import {
  addHabit,
  removeHabit,
  subscribeToHabits,
  toggleHabitToday,
  isHabitDoneToday,
  getHabitStreak,
  type Habit,
  type NewHabit,
} from '@/services/habits';
import { POINTS } from '@/services/gamification';

const PRESET_HABITS: NewHabit[] = [
  { emoji: '🌬️', label: 'Breathing exercise' },
  { emoji: '🏃', label: 'Movement' },
  { emoji: '💧', label: 'Hydration' },
  { emoji: '😴', label: 'Sleep wind-down' },
  { emoji: '📝', label: 'Journaling' },
  { emoji: '🙏', label: 'Gratitude' },
  { emoji: '🧘', label: 'Meditation' },
  { emoji: '🌿', label: 'Time outside' },
];

export function DailyHabitsScreen() {
  const router = useRouter();
  const { user, initializing } = useRequireAuth();
  const [habits, setHabits] = useState<Habit[]>([]);
  const [customLabel, setCustomLabel] = useState('');
  const [pendingIds, setPendingIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!user) return;
    return subscribeToHabits(user.uid, setHabits);
  }, [user]);

  if (initializing || !user) {
    return <View style={styles.screen} />;
  }

  const existingLabels = new Set(habits.map((h) => h.label.toLowerCase()));
  const availablePresets = PRESET_HABITS.filter(
    (preset) => !existingLabels.has(preset.label.toLowerCase())
  );

  async function handleAddPreset(preset: NewHabit) {
    if (!user) return;
    await addHabit(user.uid, preset);
  }

  async function handleAddCustom() {
    if (!user || customLabel.trim().length === 0) return;
    await addHabit(user.uid, { emoji: '✅', label: customLabel.trim() });
    setCustomLabel('');
  }

  async function handleToggle(habit: Habit) {
    if (!user || pendingIds.has(habit.id)) return;
    setPendingIds((prev) => new Set(prev).add(habit.id));
    await toggleHabitToday(user.uid, habit);
    setPendingIds((prev) => {
      const next = new Set(prev);
      next.delete(habit.id);
      return next;
    });
  }

  function handleRemove(habit: Habit) {
    if (!user) return;
    Alert.alert('Remove this habit?', `"${habit.label}" and its streak will be gone for good.`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Remove', style: 'destructive', onPress: () => removeHabit(user.uid, habit.id) },
    ]);
  }

  return (
    <ImageBackground
      source={require('../../assets/images/brand/wood-grain-dark.jpg')}
      style={styles.background}
    >
      <LinearGradient
        colors={['rgba(22, 36, 27, 0.55)', 'rgba(22, 36, 27, 0.8)', 'rgba(15, 24, 18, 0.92)']}
        locations={[0, 0.35, 1]}
        style={StyleSheet.absoluteFill}
      />
      <BrandArcs size={190} style={styles.headerArcs} />
      <SafeAreaView style={styles.screen} edges={['top', 'bottom']}>
        <ScrollView contentContainerStyle={styles.content}>
          <Pressable onPress={() => router.back()} hitSlop={12} style={styles.backButton}>
            <ThemedText variant="bodySmall" color={colors.sage}>
              ← Back
            </ThemedText>
          </Pressable>

          <ThemedText variant="caption" color={colors.sage} style={styles.eyebrow}>
            DAILY HABITS
          </ThemedText>
          <ThemedText variant="display" color={colors.cream100} style={styles.headline}>
            Build what you want to do daily.
          </ThemedText>
          <ThemedText variant="body" color={colors.creamMuted} style={styles.subhead}>
            Breathing exercises, movement, journaling — whatever you want to
            stick with. Tap it done each day you do it.
          </ThemedText>

          {habits.length === 0 ? (
            <View style={[styles.glassCard, styles.emptyCard]}>
              <ThemedText variant="body" color={colors.creamMuted}>
                Nothing set up yet — add one below to get started.
              </ThemedText>
            </View>
          ) : (
            <View style={[styles.glassCard, styles.habitsCard]}>
              {habits.map((habit, index) => {
                const doneToday = isHabitDoneToday(habit);
                const streak = getHabitStreak(habit);
                const pending = pendingIds.has(habit.id);
                return (
                  <View
                    key={habit.id}
                    style={[styles.habitRow, index < habits.length - 1 && styles.habitRowBorder]}
                  >
                    <Pressable
                      onPress={() => handleToggle(habit)}
                      disabled={pending}
                      hitSlop={8}
                      style={[styles.checkCircle, doneToday && styles.checkCircleDone]}
                    >
                      {doneToday && (
                        <ThemedText variant="h3" color={colors.forestDark}>
                          ✓
                        </ThemedText>
                      )}
                    </Pressable>
                    <ThemedText style={styles.habitEmoji}>{habit.emoji}</ThemedText>
                    <View style={styles.habitTextBlock}>
                      <ThemedText variant="h3" color={colors.cream100}>
                        {habit.label}
                      </ThemedText>
                      {streak > 0 && (
                        <ThemedText variant="caption" color={colors.sage}>
                          🔥 {streak}-day streak
                        </ThemedText>
                      )}
                    </View>
                    <Pressable onPress={() => handleRemove(habit)} hitSlop={10}>
                      <ThemedText variant="bodySmall" color={colors.creamMuted}>
                        ×
                      </ThemedText>
                    </Pressable>
                  </View>
                );
              })}
            </View>
          )}

          {availablePresets.length > 0 && (
            <>
              <ThemedText variant="caption" color={colors.sage} style={styles.sectionLabel}>
                SUGGESTIONS
              </ThemedText>
              <View style={styles.presetRow}>
                {availablePresets.map((preset) => (
                  <Pressable
                    key={preset.label}
                    onPress={() => handleAddPreset(preset)}
                    style={({ pressed }) => [
                      styles.glassCard,
                      styles.presetChip,
                      pressed && styles.cardPressed,
                    ]}
                  >
                    <ThemedText variant="bodySmall" color={colors.cream100}>
                      {preset.emoji} {preset.label}
                    </ThemedText>
                  </Pressable>
                ))}
              </View>
            </>
          )}

          <ThemedText variant="caption" color={colors.sage} style={styles.sectionLabel}>
            OR ADD YOUR OWN
          </ThemedText>
          <View style={styles.customRow}>
            <TextField
              value={customLabel}
              onChangeText={setCustomLabel}
              placeholder="Name a habit"
              style={styles.customField}
            />
            <Button
              label="Add"
              variant="secondary"
              onPress={handleAddCustom}
              disabled={customLabel.trim().length === 0}
            />
          </View>
          <ThemedText variant="caption" color={colors.creamMuted} style={styles.pointsNote}>
            +{POINTS.completeHabit} pts each time you check one off.
          </ThemedText>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: colors.forestDark,
  },
  headerArcs: {
    top: -40,
    right: -40,
  },
  screen: {
    flex: 1,
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
  headline: {
    marginBottom: spacing.md,
  },
  subhead: {
    marginBottom: spacing.xl,
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
  emptyCard: {
    padding: spacing.lg,
    marginBottom: spacing.xl,
  },
  habitsCard: {
    marginBottom: spacing.xl,
    overflow: 'hidden',
  },
  habitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
  },
  habitRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(253, 251, 246, 0.1)',
  },
  checkCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: colors.sage,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  checkCircleDone: {
    backgroundColor: colors.sage,
  },
  habitEmoji: {
    fontSize: 22,
    lineHeight: 30,
    marginRight: spacing.md,
  },
  habitTextBlock: {
    flex: 1,
    marginRight: spacing.sm,
  },
  sectionLabel: {
    marginBottom: spacing.md,
  },
  presetRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.xl,
  },
  presetChip: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  customRow: {
    flexDirection: 'row',
    gap: spacing.md,
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  customField: {
    flex: 1,
  },
  pointsNote: {
    marginBottom: spacing.xl,
  },
});
