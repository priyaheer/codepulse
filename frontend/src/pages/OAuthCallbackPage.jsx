import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Logo } from '../components/ui/Logo';
import { Button } from '../components/ui/Button';
import { api } from '../services/api';

export function OAuthCallbackPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const started = useRef(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    const code = new URLSearchParams(location.search).get('code');
    if (!code) {
      setError('The GitHub sign-in code is missing or invalid.');
      return;
    }

    api.exchangeOAuthCode(code)
      .then(({ token }) => {
        if (!token) throw new Error('The sign-in exchange did not return a token.');
        localStorage.setItem('codepulse_token', token);
        navigate('/app/dashboard', { replace: true });
      })
      .catch((exchangeError) => {
        setError(exchangeError.message || 'GitHub sign-in could not be completed.');
      });
  }, [location.search, navigate]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="p-6">
        <Link to="/">
          <Logo />
        </Link>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 pb-16">
        <div className="w-full max-w-sm rounded-lg border border-border bg-surface p-7 text-center">
          {error ? (
            <>
              <h1 className="text-[18px] font-semibold text-text-primary">Sign-in failed</h1>
              <p className="mt-2 text-[13px] text-text-secondary">{error}</p>
              <Button as={Link} to="/login" replace variant="secondary" size="md" className="mt-6">
                Return to sign in
              </Button>
            </>
          ) : (
            <>
              <h1 className="text-[18px] font-semibold text-text-primary">Completing GitHub sign-in</h1>
              <p className="mt-2 text-[13px] text-text-secondary">Please wait while we securely connect your account.</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
