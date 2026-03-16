import { eventsFixture } from '../../mocks/events.mock';
import type {
  DashboardSummary,
  EventItem,
  SaveReminderInput,
  SaveReminderResult,
  Scenario
} from '../../types/models';
import { wait } from './delay';

let eventsStore: EventItem[] = eventsFixture.map((event) => ({
  ...event,
  reminderSettings: { ...event.reminderSettings }
}));

const buildSummary = (events: EventItem[]): DashboardSummary => {
  const upcomingCount = events.length;
  const needsReviewCount = events.filter((event) => event.status === 'needs-review').length;
  const failedCount = events.filter((event) => event.status === 'failed').length;

  return {
    upcomingCount,
    needsReviewCount,
    failedCount,
    nextEventId: events[0]?.id
  };
};

export class MockEventService {
  constructor(private readonly scenario: Scenario = 'success') {}

  async listEvents(): Promise<EventItem[]> {
    await wait();
    if (this.scenario === 'error') {
      throw new Error('Mock event service failed.');
    }
    if (this.scenario === 'permission') {
      throw new Error('Permission denied for events.');
    }
    if (this.scenario === 'empty') {
      return [];
    }
    return eventsStore.map((event) => ({ ...event, reminderSettings: { ...event.reminderSettings } }));
  }

  async getDashboardSummary(): Promise<DashboardSummary> {
    const events = await this.listEvents();
    return buildSummary(events);
  }

  async getEventById(eventId: string): Promise<EventItem> {
    await wait(200);
    if (this.scenario === 'error') {
      throw new Error('Unable to load event details in mock service.');
    }
    if (this.scenario === 'permission') {
      throw new Error('Permission denied for event detail.');
    }

    const event = eventsStore.find((item) => item.id === eventId);
    if (!event) {
      throw new Error('Mock event not found.');
    }

    return { ...event, reminderSettings: { ...event.reminderSettings } };
  }

  async saveReminderSettings(payload: SaveReminderInput): Promise<SaveReminderResult> {
    await wait(250);
    if (this.scenario === 'error') {
      throw new Error('Mock save failed for reminder settings.');
    }
    if (this.scenario === 'validation') {
      throw new Error('Validation failed: choose reminder values greater than 0 minutes.');
    }

    const { primaryMinutesBefore, secondaryMinutesBefore } = payload.reminderSettings;
    if (primaryMinutesBefore <= 0 || secondaryMinutesBefore <= 0) {
      throw new Error('Validation failed: choose reminder values greater than 0 minutes.');
    }

    const eventIndex = eventsStore.findIndex((item) => item.id === payload.eventId);
    if (eventIndex < 0) {
      throw new Error('Mock event not found.');
    }

    eventsStore[eventIndex] = {
      ...eventsStore[eventIndex],
      reminderSettings: { ...payload.reminderSettings }
    };

    return {
      eventId: payload.eventId,
      savedAt: new Date().toISOString()
    };
  }

  async retrySync(eventId: string): Promise<{ eventId: string; status: string }> {
    await wait(200);
    if (this.scenario === 'error') {
      throw new Error('Retry failed in mock service.');
    }
    return { eventId, status: 'synced' };
  }
}

export const resetMockEventStore = () => {
  eventsStore = eventsFixture.map((event) => ({
    ...event,
    reminderSettings: { ...event.reminderSettings }
  }));
};
