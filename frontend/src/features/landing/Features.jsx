import { Code2, ShieldCheck, Package, Gauge, Network, Sparkles, FolderTree, History, ChartNoAxesCombined } from 'lucide-react';

const features = [
  {
    icon: Code2,
    title: 'Code quality',
    text: 'Detect supported code-quality problems from the repository with evidence attached.',
  },
  {
    icon: ShieldCheck,
    title: 'Security',
    text: 'Identify supported security risks with masked evidence from deterministic checks.',
  },
  {
    icon: Package,
    title: 'Dependencies',
    text: 'Inspect supported manifests and show dependency findings without inventing vulnerability data.',
  },
  {
    icon: Gauge,
    title: 'Performance',
    text: 'Surface evidence-based static performance findings and clearly separate unavailable runtime metrics.',
  },
  {
    icon: Network,
    title: 'Architecture',
    text: 'Understand detected project structure, modules, and relationships from repository files.',
  },
  {
    icon: Sparkles,
    title: 'AI insights',
    text: 'Ask about findings using relevant repository context, with unavailable evidence called out plainly.',
  },
  { icon: FolderTree, title: 'Code Explorer', text: 'Open real repository files and connect findings to source code.' },
  { icon: History, title: 'Scan history', text: 'Track completed scans, scores, findings, and changes over time.' },
  { icon: ChartNoAxesCombined, title: 'Analytics', text: 'Compare historical scan data when enough real history exists.' },
];

export function Features() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="text-[26px] font-semibold tracking-tight text-text-primary max-w-md">
          One repository. Eight useful views.
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
