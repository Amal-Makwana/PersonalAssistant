import { EventsRepository } from '../repositories/events.repository';
import type {
  EventRecord,
  EventsResponse,
  NotificationHistoryResponse,
  ReminderPlanUpdateRequest,
  ReminderPlanUpdateResponse
} from '../types/event.types';

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export class NotFoundError extends Error {}
export class ValidationError extends Error {}

export class EventsService {
  constructor(private readonly eventsRepository = new EventsRepository()) {}

  async listEvents(options?: { scenario?: string; delay?: boolean }): Promise<EventsResponse> {
    if (options?.scenario === 'error') {
      throw new Error('Mock error scenario triggered.');
    }

    if (options?.delay) {
      await wait(200);
    }

    return this.eventsRepository.getAllEvents();
  }

  async getEventById(eventId: string, scenario?: string): Promise<EventRecord> {
    if (scenario === 'error') {
      throw new Error('Mock error scenario triggered.');
    }

    const event = this.eventsRepository.getEventById(eventId);
    if (!event) {
      throw new NotFoundError('Event not found.');
    }

    return event;
  }

  async saveReminderPlan(eventId: string, payload: ReminderPlanUpdateRequest, scenario?: string): Promise<ReminderPlanUpdateResponse> {
    if (scenario === 'error') {
      throw new Error('Mock error scenario triggered.');
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

    const saved = this.eventsRepository.saveReminderPlan(eventId, payload);
    if (!saved) {
      throw new NotFoundError('Event not found.');
    }

    return saved;
  }

  async getNotificationHistory(eventId: string, scenario?: string): Promise<NotificationHistoryResponse> {
    if (scenario === 'error') {
      throw new Error('Mock error scenario triggered.');
    }

    const history = this.eventsRepository.getNotificationHistory(eventId);
    if (!history) {
      throw new NotFoundError('Event not found.');
    }

    return history;
  }

  resetInMemoryState() {
    this.eventsRepository.resetInMemoryState();
  }
}
