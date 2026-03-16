import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AppProvider } from '../../contexts/AppContext';
import { resetMockEventStore } from '../../services/mock/mockEventService';
import { EventDetailScreen } from './EventDetailScreen';

const renderScreen = (
  scenario: 'success' | 'empty' | 'error' | 'permission' | 'validation' = 'success',
  eventId = 'evt-1'
) => {
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
  });

  it('loads event details and reminder previews', async () => {
    renderScreen();

    expect(await screen.findByText('Dentist Appointment')).toBeInTheDocument();
    expect(await screen.findByText('Reminder Plan Preview')).toBeInTheDocument();
    expect(await screen.findByText(/24 hours before/)).toBeInTheDocument();
    expect(await screen.findByText('Reminder Channels')).toBeInTheDocument();
    expect(await screen.findByText('Push Notifications')).toBeInTheDocument();
  });

  it('saves reminder settings in success scenario', async () => {
    const user = userEvent.setup();
    renderScreen();

    const input = await screen.findByLabelText('Primary reminder (minutes before)');
    await user.clear(input);
    await user.type(input, '45');
    await user.click(screen.getByRole('button', { name: 'Save' }));

    expect(await screen.findByText(/Saved mock reminder settings at/)).toBeInTheDocument();
  });

  it('shows validation message in validation scenario', async () => {
    const user = userEvent.setup();
    renderScreen('validation');

    await screen.findByText('Dentist Appointment');
    await user.click(screen.getByRole('button', { name: 'Save' }));

    expect(await screen.findByText('Validation failed: choose reminder values greater than 0 minutes.')).toBeInTheDocument();
  });

  it('shows empty reminder plan state in empty scenario', async () => {
    renderScreen('empty');

    expect(await screen.findByText('Reminder plan unavailable because event date/time is missing.')).toBeInTheDocument();
  });

  it('shows reminder preview error in error scenario', async () => {
    renderScreen('error');

    expect(await screen.findByText('Unable to load event details in mock service.')).toBeInTheDocument();
  });
});
