import { MessageSquareText, Sparkles, Search, ArrowUpRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Card, CardBody, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { PageHeader } from './PageHeader';
import { api } from '../services/api';

const prompts = [
  'How does authentication work in this repository?',
  'Where are API calls made?',
  'How does data flow through this application?',
  'Which components are reusable?',
];

export function AIAssistantPage() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [lastQuestion, setLastQuestion] = useState('');
  const [project, setProject] = useState(null);
  const [contextLoading, setContextLoading] = useState(true);

  useEffect(() => {
    let active = true;
    async function loadProjectContext() {
      try {
        await api.getMe();
        const projects = await api.listProjects();
        const storedId = localStorage.getItem('codepulse_active_project');
        const selected = projects.find((item) => item._id === storedId) || projects[0];
        if (!selected) {
          if (active) setError('Connect a project before asking repository-grounded AI questions.');
          return;
        }
        localStorage.setItem('codepulse_active_project', selected._id);
        if (active) setProject(selected);
      } catch (err) {
        if (active) setError(err.message || 'Your authenticated session could not be loaded.');
      } finally {
        if (active) setContextLoading(false);
      }
    }
    loadProjectContext();
    return () => { active = false; };
  }, []);

  async function ask(value = question) {
    if (contextLoading) return;
    if (!project?._id) {
      setError('Connect a project before asking repository-grounded AI questions.');
      return;
    }
    if (!value.trim()) return;
    setQuestion(value);
    setLastQuestion(value);
    setLoading(true);
    setError('');
    try {
      setAnswer(await api.askProjectAI(project._id, value));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <PageHeader
        eyebrow="AI assistant"
        title="Project-aware AI"
        description={project ? `Ask about ${project.owner}/${project.name} using evidence from the current project and scan context.` : 'Ask about the active repository using evidence from the current project and scan context.'}
      />

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <Card>
          <CardHeader title="Suggested prompts" description="Context-aware questions" />
          <CardBody className="space-y-2">
            {prompts.map((prompt) => (
              <button key={prompt} onClick={() => ask(prompt)} className="flex w-full items-center justify-between rounded-md border border-border bg-background px-3 py-2 text-left text-[13px] text-text-primary hover:bg-surface-hover">
                <span>{prompt}</span>
                <ArrowUpRight size={14} className="text-text-secondary" />
              </button>
            ))}
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Conversation" description="Repository-grounded answers" />
          <CardBody className="space-y-4">
            {contextLoading && <div className="rounded-md border border-border bg-background p-3 text-[12px] text-text-secondary">Loading authenticated project context...</div>}
            {error && <div className="flex items-center justify-between gap-3 rounded-md border border-danger/40 bg-danger/10 p-3 text-[12px] text-danger"><span>{error}</span>{lastQuestion && <Button variant="ghost" size="sm" onClick={() => ask(lastQuestion)}>Retry</Button>}</div>}
            <div className="rounded-md border border-border bg-background p-3 text-[13px] text-text-primary">
              <div className="mb-2 flex items-center gap-2 text-accent"><Sparkles size={14} /> AI</div>
              <p>{answer?.answer || 'Ask a question to receive an answer grounded in selected repository files.'}</p>
              {answer?.evidence?.length > 0 && <p className="mt-3 text-[11.5px] text-text-secondary">Evidence: {answer.evidence.join(', ')}</p>}
            </div>
            <div className="rounded-md border border-border bg-background p-3 text-[13px] text-text-primary">
              <div className="mb-2 flex items-center gap-2 text-text-secondary"><MessageSquareText size={14} /> Context</div>
              <p>{answer ? `Confidence: ${Math.round(answer.confidence * 100)}%. Answers are limited to repository evidence sent for this question.` : project ? `Ready to use evidence from ${project.owner}/${project.name}.` : 'No repository context has been sent yet.'}</p>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <input value={question} onChange={(event) => setQuestion(event.target.value)} onKeyDown={(event) => event.key === 'Enter' && ask()} className="flex-1 rounded-md border border-border bg-background px-3 py-2 text-[13px] text-text-primary outline-none" placeholder="Ask about this project..." />
              <Button variant="primary" size="sm" icon={<Search size={13} />} onClick={() => ask()} disabled={loading || contextLoading}>{loading ? 'Asking...' : 'Ask'}</Button>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
