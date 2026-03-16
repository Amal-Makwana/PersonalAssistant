import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { MockEventService } from '../../services/mock/mockEventService';
import type { EventItem } from '../../types/models';

type StatusFilter = 'all' | EventItem['status'];

export const EventsListScreen = () => {
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [duplicatesOnly, setDuplicatesOnly] = useState(false);

  useEffect(() => {
    const service = new MockEventService();
    setLoading(true);
    setError(null);
    service
      .listEvents()
      .then(setEvents)
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      if (statusFilter !== 'all' && event.status !== statusFilter) {
        return false;
      }
      if (duplicatesOnly && !event.duplicate) {
        return false;
      }
      return true;
    });
  }, [duplicatesOnly, events, statusFilter]);

  return (
    <section>
      <h2 className="section-title">S04 Events List</h2>
      <p className="section-description mb-5">Data is loaded from backend API endpoints.</p>

      <div className="mb-4 grid gap-2 md:grid-cols-[220px_1fr]">
        <select
          aria-label="Status filter"
          className="input-soft"
          onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
          value={statusFilter}
        >
          <option value="all">All statuses</option>
          <option value="scheduled">Scheduled</option>
          <option value="needs-review">Needs review</option>
          <option value="failed">Failed</option>
        </select>
        <label className="flex items-center gap-2 rounded-lg border border-brand-border-soft bg-white px-3 py-2 text-sm text-slate-700">
          <input checked={duplicatesOnly} onChange={(e) => setDuplicatesOnly(e.target.checked)} type="checkbox" />
          Show duplicates only
        </label>
      </div>

      {loading && (
        <p className="state-banner border-brand-border-alt bg-sky-50 text-sky-700" data-testid="loading-state">
          Loading events...
        </p>
      )}
      {!loading && error && <p className="state-banner border-red-200 bg-red-50 text-red-700">{error}</p>}
      {!loading && !error && filteredEvents.length === 0 && (
        <p className="state-banner border-brand-border-soft bg-slate-50 text-slate-600">No events available for current filters.</p>
      )}
      {!loading && !error && filteredEvents.length > 0 && (
        <ul className="mt-2 space-y-3">
          {filteredEvents.map((event) => (
            <li key={event.id} className="editorial-card editorial-card-hover">
              <p className="font-medium text-brand-text">{event.title}</p>
              <p className="text-sm text-slate-600">Status: {event.status}</p>
              <p className="text-sm text-slate-600">Sync: {event.syncStatus}</p>
              {event.duplicate && <p className="text-sm text-amber-700">Duplicate detected.</p>}
              <Link className="text-sm font-medium text-sky-700 transition-colors hover:text-brand-sky-600" to={`/events/${event.id}`}>
                Open detail
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};
