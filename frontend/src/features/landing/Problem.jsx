import { Layers3, Radar, ListChecks } from 'lucide-react';

const problems = [
  [Layers3, 'Growing complexity', 'As projects grow, important problems become harder to see.'],
  [Radar, 'Scattered signals', 'Security, dependencies, architecture, and performance live in different places.'],
  [ListChecks, 'No clear priority', 'You need to know what matters first, why it matters, and what changed.'],
];

export function Problem() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8"><p className="text-[11px] font-medium uppercase tracking-[0.18em] text-accent">The developer problem</p><h2 className="mt-3 max-w-xl text-3xl font-semibold tracking-tight text-text-primary">Your codebase already contains the signals. Finding them shouldn't be manual.</h2><div className="mt-10 grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-3">{problems.map(([Icon,title,text]) => <div key={title} className="bg-background p-6"><Icon size={19} className="text-accent" /><h3 className="mt-7 text-[15px] font-semibold text-text-primary">{title}</h3><p className="mt-2 text-[13px] leading-relaxed text-text-secondary">{text}</p></div>)}</div>
      </div>
    </section>
  );
}
