import { useEffect, useState, type ReactNode } from 'react';
import esriId from '@arcgis/core/identity/IdentityManager';

const portalUrl = 'https://hqplantations.maps.arcgis.com';

interface AuthGuardProps {
  children: ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const [authStatus, setAuthStatus] = useState<
    'loading' | 'authenticated' | 'error'
  >('loading');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    let cancelled = false;

    const authenticate = async () => {
      try {
        await esriId.checkSignInStatus(`${portalUrl}/sharing`);
        if (!cancelled) setAuthStatus('authenticated');
      } catch {
        try {
          await esriId.getCredential(`${portalUrl}/sharing`);
          if (!cancelled) setAuthStatus('authenticated');
        } catch (err) {
          const error = err as Error;
          if (!cancelled) {
            setAuthStatus('error');
            setErrorMessage(error.message || 'Authentication failed');
          }
        }
      }
    };

    authenticate();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleSignIn = async () => {
    setAuthStatus('loading');
    setErrorMessage('');
    try {
      await esriId.getCredential(`${portalUrl}/sharing`);
      setAuthStatus('authenticated');
    } catch (err) {
      const error = err as Error;
      setErrorMessage(`Sign in failed: ${error.message}`);
      setAuthStatus('error');
    }
  };

  if (authStatus === 'loading') {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <p>Authenticating...</p>
      </div>
    );
  }

  if (authStatus === 'error') {
    return (
      <div style={{ padding: '2rem' }}>
        <div
          style={{
            padding: '1rem',
            background: '#ffebee',
            borderRadius: '4px',
            marginBottom: '1rem',
          }}
        >
          <strong>Error:</strong> {errorMessage}
        </div>
        <button
          onClick={handleSignIn}
          style={{
            padding: '0.5rem 1rem',
            background: '#1976d2',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Sign In with ArcGIS
        </button>
      </div>
    );
  }

  return <>{children}</>;
}
