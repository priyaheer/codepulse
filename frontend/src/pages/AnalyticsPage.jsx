import { Badge } from '../components/ui/Badge';
import { Card, CardBody, CardHeader } from '../components/ui/Card';
import { PageHeader } from './PageHeader';

const bars = [
  { label: 'Health', value: 81 },
  { label: 'Security', value: 87 },
  { label: 'Performance', value: 76 },
  { label: 'Maintainability', value: 79 },
  { label: 'Dependencies', value: 68 },
];

export function AnalyticsPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Analytics"
        title="Performance and trends"
        description="View repository health over time and severity progression for the latest scan cycle."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader title="Health over time" description="Average score by cycle" />
          <CardBody className="space-y-3">
            {bars.map(({ label, value }) => (
              <div key={label}>
                <div className="mb-1 flex items-center justify-between text-[12px] text-text-secondary">
                  <span>{label}</span>
                  <span>{value}</span>
                </div>
                <div className="h-2 rounded-full bg-surface-hover">
                  <div className="h-2 rounded-full bg-success" style={{ width: `${value}%` }} />
                </div>
              </div>
            ))}
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Severity distribution" description="Open issues by severity" />
          <CardBody className="space-y-3">
            {[
              { label: 'Critical', value: 2, tone: 'danger' },
              { label: 'High', value: 4, tone: 'warning' },
              { label: 'Medium', value: 6, tone: 'neutral' },
              { label: 'Low', value: 2, tone: 'info' },
            ].map(({ label, value, tone }) => (
              <div key={label} className="flex items-center justify-between rounded-md border border-border bg-background px-3 py-2.5">
                <span className="text-[13px] text-text-primary">{label}</span>
                <Badge variant={tone === 'danger' ? 'danger' : tone === 'warning' ? 'warning' : tone === 'info' ? 'neutral' : 'neutral'}>{value}</Badge>
              </div>
            ))}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
