import { ArrowUpRight, ExternalLink, Plus, Trash2 } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { PageHeader } from './PageHeader';
import { ProjectCard } from '../components/ProjectCard';
import { demoProjects } from '../services/demoData';

export function ProjectsPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Repositories"
        title="Projects"
        description="All connected repositories and their current health posture across code quality, security, and performance."
        actions={
          <Button variant="primary" size="sm" icon={<Plus size={14} />}>Add project</Button>
        }
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {demoProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      <Card className="mt-6 p-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-[12px] text-text-secondary">Repository URL</p>
            <h3 className="mt-1 text-[15px] font-semibold text-text-primary">github.com/acme/dashboard-app</h3>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm" icon={<ExternalLink size={13} />}>View repo</Button>
            <Button variant="ghost" size="sm" icon={<Trash2 size={13} />}>Delete</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
