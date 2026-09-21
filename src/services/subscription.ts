import {
  doc,
  onSnapshot,
  setDoc,
  serverTimestamp,
  Timestamp,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore';
import { db } from './firebase';

export type SubscriptionStatus = 'free' | 'active';

export interface UserProfile {
  subscriptionStatus: SubscriptionStatus;
  intakeCompletedAt: Timestamp | null;
  intake: Record<string, string> | null;
  /** Composite `${sectionSlug}:${stepId}` ids — see src/data/contentLibrary.ts. */
  completedSteps: string[];
  points: number;
  streakDays: number;
  /** YYYY-MM-DD, local date of the last daily-visit credit — see src/services/gamification.ts. */
  lastActiveDate: string | null;
}

/** Subscribes to a user's profile doc (users/{uid}) and calls onChange whenever it updates. Returns an unsubscribe function. */
export function subscribeToUserProfile(
  uid: string,
  onChange: (profile: UserProfile) => void
): () => void {
  return onSnapshot(doc(db, 'users', uid), (snapshot) => {
    const data = snapshot.data();
    onChange({
      subscriptionStatus: (data?.subscriptionStatus as SubscriptionStatus) ?? 'free',
      intakeCompletedAt: (data?.intakeCompletedAt as Timestamp) ?? null,
      intake: (data?.intake as Record<string, string>) ?? null,
      completedSteps: (data?.completedSteps as string[]) ?? [],
      points: (data?.points as number) ?? 0,
      streakDays: (data?.streakDays as number) ?? 0,
      lastActiveDate: (data?.lastActiveDate as string) ?? null,
    });
  });
}

/**
 * DEV-ONLY: flips the current user's subscription status without any real
 * payment, so the freemium paywall can be tested before real billing
 * (Stripe / Apple IAP) is wired up — see the README's "Billing" section for
 * what that needs. This writes directly to a field the client also reads to
 * gate content, so it is NOT secure — a determined user could grant
 * themselves access the same way. Acceptable pre-launch; must move to a
 * backend-only field once real billing exists.
 */
export async function devSetSubscriptionStatus(uid: string, status: SubscriptionStatus) {
  await setDoc(
    doc(db, 'users', uid),
    { subscriptionStatus: status, updatedAt: serverTimestamp() },
    { merge: true }
  );
}

/** Marks a content step's completion id present or absent for the given user. */
export async function setStepCompletion(uid: string, compositeStepId: string, completed: boolean) {
  await setDoc(
    doc(db, 'users', uid),
    { completedSteps: completed ? arrayUnion(compositeStepId) : arrayRemove(compositeStepId) },
    { merge: true }
  );
}
