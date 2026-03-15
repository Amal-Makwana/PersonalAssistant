import { NavLink, Outlet } from 'react-router-dom';
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
    <div className="min-h-screen bg-brand-canvas">
      <header className="sticky top-0 z-10 border-b border-brand-border-soft bg-white/95 backdrop-blur">
        <div className="mx-auto flex w-full max-w-shell items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <h1 className="text-lg font-semibold tracking-tight text-brand-text">Frontend-Only Mock Prototype</h1>
          <p className="hidden rounded-full border border-brand-border-alt bg-sky-50 px-3 py-1 text-xs font-medium text-sky-700 sm:block">
            Local data + simulated async states
          </p>
        </div>
      </header>
      <div className="mx-auto grid w-full max-w-shell grid-cols-1 gap-6 px-4 py-8 sm:px-6 md:grid-cols-[290px_1fr] lg:px-8">
        <aside className="editorial-card h-fit">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">Prototype Screens</h2>
          <nav className="space-y-1.5">
            {routes.map(([to, label]) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `block rounded-lg px-3 py-2 text-sm transition duration-base ${
                    isActive
                      ? 'bg-gradient-to-r from-sky-50 to-teal-50 font-medium text-sky-700'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>
          <ScenarioToggle />
        </aside>
        <main className="space-y-6">
          <section className="editorial-card">
            <h2 className="section-title">Mock-first assistant experience</h2>
            <p className="section-description">
              This phase intentionally runs without backend, database, APIs, or external integrations. Toggle deterministic
              scenarios to validate loading, empty, permission, error, and success states.
            </p>
          </section>
          <section className="editorial-card">
          <Outlet />
          </section>
        </main>
      </div>
    </div>
  );
};
