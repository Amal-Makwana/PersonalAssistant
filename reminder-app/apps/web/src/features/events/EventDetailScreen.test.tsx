import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AppProvider } from '../../contexts/AppContext';
import { resetMockEventStore } from '../../services/mock/mockEventService';
import { EventDetailScreen } from './EventDetailScreen';

const renderScreen = (scenario: 'success' | 'empty' | 'error' | 'permission' | 'validation' = 'success') => {
  render(
    <AppProvider initialScenario={scenario}>
      <MemoryRouter initialEntries={['/events/evt-1']}>
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

  it('loads event details', async () => {
    renderScreen();

    expect(await screen.findByText('Dentist Appointment')).toBeInTheDocument();
  });

  it('saves reminder settings in success scenario', async () => {
    const user = userEvent.setup();
    renderScreen();

    const input = await screen.findByLabelText('Primary reminder (minutes before)');
    await user.clear(input);
    await user.type(input, '45');
    await user.click(screen.getByRole('button', { name: 'Save reminder settings (Mock)' }));

    expect(await screen.findByText(/Saved mock reminder settings at/)).toBeInTheDocument();
  });

  it('shows validation message in validation scenario', async () => {
    const user = userEvent.setup();
    renderScreen('validation');

    await screen.findByText('Dentist Appointment');
    await user.click(screen.getByRole('button', { name: 'Save reminder settings (Mock)' }));

    expect(await screen.findByText('Validation failed: choose reminder values greater than 0 minutes.')).toBeInTheDocument();
  });
});
