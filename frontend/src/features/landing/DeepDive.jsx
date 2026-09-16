const flow = ['Repository evidence', 'Scanner findings', 'Relevant code context', 'CodePulse AI', 'Explanation', 'Suggested fix'];

export function DeepDive() {
  return (
    <section id="security" className="border-b border-border bg-background-elevated">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-2 lg:px-8">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-accent">Evidence first</p>
          <h3 className="mt-3 text-2xl font-semibold text-text-primary">AI sits on top of the scan, not instead of it.</h3>
          <p className="mt-2 text-[13px] leading-relaxed text-text-secondary max-w-sm">
            The assistant receives a focused slice of project metadata, scanner findings, and relevant files. Repository content is treated as untrusted input and secrets are masked.
          </p>
          <div className="mt-6 rounded-lg border border-border bg-surface p-5">
            <div className="flex flex-col items-start">
              {flow.map((step, i) => (
                <div key={step} className="flex flex-col items-start">
                  <span className={`rounded-md border px-3 py-1.5 text-[12.5px] mono ${step === 'CodePulse AI' ? 'border-accent/60 bg-accent-muted text-accent-text' : 'border-border-strong bg-background-elevated text-text-primary'}`}>
                    {step}
                  </span>
                  {i < flow.length - 1 && <span className="h-5 w-px bg-border-strong ml-4 my-0.5" />}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-[15px] font-semibold text-text-primary">Security principles developers can inspect</h3>
          <p className="mt-2 text-[13px] leading-relaxed text-text-secondary max-w-sm">
            Backend-only secrets, protected GitHub tokens, ownership checks, masked evidence, and no arbitrary repository execution.
          </p>
          <div className="mt-6 rounded-lg border border-border bg-surface p-5 font-medium">
            <div className="flex items-center justify-between border-b border-border pb-3">
                <span className="text-[12.5px] text-danger">Secret detected · value masked</span>
              <span className="text-[11px] text-text-muted mono">Evidence</span>
            </div>
            <div className="pt-3 space-y-1.5">
              <p className="text-[12.5px] text-text-secondary">
                File <span className="mono text-text-primary">src/config.js</span> · line 12
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
