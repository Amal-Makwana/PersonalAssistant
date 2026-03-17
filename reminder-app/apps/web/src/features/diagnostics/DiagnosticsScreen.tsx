import { useEffect, useState } from 'react';
import { SystemApiService } from '../../services/api/systemApiService';
import type { ActivityLog } from '../../types/models';

const systemApiService = new SystemApiService();

export const DiagnosticsScreen = () => {
  const [loading, setLoading] = useState(true);
  const [activity, setActivity] = useState<ActivityLog[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    systemApiService
      .getActivity()
      .then(setActivity)
      .catch((serviceError) => setError((serviceError as Error).message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section>
      <h2 className="section-title">S08 Activity & Diagnostics</h2>
      <p className="section-description mb-5">Recent ingestion and processing events.</p>
      {loading && <p className="state-banner border-brand-border-alt bg-sky-50 text-sky-700">Loading activity...</p>}
      {!loading && error && <p className="state-banner border-red-200 bg-red-50 text-red-700">{error}</p>}
      {!loading && !error && activity.length === 0 && (
        <p className="state-banner border-brand-border-soft bg-slate-50 text-slate-600">No activity records.</p>
      )}
      {!loading && !error && activity.length > 0 && (
        <ul className="space-y-3">
          {activity.map((item) => (
            <li key={item.id} className="editorial-card mono-fragment">
              {item.message}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};
