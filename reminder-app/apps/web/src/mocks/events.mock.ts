import { CANONICAL_EVENT_UUIDS } from '../test/canonicalEventIds';
import type { EventItem } from '../types/models';

export const eventsFixture: EventItem[] = [
  {
    id: CANONICAL_EVENT_UUIDS.primary,
    title: 'Dentist Appointment',
    time: '2026-03-20T09:00:00Z',
    location: 'Smile Clinic',
    status: 'scheduled',
    duplicate: false,
    syncStatus: 'synced',
    reminderOffsetsMinutes: [24 * 60, 3 * 60, 60],
    reminderSettings: {
      primaryMinutesBefore: 60,
      secondaryMinutesBefore: 15,
      timezone: 'UTC'
    }
  },
  {
    id: CANONICAL_EVENT_UUIDS.secondary,
    title: 'Client Follow-up',
    time: '2026-03-21T13:30:00Z',
    status: 'needs-review',
    duplicate: true,
    syncStatus: 'pending',
    reminderOffsetsMinutes: [24 * 60, 30],
    reminderSettings: {
      primaryMinutesBefore: 120,
      secondaryMinutesBefore: 30,
      timezone: 'UTC'
    }
  }
];