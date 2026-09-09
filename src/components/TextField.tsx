import { TextInput, TextInputProps, StyleSheet } from 'react-native';
import { colors, type, spacing, radius } from '@/theme';

interface TextFieldProps extends TextInputProps {
  hasError?: boolean;
}

export function TextField({ hasError = false, style, ...rest }: TextFieldProps) {
  return (
    <TextInput
      style={[styles.base, hasError && styles.error, style]}
      placeholderTextColor={colors.inkMuted}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  base: {
    ...type.bodyLarge,
    color: colors.ink,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.creamLight,
  },
  error: {
    borderColor: colors.error,
  },
});
