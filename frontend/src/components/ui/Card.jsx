import { cn } from '../../utils/cn';

export function Card({ className, children, hoverable = false, ...props }) {
  return (
    <div
      className={cn(
        'rounded-lg border border-border bg-surface',
        hoverable && 'transition-colors duration-150 hover:bg-surface-hover hover:border-border-strong',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className, title, description, action, ...props }) {
  return (
    <div className={cn('flex items-start justify-between gap-4 p-4 border-b border-border', className)} {...props}>
      <div className="min-w-0">
        <h3 className="text-[14px] font-semibold text-text-primary truncate">{title}</h3>
        {description && <p className="text-[12.5px] text-text-secondary mt-0.5">{description}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

export function CardBody({ className, children, ...props }) {
  return (
    <div className={cn('p-4', className)} {...props}>
      {children}
    </div>
  );
}
