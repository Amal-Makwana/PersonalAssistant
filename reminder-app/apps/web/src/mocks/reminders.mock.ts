import type { NotificationHistoryEntry, ReminderChannelConfig, ReminderPlanOffsetConfig } from '../types/models';

export const reminderOffsetPresetsFixture: ReminderPlanOffsetConfig[] = [
  {
    id: 'offset-24h',
    label: '24 hours before',
    minutesBefore: 24 * 60
  },
  {
    id: 'offset-3h',
    label: '3 hours before',
    minutesBefore: 3 * 60
  },
  {
    id: 'offset-1h',
    label: '1 hour before',
    minutesBefore: 60
  },
  {
    id: 'offset-30m',
    label: '30 minutes before',
    minutesBefore: 30
  }
];

export const reminderChannelsFixture: Record<string, ReminderChannelConfig> = {
  default: {
    push: true,
    email: true,
    sms: false
  }
};

export const notificationHistoryFixture: NotificationHistoryEntry[] = [
  {
    id: 'n-1',
    status: 'Scheduled',
    remindAt: '2026-03-19T09:00:00Z',
    channels: ['push', 'email'],
    direction: 'upcoming'
  },
  {
    id: 'n-2',
    status: 'Sent',
    remindAt: '2026-03-19T06:00:00Z',
    channels: ['push'],
    direction: 'past'
  },
  {
    id: 'n-3',
    status: 'Failed',
    remindAt: '2026-03-19T08:30:00Z',
    channels: ['email'],
    direction: 'past'
  },
  {
    id: 'n-4',
    status: 'Cancelled',
    remindAt: '2026-03-18T09:00:00Z',
    channels: ['email'],
    direction: 'past'
  }
];
