import { describe, expect, it } from 'vitest';
import {
  calculateReminderPlan,
  calculateReminderPlanFromOffsets,
  formatOffsetLabel,
  formatReminderDateTime,
  validateReminderOffsetMinutes
} from './reminderPlanCalculator';

describe('reminderPlanCalculator', () => {
  it('calculates reminder entries with deterministic offsets', () => {
    const entries = calculateReminderPlan('2026-06-25T10:00:00Z', [
      { id: 'a', label: '24 hours before', minutesBefore: 24 * 60 },
      { id: 'b', label: '1 hour before', minutesBefore: 60 }
    ]);

    expect(entries).toHaveLength(2);
    expect(entries[0].remindAt).toBe('2026-06-25T09:00:00.000Z');
    expect(entries[1].remindAt).toBe('2026-06-24T10:00:00.000Z');
  });

  it('calculates reminder entries from editable offsets list', () => {
    const entries = calculateReminderPlanFromOffsets('2026-06-25T10:00:00Z', [180, 30]);
    expect(entries).toHaveLength(2);
    expect(entries[0].label).toBe('30 minutes before');
    expect(entries[1].label).toBe('3 hours before');
  });

  it('returns empty list when event time missing', () => {
    const entries = calculateReminderPlan('', [{ id: 'a', label: '24 hours before', minutesBefore: 1440 }]);
    expect(entries).toEqual([]);
  });

  it('validates invalid reminder offsets', () => {
    expect(validateReminderOffsetMinutes(0)).toContain('greater than 0');
    expect(validateReminderOffsetMinutes(60 * 24 * 31)).toContain('30 days');
    expect(validateReminderOffsetMinutes(60)).toBeNull();
  });

  it('formats reminder datetime for readable preview', () => {
    expect(formatReminderDateTime('2026-06-24T10:00:00.000Z')).toBe('24 Jun 2026, 10:00');
  });

  it('formats labels for hour and minute offsets', () => {
    expect(formatOffsetLabel(180)).toBe('3 hours before');
    expect(formatOffsetLabel(30)).toBe('30 minutes before');
  });
});
