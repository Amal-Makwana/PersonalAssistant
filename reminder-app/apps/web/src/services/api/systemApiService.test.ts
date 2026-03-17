import { describe, expect, it, vi } from 'vitest';
import { SystemApiService } from './systemApiService';

const jsonResponse = (body: unknown, status = 200) =>
  Promise.resolve(
    new Response(JSON.stringify(body), {
      status,
      headers: { 'Content-Type': 'application/json' }
    })
  );

describe('SystemApiService', () => {
  it('loads profile and updates profile', async () => {
    const fetchMock = vi.fn((input: string | URL, init?: RequestInit) => {
      const url = String(input);
      if (url.includes('/system/profile') && (!init || init.method === 'GET')) {
        return jsonResponse({ id: 'u-1', name: 'User', timezone: 'UTC', calendarSyncEnabled: true });
      }
      if (url.includes('/system/profile') && init?.method === 'PUT') {
        return jsonResponse({ id: 'u-1', name: 'User', timezone: 'Asia/Kolkata', calendarSyncEnabled: false });
      }
      return jsonResponse({}, 404);
    });

    vi.stubGlobal('fetch', fetchMock);
    const service = new SystemApiService();

    expect(await service.getProfile()).toMatchObject({ timezone: 'UTC' });
    expect(await service.updateProfile({ timezone: 'Asia/Kolkata', calendarSyncEnabled: false })).toMatchObject({
      timezone: 'Asia/Kolkata',
      calendarSyncEnabled: false
    });

    vi.unstubAllGlobals();
  });

  it('loads integrations and diagnostics activity', async () => {
    const fetchMock = vi.fn((input: string | URL) => {
      const url = String(input);
      if (url.includes('/system/integrations/status')) {
        return jsonResponse({ googleAuth: 'connected', gmailIngestion: 'healthy', calendarSync: 'enabled' });
      }
      if (url.includes('/system/diagnostics/activity')) {
        return jsonResponse({ activity: [{ id: 'a-1', message: 'ok', level: 'info', createdAt: '2026-01-01T00:00:00Z' }] });
      }
      return jsonResponse({}, 404);
    });

    vi.stubGlobal('fetch', fetchMock);
    const service = new SystemApiService();

    expect(await service.getIntegrationsStatus()).toEqual({ googleAuth: 'connected', gmailIngestion: 'healthy', calendarSync: 'enabled' });
    expect(await service.getActivity()).toEqual([{ id: 'a-1', message: 'ok', level: 'info', createdAt: '2026-01-01T00:00:00Z' }]);

    vi.unstubAllGlobals();
  });
});
