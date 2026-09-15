import { NavLink } from 'react-router-dom';
import { X } from 'lucide-react';
import { Logo } from '../components/ui/Logo';
import { primaryNav, analysisNav, insightNav, utilityNav } from '../utils/navigation';
import { cn } from '../utils/cn';

function NavSection({ title, items, onNavigate }) {
  return (
    <div className="px-3">
      {title && (
        <p className="px-2 mb-1.5 text-[11px] font-medium text-text-muted">{title}</p>
      )}
      <nav className="flex flex-col gap-0.5">
        {items.map(({ label, to, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            onClick={onNavigate}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-2.5 rounded-md px-2.5 py-[7px] text-[13px] font-medium transition-colors',
                isActive
                  ? 'bg-accent-muted text-accent-text'
                  : 'text-text-secondary hover:text-text-primary hover:bg-surface-hover'
              )
            }
          >
            <Icon size={16} strokeWidth={2} />
            {label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}

export function SidebarContent({ onNavigate }) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex h-14 items-center px-4 border-b border-border">
        <Logo />
      </div>
      <div className="flex-1 overflow-y-auto py-4 flex flex-col gap-5">
        <NavSection items={primaryNav} onNavigate={onNavigate} />
        <NavSection title="Analysis" items={analysisNav} onNavigate={onNavigate} />
        <NavSection title="Insights" items={insightNav} onNavigate={onNavigate} />
        <NavSection items={utilityNav} onNavigate={onNavigate} />
      </div>
      <div className="border-t border-border p-3">
        <div className="rounded-md border border-border bg-background-elevated px-3 py-2.5">
          <p className="text-[12px] font-medium text-text-primary">Demo project</p>
          <p className="text-[11.5px] text-text-secondary mt-0.5">Exploring with sample data</p>
        </div>
      </div>
    </div>
  );
}

export function Sidebar() {
  return (
    <aside className="hidden lg:flex lg:w-60 lg:flex-col border-r border-border bg-background-elevated shrink-0">
      <SidebarContent />
    </aside>
  );
}

export function MobileSidebar({ open, onClose }) {
  return (
    <div
      className={cn(
        'fixed inset-0 z-50 lg:hidden transition-opacity',
        open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
      )}
    >
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div
        className={cn(
          'absolute left-0 top-0 h-full w-72 max-w-[80%] bg-background-elevated border-r border-border transition-transform duration-200',
          open ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <button
          onClick={onClose}
          aria-label="Close navigation"
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-md text-text-secondary hover:bg-surface-hover"
        >
          <X size={16} />
        </button>
        <SidebarContent onNavigate={onClose} />
      </div>
    </div>
  );
}
