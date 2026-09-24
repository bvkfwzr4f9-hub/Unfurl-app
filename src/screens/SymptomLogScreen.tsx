import { useEffect, useState } from 'react';
import { ScrollView, View, ImageBackground, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { colors, spacing, radius } from '@/theme';
import { ThemedText } from '@/components/ThemedText';
import { Button } from '@/components/Button';
import { TextField } from '@/components/TextField';
import { PremiumLock } from '@/components/PremiumLock';
import { SymptomChart } from '@/components/SymptomChart';
import { Card } from '@/components/Card';
import { BrandArcs } from '@/components/BrandArcs';
import { useRequireAuth } from '@/services/useRequireAuth';
import { useUserProfile } from '@/services/useUserProfile';
import {
  addSymptomLogEntry,
  subscribeToSymptomLogs,
  SYMPTOM_CATEGORIES,
  type SymptomLogEntry,
} from '@/services/symptomLog';
import { getSymptomInsights } from '@/services/symptomInsights';
import { exportSymptomLogToPdf } from '@/services/exportSymptomLog';
import { awardPoints, POINTS } from '@/services/gamification';

const CATEGORIES = SYMPTOM_CATEGORIES;
const SEVERITIES = [1, 2, 3, 4, 5];

export function SymptomLogScreen() {
  const router = useRouter();
  const { user, initializing } = useRequireAuth();
  const profile = useUserProfile(user?.uid);
  const [entries, setEntries] = useState<SymptomLogEntry[]>([]);
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>(CATEGORIES[0]);
  const [severity, setSeverity] = useState(3);
  const [note, setNote] = useState('');
  const [saving, setSaving] = useState(false);
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    if (!user) return;
    return subscribeToSymptomLogs(user.uid, setEntries);
  }, [user]);

  const isPremium = profile?.subscriptionStatus === 'active';
  const insights = getSymptomInsights(entries);

  async function handleAddEntry() {
    if (!user || saving) return;
    setSaving(true);
    await addSymptomLogEntry(user.uid, { category, severity, note: note.trim() });
    await awardPoints(user.uid, POINTS.logSymptom);
    setNote('');
    setSaving(false);
  }

  async function handleExport() {
    if (exporting || entries.length === 0) return;
    setExporting(true);
    try {
      await exportSymptomLogToPdf(entries);
    } finally {
      setExporting(false);
    }
  }

  if (initializing || !user) {
    return <View style={styles.screen} />;
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
          <View style={styles.navRow}>
            <Pressable onPress={() => router.back()} hitSlop={12}>
              <ThemedText variant="bodySmall" color={colors.sage}>
                ← Back
              </ThemedText>
            </Pressable>
            <Pressable onPress={() => router.replace('/home')} hitSlop={12}>
              <ThemedText variant="bodySmall" color={colors.sage}>
                Home
              </ThemedText>
            </Pressable>
          </View>

          <ThemedText variant="display" color={colors.cream100} style={styles.spaced}>
            Symptom Log
          </ThemedText>

          {!isPremium ? (
            <PremiumLock
              message="The symptom log and export are part of membership. Upgrade to start tracking."
              ctaLabel="See membership options"
              onPress={() => router.push('/paywall')}
            />
          ) : (
            <>
              <ThemedText variant="caption" color={colors.sage} style={styles.label}>
                CATEGORY
              </ThemedText>
              <View style={styles.pillRow}>
                {CATEGORIES.map((option) => (
                  <Pressable
                    key={option}
                    onPress={() => setCategory(option)}
                    style={[styles.pill, category === option && styles.pillSelected]}
                  >
                    <ThemedText
                      variant="bodySmall"
                      color={category === option ? colors.forestDark : colors.cream100}
                    >
                      {option}
                    </ThemedText>
                  </Pressable>
                ))}
              </View>

              <ThemedText variant="caption" color={colors.sage} style={styles.label}>
                SEVERITY
              </ThemedText>
              <View style={styles.pillRow}>
                {SEVERITIES.map((level) => (
                  <Pressable
                    key={level}
                    onPress={() => setSeverity(level)}
                    style={[styles.severityDot, severity === level && styles.pillSelected]}
                  >
                    <ThemedText
                      variant="bodySmall"
                      color={severity === level ? colors.forestDark : colors.cream100}
                    >
                      {level}
                    </ThemedText>
                  </Pressable>
                ))}
              </View>

              <TextField
                value={note}
                onChangeText={setNote}
                placeholder="Notes (optional)"
                style={styles.field}
              />
              <Button
                label={saving ? 'Saving…' : `Add entry (+${POINTS.logSymptom} pts)`}
                variant="secondary"
                fullWidth
                disabled={saving}
                onPress={handleAddEntry}
                style={styles.spacedLarge}
              />

              <SymptomChart entries={entries} />

              {insights.length > 0 && (
                <Card variant="dark" style={styles.insightsCard}>
                  <ThemedText variant="caption" color={colors.sage} style={styles.insightsLabel}>
                    YOUR PATTERNS
                  </ThemedText>
                  {insights.map((insight) => (
                    <View key={insight.id} style={styles.insightRow}>
                      <ThemedText style={styles.insightIcon}>{insight.icon}</ThemedText>
                      <ThemedText variant="body" color={colors.cream100} style={styles.insightText}>
                        {insight.text}
                      </ThemedText>
                    </View>
                  ))}
                </Card>
              )}

              <View style={styles.historyHeader}>
                <ThemedText variant="h3" color={colors.cream100}>
                  History
                </ThemedText>
                <Pressable onPress={handleExport} disabled={exporting || entries.length === 0}>
                  <ThemedText
                    variant="bodySmall"
                    color={entries.length === 0 ? colors.creamMuted : colors.sage}
                  >
                    {exporting ? 'Exporting…' : 'Export as PDF'}
                  </ThemedText>
                </Pressable>
              </View>

              {entries.length === 0 ? (
                <ThemedText variant="bodySmall" color={colors.creamMuted}>
                  Nothing logged yet — add your first entry above.
                </ThemedText>
              ) : (
                entries.map((entry) => (
                  <View key={entry.id} style={styles.entryRow}>
                    <ThemedText variant="body" color={colors.cream100}>
                      {entry.category} — {entry.severity}/5
                    </ThemedText>
                    {entry.note.length > 0 && (
                      <ThemedText variant="bodySmall" color={colors.creamMuted}>
                        {entry.note}
                      </ThemedText>
                    )}
                    <ThemedText variant="caption" color={colors.creamMuted}>
                      {entry.loggedAt ? entry.loggedAt.toDate().toLocaleDateString() : 'Just now'}
                    </ThemedText>
                  </View>
                ))
              )}
            </>
          )}
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
  navRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  spaced: {
    marginBottom: spacing.lg,
  },
  spacedLarge: {
    marginBottom: spacing.xl,
  },
  label: {
    marginBottom: spacing.sm,
  },
  pillRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: spacing.lg,
  },
  pill: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: 'rgba(253, 251, 246, 0.14)',
    backgroundColor: 'rgba(253, 251, 246, 0.08)',
    marginRight: spacing.sm,
    marginBottom: spacing.sm,
  },
  severityDot: {
    width: 40,
    height: 40,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: 'rgba(253, 251, 246, 0.14)',
    backgroundColor: 'rgba(253, 251, 246, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  pillSelected: {
    borderColor: colors.sage,
    backgroundColor: colors.sage,
  },
  field: {
    marginBottom: spacing.md,
  },
  insightsCard: {
    marginBottom: spacing.xl,
  },
  insightsLabel: {
    marginBottom: spacing.md,
  },
  insightRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  insightIcon: {
    fontSize: 18,
    lineHeight: 24,
    marginRight: spacing.sm,
  },
  insightText: {
    flex: 1,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  entryRow: {
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(253, 251, 246, 0.1)',
  },
});
