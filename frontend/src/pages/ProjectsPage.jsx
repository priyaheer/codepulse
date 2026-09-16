import { ArrowUpRight, Plus, Search } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { ProjectCard } from '../components/ProjectCard';
import { api } from '../services/api';
import { PageHeader } from './PageHeader';

export function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [repos, setRepos] = useState([]);
  const [showRepos, setShowRepos] = useState(false);
  const [repoSearch, setRepoSearch] = useState('');
  const [sortBy, setSortBy] = useState('updated');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [repoLoading, setRepoLoading] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getMe().then(() => api.listProjects()).then((items) => {
      const liveProjects = items.map((project) => ({ ...project, id: project._id, healthScore: project.latestHealthScore ?? 0, issueCount: 0, status: project.latestScanId ? 'Scanned' : 'Not scanned', lastScan: project.lastScannedAt ? new Date(project.lastScannedAt).toLocaleString() : 'Never', securityScore: '—', trend: '' }));
      setProjects(liveProjects);
      if (liveProjects[0]) localStorage.setItem('codepulse_active_project', liveProjects[0].id);
    }).catch((err) => setError(err.message)).finally(() => setLoading(false));
  }, []);

  async function loadRepos(nextPage = 1, replace = true) {
    setRepoLoading(true);
    setError('');
    try {
      const nextRepos = await api.listRepos(nextPage, 30);
      setRepos((current) => replace ? nextRepos : [...current, ...nextRepos]);
      setHasMore(nextRepos.length === 30);
      setPage(nextPage);
    } catch (err) {
      setError(err.message);
    } finally {
      setRepoLoading(false);
    }
  }

  async function openRepositories() {
    setShowRepos(true);
    setRepoSearch('');
    setSortBy('updated');
    await loadRepos(1, true);
  }

  async function connectRepo(repo) {
    try {
      const project = await api.createProject(repo);
      setProjects((current) => [{ ...project, id: project._id, healthScore: project.latestHealthScore ?? 0, issueCount: 0, status: 'Not scanned', lastScan: 'Never', securityScore: '—', trend: '' }, ...current.filter((item) => item.id !== project._id)]);
      setShowRepos(false);
      if (project?._id) localStorage.setItem('codepulse_active_project', project._id);
    } catch (err) {
      setError(err.message);
    }
  }

  const visibleRepos = useMemo(() => {
    const filtered = repos.filter((repo) => {
      const text = `${repo.fullName} ${repo.description} ${repo.language}`.toLowerCase();
      return text.includes(repoSearch.toLowerCase());
    });

    return [...filtered].sort((a, b) => {
      if (sortBy === 'stars') return (b.stars || 0) - (a.stars || 0);
      if (sortBy === 'name') return a.fullName.localeCompare(b.fullName);
      return new Date(b.updatedAt || 0) - new Date(a.updatedAt || 0);
    });
  }, [repos, repoSearch, sortBy]);

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

      {error && <div className="mb-4 rounded-md border border-danger/40 bg-danger/10 px-3 py-2 text-[12px] text-danger">{error}</div>}
      {loading && <div className="rounded-md border border-border bg-surface px-4 py-5 text-[13px] text-text-secondary">Loading your GitHub projects...</div>}
      {!loading && !error && projects.length === 0 && <div className="rounded-md border border-border bg-surface px-4 py-5 text-[13px] text-text-secondary">No repositories connected yet. Click Add project to select one from GitHub.</div>}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {showRepos && (
        <Card className="mt-6 p-4">
          <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h3 className="text-[15px] font-semibold text-text-primary">Select a GitHub repository</h3>
            <Button variant="ghost" size="sm" onClick={() => setShowRepos(false)}>Close</Button>
          </div>

          <div className="mb-4 flex flex-col gap-3 md:flex-row">
            <div className="relative flex-1">
              <Search size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
              <input value={repoSearch} onChange={(event) => setRepoSearch(event.target.value)} placeholder="Search repositories" className="h-9 w-full rounded-md border border-border bg-background pl-9 pr-3 text-[13px] text-text-primary outline-none" />
            </div>
            <select value={sortBy} onChange={(event) => setSortBy(event.target.value)} className="h-9 rounded-md border border-border bg-background px-3 text-[13px] text-text-primary">
              <option value="updated">Recently updated</option>
              <option value="stars">Stars</option>
              <option value="name">Name</option>
            </select>
          </div>

          {repoLoading && <div className="rounded-md border border-border bg-surface px-4 py-3 text-[13px] text-text-secondary">Loading repositories…</div>}

          <div className="space-y-2">
            {visibleRepos.map((repo) => (
              <button key={repo.id} onClick={() => connectRepo(repo)} className="flex w-full items-center justify-between rounded-md border border-border bg-background p-3 text-left hover:bg-surface-hover">
                <span className="min-w-0">
                  <span className="block truncate text-[13px] font-medium text-text-primary">{repo.fullName}</span>
                  <span className="mt-1 block truncate text-[11.5px] text-text-secondary">{repo.description || 'No description available'} · {repo.language || 'Unknown'} · {repo.visibility}</span>
                </span>
                <span className="ml-3 flex items-center gap-2 text-[11.5px] text-text-secondary">
                  {repo.stars ? `${repo.stars}★` : 'No stars'}
                  <ArrowUpRight size={14} className="text-text-secondary" />
                </span>
              </button>
            ))}
          </div>

          {!repoLoading && visibleRepos.length === 0 && <div className="mt-3 rounded-md border border-border bg-surface px-4 py-3 text-[13px] text-text-secondary">No repositories match your current search.</div>}

          {hasMore && (
            <div className="mt-4 flex justify-center">
              <Button variant="secondary" size="sm" onClick={() => loadRepos(page + 1, false)} disabled={repoLoading}>Load more</Button>
            </div>
          )}
        </Card>
      )}
    </div>
  );
}
