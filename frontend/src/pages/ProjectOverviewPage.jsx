import { Activity, ArrowUpRight, Github, Server, Languages, Clock3 } from 'lucide-react';
import { useParams, Link } from 'react-router-dom';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Card, CardBody, CardHeader } from '../components/ui/Card';
import { demoProjects } from '../services/demoData';

export function ProjectOverviewPage() {
  const { projectId } = useParams();
  const project = demoProjects.find((p) => p.id === projectId) || demoProjects[0];

  const stats = [
    { label: 'Health score', value: `${project.healthScore}`, icon: Activity },
    { label: 'Language', value: project.language, icon: Languages },
    { label: 'Stars', value: `${project.stars}`, icon: Github },
    { label: 'Visibility', value: project.visibility, icon: Server },
    { label: 'Last scan', value: project.lastScan, icon: Clock3 },
  ];

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[12px] text-text-secondary">Repository overview</p>
          <h1 className="text-[20px] font-semibold text-text-primary tracking-tight">{project.name}</h1>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="success">{project.status}</Badge>
          <Button as={Link} to={`/app/projects/${project.id}/scan`} variant="secondary" size="sm" iconRight={<ArrowUpRight size={13} />}>Scan now</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {stats.map(({ label, value, icon: Icon }) => (
          <Card key={label} className="p-4">
            <div className="flex items-center gap-2 text-text-secondary">
              <Icon size={14} />
              <span className="text-[12px]">{label}</span>
            </div>
            <p className="mt-3 text-[20px] font-semibold text-text-primary">{value}</p>
          </Card>
        ))}
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <Card>
          <CardHeader title="Issue summary" description="Open findings across categories" />
          <CardBody className="space-y-4">
            <div className="flex items-center justify-between rounded-md border border-border bg-background p-3">
              <span className="text-[13px] text-text-secondary">Critical</span>
              <span className="text-[15px] font-semibold text-critical">2</span>
            </div>
            <div className="flex items-center justify-between rounded-md border border-border bg-background p-3">
              <span className="text-[13px] text-text-secondary">High</span>
              <span className="text-[15px] font-semibold text-high">4</span>
            </div>
            <div className="flex items-center justify-between rounded-md border border-border bg-background p-3">
              <span className="text-[13px] text-text-secondary">Medium</span>
              <span className="text-[15px] font-semibold text-medium">6</span>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Analysis coverage" description="Most recent scan depth" />
          <CardBody className="space-y-4">
            {[
              ['Security', '87%', 'text-success'],
              ['Dependencies', '68%', 'text-warning'],
              ['Performance', '76%', 'text-accent'],
              ['Architecture', '82%', 'text-resolved'],
            ].map(([label, value, className]) => (
              <div key={label}>
                <div className="mb-1 flex items-center justify-between text-[12px] text-text-secondary">
                  <span>{label}</span>
                  <span className={className}>{value}</span>
                </div>
                <div className="h-2 rounded-full bg-surface-hover">
                  <div className="h-2 rounded-full bg-accent" style={{ width: value }} />
                </div>
              </div>
            ))}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
