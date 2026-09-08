import React, { useState } from 'react';
import { cn } from '../../lib/utils';
import logoImg from '../../assets/aitek_logo.png';
import { Cpu } from 'lucide-react';

interface AitekLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
}

export const AitekLogo: React.FC<AitekLogoProps> = ({
  className,
  size = 'md',
  showSubtitle = false,
}) => {
  const [imgError, setImgError] = useState(false);

  const sizeClasses = {
    sm: 'h-6',
    md: 'h-8',
    lg: 'h-11',
  };

  return (
    <div className={cn('inline-flex items-center gap-3', className)}>
      {!imgError ? (
        <img
          src={logoImg}
          alt="AITEK Logo"
          className={cn('object-contain filter brightness-110 drop-shadow-[0_0_12px_rgba(14,165,233,0.3)]', sizeClasses[size])}
          onError={() => setImgError(true)}
        />
      ) : (
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-md bg-gradient-to-br from-sky-500 to-sky-700 flex items-center justify-center text-slate-950 font-bold shadow-sm">
            <Cpu className="w-5 h-5 text-slate-950" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">
            AITEK<span className="text-sky-400">.</span>
          </span>
        </div>
      )}

      {showSubtitle && (
        <div className="hidden sm:flex flex-col border-l border-slate-800 pl-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-200">
            Platform
          </span>
          <span className="text-[10px] text-slate-400">
            Enterprise Operations AI
          </span>
        </div>
      )}
    </div>
  );
};
