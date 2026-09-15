import { Search, SlidersHorizontal } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Badge, SeverityBadge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Card, CardBody, CardHeader } from '../components/ui/Card';
import { demoIssues } from '../services/demoData';
import { api, hasApiSession } from '../services/api';
import { PageHeader } from './PageHeader';

export function IssuesPage() {
  const [issues, setIssues] = useState(demoIssues);
  const [error, setError] = useState('');

  useEffect(() => {
    const projectId = localStorage.getItem('codepulse_active_project');
    if (!hasApiSession() || !projectId) return;
    api.listIssues(projectId).then(setIssues).catch((err) => setError(err.message));
  }, []);

  const counts = issues.reduce((result, issue) => {
    result.total += 1;
    if (result[issue.severity] !== undefined) result[issue.severity] += 1;
    if (issue.status === 'resolved') result.resolved += 1;
    if (issue.status === 'ignored') result.ignored += 1;
    return result;
  }, { total: 0, critical: 0, high: 0, medium: 0, low: 0, resolved: 0, ignored: 0 });

  return (
    <div>
      <PageHeader
        eyebrow="Issue management"
        title="Issues"
        description="Prioritized findings grouped by severity, source, and scan category."
        actions={<Button variant="secondary" size="sm" icon={<SlidersHorizontal size={13} />}>Filters</Button>}
      />

      {error && <div className="mb-6 rounded-md border border-danger/40 bg-danger/10 px-3 py-2 text-[12px] text-danger">{error}</div>}

      <div className="mb-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-7">
        {[
          { label: 'Total', value: counts.total },
          { label: 'Critical', value: counts.critical },
          { label: 'High', value: counts.high },
          { label: 'Medium', value: counts.medium },
          { label: 'Low', value: counts.low },
          { label: 'Resolved', value: counts.resolved },
          { label: 'Ignored', value: counts.ignored },
        ].map(({ label, value }) => (
          <div key={label} className="rounded-md border border-border bg-surface p-3">
            <p className="text-[11.5px] text-text-secondary">{label}</p>
            <p className="mt-2 text-[18px] font-semibold text-text-primary">{value}</p>
          </div>
        ))}
      </div>

      <Card>
        <CardHeader title="Issue list" description="Severity | Issue | File | Line | Category | Source | Status" action={<div className="flex items-center gap-2 rounded-md border border-border bg-background px-2.5 py-1.5"><Search size={13} className="text-text-secondary" /><span className="text-[12px] text-text-secondary">Search</span></div>} />
        <CardBody className="overflow-x-auto">
          <table className="min-w-full border-separate border-spacing-y-2 text-left text-[12.5px]">
            <thead>
              <tr className="text-text-secondary">
                <th className="pb-2 pr-3 font-medium">Severity</th>
                <th className="pb-2 pr-3 font-medium">Issue</th>
                <th className="pb-2 pr-3 font-medium">File</th>
                <th className="pb-2 pr-3 font-medium">Line</th>
                <th className="pb-2 pr-3 font-medium">Category</th>
                <th className="pb-2 pr-3 font-medium">Source</th>
                <th className="pb-2 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {issues.map((issue) => (
                <tr key={issue.id} className="rounded-md bg-background align-top">
                  <td className="rounded-l-md border border-r-0 border-border px-3 py-2.5"><SeverityBadge severity={issue.severity} /></td>
                  <td className="border border-l-0 border-r-0 border-border px-3 py-2.5 text-text-primary"><a href={`/app/issues/${issue.id}`} className="font-medium hover:text-accent">{issue.title}</a></td>
                  <td className="border border-l-0 border-r-0 border-border px-3 py-2.5 text-text-secondary">{issue.file}</td>
                  <td className="border border-l-0 border-r-0 border-border px-3 py-2.5 text-text-secondary">{issue.line}</td>
                  <td className="border border-l-0 border-r-0 border-border px-3 py-2.5 text-text-secondary">{issue.category}</td>
                  <td className="border border-l-0 border-r-0 border-border px-3 py-2.5 text-text-secondary">{issue.source}</td>
                  <td className="rounded-r-md border border-l-0 border-border px-3 py-2.5"><Badge variant={issue.status === 'resolved' ? 'success' : issue.status === 'in_progress' ? 'warning' : 'neutral'}>{issue.status}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
}
