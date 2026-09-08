import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { Loader2 } from 'lucide-react';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 disabled:pointer-events-none disabled:opacity-50 select-none',
  {
    variants: {
      variant: {
        default:
          'bg-sky-500 text-slate-950 hover:bg-sky-400 active:bg-sky-600 font-semibold shadow-sm shadow-sky-950/50',
        primary:
          'bg-sky-500 text-slate-950 hover:bg-sky-400 active:bg-sky-600 font-semibold shadow-sm shadow-sky-950/50',
        secondary:
          'bg-slate-800 text-slate-100 hover:bg-slate-700 hover:text-white border border-slate-700/60',
        outline:
          'border border-slate-700 bg-transparent text-slate-200 hover:bg-slate-800/80 hover:text-white',
        ghost:
          'text-slate-300 hover:bg-slate-800 hover:text-white',
        destructive:
          'bg-red-600/90 text-white hover:bg-red-500 active:bg-red-700',
        subtle:
          'bg-sky-950/60 text-sky-300 border border-sky-800/50 hover:bg-sky-900/60 hover:text-sky-200',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-11 rounded-md px-6 text-base font-semibold',
        icon: 'h-9 w-9',
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
            {leftIcon && <span className="mr-2 inline-flex items-center">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="ml-2 inline-flex items-center">{rightIcon}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
