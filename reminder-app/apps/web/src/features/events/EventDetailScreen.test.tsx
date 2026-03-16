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


  it('shows reminder preview error in error scenario', async () => {
    renderScreen('error');

    expect(await screen.findByText('Unable to load event details in mock service.')).toBeInTheDocument();
  });
  it('shows empty notification history and plan state in empty scenario', async () => {
    renderScreen('empty');

    expect(await screen.findByText('No mock notification activity yet.')).toBeInTheDocument();
  });
});
