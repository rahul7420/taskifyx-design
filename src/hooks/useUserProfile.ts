
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

export interface UserProfile {
  id: string;
  username: string | null;
  avatar_url: string | null;
}

export const useUserProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!user) {
        setProfile(null);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('id, username, avatar_url')
          .eq('id', user.id)
          .single();

        if (error) {
          console.error('Error fetching user profile:', error);
          setError(error.message);
          toast.error('Failed to load your profile');
        } else if (data) {
          setProfile(data);
        }
      } catch (err) {
        console.error('Unexpected error:', err);
        setError('An unexpected error occurred');
        toast.error('Failed to load your profile');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, [user]);

  // Format the display name with fallbacks
  const getDisplayName = () => {
    if (!profile) return 'User';
    return profile.username || 'User';
  };

  // Get the avatar initial (first letter of username)
  const getAvatarInitial = () => {
    if (!profile || !profile.username) return 'U';
    return profile.username.charAt(0).toUpperCase();
  };

  return {
    profile,
    isLoading,
    error,
    getDisplayName,
    getAvatarInitial
  };
};
