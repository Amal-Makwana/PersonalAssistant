import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppContext } from '../../contexts/AppContext';
import { MockEventService } from '../../services/mock/mockEventService';
import type { EventItem, NotificationHistoryEntry, ReminderChannelConfig, SaveReminderResult } from '../../types/models';
import { EditableReminderPlan } from './components/EditableReminderPlan';
import { NotificationHistoryPreview } from './components/NotificationHistoryPreview';
import { ReminderChannelsPreview } from './components/ReminderChannelsPreview';
import { ReminderPlanPreview } from './components/ReminderPlanPreview';
import { SchedulingConfirmation } from './components/SchedulingConfirmation';
import { calculateReminderPlanFromOffsets, validateReminderOffsetMinutes } from './utils/reminderPlanCalculator';

export const EventDetailScreen = () => {
  const { eventId = 'unknown' } = useParams();
  const { scenario } = useAppContext();
  const [event, setEvent] = useState<EventItem | null>(null);
  const [editableOffsets, setEditableOffsets] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [planLoading, setPlanLoading] = useState(true);
  const [planError, setPlanError] = useState<string | null>(null);
  const [channelLoading, setChannelLoading] = useState(true);
  const [channelError, setChannelError] = useState<string | null>(null);
  const [channelConfig, setChannelConfig] = useState<ReminderChannelConfig | null>(null);
  const [historyLoading, setHistoryLoading] = useState(true);
  const [historyError, setHistoryError] = useState<string | null>(null);
  const [historyEntries, setHistoryEntries] = useState<NotificationHistoryEntry[]>([]);
  const [saveResult, setSaveResult] = useState<SaveReminderResult | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);

  useEffect(() => {
    const service = new MockEventService(scenario);
    setLoading(true);
    setError(null);
    setMessage('');
    setPlanLoading(true);
    setPlanError(null);
    setChannelLoading(true);
    setChannelError(null);
    setHistoryLoading(true);
    setHistoryError(null);
    setSaveError(null);
    setSaveResult(null);

    service
      .getEventById(eventId)
      .then((data) => {
        setEvent(data);
        setEditableOffsets([...data.reminderOffsetsMinutes]);
      })
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));

    service
      .getReminderPlanPreview(eventId)
      .then(() => undefined)
      .catch((err: Error) => setPlanError(err.message))
      .finally(() => setPlanLoading(false));

    service
      .getReminderChannelPreview()
      .then((config) => setChannelConfig(config))
      .catch((err: Error) => setChannelError(err.message))
      .finally(() => setChannelLoading(false));

    service
      .getNotificationHistoryPreview(eventId)
      .then((entries) => setHistoryEntries(entries))
      .catch((err: Error) => setHistoryError(err.message))
      .finally(() => setHistoryLoading(false));
  }, [eventId, scenario]);

  const validationError = useMemo(() => {
    if (editableOffsets.length === 0) {
      return 'Add at least one reminder offset before saving.';
    }
    return editableOffsets.map(validateReminderOffsetMinutes).find((value) => Boolean(value)) ?? null;
  }, [editableOffsets]);

  const planEntries = useMemo(() => {
    if (!event) {
      return [];
    }
    return calculateReminderPlanFromOffsets(event.time, editableOffsets);
  }, [event, editableOffsets]);

  const save = async () => {
    if (!event || !channelConfig) {
      return;
    }

    if (validationError) {
      setSaveError(validationError);
      return;
    }

    const service = new MockEventService(scenario);
    setSaving(true);
    setError(null);
    setMessage('');
    setSaveError(null);
    setSaveResult(null);

    try {
      const result = await service.saveReminderSettings({
        eventId,
        reminderOffsetsMinutes: editableOffsets,
        channels: channelConfig
      });
      setSaveResult(result);
      setMessage(`Saved mock reminder settings at ${result.savedAt}`);
      const updated = await service.getEventById(eventId);
      setEvent(updated);
    } catch (saveAttemptError) {
      setSaveError((saveAttemptError as Error).message);
    } finally {
      setSaving(false);
    }
  };

  const cancel = () => {
    if (event) {
      setEditableOffsets([...event.reminderOffsetsMinutes]);
      setMessage('Edits cancelled (frontend-only state reset).');
      setSaveError(null);
      setSaveResult(null);
    }
  };

  const edit = () => {
    setMessage('Edit mode active (mock frontend state).');
  };

  const retry = async () => {
    await save();
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

          <EditableReminderPlan eventTime={event.time} offsetsMinutes={editableOffsets} onChange={setEditableOffsets} />

          <ReminderChannelsPreview channels={channelConfig} error={channelError} loading={channelLoading} onChange={setChannelConfig} />

          <div className="editorial-card space-y-2">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-600">Actions</h3>
            {validationError && <p className="text-sm text-red-700">{validationError}</p>}
            <div className="flex flex-wrap gap-2">
              <button className="button-primary" onClick={edit} type="button">
                Edit
              </button>
              <button className="button-primary" disabled={saving || Boolean(validationError)} onClick={save} type="button">
                {saving ? 'Saving...' : 'Save'}
              </button>
              <button className="button-primary" onClick={cancel} type="button">
                Cancel
              </button>
            </div>
          </div>

          <SchedulingConfirmation error={saveError} onRetry={retry} result={saveResult} />

          <NotificationHistoryPreview entries={historyEntries} error={historyError} loading={historyLoading} />
        </div>
      )}

      {message && <p className="state-banner mono-fragment mt-3 border-teal-200 bg-teal-50 text-teal-700">{message}</p>}
    </section>
  );
};
