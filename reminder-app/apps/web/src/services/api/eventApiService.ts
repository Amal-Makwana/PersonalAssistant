import { calculateReminderPlanFromOffsets, validateReminderOffsetMinutes } from '../../features/events/utils/reminderPlanCalculator';
import type {
  DashboardSummary,
  EventItem,
  NotificationHistoryEntry,
  ReminderChannelConfig,
  ReminderPlanEntry,
  SaveReminderInput,
  SaveReminderResult
} from '../../types/models';
import { API_BASE_URL } from '../../config/api';

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

interface ApiErrorResponse {
  message?: string;
}

const defaultReminderChannels: ReminderChannelConfig = {
  push: true,
  email: true,
  sms: false
};

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

const buildUrl = (path: string) => `${API_BASE_URL}${path}`;

const fetchJson = async <T>(path: string, init?: RequestInit): Promise<T> => {
  const response = await fetch(buildUrl(path), init);
  if (!response.ok) {
    const maybeError = (await response.json().catch(() => ({}))) as ApiErrorResponse;
    throw new Error(maybeError.message ?? `Request failed: ${response.status}`);
  }

  return (await response.json()) as T;
};

export class EventApiService {
  async listEvents(): Promise<EventItem[]> {
    const payload = await fetchJson<EventsApiResponse>('/events');
    return payload.events.map(mapEvent);
  }

  async getDashboardSummary(): Promise<DashboardSummary> {
    return await fetchJson<DashboardSummary>('/dashboard/summary');
  }

  async getEventById(eventId: string): Promise<EventItem> {
    const event = await fetchJson<ApiEvent>(`/events/${eventId}`);
    return mapEvent(event);
  }

  async getReminderPlanPreview(eventId: string): Promise<ReminderPlanEntry[]> {
    const event = await this.getEventById(eventId);
    return calculateReminderPlanFromOffsets(event.time, event.reminderOffsetsMinutes);
  }

  async getReminderChannelPreview(): Promise<ReminderChannelConfig> {
    return { ...defaultReminderChannels };
  }

  async getNotificationHistoryPreview(eventId: string): Promise<NotificationHistoryEntry[]> {
    const payload = await fetchJson<NotificationHistoryApiResponse>(`/events/${eventId}/notification-history`);
    return payload.history.map((entry) => ({ ...entry, channels: [...entry.channels] }));
  }

  async saveReminderSettings(payload: SaveReminderInput): Promise<SaveReminderResult> {
    const validationError = payload.reminderOffsetsMinutes.map(validateReminderOffsetMinutes).find((value) => Boolean(value));
    if (validationError || payload.reminderOffsetsMinutes.length === 0) {
      throw new Error('Validation failed: choose reminder values greater than 0 minutes.');
    }

    const reminderPlan = [...payload.reminderOffsetsMinutes]
      .sort((a, b) => b - a)
      .map((minutes) => (minutes >= 60 && minutes % 60 === 0 ? { offset: `${minutes / 60}h` } : { offset: `${minutes}m` }));

    return await fetchJson<SaveReminderResult>(`/events/${payload.eventId}/reminder-plan`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reminderPlan, channels: payload.channels })
    });
  }

  async retrySync(eventId: string): Promise<{ eventId: string; status: string }> {
    return { eventId, status: 'synced' };
  }
}
