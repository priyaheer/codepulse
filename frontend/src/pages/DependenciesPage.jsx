import { Card, CardBody, CardHeader } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { PageHeader } from './PageHeader';
import { dependencyRows } from '../services/demoData';

export function DependenciesPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Dependency health"
        title="Dependencies"
        description="Production and development packages, stale versions, and upgrade recommendations based on the latest audit data."
      />

      <div className="mb-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: 'Total dependencies', value: 84 },
          { label: 'Outdated packages', value: 11 },
          { label: 'Vulnerable packages', value: 5 },
          { label: 'Production', value: 52 },
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
              {dependencyRows.map((row) => (
                <tr key={row.name} className="align-top">
                  <td className="border-t border-border py-2.5 pr-4 text-text-primary">{row.name}</td>
                  <td className="border-t border-border py-2.5 pr-4 text-text-secondary">{row.current}</td>
                  <td className="border-t border-border py-2.5 pr-4 text-text-secondary">{row.latest}</td>
                  <td className="border-t border-border py-2.5 pr-4"><Badge variant={row.risk === 'Medium' ? 'warning' : 'neutral'}>{row.risk}</Badge></td>
                  <td className="border-t border-border py-2.5 pr-4 text-text-secondary">{row.type}</td>
                  <td className="border-t border-border py-2.5 text-text-secondary">{row.recommendation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
}
