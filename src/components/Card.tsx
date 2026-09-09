import { View, ViewProps, StyleProp, ViewStyle } from 'react-native';
import { colors, spacing, radius, shadow } from '@/theme';

interface CardProps extends Omit<ViewProps, 'style'> {
  variant?: 'light' | 'dark' | 'sage';
  style?: StyleProp<ViewStyle>;
}

const backgrounds = {
  light: colors.creamLight,
  dark: colors.forestDeep,
  sage: colors.sageLight,
};

export function Card({ variant = 'light', style, children, ...rest }: CardProps) {
  return (
    <View
      style={[
        {
          backgroundColor: backgrounds[variant],
          borderRadius: radius.lg,
          padding: spacing.xl,
        },
        shadow.card,
        style,
      ]}
      {...rest}
    >
      {children}
    </View>
  );
}
