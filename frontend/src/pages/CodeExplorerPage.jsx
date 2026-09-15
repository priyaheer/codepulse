import { AlertTriangle, Folder, FileCode2 } from 'lucide-react';
import { Card, CardBody, CardHeader } from '../components/ui/Card';
import { PageHeader } from './PageHeader';

const tree = [
  { name: 'src', type: 'folder', children: ['app', 'features', 'lib'] },
  { name: 'server', type: 'folder', children: ['routes', 'middleware'] },
  { name: 'package.json', type: 'file', issueCount: 1 },
];

export function CodeExplorerPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Repository view"
        title="Code explorer"
        description="Inspect the repository tree, file metadata, and likely issue hotspots with a VS Code-like layout."
      />

      <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <Card>
          <CardHeader title="Explorer" description="Repository tree" />
          <CardBody className="space-y-2">
            {tree.map((item) => (
              <div key={item.name} className="rounded-md border border-border bg-background p-2">
                <div className="flex items-center gap-2 text-[13px] text-text-primary">
                  {item.type === 'folder' ? <Folder size={14} className="text-text-secondary" /> : <FileCode2 size={14} className="text-text-secondary" />}
                  {item.name}
                  {item.issueCount ? <span className="ml-auto text-[11px] text-danger">{item.issueCount}</span> : null}
                </div>
              </div>
            ))}
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="src/payments/checkout.ts" description="Complexity: 7 • 1 issue • 88 lines" />
          <CardBody className="space-y-3">
            <div className="rounded-md border border-border bg-background p-3 font-mono text-[12px] leading-6 text-text-primary">
              <div className="flex gap-3">
                <span className="w-6 text-right text-text-muted">1</span>
                <span>{'export async function submitOrder(form) {'}</span>
              </div>
              <div className="flex gap-3">
                <span className="w-6 text-right text-text-muted">2</span>
                <span>{'  const payload = { amount: form.amount, customerId: form.customerId };'} </span>
              </div>
              <div className="flex gap-3">
                <span className="w-6 text-right text-text-muted">3</span>
                <span>{'  if (!payload.amount) return null;'}</span>
              </div>
              <div className="flex gap-3">
                <span className="w-6 text-right text-text-muted">4</span>
                <span>{"  return fetch('/api/orders', { method: 'POST', body: JSON.stringify(payload) });"}</span>
              </div>
              <div className="flex gap-3">
                <span className="w-6 text-right text-text-muted">5</span>
                <span>{'}'}</span>
              </div>
            </div>

            <div className="rounded-md border border-border bg-background p-3">
              <div className="flex items-center gap-2 text-[12px] text-danger">
                <AlertTriangle size={14} />
                Issue marker: unvalidated request input
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
