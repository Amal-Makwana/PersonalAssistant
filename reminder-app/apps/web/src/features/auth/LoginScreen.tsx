import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MockAuthService } from '../../services/mock/mockAuthService';

const authService = new MockAuthService();

export const LoginScreen = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      await authService.signIn();
      navigate('/onboarding');
    } catch {
      setError('Mock login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <h2 className="section-title">S01 Login & Consent</h2>
      <p className="section-description mb-5">Mocked authentication session state only.</p>
      {error && <p className="state-banner mb-3 border-red-200 bg-red-50 text-red-700">{error}</p>}
      <button className="button-primary" disabled={loading} onClick={handleLogin}>
        {loading ? 'Signing in...' : 'Sign in with Google (Mock)'}
      </button>
    </section>
  );
};
