import type { SaveReminderResult } from '../../../types/models';

interface SchedulingConfirmationProps {
  error: string | null;
  result: SaveReminderResult | null;
  onRetry: () => void;
}

export const SchedulingConfirmation = ({ error, result, onRetry }: SchedulingConfirmationProps) => {
  if (error) {
    return (
      <div className="editorial-card space-y-2 border-red-200 bg-red-50">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-red-700">Scheduling Confirmation</h3>
        <p className="text-sm text-red-700">{error}</p>
        <button className="button-primary" onClick={onRetry} type="button">
          Retry Save
        </button>
      </div>
    );
  }

  if (!result) {
    return null;
  }

  return (
    <div className="editorial-card space-y-2 border-teal-200 bg-teal-50">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-teal-700">Scheduling Confirmation</h3>
      <p className="text-sm text-teal-700">Reminder schedule saved.</p>
      <p className="text-sm text-teal-700">{result.totalReminders} reminders scheduled for this event.</p>
      <p className="text-sm text-teal-700">Delivery via {result.enabledChannels.map((channel) => channel.toUpperCase()).join(' and ')}.</p>
    </div>
  );
};
