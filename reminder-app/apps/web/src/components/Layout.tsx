import { Link, Outlet } from 'react-router-dom';
import { ScenarioToggle } from './ScenarioToggle';

const routes = [
  ['/', 'S01 Login'],
  ['/onboarding', 'S02 Onboarding'],
  ['/dashboard', 'S03 Dashboard'],
  ['/events', 'S04 Events'],
  ['/events/evt-1', 'S05 Event Detail'],
  ['/preferences', 'S06 Preferences'],
  ['/integrations', 'S07 Integrations'],
  ['/diagnostics', 'S08 Diagnostics'],
  ['/settings', 'S09 Settings']
] as const;

export const Layout = () => {
  return (
    <div className="min-h-screen">
      <header className="border-b bg-white p-4 shadow-sm">
        <h1 className="text-lg font-semibold">Frontend-Only Mock Prototype</h1>
      </header>
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 p-4 md:grid-cols-[280px_1fr]">
        <aside className="rounded-xl border bg-white p-4">
          <h2 className="mb-2 text-sm font-medium text-slate-500">Screens</h2>
          <nav className="space-y-1">
            {routes.map(([to, label]) => (
              <Link key={to} to={to} className="block rounded px-2 py-1 text-sm hover:bg-slate-100">
                {label}
              </Link>
            ))}
          </nav>
          <ScenarioToggle />
        </aside>
        <main className="rounded-xl border bg-white p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
