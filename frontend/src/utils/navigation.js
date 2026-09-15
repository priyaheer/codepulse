import {
  LayoutDashboard,
  FolderGit2,
  ListTree,
  FileCode2,
  ShieldCheck,
  Package,
  Gauge,
  Network,
  Sparkles,
  History,
  BarChart3,
  Settings,
} from 'lucide-react';

export const primaryNav = [
  { label: 'Dashboard', to: '/app/dashboard', icon: LayoutDashboard },
  { label: 'Projects', to: '/app/projects', icon: FolderGit2 },
  { label: 'Issues', to: '/app/issues', icon: ListTree },
  { label: 'Code explorer', to: '/app/explorer', icon: FileCode2 },
];

export const analysisNav = [
  { label: 'Security', to: '/app/security', icon: ShieldCheck },
  { label: 'Dependencies', to: '/app/dependencies', icon: Package },
  { label: 'Performance', to: '/app/performance', icon: Gauge },
  { label: 'Architecture', to: '/app/architecture', icon: Network },
];

export const insightNav = [
  { label: 'AI assistant', to: '/app/assistant', icon: Sparkles },
  { label: 'Scan history', to: '/app/history', icon: History },
  { label: 'Analytics', to: '/app/analytics', icon: BarChart3 },
];

export const utilityNav = [{ label: 'Settings', to: '/app/settings', icon: Settings }];

export const allNavItems = [...primaryNav, ...analysisNav, ...insightNav, ...utilityNav];
