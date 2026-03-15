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
      <h2 className="text-xl font-semibold">S01 Login & Consent</h2>
      <p className="mb-4 text-sm text-slate-600">Mocked authentication session state only.</p>
      {error && <p className="mb-2 rounded bg-red-50 p-2 text-sm text-red-700">{error}</p>}
      <button className="rounded bg-slate-900 px-4 py-2 text-white" disabled={loading} onClick={handleLogin}>
        {loading ? 'Signing in...' : 'Sign in with Google (Mock)'}
      </button>
    </section>
  );
};
