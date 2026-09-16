export function AIInsights() {
  return (
    <section id="ai-intelligence" className="border-b border-border bg-background-elevated">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 lg:grid-cols-2 lg:px-8">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-accent">Repository-aware AI</p>
          <h2 className="mt-3 text-[26px] font-semibold tracking-tight text-text-primary max-w-md">
            Ask questions about your actual codebase.
          </h2>
          <p className="mt-3 text-[14px] leading-relaxed text-text-secondary max-w-md">
            CodePulse AI uses scanner findings and relevant repository files to explain what matters. If the evidence is insufficient, it says so.
          </p>
        </div>

          <div className="rounded-lg border border-border bg-surface p-5">
          <p className="text-[11px] uppercase tracking-[0.12em] text-text-muted">Example AI analysis</p><p className="mt-3 text-[13px] text-text-secondary">Why is this authentication issue important?</p>
          <div className="mt-3 rounded-md bg-background-elevated border border-border p-4">
            <p className="text-[13px] leading-relaxed text-text-primary">
              Based on the detected finding in <span className="mono">src/auth/...</span>, the current implementation exposes a risk that should be reviewed before deployment.
            </p>
            <ol className="mt-2 space-y-1.5 text-[13px] text-text-secondary list-decimal list-inside">
                <li>Evidence: <span className="mono text-text-primary">src/auth/...</span></li><li>Why it matters: review the detected authentication boundary.</li><li>Recommendation: inspect the related files before making a change.</li>
            </ol>
            <p className="mt-2.5 text-[13px] text-text-secondary">I'd start with #1.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
