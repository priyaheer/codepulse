const flow = ['User', 'React UI', 'API service', 'Express', 'Controllers', 'Database'];

export function DeepDive() {
  return (
    <section className="border-b border-border bg-background-elevated">
      <div className="mx-auto max-w-6xl px-6 py-20 grid gap-12 lg:grid-cols-2">
        <div>
          <h3 className="text-[15px] font-semibold text-text-primary">Architecture, mapped from your code</h3>
          <p className="mt-2 text-[13px] leading-relaxed text-text-secondary max-w-sm">
            CodePulse traces imports, routes, and calls across your repository to build this —
            it's a diagram of what your code actually does, not a guess.
          </p>
          <div className="mt-6 rounded-lg border border-border bg-surface p-5">
            <div className="flex flex-col items-start">
              {flow.map((step, i) => (
                <div key={step} className="flex flex-col items-start">
                  <span className="rounded-md border border-border-strong bg-background-elevated px-3 py-1.5 text-[12.5px] mono text-text-primary">
                    {step}
                  </span>
                  {i < flow.length - 1 && <span className="h-5 w-px bg-border-strong ml-4 my-0.5" />}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-[15px] font-semibold text-text-primary">Secrets, found and masked</h3>
          <p className="mt-2 text-[13px] leading-relaxed text-text-secondary max-w-sm">
            When a credential turns up in your source, CodePulse flags exactly where it
            is — without ever displaying the value itself, to you or to the AI.
          </p>
          <div className="mt-6 rounded-lg border border-border bg-surface p-5 font-medium">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <span className="text-[12.5px] text-danger">Secret detected</span>
              <span className="text-[11px] text-text-muted mono">CP-0847</span>
            </div>
            <div className="pt-3 space-y-1.5">
              <p className="text-[12.5px] text-text-secondary">
                File <span className="mono text-text-primary">src/config.js</span> · Line 12
              </p>
              <p className="mono text-[13px] text-text-primary bg-background-elevated rounded px-2.5 py-1.5 mt-2 inline-block">
                sk_live_************************
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
