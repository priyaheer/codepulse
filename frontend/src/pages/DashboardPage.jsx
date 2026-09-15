import { AlertTriangle, ArrowUpRight, ChevronRight, ShieldCheck, Sparkles, TrendingUp, Clock3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { HealthGauge } from '../charts/HealthGauge';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Card, CardBody, CardHeader } from '../components/ui/Card';
import { PageHeader } from './PageHeader';
import { demoIssues, demoProjects, healthTrend, issueTrend, recentScans, scanSummary } from '../services/demoData';

const overview = [
  { label: 'Code quality', value: '84%', tone: 'success' },
  { label: 'Security', value: '87%', tone: 'warning' },
  { label: 'Performance', value: '76%', tone: 'info' },
  { label: 'Maintainability', value: '79%', tone: 'success' },
  { label: 'Dependencies', value: '68%', tone: 'danger' },
];

export function DashboardPage() {
  const project = demoProjects[0];

  return (
    <div>
      <PageHeader
        eyebrow="Overview"
        title="Developer dashboard"
        description="Repository health, recent findings, and high-priority actions for the active project."
        actions={
          <Button as={Link} to={`/app/projects/${project.id}`} variant="secondary" size="sm" iconRight={<ChevronRight size={14} />}>
            Open project
          </Button>
        }
      />

      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <Card className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[12px] text-text-secondary">Active project</p>
              <h2 className="mt-1 text-[18px] font-semibold text-text-primary">{project.name}</h2>
            </div>
            <Badge variant="success">{project.status}</Badge>
          </div>

          <div className="mt-5 flex items-center justify-center">
            <HealthGauge score={project.healthScore} size={180} />
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3">
            {overview.map(({ label, value, tone }) => (
              <div key={label} className="rounded-md border border-border bg-background p-3">
                <p className="text-[11.5px] text-text-secondary">{label}</p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-[15px] font-semibold text-text-primary">{value}</span>
                  <span className={['h-2.5 w-2.5 rounded-full', tone === 'success' ? 'bg-success' : tone === 'warning' ? 'bg-warning' : tone === 'info' ? 'bg-info' : 'bg-danger'].join(' ')} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader title="Issue summary" description="Priority distribution across the latest scan" />
            <CardBody className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {[
                { label: 'Critical', value: scanSummary.critical, accent: 'text-critical' },
                { label: 'High', value: scanSummary.high, accent: 'text-high' },
                { label: 'Medium', value: scanSummary.medium, accent: 'text-medium' },
                { label: 'Low', value: scanSummary.low, accent: 'text-low' },
              ].map(({ label, value, accent }) => (
                <div key={label} className="rounded-md border border-border bg-background p-3">
                  <p className="text-[11.5px] text-text-secondary">{label}</p>
                  <p className={`mt-2 text-[20px] font-semibold ${accent}`}>{value}</p>
                </div>
              ))}
            </CardBody>
          </Card>

          <Card>
            <CardHeader title="Recent scans" description="Latest repository health checks" action={<Button as={Link} to="/app/history" variant="ghost" size="sm">View all</Button>} />
            <CardBody className="space-y-3">
              {recentScans.map((scan) => (
                <div key={scan.id} className="flex items-center justify-between rounded-md border border-border bg-background px-3 py-2.5">
                  <div>
                    <p className="text-[13px] font-medium text-text-primary">{scan.name}</p>
                    <p className="text-[11.5px] text-text-secondary">{scan.time}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[13px] font-medium text-text-primary">{scan.health}</span>
                    <Badge variant={scan.health >= 80 ? 'success' : 'warning'}>{scan.status}</Badge>
                  </div>
                </div>
              ))}
            </CardBody>
          </Card>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader title="Health trend" description="Rolling health score" />
          <CardBody>
            <div className="space-y-3">
              {healthTrend.map(({ name, score }) => (
                <div key={name}>
                  <div className="mb-1 flex items-center justify-between text-[12px] text-text-secondary">
                    <span>{name}</span>
                    <span>{score}</span>
                  </div>
                  <div className="h-2 rounded-full bg-surface-hover">
                    <div className="h-2 rounded-full bg-success" style={{ width: `${score}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Issue trend" description="Open issue velocity" />
          <CardBody>
            <div className="space-y-3">
              {issueTrend.map(({ name, issues }) => (
                <div key={name}>
                  <div className="mb-1 flex items-center justify-between text-[12px] text-text-secondary">
                    <span>{name}</span>
                    <span>{issues}</span>
                  </div>
                  <div className="h-2 rounded-full bg-surface-hover">
                    <div className="h-2 rounded-full bg-warning" style={{ width: `${(issues / 34) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <CardHeader title="Critical issues" description="Items requiring action now" />
          <CardBody className="space-y-3">
            {demoIssues.slice(0, 3).map((issue) => (
              <div key={issue.id} className="rounded-md border border-border bg-background p-3">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-[13px] font-medium text-text-primary">{issue.title}</p>
                    <p className="mt-1 text-[11.5px] text-text-secondary">{issue.file}</p>
                  </div>
                  <Badge variant={issue.severity === 'critical' ? 'danger' : 'warning'}>{issue.severity}</Badge>
                </div>
              </div>
            ))}
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Recent activity" description="Events across the repo" />
          <CardBody className="space-y-3">
            {[
              { label: 'AI fix suggestion generated', type: 'Sparkles', time: '12m ago' },
              { label: 'Security recommendation enabled', type: 'ShieldCheck', time: '1h ago' },
              { label: 'Performance budget tightened', type: 'TrendingUp', time: '3h ago' },
            ].map(({ label, type: Type, time }) => (
              <div key={label} className="flex items-center justify-between rounded-md border border-border bg-background px-3 py-2.5">
                <div className="flex items-center gap-2 text-[13px] text-text-primary">
                  <Type size={14} className="text-accent" />
                  {label}
                </div>
                <div className="flex items-center gap-1 text-[11.5px] text-text-secondary">
                  <Clock3 size={12} /> {time}
                </div>
              </div>
            ))}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
