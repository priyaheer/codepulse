import { MessageSquareText, Sparkles, Search, ArrowUpRight } from 'lucide-react';
import { Card, CardBody, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { PageHeader } from './PageHeader';

const prompts = [
  'How does authentication work in this repository?',
  'Where are API calls made?',
  'How does data flow through this application?',
  'Which components are reusable?',
];

export function AIAssistantPage() {
  return (
    <div>
      <PageHeader
        eyebrow="AI assistant"
        title="Project-aware AI"
        description="Ask about the active repository using evidence from the current project and scan context."
      />

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <Card>
          <CardHeader title="Suggested prompts" description="Context-aware questions" />
          <CardBody className="space-y-2">
            {prompts.map((prompt) => (
              <button key={prompt} className="flex w-full items-center justify-between rounded-md border border-border bg-background px-3 py-2 text-left text-[13px] text-text-primary hover:bg-surface-hover">
                <span>{prompt}</span>
                <ArrowUpRight size={14} className="text-text-secondary" />
              </button>
            ))}
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Conversation" description="Repository-grounded answers" />
          <CardBody className="space-y-4">
            <div className="rounded-md border border-border bg-background p-3 text-[13px] text-text-primary">
              <div className="mb-2 flex items-center gap-2 text-accent"><Sparkles size={14} /> AI</div>
              <p>Authentication is primarily handled in the app shell and the backend auth middleware. The backend uses GitHub OAuth callback flow and validates JWTs via the middleware in <span className="font-medium">backend/middleware/auth.js</span>.</p>
            </div>
            <div className="rounded-md border border-border bg-background p-3 text-[13px] text-text-primary">
              <div className="mb-2 flex items-center gap-2 text-text-secondary"><MessageSquareText size={14} /> Context</div>
              <p>The project uses a React frontend and an Express API, with the repo structure suggesting a route-driven backend and reusable UI components under the frontend layout and components directories.</p>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <input className="flex-1 rounded-md border border-border bg-background px-3 py-2 text-[13px] text-text-primary outline-none" placeholder="Ask about this project..." />
              <Button variant="primary" size="sm" icon={<Search size={13} />}>Ask</Button>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
