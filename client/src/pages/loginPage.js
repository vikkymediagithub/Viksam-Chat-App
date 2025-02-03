import React, { useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Auth } from '@supabase/auth-ui-react';
import { useNavigate } from 'react-router-dom';

// Initialize Supabase client
const supabase = createClient(
  'https://wasoetguemdbnjvzopuv.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indhc29ldGd1ZW1kYm5qdnpvcHV2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc1MjEwMDMsImV4cCI6MjA1MzA5NzAwM30.WRs1H-TBzqu8oqdOEo3m8Gj5Mzb5un-8vXPcbg2rR1c'
);

function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    // Listen for auth state changes
    const { data: subscription } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth event:', event, 'Session:', session);

      if (event === 'SIGNED_IN') {
        // Navigate to the success page on sign-in
        navigate('/success');
      } else if (event === 'SIGNED_OUT') {
        // Navigate to the home page on sign-out
        navigate('/');
      }
    });

    // Cleanup subscription when component unmounts
    return () => {
      subscription?.unsubscribe();
    };
  }, [navigate]);

  return (
    <div className="App">
      <header className="App-header">
        <Auth
          supabaseClient={supabase}
          appearance={{
            theme: 'dark', // Use a simple built-in theme
          }}
          providers={['discord']}
        />
      </header>
    </div>
  );
}

export default Login;
