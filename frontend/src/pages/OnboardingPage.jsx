import { Check, Github, ShieldCheck, FolderGit2, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { PageHeader } from './PageHeader';

const steps = [
  { label: 'Welcome', active: true, icon: Sparkles },
  { label: 'Connect GitHub', active: false, icon: Github },
  { label: 'Select repo', active: false, icon: FolderGit2 },
  { label: 'Scan types', active: false, icon: ShieldCheck },
  { label: 'Run scan', active: false, icon: ArrowRight },
];

const categories = ['Code Quality', 'Security', 'Dependencies', 'Performance', 'Architecture'];

export function OnboardingPage() {
  return (
    <div>
      <PageHeader
        eyebrow="New project"
        title="Set up your first scan"
        description="Connect your repository, select the checks you want, and start the analysis pipeline."
        actions={<Button as={Link} to="/app/dashboard" variant="secondary">Skip to dashboard</Button>}
      />

      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <Card className="p-5">
          <div className="flex flex-wrap gap-2">
            {steps.map(({ label, active, icon: Icon }, index) => (
              <div
                key={label}
                className={[
                  'flex items-center gap-2 rounded-full border px-2.5 py-1.5 text-[12px]',
                  active ? 'border-accent bg-accent-muted text-accent-text' : 'border-border text-text-secondary',
                ].join(' ')}
              >
                <Icon size={12} />
                <span>{index + 1}. {label}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-lg border border-border bg-background p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[12px] text-text-secondary">Connected repository</p>
                <h2 className="mt-1 text-[18px] font-semibold text-text-primary">acme/dashboard-app</h2>
              </div>
              <span className="rounded-full bg-success-muted px-2.5 py-1 text-[11px] font-medium text-success">Connected</span>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {categories.map((name) => (
                <label key={name} className="flex items-center justify-between gap-3 rounded-md border border-border bg-surface p-3 text-[13px] text-text-primary">
                  <span>{name}</span>
                  <input type="checkbox" defaultChecked className="h-4 w-4 accent-accent" />
                </label>
              ))}
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between rounded-lg border border-border bg-surface p-4">
            <div>
              <p className="text-[12px] text-text-secondary">Scan progress</p>
              <p className="mt-1 text-[13px] text-text-primary">Running static analysis, security checks, and dependency review.</p>
            </div>
            <Button as={Link} to="/app/projects/acme-dashboard-app/scan" variant="primary" size="sm">
              Start scan
            </Button>
          </div>
        </Card>

        <Card className="p-5">
          <h3 className="text-[14px] font-semibold text-text-primary">Scan overview</h3>
          <div className="mt-5 space-y-4">
            <div>
              <div className="mb-1 flex justify-between text-[12px] text-text-secondary">
                <span>Code quality</span>
                <span>84%</span>
              </div>
              <div className="h-2 rounded-full bg-surface-hover"><div className="h-2 w-[84%] rounded-full bg-success" /></div>
            </div>
            <div>
              <div className="mb-1 flex justify-between text-[12px] text-text-secondary">
                <span>Security</span>
                <span>71%</span>
              </div>
              <div className="h-2 rounded-full bg-surface-hover"><div className="h-2 w-[71%] rounded-full bg-warning" /></div>
            </div>
            <div>
              <div className="mb-1 flex justify-between text-[12px] text-text-secondary">
                <span>Dependencies</span>
                <span>68%</span>
              </div>
              <div className="h-2 rounded-full bg-surface-hover"><div className="h-2 w-[68%] rounded-full bg-danger" /></div>
            </div>
          </div>

          <div className="mt-6 rounded-md border border-border bg-background p-3">
            <div className="flex items-center gap-2 text-[12px] text-text-secondary">
              <Check size={14} className="text-success" />
              Repository metadata validated
            </div>
            <div className="mt-2 flex items-center gap-2 text-[12px] text-text-secondary">
              <Check size={14} className="text-success" />
              GitHub permissions confirmed
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
