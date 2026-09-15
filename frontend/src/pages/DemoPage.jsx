import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Logo } from '../components/ui/Logo';
import { Button } from '../components/ui/Button';

export function DemoPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="p-6">
        <Link to="/">
          <Logo />
        </Link>
      </div>
      <div className="flex-1 flex items-center justify-center px-4 pb-16">
        <div className="w-full max-w-md text-center">
          <span className="inline-block rounded-full bg-accent-muted text-accent-text text-[12px] font-medium px-3 py-1">
            Demo project
          </span>
          <h1 className="mt-4 text-[20px] font-semibold text-text-primary">
            The full demo experience arrives in Phase 19
          </h1>
          <p className="mt-2 text-[13.5px] text-text-secondary leading-relaxed">
            It'll load a realistic, clearly-labeled sample repository — issues, security
            findings, architecture, and scan history included — with no GitHub connection
            required.
          </p>
          <Button as={Link} to="/" variant="secondary" className="mt-6" iconRight={<ArrowRight size={15} />}>
            Back to home
          </Button>
        </div>
      </div>
    </div>
  );
}
