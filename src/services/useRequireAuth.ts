import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { useAuth } from './useAuth';

/** Redirects to /auth once the initial auth check resolves and no user is signed in. Returns the current auth state so callers can show a loading state until `initializing` is false. */
export function useRequireAuth() {
  const router = useRouter();
  const { user, initializing } = useAuth();

  useEffect(() => {
    if (!initializing && !user) {
      router.replace('/auth');
    }
  }, [initializing, user, router]);

  return { user, initializing };
}
