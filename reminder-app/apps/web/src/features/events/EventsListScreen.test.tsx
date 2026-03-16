import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { AppProvider } from '../../contexts/AppContext';
import { resetMockEventStore } from '../../services/mock/mockEventService';
import { EventsListScreen } from './EventsListScreen';

const renderScreen = (scenario: 'success' | 'empty' | 'error' | 'permission' | 'validation' = 'success') => {
  render(
    <AppProvider initialScenario={scenario}>
      <MemoryRouter>
        <EventsListScreen />
      </MemoryRouter>
    </AppProvider>
  );
};

describe('EventsListScreen', () => {
  beforeEach(() => {
    resetMockEventStore();
  });

  it('shows loading state initially', () => {
    renderScreen();
    expect(screen.getByTestId('loading-state')).toBeInTheDocument();
  });

  it('renders events on success scenario', async () => {
    renderScreen();
    expect(await screen.findByText('Dentist Appointment')).toBeInTheDocument();
  });

  it('supports filtering by duplicates', async () => {
    const user = userEvent.setup();
    renderScreen();

    await screen.findByText('Dentist Appointment');
    await user.click(screen.getByLabelText('Show duplicates only'));

    expect(screen.queryByText('Dentist Appointment')).not.toBeInTheDocument();
    expect(screen.getByText('Client Follow-up')).toBeInTheDocument();
  });

  it('shows error scenario message', async () => {
    renderScreen('error');
    expect(await screen.findByText('Mock event service failed.')).toBeInTheDocument();
  });
});
