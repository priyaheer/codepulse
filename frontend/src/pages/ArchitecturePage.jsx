import { useProjectScan } from '../utils/useProjectScan';
import { Card, CardBody, CardHeader } from '../components/ui/Card';
import { PageHeader } from './PageHeader';

export function ArchitecturePage() {
  const { project, scan, loading, error } = useProjectScan();
  const summary = scan?.architectureSummary;
  return (
    <div>
      <PageHeader
        eyebrow="Architecture"
        title="System architecture"
        description="Repository-supported architectural relationships and service boundaries."
      />
      {error && <div className="mb-6 rounded-md border border-danger/40 bg-danger/10 px-3 py-2 text-[12px] text-danger">{error}</div>}
      {loading && <div className="rounded-md border border-border bg-surface p-4 text-[13px] text-text-secondary">Loading real architecture evidence...</div>}
      {!loading && !project && <div className="rounded-md border border-border bg-surface p-4 text-[13px] text-text-secondary">Connect a project to view architecture evidence.</div>}
      {!loading && project && !scan && <div className="rounded-md border border-dashed border-border bg-surface p-4 text-[13px] text-text-secondary">No completed scan is available for this project.</div>}

      {scan && <>
      <Card>
        <CardHeader title="Architecture evidence" description={`${project.owner}/${project.name} · latest completed scan`} />
        <CardBody className="space-y-4 text-[13px] text-text-secondary">
          {summary ? <>
            <p>Frontend: <strong className="text-text-primary">{summary.frontend || 'Not detected'}</strong></p>
            <p>Backend: <strong className="text-text-primary">{summary.backend || 'Not detected'}</strong></p>
            <p>Database: <strong className="text-text-primary">{summary.database || 'Not detected'}</strong></p>
            <p>Authentication files: {summary.authentication?.length ? summary.authentication.join(', ') : 'Not detected'}</p>
            <p>Routes: {summary.routes?.length ? summary.routes.join(', ') : 'Not detected'}</p>
            <p>API services: {summary.apiServices?.length ? summary.apiServices.join(', ') : 'Not detected'}</p>
          </> : <p>Architecture summary was not available for this scan.</p>}
        </CardBody>
      </Card>

      <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {['importantDirectories', 'majorComponents'].map((key) => <Card key={key} className="p-4 md:col-span-1 xl:col-span-1"><p className="text-[12px] text-text-secondary">{key === 'importantDirectories' ? 'Detected top-level directories' : 'Detected major components'}</p><p className="mt-2 text-[13px] leading-relaxed text-text-primary">{summary?.[key]?.length ? summary[key].join(', ') : 'Not available'}</p></Card>)}
      </div>
      </>}
    </div>
  );
}
