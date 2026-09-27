import type { UserProfile } from '@/services/subscription';
import type { UnfurlIconName } from '@/components/icons/UnfurlIcon';
import { contentLibrary, countCompletedSections } from './contentLibrary';
import { GAME_LEVELS } from './gameLevels';

export interface Achievement {
  id: string;
  icon: UnfurlIconName;
  title: string;
  /** Derived purely from existing profile fields — no separate storage needed. */
  isEarned: (profile: UserProfile) => boolean;
}

const maxLevelPoints = GAME_LEVELS[GAME_LEVELS.length - 1].minPoints;

export const achievements: Achievement[] = [
  {
    id: 'first-steps',
    icon: 'star',
    title: 'First Steps',
    isEarned: (profile) => !!profile.intakeCompletedAt,
  },
  {
    id: 'first-section',
    icon: 'book',
    title: 'First Section',
    isEarned: (profile) => countCompletedSections(profile.completedSteps) >= 1,
  },
  {
    id: 'bookworm',
    icon: 'books',
    title: 'Bookworm',
    isEarned: (profile) => countCompletedSections(profile.completedSteps) >= 5,
  },
  {
    id: 'completionist',
    icon: 'trophy',
    title: 'Completionist',
    isEarned: (profile) => countCompletedSections(profile.completedSteps) >= contentLibrary.length,
  },
  {
    id: 'week-streak',
    icon: 'flame',
    title: '7-Day Streak',
    isEarned: (profile) => profile.streakDays >= 7,
  },
  {
    id: 'full-bloom',
    icon: 'unfurled',
    title: 'Unfurled',
    isEarned: (profile) => profile.points >= maxLevelPoints,
  },
];

export function getEarnedAchievements(profile: UserProfile): Achievement[] {
  return achievements.filter((achievement) => achievement.isEarned(profile));
}
