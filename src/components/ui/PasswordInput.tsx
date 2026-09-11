import React, { useState } from 'react';
import { Input, InputProps } from './Input';
import { Eye, EyeOff, Lock } from 'lucide-react';

export const PasswordInput = React.forwardRef<HTMLInputElement, Omit<InputProps, 'type' | 'rightElement'>>(
  ({ leftIcon = <Lock className="h-4 w-4" />, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <Input
        type={showPassword ? 'text' : 'password'}
        leftIcon={leftIcon}
        rightElement={
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-subtle hover:text-deep focus:outline-none focus:text-primary transition-colors p-1"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            tabIndex={-1}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        }
        ref={ref}
        {...props}
      />
    );
  }
);

PasswordInput.displayName = 'PasswordInput';
