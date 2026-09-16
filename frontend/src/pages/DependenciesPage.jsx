import { Card, CardBody, CardHeader } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { PageHeader } from './PageHeader';
import { useProjectScan } from '../utils/useProjectScan';

export function DependenciesPage() {
  const { project, scan, issues, loading, error } = useProjectScan();
  const findings = issues.filter((issue) => issue.category === 'dependency');
  return (
    <div>
      <PageHeader
        eyebrow="Dependency health"
        title="Dependencies"
        description="Production and development packages, stale versions, and upgrade recommendations based on the latest audit data."
      />
      {error && <div className="mb-6 rounded-md border border-danger/40 bg-danger/10 px-3 py-2 text-[12px] text-danger">{error}</div>}
      {loading && <div className="rounded-md border border-border bg-surface p-4 text-[13px] text-text-secondary">Loading real dependency findings...</div>}
      {!loading && !project && <div className="rounded-md border border-border bg-surface p-4 text-[13px] text-text-secondary">Connect a project to view dependency analysis.</div>}
      {!loading && project && !scan && <div className="rounded-md border border-dashed border-border bg-surface p-4 text-[13px] text-text-secondary">No completed scan is available for this project.</div>}

      {scan && <><div className="mb-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: 'Detected dependency findings', value: findings.length },
          { label: 'Dependency score', value: scan.scores?.dependencies ?? 'Not available' },
          { label: 'Vulnerability data', value: 'Not available' },
          { label: 'Audit source', value: 'Not available' },
        ].map(({ label, value }) => (
          <div key={label} className="rounded-md border border-border bg-surface p-3">
            <p className="text-[11.5px] text-text-secondary">{label}</p>
            <p className="mt-2 text-[20px] font-semibold text-text-primary">{value}</p>
          </div>
        ))}
      </div>

      <Card>
        <CardHeader title="Package review" description="Package | Current | Latest | Risk | Type | Recommendation" />
        <CardBody className="overflow-x-auto">
          <table className="min-w-full text-left text-[12.5px]">
            <thead className="text-text-secondary">
              <tr>
                <th className="pb-2 pr-4 font-medium">Package</th>
                <th className="pb-2 pr-4 font-medium">Current</th>
                <th className="pb-2 pr-4 font-medium">Latest</th>
                <th className="pb-2 pr-4 font-medium">Risk</th>
                <th className="pb-2 pr-4 font-medium">Type</th>
                <th className="pb-2 font-medium">Recommendation</th>
              </tr>
            </thead>
            <tbody>
              {findings.map((finding) => (
                <tr key={finding._id} className="align-top">
                  <td className="border-t border-border py-2.5 pr-4 text-text-primary">{finding.title}</td>
                  <td className="border-t border-border py-2.5 pr-4 text-text-secondary">{finding.evidence || 'Not available'}</td>
                  <td className="border-t border-border py-2.5 pr-4 text-text-secondary">Not checked</td>
                  <td className="border-t border-border py-2.5 pr-4"><Badge variant={finding.severity === 'high' ? 'danger' : 'warning'}>{finding.severity}</Badge></td>
                  <td className="border-t border-border py-2.5 pr-4 text-text-secondary">{finding.file}:{finding.line || '—'}</td>
                  <td className="border-t border-border py-2.5 text-text-secondary">{finding.description}</td>
                </tr>
              ))}
              {findings.length === 0 && <tr><td colSpan="6" className="py-6 text-center text-text-secondary">No dependency findings detected by the checks currently supported.</td></tr>}
            </tbody>
          </table>
        </CardBody>
      </Card></>}
    </div>
  );
}
