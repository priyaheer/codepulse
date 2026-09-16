import { Menu, Search, Bell, ChevronDown, LogOut, UserCircle2, Settings, ExternalLink } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ThemeToggle } from '../components/ui/ThemeToggle';
import { api } from '../services/api';

export function Topbar({ user, onMenuClick, onSearchClick }) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState('');
  const initials = user?.name ? user.name.split(' ').map((part) => part[0]).slice(0, 2).join('').toUpperCase() : 'CP';

  useEffect(() => {
    let active = true;
    api.listProjects().then((items) => {
      if (!active) return;
      const stored = localStorage.getItem('codepulse_active_project');
      const selected = items.find((item) => item._id === stored) || items[0];
      setProjects(items);
      setSelectedProject(selected?._id || '');
      if (selected) localStorage.setItem('codepulse_active_project', selected._id);
      else localStorage.removeItem('codepulse_active_project');
    }).catch(() => { if (active) { setProjects([]); setSelectedProject(''); } });
    return () => { active = false; };
  }, [user?.id]);

  function handleProjectChange(event) {
    const projectId = event.target.value;
    setSelectedProject(projectId);
    if (projectId) localStorage.setItem('codepulse_active_project', projectId);
    else localStorage.removeItem('codepulse_active_project');
    navigate('/app/dashboard');
  }

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

        <label className="hidden sm:flex items-center gap-2 rounded-md border border-border-strong bg-surface px-2.5 py-1.5 text-[13px] text-text-primary hover:bg-surface-hover transition-colors max-w-[280px]">
          <span className="h-1.5 w-1.5 rounded-full bg-success shrink-0" />
          <select aria-label="Select project" value={selectedProject} onChange={handleProjectChange} className="max-w-[220px] truncate bg-transparent outline-none mono">
            {!projects.length && <option value="">No connected project</option>}
            {projects.map((project) => <option key={project._id} value={project._id}>{project.owner}/{project.name}</option>)}
          </select>
          <ChevronDown size={14} className="text-text-muted shrink-0" />
        </label>
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
