import { useMemo, useState } from 'react';
import { formatOffsetLabel, validateReminderOffsetMinutes } from '../utils/reminderPlanCalculator';

interface EditableReminderPlanProps {
  eventTime: string;
  offsetsMinutes: number[];
  onChange: (offsetsMinutes: number[]) => void;
}

const reminderOffsetPresets = [
  { id: 'offset-24h', label: '24 hours before', minutesBefore: 24 * 60 },
  { id: 'offset-3h', label: '3 hours before', minutesBefore: 3 * 60 },
  { id: 'offset-1h', label: '1 hour before', minutesBefore: 60 },
  { id: 'offset-30m', label: '30 minutes before', minutesBefore: 30 }
];

export const EditableReminderPlan = ({ eventTime, offsetsMinutes, onChange }: EditableReminderPlanProps) => {
  const [customOffset, setCustomOffset] = useState('');
  const [validationMessage, setValidationMessage] = useState<string | null>(null);

  const availablePresets = useMemo(
    () => reminderOffsetPresets.filter((preset) => !offsetsMinutes.includes(preset.minutesBefore)),
    [offsetsMinutes]
  );

  const addOffset = (offsetMinutes: number) => {
    if (offsetsMinutes.includes(offsetMinutes)) {
      setValidationMessage('This reminder offset already exists.');
      return;
    }

    const validation = validateReminderOffsetMinutes(offsetMinutes);
    if (validation) {
      setValidationMessage(validation);
      return;
    }

    if (Number.isNaN(Date.parse(eventTime))) {
      setValidationMessage('Cannot configure reminders because event date/time is invalid.');
      return;
    }

    setValidationMessage(null);
    onChange([...offsetsMinutes, offsetMinutes].sort((a, b) => b - a));
  };

  const removeOffset = (offsetMinutes: number) => {
    onChange(offsetsMinutes.filter((offset) => offset !== offsetMinutes));
    setValidationMessage(null);
  };

  return (
    <div className="editorial-card space-y-2">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-600">Editable Reminder Plan</h3>
      <p className="text-sm text-slate-600">Add or remove reminder timing offsets. Preview updates instantly.</p>

      <div className="flex flex-wrap gap-2">
        {availablePresets.map((preset) => (
          <button className="button-primary" key={preset.id} onClick={() => addOffset(preset.minutesBefore)} type="button">
            + {preset.label}
          </button>
        ))}
      </div>

      <label className="text-sm text-slate-700">
        Custom offset (minutes before)
        <div className="mt-1 flex gap-2">
          <input className="input-soft" min={1} onChange={(event) => setCustomOffset(event.target.value)} type="number" value={customOffset} />
          <button
            className="button-primary"
            onClick={() => {
              const parsed = Number(customOffset);
              addOffset(parsed);
              if (!Number.isNaN(parsed) && !validateReminderOffsetMinutes(parsed)) {
                setCustomOffset('');
              }
            }}
            type="button"
          >
            Add
          </button>
        </div>
      </label>

      <ul className="space-y-1">
        {offsetsMinutes.map((offset) => (
          <li className="flex items-center justify-between text-sm text-slate-700" key={offset}>
            <span>{formatOffsetLabel(offset)}</span>
            <button className="text-red-700" onClick={() => removeOffset(offset)} type="button">
              Remove
            </button>
          </li>
        ))}
      </ul>

      {validationMessage && <p className="text-sm text-red-700">{validationMessage}</p>}
    </div>
  );
};
