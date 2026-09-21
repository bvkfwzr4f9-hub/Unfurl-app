import type { UserProfile } from '@/services/subscription';
import { contentLibrary } from './contentLibrary';
import { GAME_LEVELS } from './gameLevels';

export interface Achievement {
  id: string;
  emoji: string;
  title: string;
  /** Derived purely from existing profile fields — no separate storage needed. */
  isEarned: (profile: UserProfile) => boolean;
}

const maxLevelPoints = GAME_LEVELS[GAME_LEVELS.length - 1].minPoints;

export const achievements: Achievement[] = [
  {
    id: 'first-steps',
    emoji: '🌟',
    title: 'First Steps',
    isEarned: (profile) => !!profile.intakeCompletedAt,
  },
  {
    id: 'first-section',
    emoji: '📖',
    title: 'First Section',
    isEarned: (profile) => profile.watchedSections.length >= 1,
  },
  {
    id: 'bookworm',
    emoji: '📚',
    title: 'Bookworm',
    isEarned: (profile) => profile.watchedSections.length >= 5,
  },
  {
    id: 'completionist',
    emoji: '🏆',
    title: 'Completionist',
    isEarned: (profile) => profile.watchedSections.length >= contentLibrary.length,
  },
  {
    id: 'week-streak',
    emoji: '🔥',
    title: '7-Day Streak',
    isEarned: (profile) => profile.streakDays >= 7,
  },
  {
    id: 'full-bloom',
    emoji: '🌷',
    title: 'Unfurled',
    isEarned: (profile) => profile.points >= maxLevelPoints,
  },
];

export function getEarnedAchievements(profile: UserProfile): Achievement[] {
  return achievements.filter((achievement) => achievement.isEarned(profile));
}
