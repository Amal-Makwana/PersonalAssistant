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
      <h2 className="text-xl font-semibold">S04 Events List</h2>
      {loading && <p data-testid="loading-state">Loading events...</p>}
      {!loading && error && <p className="rounded bg-red-50 p-2 text-red-700">{error}</p>}
      {!loading && !error && events.length === 0 && <p className="rounded bg-slate-50 p-2">No events available.</p>}
      {!loading && !error && events.length > 0 && (
        <ul className="mt-2 space-y-2">
          {events.map((event) => (
            <li key={event.id} className="rounded border p-3">
              <p className="font-medium">{event.title}</p>
              <p className="text-sm text-slate-600">Status: {event.status}</p>
              {event.duplicate && <p className="text-sm text-amber-700">Duplicate detected (mocked).</p>}
              <Link className="text-sm text-blue-600" to={`/events/${event.id}`}>
                Open detail
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};
