import type { EventsResponse } from '../types/event.types.js';

export const eventsFixture: EventsResponse = {
  events: [
    {
      id: 'evt-001',
      title: 'Dentist Appointment',
      date: '2026-03-20T09:00:00Z',
      location: 'Smile Clinic',
      status: 'scheduled',
      duplicate: false,
      syncStatus: 'synced',
      reminderPlan: [{ offset: '24h' }, { offset: '3h' }, { offset: '1h' }]
    },
    {
      id: 'evt-002',
      title: 'Client Follow-up',
      date: '2026-03-21T13:30:00Z',
      status: 'needs-review',
      duplicate: true,
      syncStatus: 'pending',
      reminderPlan: [{ offset: '24h' }, { offset: '30m' }]
    }
  ]
};

export default eventsFixture;
