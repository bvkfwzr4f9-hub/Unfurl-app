import {
  collection,
  doc,
  addDoc,
  deleteDoc,
  updateDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
  arrayUnion,
  arrayRemove,
  Timestamp,
} from 'firebase/firestore';
import { db } from './firebase';
import { awardPoints, POINTS, localDateString, todayLocalDate } from './gamification';

export interface Habit {
  id: string;
  label: string;
  emoji: string;
  createdAt: Timestamp | null;
  /** Local (YYYY-MM-DD) dates this habit was marked done, e.g. "2026-03-14". */
  completedDates: string[];
}

export interface NewHabit {
  label: string;
  emoji: string;
}

export async function addHabit(uid: string, habit: NewHabit) {
  await addDoc(collection(db, 'users', uid, 'habits'), {
    ...habit,
    completedDates: [],
    createdAt: serverTimestamp(),
  });
}

export async function removeHabit(uid: string, habitId: string) {
  await deleteDoc(doc(db, 'users', uid, 'habits', habitId));
}

/** Subscribes to a user's habits, oldest-created first. Returns an unsubscribe function. */
export function subscribeToHabits(uid: string, onChange: (habits: Habit[]) => void): () => void {
  const q = query(collection(db, 'users', uid, 'habits'), orderBy('createdAt', 'asc'));
  return onSnapshot(q, (snapshot) => {
    onChange(
      snapshot.docs.map((docSnapshot) => {
        const data = docSnapshot.data();
        return {
          id: docSnapshot.id,
          label: data.label as string,
          emoji: data.emoji as string,
          createdAt: (data.createdAt as Timestamp) ?? null,
          completedDates: (data.completedDates as string[]) ?? [],
        };
      })
    );
  });
}

export function isHabitDoneToday(habit: Habit): boolean {
  return habit.completedDates.includes(todayLocalDate());
}

/**
 * Toggles today's completion for a habit. Awards points on check, deducts
 * the same amount on uncheck — symmetric, so repeated toggling nets zero
 * rather than farming points.
 */
export async function toggleHabitToday(uid: string, habit: Habit) {
  const today = todayLocalDate();
  const doneToday = habit.completedDates.includes(today);
  await updateDoc(doc(db, 'users', uid, 'habits', habit.id), {
    completedDates: doneToday ? arrayRemove(today) : arrayUnion(today),
  });
  await awardPoints(uid, doneToday ? -POINTS.completeHabit : POINTS.completeHabit);
}

/** Consecutive days completed, counting back from today (or yesterday, if today isn't done yet). */
export function getHabitStreak(habit: Habit): number {
  const dates = new Set(habit.completedDates);
  const cursor = new Date();
  if (!dates.has(todayLocalDate())) {
    cursor.setDate(cursor.getDate() - 1);
  }

  let streak = 0;
  while (dates.has(localDateString(cursor))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}
