import type { ReminderPlanEntry, ReminderPlanOffsetConfig } from '../../../types/models';

export const calculateReminderPlan = (eventTime: string, offsets: ReminderPlanOffsetConfig[]): ReminderPlanEntry[] => {
  const timestamp = Date.parse(eventTime);
  if (!eventTime || Number.isNaN(timestamp)) {
    return [];
  }

  return offsets
    .map((offset) => ({
      id: offset.id,
      label: offset.label,
      remindAt: new Date(timestamp - offset.minutesBefore * 60_000).toISOString()
    }))
    .sort((left, right) => Date.parse(left.remindAt) - Date.parse(right.remindAt));
};

export const formatReminderDateTime = (isoValue: string): string =>
  new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'UTC'
  }).format(new Date(isoValue));
