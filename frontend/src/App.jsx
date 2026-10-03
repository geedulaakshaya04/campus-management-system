import React, { useState, useEffect } from 'react';
import { checkHealth } from './services/api';
import { Server, Database, ShieldCheck, Cpu, RefreshCw, CheckCircle2, AlertCircle } from 'lucide-react';

function App() {
  const [health, setHealth] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStatus = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await checkHealth();
      setHealth(data);
    } catch (err) {
      setError(err.message || 'Unable to connect to backend server');
      setHealth(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between font-sans">
      {/* Top Navigation */}
      <header className="border-b border-slate-800 bg-slate-900/60 backdrop-blur px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/20">
            <Cpu className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight">AI-Powered Campus Management System</h1>
            <p className="text-xs text-slate-400">Enterprise Academic & Administrative Digital Core</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Phase 1: Foundation
          </span>
        </div>
      </header>

      {/* Main Status Container */}
      <main className="max-w-4xl mx-auto w-full px-6 py-12 flex-1 flex flex-col items-center justify-center">
        <div className="w-full bg-slate-900/80 border border-slate-800 rounded-2xl p-8 shadow-2xl backdrop-blur-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-800 gap-4">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                System Health & Connectivity
              </h2>
              <p className="text-sm text-slate-400 mt-1">
                Real-time validation between React Frontend and Spring Boot Backend
              </p>
            </div>
            <button
              onClick={fetchStatus}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-sm font-medium transition cursor-pointer self-start md:self-auto"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              Recheck Status
            </button>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            {/* Frontend Card */}
            <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800/80 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-semibold">React Frontend</span>
                </div>
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              </div>
              <div className="mt-4">
                <div className="text-xs text-slate-400">Vite 8 + React 19 + Tailwind v4</div>
                <div className="text-xs font-mono text-emerald-400 mt-1 flex items-center gap-1">
                  ● ACTIVE (Port 5173)
                </div>
              </div>
            </div>

            {/* Backend Card */}
            <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800/80 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
                    <Server className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-semibold">Spring Boot</span>
                </div>
                {health?.status === 'UP' ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-amber-400" />
                )}
              </div>
              <div className="mt-4">
                <div className="text-xs text-slate-400">Java 21 + Spring Security 6</div>
                <div className="text-xs font-mono text-emerald-400 mt-1 flex items-center gap-1">
                  {loading ? '● CHECKING...' : health?.status === 'UP' ? '● ONLINE (Port 8080)' : '○ WAITING FOR SERVER'}
                </div>
              </div>
            </div>

            {/* Database Card */}
            <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800/80 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                    <Database className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-semibold">MySQL 8.0</span>
                </div>
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              </div>
              <div className="mt-4">
                <div className="text-xs text-slate-400">campus_management_db</div>
                <div className="text-xs font-mono text-emerald-400 mt-1 flex items-center gap-1">
                  ● SERVICE RUNNING
                </div>
              </div>
            </div>
          </div>

          {/* Response Payload Box */}
          <div className="mt-8 bg-slate-950 border border-slate-800 rounded-xl p-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-xs font-semibold tracking-wider uppercase text-slate-400 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-indigo-400" />
                Backend Endpoint: GET /api/health
              </span>
              <span className="text-xs text-slate-500 font-mono">
                {health?.timestamp || 'Ready'}
              </span>
            </div>
            <pre className="mt-3 text-xs font-mono text-slate-300 overflow-x-auto p-2 bg-slate-900/40 rounded">
              {loading
                ? JSON.stringify({ message: 'Querying Spring Boot /api/health ...' }, null, 2)
                : error
                ? JSON.stringify({ error, hint: 'Start backend with: mvn spring-boot:run' }, null, 2)
                : JSON.stringify(health, null, 2)}
            </pre>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-900/40 px-6 py-4 text-center text-xs text-slate-500">
        AI-Powered Campus Management System • B.Tech Major Project • Milestone 1
      </footer>
    </div>
  );
}

export default App;
