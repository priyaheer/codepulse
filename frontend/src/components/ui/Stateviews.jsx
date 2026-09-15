import { cn } from '../../utils/cn';
import { Button } from './Button';

export function EmptyState({ icon, title, description, action, className }) {
  return (
    <div className={cn('flex flex-col items-center justify-center text-center py-16 px-6', className)}>
      {icon && <div className="mb-4 text-text-muted">{icon}</div>}
      <h3 className="text-[14px] font-semibold text-text-primary">{title}</h3>
      {description && <p className="mt-1.5 max-w-sm text-[13px] text-text-secondary">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

export function ErrorState({ title = 'Something went wrong', description, onRetry, className }) {
  return (
    <div className={cn('flex flex-col items-center justify-center text-center py-16 px-6', className)}>
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-danger-muted text-danger">
        !
      </div>
      <h3 className="text-[14px] font-semibold text-text-primary">{title}</h3>
      {description && <p className="mt-1.5 max-w-sm text-[13px] text-text-secondary">{description}</p>}
      {onRetry && (
        <Button variant="secondary" size="sm" className="mt-5" onClick={onRetry}>
          Try again
        </Button>
      )}
    </div>
  );
}

export function PermissionState({ title = 'GitHub access is required', description, action }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-6">
      <h3 className="text-[14px] font-semibold text-text-primary">{title}</h3>
      {description && <p className="mt-1.5 max-w-sm text-[13px] text-text-secondary">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
