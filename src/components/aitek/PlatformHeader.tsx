import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AitekLogo } from './AitekLogo';
import { useAitek } from '../../context/AitekContext';
import {
  LogOut,
  ChevronRight,
  Layers,
  Database,
  Building2,
  HelpCircle,
  Menu,
  X,
  Lock
} from 'lucide-react';
import { Button } from '../ui/Button';

export const PlatformHeader: React.FC = () => {
  const { user, logout, selectedSolution } = useAitek();
  const navigate = useNavigate();
  const location = useLocation();
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isSolutionsHub = location.pathname === '/solutions';
  const isSolutionLogin = location.pathname.includes('/login') && location.pathname.startsWith('/solutions/');
  const isDataIngestion = location.pathname.includes('/data');

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/90 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Left: Brand + Breadcrumbs */}
        <div className="flex items-center gap-4">
          <Link to="/solutions" className="flex items-center gap-2 group transition-opacity hover:opacity-90">
            <AitekLogo size="md" showSubtitle />
          </Link>

          {/* Breadcrumb Context */}
          <div className="hidden md:flex items-center text-sm font-medium text-slate-400">
            <ChevronRight className="w-4 h-4 mx-2 text-slate-600" />
            
            {isSolutionsHub ? (
              <span className="text-slate-200 font-semibold flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-sky-400" />
                Solution Hub
              </span>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/solutions"
                  className="hover:text-slate-200 transition-colors flex items-center gap-1"
                >
                  Solutions
                </Link>
                <ChevronRight className="w-4 h-4 text-slate-600" />
                <span className="text-sky-400 font-semibold flex items-center gap-1.5 bg-sky-950/40 border border-sky-800/40 px-2 py-0.5 rounded">
                  {selectedSolution?.name || 'Solution'}
                </span>
                
                {isDataIngestion && (
                  <>
                    <ChevronRight className="w-4 h-4 text-slate-600" />
                    <span className="text-slate-200 font-medium flex items-center gap-1">
                      <Database className="w-3.5 h-3.5 text-emerald-400" />
                      Data Ingestion
                    </span>
                  </>
                )}

                {isSolutionLogin && (
                  <>
                    <ChevronRight className="w-4 h-4 text-slate-600" />
                    <span className="text-slate-200 font-medium flex items-center gap-1">
                      <Lock className="w-3.5 h-3.5 text-amber-400" />
                      Authentication
                    </span>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right: Quick actions & User Profile */}
        <div className="hidden sm:flex items-center gap-4">
          {/* Org tag */}
          <div className="hidden lg:flex items-center gap-2 text-xs text-slate-400 bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-full">
            <Building2 className="w-3.5 h-3.5 text-sky-400" />
            <span className="font-semibold text-slate-300">
              {user?.orgName || 'Acme Global Manufacturing Corp'}
            </span>
            <span className="text-slate-600">|</span>
            <span className="font-mono text-slate-400">
              {user?.orgId || 'ORG-8842'}
            </span>
          </div>

          <a
            href="#help"
            onClick={(e) => {
              e.preventDefault();
              alert('AITEK Enterprise Help & Support: 24/7 Priority SLA active.');
            }}
            className="text-slate-400 hover:text-slate-200 transition-colors p-1.5 rounded-md hover:bg-slate-900"
            title="Help & Documentation"
          >
            <HelpCircle className="w-4 h-4" />
          </a>

          {/* User Profile Avatar with dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowUserDropdown(!showUserDropdown)}
              className="flex items-center gap-3 p-1.5 rounded-lg hover:bg-slate-900 border border-transparent hover:border-slate-800 transition-colors text-left"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-sky-600 to-indigo-600 flex items-center justify-center font-bold text-xs text-white ring-2 ring-slate-800">
                {user?.name ? user.name.split(' ').map(n => n[0]).join('') : 'AC'}
              </div>
              <div className="hidden xl:block leading-tight">
                <div className="text-xs font-semibold text-slate-200">
                  {user?.name || 'Alex Chen'}
                </div>
                <div className="text-[11px] text-slate-400 truncate max-w-[140px]">
                  {user?.role || 'Supply Operations'}
                </div>
              </div>
            </button>

            {/* Dropdown Menu */}
            {showUserDropdown && (
              <div
                className="absolute right-0 mt-2 w-64 rounded-lg bg-slate-900 border border-slate-800 shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-1"
                onMouseLeave={() => setShowUserDropdown(false)}
              >
                <div className="px-4 py-2 border-b border-slate-800">
                  <p className="text-xs font-semibold text-slate-200">{user?.name || 'Alex Chen'}</p>
                  <p className="text-[11px] text-slate-400 truncate">{user?.email || 'alex.chen@enterprise.aitek.ai'}</p>
                  <div className="mt-1.5 inline-flex items-center gap-1 text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-sky-950/80 text-sky-300 border border-sky-800/40">
                    Enterprise Admin
                  </div>
                </div>

                <div className="py-1">
                  <Link
                    to="/solutions"
                    onClick={() => setShowUserDropdown(false)}
                    className="flex items-center gap-2 px-4 py-2 text-xs text-slate-300 hover:bg-slate-800 hover:text-white"
                  >
                    <Layers className="w-3.5 h-3.5 text-slate-400" />
                    Solution Hub Directory
                  </Link>

                  {selectedSolution && (
                    <Link
                      to={`/solutions/${selectedSolution.id}/data`}
                      onClick={() => setShowUserDropdown(false)}
                      className="flex items-center gap-2 px-4 py-2 text-xs text-slate-300 hover:bg-slate-800 hover:text-white"
                    >
                      <Database className="w-3.5 h-3.5 text-emerald-400" />
                      Active Ingestion ({selectedSolution.name})
                    </Link>
                  )}
                </div>

                <div className="border-t border-slate-800 pt-1">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-2 text-xs text-red-400 hover:bg-red-950/30 hover:text-red-300 transition-colors text-left"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    Sign Out of AITEK Platform
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mobile menu button */}
        <div className="flex sm:hidden items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-400 hover:text-white"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile nav dropdown */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-b border-slate-800 bg-slate-900 px-4 pt-2 pb-4 space-y-3">
          <div className="text-xs text-slate-400">
            Signed in as <span className="font-semibold text-slate-200">{user?.name || 'Alex Chen'}</span>
          </div>
          <div className="flex flex-col space-y-2">
            <Link
              to="/solutions"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm text-slate-200 hover:text-sky-400 py-1"
            >
              Solutions Hub
            </Link>
            {selectedSolution && (
              <Link
                to={`/solutions/${selectedSolution.id}/data`}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm text-slate-200 hover:text-sky-400 py-1"
              >
                Data Ingestion ({selectedSolution.name})
              </Link>
            )}
            <Button
              variant="destructive"
              size="sm"
              onClick={handleLogout}
              className="w-full mt-2"
              leftIcon={<LogOut className="w-3.5 h-3.5" />}
            >
              Sign Out
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};
