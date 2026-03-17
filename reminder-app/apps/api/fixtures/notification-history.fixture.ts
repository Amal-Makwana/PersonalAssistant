import type { NotificationHistoryEntry } from '../types/event.types.js';

interface NotificationHistoryFixture {
  historyByEventId: Record<string, NotificationHistoryEntry[]>;
}

export const notificationHistoryFixture: NotificationHistoryFixture = {
  historyByEventId: {
    '22222222-2222-4222-8222-222222222222': [
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
    ],
    '33333333-3333-4333-8333-333333333333': [
      {
        id: 'n-5',
        status: 'Scheduled',
        remindAt: '2026-03-20T13:30:00Z',
        channels: ['push'],
        direction: 'upcoming'
      }
    ]
  }
};

export default notificationHistoryFixture;
