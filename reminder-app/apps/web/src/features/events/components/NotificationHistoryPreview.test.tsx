import { render, screen } from '@testing-library/react';
import { NotificationHistoryPreview } from './NotificationHistoryPreview';

describe('NotificationHistoryPreview', () => {
  it('renders mock notification activity rows with statuses', () => {
    render(
      <NotificationHistoryPreview
        entries={[
          { id: '1', status: 'Scheduled', remindAt: '2026-06-24T10:00:00Z', channels: ['push', 'email'], direction: 'upcoming' },
          { id: '2', status: 'Failed', remindAt: '2026-06-24T09:00:00Z', channels: ['email'], direction: 'past' }
        ]}
        error={null}
        loading={false}
      />
    );

    expect(screen.getByText(/Scheduled/)).toBeInTheDocument();
    expect(screen.getByText(/Failed/)).toBeInTheDocument();
    expect(screen.getByText(/PUSH, EMAIL/)).toBeInTheDocument();
  });
});
