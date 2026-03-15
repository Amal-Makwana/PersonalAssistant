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
      <h2 className="text-xl font-semibold">S08 Activity & Diagnostics</h2>
      {loading && <p>Loading activity...</p>}
      {!loading && error && <p className="rounded bg-red-50 p-2 text-red-700">{error}</p>}
      {!loading && !error && activity.length === 0 && <p className="rounded bg-slate-50 p-2">No activity records.</p>}
      {!loading && !error && activity.length > 0 && (
        <ul className="space-y-2">
          {activity.map((item) => (
            <li key={item.id} className="rounded border p-2">
              {item.message}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};
