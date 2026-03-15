import { useAppContext } from '../contexts/AppContext';
import type { Scenario } from '../types/models';

const scenarios: Scenario[] = ['success', 'empty', 'error', 'permission'];

export const ScenarioToggle = () => {
  const { scenario, setScenario } = useAppContext();

  return (
    <div className="mt-5 border-t border-brand-border-soft pt-4">
      <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500">Mock Scenario</label>
      <select
        className="input-soft"
        value={scenario}
        onChange={(e) => setScenario(e.target.value as Scenario)}
      >
        {scenarios.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
      <p className="mono-fragment mt-2">scenario={scenario}</p>
    </div>
  );
};
