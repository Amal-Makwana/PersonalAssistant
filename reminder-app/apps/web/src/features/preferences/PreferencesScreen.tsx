import { useEffect, useState } from 'react';
import { SystemApiService } from '../../services/api/systemApiService';

const systemApiService = new SystemApiService();

export const PreferencesScreen = () => {
  const [timezone, setTimezone] = useState('UTC');
  const [calendarSyncEnabled, setCalendarSyncEnabled] = useState(true);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    systemApiService
      .getProfile()
      .then((profile) => {
        setTimezone(profile.timezone);
        setCalendarSyncEnabled(profile.calendarSyncEnabled);
      })
      .catch((serviceError) => setError((serviceError as Error).message))
      .finally(() => setLoading(false));
  }, []);

  const save = async () => {
    setError(null);
    try {
      await systemApiService.updateProfile({ timezone, calendarSyncEnabled });
      setSaved(true);
      setTimeout(() => setSaved(false), 800);
    } catch (serviceError) {
      setError((serviceError as Error).message);
    }
  };

  return (
    <section>
      <h2 className="section-title">S06 Preferences</h2>
      <p className="section-description mb-4">Manage your reminder preferences.</p>
      {loading && <p className="state-banner border-brand-border-alt bg-sky-50 text-sky-700">Loading preferences...</p>}
      {!loading && (
        <>
          <label className="mb-1 block text-sm font-medium">Timezone</label>
          <input className="input-soft mb-3 max-w-md" value={timezone} onChange={(e) => setTimezone(e.target.value)} />
          <label className="mb-3 flex items-center gap-2 text-sm text-slate-700">
            <input checked={calendarSyncEnabled} onChange={(event) => setCalendarSyncEnabled(event.target.checked)} type="checkbox" />
            Calendar sync enabled
          </label>
          <button className="button-primary" onClick={save}>
            Save
          </button>
        </>
      )}
      {error && <p className="state-banner mt-3 border-red-200 bg-red-50 text-red-700">{error}</p>}
      {saved && <p className="state-banner mt-3 border-teal-200 bg-teal-50 text-teal-700">Preferences saved.</p>}
    </section>
  );
};
