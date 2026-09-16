import { Menu, Search, Bell, ChevronDown, LogOut, UserCircle2, Settings, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ThemeToggle } from '../components/ui/ThemeToggle';
import { api } from '../services/api';

export function Topbar({ user, onMenuClick, onSearchClick }) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const initials = user?.name ? user.name.split(' ').map((part) => part[0]).slice(0, 2).join('').toUpperCase() : 'CP';

  async function handleLogout() {
    try {
      await api.logout();
    } finally {
      setMenuOpen(false);
      navigate('/login', { replace: true });
    }
  }

  return (
    <header className="flex h-14 items-center justify-between gap-3 border-b border-border bg-background px-4 lg:px-6 shrink-0">
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onMenuClick}
          aria-label="Open navigation"
          className="lg:hidden flex h-8 w-8 items-center justify-center rounded-md text-text-secondary hover:bg-surface-hover"
        >
          <Menu size={17} />
        </button>

        <button
          type="button"
          className="hidden sm:flex items-center gap-2 rounded-md border border-border-strong bg-surface px-2.5 py-1.5 text-[13px] text-text-primary hover:bg-surface-hover transition-colors max-w-[260px]"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-success shrink-0" />
          <span className="truncate mono">{user?.username ? `${user.username}/workspace` : 'Connected GitHub account'}</span>
          <ChevronDown size={14} className="text-text-muted shrink-0" />
        </button>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onSearchClick}
          className="hidden md:flex items-center gap-2 rounded-md border border-border-strong bg-surface px-2.5 h-8 text-[12.5px] text-text-secondary hover:bg-surface-hover transition-colors w-56"
        >
          <Search size={14} />
          <span className="flex-1 text-left">Search or run a command</span>
          <kbd className="text-[10.5px] text-text-muted border border-border-strong rounded px-1 py-0.5">
            &#8984;K
          </kbd>
        </button>
        <button
          onClick={onSearchClick}
          aria-label="Search"
          className="md:hidden flex h-8 w-8 items-center justify-center rounded-md text-text-secondary hover:bg-surface-hover"
        >
          <Search size={16} />
        </button>

        <button
          aria-label="Notifications"
          className="relative flex h-8 w-8 items-center justify-center rounded-md text-text-secondary hover:bg-surface-hover hover:text-text-primary transition-colors"
        >
          <Bell size={16} />
          <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-danger" />
        </button>

        <ThemeToggle />

        <div className="relative ml-1">
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-border-strong bg-surface-active text-[11px] font-medium text-text-secondary hover:border-accent/60"
            aria-label="Open account menu"
          >
            {user?.avatarUrl ? <img src={user.avatarUrl} alt={user.name || user.username} className="h-full w-full object-cover" /> : initials}
          </button>

          {menuOpen && (
            <div className="absolute right-0 top-11 z-50 w-56 rounded-lg border border-border bg-background-elevated shadow-[var(--cp-shadow-strong)] overflow-hidden">
              <div className="flex items-center gap-3 border-b border-border px-3 py-3">
                {user?.avatarUrl ? <img src={user.avatarUrl} alt={user.name || user.username} className="h-9 w-9 rounded-full object-cover" /> : <div className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-active text-[12px] font-medium text-text-primary">{initials}</div>}
                <div className="min-w-0">
                  <p className="truncate text-[13px] font-medium text-text-primary">{user?.name || 'CodePulse user'}</p>
                  <p className="truncate text-[11.5px] text-text-secondary">@{user?.username || 'github-user'}</p>
                </div>
              </div>

              <div className="py-1">
                <Link to="/app/profile" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 px-3 py-2 text-[13px] text-text-primary hover:bg-surface-hover"><UserCircle2 size={14} /> Profile</Link>
                <Link to="/app/settings" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 px-3 py-2 text-[13px] text-text-primary hover:bg-surface-hover"><Settings size={14} /> Settings</Link>
                {user?.githubProfileUrl && (
                  <a href={user.githubProfileUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-3 py-2 text-[13px] text-text-primary hover:bg-surface-hover"><ExternalLink size={14} /> GitHub Profile</a>
                )}
                <button type="button" onClick={handleLogout} className="flex w-full items-center gap-2 px-3 py-2 text-left text-[13px] text-text-primary hover:bg-surface-hover"><LogOut size={14} /> Logout</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
