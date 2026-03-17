import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AppProvider } from '../../contexts/AppContext';
import { CANONICAL_EVENT_UUIDS } from '../../test/canonicalEventIds';
import { resetMockEventStore } from '../../services/mock/mockEventService';
import { EventDetailScreen } from './EventDetailScreen';

let activeScenario: 'success' | 'empty' | 'error' | 'permission' | 'validation' = 'success';

const jsonResponse = (body: unknown, status = 200) =>
  Promise.resolve(
    new Response(JSON.stringify(body), {
      status,
      headers: { 'Content-Type': 'application/json' }
    })
  );

const renderScreen = (
  scenario: 'success' | 'empty' | 'error' | 'permission' | 'validation' = 'success',
<<<<<<< codex/sweep-legacy-ids-and-add-tests-bm2d5y
  eventId = CANONICAL_EVENT_UUIDS.primary
=======
  eventId = '22222222-2222-4222-8222-222222222222'
>>>>>>> main
) => {
  activeScenario = scenario;

  render(
    <AppProvider initialScenario={scenario}>
      <MemoryRouter initialEntries={[`/events/${eventId}`]}>
        <Routes>
          <Route element={<EventDetailScreen />} path="/events/:eventId" />
        </Routes>
      </MemoryRouter>
    </AppProvider>
  );
};

describe('EventDetailScreen', () => {
  beforeEach(() => {
    resetMockEventStore();
    vi.stubGlobal(
      'fetch',
      vi.fn((input: string | URL, init?: RequestInit) => {
        const url = typeof input === 'string' ? input : input.toString();

        if (url.includes('/notification-history')) {
          if (activeScenario === 'error') {
            return jsonResponse({ message: 'Unable to load notification history in mock service.' }, 500);
          }

          if (activeScenario === 'empty') {
            return jsonResponse({ eventId: CANONICAL_EVENT_UUIDS.primary, history: [] });
          }

          return jsonResponse({
            eventId: CANONICAL_EVENT_UUIDS.primary,
            history: [{ id: 'n-1', status: 'Scheduled', remindAt: '2026-03-19T09:00:00Z', channels: ['push'], direction: 'upcoming' }]
          });
        }

        if (url.includes('/reminder-plan') && init?.method === 'PUT') {
          if (activeScenario === 'validation') {
            return jsonResponse({ message: 'Validation failed: choose reminder values greater than 0 minutes.' }, 400);
          }

          return jsonResponse({
            eventId: CANONICAL_EVENT_UUIDS.primary,
            savedAt: '2026-03-15T10:00:00.000Z',
            totalReminders: 4,
            enabledChannels: ['push', 'email']
          });
        }

        if (url.includes('/events/')) {
          if (activeScenario === 'error') {
            return jsonResponse({ message: 'Unable to load event details in mock service.' }, 500);
          }

          return jsonResponse({
            id: CANONICAL_EVENT_UUIDS.primary,
            title: 'Dentist Appointment',
            date: '2026-03-20T09:00:00Z',
            location: 'Smile Clinic',
            status: 'scheduled',
            duplicate: false,
            syncStatus: 'synced',
            reminderPlan: [{ offset: '24h' }, { offset: '3h' }, { offset: '1h' }]
          });
        }

        return jsonResponse({});
      })
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('loads event details, editable plan, and notification history', async () => {
    renderScreen();

    expect(await screen.findByText('Dentist Appointment')).toBeInTheDocument();
    expect(await screen.findByText('Reminder Plan Preview')).toBeInTheDocument();
    expect(await screen.findByText('Editable Reminder Plan')).toBeInTheDocument();
    expect(await screen.findByText('Reminder Channels')).toBeInTheDocument();
    expect(await screen.findByText('Notification History Preview')).toBeInTheDocument();
    expect(await screen.findByText(/Scheduled/)).toBeInTheDocument();
  });

  it('recalculates preview and saves reminder schedule in success scenario', async () => {
    const user = userEvent.setup();
    renderScreen();

    await screen.findByText('Dentist Appointment');
    await user.click(screen.getByRole('button', { name: '+ 30 minutes before' }));

    expect((await screen.findAllByText(/30 minutes before/)).length).toBeGreaterThan(0);

    await user.click(screen.getByRole('button', { name: 'Save' }));

    expect(await screen.findByText('Reminder schedule saved.')).toBeInTheDocument();
    expect(await screen.findByText(/4 reminders scheduled for this event./)).toBeInTheDocument();
  });

  it('shows validation message for invalid custom offset', async () => {
    const user = userEvent.setup();
    renderScreen('success');

    await screen.findByText('Dentist Appointment');
    await user.clear(screen.getByLabelText('Custom offset (minutes before)'));
    await user.type(screen.getByLabelText('Custom offset (minutes before)'), '0');
    await user.click(screen.getByRole('button', { name: 'Add' }));

    expect(await screen.findByText('Reminder offsets must be whole numbers greater than 0.')).toBeInTheDocument();
  });

  it('shows validation save failure in validation scenario', async () => {
    const user = userEvent.setup();
    renderScreen('validation');

    await screen.findByText('Dentist Appointment');
    await user.click(screen.getByRole('button', { name: 'Save' }));

    expect(await screen.findByText('Validation failed: choose reminder values greater than 0 minutes.')).toBeInTheDocument();
    expect(await screen.findByRole('button', { name: 'Retry Save' })).toBeInTheDocument();
  });

  it('shows event detail API error in error scenario', async () => {
    renderScreen('error');

    expect(await screen.findByText('Unable to load event details in mock service.')).toBeInTheDocument();
  });

  it('shows empty notification history and plan state in empty scenario', async () => {
    renderScreen('empty');

    expect(await screen.findByText('No mock notification activity yet.')).toBeInTheDocument();
  });
});
