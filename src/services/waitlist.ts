import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(email: string): boolean {
  return EMAIL_PATTERN.test(email.trim());
}

export interface WaitlistSubmission {
  email: string;
  pathId: string;
  answers: Record<string, string>;
}

/**
 * Writes a waitlist signup to Firestore's `waitlist` collection.
 * Throws if the email is malformed or the write fails (e.g. Firebase
 * config is still the REPLACE_ME placeholder) — callers should catch
 * and show an inline error rather than crash the flow.
 */
export async function joinWaitlist({ email, pathId, answers }: WaitlistSubmission): Promise<void> {
  const trimmed = email.trim().toLowerCase();
  if (!isValidEmail(trimmed)) {
    throw new Error('Enter a valid email address.');
  }

  await addDoc(collection(db, 'waitlist'), {
    email: trimmed,
    pathId,
    answers,
    createdAt: serverTimestamp(),
  });
}
