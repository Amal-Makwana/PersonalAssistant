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
      <h2 className="section-title">S05 Event Detail</h2>
      <p className="mono-fragment mb-4">eventId={eventId}</p>
      <button className="button-primary" onClick={retry}>
        Retry Sync (Mock)
      </button>
      {message && <p className="state-banner mono-fragment mt-3 border-brand-border-soft bg-slate-50">{message}</p>}
    </section>
  );
};
