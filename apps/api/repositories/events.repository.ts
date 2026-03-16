import eventsFixture from '../fixtures/events.fixture.json';
import type { EventsResponse } from '../types/event.types';

export class EventsRepository {
  getAllEvents(): EventsResponse {
    return {
      events: eventsFixture.events.map((event) => ({
        ...event,
        reminderPlan: event.reminderPlan.map((plan) => ({ ...plan }))
      }))
    };
  }
}
