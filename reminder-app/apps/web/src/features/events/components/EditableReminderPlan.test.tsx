import { vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { EditableReminderPlan } from './EditableReminderPlan';

describe('EditableReminderPlan', () => {
  it('adds and removes offsets', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(<EditableReminderPlan eventTime="2026-03-20T09:00:00Z" offsetsMinutes={[60]} onChange={onChange} />);

    await user.click(screen.getByRole('button', { name: '+ 30 minutes before' }));
    expect(onChange).toHaveBeenCalledWith([60, 30]);

    await user.click(screen.getByRole('button', { name: 'Remove' }));
    expect(onChange).toHaveBeenCalledWith([]);
  });

  it('shows validation for invalid custom offsets', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(<EditableReminderPlan eventTime="2026-03-20T09:00:00Z" offsetsMinutes={[60]} onChange={onChange} />);

    await user.clear(screen.getByLabelText('Custom offset (minutes before)'));
    await user.type(screen.getByLabelText('Custom offset (minutes before)'), '0');
    await user.click(screen.getByRole('button', { name: 'Add' }));

    expect(await screen.findByText('Reminder offsets must be whole numbers greater than 0.')).toBeInTheDocument();
    expect(onChange).not.toHaveBeenCalled();
  });
});
