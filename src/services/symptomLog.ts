import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import { db } from './firebase';

export interface SymptomLogEntry {
  id: string;
  category: string;
  severity: number;
  note: string;
  loggedAt: Timestamp | null;
}

export interface NewSymptomLogEntry {
  category: string;
  severity: number;
  note: string;
}

export async function addSymptomLogEntry(uid: string, entry: NewSymptomLogEntry) {
  await addDoc(collection(db, 'users', uid, 'symptomLogs'), {
    ...entry,
    loggedAt: serverTimestamp(),
  });
}

/** Subscribes to a user's symptom log entries, newest first. Returns an unsubscribe function. */
export function subscribeToSymptomLogs(
  uid: string,
  onChange: (entries: SymptomLogEntry[]) => void
): () => void {
  const q = query(collection(db, 'users', uid, 'symptomLogs'), orderBy('loggedAt', 'desc'));
  return onSnapshot(q, (snapshot) => {
    onChange(
      snapshot.docs.map((docSnapshot) => {
        const data = docSnapshot.data();
        return {
          id: docSnapshot.id,
          category: data.category as string,
          severity: data.severity as number,
          note: (data.note as string) ?? '',
          loggedAt: (data.loggedAt as Timestamp) ?? null,
        };
      })
    );
  });
}
