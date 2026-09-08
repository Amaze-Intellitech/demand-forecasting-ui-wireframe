import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAitek } from '../context/AitekContext';
import { Solution } from '../types';
import {
  Search,
  Layers,
  Globe,
  Users,
  User,
  LogOut,
  Bell,
  ChevronDown,
  ArrowRight,
  Edit3,
  X,
  CheckCircle2
} from 'lucide-react';
import aitekLogo from '../assets/aitek_logo.png';
import plantHeroBg from '../assets/plant_hero_bg.jpg';

export const SolutionHub: React.FC = () => {
  const navigate = useNavigate();
  const { solutions, selectSolution, isSolutionAuthenticated, user, updateUserName, logout } = useAitek();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'solutions' | 'support' | 'org' | 'profile'>('solutions');
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  
  // State for editing username
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [editNameInput, setEditNameInput] = useState(user?.name || 'Siddhartha M');
  const [successToast, setSuccessToast] = useState<string | null>(null);

  const filteredSolutions = useMemo(() => {
    return solutions.filter((sol) => {
      const matchSearch =
        sol.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sol.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchSearch;
    });
  }, [solutions, searchQuery]);

  // Compute initials dynamically from detected user name (e.g. Siddhartha M -> SM)
  const userInitials = useMemo(() => {
    if (!user?.name) return 'SM';
    const parts = user.name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }, [user?.name]);

  const handleOpenSolution = (solution: Solution) => {
    if (solution.status === 'coming_soon') return;
    selectSolution(solution.id);
    if (isSolutionAuthenticated(solution.id)) {
      navigate(`/solutions/${solution.id}/data`);
    } else {
      navigate(`/solutions/${solution.id}/login`);
    }
  };

  const handleSignOut = () => {
    logout();
    navigate('/login');
  };

  const handleSaveUsername = () => {
    if (editNameInput.trim()) {
      updateUserName(editNameInput.trim());
      setIsEditingUsername(false);
      setSuccessToast(`Username updated to "${editNameInput.trim()}"`);
      setTimeout(() => setSuccessToast(null), 3500);
    }
  };

  // Solution custom icon rendering matching reference screenshot
  const renderSolutionIcon = (id: string) => {
    switch (id) {
      case 'demand-intelligence':
        // Ascending blue bars
        return (
          <div className="w-8 h-8 flex items-end gap-1 text-[#0066cc]">
            <span className="w-2 h-3.5 bg-[#0066cc] rounded-sm inline-block" />
            <span className="w-2 h-5 bg-[#0066cc] rounded-sm inline-block" />
            <span className="w-2 h-7 bg-[#0066cc] rounded-sm inline-block" />
          </div>
        );
      case 'inventory-intelligence':
        // 3D Isometric Blue Cube
        return (
          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2L3 7L12 12L21 7L12 2Z"
              fill="#0a3977"
              stroke="#0066cc"
              strokeWidth="1.2"
            />
            <path
              d="M3 7V17L12 22V12L3 7Z"
              fill="#06224c"
              stroke="#0066cc"
              strokeWidth="1.2"
            />
            <path
              d="M21 7V17L12 22V12L21 7Z"
              fill="#0066cc"
              stroke="#0066cc"
              strokeWidth="1.2"
            />
          </svg>
        );
      case 'manufacturing-excellence':
        // Industrial Factory Silhouette
        return (
          <svg className="w-8 h-8 text-[#0066cc]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M2 20h20V8l-6 4V8l-6 4V4H2v16zm2-2V6h4v6l6-4v6l6-4v8H4z" />
          </svg>
        );
      case 'cement-intelligence':
        // Blue Triangular Kiln/Pyramid
        return (
          <svg className="w-8 h-8" viewBox="0 0 24 24">
            <polygon points="12,2 3,21 12,17" fill="#0066cc" />
            <polygon points="12,2 21,21 12,17" fill="#073b75" />
          </svg>
        );
      case 'supply-chain-intelligence':
      default:
        // Connected Branching Nodes
        return (
          <svg className="w-8 h-8 text-[#0066cc]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="18" cy="5" r="3" fill="#0066cc" />
            <circle cx="6" cy="12" r="3" fill="#0066cc" />
            <circle cx="18" cy="19" r="3" fill="#0066cc" />
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
          </svg>
        );
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-between bg-[#f4f6fa] text-slate-900 font-sans select-none overflow-x-hidden">
      
      {/* Toast Notification */}
      {successToast && (
        <div className="fixed top-5 right-5 z-50 bg-emerald-950/90 text-emerald-200 border border-emerald-800 px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2.5 text-xs font-semibold backdrop-blur-md animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{successToast}</span>
        </div>
      )}

      {/* Top Flex Container: Sidebar + Main Content */}
      <div className="flex-1 flex flex-col md:flex-row min-h-0">
        
        {/* Left Dark Sidebar */}
        <aside className="w-full md:w-64 lg:w-68 bg-[#080e1a] border-r border-slate-800/80 flex flex-col justify-between p-5 z-20 flex-shrink-0">
          <div>
            {/* Top Logo */}
            <div className="pt-2 pb-6 px-1 flex items-center justify-start">
              <img
                src={aitekLogo}
                alt="AITEK"
                className="h-20 sm:h-24 w-auto object-contain filter drop-shadow-[0_0_18px_rgba(56,189,248,0.4)]"
              />
            </div>

            {/* Navigation Menu */}
            <nav className="space-y-1.5 pt-2">
              {/* Solutions (Active Tab) */}
              <button
                onClick={() => setActiveTab('solutions')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'solutions'
                    ? 'bg-[#1053b8] text-white shadow-md shadow-blue-950/40'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>Solutions</span>
              </button>

              {/* Support */}
              <button
                onClick={() => setActiveTab('support')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-medium transition-all ${
                  activeTab === 'support'
                    ? 'bg-[#1053b8] text-white'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                <Globe className="w-4 h-4" />
                <span>Support</span>
              </button>

              {/* Organization */}
              <button
                onClick={() => setActiveTab('org')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-medium transition-all ${
                  activeTab === 'org'
                    ? 'bg-[#1053b8] text-white'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                <Users className="w-4 h-4" />
                <span>Organization</span>
              </button>

              {/* Profile - Allows editing username directly */}
              <button
                onClick={() => {
                  setActiveTab('profile');
                  setEditNameInput(user?.name || 'Siddhartha M');
                  setIsEditingUsername(true);
                }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-medium transition-all ${
                  activeTab === 'profile'
                    ? 'bg-[#1053b8] text-white'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                <User className="w-4 h-4" />
                <span>Profile</span>
              </button>
            </nav>
          </div>

          {/* Bottom Sign Out */}
          <div className="pt-6 border-t border-slate-800/60">
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2.5 text-xs text-slate-400 hover:text-white transition-colors p-1"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </aside>

        {/* Right Main Content Area */}
        <main className="flex-1 min-w-0 relative flex flex-col justify-between p-6 sm:p-8 lg:p-10">
          
          {/* Top Industrial Plant Background Layer */}
          <div
            className="absolute top-0 right-0 left-0 h-[280px] sm:h-[340px] bg-cover bg-right-top bg-no-repeat pointer-events-none opacity-90 transition-opacity"
            style={{
              backgroundImage: `url(${plantHeroBg})`,
            }}
          >
            {/* Smooth gradient blend into page background */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#f4f6fa] via-[#f4f6fa]/85 to-transparent w-full md:w-3/5" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#f4f6fa]/40 to-[#f4f6fa]" />
          </div>

          <div className="relative z-10 space-y-6">
            
            {/* Top Bar Header: User Area (Notice: 'transform operate sustain together' removed per instruction) */}
            <div className="flex items-center justify-end gap-4">
              
              {/* Notification Bell */}
              <button
                type="button"
                className="p-2 text-slate-500 hover:text-slate-800 transition-colors"
                title="Notifications"
              >
                <Bell className="w-4 h-4" />
              </button>

              {/* User Avatar + Dropdown with Option to Edit Username */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                  className="flex items-center gap-2.5 hover:opacity-90 transition-opacity p-1 rounded-lg hover:bg-white/60"
                >
                  <div className="w-8 h-8 rounded-full bg-[#0c1f38] text-white font-semibold text-xs flex items-center justify-center ring-1 ring-slate-300">
                    {userInitials}
                  </div>
                  <span className="text-xs font-semibold text-slate-800 hidden sm:inline">
                    {user?.name || 'Siddhartha M'}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-600" />
                </button>

                {/* Profile dropdown */}
                {showProfileDropdown && (
                  <div
                    className="absolute right-0 mt-2 w-64 rounded-xl bg-white border border-slate-200 shadow-xl p-3 z-50 animate-in fade-in"
                    onMouseLeave={() => setShowProfileDropdown(false)}
                  >
                    <div className="border-b border-slate-100 pb-2.5 mb-2">
                      <div className="text-xs font-bold text-slate-900 flex items-center justify-between">
                        <span>{user?.name || 'Siddhartha M'}</span>
                        <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-mono">
                          {userInitials}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-500 truncate mt-0.5">
                        {user?.email || 'siddhartha.m@aitek.ai'}
                      </div>
                      <div className="text-[10px] text-blue-600 font-medium mt-1 uppercase tracking-wider">
                        {user?.orgName || 'ABC Manufacturing'}
                      </div>
                    </div>

                    {/* Option to Edit Username */}
                    <div className="space-y-1 pb-2 border-b border-slate-100">
                      <button
                        onClick={() => {
                          setShowProfileDropdown(false);
                          setEditNameInput(user?.name || 'Siddhartha M');
                          setIsEditingUsername(true);
                        }}
                        className="w-full text-left text-xs text-blue-600 hover:bg-blue-50 p-2 rounded-lg font-medium flex items-center gap-2 transition-colors"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit Display Name</span>
                      </button>
                    </div>

                    <button
                      onClick={handleSignOut}
                      className="w-full text-left text-xs text-rose-600 hover:bg-rose-50 p-2 rounded-lg font-medium flex items-center gap-2 mt-1 transition-colors"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>

            </div>

            {/* Greeting & Workspace Subtitle */}
            <div className="space-y-1 pt-2 sm:pt-4 max-w-xl">
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
                Good morning, {user?.name?.split(' ')[0] || 'Siddhartha'}
              </h1>
              <p className="text-sm sm:text-base text-slate-600 font-normal">
                Your intelligent operations workspace
              </p>
            </div>

            {/* Search Input Bar */}
            <div className="relative w-full max-w-sm sm:max-w-md pt-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search solutions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-10 sm:h-11 pl-10 pr-4 rounded-full border border-slate-200/90 bg-white/95 text-slate-900 placeholder:text-slate-400 text-xs sm:text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>

            {/* Five Solution Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-4 xl:gap-5 pt-4">
              {filteredSolutions.map((solution) => {
                const isComingSoon = solution.status === 'coming_soon';
                const isAvailable = solution.status === 'available';

                return (
                  <div
                    key={solution.id}
                    className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] flex flex-col justify-between hover:shadow-md transition-all duration-200"
                  >
                    {/* Top Content */}
                    <div>
                      {/* Icon */}
                      <div className="mb-2 flex items-center justify-start">
                        {renderSolutionIcon(solution.id)}
                      </div>

                      {/* Title */}
                      <h3 className="text-base font-bold text-slate-900 mt-3 leading-snug">
                        {solution.name}
                      </h3>

                      {/* Short Description */}
                      <p className="text-xs text-slate-500 mt-2 leading-relaxed min-h-[36px]">
                        {solution.description}
                      </p>
                    </div>

                    {/* Bottom Content: Badge + Action Button */}
                    <div className="mt-4 pt-2">
                      {/* Status Pill Badge */}
                      <div className="mb-4">
                        {isComingSoon ? (
                          <span className="bg-slate-100 border border-slate-200 text-slate-600 text-[11px] font-medium rounded-full px-3 py-0.5 inline-block">
                            Coming Soon
                          </span>
                        ) : isAvailable ? (
                          <span className="bg-blue-50 border border-blue-200 text-blue-700 text-[11px] font-medium rounded-full px-3 py-0.5 inline-block">
                            Available
                          </span>
                        ) : (
                          <span className="bg-emerald-50 border border-emerald-300 text-emerald-700 text-[11px] font-medium rounded-full px-3 py-0.5 inline-block">
                            Active
                          </span>
                        )}
                      </div>

                      {/* Action Button */}
                      {isComingSoon ? (
                        <button
                          type="button"
                          disabled
                          className="w-full py-2 px-3 rounded-lg bg-slate-100 text-slate-400 font-medium text-xs flex items-center justify-center cursor-not-allowed select-none"
                        >
                          Learn More
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleOpenSolution(solution)}
                          className="w-full py-2 px-3 rounded-lg border border-blue-300 bg-white hover:bg-blue-50/80 text-[#0066cc] font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                        >
                          <span>Open Solution</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>

                  </div>
                );
              })}
            </div>

          </div>

          {/* Spacer for bottom docked strip */}
          <div className="h-6" />

        </main>
      </div>

      {/* Bottom Docked Presentation Strip: 02 SOLUTION HUB */}
      <div className="relative z-30 w-full bg-[#080e1a] border-t border-slate-800/80 px-6 py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded bg-[#0062d2] flex items-center justify-center text-white font-bold text-xs tracking-wider">
            02
          </div>
          <div>
            <span className="font-bold text-xs text-white tracking-wider mr-2 uppercase">
              SOLUTION HUB
            </span>
            <span className="text-xs text-slate-400 hidden sm:inline">
              Explore and access the AITEK solution portfolio
            </span>
          </div>
        </div>

        <div className="text-xs text-slate-400 flex items-center gap-3 self-end sm:self-auto">
          <span>One platform. Multiple possibilities.</span>
          <div className="w-16 h-[1px] bg-slate-700 hidden md:block" />
        </div>
      </div>

      {/* Edit Username Modal */}
      {isEditingUsername && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-slate-200 space-y-4">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-sky-50 text-sky-600 border border-sky-100 flex items-center justify-center">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Edit User Display Name</h3>
                  <p className="text-xs text-slate-500">Update your operational workspace identity</p>
                </div>
              </div>
              <button
                onClick={() => setIsEditingUsername(false)}
                className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="space-y-4 pt-1">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Authenticated Email (Auto-detection source)
                </label>
                <input
                  type="text"
                  disabled
                  value={user?.email || 'siddhartha.m@aitek.ai'}
                  className="w-full h-10 px-3 rounded-lg border border-slate-200 bg-slate-50 text-slate-500 text-xs font-mono cursor-not-allowed"
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  Name was initially auto-detected from this email credential.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Workspace Display Username
                </label>
                <input
                  type="text"
                  value={editNameInput}
                  onChange={(e) => setEditNameInput(e.target.value)}
                  placeholder="e.g. Siddhartha M"
                  className="w-full h-10 px-3 rounded-lg border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
                  autoFocus
                />
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setIsEditingUsername(false)}
                className="px-4 py-2 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveUsername}
                className="px-5 py-2 rounded-lg text-xs font-semibold bg-[#0062d2] hover:bg-[#0051b3] text-white transition-colors shadow-sm"
              >
                Save Changes
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
