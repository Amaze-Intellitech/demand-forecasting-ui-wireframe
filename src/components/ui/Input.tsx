import * as React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: React.ReactNode;
  rightElement?: React.ReactNode;
  error?: string;
  helperText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, leftIcon, rightElement, error, helperText, ...props }, ref) => {
    return (
      <div className="w-full space-y-1">
        <div className="relative flex items-center w-full">
          {leftIcon && (
            <div className="absolute left-3 flex items-center pointer-events-none text-subtle">
              {leftIcon}
            </div>
          )}
          <input
            type={type}
            className={cn(
              'flex h-9 w-full rounded-sm border border-border bg-surface px-3 py-1.5 text-[13.5px] text-ink shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-subtle focus-visible:outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-info-bg disabled:cursor-not-allowed disabled:opacity-50',
              leftIcon && 'pl-9',
              rightElement && 'pr-9',
              error && 'border-error focus-visible:border-error focus-visible:ring-error-bg',
              className
            )}
            ref={ref}
            {...props}
          />
          {rightElement && (
            <div className="absolute right-2 flex items-center">
              {rightElement}
            </div>
          )}
        </div>
        {(error || helperText) && (
          <p className={cn('text-xs', error ? 'text-error-tx font-medium' : 'text-subtle')}>
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';
