import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const OnboardingScreen = () => {
  const navigate = useNavigate();
  const [timezone, setTimezone] = useState('UTC');

  return (
    <section>
      <h2 className="section-title">S02 Onboarding</h2>
      <p className="section-description mb-4">Collect mocked preferences (no backend persistence).</p>
      <label className="mb-2 block text-sm font-medium">Timezone</label>
      <input
        className="input-soft mb-4 max-w-md"
        value={timezone}
        onChange={(e) => setTimezone(e.target.value)}
      />
      <div className="flex gap-2">
        <button className="button-primary" onClick={() => navigate('/dashboard')}>
          Continue
        </button>
        <span className="state-banner border-brand-border-soft bg-slate-50 text-slate-600">Calendar sync: enabled (mock)</span>
      </div>
    </section>
  );
};
