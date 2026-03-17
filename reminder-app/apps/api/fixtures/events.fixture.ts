import type { EventsResponse } from '../types/event.types.js';

export const eventsFixture: EventsResponse = {
  events: [
    {
      id: '22222222-2222-4222-8222-222222222222',
      title: 'Dentist Appointment',
      date: '2026-03-20T09:00:00Z',
      location: 'Smile Clinic',
      status: 'scheduled',
      duplicate: false,
      syncStatus: 'synced',
      reminderPlan: [{ offset: '24h' }, { offset: '3h' }, { offset: '1h' }]
    },
    {
      id: '33333333-3333-4333-8333-333333333333',
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
