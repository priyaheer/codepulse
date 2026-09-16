import { Folder, FileCode2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Card, CardBody, CardHeader } from '../components/ui/Card';
import { api } from '../services/api';
import { PageHeader } from './PageHeader';

export function CodeExplorerPage() {
  const [project, setProject] = useState(null);
  const [tree, setTree] = useState([]);
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    async function load() {
      try {
        const projects = await api.listProjects();
        const selected = projects.find((item) => item._id === localStorage.getItem('codepulse_active_project')) || projects[0];
        if (!selected) return;
        localStorage.setItem('codepulse_active_project', selected._id);
        const result = await api.getRepoTree(selected.owner, selected.name, selected.defaultBranch);
        const files = result.tree.filter((item) => item.path && !item.path.includes('node_modules')).slice(0, 300);
        if (active) { setProject(selected); setTree(files); }
        const firstFile = files.find((item) => /\.(js|jsx|ts|tsx|json|md|css)$/.test(item.path));
        if (firstFile) await openFile(selected, firstFile.path, active);
      } catch (err) {
        if (active) setError(err.message);
      }
    }
    load();
    return () => { active = false; };
  }, []);

  async function openFile(selected, path, active = true) {
    try {
      const result = await api.getRepoFile(selected.owner, selected.name, path);
      if (active) setFile(result);
    } catch (err) {
      if (active) setError(err.message);
    }
  }

  return (
    <div>
      <PageHeader
        eyebrow="Repository view"
        title="Code explorer"
        description="Inspect the repository tree, file metadata, and likely issue hotspots with a VS Code-like layout."
      />
      {error && <div className="mb-6 rounded-md border border-danger/40 bg-danger/10 px-3 py-2 text-[12px] text-danger">{error}</div>}
      {!project && !error && <div className="rounded-md border border-border bg-surface p-4 text-[13px] text-text-secondary">Loading the selected repository...</div>}

      <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <Card>
          <CardHeader title="Explorer" description={project ? `${project.owner}/${project.name}` : 'Repository tree'} />
          <CardBody className="space-y-2">
            {tree.map((item) => (
              <button key={item.path} onClick={() => openFile(project, item.path)} className="flex w-full items-center gap-2 rounded-md border border-border bg-background p-2 text-left text-[13px] text-text-primary hover:bg-surface-hover">
                <div className="flex items-center gap-2 text-[13px] text-text-primary">
                  <FileCode2 size={14} className="text-text-secondary" />
                  {item.path}
                </div>
              </button>
            ))}
            {project && tree.length === 0 && <p className="text-[13px] text-text-secondary">No previewable files were returned by GitHub.</p>}
          </CardBody>
        </Card>

        <Card>
          <CardHeader title={file?.path || 'Select a file'} description={file ? `${file.size} bytes · repository content` : 'Choose a file from the real repository tree'} />
          <CardBody className="space-y-3">
            {file ? <pre className="max-h-[640px] overflow-auto rounded-md border border-border bg-background p-3 font-mono text-[12px] leading-6 text-text-primary">{file.content.split('\n').map((line, index) => `${String(index + 1).padStart(4, ' ')} ${line}`).join('\n')}</pre> : <p className="text-[13px] text-text-secondary">No file selected.</p>}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
