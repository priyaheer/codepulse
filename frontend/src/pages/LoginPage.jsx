import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Github, ShieldCheck, Lock, Eye } from 'lucide-react';
import { Logo } from '../components/ui/Logo';
import { Button } from '../components/ui/Button';
import { api } from '../services/api';

const points = [
  { icon: Eye, text: 'We only read repository metadata and source files needed to scan.' },
  { icon: Lock, text: 'Your GitHub token is encrypted and never sent to the browser.' },
  { icon: ShieldCheck, text: 'You can disconnect GitHub at any time from Settings.' },
];

export function LoginPage() {
  const [recentUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('codepulse_recent_user') || 'null'); } catch { return null; }
  });

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="p-6">
        <Link to="/">
          <Logo />
        </Link>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 pb-16">
        <div className="w-full max-w-sm">
          <div className="rounded-lg border border-border bg-surface p-7">
            <h1 className="text-[18px] font-semibold text-text-primary text-center">Sign in to CodePulse</h1>
            <p className="mt-1.5 text-[13px] text-text-secondary text-center">
              Repository access is required to analyze your code.
            </p>

            {recentUser && (
              <div className="mt-6 rounded-md border border-border bg-background p-3">
                <div className="flex items-center gap-3">
                  {recentUser.avatarUrl ? <img src={recentUser.avatarUrl} alt={recentUser.name || recentUser.username} className="h-9 w-9 rounded-full" /> : <div className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-active text-[12px] font-medium text-text-primary">{recentUser.username?.slice(0, 2).toUpperCase()}</div>}
                  <div className="min-w-0"><p className="text-[12px] text-text-secondary">Recent GitHub account</p><p className="truncate text-[13px] font-medium text-text-primary">{recentUser.name || `@${recentUser.username}`}</p><p className="text-[11.5px] text-text-secondary">@{recentUser.username}</p></div>
                </div>
                <Button as="a" href={api.githubLoginUrl} variant="secondary" size="md" className="mt-3 w-full" icon={<Github size={16} />}>Continue with @{recentUser.username}</Button>
              </div>
            )}

            <Button as="a" href={api.githubLoginUrl} variant={recentUser ? 'ghost' : 'secondary'} size="lg" className="w-full mt-6" icon={<Github size={17} />}>
              {recentUser ? 'Use another GitHub account' : 'Continue with GitHub'}
            </Button>

            <div className="mt-6 flex flex-col gap-3">
              {points.map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-start gap-2.5">
                  <Icon size={14} className="mt-0.5 text-text-muted shrink-0" />
                  <p className="text-[12px] text-text-secondary leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </div>

          <p className="mt-5 text-center text-[12.5px] text-text-secondary">
            Just exploring?{' '}
            <Link to="/demo" className="text-accent hover:text-accent-hover font-medium">
              Try the demo project
            </Link>{' '}
            instead.
          </p>
        </div>
      </div>
    </div>
  );
}
