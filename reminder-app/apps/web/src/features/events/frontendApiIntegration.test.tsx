import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import dashboardFixture from '../../../../api/fixtures/dashboard.fixture.js';
import eventsFixture from '../../../../api/fixtures/events.fixture.js';
import notificationHistoryFixture from '../../../../api/fixtures/notification-history.fixture.js';
import { AppProvider } from '../../contexts/AppContext';
import { CANONICAL_EVENT_UUIDS } from '../../test/canonicalEventIds';
import { DashboardScreen } from '../dashboard/DashboardScreen';
import { EventDetailScreen } from './EventDetailScreen';
import { EventsListScreen } from './EventsListScreen';

const jsonResponse = (body: unknown, status = 200) =>
  Promise.resolve(
    new Response(JSON.stringify(body), {
      status,
      headers: { 'Content-Type': 'application/json' }
    })
  );

const mockBackendFetch = ({ forceError = false, notificationError = false, emptyEvents = false }: { forceError?: boolean; notificationError?: boolean; emptyEvents?: boolean } = {}) => {
  const fetchMock = vi.fn((input: string | URL, init?: RequestInit) => {
    const url = typeof input === 'string' ? input : input.toString();

    if (url.includes('/dashboard/summary')) {
      if (url.includes('scenario=error') || forceError) {
        return jsonResponse({ error: 'Internal Server Error', message: 'Mock error scenario triggered.' }, 500);
      }
      if (url.includes('scenario=empty')) {
        return jsonResponse(dashboardFixture.empty);
      }
      return jsonResponse(dashboardFixture.summary);
    }

    if (url.includes('/events/') && url.includes('/notification-history')) {
      if (url.includes('scenario=error') || forceError || notificationError) {
        return jsonResponse({ error: 'Internal Server Error', message: 'Mock error scenario triggered.' }, 500);
      }

      const eventId = /\/events\/([^/]+)/.exec(url)?.[1] ?? '';
      const history = notificationHistoryFixture.historyByEventId[eventId as keyof typeof notificationHistoryFixture.historyByEventId];
      if (!history) {
        return jsonResponse({ error: 'Not Found', message: 'Event not found.' }, 404);
      }
      return jsonResponse({ eventId, history });
    }

    if (url.includes('/events/') && url.includes('/reminder-plan') && init?.method === 'PUT') {
      if (url.includes('scenario=error') || forceError) {
        return jsonResponse({ error: 'Internal Server Error', message: 'Mock error scenario triggered.' }, 500);
      }

      const payload = JSON.parse(String(init.body)) as { reminderPlan: Array<{ offset: string }>; channels: Record<string, boolean> };
      const valid = payload.reminderPlan.length > 0 && payload.reminderPlan.every((item: { offset: string }) => /^\d+h$|^\d+m$/.test(item.offset));
      if (!valid) {
        return jsonResponse(
          { error: 'Bad Request', message: 'Validation failed: reminderPlan requires offsets in Nh or Nm format.' },
          400
        );
      }

      const channels = (Object.keys(payload.channels) as Array<'push' | 'email' | 'sms'>).filter((key) => payload.channels[key]);
      return jsonResponse({
        success: true,
<<<<<<< codex/sweep-legacy-ids-and-add-tests-bm2d5y
        eventId: CANONICAL_EVENT_UUIDS.primary,
=======
        eventId: '22222222-2222-4222-8222-222222222222',
>>>>>>> main
        message: 'Reminder plan saved',
        reminderCount: payload.reminderPlan.length,
        channels,
        savedAt: '2026-03-15T10:00:00.000Z',
        totalReminders: payload.reminderPlan.length,
        enabledChannels: channels
      });
    }

    if (url.includes('/events/')) {
      if (url.includes('scenario=error') || forceError) {
        return jsonResponse({ error: 'Internal Server Error', message: 'Mock error scenario triggered.' }, 500);
      }

      const eventId = /\/events\/([^/?]+)/.exec(url)?.[1] ?? '';
      const event = eventsFixture.events.find((item) => item.id === eventId);
      if (!event) {
        return jsonResponse({ error: 'Not Found', message: 'Event not found.' }, 404);
      }

      return jsonResponse(event);
    }

    if (url.includes('/events')) {
      if (url.includes('scenario=error') || forceError) {
        return jsonResponse({ error: 'Internal Server Error', message: 'Mock error scenario triggered.' }, 500);
      }
      if (emptyEvents) {
        return jsonResponse({ events: [] });
      }
      return jsonResponse(eventsFixture);
    }

    throw new Error(`Unhandled URL in fetch mock: ${url}`);
  });

  vi.stubGlobal('fetch', fetchMock);
  return fetchMock;
};

const renderWithRoute = ({ scenario, route }: { scenario: 'success' | 'empty' | 'error' | 'permission' | 'validation'; route: string }) => {
  render(
    <AppProvider initialScenario={scenario}>
      <MemoryRouter initialEntries={[route]}>
        <Routes>
          <Route element={<DashboardScreen />} path="/dashboard" />
          <Route element={<EventsListScreen />} path="/events" />
          <Route element={<EventDetailScreen />} path="/events/:eventId" />
        </Routes>
      </MemoryRouter>
    </AppProvider>
  );
};

describe('Frontend ↔ Mock API integration', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('Dashboard loads and renders backend summary data', async () => {
    const fetchMock = mockBackendFetch();
    renderWithRoute({ scenario: 'success', route: '/dashboard' });

    expect(await screen.findByText('Upcoming')).toBeInTheDocument();
    expect(screen.getByText(String(dashboardFixture.summary.upcomingCount))).toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledWith(expect.stringContaining('/dashboard/summary'), undefined);
  });

  it('Dashboard CTA uses nextEventId, navigates to detail, and avoids UUID validation errors', async () => {
    const user = userEvent.setup();
    mockBackendFetch();
    renderWithRoute({ scenario: 'success', route: '/dashboard' });

    await user.click(await screen.findByRole('link', { name: 'Open Next Event Detail' }));

    expect(await screen.findByText('Dentist Appointment')).toBeInTheDocument();
    expect(screen.queryByText('Validation failed: event ID must be a UUID.')).not.toBeInTheDocument();
  });

  it('Dashboard renders error state when API fails', async () => {
    mockBackendFetch({ forceError: true });
    renderWithRoute({ scenario: 'success', route: '/dashboard' });

    expect(await screen.findByText('Mock error scenario triggered.')).toBeInTheDocument();
  });

  it('Events list renders success and empty states from API responses', async () => {
    mockBackendFetch();
    renderWithRoute({ scenario: 'success', route: '/events' });
    expect(await screen.findByText('Dentist Appointment')).toBeInTheDocument();

    cleanup();
    mockBackendFetch({ emptyEvents: true });
    renderWithRoute({ scenario: 'success', route: '/events' });
    expect(await screen.findByText('No events available for current filters.')).toBeInTheDocument();
  });

  it('Events list renders error state when /events fails', async () => {
    mockBackendFetch({ forceError: true });
    renderWithRoute({ scenario: 'success', route: '/events' });

    expect(await screen.findByText('Mock error scenario triggered.')).toBeInTheDocument();
  });

  it('Event detail renders success, not found, and server error states', async () => {
    mockBackendFetch();

<<<<<<< codex/sweep-legacy-ids-and-add-tests-bm2d5y
    renderWithRoute({ scenario: 'success', route: `/events/${CANONICAL_EVENT_UUIDS.primary}` });
=======
    renderWithRoute({ scenario: 'success', route: '/events/22222222-2222-4222-8222-222222222222' });
>>>>>>> main
    expect(await screen.findByText('Dentist Appointment')).toBeInTheDocument();

    cleanup();
    renderWithRoute({ scenario: 'success', route: '/events/missing-id' });
    expect(await screen.findByText('Event not found.')).toBeInTheDocument();

    cleanup();
    mockBackendFetch({ forceError: true });
<<<<<<< codex/sweep-legacy-ids-and-add-tests-bm2d5y
    renderWithRoute({ scenario: 'success', route: `/events/${CANONICAL_EVENT_UUIDS.primary}` });
    expect(await screen.findByText('Mock error scenario triggered.')).toBeInTheDocument();
=======
    renderWithRoute({ scenario: 'success', route: '/events/22222222-2222-4222-8222-222222222222' });
    expect(await screen.findByText('Unable to load event details in mock service.')).toBeInTheDocument();
>>>>>>> main
  });

  it('Reminder save flow handles success confirmation', async () => {
    const user = userEvent.setup();
    mockBackendFetch();

<<<<<<< codex/sweep-legacy-ids-and-add-tests-bm2d5y
    renderWithRoute({ scenario: 'success', route: `/events/${CANONICAL_EVENT_UUIDS.primary}` });
=======
    renderWithRoute({ scenario: 'success', route: '/events/22222222-2222-4222-8222-222222222222' });
>>>>>>> main
    await screen.findByText('Dentist Appointment');
    await screen.findByText('Reminder Channels');
    await user.click(screen.getByRole('button', { name: 'Save' }));
    expect(await screen.findByText('Reminder schedule saved.')).toBeInTheDocument();
  });

  it('Reminder save flow handles server failures', async () => {
    mockBackendFetch({ forceError: true });
<<<<<<< codex/sweep-legacy-ids-and-add-tests-bm2d5y
    renderWithRoute({ scenario: 'success', route: `/events/${CANONICAL_EVENT_UUIDS.primary}` });
    expect(await screen.findByText('Mock error scenario triggered.')).toBeInTheDocument();
=======
    renderWithRoute({ scenario: 'success', route: '/events/22222222-2222-4222-8222-222222222222' });
    expect(await screen.findByText('Unable to load event details in mock service.')).toBeInTheDocument();
>>>>>>> main
  });

  it('Notification history renders success and API error states', async () => {
    mockBackendFetch();

<<<<<<< codex/sweep-legacy-ids-and-add-tests-bm2d5y
    renderWithRoute({ scenario: 'success', route: `/events/${CANONICAL_EVENT_UUIDS.primary}` });
=======
    renderWithRoute({ scenario: 'success', route: '/events/22222222-2222-4222-8222-222222222222' });
>>>>>>> main
    expect(await screen.findByText('Notification History Preview')).toBeInTheDocument();
    expect(await screen.findByText(/Scheduled/)).toBeInTheDocument();

    cleanup();
    mockBackendFetch({ notificationError: true });
<<<<<<< codex/sweep-legacy-ids-and-add-tests-bm2d5y
    renderWithRoute({ scenario: 'success', route: `/events/${CANONICAL_EVENT_UUIDS.primary}` });
    expect(await screen.findByText('Mock error scenario triggered.')).toBeInTheDocument();
=======
    renderWithRoute({ scenario: 'success', route: '/events/22222222-2222-4222-8222-222222222222' });
    expect(await screen.findByText('Unable to load notification history in mock service.')).toBeInTheDocument();
>>>>>>> main
  });

  it('maintains frontend contract assumptions for backend payload shape', async () => {
    const fetchMock = mockBackendFetch();
    renderWithRoute({ scenario: 'success', route: '/events' });

    await screen.findByText('Dentist Appointment');

    const eventsCall = fetchMock.mock.calls.find((call) => String(call[0]).includes('/events'));
    expect(eventsCall).toBeDefined();
    expect(eventsFixture.events[0]).toMatchObject({
      id: expect.any(String),
      title: expect.any(String),
      date: expect.any(String),
      reminderPlan: expect.arrayContaining([expect.objectContaining({ offset: expect.any(String) })])
    });

    expect(dashboardFixture.summary).toMatchObject({
      upcomingCount: expect.any(Number),
      needsReviewCount: expect.any(Number),
      failedCount: expect.any(Number)
    });
  });
});
