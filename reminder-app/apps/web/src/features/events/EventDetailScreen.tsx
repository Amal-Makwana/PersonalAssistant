import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppContext } from '../../contexts/AppContext';
import { MockEventService } from '../../services/mock/mockEventService';

export const EventDetailScreen = () => {
  const { eventId = 'unknown' } = useParams();
  const { scenario } = useAppContext();
  const [message, setMessage] = useState('');

  const retry = async () => {
    const service = new MockEventService(scenario);
    try {
      const result = await service.retrySync(eventId);
      setMessage(`Retry success: ${result.status}`);
    } catch (error) {
      setMessage((error as Error).message);
    }
  };

  return (
    <section>
      <h2 className="text-xl font-semibold">S05 Event Detail</h2>
      <p className="mb-4 text-sm text-slate-600">Event ID: {eventId}</p>
      <button className="rounded bg-slate-900 px-4 py-2 text-white" onClick={retry}>
        Retry Sync (Mock)
      </button>
      {message && <p className="mt-3 rounded bg-slate-50 p-2 text-sm">{message}</p>}
    </section>
  );
};
