import { useEffect, useState } from 'react';
import { Badge } from '../components/ui/Badge';
import { Card, CardBody, CardHeader } from '../components/ui/Card';
import { api } from '../services/api';
import { PageHeader } from './PageHeader';

export function AnalyticsPage() {
  const [analytics, setAnalytics] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    async function load() {
      try {
        const projects = await api.listProjects();
        const projectId = localStorage.getItem('codepulse_active_project') || projects[0]?._id;
        if (!projectId) return;
        localStorage.setItem('codepulse_active_project', projectId);
        const result = await api.getAnalytics(projectId);
        if (active) setAnalytics(result);
      } catch (err) {
        if (active) setError(err.message);
      }
    }
    load();
    return () => { active = false; };
  }, []);

  const latest = analytics?.latest;
  const history = analytics?.history || [];

  return (
    <div>
      <PageHeader eyebrow="Analytics" title="Performance and trends" description="Historical health and finding data from completed repository scans." />
      {error && <div className="mb-6 rounded-md border border-danger/40 bg-danger/10 px-3 py-2 text-[12px] text-danger">{error}</div>}
      {!analytics && !error && <div className="rounded-md border border-border bg-surface px-4 py-5 text-[13px] text-text-secondary">Loading real scan analytics...</div>}
      {analytics && <>
        <div className="mb-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
          {[
            ['Repository', analytics.project.repository],
            ['Latest health', latest?.healthScore ?? 'Not available'],
            ['Score change', analytics.scoreChange === null ? 'First scan' : `${analytics.scoreChange >= 0 ? '+' : ''}${analytics.scoreChange}`],
            ['Latest issues', latest?.findings.total ?? 0],
            ['Completed scans', history.length],
          ].map(([label, value]) => <div key={label} className="rounded-md border border-border bg-surface p-3"><p className="text-[11.5px] text-text-secondary">{label}</p><p className="mt-2 truncate text-[16px] font-semibold text-text-primary">{value}</p></div>)}
        </div>
        {analytics.insufficientHistory && <div className="mb-6 rounded-md border border-dashed border-border bg-surface px-4 py-5 text-[13px] text-text-secondary">Run another completed scan to see real health and issue trends.</div>}
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader title="Health over time" description="Completed scan scores from MongoDB" />
            <CardBody className="space-y-3">
              {history.map((scan) => <div key={scan.id}><div className="mb-1 flex items-center justify-between text-[12px] text-text-secondary"><span>{new Date(scan.completedAt || scan.createdAt).toLocaleString()}</span><span>{scan.healthScore ?? 'Not available'}</span></div><div className="h-2 rounded-full bg-surface-hover"><div className="h-2 rounded-full bg-success" style={{ width: `${Math.min(100, Math.max(0, scan.healthScore || 0))}%` }} /></div></div>)}
            </CardBody>
          </Card>
          <Card>
            <CardHeader title="Latest severity distribution" description="Persisted findings from the latest completed scan" />
            <CardBody className="space-y-3">
              {[['Critical', 'critical', 'danger'], ['High', 'high', 'warning'], ['Medium', 'medium', 'neutral'], ['Low', 'low', 'info']].map(([label, key, tone]) => <div key={label} className="flex items-center justify-between rounded-md border border-border bg-background px-3 py-2.5"><span className="text-[13px] text-text-primary">{label}</span><Badge variant={tone === 'danger' ? 'danger' : tone === 'warning' ? 'warning' : 'neutral'}>{latest?.findings[key] || 0}</Badge></div>)}
            </CardBody>
          </Card>
        </div>
      </>}
    </div>
  );
}
