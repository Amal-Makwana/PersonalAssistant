import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { EventApiService } from '../../services/api/eventApiService';
import type { DashboardSummary } from '../../types/models';

export const DashboardScreen = () => {
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const service = new EventApiService();
    setLoading(true);
    setError(null);
    service
      .getDashboardSummary()
      .then(setSummary)
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section>
      <h2 className="section-title">S03 Dashboard</h2>
      <p className="section-description mb-5">Upcoming reminder overview and direct triage entry points.</p>

      {loading && <p className="state-banner border-brand-border-alt bg-sky-50 text-sky-700">Loading dashboard summary...</p>}
      {!loading && error && <p className="state-banner border-red-200 bg-red-50 text-red-700">{error}</p>}
      {!loading && !error && summary && summary.upcomingCount === 0 && (
        <p className="state-banner border-brand-border-soft bg-slate-50 text-slate-600">No upcoming events returned from backend API.</p>
      )}

      {!loading && !error && summary && summary.upcomingCount > 0 && (
        <div className="grid gap-3 md:grid-cols-3">
          <article className="editorial-card">
            <p className="text-xs uppercase tracking-wide text-slate-500">Upcoming</p>
            <p className="text-2xl font-semibold text-brand-text">{summary.upcomingCount}</p>
          </article>
          <article className="editorial-card">
            <p className="text-xs uppercase tracking-wide text-slate-500">Needs review</p>
            <p className="text-2xl font-semibold text-brand-text">{summary.needsReviewCount}</p>
          </article>
          <article className="editorial-card">
            <p className="text-xs uppercase tracking-wide text-slate-500">Failed sync</p>
            <p className="text-2xl font-semibold text-brand-text">{summary.failedCount}</p>
          </article>
        </div>
      )}

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <Link className="editorial-card editorial-card-hover block p-4 text-sm font-medium text-slate-700" to="/events">
          Open Events List
        </Link>
        {summary?.nextEventId ? (
          <Link
            className="editorial-card editorial-card-hover block p-4 text-sm font-medium text-slate-700"
            to={`/events/${summary.nextEventId}`}
          >
            Open Next Event Detail
          </Link>
        ) : (
          <p className="editorial-card p-4 text-sm text-slate-500">Event detail CTA appears when events exist.</p>
        )}
      </div>
    </section>
  );
};
