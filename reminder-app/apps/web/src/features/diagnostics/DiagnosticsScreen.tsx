import { useEffect, useState } from 'react';
import { useAppContext } from '../../contexts/AppContext';
import { MockDiagnosticsService } from '../../services/mock/mockDiagnosticsService';
import type { ActivityLog } from '../../types/models';

export const DiagnosticsScreen = () => {
  const { scenario } = useAppContext();
  const [loading, setLoading] = useState(true);
  const [activity, setActivity] = useState<ActivityLog[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const service = new MockDiagnosticsService(scenario);
    setLoading(true);
    setError(null);
    service
      .getActivity()
      .then(setActivity)
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, [scenario]);

  return (
    <section>
      <h2 className="section-title">S08 Activity & Diagnostics</h2>
      <p className="section-description mb-5">Machine-like diagnostics surfaces use selective monospaced typography.</p>
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
