import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppContext } from '../../contexts/AppContext';
import { ReminderChannelsPreview } from './components/ReminderChannelsPreview';
import { ReminderPlanPreview } from './components/ReminderPlanPreview';
import { MockEventService } from '../../services/mock/mockEventService';
import type { EventItem, ReminderChannelConfig, ReminderPlanEntry, ReminderSettings } from '../../types/models';

const defaultReminderSettings: ReminderSettings = {
  primaryMinutesBefore: 60,
  secondaryMinutesBefore: 15,
  timezone: 'UTC'
};

export const EventDetailScreen = () => {
  const { eventId = 'unknown' } = useParams();
  const { scenario } = useAppContext();
  const [event, setEvent] = useState<EventItem | null>(null);
  const [form, setForm] = useState<ReminderSettings>(defaultReminderSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [planLoading, setPlanLoading] = useState(true);
  const [planError, setPlanError] = useState<string | null>(null);
  const [planEntries, setPlanEntries] = useState<ReminderPlanEntry[]>([]);
  const [channelLoading, setChannelLoading] = useState(true);
  const [channelError, setChannelError] = useState<string | null>(null);
  const [channelConfig, setChannelConfig] = useState<ReminderChannelConfig | null>(null);

  useEffect(() => {
    const service = new MockEventService(scenario);
    setLoading(true);
    setError(null);
    setMessage('');
    setPlanLoading(true);
    setPlanError(null);
    setChannelLoading(true);
    setChannelError(null);

    service
      .getEventById(eventId)
      .then((data) => {
        setEvent(data);
        setForm(data.reminderSettings);
      })
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));

    service
      .getReminderPlanPreview(eventId)
      .then((entries) => setPlanEntries(entries))
      .catch((err: Error) => setPlanError(err.message))
      .finally(() => setPlanLoading(false));

    service
      .getReminderChannelPreview()
      .then((config) => setChannelConfig(config))
      .catch((err: Error) => setChannelError(err.message))
      .finally(() => setChannelLoading(false));
  }, [eventId, scenario]);

  const save = async () => {
    const service = new MockEventService(scenario);
    setSaving(true);
    setError(null);
    setMessage('');
    try {
      const result = await service.saveReminderSettings({
        eventId,
        reminderSettings: form
      });
      setMessage(`Saved mock reminder settings at ${result.savedAt}`);
      const updated = await service.getEventById(eventId);
      setEvent(updated);
    } catch (saveError) {
      setError((saveError as Error).message);
    } finally {
      setSaving(false);
    }
  };

  const cancel = () => {
    if (event) {
      setForm(event.reminderSettings);
      setMessage('Edits cancelled (frontend-only state reset).');
    }
  };

  const edit = () => {
    setMessage('Edit mode active (mock frontend state).');
  };

  const retry = async () => {
    const service = new MockEventService(scenario);
    try {
      const result = await service.retrySync(eventId);
      setMessage(`Retry success: ${result.status}`);
    } catch (retryError) {
      setError((retryError as Error).message);
    }
  };

  return (
    <section>
      <h2 className="section-title">S05 Event Detail</h2>
      <p className="mono-fragment mb-4">eventId={eventId}</p>

      {loading && <p className="state-banner border-brand-border-alt bg-sky-50 text-sky-700">Loading event detail...</p>}
      {!loading && error && <p className="state-banner border-red-200 bg-red-50 text-red-700">{error}</p>}

      {!loading && !error && event && (
        <div className="space-y-3">
          <div className="editorial-card">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-600">Event Information</h3>
            <p className="font-medium text-brand-text">{event.title}</p>
            <p className="text-sm text-slate-600">Date: {new Date(event.time).toLocaleString()}</p>
            <p className="text-sm text-slate-600">Location: {event.location ?? 'Not provided'}</p>
            <p className="text-sm text-slate-600">Notes: Mock notes unavailable for this event.</p>
          </div>

          <ReminderPlanPreview entries={planEntries} error={planError} loading={planLoading} />

          <ReminderChannelsPreview channels={channelConfig} error={channelError} loading={channelLoading} />

          <div className="editorial-card space-y-2">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-600">Actions</h3>
            <label className="text-sm text-slate-700">
              Primary reminder (minutes before)
              <input
                className="input-soft mt-1"
                min={1}
                onChange={(e) => setForm((prev) => ({ ...prev, primaryMinutesBefore: Number(e.target.value) }))}
                type="number"
                value={form.primaryMinutesBefore}
              />
            </label>
            <label className="text-sm text-slate-700">
              Secondary reminder (minutes before)
              <input
                className="input-soft mt-1"
                min={1}
                onChange={(e) => setForm((prev) => ({ ...prev, secondaryMinutesBefore: Number(e.target.value) }))}
                type="number"
                value={form.secondaryMinutesBefore}
              />
            </label>
            <label className="text-sm text-slate-700">
              Timezone
              <input
                className="input-soft mt-1"
                onChange={(e) => setForm((prev) => ({ ...prev, timezone: e.target.value }))}
                value={form.timezone}
              />
            </label>
            <div className="flex flex-wrap gap-2">
              <button className="button-primary" onClick={edit} type="button">
                Edit
              </button>
              <button className="button-primary" disabled={saving} onClick={save} type="button">
                {saving ? 'Saving...' : 'Save'}
              </button>
              <button className="button-primary" onClick={cancel} type="button">
                Cancel
              </button>
              <button className="button-primary" onClick={retry} type="button">
                Retry Sync (Mock)
              </button>
            </div>
          </div>
        </div>
      )}

      {message && <p className="state-banner mono-fragment mt-3 border-teal-200 bg-teal-50 text-teal-700">{message}</p>}
    </section>
  );
};
