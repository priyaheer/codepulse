export function AIInsights() {
  return (
    <section className="border-b border-border bg-background-elevated">
      <div className="mx-auto max-w-6xl px-6 py-20 grid gap-12 lg:grid-cols-2 items-center">
        <div>
          <h2 className="text-[26px] font-semibold tracking-tight text-text-primary max-w-md">
            Ask it anything about your code.
          </h2>
          <p className="mt-3 text-[14px] leading-relaxed text-text-secondary max-w-md">
            The assistant knows your selected project, file, and scan results — it answers
            from what was actually found, and says so plainly when it wasn't enough to go on.
          </p>
        </div>

        <div className="rounded-lg border border-border bg-surface p-5">
          <p className="text-[13px] text-text-secondary">Why is my dashboard slow?</p>
          <div className="mt-3 rounded-md bg-background-elevated border border-border p-4">
            <p className="text-[13px] leading-relaxed text-text-primary">
              I found three likely contributors:
            </p>
            <ol className="mt-2 space-y-1.5 text-[13px] text-text-secondary list-decimal list-inside">
              <li>
                <span className="mono text-text-primary">Dashboard.jsx</span> makes multiple API calls on mount.
              </li>
              <li>
                <span className="mono text-text-primary">stats.js</span> fetches data separately instead of batching.
              </li>
              <li>Chart rendering processes a large dataset without memoization.</li>
            </ol>
            <p className="mt-2.5 text-[13px] text-text-secondary">I'd start with #1.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
