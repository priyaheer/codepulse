const steps = [
  { n: '01', title: 'Connect', text: 'Sign in with GitHub and pick a repository. Read-only access, nothing more.' },
  { n: '02', title: 'Scan', text: 'ESLint, npm audit, and custom static rules run against the real code — no guessing.' },
  { n: '03', title: 'Understand', text: 'AI explains each finding in plain language and ranks what actually needs attention.' },
  { n: '04', title: 'Fix', text: 'Review a suggested fix and diff for each issue. Nothing changes without your approval.' },
  { n: '05', title: 'Improve', text: 'Rescan and watch the health score move. Every change is measured, not assumed.' },
];

export function Process() {
  return (
    <section className="border-b border-border bg-background-elevated">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="text-[26px] font-semibold tracking-tight text-text-primary max-w-md">
          One loop, run as often as you need it.
        </h2>

        <div className="mt-12 grid gap-8 md:grid-cols-5">
          {steps.map((step, i) => (
            <div key={step.n} className="relative">
              <div className="flex items-center gap-3 md:block">
                <span className="mono text-[13px] text-text-muted">{step.n}</span>
                <div className="hidden md:block h-px flex-1 bg-border mt-3 mb-4" />
              </div>
              <h3 className="mt-2 text-[15px] font-semibold text-text-primary">{step.title}</h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-text-secondary">{step.text}</p>
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-[7px] left-[calc(100%-8px)] w-4 h-px bg-border-strong" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
