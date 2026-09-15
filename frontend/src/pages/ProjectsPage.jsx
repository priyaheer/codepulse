import { ArrowUpRight, ExternalLink, Plus, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { PageHeader } from './PageHeader';
import { ProjectCard } from '../components/ProjectCard';
import { demoProjects } from '../services/demoData';
import { api } from '../services/api';

export function ProjectsPage() {
  const [projects, setProjects] = useState(demoProjects);
  const [repos, setRepos] = useState([]);
  const [showRepos, setShowRepos] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    api.getMe().then(() => api.listProjects()).then((items) => {
      const liveProjects = items.map((project) => ({ ...project, id: project._id, healthScore: project.latestHealthScore ?? 0, issueCount: 0, status: project.latestScanId ? 'Scanned' : 'Not scanned', lastScan: project.lastScannedAt ? new Date(project.lastScannedAt).toLocaleString() : 'Never', securityScore: '—', trend: '' }));
      setProjects(liveProjects);
      if (liveProjects[0]) localStorage.setItem('codepulse_active_project', liveProjects[0].id);
    }).catch(() => {});
  }, []);

  async function openRepositories() {
    setError('');
    try {
      setRepos(await api.listRepos());
      setShowRepos(true);
    } catch (err) {
      setError(err.message);
    }
  }

  async function connectRepo(repo) {
    try {
      const project = await api.createProject(repo);
      setProjects((current) => [{ ...project, id: project._id, healthScore: project.latestHealthScore ?? 0, issueCount: 0, status: 'Not scanned', lastScan: 'Never', securityScore: '—', trend: '' }, ...current.filter((item) => item.id !== project._id)]);
      setShowRepos(false);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div>
      <PageHeader
        eyebrow="Repositories"
        title="Projects"
        description="All connected repositories and their current health posture across code quality, security, and performance."
        actions={
          <Button variant="primary" size="sm" icon={<Plus size={14} />} onClick={openRepositories}>Add project</Button>
        }
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {error && <div className="mt-4 rounded-md border border-danger/40 bg-danger/10 px-3 py-2 text-[12px] text-danger">{error}</div>}
      {showRepos && <Card className="mt-6 p-4"><div className="mb-3 flex items-center justify-between"><h3 className="text-[15px] font-semibold text-text-primary">Select a GitHub repository</h3><Button variant="ghost" size="sm" onClick={() => setShowRepos(false)}>Close</Button></div><div className="space-y-2">{repos.map((repo) => <button key={repo.id} onClick={() => connectRepo(repo)} className="flex w-full items-center justify-between rounded-md border border-border bg-background p-3 text-left hover:bg-surface-hover"><span><span className="block text-[13px] font-medium text-text-primary">{repo.fullName}</span><span className="block text-[11.5px] text-text-secondary">{repo.language || 'Unknown'} · {repo.isPrivate ? 'Private' : 'Public'}</span></span><ArrowUpRight size={14} className="text-text-secondary" /></button>)}</div></Card>}

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
