import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const OnboardingScreen = () => {
  const navigate = useNavigate();
  const [timezone, setTimezone] = useState('UTC');

  return (
    <section>
      <h2 className="text-xl font-semibold">S02 Onboarding</h2>
      <p className="mb-4 text-sm text-slate-600">Collect mocked preferences (no backend persistence).</p>
      <label className="mb-2 block text-sm">Timezone</label>
      <input
        className="mb-4 w-full max-w-md rounded border px-2 py-1"
        value={timezone}
        onChange={(e) => setTimezone(e.target.value)}
      />
      <div className="flex gap-2">
        <button className="rounded bg-slate-900 px-4 py-2 text-white" onClick={() => navigate('/dashboard')}>
          Continue
        </button>
        <span className="rounded bg-slate-100 px-3 py-2 text-sm">Calendar sync: enabled (mock)</span>
      </div>
    </section>
  );
};
