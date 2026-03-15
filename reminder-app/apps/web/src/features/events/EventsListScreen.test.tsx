import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { EventsListScreen } from './EventsListScreen';
import { AppProvider } from '../../contexts/AppContext';

describe('EventsListScreen', () => {
  it('shows loading state initially', () => {
    render(
      <AppProvider>
        <BrowserRouter>
          <EventsListScreen />
        </BrowserRouter>
      </AppProvider>
    );

    expect(screen.getByTestId('loading-state')).toBeInTheDocument();
  });

  it('renders events on success scenario', async () => {
    render(
      <AppProvider>
        <BrowserRouter>
          <EventsListScreen />
        </BrowserRouter>
      </AppProvider>
    );

    expect(await screen.findByText('Dentist Appointment')).toBeInTheDocument();
  });
});
