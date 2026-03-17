import { useState } from 'react';

export const SettingsScreen = () => {
  const [signedOut, setSignedOut] = useState(false);

  return (
    <section>
      <h2 className="section-title">S09 Settings / Profile</h2>
      <p className="section-description mb-4">Session controls and profile maintenance.</p>
      <button className="button-primary" onClick={() => setSignedOut(true)}>
        Sign Out
      </button>
      {signedOut && <p className="state-banner mt-3 border-brand-border-soft bg-slate-50 text-slate-600">Session ended.</p>}
    </section>
  );
};
