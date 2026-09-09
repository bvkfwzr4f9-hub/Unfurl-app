import { Text, TextProps, StyleProp, TextStyle } from 'react-native';
import { colors, type as typeScale } from '@/theme';

type Variant = keyof typeof typeScale;

interface ThemedTextProps extends Omit<TextProps, 'style'> {
  variant?: Variant;
  color?: string;
  style?: StyleProp<TextStyle>;
}

/**
 * Text component pre-wired to the design system's type scale.
 * Usage: <ThemedText variant="h1" color={colors.ink}>Unfurl</ThemedText>
 */
export function ThemedText({
  variant = 'body',
  color = colors.ink,
  style,
  children,
  ...rest
}: ThemedTextProps) {
  return (
    <Text style={[typeScale[variant], { color }, style]} {...rest}>
      {children}
    </Text>
  );
}
