import { ScrollView, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, radius } from '@/theme';
import { ThemedText } from '@/components/ThemedText';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';

/**
 * Dev-only living reference for the design system — colors, type scale,
 * and components rendered for real. Not part of the app's real navigation;
 * reachable at /dev-style-guide while building.
 */
export function StyleGuideScreen() {
  return (
    <SafeAreaView style={styles.screen} edges={['top', 'bottom']}>
      <ScrollView contentContainerStyle={styles.content}>
        <ThemedText variant="caption" color={colors.inkMuted} style={{ marginBottom: spacing.xs }}>
          DESIGN SYSTEM
        </ThemedText>
        <ThemedText variant="display" style={{ marginBottom: spacing.xxl }}>
          Unfurl
        </ThemedText>

        {/* Type scale */}
        <Section title="Type Scale">
          <ThemedText variant="display">Display</ThemedText>
          <ThemedText variant="h1">Heading 1</ThemedText>
          <ThemedText variant="h2">Heading 2</ThemedText>
          <ThemedText variant="h3">Heading 3 — semibold sans</ThemedText>
          <ThemedText variant="bodyLarge">Body large — for key copy</ThemedText>
          <ThemedText variant="body">Body — standard reading text</ThemedText>
          <ThemedText variant="bodySmall" color={colors.inkMuted}>
            Body small — secondary detail
          </ThemedText>
          <ThemedText variant="caption" color={colors.inkMuted}>
            CAPTION LABEL
          </ThemedText>
        </Section>

        {/* Stat number, matching the deck's KPI cards */}
        <Section title="Stat Number">
          <ThemedText variant="statNumber" color={colors.sageDark}>
            ~78M
          </ThemedText>
          <ThemedText variant="bodySmall" color={colors.inkMuted}>
            English-speaking women aged 40-64
          </ThemedText>
        </Section>

        {/* Color swatches */}
        <Section title="Colors">
          <View style={styles.swatchRow}>
            <Swatch color={colors.forestDark} label="forestDark" />
            <Swatch color={colors.forest} label="forest" />
            <Swatch color={colors.sage} label="sage" />
            <Swatch color={colors.cream} label="cream" />
            <Swatch color={colors.woodBrown} label="woodBrown" />
          </View>
        </Section>

        {/* Buttons */}
        <Section title="Buttons">
          <Button label="Primary Action" variant="primary" style={{ marginBottom: spacing.md }} />
          <Button label="Secondary Action" variant="secondary" style={{ marginBottom: spacing.md }} />
          <Button label="Ghost Action" variant="ghost" />
        </Section>

        {/* Cards */}
        <Section title="Cards">
          <Card variant="light" style={{ marginBottom: spacing.md }}>
            <ThemedText variant="h3">Light Card</ThemedText>
            <ThemedText variant="body" color={colors.inkMuted}>
              Used for content sections on cream backgrounds.
            </ThemedText>
          </Card>
          <Card variant="dark">
            <ThemedText variant="h3" color={colors.cream100}>
              Dark Card
            </ThemedText>
            <ThemedText variant="body" color={colors.creamMuted}>
              Used for hero moments, matching the deck's forest-green sections.
            </ThemedText>
          </Card>
        </Section>
      </ScrollView>
    </SafeAreaView>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={styles.section}>
      <ThemedText variant="caption" color={colors.woodBrown} style={{ marginBottom: spacing.md }}>
        {title.toUpperCase()}
      </ThemedText>
      {children}
    </View>
  );
}

function Swatch({ color, label }: { color: string; label: string }) {
  return (
    <View style={{ alignItems: 'center', marginRight: spacing.md, marginBottom: spacing.md }}>
      <View
        style={{
          width: 56,
          height: 56,
          borderRadius: radius.md,
          backgroundColor: color,
          borderWidth: 1,
          borderColor: colors.border,
        }}
      />
      <ThemedText variant="bodySmall" color={colors.inkMuted} style={{ marginTop: spacing.xs }}>
        {label}
      </ThemedText>
    </View>
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
  section: {
    marginBottom: spacing.xxl,
  },
  swatchRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
