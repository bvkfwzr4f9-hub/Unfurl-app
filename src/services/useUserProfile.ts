import { useEffect, useState } from 'react';
import { subscribeToUserProfile, type UserProfile } from './subscription';

/** Live user profile (subscription status, intake completion) for the given uid, or null if signed out / still loading. */
export function useUserProfile(uid: string | undefined): UserProfile | null {
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    if (!uid) {
      setProfile(null);
      return;
    }
    return subscribeToUserProfile(uid, setProfile);
  }, [uid]);

  return profile;
}
