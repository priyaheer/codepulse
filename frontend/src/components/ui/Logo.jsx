import { cn } from '../../utils/cn';

export function Logo({ className, showWordmark = true, size = 22 }) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        <rect width="32" height="32" rx="7" fill="var(--cp-background-elevated)" stroke="var(--cp-border-strong)" />
        <path
          d="M5 17h4.2l2.3-6.4L15.8 24l3.4-11.4 2 4.4H27"
          stroke="var(--cp-pulse)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
      {showWordmark && (
        <span className="text-[15px] font-semibold tracking-tight text-text-primary">
          CodePulse<span className="text-accent">AI</span>
        </span>
      )}
    </div>
  );
}
