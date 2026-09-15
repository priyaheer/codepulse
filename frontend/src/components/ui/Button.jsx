import { forwardRef } from 'react';
import { cn } from '../../utils/cn';

const variants = {
  primary:
    'bg-accent text-white hover:bg-accent-hover border border-transparent shadow-[var(--cp-shadow-soft)]',
  secondary:
    'bg-surface text-text-primary border border-border-strong hover:bg-surface-hover',
  ghost: 'bg-transparent text-text-secondary hover:text-text-primary hover:bg-surface-hover border border-transparent',
  danger: 'bg-danger text-white hover:opacity-90 border border-transparent',
  outline: 'bg-transparent border border-border-strong text-text-primary hover:bg-surface-hover',
};

const sizes = {
  sm: 'h-8 px-3 text-[13px] gap-1.5',
  md: 'h-9 px-4 text-[13px] gap-2',
  lg: 'h-11 px-5 text-[14px] gap-2',
};

export const Button = forwardRef(function Button(
  { className, variant = 'primary', size = 'md', as: Comp = 'button', icon, iconRight, children, ...props },
  ref
) {
  return (
    <Comp
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center rounded-md font-medium transition-colors duration-150',
        'disabled:opacity-50 disabled:pointer-events-none',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {icon}
      {children}
      {iconRight}
    </Comp>
  );
});
