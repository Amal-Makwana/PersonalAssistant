import { render, screen } from '@testing-library/react';
import { ReminderChannelsPreview } from './ReminderChannelsPreview';

describe('ReminderChannelsPreview', () => {
  it('renders channel enabled and disabled states', () => {
    render(
      <ReminderChannelsPreview
        channels={{ push: true, email: true, sms: false }}
        error={null}
        loading={false}
      />
    );

    expect(screen.getByText('Push Notifications')).toBeInTheDocument();
    expect(screen.getAllByText('✓ enabled')).toHaveLength(2);
    expect(screen.getByText('✖ not configured')).toBeInTheDocument();
  });
});
