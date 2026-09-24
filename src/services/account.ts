import { collection, getDocs, writeBatch, doc } from 'firebase/firestore';
import { db } from './firebase';

/**
 * Deletes all of a user's Firestore data — both subcollections
 * (symptomLogs, habits) and the profile doc itself. Firestore doesn't
 * cascade-delete subcollections when a parent doc is removed, so each one
 * has to be cleared explicitly. Call this while still signed in, before
 * deleting the Auth user — security rules require request.auth to match.
 */
export async function deleteAllUserData(uid: string) {
  const batch = writeBatch(db);

  const symptomLogsSnap = await getDocs(collection(db, 'users', uid, 'symptomLogs'));
  symptomLogsSnap.forEach((docSnapshot) => batch.delete(docSnapshot.ref));

  const habitsSnap = await getDocs(collection(db, 'users', uid, 'habits'));
  habitsSnap.forEach((docSnapshot) => batch.delete(docSnapshot.ref));

  batch.delete(doc(db, 'users', uid));

  await batch.commit();
}
