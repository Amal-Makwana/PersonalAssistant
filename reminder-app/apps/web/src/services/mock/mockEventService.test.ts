import { describe, expect, it, beforeEach } from 'vitest';
import { MockEventService, resetMockEventStore } from './mockEventService';

describe('MockEventService', () => {
  beforeEach(() => {
    resetMockEventStore();
  });

  it('returns summary in success scenario', async () => {
    const service = new MockEventService('success');

    const summary = await service.getDashboardSummary();

    expect(summary.upcomingCount).toBe(2);
    expect(summary.nextEventId).toBe('evt-1');
  });

  it('throws permission error for detail in permission scenario', async () => {
    const service = new MockEventService('permission');

    await expect(service.getEventById('evt-1')).rejects.toThrow('Permission denied for event detail.');
  });

  it('saves reminders in success scenario', async () => {
    const service = new MockEventService('success');

    await service.saveReminderSettings({
      eventId: 'evt-1',
      reminderSettings: {
        primaryMinutesBefore: 30,
        secondaryMinutesBefore: 10,
        timezone: 'UTC'
      }
    });

    const event = await service.getEventById('evt-1');
    expect(event.reminderSettings.primaryMinutesBefore).toBe(30);
  });
});
