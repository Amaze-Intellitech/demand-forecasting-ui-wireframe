import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-sm text-[13px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface disabled:pointer-events-none disabled:opacity-50 select-none',
  {
    variants: {
      variant: {
        default: 'bg-primary-solid text-white hover:bg-[var(--primary-hover)] border border-primary-solid hover:border-[var(--primary-hover)] shadow-sm',
        primary: 'bg-primary-solid text-white hover:bg-[var(--primary-hover)] border border-primary-solid hover:border-[var(--primary-hover)] shadow-sm',
        accent: 'bg-primary-solid text-white hover:bg-[var(--primary-hover)] border border-primary-solid hover:border-[var(--primary-hover)] shadow-sm',
        deep: 'bg-deep text-white hover:bg-primary-solid border border-transparent shadow-sm',
        outline: 'border border-border-strong bg-surface text-ink hover:border-primary hover:text-primary',
        secondary: 'bg-muted-fill text-ink hover:bg-border border border-border',
        ghost: 'text-ink hover:bg-muted-fill border border-transparent',
        destructive: 'bg-error-bg text-error-tx border border-transparent hover:bg-error hover:text-white',
        subtle: 'bg-info-bg text-info-tx border border-primary/20 hover:bg-primary/10',
        link: 'text-primary underline underline-offset-4 hover:text-ink p-0 h-auto',
      },
      size: {
        default: 'h-9 px-3.5 py-2 gap-1.5',
        sm: 'h-7 px-2.5 py-1 text-xs gap-1',
        md: 'h-9 px-3.5 py-2 text-[13px] gap-1.5',
        lg: 'h-10 px-5 py-2.5 text-sm gap-2',
        icon: 'h-8 w-8 p-0',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading, leftIcon, rightIcon, children, disabled, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin text-current" />
            <span>Processing...</span>
          </>
        ) : (
          <>
            {leftIcon && <span className="mr-1.5 inline-flex items-center">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="ml-1.5 inline-flex items-center">{rightIcon}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { buttonVariants };
