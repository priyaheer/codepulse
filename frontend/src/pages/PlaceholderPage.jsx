import { PageHeader } from './PageHeader';
import { Card } from './Card';

export function PlaceholderPage({ title, description, phase }) {
  return (
    <div>
      <PageHeader title={title} description={description} />
      <Card className="flex flex-col items-center justify-center py-20 px-6 text-center border-dashed">
        <div className="h-9 w-9 rounded-md bg-accent-muted text-accent-text flex items-center justify-center text-[13px] font-semibold mono mb-4">
          {phase}
        </div>
        <p className="text-[13.5px] font-medium text-text-primary">This view is scaffolded and ready to build</p>
        <p className="mt-1.5 max-w-sm text-[13px] text-text-secondary">
          The layout, navigation, and data contracts already point here — the real functionality lands in {phase} of the build.
        </p>
      </Card>
    </div>
  );
}
