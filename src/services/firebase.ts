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
  apiKey: 'AIzaSyAI9o3-hdusxBk6JB5LV96Im6Mgu6ARZw8',
  authDomain: 'unfurl-b36a5.firebaseapp.com',
  projectId: 'unfurl-b36a5',
  storageBucket: 'unfurl-b36a5.firebasestorage.app',
  messagingSenderId: '8382599155',
  appId: '1:8382599155:web:ba8c1e075fede886f34c86',
};

export const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
