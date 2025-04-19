
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

export interface UserProfile {
  id: string;
  username: string | null;
  avatar_url: string | null;
  bio: string | null;
  role: string | null;
  custom_avatar_url: string | null;
  custom_icon_letter: string | null;
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
          .select('id, username, avatar_url, bio, role, custom_avatar_url, custom_icon_letter')
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

  // Get display character for avatar
  const getAvatarCharacter = () => {
    if (!profile) return 'U';
    
    // Priority: custom letter > first letter of username > default
    if (profile.custom_icon_letter) {
      return profile.custom_icon_letter;
    } else if (profile.username && profile.username.length > 0) {
      return profile.username.charAt(0).toUpperCase();
    } else {
      return 'U';
    }
  };

  // Get avatar image URL with fallbacks
  const getAvatarUrl = () => {
    if (!profile) return null;
    
    // Priority: custom avatar > default avatar > null
    return profile.custom_avatar_url || profile.avatar_url;
  };

  // Format the display name with fallbacks
  const getFullName = () => {
    if (!profile) return 'User';
    
    if (profile.username) {
      return profile.username;
    } else {
      return 'User';
    }
  };

  // Update user's custom avatar URL
  const updateCustomAvatar = async (url: string) => {
    if (!user) return { error: 'Not authenticated' };
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ custom_avatar_url: url })
        .eq('id', user.id);
      
      if (error) throw error;
      
      setProfile(prev => prev ? { ...prev, custom_avatar_url: url } : null);
      return { success: true };
    } catch (error) {
      console.error('Error updating custom avatar:', error);
      return { error: 'Failed to update avatar' };
    }
  };

  // Update user's custom icon letter
  const updateCustomIconLetter = async (letter: string) => {
    if (!user) return { error: 'Not authenticated' };
    if (!letter || letter.length === 0) return { error: 'Letter is required' };
    
    const firstChar = letter.charAt(0).toUpperCase();
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ custom_icon_letter: firstChar })
        .eq('id', user.id);
      
      if (error) throw error;
      
      setProfile(prev => prev ? { ...prev, custom_icon_letter: firstChar } : null);
      return { success: true };
    } catch (error) {
      console.error('Error updating custom icon letter:', error);
      return { error: 'Failed to update icon letter' };
    }
  };

  // Reset to default (remove custom settings)
  const resetToDefault = async () => {
    if (!user) return { error: 'Not authenticated' };
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ 
          custom_avatar_url: null,
          custom_icon_letter: null
        })
        .eq('id', user.id);
      
      if (error) throw error;
      
      setProfile(prev => prev ? { 
        ...prev, 
        custom_avatar_url: null,
        custom_icon_letter: null
      } : null);
      return { success: true };
    } catch (error) {
      console.error('Error resetting profile:', error);
      return { error: 'Failed to reset profile' };
    }
  };

  return {
    profile,
    isLoading,
    error,
    getFullName,
    getAvatarCharacter,
    getAvatarUrl,
    updateCustomAvatar,
    updateCustomIconLetter,
    resetToDefault
  };
};
