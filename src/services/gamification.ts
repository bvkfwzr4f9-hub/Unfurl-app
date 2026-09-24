import { doc, setDoc, increment } from 'firebase/firestore';
import { db } from './firebase';

export const POINTS = {
  completeIntake: 50,
  completeStep: 10,
  completeSectionBonus: 20,
  logSymptom: 5,
  dailyVisit: 5,
  completeHabit: 3,
} as const;

/** Adds `amount` points to the user's running total. Pass a negative amount to deduct. */
export async function awardPoints(uid: string, amount: number) {
  await setDoc(doc(db, 'users', uid), { points: increment(amount) }, { merge: true });
}

export function localDateString(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(
    date.getDate()
  ).padStart(2, '0')}`;
}

export function todayLocalDate(): string {
  return localDateString(new Date());
}

function daysBetween(a: string, b: string): number {
  const msPerDay = 24 * 60 * 60 * 1000;
  return Math.round((new Date(b).getTime() - new Date(a).getTime()) / msPerDay);
}

/**
 * Credits the user for opening the app today, once per calendar day.
 * Extends the streak if yesterday was also credited, resets it to 1 if a
 * day was missed, and awards points only on the first call each day —
 * safe to call every time Home mounts.
 */
export async function recordDailyVisit(uid: string, lastActiveDate: string | null, streakDays: number) {
  const today = todayLocalDate();
  if (lastActiveDate === today) return;

  const gap = lastActiveDate ? daysBetween(lastActiveDate, today) : null;
  const nextStreak = gap === 1 ? streakDays + 1 : 1;

  await setDoc(
    doc(db, 'users', uid),
    { lastActiveDate: today, streakDays: nextStreak, points: increment(POINTS.dailyVisit) },
    { merge: true }
  );
}
