import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';

/** Saves the deep-intake questionnaire answers to the user's profile doc. */
export async function saveIntakeResponses(uid: string, answers: Record<string, string>) {
  await setDoc(
    doc(db, 'users', uid),
    { intake: answers, intakeCompletedAt: serverTimestamp() },
    { merge: true }
  );
}
