import { AlertTriangle, ArrowUpRight, ChevronRight, ShieldCheck, Sparkles, TrendingUp, Clock3 } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { HealthGauge } from '../charts/HealthGauge';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Card, CardBody, CardHeader } from '../components/ui/Card';
import { api } from '../services/api';
import { PageHeader } from './PageHeader';

export function DashboardPage() {
  const [projects, setProjects] = useState([]);
  const [scans, setScans] = useState([]);
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        const me = await api.getMe();
        if (!active || !me) return;

        const projectList = await api.listProjects();
        const projectData = projectList || [];
        setProjects(projectData);

        const projectScanResults = await Promise.all(projectData.map(async (project) => {
          const projectScans = await api.listScans(project._id).catch(() => []);
          return (projectScans || []).map((scan) => ({ ...scan, projectId: project._id, projectName: project.name, owner: project.owner }));
        }));

        const mergedScans = projectScanResults.flat();
        mergedScans.sort((a, b) => new Date(b.createdAt || b.completedAt || 0) - new Date(a.createdAt || a.completedAt || 0));
        setScans(mergedScans);

        const projectIssueResults = await Promise.all(projectData.map(async (project) => {
          const projectIssues = await api.listIssues(project._id).catch(() => []);
          return (projectIssues || []).map((issue) => ({ ...issue, projectName: project.name }));
        }));
        const mergedIssues = projectIssueResults.flat();
        mergedIssues.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
        setIssues(mergedIssues);
      } catch (err) {
        if (active) setError(err.message);
      } finally {
        if (active) setLoading(false);
      }
    }

    load();
    return () => { active = false; };
  }, []);

  const latestProject = useMemo(() => {
    if (!projects.length) return null;
    const project = projects[0];
    localStorage.setItem('codepulse_active_project', project._id);
    return project;
  }, [projects]);

  const latestScan = useMemo(() => {
    if (!scans.length) return null;
    const selected = scans.find((scan) => scan.projectId === latestProject?._id) || scans[0];
    return selected || null;
  }, [latestProject, scans]);

  const summary = useMemo(() => {
    const counts = { critical: 0, high: 0, medium: 0, low: 0, resolved: 0, total: 0 };
    issues.forEach((issue) => {
      counts.total += 1;
      if (issue.severity && counts[issue.severity] !== undefined) counts[issue.severity] += 1;
      if (issue.status === 'resolved') counts.resolved += 1;
    });
    return counts;
  }, [issues]);

  const trend = useMemo(() => {
    if (!scans.length) return [];
    return [...scans].slice(0, 6).reverse().map((scan) => ({
      name: new Date(scan.createdAt || scan.completedAt || Date.now()).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
      score: Number(scan.healthScore ?? 0),
    }));
  }, [scans]);

  const overview = latestScan?.scores ? [
    { label: 'Code quality', value: `${latestScan.scores.codeQuality ?? 0}%`, tone: 'success' },
    { label: 'Security', value: `${latestScan.scores.security ?? 0}%`, tone: 'warning' },
    { label: 'Performance', value: `${latestScan.scores.performance ?? 0}%`, tone: 'info' },
    { label: 'Maintainability', value: `${latestScan.scores.maintainability ?? 0}%`, tone: 'success' },
    { label: 'Dependencies', value: `${latestScan.scores.dependencies ?? 0}%`, tone: 'danger' },
  ] : [];

  if (loading) {
    return <div className="rounded-md border border-border bg-surface p-4 text-[13px] text-text-secondary">Loading your dashboard…</div>;
  }

  if (!latestProject) {
    return (
      <div>
        <PageHeader eyebrow="Overview" title="Developer dashboard" description="Connect GitHub and select a repository to see real scan data." />
        <Card className="p-6">
          <p className="text-[14px] text-text-primary">No connected project is available yet.</p>
          <p className="mt-2 text-[12px] text-text-secondary">Open Projects, connect an accessible GitHub repository, and run your first scan.</p>
          <Button as={Link} to="/app/projects" variant="primary" size="sm" className="mt-4">Open Projects</Button>
        </Card>
      </div>
    );
  }

  const project = {
    id: latestProject._id,
    name: latestProject.name,
    healthScore: latestScan?.healthScore ?? latestProject.latestHealthScore ?? 0,
    status: latestScan?.status || (latestProject.latestScanId ? 'Scanned' : 'Not scanned'),
    language: latestProject.language || 'Unknown',
  };

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

      {error && <div className="mb-4 rounded-md border border-danger/40 bg-danger/10 px-3 py-2 text-[12px] text-danger">{error}</div>}

      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <Card className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[12px] text-text-secondary">Active project</p>
              <h2 className="mt-1 text-[18px] font-semibold text-text-primary">{project.name}</h2>
            </div>
            <Badge variant={project.healthScore >= 80 ? 'success' : project.healthScore >= 60 ? 'warning' : 'danger'}>{project.status}</Badge>
          </div>

          <div className="mt-5 flex items-center justify-center">
            <HealthGauge score={project.healthScore} size={180} />
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3">
            {overview.length ? overview.map(({ label, value, tone }) => (
              <div key={label} className="rounded-md border border-border bg-background p-3">
                <p className="text-[11.5px] text-text-secondary">{label}</p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-[15px] font-semibold text-text-primary">{value}</span>
                  <span className={['h-2.5 w-2.5 rounded-full', tone === 'success' ? 'bg-success' : tone === 'warning' ? 'bg-warning' : tone === 'info' ? 'bg-info' : 'bg-danger'].join(' ')} />
                </div>
              </div>
            )) : (
              <div className="col-span-2 rounded-md border border-dashed border-border bg-background p-4 text-[12px] text-text-secondary">No scan metrics are available yet. Run your first repository scan to populate the dashboard.</div>
            )}
          </div>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader title="Issue summary" description="Priority distribution across the latest scans" />
            <CardBody className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {[
                { label: 'Critical', value: summary.critical, accent: 'text-critical' },
                { label: 'High', value: summary.high, accent: 'text-high' },
                { label: 'Medium', value: summary.medium, accent: 'text-medium' },
                { label: 'Low', value: summary.low, accent: 'text-low' },
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
              {scans.length === 0 ? <div className="text-[12px] text-text-secondary">No scans yet. Run your first scan to generate a health score.</div> : scans.slice(0, 4).map((scan) => (
                <div key={scan._id} className="flex items-center justify-between rounded-md border border-border bg-background px-3 py-2.5">
                  <div>
                    <p className="text-[13px] font-medium text-text-primary">{scan.projectName || 'Repository scan'}</p>
                    <p className="text-[11.5px] text-text-secondary">{new Date(scan.createdAt || scan.completedAt || Date.now()).toLocaleString()}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[13px] font-medium text-text-primary">{scan.healthScore ?? '—'}</span>
                    <Badge variant={scan.healthScore >= 80 ? 'success' : 'warning'}>{scan.status}</Badge>
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
            {trend.length === 0 ? <div className="text-[12px] text-text-secondary">Not enough scan history yet.</div> : <div className="space-y-3">{trend.map(({ name, score }) => (
              <div key={`${name}-${score}`}>
                <div className="mb-1 flex items-center justify-between text-[12px] text-text-secondary">
                  <span>{name}</span>
                  <span>{score}</span>
                </div>
                <div className="h-2 rounded-full bg-surface-hover">
                  <div className="h-2 rounded-full bg-success" style={{ width: `${Math.min(100, Math.max(0, score))}%` }} />
                </div>
              </div>
            ))}</div>}
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Issue trend" description="Open issue velocity" />
          <CardBody>
            <div className="space-y-3">
              {['Critical', 'High', 'Medium', 'Low'].map((level, index) => {
                const value = summary[level.toLowerCase()] || 0;
                return (
                  <div key={level}>
                    <div className="mb-1 flex items-center justify-between text-[12px] text-text-secondary">
                      <span>{level}</span>
                      <span>{value}</span>
                    </div>
                    <div className="h-2 rounded-full bg-surface-hover">
                      <div className="h-2 rounded-full bg-warning" style={{ width: `${Math.min(100, (value / Math.max(summary.total || 1, 1)) * 100)}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardBody>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <CardHeader title="Critical issues" description="Items requiring action now" />
          <CardBody className="space-y-3">
            {issues.filter((issue) => issue.severity === 'critical').slice(0, 3).length === 0 ? <div className="text-[12px] text-text-secondary">No critical issues detected in the current data set.</div> : issues.filter((issue) => issue.severity === 'critical').slice(0, 3).map((issue) => (
              <div key={issue._id} className="rounded-md border border-border bg-background p-3">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-[13px] font-medium text-text-primary">{issue.title}</p>
                    <p className="mt-1 text-[11.5px] text-text-secondary">{issue.file || issue.projectName}</p>
                  </div>
                  <Badge variant="danger">{issue.severity}</Badge>
                </div>
              </div>
            ))}
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Recent activity" description="Events across the repo" />
          <CardBody className="space-y-3">
            {issues.slice(0, 3).map((issue) => (
              <div key={issue._id} className="flex items-center justify-between rounded-md border border-border bg-background px-3 py-2.5">
                <div className="flex items-center gap-2 text-[13px] text-text-primary">
                  <Sparkles size={14} className="text-accent" />
                  {issue.title}
                </div>
                <div className="flex items-center gap-1 text-[11.5px] text-text-secondary">
                  <Clock3 size={12} /> {new Date(issue.createdAt).toLocaleDateString()}
                </div>
              </div>
            ))}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
