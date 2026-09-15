import { Menu, Search, Bell, ChevronDown } from 'lucide-react';
import { ThemeToggle } from '../components/ui/ThemeToggle';

export function Topbar({ onMenuClick, onSearchClick }) {
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
          <span className="truncate mono">acme/dashboard-app</span>
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

        <div className="h-7 w-7 rounded-full bg-surface-active border border-border-strong flex items-center justify-center text-[11px] font-medium text-text-secondary ml-1">
          JD
        </div>
      </div>
    </header>
  );
}
