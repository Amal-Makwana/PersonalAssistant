import { useState } from 'react';

export const PreferencesScreen = () => {
  const [timezone, setTimezone] = useState('UTC');
  const [saved, setSaved] = useState(false);

  return (
    <section>
      <h2 className="text-xl font-semibold">S06 Preferences</h2>
      <p className="mb-4 text-sm text-slate-600">In-memory mock preference updates.</p>
      <label className="mb-1 block text-sm">Timezone</label>
      <input
        className="mb-3 w-full max-w-md rounded border px-2 py-1"
        value={timezone}
        onChange={(e) => setTimezone(e.target.value)}
      />
      <button
        className="rounded bg-slate-900 px-4 py-2 text-white"
        onClick={() => {
          setSaved(true);
          setTimeout(() => setSaved(false), 800);
        }}
      >
        Save (Mock)
      </button>
      {saved && <p className="mt-2 text-sm text-green-700">Preferences saved locally.</p>}
    </section>
  );
};
