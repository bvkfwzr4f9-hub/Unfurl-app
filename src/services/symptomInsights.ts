import type { Timestamp } from 'firebase/firestore';
import type { SymptomLogEntry } from './symptomLog';

export interface SymptomInsight {
  id: string;
  icon: string;
  text: string;
}

const WEEKDAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const MIN_ENTRIES_FOR_INSIGHTS = 5;

function average(values: number[]): number {
  return values.reduce((sum, v) => sum + v, 0) / values.length;
}

function hasLoggedAt(entry: SymptomLogEntry): entry is SymptomLogEntry & { loggedAt: Timestamp } {
  return entry.loggedAt !== null;
}

/**
 * Client-side pattern-spotting over a member's own symptom log — trends,
 * a recurring worst weekday, or (as a fallback) their most-logged
 * category. Only surfaces once there's enough data to say something real;
 * this is the retention hook a competitor's static content library can't
 * replicate — it only exists because the member has actually stuck around.
 */
export function getSymptomInsights(entries: SymptomLogEntry[]): SymptomInsight[] {
  if (entries.length < MIN_ENTRIES_FOR_INSIGHTS) return [];

  const insights: SymptomInsight[] = [];
  // entries arrive newest-first; work chronologically (oldest -> newest)
  const chronological = entries.filter(hasLoggedAt).slice().reverse();

  const byCategory = new Map<string, (SymptomLogEntry & { loggedAt: Timestamp })[]>();
  for (const entry of chronological) {
    const list = byCategory.get(entry.category) ?? [];
    list.push(entry);
    byCategory.set(entry.category, list);
  }

  const [topCategory] = [...byCategory.entries()].sort((a, b) => b[1].length - a[1].length)[0] ?? [];

  // --- Trend: the category whose severity has shifted most between its older and newer half ---
  let bestTrend: { category: string; delta: number } | null = null;
  for (const [category, list] of byCategory) {
    if (list.length < 4) continue;
    const mid = Math.floor(list.length / 2);
    const olderAvg = average(list.slice(0, mid).map((e) => e.severity));
    const newerAvg = average(list.slice(mid).map((e) => e.severity));
    const delta = newerAvg - olderAvg;
    if (Math.abs(delta) >= 0.5 && (!bestTrend || Math.abs(delta) > Math.abs(bestTrend.delta))) {
      bestTrend = { category, delta };
    }
  }
  if (bestTrend) {
    insights.push({
      id: 'trend',
      icon: bestTrend.delta < 0 ? '📉' : '📈',
      text: `Your ${bestTrend.category} severity looks like it's ${
        bestTrend.delta < 0 ? 'easing' : 'increasing'
      } over your recent entries.`,
    });
  }

  // --- Weekday pattern within the most-logged category ---
  if (topCategory) {
    const list = byCategory.get(topCategory)!;
    const byWeekday = new Map<number, number[]>();
    for (const entry of list) {
      const day = entry.loggedAt.toDate().getDay();
      const arr = byWeekday.get(day) ?? [];
      arr.push(entry.severity);
      byWeekday.set(day, arr);
    }
    const overallAvg = average(list.map((e) => e.severity));
    let worstDay: { day: number; avg: number } | null = null;
    for (const [day, severities] of byWeekday) {
      if (severities.length < 2) continue;
      const avg = average(severities);
      if (avg - overallAvg >= 1 && (!worstDay || avg > worstDay.avg)) {
        worstDay = { day, avg };
      }
    }
    if (worstDay) {
      insights.push({
        id: 'weekday',
        icon: '🗓️',
        text: `${topCategory} tends to hit hardest on ${WEEKDAY_NAMES[worstDay.day]}s, based on your entries.`,
      });
    }
  }

  // --- Fallback: always available once the threshold is met ---
  if (insights.length === 0 && topCategory) {
    const count = byCategory.get(topCategory)!.length;
    insights.push({
      id: 'most-logged',
      icon: '📋',
      text: `${topCategory} is what you've logged most — ${count} of your ${entries.length} entries.`,
    });
  }

  return insights.slice(0, 2);
}
