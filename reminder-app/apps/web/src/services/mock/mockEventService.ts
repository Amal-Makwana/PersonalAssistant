import { eventsFixture } from '../../mocks/events.mock';
import { notificationHistoryFixture, reminderChannelsFixture, reminderOffsetPresetsFixture } from '../../mocks/reminders.mock';
import { calculateReminderPlanFromOffsets, validateReminderOffsetMinutes } from '../../features/events/utils/reminderPlanCalculator';
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
import { wait } from './delay';

interface ApiEvent {
  id: string;
  title: string;
  date: string;
  location?: string;
  status: EventItem['status'];
  duplicate: boolean;
  syncStatus: EventItem['syncStatus'];
  reminderPlan: Array<{ offset: string }>;
}

interface EventsApiResponse {
  events: ApiEvent[];
}

interface NotificationHistoryApiResponse {
  eventId: string;
  history: NotificationHistoryEntry[];
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000';

let eventsStore: EventItem[] = eventsFixture.map((event) => ({
  ...event,
  reminderOffsetsMinutes: [...event.reminderOffsetsMinutes],
  reminderSettings: { ...event.reminderSettings }
}));

const cloneEvent = (event: EventItem): EventItem => ({
  ...event,
  reminderOffsetsMinutes: [...event.reminderOffsetsMinutes],
  reminderSettings: { ...event.reminderSettings }
});

const mapOffsetToMinutes = (offset: string) => {
  if (offset.endsWith('h')) {
    return Number(offset.replace('h', '')) * 60;
  }

  return Number(offset.replace('m', ''));
};

const mapEvent = (event: ApiEvent): EventItem => ({
  id: event.id,
  title: event.title,
  time: event.date,
  location: event.location,
  status: event.status,
  duplicate: event.duplicate,
  syncStatus: event.syncStatus,
  reminderSettings: {
    primaryMinutesBefore: 60,
    secondaryMinutesBefore: 15,
    timezone: 'UTC'
  },
  reminderOffsetsMinutes: event.reminderPlan.map((plan) => mapOffsetToMinutes(plan.offset))
});

export class MockEventService {
  constructor(private readonly scenario: Scenario = 'success') {}

  async listEvents(): Promise<EventItem[]> {
    if (this.scenario === 'permission') {
      throw new Error('Permission denied for events.');
    }

    if (this.scenario === 'empty') {
      return [];
    }

    const query = new URLSearchParams();
    if (this.scenario === 'error') {
      query.set('scenario', 'error');
    }
    query.set('delay', 'true');

    try {
      const response = await fetch(`${API_BASE_URL}/events?${query.toString()}`);
      if (!response.ok) {
        throw new Error('Failed to fetch events from mock backend API.');
      }

      const payload = (await response.json()) as EventsApiResponse;
      eventsStore = payload.events.map(mapEvent);
    } catch {
      await wait();
      if (this.scenario === 'error') {
        throw new Error('Mock event service failed.');
      }
    }

    return eventsStore.map(cloneEvent);
  }

  async getDashboardSummary(): Promise<DashboardSummary> {
    if (this.scenario === 'permission') {
      throw new Error('Permission denied for dashboard.');
    }

    const query = new URLSearchParams();
    if (this.scenario === 'error') {
      query.set('scenario', 'error');
    }
    if (this.scenario === 'empty') {
      query.set('scenario', 'empty');
    }

    try {
      const response = await fetch(`${API_BASE_URL}/dashboard/summary?${query.toString()}`);
      if (!response.ok) {
        throw new Error('Unable to load dashboard summary from mock backend API.');
      }

      return (await response.json()) as DashboardSummary;
    } catch {
      const events = await this.listEvents();
      return {
        upcomingCount: events.length,
        needsReviewCount: events.filter((event) => event.status === 'needs-review').length,
        failedCount: events.filter((event) => event.status === 'failed').length,
        nextEventId: events[0]?.id
      };
    }
  }

  async getEventById(eventId: string): Promise<EventItem> {
    if (this.scenario === 'permission') {
      throw new Error('Permission denied for event detail.');
    }

    const query = new URLSearchParams();
    if (this.scenario === 'error') {
      query.set('scenario', 'error');
    }

    try {
      const response = await fetch(`${API_BASE_URL}/events/${eventId}?${query.toString()}`);
      if (!response.ok) {
        throw new Error('Unable to load event details in mock service.');
      }

      const event = (await response.json()) as ApiEvent;
      const mapped = mapEvent(event);
      const eventIndex = eventsStore.findIndex((item) => item.id === mapped.id);
      if (eventIndex >= 0) {
        eventsStore[eventIndex] = cloneEvent(mapped);
      } else {
        eventsStore.push(cloneEvent(mapped));
      }

      return mapped;
    } catch {
      await wait(200);
      const event = eventsStore.find((item) => item.id === eventId);
      if (!event) {
        throw new Error('Mock event not found.');
      }

      return cloneEvent(event);
    }
  }

  async getReminderPlanPreview(eventId: string): Promise<ReminderPlanEntry[]> {
    await wait(200);
    if (this.scenario === 'error') {
      throw new Error('Unable to load reminder plan preview in mock service.');
    }

    const event = await this.getEventById(eventId);

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

  async getNotificationHistoryPreview(eventId: string): Promise<NotificationHistoryEntry[]> {
    const query = new URLSearchParams();
    if (this.scenario === 'error') {
      query.set('scenario', 'error');
    }

    try {
      const response = await fetch(`${API_BASE_URL}/events/${eventId}/notification-history?${query.toString()}`);
      if (!response.ok) {
        throw new Error('Unable to load notification history in mock service.');
      }

      const payload = (await response.json()) as NotificationHistoryApiResponse;
      if (this.scenario === 'empty') {
        return [];
      }

      return payload.history.map((entry) => ({ ...entry, channels: [...entry.channels] }));
    } catch {
      await wait(175);
      if (this.scenario === 'error') {
        throw new Error('Unable to load notification history in mock service.');
      }
      if (this.scenario === 'empty') {
        return [];
      }
      return notificationHistoryFixture.map((entry) => ({ ...entry, channels: [...entry.channels] }));
    }
  }

  async saveReminderSettings(payload: SaveReminderInput): Promise<SaveReminderResult> {
    if (this.scenario === 'validation') {
      throw new Error('Validation failed: choose reminder values greater than 0 minutes.');
    }

    const validationError = payload.reminderOffsetsMinutes.map(validateReminderOffsetMinutes).find((value) => Boolean(value));
    if (validationError || payload.reminderOffsetsMinutes.length === 0) {
      throw new Error('Validation failed: choose reminder values greater than 0 minutes.');
    }

    const query = new URLSearchParams();
    if (this.scenario === 'error') {
      query.set('scenario', 'error');
    }

    const reminderPlan = [...payload.reminderOffsetsMinutes]
      .sort((a, b) => b - a)
      .map((minutes) => (minutes >= 60 && minutes % 60 === 0 ? { offset: `${minutes / 60}h` } : { offset: `${minutes}m` }));

    try {
      const response = await fetch(`${API_BASE_URL}/events/${payload.eventId}/reminder-plan?${query.toString()}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reminderPlan, channels: payload.channels })
      });

      if (!response.ok) {
        throw new Error('Mock save failed for reminder settings.');
      }

      const result = (await response.json()) as SaveReminderResult;
      const eventIndex = eventsStore.findIndex((item) => item.id === payload.eventId);
      if (eventIndex >= 0) {
        eventsStore[eventIndex] = {
          ...eventsStore[eventIndex],
          reminderOffsetsMinutes: [...payload.reminderOffsetsMinutes].sort((a, b) => b - a)
        };
      }

      return result;
    } catch {
      await wait(250);
      if (this.scenario === 'error') {
        throw new Error('Mock save failed for reminder settings.');
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
        savedAt: '2026-03-15T10:00:00.000Z',
        totalReminders: payload.reminderOffsetsMinutes.length,
        enabledChannels
      };
    }
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
