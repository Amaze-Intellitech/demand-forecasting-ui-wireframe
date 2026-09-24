import React, { useState, useEffect } from 'react';
import { Maximize2, Minimize2, X } from 'lucide-react';

export interface ExpandableCardProps {
  title?: string;
  subtitle?: string;
  badge?: React.ReactNode;
  headerActions?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  modalClassName?: string;
  clickToExpand?: boolean;
}

export const ExpandableCard: React.FC<ExpandableCardProps> = ({
  title,
  subtitle,
  badge,
  headerActions,
  children,
  className = '',
  modalClassName = '',
  clickToExpand = true,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isExpanded) {
        setIsExpanded(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isExpanded]);

  useEffect(() => {
    if (isExpanded) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isExpanded]);

  const handleCardClick = (e: React.MouseEvent) => {
    if (!clickToExpand) return;
    const target = e.target as HTMLElement | null;
    // Do not expand if user clicked an interactive control (buttons, links, inputs, dropdowns)
    if (target?.closest('button, a, input, select, textarea, [role="button"], [data-no-expand]')) {
      return;
    }
    setIsExpanded(true);
  };

  return (
    <>
      {/* Normal In-Grid Card View */}
      <div
        className={`relative group ${className} ${clickToExpand ? 'cursor-pointer' : ''}`}
        onClick={handleCardClick}
      >
        {/* Expand Trigger Button (top-right overlay or header companion) */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setIsExpanded(true);
          }}
          className="absolute top-3 right-3 z-20 w-7 h-7 rounded-lg bg-white/95 hover:bg-blue-50 border border-slate-200/90 text-slate-400 hover:text-[#0062d2] flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 shadow-2xs hover:shadow-xs focus:opacity-100"
          title="Maximize card view"
          aria-label="Maximize card view"
        >
          <Maximize2 className="w-3.5 h-3.5" />
        </button>

        {children}
      </div>

      {/* Maximized Foreground Modal with Blurred Background */}
      {isExpanded && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 lg:p-8 animate-in fade-in duration-200 select-none"
          onClick={() => setIsExpanded(false)}
        >
          <div
            className={`w-full max-w-5xl xl:max-w-6xl max-h-[92vh] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden text-slate-900 animate-in zoom-in-95 duration-200 ${modalClassName}`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Maximized Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/80 shrink-0">
              <div className="flex items-center gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    {title ? (
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                        {title}
                      </h3>
                    ) : (
                      <span className="text-sm font-bold text-slate-800 tracking-tight">
                        AITEK Operational Intelligence
                      </span>
                    )}
                    <span className="px-2 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-[10px] font-semibold">
                      Maximized View
                    </span>
                    {badge}
                  </div>
                  {subtitle && (
                    <p className="text-xs text-slate-500 mt-0.5 font-normal">
                      {subtitle}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                {headerActions}
                <button
                  type="button"
                  onClick={() => setIsExpanded(false)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-xs font-semibold text-slate-700 transition-colors shadow-2xs"
                  title="Minimize (Esc)"
                >
                  <Minimize2 className="w-3.5 h-3.5 text-slate-500" />
                  <span>Minimize</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsExpanded(false)}
                  className="w-8 h-8 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-slate-500 hover:text-slate-900 flex items-center justify-center transition-colors shadow-2xs"
                  title="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Maximized Modal Content */}
            <div className="p-6 sm:p-7 overflow-y-auto flex-1 select-text [&>div]:border-0 [&>div]:shadow-none [&>div]:p-0">
              {children}
            </div>

            {/* Bottom Footer Notice */}
            <div className="px-6 py-3 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between text-xs text-slate-400">
              <span>AITEK Operational Intelligence • Interactive Maximized View</span>
              <span>Press <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded font-mono text-[11px] text-slate-600">Esc</kbd> to minimize</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
