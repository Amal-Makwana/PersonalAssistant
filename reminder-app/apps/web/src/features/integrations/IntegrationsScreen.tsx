import { useAppContext } from '../../contexts/AppContext';

export const IntegrationsScreen = () => {
  const { scenario } = useAppContext();
  const hasPermission = scenario !== 'permission';

  return (
    <section>
      <h2 className="section-title">S07 Integrations</h2>
      <p className="section-description mb-5">Mock connectivity and permission states.</p>
      <ul className="space-y-2">
        <li className="editorial-card">Google Auth: {hasPermission ? 'Connected (mock)' : 'Permission denied'}</li>
        <li className="editorial-card">Gmail Ingestion: {hasPermission ? 'Healthy (mock)' : 'Unavailable'}</li>
        <li className="editorial-card">Calendar Sync: {hasPermission ? 'Enabled (mock)' : 'Unavailable'}</li>
      </ul>
    </section>
  );
};
