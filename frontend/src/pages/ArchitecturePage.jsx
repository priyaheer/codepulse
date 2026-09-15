import { ArrowDown, LayoutGrid, ServerCog, Database, Network, Shield, FolderTree } from 'lucide-react';
import { Card, CardBody, CardHeader } from '../components/ui/Card';
import { PageHeader } from './PageHeader';

const layers = [
  { key: 'User', icon: LayoutGrid },
  { key: 'React UI', icon: LayoutGrid },
  { key: 'API Service', icon: Network },
  { key: 'Express', icon: ServerCog },
  { key: 'Controllers', icon: Shield },
  { key: 'Database', icon: Database },
];

export function ArchitecturePage() {
  return (
    <div>
      <PageHeader
        eyebrow="Architecture"
        title="System architecture"
        description="Repository-supported architectural relationships and service boundaries."
      />

      <Card>
        <CardHeader title="Architecture view" description="Inferred from the current repository structure and service files" />
        <CardBody>
          <div className="flex flex-col items-center gap-3 py-4">
            {layers.map(({ key, icon: Icon }, index) => (
              <div key={key} className="flex flex-col items-center">
                <div className="flex items-center justify-center rounded-lg border border-border bg-surface px-4 py-3 text-[13px] font-medium text-text-primary min-w-[150px]">
                  <Icon size={14} className="mr-2 text-accent" />
                  {key}
                </div>
                {index < layers.length - 1 && <ArrowDown size={16} className="my-1 text-text-muted" />}
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <Card className="p-4">
          <p className="text-[12px] text-text-secondary">Frontend framework</p>
          <p className="mt-2 text-[15px] font-semibold text-text-primary">React</p>
        </Card>
        <Card className="p-4">
          <p className="text-[12px] text-text-secondary">Backend framework</p>
          <p className="mt-2 text-[15px] font-semibold text-text-primary">Express</p>
        </Card>
        <Card className="p-4">
          <p className="text-[12px] text-text-secondary">Database</p>
          <p className="mt-2 text-[15px] font-semibold text-text-primary">MongoDB</p>
        </Card>
      </div>
    </div>
  );
}
