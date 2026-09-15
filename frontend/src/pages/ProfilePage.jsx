import { Card, CardBody } from '../components/ui/Card';
import { PageHeader } from './PageHeader';

export function ProfilePage() {
  return (
    <div>
      <PageHeader
        eyebrow="Profile"
        title="Developer profile"
        description="Used for account details, repository ownership, and activity context."
      />

      <Card>
        <CardBody className="grid gap-4 md:grid-cols-[140px_1fr]">
          <div className="flex h-28 w-28 items-center justify-center rounded-full border border-border bg-surface-active text-[28px] font-semibold text-text-primary">JD</div>
          <div className="space-y-2 text-[13px] text-text-secondary">
            <p className="text-[20px] font-semibold text-text-primary">Jordan Doe</p>
            <p>GitHub: @jordandoe</p>
            <p>Email: jordan@codepulse.ai</p>
            <p>Role: Platform engineer</p>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
