import { AlertTriangle, Lock, ShieldCheck, KeyRound } from 'lucide-react';
import { Badge, SeverityBadge } from '../components/ui/Badge';
import { Card, CardBody, CardHeader } from '../components/ui/Card';
import { PageHeader } from './PageHeader';

const findings = [
  { title: 'Unvalidated payment payload', severity: 'critical', file: 'src/payments/checkout.ts' },
  { title: 'Legacy JWT secret fallback', severity: 'high', file: 'server/auth.ts' },
  { title: 'Verbose error leakage', severity: 'medium', file: 'server/error.ts' },
];

export function SecurityPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Security center"
        title="Security overview"
        description="Repository security posture with masked secrets, detection history, and mitigation guidance."
      />

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <Card>
          <CardHeader title="Security score" description="Latest scan summary" />
          <CardBody className="space-y-4">
            <div className="text-[36px] font-semibold text-text-primary">87</div>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-md border border-border bg-background p-3"><p className="text-[12px] text-text-secondary">Secrets</p><p className="mt-2 text-[20px] font-semibold text-text-primary">2</p></div>
              <div className="rounded-md border border-border bg-background p-3"><p className="text-[12px] text-text-secondary">Vulnerabilities</p><p className="mt-2 text-[20px] font-semibold text-text-primary">5</p></div>
            </div>
            <div className="rounded-md border border-border bg-background p-3 text-[12px] text-text-secondary">
              <p className="flex items-center gap-2"><KeyRound size={14} className="text-warning" /> Secret preview is masked: sk_live_************</p>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Security findings" description="Severe issues needing action" />
          <CardBody className="space-y-3">
            {findings.map((finding) => (
              <div key={finding.title} className="rounded-md border border-border bg-background p-3">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-[13px] font-medium text-text-primary">{finding.title}</p>
                    <p className="mt-1 text-[11.5px] text-text-secondary">{finding.file}</p>
                  </div>
                  <SeverityBadge severity={finding.severity} />
                </div>
              </div>
            ))}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
