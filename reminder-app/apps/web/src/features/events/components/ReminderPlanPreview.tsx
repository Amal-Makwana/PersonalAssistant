import type { ReminderPlanEntry } from '../../../types/models';
import { formatReminderDateTime } from '../utils/reminderPlanCalculator';

interface ReminderPlanPreviewProps {
  entries: ReminderPlanEntry[];
  error: string | null;
  loading: boolean;
}

export const ReminderPlanPreview = ({ entries, error, loading }: ReminderPlanPreviewProps) => {
  return (
    <div className="editorial-card space-y-2">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-600">Reminder Plan Preview</h3>
      {loading && <p className="text-sm text-slate-500">Loading reminder plan preview...</p>}
      {!loading && error && <p className="text-sm text-red-700">{error}</p>}
      {!loading && !error && entries.length === 0 && (
        <p className="text-sm text-slate-500">Reminder plan unavailable because event date/time is missing.</p>
      )}
      {!loading && !error && entries.length > 0 && (
        <ul className="space-y-1">
          {entries.map((entry) => (
            <li className="text-sm text-slate-700" key={entry.id}>
              <span className="font-medium text-brand-text">{entry.label}</span> 
              <span aria-hidden>→</span> {formatReminderDateTime(entry.remindAt)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
