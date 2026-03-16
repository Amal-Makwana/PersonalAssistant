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

    const offsets = payload.reminderPlan.map((entry) => entry.offset);
    const isValidOffset = offsets.every((offset) => /^\d+h$|^\d+m$/.test(offset));

    if (!payload.reminderPlan.length || !isValidOffset) {
      throw new ValidationError('Validation failed: reminderPlan requires offsets in Nh or Nm format.');
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
