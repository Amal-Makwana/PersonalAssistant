import { describe, expect, it, vi } from 'vitest';
import { EventApiService } from './eventApiService';

const jsonResponse = (body: unknown, status = 200) =>
  Promise.resolve(
    new Response(JSON.stringify(body), {
      status,
      headers: { 'Content-Type': 'application/json' }
    })
  );

describe('EventApiService', () => {
  it('loads reminder channels from API endpoint', async () => {
    const fetchMock = vi.fn((input: string | URL) => {
      const url = String(input);
      if (url.includes('/events/22222222-2222-4222-8222-222222222222/reminder-channels')) {
        return jsonResponse({ push: true, email: false, sms: true });
      }
      return jsonResponse({}, 404);
    });

    vi.stubGlobal('fetch', fetchMock);
    const service = new EventApiService();
    const result = await service.getReminderChannelPreview('22222222-2222-4222-8222-222222222222');

    expect(result).toEqual({ push: true, email: false, sms: true });
    vi.unstubAllGlobals();
  });

  it('calls retry-sync API endpoint', async () => {
    const fetchMock = vi.fn((input: string | URL) => {
      const url = String(input);
      if (url.includes('/events/22222222-2222-4222-8222-222222222222/retry-sync')) {
        return jsonResponse({ eventId: '22222222-2222-4222-8222-222222222222', status: 'synced' });
      }
      return jsonResponse({}, 404);
    });

    vi.stubGlobal('fetch', fetchMock);
    const service = new EventApiService();
    const result = await service.retrySync('22222222-2222-4222-8222-222222222222');

    expect(result).toEqual({ eventId: '22222222-2222-4222-8222-222222222222', status: 'synced' });
    vi.unstubAllGlobals();
  });
});
