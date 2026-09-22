import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

interface BrandArcsProps {
  size?: number;
  color?: string;
  dotColor?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * The thin overlapping-circle-and-dot motif used throughout the pitch deck
 * (hairline arcs with small filled "node" dots at their crossings). Purely
 * decorative — non-interactive, meant to sit behind or beside real content.
 */
export function BrandArcs({
  size = 200,
  color = 'rgba(253, 251, 246, 0.28)',
  dotColor = 'rgba(253, 251, 246, 0.8)',
  style,
}: BrandArcsProps) {
  return (
    <View pointerEvents="none" style={[styles.container, { width: size, height: size }, style]}>
      <Svg width={size} height={size} viewBox="0 0 220 220">
        <Circle cx="60" cy="160" r="125" stroke={color} strokeWidth={1} fill="none" />
        <Circle cx="175" cy="55" r="85" stroke={color} strokeWidth={1} fill="none" />
        <Circle cx="175" cy="55" r="2" fill={dotColor} />
        <Circle cx="196" cy="138" r="2" fill={dotColor} />
        <Circle cx="24" cy="72" r="2" fill={dotColor} />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
  },
});
