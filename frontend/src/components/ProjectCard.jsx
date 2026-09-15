import { ArrowUpRight, Activity, CircleDot, ShieldAlert, Clock3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card } from './ui/Card';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';

export function ProjectCard({ project }) {
  return (
    <Card className="p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[12px] text-text-secondary">{project.owner}</p>
          <h3 className="mt-1 text-[15px] font-semibold text-text-primary">{project.name}</h3>
        </div>
        <Badge variant={project.healthScore >= 80 ? 'success' : project.healthScore >= 60 ? 'warning' : 'danger'}>
          {project.healthScore} health
        </Badge>
      </div>

      <p className="mt-3 text-[12.5px] text-text-secondary">{project.description}</p>

      <div className="mt-4 grid grid-cols-2 gap-2 text-[12px] text-text-secondary">
        <div className="rounded-md border border-border bg-background px-2.5 py-2">
          <div className="flex items-center gap-1.5"><Activity size={12} /> Issues</div>
          <div className="mt-1 text-[14px] font-medium text-text-primary">{project.issueCount}</div>
        </div>
        <div className="rounded-md border border-border bg-background px-2.5 py-2">
          <div className="flex items-center gap-1.5"><CircleDot size={12} /> Status</div>
          <div className="mt-1 text-[14px] font-medium text-text-primary">{project.status}</div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between text-[12.5px] text-text-secondary">
        <span className="flex items-center gap-1.5"><Clock3 size={12} /> {project.lastScan}</span>
        <span className="text-success">{project.trend}</span>
      </div>

      <div className="mt-4 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 text-[12px] text-text-secondary">
          <ShieldAlert size={12} /> {project.securityScore}% security
        </div>
        <Button as={Link} to={`/app/projects/${project.id}`} variant="secondary" size="sm" iconRight={<ArrowUpRight size={14} />}>
          Open
        </Button>
      </div>
    </Card>
  );
}
