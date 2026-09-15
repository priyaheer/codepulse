import { ArrowRight, Copy, ShieldAlert, Sparkles, CheckCircle2 } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { Badge, SeverityBadge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Card, CardBody, CardHeader } from '../components/ui/Card';
import { demoIssues } from '../services/demoData';
import { PageHeader } from './PageHeader';

export function IssueDetailPage() {
  const { issueId } = useParams();
  const issue = demoIssues.find((item) => item.id === issueId) || demoIssues[0];

  return (
    <div>
      <PageHeader
        eyebrow="Issue detail"
        title={issue.title}
        description="Evidence-based note from the scanner, AI context, and recommended fix path."
        actions={
          <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm" icon={<Sparkles size={13} />}>Suggest fix</Button>
            <Button variant="ghost" size="sm" icon={<Copy size={13} />}>Copy fix</Button>
          </div>
        }
      />

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
            <div className="rounded-md border border-border bg-background p-3">
              <p className="text-[11.5px] text-text-secondary">Summary</p>
              <p className="mt-2 text-[13px] leading-relaxed text-text-primary">Unvalidated request data is allowed to enter the payment pipeline. This creates an elevated risk of malformed requests, misuse, or downstream failures.</p>
            </div>
            <div className="rounded-md border border-border bg-background p-3">
              <p className="text-[11.5px] text-text-secondary">Suggested code</p>
              <pre className="mt-2 overflow-auto rounded-md bg-surface p-3 text-[12px] whitespace-pre-wrap text-text-primary">{
  'const payload = {\n  amount: Number(form.amount),\n  customerId: String(form.customerId),\n};\n\nif (!Number.isFinite(payload.amount) || payload.amount <= 0) {\n  throw new Error("Invalid amount");\n}'
}</pre>
            </div>
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
