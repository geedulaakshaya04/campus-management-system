import React, { useState } from 'react';
import { 
  Sparkles, 
  User, 
  Lock, 
  ArrowRight, 
  Loader2, 
  GraduationCap,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { loginUser } from '../../services/api';

function LoginPage({ onLoginSuccess }) {
  const [username, setUsername] = useState('student');
  const [password, setPassword] = useState('student123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const demoAccounts = [
    { label: 'Student', user: 'student', pass: 'student123', role: 'ROLE_STUDENT' },
    { label: 'Faculty', user: 'prof_smith', pass: 'faculty123', role: 'ROLE_FACULTY' },
    { label: 'HOD', user: 'hod_cse', pass: 'hod123', role: 'ROLE_HOD' },
    { label: 'Placement', user: 'placement_officer', pass: 'placement123', role: 'ROLE_PLACEMENT' },
    { label: 'Admin', user: 'admin', pass: 'admin123', role: 'ROLE_ADMIN' }
  ];

  const handleQuickSelect = (u, p) => {
    setUsername(u);
    setPassword(p);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const data = await loginUser(username, password);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data));
      onLoginSuccess(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid username or password. Please verify credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-center items-center px-4 py-8">
      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-12 bg-white rounded-3xl border border-[#E2E8F0] shadow-xl overflow-hidden">
        
        {/* Left Column: Navy & Blue Branding Banner */}
        <div className="lg:col-span-5 bg-[#0F172A] p-8 sm:p-10 text-white flex flex-col justify-between relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#2563EB]/20 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#14B8A6]/20 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#2563EB] to-[#14B8A6] flex items-center justify-center shadow-lg shadow-[#2563EB]/30 mb-6">
              <GraduationCap className="w-7 h-7 text-white" />
            </div>

            <span className="text-xs uppercase font-bold tracking-wider text-[#14B8A6] flex items-center gap-1.5 mb-2">
              <Sparkles className="w-3.5 h-3.5" /> Next-Gen Digital Campus
            </span>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight">
              AI-Powered Campus Management System
            </h1>

            <p className="text-sm text-[#94A3B8] mt-3 leading-relaxed">
              Unified institutional core integrating academics, governance, placement analytics, and RAG-driven AI intelligence.
            </p>
          </div>

          <div className="relative z-10 mt-8 pt-6 border-t border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-[#14B8A6] animate-pulse"></div>
              <span className="text-xs text-slate-300 font-medium">Enterprise Security • Spring Boot 3 & JWT</span>
            </div>
          </div>
        </div>

        {/* Right Column: Clean White Login Card */}
        <div className="lg:col-span-7 p-8 sm:p-10 flex flex-col justify-center">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-[#0F172A]">Welcome Back</h2>
            <p className="text-xs sm:text-sm text-[#64748B] mt-1">
              Select your role or enter credentials to access your dashboard
            </p>
          </div>

          {/* Demo Quick-Switcher */}
          <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-3 mb-6">
            <span className="block text-[11px] font-bold uppercase tracking-wider text-[#64748B] mb-2">
              Quick Demo Fill (Instant Viva Access):
            </span>
            <div className="grid grid-cols-5 gap-1.5">
              {demoAccounts.map((d) => (
                <button
                  key={d.label}
                  type="button"
                  onClick={() => handleQuickSelect(d.user, d.pass)}
                  className={`px-2 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer border ${
                    username === d.user 
                      ? 'bg-[#2563EB] text-white border-[#2563EB] shadow-xs' 
                      : 'bg-white text-[#1E293B] border-[#E2E8F0] hover:border-[#CBD5E1]'
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3.5 rounded-xl bg-[#FEF2F2] border border-[#FCA5A5] text-[#DC2626] text-xs font-medium">
                {error}
              </div>
            )}

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                Username / Institutional ID
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-3" />
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl pl-10 pr-4 py-2.5 text-sm text-[#1E293B] focus:outline-none focus:border-[#2563EB] focus:bg-white transition"
                  placeholder="e.g. student, prof_smith, admin"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl pl-10 pr-4 py-2.5 text-sm text-[#1E293B] focus:outline-none focus:border-[#2563EB] focus:bg-white transition"
                  placeholder="Enter password"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] disabled:opacity-50 text-white font-semibold text-sm flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-[#2563EB]/25 transition"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Authenticating...
                </>
              ) : (
                <>
                  Sign In to Dashboard
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
