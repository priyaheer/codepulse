import { Activity, AlertTriangle, Gauge, Database, ArrowRight } from 'lucide-react';
import { Card, CardBody, CardHeader } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { PageHeader } from './PageHeader';

const findings = [
  { label: 'Large assets', value: '3', severity: 'high' },
  { label: 'Unused dependencies', value: '6', severity: 'medium' },
  { label: 'Excessive API calls', value: '2', severity: 'medium' },
  { label: 'Render anti-patterns', value: '1', severity: 'low' },
];

export function PerformancePage() {
  return (
    <div>
      <PageHeader
        eyebrow="Performance"
        title="Performance overview"
        description="Signals gathered from bundle size, dependency usage, React render behavior, and network patterns."
      />

      <div className="grid gap-6 xl:grid-cols-2">
        {findings.map((finding) => (
          <Card key={finding.label}>
            <CardHeader title={finding.label} description="Repository evidence" />
            <CardBody className="flex items-center justify-between">
              <div>
                <p className="text-[28px] font-semibold text-text-primary">{finding.value}</p>
              </div>
              <Badge variant={finding.severity === 'high' ? 'danger' : finding.severity === 'medium' ? 'warning' : 'neutral'}>{finding.severity}</Badge>
            </CardBody>
          </Card>
        ))}
      </div>

      <Card className="mt-6">
        <CardHeader title="Observed optimization notes" description="What the analyzer can defend based on repository evidence" />
        <CardBody className="space-y-3 text-[13px] text-text-secondary">
          <p>Bundle analysis suggests the dashboard route includes a large chart library that is not lazily loaded.</p>
          <p>Several API requests are triggered in a render path without memoization or request deduplication.</p>
          <p>Large image assets exceed the typical size threshold for mobile-first performance budgets.</p>
        </CardBody>
      </Card>
    </div>
  );
}
