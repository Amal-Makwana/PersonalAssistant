import { Link } from 'react-router-dom';

export const DashboardScreen = () => {
  return (
    <section>
      <h2 className="section-title">S03 Dashboard</h2>
      <p className="section-description mb-5">Operational overview using mock data.</p>
      <div className="grid gap-3 md:grid-cols-2">
        <Link className="editorial-card editorial-card-hover block p-4 text-sm font-medium text-slate-700" to="/events">
          View Events
        </Link>
        <Link className="editorial-card editorial-card-hover block p-4 text-sm font-medium text-slate-700" to="/diagnostics">
          View Diagnostics
        </Link>
        <Link className="editorial-card editorial-card-hover block p-4 text-sm font-medium text-slate-700" to="/integrations">
          Integration Status
        </Link>
        <Link className="editorial-card editorial-card-hover block p-4 text-sm font-medium text-slate-700" to="/preferences">
          Preferences
        </Link>
      </div>
    </section>
  );
};
