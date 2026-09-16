import { Card, CardBody, CardHeader } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { PageHeader } from './PageHeader';

export function ScanHistoryPage() {
  const [analytics, setAnalytics] = useState(null);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [comparison, setComparison] = useState(null);
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
        if (active) {
          setAnalytics(result);
          if (result.history.length >= 2) {
            setFrom(result.history[0].id);
            setTo(result.history[result.history.length - 1].id);
          }
        }
      } catch (err) {
        if (active) setError(err.message);
      }
    }
    load();
    return () => { active = false; };
  }, []);

  async function compare() {
    if (!analytics || !from || !to || from === to) return;
    try {
      setComparison(await api.compareScans(analytics.project.id, from, to));
      setError('');
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div>
      <PageHeader
        eyebrow="Scan history"
        title="History"
        description="Track repository health over time and compare the most recent scans."
      />
      {error && <div className="mb-6 rounded-md border border-danger/40 bg-danger/10 px-3 py-2 text-[12px] text-danger">{error}</div>}
      {!analytics && !error && <div className="rounded-md border border-border bg-surface px-4 py-5 text-[13px] text-text-secondary">Loading real scan history...</div>}

      <div className="space-y-4">
        {analytics?.history.map((scan) => (
          <Card key={scan.id}>
            <CardHeader title={`${analytics.project.repository} · ${scan.branch || 'unknown branch'}`} description={scan.commitSha ? `Commit ${scan.commitSha}` : 'Commit unavailable'} />
            <CardBody className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-[14px] font-medium text-text-primary">{new Date(scan.completedAt || scan.createdAt).toLocaleString()}</p>
                <p className="text-[12px] text-text-secondary">{scan.durationMs ? `${Math.round(scan.durationMs / 1000)}s` : 'Duration unavailable'} · {scan.findings.total} issues · {scan.findings.critical} critical · {scan.findings.high} high</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[14px] font-semibold text-text-primary">{scan.healthScore ?? 'Not available'}</span>
                <Badge variant={scan.healthScore >= 80 ? 'success' : 'warning'}>{scan.status}</Badge>
              </div>
            </CardBody>
          </Card>
        ))}
        {analytics?.history.length === 0 && <div className="rounded-md border border-border bg-surface px-4 py-5 text-[13px] text-text-secondary">Run your first scan to build real scan history.</div>}
      </div>
      {analytics?.history.length >= 2 && <Card className="mt-6">
        <CardHeader title="Before / after comparison" description="Compare two real completed scans" />
        <CardBody className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
            <select value={from} onChange={(event) => setFrom(event.target.value)} className="h-9 rounded-md border border-border bg-background px-3 text-[13px] text-text-primary">{analytics.history.map((scan) => <option key={scan.id} value={scan.id}>{new Date(scan.createdAt).toLocaleString()} · {scan.healthScore}</option>)}</select>
            <select value={to} onChange={(event) => setTo(event.target.value)} className="h-9 rounded-md border border-border bg-background px-3 text-[13px] text-text-primary">{analytics.history.map((scan) => <option key={scan.id} value={scan.id}>{new Date(scan.createdAt).toLocaleString()} · {scan.healthScore}</option>)}</select>
            <Button variant="primary" size="sm" onClick={compare} disabled={from === to}>Compare</Button>
          </div>
          {comparison && <>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">{[['Health', comparison.health], ['Issues', comparison.metrics.total], ['Critical', comparison.metrics.critical], ['High', comparison.metrics.high], ['Medium', comparison.metrics.medium]].map(([label, item]) => <div key={label} className="rounded-md border border-border bg-background p-3"><p className="text-[11.5px] text-text-secondary">{label}</p><p className="mt-2 text-[16px] font-semibold text-text-primary">{item.from} → {item.to}</p><p className="text-[11.5px] text-text-secondary">Change: {item.change >= 0 ? '+' : ''}{item.change}</p></div>)}</div>
            <div className="grid gap-3 sm:grid-cols-3"><div className="rounded-md border border-border bg-background p-3 text-[13px] text-text-primary">Resolved: {comparison.issues.resolved.length}</div><div className="rounded-md border border-border bg-background p-3 text-[13px] text-text-primary">New: {comparison.issues.new.length}</div><div className="rounded-md border border-border bg-background p-3 text-[13px] text-text-primary">Persistent: {comparison.issues.persistent.length}</div></div>
          </>}
        </CardBody>
      </Card>}
    </div>
  );
}
