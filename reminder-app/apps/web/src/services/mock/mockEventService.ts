import { eventsFixture } from '../../mocks/events.mock';
import type { EventItem, Scenario } from '../../types/models';
import { wait } from './delay';

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
    return eventsFixture;
  }

  async retrySync(eventId: string): Promise<{ eventId: string; status: string }> {
    await wait(200);
    if (this.scenario === 'error') {
      throw new Error('Retry failed in mock service.');
    }
    return { eventId, status: 'synced' };
  }
}
