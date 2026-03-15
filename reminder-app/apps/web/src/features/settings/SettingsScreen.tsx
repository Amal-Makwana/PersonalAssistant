import { useState } from 'react';

export const SettingsScreen = () => {
  const [signedOut, setSignedOut] = useState(false);

  return (
    <section>
      <h2 className="text-xl font-semibold">S09 Settings / Profile</h2>
      <p className="mb-4 text-sm text-slate-600">Session controls are mocked for local prototype.</p>
      <button className="rounded bg-slate-900 px-4 py-2 text-white" onClick={() => setSignedOut(true)}>
        Sign Out (Mock)
      </button>
      {signedOut && <p className="mt-3 rounded bg-slate-50 p-2 text-sm">Session ended locally.</p>}
    </section>
  );
};
