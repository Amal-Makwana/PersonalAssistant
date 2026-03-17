import { useEffect, useState } from 'react';
import { SystemApiService } from '../../services/api/systemApiService';

const systemApiService = new SystemApiService();

export const IntegrationsScreen = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<{ googleAuth: string; gmailIngestion: string; calendarSync: string } | null>(null);

  useEffect(() => {
    systemApiService
      .getIntegrationsStatus()
      .then(setStatus)
      .catch((serviceError) => setError((serviceError as Error).message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section>
      <h2 className="section-title">S07 Integrations</h2>
      <p className="section-description mb-5">Live connectivity and permission states.</p>
      {loading && <p className="state-banner border-brand-border-alt bg-sky-50 text-sky-700">Loading integration status...</p>}
      {!loading && error && <p className="state-banner border-red-200 bg-red-50 text-red-700">{error}</p>}
      {!loading && !error && status && (
        <ul className="space-y-2">
          <li className="editorial-card">Google Auth: {status.googleAuth}</li>
          <li className="editorial-card">Gmail Ingestion: {status.gmailIngestion}</li>
          <li className="editorial-card">Calendar Sync: {status.calendarSync}</li>
        </ul>
      )}
    </section>
  );
};
