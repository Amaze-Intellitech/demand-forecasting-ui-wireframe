import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Calendar,
  Bell,
  ChevronDown,
  Check,
  LogOut,
  Layers,
} from 'lucide-react';
import { useAitek } from '../../context/AitekContext';
import { DATE_RANGE_OPTIONS } from '../../data/demandIntelligenceMock';

export interface DemandTopbarProps {
  selectedDateRange: string;
  onSelectDateRange: (range: string) => void;
  onOpenNotifications?: () => void;
}

export const DemandTopbar: React.FC<DemandTopbarProps> = ({
  selectedDateRange,
  onSelectDateRange,
}) => {
  const navigate = useNavigate();
  const { user, logout } = useAitek();

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [hasUnreadNotifications, setHasUnreadNotifications] = useState(true);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  // Compute initials dynamically
  const userInitials = React.useMemo(() => {
    if (!user?.name) return 'SM';
    const parts = user.name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }, [user?.name]);

  const handleSignOut = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200/80 px-6 sm:px-8 flex items-center justify-between z-20 flex-shrink-0 select-none">
      
      {/* Left: Product Name & Tagline */}
      <div className="flex items-center gap-3">
        {/* Solution Icon: Ascending 3 Bars in Blue */}
        <div className="w-8 h-8 rounded-lg bg-sky-50 border border-sky-100 flex items-end justify-center p-1.5 gap-1">
          <span className="w-1.5 h-3 bg-[#0062d2] rounded-xs inline-block" />
          <span className="w-1.5 h-4.5 bg-[#0062d2] rounded-xs inline-block" />
          <span className="w-1.5 h-6 bg-[#0062d2] rounded-xs inline-block" />
        </div>

        <div>
          <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight leading-tight">
            Demand Intelligence
          </h1>
          <p className="text-xs text-slate-500 font-normal">
            Forecast Today. Prepare Tomorrow.
          </p>
        </div>
      </div>

      {/* Right Controls: Date Range, Notifications, User Menu */}
      <div className="flex items-center gap-3 sm:gap-4">
        
        {/* Date Range Selector Pill */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsCalendarOpen(!isCalendarOpen)}
            className="inline-flex items-center gap-2 h-9 px-3.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 shadow-xs transition-all focus:outline-none focus:ring-2 focus:ring-sky-500/20"
          >
            <Calendar className="w-3.5 h-3.5 text-slate-500" />
            <span>{selectedDateRange}</span>
          </button>

          {/* Date Range Dropdown Popover */}
          {isCalendarOpen && (
            <>
              <div
                className="fixed inset-0 z-30"
                onClick={() => setIsCalendarOpen(false)}
              />
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-slate-200 p-2 z-40 text-xs animate-in fade-in zoom-in-95 duration-100">
                <div className="px-3 py-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                  Select Planning Horizon
                </div>
                <div className="py-1 space-y-0.5">
                  {DATE_RANGE_OPTIONS.map((opt) => {
                    const isSelected = opt.label === selectedDateRange;
                    return (
                      <button
                        key={opt.label}
                        type="button"
                        onClick={() => {
                          onSelectDateRange(opt.label);
                          setIsCalendarOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-lg flex items-start justify-between gap-2 transition-colors ${
                          isSelected
                            ? 'bg-sky-50 text-sky-900 font-semibold'
                            : 'hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <div>
                          <div className="font-medium text-slate-900">{opt.label}</div>
                          <div className="text-[10px] text-slate-500">{opt.desc}</div>
                        </div>
                        {isSelected && <Check className="w-4 h-4 text-sky-600 mt-0.5" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Notifications Bell Button */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setIsNotificationsOpen(!isNotificationsOpen);
              setHasUnreadNotifications(false);
            }}
            className="w-9 h-9 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-600 shadow-xs transition-all relative focus:outline-none"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            {hasUnreadNotifications && (
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
            )}
          </button>

          {/* Notifications Popover */}
          {isNotificationsOpen && (
            <>
              <div
                className="fixed inset-0 z-30"
                onClick={() => setIsNotificationsOpen(false)}
              />
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-200 p-3 z-40 text-xs animate-in fade-in zoom-in-95 duration-100">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-2">
                  <span className="font-bold text-slate-900">Notifications</span>
                  <span className="text-[10px] text-sky-600 font-semibold cursor-pointer">
                    Mark all read
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="p-2.5 rounded-lg bg-amber-50/60 border border-amber-100 text-amber-900">
                    <div className="font-bold">Stockout Risk Warning</div>
                    <div className="text-[11px] text-amber-700 mt-0.5">
                      HDPE Resin (SKU-9021) has dropped to 12 days of cover.
                    </div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-sky-50/60 border border-sky-100 text-sky-900">
                    <div className="font-bold">Forecast Model Updated</div>
                    <div className="text-[11px] text-sky-700 mt-0.5">
                      Q3 2025 seasonal projection recalculated with 94.2% accuracy.
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* User Avatar & Context Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-lg hover:bg-slate-50 transition-colors focus:outline-none"
          >
            <div className="w-8 h-8 rounded-full bg-[#080e1a] text-white flex items-center justify-center font-bold text-xs shadow-xs border border-slate-800">
              {userInitials}
            </div>
            <span className="text-xs sm:text-sm font-semibold text-slate-800 hidden md:inline">
              {user?.name || 'Siddhartha M'}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:inline" />
          </button>

          {/* User Menu Dropdown */}
          {isUserMenuOpen && (
            <>
              <div
                className="fixed inset-0 z-30"
                onClick={() => setIsUserMenuOpen(false)}
              />
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200 p-2 z-40 text-xs animate-in fade-in zoom-in-95 duration-100">
                <div className="px-3 py-2 border-b border-slate-100 mb-1">
                  <div className="font-semibold text-slate-900">{user?.name || 'Siddhartha M'}</div>
                  <div className="text-slate-400 text-[11px] truncate">{user?.email || 'siddhartha.m@aitek.ai'}</div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setIsUserMenuOpen(false);
                    navigate('/solutions');
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-50 font-medium transition-colors text-left"
                >
                  <Layers className="w-3.5 h-3.5 text-slate-400" />
                  <span>Switch Solution Hub</span>
                </button>

                <div className="my-1 border-t border-slate-100" />

                <button
                  type="button"
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-rose-600 hover:bg-rose-50 font-medium transition-colors text-left"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            </>
          )}
        </div>

      </div>

    </header>
  );
};
