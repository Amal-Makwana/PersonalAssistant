import eventsFixture from '../fixtures/events.fixture.json';
import historyFixture from '../fixtures/notification-history.fixture.json';
import type {
  EventRecord,
  EventsResponse,
  NotificationHistoryResponse,
  ReminderPlanUpdateRequest,
  ReminderPlanUpdateResponse
} from '../types/event.types.js';

const inMemoryReminderPlans = new Map<string, EventRecord['reminderPlan']>();

const cloneEvent = (event: EventRecord): EventRecord => ({
  ...event,
  reminderPlan: event.reminderPlan.map((item) => ({ ...item }))
});

export class EventsRepository {
  getAllEvents(): EventsResponse {
    return {
      events: eventsFixture.events.map((event) => {
        const overrides = inMemoryReminderPlans.get(event.id);
        return cloneEvent({ ...event, reminderPlan: overrides ?? event.reminderPlan } as EventRecord);
      })
    };
  }

  getEventById(eventId: string): EventRecord | null {
    const event = eventsFixture.events.find((item) => item.id === eventId);
    if (!event) {
      return null;
    }

    const overrides = inMemoryReminderPlans.get(event.id);
    return cloneEvent({ ...event, reminderPlan: overrides ?? event.reminderPlan } as EventRecord);
  }

  saveReminderPlan(eventId: string, payload: ReminderPlanUpdateRequest): ReminderPlanUpdateResponse | null {
    const event = eventsFixture.events.find((item) => item.id === eventId);
    if (!event) {
      return null;
    }

    const normalizedPlan = payload.reminderPlan.map((entry) => ({ ...entry }));
    inMemoryReminderPlans.set(eventId, normalizedPlan);

    const channels = (Object.keys(payload.channels) as Array<'push' | 'email' | 'sms'>).filter(
      (channel) => Boolean(payload.channels[channel])
    );

    return {
      success: true,
      eventId,
      message: 'Reminder plan saved',
      reminderCount: normalizedPlan.length,
      channels,
      savedAt: '2026-03-15T10:00:00.000Z',
      totalReminders: normalizedPlan.length,
      enabledChannels: channels
    };
  }

  getNotificationHistory(eventId: string): NotificationHistoryResponse | null {
    const eventExists = eventsFixture.events.some((event) => event.id === eventId);
    if (!eventExists) {
      return null;
    }

    const history = historyFixture.historyByEventId[eventId as keyof typeof historyFixture.historyByEventId] ?? [];
    return {
      eventId,
      history: history.map((entry) => ({ ...entry, channels: [...entry.channels] }))
    };
  }

  resetInMemoryState() {
    inMemoryReminderPlans.clear();
  }
}
