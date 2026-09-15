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
        <h2 className="text-[26px] font-semibold tracking-tight text-text-primary max-w-md">
          Fix things. Watch the score move.
        </h2>
        <p className="mt-3 text-[14px] text-text-secondary max-w-lg">
          Every scan is a snapshot. Once you've addressed what matters, rescan and see
          the difference — measured, not implied.
        </p>

        <div className="mt-12 flex flex-col md:flex-row items-center gap-10 md:gap-16">
          <div className="flex items-center gap-8">
            <div className="text-center">
              <HealthGauge score={64} size={112} />
              <p className="mt-2 text-[12px] text-text-muted">Scan #1 · Sep 1</p>
            </div>
            <div className="text-text-muted text-[20px]">→</div>
            <div className="text-center">
              <HealthGauge score={81} size={112} />
              <p className="mt-2 text-[12px] text-text-muted">Scan #4 · Sep 15</p>
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
