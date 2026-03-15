import { useState } from 'react';

export const PreferencesScreen = () => {
  const [timezone, setTimezone] = useState('UTC');
  const [saved, setSaved] = useState(false);

  return (
    <section>
      <h2 className="section-title">S06 Preferences</h2>
      <p className="section-description mb-4">In-memory mock preference updates.</p>
      <label className="mb-1 block text-sm font-medium">Timezone</label>
      <input
        className="input-soft mb-3 max-w-md"
        value={timezone}
        onChange={(e) => setTimezone(e.target.value)}
      />
      <button
        className="button-primary"
        onClick={() => {
          setSaved(true);
          setTimeout(() => setSaved(false), 800);
        }}
      >
        Save (Mock)
      </button>
      {saved && <p className="state-banner mt-3 border-teal-200 bg-teal-50 text-teal-700">Preferences saved locally.</p>}
    </section>
  );
};
