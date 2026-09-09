import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

/**
 * PASTE YOUR FIREBASE CONFIG HERE.
 * Find it in: Firebase Console → Project Settings → General →
 * "Your apps" → the web app config object.
 *
 * This is safe to commit / share — Firebase client config is not a secret.
 * Your actual data is protected separately by Firestore Security Rules
 * (which we'll write when we build the paywall gating).
 */
const firebaseConfig = {
  apiKey: 'REPLACE_ME',
  authDomain: 'REPLACE_ME.firebaseapp.com',
  projectId: 'REPLACE_ME',
  storageBucket: 'REPLACE_ME.appspot.com',
  messagingSenderId: 'REPLACE_ME',
  appId: 'REPLACE_ME',
};

export const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
