import type { EventItem } from '../types/models';

export const eventsFixture: EventItem[] = [
  {
    id: 'evt-1',
    title: 'Dentist Appointment',
    time: '2026-03-20T09:00:00Z',
    location: 'Smile Clinic',
    status: 'scheduled',
    duplicate: false,
    syncStatus: 'synced'
  },
  {
    id: 'evt-2',
    title: 'Client Follow-up',
    time: '2026-03-21T13:30:00Z',
    status: 'needs-review',
    duplicate: true,
    syncStatus: 'pending'
  }
];
