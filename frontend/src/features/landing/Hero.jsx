import { motion } from 'framer-motion';
import { ArrowRight, PlayCircle, Github, ShieldCheck, ScanLine, Bot, GitBranch } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';

export function Hero() {
  return (
    <section id="product" className="relative overflow-hidden border-b border-border">
      <div className="mx-auto max-w-7xl px-5 pb-20 pt-16 lg:px-8 lg:pb-24 lg:pt-24">
        <div className="grid gap-14 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
          <div>
            <div className="mb-5 flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-accent"><span className="h-1.5 w-1.5 rounded-full bg-accent" /> Codebase intelligence</div>
            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-[40px] sm:text-[52px] leading-[1.05] font-semibold tracking-tight text-text-primary"
            >
              Understand your code.
              <br />
              Improve it with confidence.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08 }}
              className="mt-5 max-w-md text-[16px] leading-relaxed text-text-secondary"
            >
              CodePulse AI analyzes your GitHub repositories for code quality, security, dependencies, performance, and architecture — then helps you understand what to fix and why.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.16 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <Button as={Link} to="/login" size="lg" iconRight={<ArrowRight size={16} />}>
                Sign in with GitHub
              </Button>
              <Button as={Link} to="/demo" variant="outline" size="lg" icon={<PlayCircle size={16} />}>
                Explore demo
              </Button>
            </motion.div>
            <p className="mt-4 text-[12.5px] text-text-muted">
              Read-only repository access. Evidence from the code, not invented metrics.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="overflow-hidden rounded-lg border border-border bg-background-elevated shadow-[var(--cp-shadow-medium)]">
              <div className="flex items-center justify-between border-b border-border px-4 py-3"><div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-success" /><span className="mono text-[11px] text-text-primary">Example scan</span></div><span className="rounded border border-border px-2 py-1 text-[10px] text-text-muted">Demo repository</span>
              </div>
              <div className="grid gap-5 p-5 sm:grid-cols-[0.8fr_1.2fr]">
                <div className="rounded-md border border-border bg-surface p-4"><p className="text-[11px] uppercase tracking-[0.12em] text-text-muted">Repository health</p><div className="mt-3 flex items-end gap-2"><span className="text-5xl font-semibold tabular-nums text-text-primary">95</span><span className="pb-1 text-xs text-success">Healthy</span></div><div className="mt-5 grid grid-cols-4 gap-2">{[['0','Critical','text-danger'],['2','High','text-high'],['8','Medium','text-medium'],['7','Low','text-low']].map(([value,label,tone]) => <div key={label}><p className={`text-lg font-semibold ${tone}`}>{value}</p><p className="text-[10px] text-text-muted">{label}</p></div>)}</div></div>
                <div className="space-y-3"><div className="grid grid-cols-3 gap-2">{[[ShieldCheck,'Security','2'],[ScanLine,'Dependencies','3'],[GitBranch,'Performance','1']].map(([Icon,label,value]) => <div key={label} className="rounded-md border border-border bg-surface p-3"><Icon size={15} className="text-accent" /><p className="mt-3 text-[11px] text-text-muted">{label}</p><p className="mt-1 text-xl font-semibold text-text-primary">{value}</p></div>)}</div><div className="rounded-md border border-border bg-surface p-3"><div className="flex items-center gap-2"><Bot size={15} className="text-accent" /><p className="text-[11px] text-text-muted">Recent findings</p></div><div className="mt-3 space-y-2 text-[11px]"><div className="flex justify-between gap-3 border-t border-border pt-2"><span className="text-text-primary">Authentication boundary</span><span className="text-high">High</span></div><div className="flex justify-between gap-3 border-t border-border pt-2"><span className="text-text-primary">Floating dependency</span><span className="text-medium">Medium</span></div></div></div></div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
