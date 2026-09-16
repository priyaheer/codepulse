import { Bell, Shield, KeyRound, UserCircle2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardBody, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { api } from '../services/api';
import { PageHeader } from './PageHeader';

export function SettingsPage() {
  const [profile, setProfile] = useState(null);
  const [scanAlerts, setScanAlerts] = useState(() => localStorage.getItem('codepulse_notify_scan') !== 'false');
  const [criticalAlerts, setCriticalAlerts] = useState(() => localStorage.getItem('codepulse_notify_critical') !== 'false');
  const navigate = useNavigate();

  useEffect(() => {
    api.getMe().then(setProfile).catch(() => setProfile(null));
  }, []);

  function updatePreference(key, value, setter) {
    setter(value);
    localStorage.setItem(key, String(value));
  }

  async function logout() {
    await api.logout(profile);
    navigate('/', { replace: true });
  }

  return (
    <div>
      <PageHeader
        eyebrow="Preferences"
        title="Settings"
        description="Security, notification, and workspace preferences for the active account."
      />

      <div className="grid gap-6 xl:grid-cols-2">
        <Card>
          <CardHeader title="Account" description="GitHub and access settings" />
          <CardBody className="space-y-3">
            <div className="flex items-center justify-between rounded-md border border-border bg-background p-3">
              <div className="flex items-center gap-2"><UserCircle2 size={15} className="text-accent" /> <span>{profile ? `GitHub connected: @${profile.username}` : 'GitHub connected'}</span></div>
              <Button as={Link} to="/app/profile" variant="secondary" size="sm">View profile</Button>
            </div>
            <div className="flex items-center justify-between rounded-md border border-border bg-background p-3">
              <div className="flex items-center gap-2"><KeyRound size={15} className="text-text-secondary" /> <span>Provider secrets</span></div>
              <span className="text-[12px] text-text-secondary">Backend-only</span>
            </div>
            <Button variant="secondary" size="sm" onClick={logout}>Log out</Button>
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Notifications" description="Delivery preferences" />
          <CardBody className="space-y-3">
            <div className="flex items-center justify-between rounded-md border border-border bg-background p-3">
              <div className="flex items-center gap-2"><Bell size={15} className="text-accent" /> <span>Scan completed</span></div>
              <input type="checkbox" checked={scanAlerts} onChange={(event) => updatePreference('codepulse_notify_scan', event.target.checked, setScanAlerts)} className="h-4 w-4 accent-accent" />
            </div>
            <div className="flex items-center justify-between rounded-md border border-border bg-background p-3">
              <div className="flex items-center gap-2"><Shield size={15} className="text-text-secondary" /> <span>Critical issue alerts</span></div>
              <input type="checkbox" checked={criticalAlerts} onChange={(event) => updatePreference('codepulse_notify_critical', event.target.checked, setCriticalAlerts)} className="h-4 w-4 accent-accent" />
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
