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
};

/** Maps a Firebase Auth error to a friendly message, falling back to a generic one. */
export function getAuthErrorMessage(error: unknown): string {
  if (error instanceof FirebaseError && MESSAGES[error.code]) {
    return MESSAGES[error.code];
  }
  return 'Something went wrong. Try again.';
}
