import { useAppContext } from '../contexts/AppContext';
import type { Scenario } from '../types/models';

const scenarios: Scenario[] = ['success', 'empty', 'error', 'permission'];

export const ScenarioToggle = () => {
  const { scenario, setScenario } = useAppContext();

  return (
    <div className="mt-4 border-t pt-4">
      <label className="mb-1 block text-sm font-medium">Mock Scenario</label>
      <select
        className="w-full rounded border px-2 py-1 text-sm"
        value={scenario}
        onChange={(e) => setScenario(e.target.value as Scenario)}
      >
        {scenarios.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};
