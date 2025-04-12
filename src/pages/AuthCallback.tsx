
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import LoadingScreen from '@/components/auth/LoadingScreen';

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const { hash } = window.location;
    if (hash) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session) {
          navigate('/dashboard');
        } else {
          navigate('/');
        }
      });
    }
  }, [navigate]);

  return <LoadingScreen />;
};

export default AuthCallback;
