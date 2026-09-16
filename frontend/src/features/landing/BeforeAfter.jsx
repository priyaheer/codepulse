import { HealthGauge } from '../../charts/HealthGauge';

const deltas = [
  { label: 'Health', value: '+17' },
  { label: 'Critical issues', value: '−4' },
  { label: 'Security score', value: '+9' },
  { label: 'Performance score', value: '+12' },
];

export function BeforeAfter() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-accent">Example scan comparison</p>
        <h2 className="mt-3 text-[26px] font-semibold tracking-tight text-text-primary max-w-md">
          Scan. Fix. Rescan. Know what changed.
        </h2>
        <p className="mt-3 text-[14px] text-text-secondary max-w-lg">
          Illustrative values show the product loop. Real comparisons use completed scans stored for your repository.
        </p>

        <div className="mt-12 flex flex-col md:flex-row items-center gap-10 md:gap-16">
          <div className="flex items-center gap-8">
            <div className="text-center">
              <HealthGauge score={64} size={112} />
              <p className="mt-2 text-[12px] text-text-muted">Example scan A</p>
            </div>
            <div className="text-text-muted text-[20px]">→</div>
            <div className="text-center">
              <HealthGauge score={81} size={112} />
              <p className="mt-2 text-[12px] text-text-muted">Example scan B</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-10 gap-y-5 flex-1">
            {deltas.map((d) => (
              <div key={d.label}>
                <p className="text-[22px] font-semibold text-success tabular-nums">{d.value}</p>
                <p className="text-[12.5px] text-text-secondary mt-0.5">{d.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
