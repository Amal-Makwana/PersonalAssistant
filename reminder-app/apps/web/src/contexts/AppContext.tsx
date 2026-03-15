import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import type { Scenario } from '../types/models';

interface AppState {
  scenario: Scenario;
  setScenario: (scenario: Scenario) => void;
}

const AppContext = createContext<AppState | null>(null);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [scenario, setScenario] = useState<Scenario>('success');
  const value = useMemo(() => ({ scenario, setScenario }), [scenario]);
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = (): AppState => {
  const state = useContext(AppContext);
  if (!state) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return state;
};
