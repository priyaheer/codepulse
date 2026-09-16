import { CheckCircle2, Clock3, LoaderCircle, RefreshCcw } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card, CardBody, CardHeader } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { PageHeader } from './PageHeader';
import { api } from '../services/api';

export function ScanPage() {
  const { projectId } = useParams();
  const [scan, setScan] = useState(null);
  const [error, setError] = useState('');
  const [starting, setStarting] = useState(false);

  useEffect(() => {
    if (!projectId || projectId.length < 20) return;
    api.getMe().then(() => api.listScans(projectId)).then((scans) => setScan(scans[0] || null)).catch((err) => setError(err.message));
  }, [projectId]);

  async function handleScan() {
    setStarting(true);
    setError('');
    try {
      const result = await api.startScan(projectId);
      setScan(result.scan);
    } catch (err) {
      setError(err.message);
    } finally {
      setStarting(false);
    }
  }

  const progress = scan?.progress ? Object.entries(scan.progress).filter(([name]) => name !== 'repository').map(([name, status]) => ({ name, status, progress: status === 'done' ? 100 : null })) : [];
  const scanGroups = progress.length ? progress : [
    { name: 'codeQuality', progress: null, status: 'pending' },
    { name: 'security', progress: null, status: 'pending' },
    { name: 'dependencies', progress: null, status: 'pending' },
    { name: 'performance', progress: null, status: 'pending' },
    { name: 'architecture', progress: null, status: 'pending' },
  ];

  return (
    <div>
      <PageHeader
        eyebrow="Repository scan"
        title="Scan status"
        description="Live repository check with static analysis, dependency review, and security findings."
        actions={<Button variant="secondary" size="sm" icon={starting ? <LoaderCircle size={13} className="animate-spin" /> : <RefreshCcw size={13} />} onClick={handleScan} disabled={starting}>{starting ? 'Scanning...' : 'Rescan'}</Button>}
      />

      {error && <div className="mb-6 rounded-md border border-danger/40 bg-danger/10 px-3 py-2 text-[12px] text-danger">{error}</div>}

      <div className="relative min-h-[420px]">
        {starting && (
          <div className="absolute inset-0 z-10 flex items-center justify-center rounded-md bg-background/80 backdrop-blur-[2px]" role="status" aria-live="polite">
            <div className="flex flex-col items-center gap-3 rounded-lg border border-border bg-surface px-8 py-7 text-center shadow-[var(--cp-shadow-strong)]">
              <LoaderCircle size={42} strokeWidth={1.7} className="animate-spin text-accent" />
              <div>
                <p className="text-[15px] font-semibold text-text-primary">Scanning repository</p>
                <p className="mt-1 text-[12px] text-text-secondary">Analyzing the latest GitHub source...</p>
              </div>
            </div>
          </div>
        )}

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <CardHeader title="Scanner pipeline" description="Current check execution" />
          <CardBody className="space-y-4">
            {scanGroups.map(({ name, progress: percentage, status }) => (
              <div key={name}>
                <div className="mb-1 flex items-center justify-between text-[12px] text-text-secondary">
                  <span>{name.replace(/([A-Z])/g, ' $1')}</span>
                  <span>{percentage === null ? status : `${percentage}%`}</span>
                </div>
                {percentage !== null && <div className="h-2 rounded-full bg-surface-hover"><div className="h-2 rounded-full bg-accent" style={{ width: `${percentage}%` }} /></div>}
                <div className="mt-2 flex items-center justify-between text-[11.5px]">
                  <span className="text-text-secondary">{status}</span>
                  {status === 'done' ? <CheckCircle2 size={14} className="text-success" /> : <Clock3 size={14} className="text-warning" />}
                </div>
              </div>
            ))}
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Scan summary" description="Current results" />
          <CardBody className="space-y-3">
            <div className="rounded-md border border-border bg-background p-3">
              <p className="text-[12px] text-text-secondary">Health score</p>
              <p className="mt-2 text-[28px] font-semibold text-text-primary">{scan?.healthScore ?? '—'}</p>
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              <div className="rounded-md border border-border bg-background p-3">
                <p className="text-[12px] text-text-secondary">Issues</p>
                <p className="mt-2 text-[18px] font-semibold text-text-primary">{scan?.issueCounts?.total ?? '—'}</p>
              </div>
              <div className="rounded-md border border-border bg-background p-3">
                <p className="text-[12px] text-text-secondary">Resolved</p>
                <p className="mt-2 text-[18px] font-semibold text-success">{scan?.issueCounts?.resolved ?? 'Not available'}</p>
              </div>
            </div>
            <div className="rounded-md border border-border bg-background p-3">
              <div className="flex items-center justify-between">
                <span className="text-[12px] text-text-secondary">Critical findings</span>
                <Badge variant="danger">{scan?.issueCounts?.critical ?? '—'}</Badge>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
      </div>
    </div>
  );
}
