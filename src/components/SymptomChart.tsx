import { useState } from 'react';
import { View, StyleSheet, LayoutChangeEvent, Pressable } from 'react-native';
import Svg, { Polyline, Circle, Line } from 'react-native-svg';
import { colors, spacing } from '@/theme';
import { ThemedText } from './ThemedText';
import { SYMPTOM_CATEGORIES, type SymptomLogEntry } from '@/services/symptomLog';

const CHART_HEIGHT = 70;
const POINT_PAD = 10;
const MAX_POINTS_PER_ROW = 12;

/** Mild -> severe, one sequential ramp — matches severity 1-5, never used for category identity. */
const SEVERITY_COLOR = [
  colors.sageLight, // 1
  colors.sage, // 2
  colors.sageDark, // 3
  colors.woodBrown, // 4
  colors.error, // 5
] as const;

interface CategoryTrend {
  category: string;
  points: { severity: number; label: string }[];
}

function buildTrends(entries: SymptomLogEntry[]): CategoryTrend[] {
  return SYMPTOM_CATEGORIES.map((category) => {
    const chronological = entries
      .filter((entry) => entry.category === category)
      .slice()
      .reverse(); // subscribeToSymptomLogs is newest-first; chart reads left -> right, oldest -> newest
    const recent = chronological.slice(-MAX_POINTS_PER_ROW);
    return {
      category,
      points: recent.map((entry) => ({
        severity: entry.severity,
        label: entry.loggedAt ? entry.loggedAt.toDate().toLocaleDateString() : 'Just now',
      })),
    };
  }).filter((trend) => trend.points.length > 0);
}

/** A small-multiples set of per-category severity trend lines — one row per symptom category logged so far. */
export function SymptomChart({ entries }: { entries: SymptomLogEntry[] }) {
  const trends = buildTrends(entries);
  if (trends.length === 0) return null;

  return (
    <View style={styles.block}>
      <ThemedText variant="h3" color={colors.cream100} style={styles.title}>
        Trends
      </ThemedText>
      {trends.map((trend) => (
        <CategoryRow key={trend.category} trend={trend} />
      ))}
    </View>
  );
}

function CategoryRow({ trend }: { trend: CategoryTrend }) {
  const [width, setWidth] = useState(0);
  const [selected, setSelected] = useState(trend.points.length - 1);

  function handleLayout(event: LayoutChangeEvent) {
    setWidth(event.nativeEvent.layout.width);
  }

  const point = trend.points[selected];

  return (
    <View style={styles.row}>
      <View style={styles.rowHeader}>
        <ThemedText variant="bodySmall" color={colors.cream100}>
          {trend.category}
        </ThemedText>
        <ThemedText variant="caption" color={colors.creamMuted}>
          {point.label} · severity {point.severity}/5
        </ThemedText>
      </View>
      <View style={styles.chartArea} onLayout={handleLayout}>
        {width > 0 && (
          <Svg width={width} height={CHART_HEIGHT}>
            {[1, 2, 3, 4, 5].map((tick) => (
              <Line
                key={tick}
                x1={0}
                x2={width}
                y1={yFor(tick)}
                y2={yFor(tick)}
                stroke="rgba(253, 251, 246, 0.15)"
                strokeWidth={1}
              />
            ))}
            <Polyline
              points={trend.points
                .map((p, i) => `${xFor(i, trend.points.length, width)},${yFor(p.severity)}`)
                .join(' ')}
              fill="none"
              stroke={colors.sage}
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {trend.points.map((p, i) => (
              <Circle
                key={i}
                cx={xFor(i, trend.points.length, width)}
                cy={yFor(p.severity)}
                r={i === selected ? 6 : 4}
                fill={SEVERITY_COLOR[p.severity - 1]}
                stroke="rgba(253, 251, 246, 0.9)"
                strokeWidth={i === selected ? 2 : 1}
              />
            ))}
          </Svg>
        )}
        {width > 0 && (
          <View style={StyleSheet.absoluteFill}>
            {trend.points.map((_, i) => (
              <Pressable
                key={i}
                onPress={() => setSelected(i)}
                hitSlop={6}
                style={[
                  styles.hitTarget,
                  {
                    left: xFor(i, trend.points.length, width) - 14,
                    top: 0,
                  },
                ]}
              />
            ))}
          </View>
        )}
      </View>
    </View>
  );
}

function xFor(index: number, count: number, width: number) {
  if (count === 1) return width / 2;
  const usable = width - POINT_PAD * 2;
  return POINT_PAD + (usable * index) / (count - 1);
}

function yFor(severity: number) {
  const usable = CHART_HEIGHT - POINT_PAD * 2;
  return POINT_PAD + usable * (1 - (severity - 1) / 4);
}

const styles = StyleSheet.create({
  block: {
    marginBottom: spacing.xl,
  },
  title: {
    marginBottom: spacing.md,
  },
  row: {
    marginBottom: spacing.lg,
  },
  rowHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: spacing.xs,
  },
  chartArea: {
    height: CHART_HEIGHT,
    position: 'relative',
  },
  hitTarget: {
    position: 'absolute',
    width: 28,
    height: CHART_HEIGHT,
  },
});
