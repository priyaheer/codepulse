import { Code2, ShieldCheck, Package, Gauge, Network, Sparkles } from 'lucide-react';

const features = [
  {
    icon: Code2,
    title: 'Code quality',
    text: 'ESLint and AST analysis surface unused code, complexity, and risky patterns — sourced, not guessed.',
  },
  {
    icon: ShieldCheck,
    title: 'Security',
    text: 'npm audit plus secret-pattern detection. Any credential found is masked before it is ever shown.',
  },
  {
    icon: Package,
    title: 'Dependencies',
    text: 'Outdated, vulnerable, and unused packages, with what to do about each one.',
  },
  {
    icon: Gauge,
    title: 'Performance',
    text: 'Bundle size, oversized assets, and rendering patterns that are likely slowing things down.',
  },
  {
    icon: Network,
    title: 'Architecture',
    text: 'The real stack and data flow, mapped from your repository structure — not invented.',
  },
  {
    icon: Sparkles,
    title: 'AI insights',
    text: 'Explanations, priority, and fix suggestions grounded in actual findings, never fabricated.',
  },
];

export function Features() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="text-[26px] font-semibold tracking-tight text-text-primary max-w-md">
          Six lenses on the same repository.
        </h2>
        <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, text }) => (
            <div key={title} className="bg-background p-6">
              <Icon size={18} className="text-accent" strokeWidth={1.75} />
              <h3 className="mt-4 text-[14.5px] font-semibold text-text-primary">{title}</h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-text-secondary">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
