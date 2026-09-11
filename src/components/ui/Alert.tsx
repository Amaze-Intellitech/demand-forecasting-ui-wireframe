import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const alertVariants = cva('flex gap-3 rounded-md border-l-[3px] p-4', {
  variants: {
    variant: {
      success: 'bg-success-bg border-success',
      warning: 'bg-warning-bg border-warning',
      error: 'bg-error-bg border-error',
      info: 'bg-info-bg border-primary',
    },
  },
  defaultVariants: {
    variant: 'info',
  },
});

const titleColor: Record<string, string> = {
  success: 'text-success-tx',
  warning: 'text-warning-tx',
  error: 'text-error-tx',
  info: 'text-info-tx',
};

export interface AlertProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'>,
    VariantProps<typeof alertVariants> {
  title?: React.ReactNode;
  icon?: React.ReactNode;
}

export const Alert: React.FC<AlertProps> = ({ className, variant = 'info', title, icon, children, ...props }) => {
  return (
    <div className={cn(alertVariants({ variant, className }))} {...props}>
      {icon && <div className="flex-shrink-0 mt-0.5">{icon}</div>}
      <div className="min-w-0">
        {title && <h4 className={cn('text-sm font-semibold mb-0.5', titleColor[variant ?? 'info'])}>{title}</h4>}
        {children && <div className="text-sm text-body">{children}</div>}
      </div>
    </div>
  );
};
