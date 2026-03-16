import { eventsFixture } from '../../mocks/events.mock';
import { notificationHistoryFixture, reminderChannelsFixture, reminderOffsetPresetsFixture } from '../../mocks/reminders.mock';
import type {
  DashboardSummary,
  EventItem,
  NotificationHistoryEntry,
  ReminderChannelConfig,
  ReminderPlanEntry,
  SaveReminderInput,
  SaveReminderResult,
  Scenario
} from '../../types/models';
import { calculateReminderPlanFromOffsets, validateReminderOffsetMinutes } from '../../features/events/utils/reminderPlanCalculator';
import { wait } from './delay';

let eventsStore: EventItem[] = eventsFixture.map((event) => ({
  ...event,
  reminderOffsetsMinutes: [...event.reminderOffsetsMinutes],
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
    return eventsStore.map((event) => ({ ...event, reminderOffsetsMinutes: [...event.reminderOffsetsMinutes], reminderSettings: { ...event.reminderSettings } }));
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

    return { ...event, reminderOffsetsMinutes: [...event.reminderOffsetsMinutes], reminderSettings: { ...event.reminderSettings } };
  }

  async getReminderPlanPreview(eventId: string): Promise<ReminderPlanEntry[]> {
    await wait(200);
    if (this.scenario === 'error') {
      throw new Error('Unable to load reminder plan preview in mock service.');
    }

    const event = eventsStore.find((item) => item.id === eventId);
    if (!event) {
      throw new Error('Mock event not found.');
    }

    if (this.scenario === 'empty') {
      return [];
    }

    const offsets = event.reminderOffsetsMinutes.length
      ? event.reminderOffsetsMinutes
      : reminderOffsetPresetsFixture.map((offset) => offset.minutesBefore);

    return calculateReminderPlanFromOffsets(event.time, offsets);
  }

  async getReminderChannelPreview(): Promise<ReminderChannelConfig> {
    await wait(150);
    if (this.scenario === 'error') {
      throw new Error('Unable to load reminder channels in mock service.');
    }

    return { ...reminderChannelsFixture.default };
  }

  async getNotificationHistoryPreview(): Promise<NotificationHistoryEntry[]> {
    await wait(175);
    if (this.scenario === 'error') {
      throw new Error('Unable to load notification history in mock service.');
    }
    if (this.scenario === 'empty') {
      return [];
    }
    return [...notificationHistoryFixture];
  }

  async saveReminderSettings(payload: SaveReminderInput): Promise<SaveReminderResult> {
    await wait(250);
    if (this.scenario === 'error') {
      throw new Error('Mock save failed for reminder settings.');
    }
    if (this.scenario === 'validation') {
      throw new Error('Validation failed: choose reminder values greater than 0 minutes.');
    }

    const validationError = payload.reminderOffsetsMinutes.map(validateReminderOffsetMinutes).find((value) => Boolean(value));
    if (validationError || payload.reminderOffsetsMinutes.length === 0) {
      throw new Error('Validation failed: choose reminder values greater than 0 minutes.');
    }

    const eventIndex = eventsStore.findIndex((item) => item.id === payload.eventId);
    if (eventIndex < 0) {
      throw new Error('Mock event not found.');
    }

    eventsStore[eventIndex] = {
      ...eventsStore[eventIndex],
      reminderOffsetsMinutes: [...payload.reminderOffsetsMinutes].sort((a, b) => b - a)
    };

    const enabledChannels = (Object.keys(payload.channels) as Array<'push' | 'email' | 'sms'>).filter(
      (key) => payload.channels[key]
    );

    return {
      eventId: payload.eventId,
      savedAt: new Date().toISOString(),
      totalReminders: payload.reminderOffsetsMinutes.length,
      enabledChannels
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
    reminderOffsetsMinutes: [...event.reminderOffsetsMinutes],
    reminderSettings: { ...event.reminderSettings }
  }));
};
