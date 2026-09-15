const tools = ['GitHub', 'ESLint', 'npm audit', 'Lighthouse', 'Sentry', 'Snyk', 'a coding assistant'];

export function Problem() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-20 grid gap-10 lg:grid-cols-2 lg:gap-16 items-start">
        <div>
          <h2 className="text-[26px] font-semibold tracking-tight text-text-primary leading-tight">
            Your tools all know something. None of them know everything.
          </h2>
        </div>
        <div>
          <p className="text-[15px] leading-relaxed text-text-secondary">
            A typical project pulls signal from {tools.length} different places —{' '}
            {tools.map((t, i) => (
              <span key={t}>
                <span className="text-text-primary">{t}</span>
                {i < tools.length - 2 ? ', ' : i === tools.length - 2 ? ', and ' : ''}
              </span>
            ))}
            . Each one is useful in isolation, but none of them tell you what actually
            matters right now. You end up with a project you know has problems, but no
            clear sense of which ones to fix first, why they matter, or what "fixed" even
            looks like.
          </p>
        </div>
      </div>
    </section>
  );
}
