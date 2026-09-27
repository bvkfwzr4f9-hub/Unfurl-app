// Unfurl custom icon set — replaces every emoji in the app.
// 24×24 grid, 1.6 stroke, round caps/joins. Style B: base line `color` (sage #9FB98F) + one warm `accent` detail (amber #D9A95B).
// Light Doctor Toolkit: color="#1F2A20" accent="#9A6A24". Status/data icons (lock, check, trends, calendar…) have no accent.
import React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import Svg, { Path, Circle, Rect, Ellipse } from 'react-native-svg';

export type UnfurlIconName =
  | 'recognition'
  | 'flame'
  | 'compass'
  | 'movement'
  | 'nutrition'
  | 'moon'
  | 'intimacy'
  | 'mind'
  | 'stethoscope'
  | 'capsule'
  | 'sparkle'
  | 'book'
  | 'video'
  | 'lock'
  | 'check'
  | 'clipboard'
  | 'habit'
  | 'breath'
  | 'droplet'
  | 'winddown'
  | 'pen'
  | 'gratitude'
  | 'meditation'
  | 'sprig'
  | 'star'
  | 'books'
  | 'trophy'
  | 'seed'
  | 'sprout'
  | 'bud'
  | 'bloom'
  | 'unfurled'
  | 'trend-down'
  | 'trend-up'
  | 'calendar';

const GLYPHS: Record<UnfurlIconName, (accent: string) => React.ReactNode> = {
  // 💚  Recognition & Validation
  'recognition': (a) => <><Path d="M4 15c2.5 3 5 4.5 8 4.5s5.5-1.5 8-4.5"/><Path d="M12 13s-4-2.4-4-5.3A2.2 2.2 0 0 1 12 6.4a2.2 2.2 0 0 1 4 1.3C16 10.6 12 13 12 13z" stroke={a}/></>,
  // 🔥  Symptom Cluster · Streak · 7-Day Streak
  'flame': (a) => <><Path d="M12 21a6 6 0 0 0 6-6c0-4-3-6-4-9-1 2-2 3-3 3.5C9.5 8 9 6.5 9 5c-2 2-3 5-3 9a6 6 0 0 0 6 7z"/><Path d="M12 21a2.5 2.5 0 0 1-2.5-2.5c0-1.8 1.5-2.7 2.5-4.5 1 1.8 2.5 2.7 2.5 4.5A2.5 2.5 0 0 1 12 21z" stroke={a}/></>,
  // 🧭  Body Literacy
  'compass': (a) => <><Circle cx="12" cy="12" r="9"/><Path d="M15.5 8.5l-2 5-5 2 2-5z" stroke={a}/></>,
  // 🏃  Movement (section + habit)
  'movement': (a) => <><Circle cx="14.5" cy="4.5" r="1.6" stroke={a}/><Path d="M8 21l3-5.5-2.5-3L12 8l3 3.5h3.5"/><Path d="M12 8L8.5 9 6.5 12"/><Path d="M11 15.5l3.5 2 .5 3.5"/></>,
  // 🥗  Nutrition
  'nutrition': (a) => <><Path d="M3.5 12h17a8.5 8.5 0 0 1-17 0z"/><Path d="M9.5 12c-1.2-3 0-6 3-7 1.2 3 0 6-3 7z" stroke={a}/><Path d="M13.5 12c.5-2.5 2.5-4 5-4-.5 2.5-2.5 4-5 4z" stroke={a}/></>,
  // 🌙  Sleep
  'moon': (a) => <><Path d="M19.5 14.5A7.5 7.5 0 1 1 9.5 4.5a6 6 0 0 0 10 10z"/><Path d="M17 4v3" stroke={a}/><Path d="M15.5 5.5h3" stroke={a}/></>,
  // 💗  Sexual Health
  'intimacy': (a) => <><Path d="M12 20s-8-4.8-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 9c0 6.2-8 11-8 11z"/><Path d="M8 9.5a2 2 0 0 1 2-2" stroke={a}/></>,
  // 🧠  Mental & Emotional Health
  'mind': (a) => <><Path d="M16 21v-3.5h2a1.5 1.5 0 0 0 1.5-1.5v-2.5l1.5-.5-1.8-3.2A7.5 7.5 0 1 0 8 16.4V21"/><Path d="M12 11.5a1.2 1.2 0 1 1 1.2-1.2 2.6 2.6 0 0 1-2.6 2.6 3.8 3.8 0 0 1-3.8-3.8" stroke={a}/></>,
  // 🩺  Doctor-Talk Toolkit (section, quick action, badge)
  'stethoscope': (a) => <><Path d="M6 3.5v4.5a4 4 0 0 0 8 0V3.5"/><Path d="M5 3.5h2"/><Path d="M13 3.5h2"/><Path d="M10 12v2.5a5 5 0 0 0 10 0V13"/><Circle cx="20" cy="11" r="2" stroke={a}/></>,
  // 💊  HRT Education
  'capsule': (a) => <><Path d="M10.5 20.5a4.95 4.95 0 0 1-7-7l6-6a4.95 4.95 0 0 1 7 7z"/><Path d="M6.5 10.5l7 7" stroke={a}/></>,
  // ✨  Identity & Life-Stage Exploration
  'sparkle': (a) => <><Path d="M11 3c.6 4.2 1.8 5.4 6 6-4.2.6-5.4 1.8-6 6-.6-4.2-1.8-5.4-6-6 4.2-.6 5.4-1.8 6-6z"/><Path d="M18 14.5c.3 1.7.8 2.2 2.5 2.5-1.7.3-2.2.8-2.5 2.5-.3-1.7-.8-2.2-2.5-2.5 1.7-.3 2.2-.8 2.5-2.5z" stroke={a}/></>,
  // 📖  Article step · First Section badge
  'book': (a) => <><Path d="M3 5.5c3-1 6-1 9 1 3-2 6-2 9-1V19c-3-1-6-1-9 1-3-2-6-2-9-1z"/><Path d="M12 6.5V20"/></>,
  // 🎥  Video step (reserved)
  'video': (a) => <><Rect x="3" y="6" width="12.5" height="12" rx="2.5"/><Path d="M15.5 10.5l5.5-3v9l-5.5-3"/></>,
  // 🔒  Locked step
  'lock': (a) => <><Rect x="5" y="10.5" width="14" height="10" rx="2.5"/><Path d="M8 10.5V8a4 4 0 0 1 8 0v2.5"/><Path d="M12 14.5v2.2"/></>,
  // ✓  Completed step
  'check': (a) => <><Path d="M5 12.5l4.5 4.5L19 7.5"/></>,
  // 📋  Symptom Log (quick action + insight)
  'clipboard': (a) => <><Rect x="5" y="4.5" width="14" height="16.5" rx="2.5"/><Rect x="9" y="3" width="6" height="3" rx="1"/><Path d="M9 11h6"/><Path d="M9 15h4"/></>,
  // ✅  Daily Habits · custom habit
  'habit': (a) => <><Rect x="4" y="4" width="16" height="16" rx="4.5"/><Path d="M8.5 12l2.5 2.5 4.5-5"/></>,
  // 🌬️  Breathing exercise
  'breath': (a) => <><Path d="M3 9h11a2.5 2.5 0 1 0-2.5-2.5"/><Path d="M3 13h15a2.5 2.5 0 1 1-2.5 2.5" stroke={a}/><Path d="M3 17h7"/></>,
  // 💧  Hydration
  'droplet': (a) => <><Path d="M12 3s6.5 7 6.5 11.5a6.5 6.5 0 0 1-13 0C5.5 10 12 3 12 3z"/><Path d="M9 14.5a3 3 0 0 0 3 3" stroke={a}/></>,
  // 😴  Sleep wind-down
  'winddown': (a) => <><Path d="M3.5 13c2.5 3 5 4.5 8.5 4.5s6-1.5 8.5-4.5"/><Path d="M7 16.2l-1.2 2"/><Path d="M12 17.5v2.3"/><Path d="M17 16.2l1.2 2"/><Path d="M14.5 4h4l-4 4.5h4" stroke={a}/></>,
  // 📝  Journaling
  'pen': (a) => <><Path d="M15.5 4.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4z"/><Path d="M14 6l3 3"/><Path d="M12 20h8" stroke={a}/></>,
  // 🙏  Gratitude
  'gratitude': (a) => <><Path d="M12 20.5V10c0-3-1.3-5.2-3-6.5-2 2.5-3 5.5-3 9 0 3.5 2.5 6.5 6 8"/><Path d="M12 10c0-3 1.3-5.2 3-6.5 2 2.5 3 5.5 3 9 0 3.5-2.5 6.5-6 8"/></>,
  // 🧘  Meditation
  'meditation': (a) => <><Circle cx="12" cy="5" r="2" stroke={a}/><Path d="M12 8.5v5"/><Path d="M5.5 12.5c2.5 0 4.5-1 6.5-3 2 2 4 3 6.5 3"/><Path d="M4.5 18.5c2-2 4.7-3 7.5-3s5.5 1 7.5 3c-2 1.3-4.7 2-7.5 2s-5.5-.7-7.5-2z"/></>,
  // 🌿  Time outside · wordmark accent
  'sprig': (a) => <><Path d="M6 20.5C9.5 16 13.5 10 18.5 4"/><Path d="M9 16.5c-3 .2-5-1-6-3.3 3-.2 5 1 6 3.3z"/><Path d="M12 12.5c-.8-2.9.1-5.3 2.4-6.6.8 2.9-.1 5.3-2.4 6.6z"/><Path d="M13.5 12.5c2.5-1.3 5-1 6.8.7-2.5 1.3-5 1-6.8-.7z" stroke={a}/></>,
  // 🌟  First Steps
  'star': (a) => <><Path d="M12 3.5l2.5 5.3 5.8.7-4.3 4 1.1 5.7L12 16.4l-5.1 2.8L8 13.5 3.7 9.5l5.8-.7z" stroke={a}/></>,
  // 📚  Bookworm
  'books': (a) => <><Path d="M3.5 20.5h17"/><Rect x="5" y="6" width="3.5" height="14.5" rx="1"/><Rect x="9.5" y="4" width="3.5" height="16.5" rx="1"/><Path d="M14.5 7.2l3.3-.9 3 13.3-3.3.9z" stroke={a}/></>,
  // 🏆  Completionist
  'trophy': (a) => <><Path d="M8 4h8v5a4 4 0 0 1-8 0z" stroke={a}/><Path d="M8 5.5H5.5A2.5 2.5 0 0 0 8 10"/><Path d="M16 5.5h2.5A2.5 2.5 0 0 1 16 10"/><Path d="M12 13v4"/><Path d="M9 20.5h6"/><Path d="M10 17h4v3.5h-4z"/></>,
  // 🌰  Level 1 · Seed
  'seed': (a) => <><Path d="M3.5 20.5h17"/><Path d="M12 17.5c-2.5 0-4-1.9-4-4.3S10 8 12 7c2 1 4 3.8 4 6.2s-1.5 4.3-4 4.3z" stroke={a}/><Path d="M12 10v4.5"/></>,
  // 🌱  Level 2 · Sprout · Practice step
  'sprout': (a) => <><Path d="M3.5 20.5h17"/><Path d="M12 20.5v-8"/><Path d="M12 12.5c0-3.5-2.5-6-6.5-6 0 3.5 2.5 6 6.5 6z" stroke={a}/><Path d="M12 10.5c0-3 2-5.5 6-5.5 0 3-2 5.5-6 5.5z" stroke={a}/></>,
  // (was 🌿)  Level 3 · Bud
  'bud': (a) => <><Path d="M3.5 20.5h17"/><Path d="M12 20.5v-8.5"/><Path d="M12 12c-2.2 0-3.5-1.7-3.5-3.8C8.5 6 10.5 4 12 3c1.5 1 3.5 3 3.5 5.2 0 2.1-1.3 3.8-3.5 3.8z" stroke={a}/><Path d="M12 17c-2.5 0-4-1.2-4.5-3 2.5 0 4 1.2 4.5 3z"/></>,
  // 🌸  Level 4 · Bloom
  'bloom': (a) => <><Ellipse cx="12" cy="6.2" rx="1.9" ry="2.9" transform="rotate(0 12 9.4)"/><Ellipse cx="12" cy="6.2" rx="1.9" ry="2.9" transform="rotate(72 12 9.4)"/><Ellipse cx="12" cy="6.2" rx="1.9" ry="2.9" transform="rotate(144 12 9.4)"/><Ellipse cx="12" cy="6.2" rx="1.9" ry="2.9" transform="rotate(216 12 9.4)"/><Ellipse cx="12" cy="6.2" rx="1.9" ry="2.9" transform="rotate(288 12 9.4)"/><Circle cx="12" cy="9.4" r="1.3" stroke={a}/><Path d="M3.5 20.5h17"/><Path d="M12 13v7.5"/></>,
  // 🌷  Level 5 · Unfurled · Unfurled badge
  'unfurled': (a) => <><Path d="M3.5 20.5h17"/><Path d="M9 20.5c0-6 1.5-10.5 5-13 2.6-1.8 6-.8 6 1.8 0 1.9-1.8 2.9-3.3 2.2-1.2-.6-1.1-2.3.3-2.5"/><Path d="M9.6 15.5c-2.8-.2-4.8-1.8-5.3-4 2.8.2 4.8 1.7 5.3 4z"/><Path d="M11 11.5c.4-2.6 2.3-4.2-.1-6.5-1.4 1.7-1.6 4.2.1 6.5z" stroke={a}/></>,
  // 📉  Severity trending down
  'trend-down': (a) => <><Path d="M3 7l6 6 4-4 8 8"/><Path d="M21 12v5h-5"/></>,
  // 📈  Severity trending up
  'trend-up': (a) => <><Path d="M3 17l6-6 4 4 8-8"/><Path d="M16 7h5v5"/></>,
  // 🗓️  Weekday pattern insight
  'calendar': (a) => <><Rect x="3.5" y="5" width="17" height="15.5" rx="2.5"/><Path d="M3.5 10h17"/><Path d="M8 3v4"/><Path d="M16 3v4"/><Circle cx="15.5" cy="15" r="1.3"/></>,
};

export function UnfurlIcon({ name, size = 24, color = "#9FB98F", accent = "#D9A95B", strokeWidth = 1.6, style }:
  { name: UnfurlIconName; size?: number; color?: string; accent?: string; strokeWidth?: number; style?: StyleProp<ViewStyle> }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color}
      strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" style={style}>
      {GLYPHS[name](accent)}
    </Svg>
  );
}

/** True for a real icon name — lets callers rendering persisted/legacy string fields fall back safely. */
export function isUnfurlIconName(value: string): value is UnfurlIconName {
  return value in GLYPHS;
}
