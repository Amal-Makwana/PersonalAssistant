import { EventsRepository } from '../repositories/events.repository';
import type { EventsResponse } from '../types/event.types';

const getDelayInMs = () => Math.floor(Math.random() * 501) + 300;

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export class EventsService {
  constructor(private readonly eventsRepository = new EventsRepository()) {}

  async listEvents(options?: { scenario?: string; delay?: boolean }): Promise<EventsResponse> {
    if (options?.scenario === 'error') {
      throw new Error('Mock error scenario triggered.');
    }

    if (options?.delay) {
      await wait(getDelayInMs());
    }

    return this.eventsRepository.getAllEvents();
  }
}
