import { StyleSheet } from 'react-native';
import { colors, spacing } from '@/theme';
import { ThemedText } from './ThemedText';
import { Button } from './Button';
import { Card } from './Card';

interface PremiumLockProps {
  title?: string;
  message: string;
  ctaLabel: string;
  onPress: () => void;
}

export function PremiumLock({ title = 'Members only', message, ctaLabel, onPress }: PremiumLockProps) {
  return (
    <Card variant="dark" style={styles.card}>
      <ThemedText variant="h3" color={colors.cream100} style={styles.title}>
        {title}
      </ThemedText>
      <ThemedText variant="body" color={colors.creamMuted} style={styles.message}>
        {message}
      </ThemedText>
      <Button label={ctaLabel} variant="secondary" onPress={onPress} />
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: spacing.lg,
  },
  title: {
    marginBottom: spacing.sm,
  },
  message: {
    marginBottom: spacing.lg,
  },
});
