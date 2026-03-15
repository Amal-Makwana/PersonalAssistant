import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { App } from './App';
import { AppProvider } from './contexts/AppContext';

describe('App routes', () => {
  it('renders login screen by default', () => {
    render(
      <AppProvider>
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      </AppProvider>
    );

    expect(screen.getByText('S01 Login & Consent')).toBeInTheDocument();
  });
});
