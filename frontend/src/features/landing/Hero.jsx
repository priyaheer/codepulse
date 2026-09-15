import { motion } from 'framer-motion';
import { ArrowRight, PlayCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { HealthGauge } from '../../charts/HealthGauge';
import { PulseLine } from '../../charts/PulseLine';
import { SeverityBadge } from '../../components/ui/Badge';

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="mx-auto max-w-6xl px-6 pt-20 pb-24 lg:pt-28 lg:pb-32">
        <div className="grid gap-14 lg:grid-cols-[1.05fr_1fr] lg:items-center">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-[40px] sm:text-[52px] leading-[1.05] font-semibold tracking-tight text-text-primary"
            >
              Your codebase.
              <br />
              Understood.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08 }}
              className="mt-5 max-w-md text-[16px] leading-relaxed text-text-secondary"
            >
              AI-powered code health analysis for modern development teams. Real static
              analysis finds what's wrong. AI explains why it matters and what to do next.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.16 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <Button as={Link} to="/login" size="lg" iconRight={<ArrowRight size={16} />}>
                Analyze your repository
              </Button>
              <Button as={Link} to="/demo" variant="outline" size="lg" icon={<PlayCircle size={16} />}>
                Explore demo
              </Button>
            </motion.div>
            <p className="mt-4 text-[12.5px] text-text-muted">
              No credit card. Read-only repository access. Disconnect anytime.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="rounded-xl border border-border bg-background-elevated shadow-[var(--cp-shadow-medium)] overflow-hidden">
              <div className="flex items-center gap-1.5 border-b border-border px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
                <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
                <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
                <span className="ml-2 text-[11.5px] text-text-muted mono">acme/dashboard-app</span>
              </div>

              <div className="p-5 flex flex-col gap-5">
                <div className="flex items-center gap-5">
                  <HealthGauge score={82} size={104} />
                  <div>
                    <p className="text-[12px] text-text-secondary">Project health</p>
                    <p className="text-[13px] text-success mt-0.5">↑ 8 points from last scan</p>
                    <div className="mt-2 flex gap-1.5">
                      <SeverityBadge severity="critical" />
                      <SeverityBadge severity="medium" />
                    </div>
                  </div>
                </div>

                <div className="rounded-md border border-border bg-surface p-3">
                  <p className="text-[11.5px] text-text-muted mb-1">Health trend</p>
                  <PulseLine height={64} />
                </div>

                <div className="rounded-md border border-border bg-surface p-3">
                  <p className="text-[11.5px] text-text-muted mb-2">Top priority</p>
                  <p className="text-[13px] font-medium text-text-primary">Exposed API credential</p>
                  <p className="text-[12px] text-text-secondary mt-1 leading-relaxed">
                    Accessible from client-side code in <span className="mono">src/config.js</span>.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
