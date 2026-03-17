import type { NotificationHistoryEntry } from '../../../types/models';
import { formatReminderDateTime } from '../utils/reminderPlanCalculator';

interface NotificationHistoryPreviewProps {
  entries: NotificationHistoryEntry[];
  error: string | null;
  loading: boolean;
}

const statusStyles: Record<NotificationHistoryEntry['status'], string> = {
  Scheduled: 'text-sky-700',
  Sent: 'text-teal-700',
  Failed: 'text-red-700',
  Cancelled: 'text-slate-600'
};

export const NotificationHistoryPreview = ({ entries, error, loading }: NotificationHistoryPreviewProps) => {
  return (
    <div className="editorial-card space-y-2">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-600">Notification History Preview</h3>
      {loading && <p className="text-sm text-slate-500">Loading notification history...</p>}
      {!loading && error && <p className="text-sm text-red-700">{error}</p>}
      {!loading && !error && entries.length === 0 && <p className="text-sm text-slate-500">No notification activity yet.</p>}
      {!loading && !error && entries.length > 0 && (
        <ul className="space-y-1">
          {entries.map((entry) => (
            <li className="text-sm text-slate-700" key={entry.id}>
              <span className={`font-medium ${statusStyles[entry.status]}`}>{entry.status}</span> — {formatReminderDateTime(entry.remindAt)} —{' '}
              {entry.channels.map((channel) => channel.toUpperCase()).join(', ')}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
