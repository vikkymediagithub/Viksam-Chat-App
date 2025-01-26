import React, { useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Auth, ThemeSupa } from '@supabase/auth-ui-react';
import { useNavigate } from 'react-router-dom';
import { ThemeSupa } from '@supabase/auth-ui-react';

// Initialize Supabase client
const supabase = createClient(
  'https://wasoetguemdbnjvzopuv.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indhc29ldGd1ZW1kYm5qdnpvcHV2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc1MjEwMDMsImV4cCI6MjA1MzA5NzAwM30.WRs1H-TBzqu8oqdOEo3m8Gj5Mzb5un-8vXPcbg2rR1c'
);

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Listen for auth state changes
    const { data: subscription } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN') {
        // Navigate to success page on sign-in
        navigate('/success');
      } else if (event === 'SIGNED_OUT') {
        // Navigate to home page on sign-out
        navigate('/');
      }
    });

    // Cleanup subscription on component unmount
    return () => {
      subscription?.unsubscribe();
    };
  }, [navigate]);

  return (
    <div className="App">
      <header className="App-header">
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          theme="dark"
          providers={['discord']}
        />
      </header>
    </div>
  );
};

export default Login;
