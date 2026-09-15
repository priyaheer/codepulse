import { cn } from '../../utils/cn';

const severityMap = {
  critical: { label: 'Critical', color: 'var(--cp-critical)', bg: 'var(--cp-danger-muted)' },
  high: { label: 'High', color: 'var(--cp-high)', bg: 'var(--cp-warning-muted)' },
  medium: { label: 'Medium', color: 'var(--cp-medium)', bg: 'var(--cp-warning-muted)' },
  low: { label: 'Low', color: 'var(--cp-low)', bg: 'var(--cp-info-muted)' },
  resolved: { label: 'Resolved', color: 'var(--cp-resolved)', bg: 'var(--cp-success-muted)' },
};

export function SeverityBadge({ severity = 'low', className }) {
  const entry = severityMap[severity] || severityMap.low;
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11.5px] font-medium',
        className
      )}
      style={{ color: entry.color, backgroundColor: entry.bg }}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: entry.color }} />
      {entry.label}
    </span>
  );
}

/**
 * Distinguishes the provenance of a finding — core to product trust.
 * "detected": real scanner output. "ai-insight": AI-generated. "potential": possible, unconfirmed.
 */
const originMap = {
  detected: { label: 'Detected', color: 'var(--cp-text-secondary)' },
  'ai-insight': { label: 'AI insight', color: 'var(--cp-accent)' },
  potential: { label: 'Potential', color: 'var(--cp-warning)' },
};

export function OriginBadge({ type = 'detected', className }) {
  const entry = originMap[type] || originMap.detected;
  return (
    <span
      className={cn(
        'inline-flex items-center rounded border px-1.5 py-0.5 text-[11px] font-medium',
        className
      )}
      style={{ color: entry.color, borderColor: 'var(--cp-border-strong)' }}
    >
      {entry.label}
    </span>
  );
}

export function Badge({ className, variant = 'neutral', children }) {
  const variants = {
    neutral: 'bg-surface-hover text-text-secondary border border-border-strong',
    accent: 'bg-accent-muted text-accent-text',
    success: 'bg-success-muted text-success',
    warning: 'bg-warning-muted text-warning',
    danger: 'bg-danger-muted text-danger',
  };
  return (
    <span className={cn('inline-flex items-center rounded-full px-2 py-0.5 text-[11.5px] font-medium', variants[variant], className)}>
      {children}
    </span>
  );
}
