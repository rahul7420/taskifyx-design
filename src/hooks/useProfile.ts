
import { useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface ProfileData {
  username: string | null;
  email: string | null;
  phone: string | null;
  bio: string | null;
}

export const useProfile = () => {
  const [isLoading, setIsLoading] = useState(false);

  const fetchProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');

      const { data: profile, error } = await supabase
        .from('profiles')
        .select('username, bio, phone')
        .eq('id', user.id)
        .single();

      if (error) throw error;

      return {
        username: profile?.username || '',
        email: user.email,
        bio: profile?.bio || '',
        phone: profile?.phone || '',
      };
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast.error('Failed to load profile');
      return null;
    }
  };

  const updateProfile = async (profileData: Partial<ProfileData>) => {
    try {
      setIsLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');

      const { error } = await supabase
        .from('profiles')
        .update({
          username: profileData.username,
          bio: profileData.bio,
          phone: profileData.phone,
        })
        .eq('id', user.id);

      if (error) throw error;

      toast.success('Profile updated successfully');
      return true;
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    fetchProfile,
    updateProfile,
    isLoading,
  };
};
