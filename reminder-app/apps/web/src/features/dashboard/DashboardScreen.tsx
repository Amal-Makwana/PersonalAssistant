import { Link } from 'react-router-dom';

export const DashboardScreen = () => {
  return (
    <section>
      <h2 className="text-xl font-semibold">S03 Dashboard</h2>
      <p className="mb-4 text-sm text-slate-600">Operational overview using mock data.</p>
      <div className="grid gap-2 md:grid-cols-2">
        <Link className="rounded border p-3 hover:bg-slate-50" to="/events">
          View Events
        </Link>
        <Link className="rounded border p-3 hover:bg-slate-50" to="/diagnostics">
          View Diagnostics
        </Link>
        <Link className="rounded border p-3 hover:bg-slate-50" to="/integrations">
          Integration Status
        </Link>
        <Link className="rounded border p-3 hover:bg-slate-50" to="/preferences">
          Preferences
        </Link>
      </div>
    </section>
  );
};
