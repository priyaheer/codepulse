import { useEffect, useState } from 'react';
import { ExternalLink, Github, Mail, UserRound } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardBody } from '../components/ui/Card';
import { api } from '../services/api';
import { PageHeader } from './PageHeader';

export function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    api.getMe().then(setProfile).catch((err) => setError(err.message));
  }, []);

  if (!profile && !error) {
    return <div className="rounded-md border border-border bg-surface p-4 text-[13px] text-text-secondary">Loading profile…</div>;
  }

  return (
    <div>
      <PageHeader
        eyebrow="Profile"
        title="Developer profile"
        description="Authenticated GitHub account details for the current CodePulse session."
      />

      {error && <div className="mb-4 rounded-md border border-danger/40 bg-danger/10 px-3 py-2 text-[12px] text-danger">{error}</div>}

      <Card>
        <CardBody className="grid gap-6 md:grid-cols-[140px_1fr]">
          <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border border-border bg-surface-active text-[28px] font-semibold text-text-primary">
            {profile?.avatarUrl ? <img src={profile.avatarUrl} alt={profile.name} className="h-full w-full object-cover" /> : (profile?.name || 'CP').slice(0, 2).toUpperCase()}
          </div>

          <div className="space-y-4 text-[13px] text-text-secondary">
            <div>
              <p className="text-[24px] font-semibold text-text-primary">{profile?.name || 'GitHub user'}</p>
              <p className="mt-1 text-text-secondary">@{profile?.username || 'github-user'}</p>
            </div>

            <div className="flex flex-wrap gap-3">
              {profile?.githubProfileUrl && (
                <Button as="a" href={profile.githubProfileUrl} target="_blank" rel="noreferrer" variant="secondary" size="sm" icon={<ExternalLink size={13} />}>GitHub profile</Button>
              )}
              <Button variant="ghost" size="sm" icon={<Mail size={13} />}>{profile?.email || 'Email unavailable'}</Button>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-md border border-border bg-background p-3"><p className="text-[11.5px] text-text-secondary">GitHub connection</p><p className="mt-2 flex items-center gap-2 text-[13px] font-medium text-success"><span className="h-2 w-2 rounded-full bg-success" /> Connected</p></div>
              <div className="rounded-md border border-border bg-background p-3"><p className="text-[11.5px] text-text-secondary">Repositories</p><p className="mt-2 text-[18px] font-semibold text-text-primary">{profile?.publicRepos ?? 0}</p></div>
              <div className="rounded-md border border-border bg-background p-3"><p className="text-[11.5px] text-text-secondary">Followers</p><p className="mt-2 text-[18px] font-semibold text-text-primary">{profile?.followers ?? 0}</p></div>
              <div className="rounded-md border border-border bg-background p-3"><p className="text-[11.5px] text-text-secondary">Following</p><p className="mt-2 text-[18px] font-semibold text-text-primary">{profile?.following ?? 0}</p></div>
            </div>

            <div className="rounded-md border border-border bg-background p-3 text-[12px] text-text-secondary">
              <div className="flex items-center gap-2 text-text-primary"><Github size={14} /> GitHub account</div>
              <p className="mt-2">Authenticated as {profile?.username || 'GitHub user'} and linked to the active CodePulse workspace.</p>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
