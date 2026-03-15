import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { LoginScreen } from './features/auth/LoginScreen';
import { DiagnosticsScreen } from './features/diagnostics/DiagnosticsScreen';
import { DashboardScreen } from './features/dashboard/DashboardScreen';
import { EventDetailScreen } from './features/events/EventDetailScreen';
import { EventsListScreen } from './features/events/EventsListScreen';
import { IntegrationsScreen } from './features/integrations/IntegrationsScreen';
import { OnboardingScreen } from './features/onboarding/OnboardingScreen';
import { PreferencesScreen } from './features/preferences/PreferencesScreen';
import { SettingsScreen } from './features/settings/SettingsScreen';

export const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/onboarding" element={<OnboardingScreen />} />
        <Route path="/dashboard" element={<DashboardScreen />} />
        <Route path="/events" element={<EventsListScreen />} />
        <Route path="/events/:eventId" element={<EventDetailScreen />} />
        <Route path="/preferences" element={<PreferencesScreen />} />
        <Route path="/integrations" element={<IntegrationsScreen />} />
        <Route path="/diagnostics" element={<DiagnosticsScreen />} />
        <Route path="/settings" element={<SettingsScreen />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
