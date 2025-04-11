// src/hooks/useUserProfile.js
import { useState, useEffect } from 'react';
import { useUser, useAuth } from '@clerk/nextjs';
import { fetchOrCreateUserProfile } from '@/services/api';

export function useUserProfile() {
  const { user, isLoaded: isUserLoaded } = useUser();
  const { getToken } = useAuth();
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadUserProfile() {
      if (!isUserLoaded || !user) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        
        // Get username from Clerk user object
        const userName = user.firstName 
          ? `${user.firstName} ${user.lastName || ''}`.trim() 
          : user.username || user.emailAddresses[0].emailAddress;
        
        // Get session token from Clerk
        const sessionToken = await getToken();
        
        const userProfile = await fetchOrCreateUserProfile(user.id, userName, sessionToken);
        setProfile(userProfile);
        setError(null);
      } catch (err) {
        console.error('Failed to load user profile:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    loadUserProfile();
  }, [user, isUserLoaded, getToken]);

  return { profile, isLoading, error };
}