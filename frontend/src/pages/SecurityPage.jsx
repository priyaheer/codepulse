import { KeyRound } from 'lucide-react';
import { SeverityBadge } from '../components/ui/Badge';
import { Card, CardBody, CardHeader } from '../components/ui/Card';
import { PageHeader } from './PageHeader';
import { useProjectScan } from '../utils/useProjectScan';

export function SecurityPage() {
  const { project, scan, issues, loading, error } = useProjectScan();
  const findings = issues.filter((issue) => issue.category === 'security');
  return (
    <div>
      <PageHeader
        eyebrow="Security center"
        title="Security overview"
        description="Repository security posture with masked secrets, detection history, and mitigation guidance."
      />
      {error && <div className="mb-6 rounded-md border border-danger/40 bg-danger/10 px-3 py-2 text-[12px] text-danger">{error}</div>}
      {loading && <div className="rounded-md border border-border bg-surface p-4 text-[13px] text-text-secondary">Loading real security findings...</div>}
      {!loading && !project && <div className="rounded-md border border-border bg-surface p-4 text-[13px] text-text-secondary">Connect a project to view security analysis.</div>}
      {!loading && project && !scan && <div className="rounded-md border border-dashed border-border bg-surface p-4 text-[13px] text-text-secondary">No completed scan is available for this project.</div>}

      {scan && <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <Card>
          <CardHeader title="Security score" description="Latest scan summary" />
          <CardBody className="space-y-4">
            <div className="text-[36px] font-semibold text-text-primary">{scan.scores?.security ?? 'Not available'}</div>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-md border border-border bg-background p-3"><p className="text-[12px] text-text-secondary">Detected findings</p><p className="mt-2 text-[20px] font-semibold text-text-primary">{findings.length}</p></div>
              <div className="rounded-md border border-border bg-background p-3"><p className="text-[12px] text-text-secondary">Audit data</p><p className="mt-2 text-[20px] font-semibold text-text-primary">Not available</p></div>
            </div>
            <div className="rounded-md border border-border bg-background p-3 text-[12px] text-text-secondary">
              <p className="flex items-center gap-2"><KeyRound size={14} className="text-warning" /> Evidence is masked by the scanner before display.</p>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Security findings" description="Severe issues needing action" />
          <CardBody className="space-y-3">
            {findings.map((finding) => (
              <div key={finding.title} className="rounded-md border border-border bg-background p-3">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-[13px] font-medium text-text-primary">{finding.title}</p>
                    <p className="mt-1 text-[11.5px] text-text-secondary">{finding.file}</p>
                  </div>
                  <SeverityBadge severity={finding.severity} />
                </div>
              </div>
            ))}
            {findings.length === 0 && <p className="text-[13px] text-text-secondary">No detected security issues from the checks currently supported.</p>}
          </CardBody>
        </Card>
      </div>}
    </div>
  );
}
