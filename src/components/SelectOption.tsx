import { Pressable, StyleSheet } from 'react-native';
import { colors, spacing, radius } from '@/theme';
import { ThemedText } from './ThemedText';

interface SelectOptionProps {
  label: string;
  selected?: boolean;
  onPress: () => void;
}

export function SelectOption({ label, selected = false, onPress }: SelectOptionProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        selected && styles.selected,
        pressed && styles.pressed,
      ]}
    >
      <ThemedText variant="bodyLarge" color={selected ? colors.forestDark : colors.ink}>
        {label}
      </ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.creamLight,
    marginBottom: spacing.md,
  },
  selected: {
    borderColor: colors.sageDark,
    backgroundColor: colors.sageLight,
  },
  pressed: {
    opacity: 0.8,
  },
});
