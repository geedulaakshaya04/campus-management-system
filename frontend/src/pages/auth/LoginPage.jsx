import React, { useState } from 'react';
import { Shield, Sparkles, User, Lock, ArrowRight, Loader2, Info } from 'lucide-react';
import { loginUser } from '../../services/api';

function LoginPage({ onLoginSuccess }) {
  const [username, setUsername] = useState('student');
  const [password, setPassword] = useState('student123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const demoAccounts = [
    { role: 'Student', user: 'student', pass: 'student123', color: 'from-blue-600 to-indigo-600' },
    { role: 'Faculty', user: 'prof_smith', pass: 'faculty123', color: 'from-purple-600 to-indigo-600' },
    { role: 'HOD', user: 'hod_cse', pass: 'hod123', color: 'from-amber-600 to-orange-600' },
    { role: 'Placement', user: 'placement_officer', pass: 'placement123', color: 'from-emerald-600 to-teal-600' },
    { role: 'Admin', user: 'admin', pass: 'admin123', color: 'from-rose-600 to-red-600' }
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
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Header Branding */}
        <div className="text-center mb-8">
          <div className="inline-flex p-3 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-600 shadow-xl shadow-indigo-500/20 text-white mb-3">
            <Sparkles className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">AI-Powered Campus Management</h1>
          <p className="text-xs text-slate-400 mt-1">Unified Digital Campus & RAG Assistant Platform</p>
        </div>

        {/* Demo Fast-Login Selector */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 mb-6 shadow-lg">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 mb-2.5">
            <Info className="w-4 h-4 text-indigo-400" />
            <span>Select Demo Role to Fast-Fill:</span>
          </div>
          <div className="grid grid-cols-5 gap-1.5">
            {demoAccounts.map((d) => (
              <button
                key={d.role}
                type="button"
                onClick={() => handleQuickSelect(d.user, d.pass)}
                className={`px-2 py-1.5 rounded-lg text-[11px] font-semibold text-white bg-gradient-to-r ${d.color} shadow-sm transition hover:opacity-90 cursor-pointer`}
              >
                {d.role}
              </button>
            ))}
          </div>
        </div>

        {/* Login Box */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs">
                {error}
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Username / ID</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  placeholder="Enter username"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  placeholder="Enter password"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-indigo-600/30 transition disabled:opacity-50"
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
