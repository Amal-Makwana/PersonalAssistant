import type { ReminderPlanEntry, ReminderPlanOffsetConfig } from '../../../types/models';

export const formatOffsetLabel = (offsetMinutes: number): string => {
  if (offsetMinutes % 60 === 0) {
    const hours = offsetMinutes / 60;
    return `${hours} ${hours === 1 ? 'hour' : 'hours'} before`;
  }
  return `${offsetMinutes} minutes before`;
};

export const validateReminderOffsetMinutes = (offsetMinutes: number): string | null => {
  if (!Number.isInteger(offsetMinutes) || offsetMinutes <= 0) {
    return 'Reminder offsets must be whole numbers greater than 0.';
  }

  if (offsetMinutes > 60 * 24 * 30) {
    return 'Reminder offsets must be within 30 days before the event.';
  }

  return null;
};

const toEntry = (eventTimestamp: number, offsetMinutes: number, index: number): ReminderPlanEntry => ({
  id: `offset-${offsetMinutes}-${index}`,
  label: formatOffsetLabel(offsetMinutes),
  remindAt: new Date(eventTimestamp - offsetMinutes * 60_000).toISOString(),
  offsetMinutes
});

export const calculateReminderPlanFromOffsets = (eventTime: string, offsetsMinutes: number[]): ReminderPlanEntry[] => {
  const timestamp = Date.parse(eventTime);
  if (!eventTime || Number.isNaN(timestamp)) {
    return [];
  }

  return offsetsMinutes
    .filter((offset) => !validateReminderOffsetMinutes(offset))
    .map((offset, index) => toEntry(timestamp, offset, index))
    .sort((left, right) => left.offsetMinutes - right.offsetMinutes);
};

export const calculateReminderPlan = (eventTime: string, offsets: ReminderPlanOffsetConfig[]): ReminderPlanEntry[] =>
  calculateReminderPlanFromOffsets(
    eventTime,
    offsets.map((offset) => offset.minutesBefore)
  );

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
