/**
 * Levels are a plant-growth metaphor tied to the app's own name — earning
 * points "unfurls" you further, rather than a generic "Level 3" counter.
 * Points come from real engagement (src/services/gamification.ts): finishing
 * intake, finishing content sections, logging symptoms, and daily streaks.
 */

export interface GameLevel {
  id: string;
  name: string;
  emoji: string;
  minPoints: number;
}

export const GAME_LEVELS: GameLevel[] = [
  { id: 'seed', name: 'Seed', emoji: '🌰', minPoints: 0 },
  { id: 'sprout', name: 'Sprout', emoji: '🌱', minPoints: 50 },
  { id: 'bud', name: 'Bud', emoji: '🌿', minPoints: 150 },
  { id: 'bloom', name: 'Bloom', emoji: '🌸', minPoints: 300 },
  { id: 'unfurled', name: 'Unfurled', emoji: '🌷', minPoints: 500 },
];

export interface LevelProgress {
  level: GameLevel;
  nextLevel: GameLevel | null;
  pointsIntoLevel: number;
  pointsToNextLevel: number | null;
  /** 0-1 progress toward the next level, or 1 if at the max level. */
  progress: number;
}

export function getLevelProgress(points: number): LevelProgress {
  let currentIndex = 0;
  for (let i = 0; i < GAME_LEVELS.length; i++) {
    if (points >= GAME_LEVELS[i].minPoints) {
      currentIndex = i;
    }
  }

  const level = GAME_LEVELS[currentIndex];
  const nextLevel = GAME_LEVELS[currentIndex + 1] ?? null;
  const pointsIntoLevel = points - level.minPoints;
  const pointsToNextLevel = nextLevel ? nextLevel.minPoints - points : null;
  const progress = nextLevel
    ? pointsIntoLevel / (nextLevel.minPoints - level.minPoints)
    : 1;

  return { level, nextLevel, pointsIntoLevel, pointsToNextLevel, progress };
}
