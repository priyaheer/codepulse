import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Sidebar, MobileSidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { CommandPalette, useCommandPalette } from '../components/ui/CommandPalette';
import { api } from '../services/api';

export function AppLayout() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);
  const { open, setOpen } = useCommandPalette();

  useEffect(() => {
    let active = true;
    api.getMe().then((me) => {
      if (active) setUser(me);
    }).catch(() => {
      if (active) setUser(null);
    }).finally(() => {
      if (active) setAuthChecked(true);
    });
    return () => { active = false; };
  }, []);

  if (!authChecked) return <div className="flex min-h-screen items-center justify-center bg-background text-[13px] text-text-secondary">Checking authenticated session...</div>;
  if (!user) return <Navigate to="/login" replace />;

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      <Sidebar />
      <MobileSidebar open={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />

      <div className="flex flex-1 flex-col min-w-0">
        <Topbar user={user} onMenuClick={() => setMobileNavOpen(true)} onSearchClick={() => setOpen(true)} />
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto w-full max-w-[1400px] px-4 py-6 lg:px-8 lg:py-8">
            <Outlet context={{ user }} />
          </div>
        </main>
      </div>

      <CommandPalette open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
