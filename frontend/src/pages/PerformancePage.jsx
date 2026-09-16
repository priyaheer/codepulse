import { Card, CardBody, CardHeader } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { PageHeader } from './PageHeader';
import { useProjectScan } from '../utils/useProjectScan';

export function PerformancePage() {
  const { project, scan, issues, loading, error } = useProjectScan();
  const findings = issues.filter((issue) => issue.category === 'performance');
  return (
    <div>
      <PageHeader
        eyebrow="Performance"
        title="Performance overview"
        description="Signals gathered from bundle size, dependency usage, React render behavior, and network patterns."
      />
      {error && <div className="mb-6 rounded-md border border-danger/40 bg-danger/10 px-3 py-2 text-[12px] text-danger">{error}</div>}
      {loading && <div className="rounded-md border border-border bg-surface p-4 text-[13px] text-text-secondary">Loading real performance findings...</div>}
      {!loading && !project && <div className="rounded-md border border-border bg-surface p-4 text-[13px] text-text-secondary">Connect a project to view performance analysis.</div>}
      {!loading && project && !scan && <div className="rounded-md border border-dashed border-border bg-surface p-4 text-[13px] text-text-secondary">No completed scan is available for this project.</div>}

      {scan && <><div className="mb-6 rounded-md border border-border bg-surface p-4 text-[13px] text-text-secondary">Runtime performance metrics are unavailable for this repository scan. Static performance analysis below contains only detected findings.</div><div className="grid gap-6 xl:grid-cols-2">
        {findings.map((finding) => (
          <Card key={finding._id}>
            <CardHeader title={finding.title} description={`${finding.file || 'Repository'}:${finding.line || '—'} · ${finding.source}`} />
            <CardBody className="flex items-center justify-between">
              <div>
                <p className="text-[13px] text-text-primary">{finding.description}</p>
              </div>
              <Badge variant={finding.severity === 'high' ? 'danger' : finding.severity === 'medium' ? 'warning' : 'neutral'}>{finding.severity}</Badge>
            </CardBody>
          </Card>
        ))}
        {findings.length === 0 && <div className="rounded-md border border-dashed border-border bg-surface p-4 text-[13px] text-text-secondary">No detected performance issues from the checks currently supported.</div>}
      </div></>}

      {scan && <Card className="mt-6"><CardHeader title="Scan evidence" description="Latest persisted performance score" /><CardBody className="text-[13px] text-text-secondary">Performance score: {scan.scores?.performance ?? 'Not available'}</CardBody></Card>}
    </div>
  );
}
