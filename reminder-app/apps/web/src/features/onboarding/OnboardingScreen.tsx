import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SystemApiService } from '../../services/api/systemApiService';

const systemApiService = new SystemApiService();

export const OnboardingScreen = () => {
  const navigate = useNavigate();
  const [timezone, setTimezone] = useState('UTC');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const continueFlow = async () => {
    setSaving(true);
    setError(null);

    try {
      await systemApiService.updateProfile({ timezone, calendarSyncEnabled: true });
      navigate('/dashboard');
    } catch (serviceError) {
      setError((serviceError as Error).message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <section>
      <h2 className="section-title">S02 Onboarding</h2>
      <p className="section-description mb-4">Capture initial preferences and persist them to your profile.</p>
      <label className="mb-2 block text-sm font-medium">Timezone</label>
      <input className="input-soft mb-4 max-w-md" value={timezone} onChange={(e) => setTimezone(e.target.value)} />
      {error && <p className="state-banner mb-3 border-red-200 bg-red-50 text-red-700">{error}</p>}
      <div className="flex gap-2">
        <button className="button-primary" disabled={saving} onClick={continueFlow}>
          {saving ? 'Saving...' : 'Continue'}
        </button>
        <span className="state-banner border-brand-border-soft bg-slate-50 text-slate-600">Calendar sync will be enabled by default.</span>
      </div>
    </section>
  );
};
