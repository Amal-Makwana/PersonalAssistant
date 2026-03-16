import { useEffect, useState } from 'react';
import type { ReminderChannelConfig } from '../../../types/models';

interface ReminderChannelsPreviewProps {
  channels: ReminderChannelConfig | null;
  error: string | null;
  loading: boolean;
}

const channelRows = [
  { key: 'push', label: 'Push Notifications' },
  { key: 'email', label: 'Email' },
  { key: 'sms', label: 'SMS' }
] as const;

export const ReminderChannelsPreview = ({ channels, error, loading }: ReminderChannelsPreviewProps) => {
  const [localChannels, setLocalChannels] = useState<ReminderChannelConfig | null>(channels);

  useEffect(() => {
    setLocalChannels(channels);
  }, [channels]);

  const activeChannels = localChannels;

  return (
    <div className="editorial-card space-y-2">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-600">Reminder Channels</h3>
      {loading && <p className="text-sm text-slate-500">Loading reminder channels...</p>}
      {!loading && error && <p className="text-sm text-red-700">{error}</p>}
      {!loading && !error && activeChannels && (
        <ul className="space-y-2">
          {channelRows.map((channel) => {
            const enabled = activeChannels[channel.key];
            return (
              <li className="flex items-center justify-between text-sm" key={channel.key}>
                <div>
                  <p className="font-medium text-brand-text">{channel.label}</p>
                  <p className="text-slate-600">{enabled ? '✓ enabled' : '✖ not configured'}</p>
                </div>
                <label className="text-xs text-slate-500">
                  <input
                    checked={enabled}
                    onChange={() =>
                      setLocalChannels((prev) =>
                        prev
                          ? {
                              ...prev,
                              [channel.key]: !prev[channel.key]
                            }
                          : prev
                      )
                    }
                    type="checkbox"
                  />{' '}
                  Toggle
                </label>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
