import { useAppContext } from '../../contexts/AppContext';

export const IntegrationsScreen = () => {
  const { scenario } = useAppContext();
  const hasPermission = scenario !== 'permission';

  return (
    <section>
      <h2 className="text-xl font-semibold">S07 Integrations</h2>
      <p className="mb-4 text-sm text-slate-600">Mock connectivity and permission states.</p>
      <ul className="space-y-2">
        <li className="rounded border p-2">Google Auth: {hasPermission ? 'Connected (mock)' : 'Permission denied'}</li>
        <li className="rounded border p-2">Gmail Ingestion: {hasPermission ? 'Healthy (mock)' : 'Unavailable'}</li>
        <li className="rounded border p-2">Calendar Sync: {hasPermission ? 'Enabled (mock)' : 'Unavailable'}</li>
      </ul>
    </section>
  );
};
