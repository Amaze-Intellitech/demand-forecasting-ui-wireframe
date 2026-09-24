import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAitek } from '../context/AitekContext';
import {
  ArrowRight,
  Landmark,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Loader2,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';
import earthBg from '../assets/earth_bg.jpg';
import aitekLogo from '../assets/aitek_logo.png';

export const PlatformLogin: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAitek();

  const [identifier, setIdentifier] = useState(() => {
    return localStorage.getItem('aitek_remembered_identifier') || '';
  });
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(() => {
    return localStorage.getItem('aitek_remember_me') === 'true';
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSsoLoading, setIsSsoLoading] = useState(false);
  const [errors, setErrors] = useState<{ identifier?: string; password?: string; general?: string }>({});
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  const validate = () => {
    const newErrors: { identifier?: string; password?: string; general?: string } = {};

    if (!identifier.trim()) {
      newErrors.identifier = 'Work email or username is required';
    } else if (identifier.includes('@') && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier.trim())) {
      newErrors.identifier = 'Please enter a valid work email address';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 4) {
      newErrors.password = 'Password must be at least 4 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedbackMessage(null);

    if (!validate()) {
      return;
    }

    setIsLoading(true);
    try {
      if (rememberMe) {
        localStorage.setItem('aitek_remember_me', 'true');
        localStorage.setItem('aitek_remembered_identifier', identifier.trim());
      } else {
        localStorage.removeItem('aitek_remember_me');
        localStorage.removeItem('aitek_remembered_identifier');
      }

      await login(identifier.trim());
      navigate('/solutions');
    } catch {
      setErrors({ general: 'Authentication failed. Please check your credentials and try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSsoLogin = async () => {
    setFeedbackMessage(null);
    setErrors({});
    setIsSsoLoading(true);
    setIsLoading(true);
    try {
      await login('siddhartha.m@aitek.ai');
      navigate('/solutions');
    } catch {
      setErrors({ general: 'SSO authentication failed. Please try again.' });
    } finally {
      setIsSsoLoading(false);
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    if (!identifier.trim()) {
      setErrors((prev) => ({
        ...prev,
        identifier: 'Enter your work email above to reset password',
      }));
    } else {
      setErrors({});
      setFeedbackMessage(
        `Password reset instructions have been sent to ${identifier.trim()}.`
      );
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col overflow-hidden bg-slate-950 font-sans select-none">

      {/* Cinematic Earth Background */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-105"
        style={{
          backgroundImage: `url(${earthBg})`,
        }}
      >
        {/* Subtle dark gradient overlay to ensure contrast and aesthetic depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/40 to-slate-950/20" />
        <div className="absolute inset-0 bg-slate-950/15 backdrop-brightness-95" />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-6 sm:px-10 lg:px-12 py-6 sm:py-8 flex flex-col">

        {/* Top Header Row: Logo */}
        <div className="flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <img
              src={aitekLogo}
              alt="AITEK"
              className="h-16 sm:h-20 lg:h-24 w-auto object-contain filter drop-shadow-[0_0_20px_rgba(21,93,252,0.4)]"
            />
          </div>
        </div>

        {/* Center Grid: Left Headline & Right Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center my-auto py-6 sm:py-8">

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
                <div className="w-10 h-10 rounded-full border border-primary/30 bg-primary/10 flex items-center justify-center text-primary shadow-[0_0_12px_rgba(21,93,252,0.2)]">
                  <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
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
                <div className="w-10 h-10 rounded-full border border-primary/30 bg-primary/10 flex items-center justify-center text-primary shadow-[0_0_12px_rgba(21,93,252,0.2)]">
                  <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
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
                <div className="w-10 h-10 rounded-full border border-primary/30 bg-primary/10 flex items-center justify-center text-primary shadow-[0_0_12px_rgba(21,93,252,0.2)]">
                  <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
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
            <div className="w-full max-w-[430px] rounded-3xl bg-white text-slate-900 p-7 sm:p-9 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)] border border-slate-100">

              {/* Card Header */}
              <div className="space-y-1 mb-6">
                <h2 className="text-[24px] sm:text-[26px] font-bold text-slate-900 tracking-tight">
                  Welcome to AITEK
                </h2>
                <p className="text-sm text-slate-500 font-normal">
                  Sign in to access your AITEK platform
                </p>
              </div>

              {/* Feedback / Alert Banners */}
              {errors.general && (
                <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-600 mt-0.5" />
                  <span>{errors.general}</span>
                </div>
              )}

              {feedbackMessage && (
                <div className="mb-4 p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600 mt-0.5" />
                  <span>{feedbackMessage}</span>
                </div>
              )}

              {/* Username/Email & Password Form */}
              <form onSubmit={handlePasswordLogin} className="space-y-4" noValidate>
                {/* Username / Email field */}
                <div>
                  <label
                    htmlFor="login-identifier"
                    className="block text-xs font-semibold text-slate-700 mb-1.5"
                  >
                    Work Email / Username
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      id="login-identifier"
                      type="text"
                      value={identifier}
                      onChange={(e) => {
                        setIdentifier(e.target.value);
                        if (errors.identifier) setErrors((prev) => ({ ...prev, identifier: undefined }));
                      }}
                      placeholder="name@company.com"
                      autoComplete="username"
                      className={`w-full h-10 sm:h-11 pl-10 pr-3 rounded-lg border text-sm text-slate-900 placeholder:text-slate-400 bg-white transition-colors focus:outline-none focus:ring-2 ${
                        errors.identifier
                          ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                          : 'border-slate-200 hover:border-slate-300 focus:border-[#0062d2] focus:ring-[#0062d2]/20'
                      }`}
                    />
                  </div>
                  {errors.identifier && (
                    <p className="mt-1 text-xs text-red-600 font-medium flex items-center gap-1">
                      <span className="w-1 h-1 rounded-full bg-red-600 inline-block" />
                      {errors.identifier}
                    </p>
                  )}
                </div>

                {/* Password field */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label
                      htmlFor="login-password"
                      className="block text-xs font-semibold text-slate-700"
                    >
                      Password
                    </label>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      id="login-password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
                      }}
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      className={`w-full h-10 sm:h-11 pl-10 pr-10 rounded-lg border text-sm text-slate-900 placeholder:text-slate-400 bg-white transition-colors focus:outline-none focus:ring-2 ${
                        errors.password
                          ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                          : 'border-slate-200 hover:border-slate-300 focus:border-[#0062d2] focus:ring-[#0062d2]/20'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-xs text-red-600 font-medium flex items-center gap-1">
                      <span className="w-1 h-1 rounded-full bg-red-600 inline-block" />
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* Remember me & Forgot Password */}
                <div className="flex items-center justify-between pt-0.5">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded border-slate-300 text-[#0062d2] focus:ring-[#0062d2]/30 cursor-pointer"
                    />
                    <span className="text-xs text-slate-600 font-medium">Remember me</span>
                  </label>
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="text-xs font-medium text-[#0062d2] hover:text-[#0051b3] hover:underline transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>

                {/* Primary Sign In Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-11 rounded-lg bg-[#0062d2] hover:bg-[#0051b3] active:bg-[#004294] text-white font-medium text-sm transition-colors flex items-center justify-center gap-2 shadow-sm disabled:opacity-60"
                >
                  {isLoading && !isSsoLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Signing In...</span>
                    </>
                  ) : (
                    <>
                      <span>Sign In</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="relative my-5">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200" />
                </div>
                <div className="relative flex justify-center text-[11px] uppercase">
                  <span className="bg-white px-3 text-slate-400 font-medium tracking-wider">
                    Or continue with
                  </span>
                </div>
              </div>

              {/* SSO Button */}
              <button
                type="button"
                onClick={handleSsoLogin}
                disabled={isLoading}
                className="w-full h-11 rounded-lg border border-slate-200 bg-slate-50/70 hover:bg-slate-100/90 active:bg-slate-200/60 text-slate-700 font-medium text-sm transition-colors flex items-center justify-center gap-2.5 shadow-sm disabled:opacity-60"
              >
                {isSsoLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-slate-600" />
                    <span>Connecting to SSO...</span>
                  </>
                ) : (
                  <>
                    <Landmark className="w-4 h-4 text-[#0062d2]" />
                    <span>Sign in with SSO</span>
                  </>
                )}
              </button>

            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
export default PlatformLogin;
