import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAitek } from '../context/AitekContext';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Landmark,
  KeyRound,
  AlertCircle
} from 'lucide-react';
import earthBg from '../assets/earth_bg.jpg';
import aitekLogo from '../assets/aitek_logo.png';

export const PlatformLogin: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAitek();

  const [email, setEmail] = useState('siddhartha.m@aitek.ai');
  const [password, setPassword] = useState('EnterpriseDemo2026!');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [showForgotModal, setShowForgotModal] = useState(false);

  const validate = () => {
    let isValid = true;
    setEmailError(null);
    setError(null);

    if (!email.trim()) {
      setEmailError('Work email or user ID is required');
      isValid = false;
    } else if (!email.includes('@') && !email.startsWith('USR-')) {
      setEmailError('Please enter a valid work email or User ID');
      isValid = false;
    }

    if (!password) {
      setError('Password is required');
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    try {
      await login(email);
      navigate('/solutions');
    } catch {
      setError('Authentication failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSsoLogin = async () => {
    setIsLoading(true);
    try {
      await login(email || 'siddhartha.m@aitek.ai');
      navigate('/solutions');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-slate-950 font-sans select-none">
      
      {/* Cinematic Earth Background */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-105"
        style={{
          backgroundImage: `url(${earthBg})`,
        }}
      >
        {/* Subtle dark gradient overlay to ensure contrast and perfect aesthetic depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/40 to-slate-950/20" />
        <div className="absolute inset-0 bg-slate-950/15 backdrop-brightness-95" />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-6 sm:px-10 lg:px-12 py-8 sm:py-12 flex flex-col justify-between">
        
        {/* Top Header Row: Logo */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src={aitekLogo}
              alt="AITEK"
              className="h-20 sm:h-24 lg:h-28 w-auto object-contain filter drop-shadow-[0_0_20px_rgba(56,189,248,0.4)]"
            />
          </div>
          {/* Note: 'trusted by industry leaders worldwide' is deliberately omitted per user instruction */}
        </div>

        {/* Center Grid: Left Headline & Right Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center my-auto py-6 sm:py-10">
          
          {/* Left Column: Hero Text & Features */}
          <div className="lg:col-span-7 space-y-8 pr-0 lg:pr-6">
            <div className="space-y-4 max-w-xl">
              <h1 className="text-4xl sm:text-5xl lg:text-[52px] font-bold text-white tracking-tight leading-[1.12]">
                Intelligence<br />
                for a Smarter,<br />
                More Resilient<br />
                Tomorrow
              </h1>

              <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-md pt-2">
                AI-powered solutions for manufacturing, supply chain and beyond.
              </p>
            </div>

            {/* Three Key Value Icons */}
            <div className="flex flex-wrap items-center gap-6 sm:gap-10 pt-4">
              {/* Item 1: Optimize Operations */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full border border-sky-400/30 bg-sky-950/40 flex items-center justify-center text-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.2)]">
                  <svg className="w-5 h-5 text-sky-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="3" />
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                  </svg>
                </div>
                <div className="text-xs sm:text-sm text-slate-200 font-medium leading-tight">
                  <div>Optimize</div>
                  <div className="text-slate-400 font-normal">Operations</div>
                </div>
              </div>

              {/* Item 2: Drive Sustainability */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full border border-sky-400/30 bg-sky-950/40 flex items-center justify-center text-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.2)]">
                  <svg className="w-5 h-5 text-sky-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
                    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
                  </svg>
                </div>
                <div className="text-xs sm:text-sm text-slate-200 font-medium leading-tight">
                  <div>Drive</div>
                  <div className="text-slate-400 font-normal">Sustainability</div>
                </div>
              </div>

              {/* Item 3: Accelerate Growth */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full border border-sky-400/30 bg-sky-950/40 flex items-center justify-center text-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.2)]">
                  <svg className="w-5 h-5 text-sky-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m12 14 4-4" />
                    <path d="M3.34 19a10 10 0 1 1 17.32 0" />
                    <circle cx="12" cy="14" r="2" />
                  </svg>
                </div>
                <div className="text-xs sm:text-sm text-slate-200 font-medium leading-tight">
                  <div>Accelerate</div>
                  <div className="text-slate-400 font-normal">Growth</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Floating Login Card */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="w-full max-w-[430px] rounded-3xl bg-white text-slate-900 p-8 sm:p-10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)] border border-slate-100">
              
              {/* Card Header */}
              <div className="space-y-1 mb-7">
                <h2 className="text-[26px] sm:text-[28px] font-bold text-slate-900 tracking-tight">
                  Welcome to AITEK
                </h2>
                <p className="text-sm text-slate-500 font-normal">
                  Sign in to access your AITEK platform
                </p>
              </div>

              {/* Error banner */}
              {error && (
                <div className="mb-5 p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Work Email / User ID */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Work Email / User ID
                  </label>
                  <div className="relative flex items-center">
                    <div className="absolute left-3.5 flex items-center pointer-events-none text-slate-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      placeholder="name@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full h-11 pl-10 pr-3 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition-all"
                    />
                  </div>
                  {emailError && (
                    <p className="mt-1.5 text-xs text-rose-600 font-medium">
                      {emailError}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Password
                  </label>
                  <div className="relative flex items-center">
                    <div className="absolute left-3.5 flex items-center pointer-events-none text-slate-400">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full h-11 pl-10 pr-10 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 text-slate-400 hover:text-slate-600 p-0.5 focus:outline-none"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Remember me & Forgot Password */}
                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2 cursor-pointer text-xs sm:text-sm text-slate-600">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 bg-white"
                    />
                    <span>Remember me</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowForgotModal(true)}
                    className="text-xs sm:text-sm font-medium text-sky-600 hover:text-sky-700 transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>

                {/* Sign In Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-11 rounded-lg bg-[#0062d2] hover:bg-[#0051b3] active:bg-[#004294] text-white font-medium text-sm transition-colors flex items-center justify-center gap-2 shadow-sm disabled:opacity-60"
                  >
                    {isLoading ? (
                      <span>Signing In...</span>
                    ) : (
                      <>
                        <span>Sign In</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* Divider */}
              <div className="relative my-5">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-white px-3 text-slate-400">or</span>
                </div>
              </div>

              {/* SSO Button */}
              <button
                type="button"
                onClick={handleSsoLogin}
                disabled={isLoading}
                className="w-full h-11 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 font-medium text-sm transition-colors flex items-center justify-center gap-2.5 shadow-sm"
              >
                <Landmark className="w-4 h-4 text-slate-700" />
                <span>Sign in with SSO</span>
              </button>

              {/* Bottom Tagline */}
              <div className="text-center pt-6 text-xs text-slate-400">
                Secure. Scalable. Built for what's next.
              </div>

            </div>
          </div>

        </div>

        {/* Bottom Bar: 01 AITEK LOGIN Strip */}
        <div className="pt-4 border-t border-slate-800/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded bg-[#0062d2] flex items-center justify-center text-white font-bold text-xs tracking-wider">
              01
            </div>
            <div>
              <span className="font-bold text-xs text-white tracking-wider mr-2 uppercase">
                AITEK LOGIN
              </span>
              <span className="text-xs text-slate-400 hidden sm:inline">
                Your secure gateway to the AITEK platform
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl space-y-4 text-slate-900 border border-slate-200">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-sky-50 text-sky-600 border border-sky-100">
                <KeyRound className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Reset Credentials</h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              In accordance with enterprise identity policies, password resets are governed by your company's SSO Administrator.
            </p>
            <div className="p-2.5 rounded bg-slate-50 border border-slate-200 text-xs text-slate-700 font-mono">
              Identity Helpdesk: it-ops@enterprise.aitek.ai
            </div>
            <button
              onClick={() => setShowForgotModal(false)}
              className="w-full h-9 rounded-lg bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
