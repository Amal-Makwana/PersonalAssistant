import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AppProvider } from '../../contexts/AppContext';
import { resetMockEventStore } from '../../services/mock/mockEventService';
import { DashboardScreen } from './DashboardScreen';

const renderScreen = (scenario: 'success' | 'empty' | 'error' | 'permission' | 'validation' = 'success') => {
  render(
    <AppProvider initialScenario={scenario}>
      <MemoryRouter>
        <DashboardScreen />
      </MemoryRouter>
    </AppProvider>
  );
};

describe('DashboardScreen', () => {
  beforeEach(() => {
    resetMockEventStore();
  });

  it('renders summary cards in success scenario', async () => {
    renderScreen();

    expect(await screen.findByText('Upcoming')).toBeInTheDocument();
    expect(screen.getByText('Open Events List')).toBeInTheDocument();
  });

  it('shows empty state in empty scenario', async () => {
    renderScreen('empty');

    expect(await screen.findByText('No upcoming events in this mock scenario.')).toBeInTheDocument();
  });
});
