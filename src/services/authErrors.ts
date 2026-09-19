import { FirebaseError } from 'firebase/app';

const MESSAGES: Record<string, string> = {
  'auth/invalid-email': 'That email address doesn’t look right.',
  'auth/user-not-found': 'No account found with that email.',
  'auth/wrong-password': 'Incorrect password. Try again.',
  'auth/invalid-credential': 'Incorrect email or password.',
  'auth/email-already-in-use': 'An account already exists with that email.',
  'auth/weak-password': 'Password should be at least 6 characters.',
  'auth/too-many-requests': 'Too many attempts. Wait a moment and try again.',
  'auth/network-request-failed': 'Network error — check your connection and try again.',
  'auth/operation-not-allowed':
    'Email/Password sign-in isn’t enabled for this Firebase project yet — enable it under Authentication → Sign-in method.',
  'auth/configuration-not-found':
    'Firebase Auth isn’t configured for this project yet — enable Email/Password under Authentication → Sign-in method.',
  'auth/api-key-not-valid.-please-pass-a-valid-api-key.':
    'The Firebase API key in firebase.ts looks invalid — double check it was copied correctly.',
};

/**
 * Maps a Firebase Auth error to a friendly message, falling back to a
 * generic one. Unmapped errors are logged so the real code is visible in
 * Metro's terminal output — the fallback message alone isn't enough to
 * debug a new failure mode.
 */
export function getAuthErrorMessage(error: unknown): string {
  if (error instanceof FirebaseError) {
    if (MESSAGES[error.code]) {
      return MESSAGES[error.code];
    }
    console.error('Unmapped Firebase Auth error:', error.code, error.message);
  } else {
    console.error('Unexpected auth error:', error);
  }
  return 'Something went wrong. Try again.';
}
