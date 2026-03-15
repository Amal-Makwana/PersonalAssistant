import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../../contexts/AppContext';
import { MockEventService } from '../../services/mock/mockEventService';
import type { EventItem } from '../../types/models';

export const EventsListScreen = () => {
  const { scenario } = useAppContext();
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const service = new MockEventService(scenario);
    setLoading(true);
    setError(null);
    service
      .listEvents()
      .then(setEvents)
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, [scenario]);

  return (
    <section>
      <h2 className="section-title">S04 Events List</h2>
      <p className="section-description mb-5">State handling is deterministic and fully mocked locally.</p>
      {loading && (
        <p className="state-banner border-brand-border-alt bg-sky-50 text-sky-700" data-testid="loading-state">
          Loading events...
        </p>
      )}
      {!loading && error && <p className="state-banner border-red-200 bg-red-50 text-red-700">{error}</p>}
      {!loading && !error && events.length === 0 && (
        <p className="state-banner border-brand-border-soft bg-slate-50 text-slate-600">No events available.</p>
      )}
      {!loading && !error && events.length > 0 && (
        <ul className="mt-2 space-y-3">
          {events.map((event) => (
            <li key={event.id} className="editorial-card editorial-card-hover">
              <p className="font-medium text-brand-text">{event.title}</p>
              <p className="text-sm text-slate-600">Status: {event.status}</p>
              {event.duplicate && <p className="text-sm text-amber-700">Duplicate detected (mocked).</p>}
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
