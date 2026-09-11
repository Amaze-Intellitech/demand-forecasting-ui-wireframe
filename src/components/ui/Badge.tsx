import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 font-semibold rounded-full select-none',
  {
    variants: {
      variant: {
        success: 'bg-success-bg text-success-tx',
        warning: 'bg-warning-bg text-warning-tx',
        error: 'bg-error-bg text-error-tx',
        info: 'bg-info-bg text-info-tx',
        neutral: 'bg-neutral-bg text-neutral-tx',
      },
      size: {
        sm: 'px-2 py-0.5 text-[11px]',
        md: 'px-2.5 py-1 text-xs',
      },
    },
    defaultVariants: {
      variant: 'neutral',
      size: 'md',
    },
  }
);

const dotColor: Record<string, string> = {
  success: 'bg-success',
  warning: 'bg-warning',
  error: 'bg-error',
  info: 'bg-primary',
  neutral: 'bg-subtle',
};

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  dot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({ className, variant = 'neutral', size, dot = true, children, ...props }) => {
  return (
    <span className={cn(badgeVariants({ variant, size, className }))} {...props}>
      {dot && <span className={cn('w-1.5 h-1.5 rounded-full flex-shrink-0', dotColor[variant ?? 'neutral'])} />}
      <span>{children}</span>
    </span>
  );
};
