import { useEffect, useState } from 'react';
import { ScrollView, View, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { colors, spacing, radius } from '@/theme';
import { ThemedText } from '@/components/ThemedText';
import { Button } from '@/components/Button';
import { TextField } from '@/components/TextField';
import { PremiumLock } from '@/components/PremiumLock';
import { useRequireAuth } from '@/services/useRequireAuth';
import { useUserProfile } from '@/services/useUserProfile';
import {
  addSymptomLogEntry,
  subscribeToSymptomLogs,
  type SymptomLogEntry,
} from '@/services/symptomLog';
import { exportSymptomLogToPdf } from '@/services/exportSymptomLog';

const CATEGORIES = ['Hot flashes', 'Sleep', 'Mood', 'Energy/Focus', 'Other'];
const SEVERITIES = [1, 2, 3, 4, 5];

export function SymptomLogScreen() {
  const router = useRouter();
  const { user, initializing } = useRequireAuth();
  const profile = useUserProfile(user?.uid);
  const [entries, setEntries] = useState<SymptomLogEntry[]>([]);
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [severity, setSeverity] = useState(3);
  const [note, setNote] = useState('');
  const [saving, setSaving] = useState(false);
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    if (!user) return;
    return subscribeToSymptomLogs(user.uid, setEntries);
  }, [user]);

  const isPremium = profile?.subscriptionStatus === 'active';

  async function handleAddEntry() {
    if (!user || saving) return;
    setSaving(true);
    await addSymptomLogEntry(user.uid, { category, severity, note: note.trim() });
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
    <SafeAreaView style={styles.screen} edges={['top', 'bottom']}>
      <ScrollView contentContainerStyle={styles.content}>
        <Pressable onPress={() => router.back()} hitSlop={12} style={styles.backButton}>
          <ThemedText variant="bodySmall" color={colors.woodBrown}>
            ← Back
          </ThemedText>
        </Pressable>

        <ThemedText variant="display" style={styles.spaced}>
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
            <ThemedText variant="caption" color={colors.woodBrown} style={styles.label}>
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
                    color={category === option ? colors.forestDark : colors.ink}
                  >
                    {option}
                  </ThemedText>
                </Pressable>
              ))}
            </View>

            <ThemedText variant="caption" color={colors.woodBrown} style={styles.label}>
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
                    color={severity === level ? colors.forestDark : colors.ink}
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
              label={saving ? 'Saving…' : 'Add entry'}
              variant="primary"
              fullWidth
              disabled={saving}
              onPress={handleAddEntry}
              style={styles.spacedLarge}
            />

            <View style={styles.historyHeader}>
              <ThemedText variant="h3">History</ThemedText>
              <Pressable onPress={handleExport} disabled={exporting || entries.length === 0}>
                <ThemedText
                  variant="bodySmall"
                  color={entries.length === 0 ? colors.inkMuted : colors.sageDark}
                >
                  {exporting ? 'Exporting…' : 'Export as PDF'}
                </ThemedText>
              </Pressable>
            </View>

            {entries.length === 0 ? (
              <ThemedText variant="bodySmall" color={colors.inkMuted}>
                Nothing logged yet — add your first entry above.
              </ThemedText>
            ) : (
              entries.map((entry) => (
                <View key={entry.id} style={styles.entryRow}>
                  <ThemedText variant="body">
                    {entry.category} — {entry.severity}/5
                  </ThemedText>
                  {entry.note.length > 0 && (
                    <ThemedText variant="bodySmall" color={colors.inkMuted}>
                      {entry.note}
                    </ThemedText>
                  )}
                  <ThemedText variant="caption" color={colors.inkMuted}>
                    {entry.loggedAt ? entry.loggedAt.toDate().toLocaleDateString() : 'Just now'}
                  </ThemedText>
                </View>
              ))
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
    borderColor: colors.border,
    backgroundColor: colors.creamLight,
    marginRight: spacing.sm,
    marginBottom: spacing.sm,
  },
  severityDot: {
    width: 40,
    height: 40,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.creamLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  pillSelected: {
    borderColor: colors.sageDark,
    backgroundColor: colors.sageLight,
  },
  field: {
    marginBottom: spacing.md,
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
    borderBottomColor: colors.border,
  },
});
