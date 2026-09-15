import { Card, CardBody, CardHeader } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { PageHeader } from './PageHeader';

const history = [
  { id: 'scan-6', title: 'Production scan', health: 81, status: 'completed', date: '2 hours ago' },
  { id: 'scan-5', title: 'Release candidate', health: 76, status: 'completed', date: '1 day ago' },
  { id: 'scan-4', title: 'Dependency review', health: 72, status: 'completed', date: '3 days ago' },
];

export function ScanHistoryPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Scan history"
        title="History"
        description="Track repository health over time and compare the most recent scans."
      />

      <div className="space-y-4">
        {history.map((scan) => (
          <Card key={scan.id}>
            <CardBody className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-[14px] font-medium text-text-primary">{scan.title}</p>
                <p className="text-[12px] text-text-secondary">{scan.date}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[14px] font-semibold text-text-primary">{scan.health}</span>
                <Badge variant={scan.health >= 80 ? 'success' : 'warning'}>{scan.status}</Badge>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}
