import { ArrowRight, Copy, ShieldAlert, Sparkles, CheckCircle2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Badge, SeverityBadge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Card, CardBody, CardHeader } from '../components/ui/Card';
import { demoIssues } from '../services/demoData';
import { api } from '../services/api';
import { PageHeader } from './PageHeader';

export function IssueDetailPage() {
  const { issueId } = useParams();
  const [issue, setIssue] = useState(demoIssues.find((item) => item.id === issueId) || demoIssues[0]);
  const [aiResult, setAiResult] = useState(null);
  const [loading, setLoading] = useState('');
  const [error, setError] = useState('');
  const liveIssue = /^[a-f\d]{24}$/i.test(issueId || '');

  useEffect(() => {
    if (!liveIssue) return;
    api.getMe().then(() => api.getIssue(issueId)).then((result) => setIssue(result)).catch(() => {});
  }, [issueId, liveIssue]);

  async function runAI(action) {
    if (!liveIssue) {
      setError('Sign in with a connected project to use repository-grounded AI.');
      return;
    }
    setLoading(action);
    setError('');
    try {
      const result = action === 'analyze' ? await api.analyzeIssue(issueId) : await api.suggestIssueFix(issueId);
      setAiResult(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading('');
    }
  }

  return (
    <div>
      <PageHeader
        eyebrow="Issue detail"
        title={issue.title}
        description="Evidence-based note from the scanner, AI context, and recommended fix path."
        actions={
          <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm" icon={<Sparkles size={13} />} onClick={() => runAI('fix')} disabled={loading !== ''}>{loading === 'fix' ? 'Working...' : 'Suggest fix'}</Button>
            <Button variant="ghost" size="sm" icon={<Copy size={13} />}>Copy fix</Button>
          </div>
        }
      />

      {error && <div className="mb-6 rounded-md border border-danger/40 bg-danger/10 px-3 py-2 text-[12px] text-danger">{error}</div>}

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <CardHeader title="Finding" description="Scanner and repository provenance" />
          <CardBody className="space-y-4 text-[13px] text-text-secondary">
            <div className="flex flex-wrap items-center gap-2">
              <SeverityBadge severity={issue.severity} />
              <Badge variant="neutral">{issue.category}</Badge>
              <Badge variant="neutral">{issue.source}</Badge>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-md border border-border bg-background p-3"><p className="text-[11.5px] text-text-secondary">File</p><p className="mt-1 text-[13px] font-medium text-text-primary">{issue.file}</p></div>
              <div className="rounded-md border border-border bg-background p-3"><p className="text-[11.5px] text-text-secondary">Line</p><p className="mt-1 text-[13px] font-medium text-text-primary">{issue.line}</p></div>
              <div className="rounded-md border border-border bg-background p-3"><p className="text-[11.5px] text-text-secondary">Status</p><p className="mt-1 text-[13px] font-medium text-text-primary">{issue.status}</p></div>
              <div className="rounded-md border border-border bg-background p-3"><p className="text-[11.5px] text-text-secondary">Category</p><p className="mt-1 text-[13px] font-medium text-text-primary">{issue.category}</p></div>
            </div>

            <div className="rounded-md border border-border bg-background p-3">
              <p className="text-[12px] text-text-secondary">Evidence</p>
              <pre className="mt-2 overflow-auto rounded-md bg-surface p-3 text-[12px] whitespace-pre-wrap text-text-primary">{issue.evidence}</pre>
            </div>

            <div className="rounded-md border border-border bg-background p-3">
              <p className="text-[12px] text-text-secondary">Why it matters</p>
              <p className="mt-2 leading-relaxed text-text-primary">{issue.description}</p>
            </div>

            <div className="rounded-md border border-border bg-background p-3">
              <p className="text-[12px] text-text-secondary">Recommended fix</p>
              <p className="mt-2 leading-relaxed text-text-primary">{issue.recommendation}</p>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="AI analysis" description="Structured guidance" />
          <CardBody className="space-y-4">
            <Button variant="primary" size="sm" icon={<Sparkles size={13} />} onClick={() => runAI('analyze')} disabled={loading !== ''}>{loading === 'analyze' ? 'Analyzing...' : 'Analyze with AI'}</Button>
            <div className="rounded-md border border-border bg-background p-3">
              <p className="text-[11.5px] text-text-secondary">Summary</p>
              <p className="mt-2 text-[13px] leading-relaxed text-text-primary">{aiResult?.summary || (liveIssue ? 'Run analysis to generate an evidence-based explanation.' : 'Demo Mode preview. Connect a repository to generate a real analysis.')}</p>
            </div>
            {aiResult && <>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-md border border-border bg-background p-3"><p className="text-[11.5px] text-text-secondary">Why it matters</p><p className="mt-2 text-[13px] text-text-primary">{aiResult.whyItMatters}</p></div>
                <div className="rounded-md border border-border bg-background p-3"><p className="text-[11.5px] text-text-secondary">Impact / confidence</p><p className="mt-2 text-[13px] text-text-primary">{aiResult.impact} / {Math.round(aiResult.confidence * 100)}%</p></div>
              </div>
              <div className="rounded-md border border-border bg-background p-3"><p className="text-[11.5px] text-text-secondary">Recommendation</p><p className="mt-2 text-[13px] text-text-primary">{aiResult.recommendation}</p></div>
            </>}
            <div className="rounded-md border border-border bg-background p-3">
              <p className="text-[11.5px] text-text-secondary">Suggested code</p>
              <pre className="mt-2 overflow-auto rounded-md bg-surface p-3 text-[12px] whitespace-pre-wrap text-text-primary">{aiResult?.suggestedCode || 'No AI-generated code yet.'}</pre>
            </div>
            {aiResult?.diff && <div className="rounded-md border border-border bg-background p-3"><p className="text-[11.5px] text-text-secondary">Review-only diff</p><pre className="mt-2 overflow-auto rounded-md bg-surface p-3 text-[12px] whitespace-pre-wrap text-text-primary">{aiResult.diff}</pre></div>}
            <div className="flex items-center gap-2">
              <Button variant="primary" size="sm" icon={<CheckCircle2 size={13} />}>Mark resolved</Button>
              <Button variant="secondary" size="sm">Ignore</Button>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
