import { EventsRepository } from '../repositories/events.repository.js';
import type {
  CreateEventInput,
  EventRecord,
  EventsResponse,
  NotificationHistoryResponse,
  PersistedEventRecord,
  ReminderPlanUpdateRequest,
  ReminderPlanUpdateResponse
} from '../types/event.types.js';

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const isUuid = (value: string) => /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);

export class NotFoundError extends Error {}
export class ValidationError extends Error {}

export class EventsService {
  constructor(private readonly eventsRepository = new EventsRepository()) {}

  async listEvents(options?: { delay?: boolean }): Promise<EventsResponse> {
    if (options?.delay) {
      await wait(200);
    }

    return this.eventsRepository.getAllEvents();
  }

  async createEvent(payload: Partial<CreateEventInput>): Promise<PersistedEventRecord> {
    if (!payload.title || !payload.description || !payload.event_date) {
      throw new ValidationError('Validation failed: title, description, and event_date are required.');
    }

    if (Number.isNaN(Date.parse(payload.event_date))) {
      throw new ValidationError('Validation failed: event_date must be a valid ISO datetime string.');
    }

    return this.eventsRepository.createEvent({
      title: payload.title,
      description: payload.description,
      event_date: payload.event_date
    });
  }

  async getEventById(eventId: string): Promise<EventRecord> {
    if (!isUuid(eventId)) {
      throw new ValidationError('Validation failed: event ID must be a UUID.');
    }

    const event = await this.eventsRepository.getEventById(eventId);
    if (!event) {
      throw new NotFoundError('Event not found.');
    }

    return event;
  }

  async saveReminderPlan(eventId: string, payload: ReminderPlanUpdateRequest): Promise<ReminderPlanUpdateResponse> {
    if (!isUuid(eventId)) {
      throw new ValidationError('Validation failed: event ID must be a UUID.');
    }

    if (!payload || !Array.isArray(payload.reminderPlan) || !payload.channels || typeof payload.channels !== 'object') {
      throw new ValidationError('Validation failed: reminderPlan array and channels object are required.');
    }

    const isValidOffset = payload.reminderPlan.every(
      (entry) => typeof entry?.offset === 'string' && /^\d+h$|^\d+m$/.test(entry.offset)
    );

    if (!payload.reminderPlan.length || !isValidOffset) {
      throw new ValidationError('Validation failed: reminderPlan requires offsets in Nh or Nm format.');
    }

    const invalidChannelValue = Object.values(payload.channels).some((value) => typeof value !== 'boolean');
    if (invalidChannelValue) {
      throw new ValidationError('Validation failed: channels values must be booleans.');
    }

    const saved = await this.eventsRepository.saveReminderPlan(eventId, payload);
    if (!saved) {
      throw new NotFoundError('Event not found.');
    }

    return saved;
  }

  async getNotificationHistory(eventId: string): Promise<NotificationHistoryResponse> {
    if (!isUuid(eventId)) {
      throw new ValidationError('Validation failed: event ID must be a UUID.');
    }

    const history = await this.eventsRepository.getNotificationHistory(eventId);
    if (!history) {
      throw new NotFoundError('Event not found.');
    }

    return history;
  }

  async resetInMemoryState() {
    await this.eventsRepository.resetInMemoryState();
  }
}
