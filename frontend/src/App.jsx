import React, { useState, useEffect } from 'react';
import { 
  LogOut, 
  Cpu, 
  User, 
  Sparkles, 
  GraduationCap, 
  Briefcase, 
  ShieldCheck, 
  Layers,
  BookOpen
} from 'lucide-react';
import LoginPage from './pages/auth/LoginPage';
import StudentDashboardView from './pages/student/StudentDashboardView';
import FacultyDashboardView from './pages/faculty/FacultyDashboardView';
import HodDashboardView from './pages/hod/HodDashboardView';
import PlacementDashboardView from './pages/placement/PlacementDashboardView';
import AdminDashboardView from './pages/admin/AdminDashboardView';
import { 
  getStudentDashboard, 
  getFacultyDashboard, 
  getHodDashboard, 
  getAdminDashboard, 
  getPlacementDashboard 
} from './services/api';

function App() {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchRoleData = async (user) => {
    setLoading(true);
    try {
      let res;
      if (user.role === 'ROLE_STUDENT') {
        res = await getStudentDashboard();
      } else if (user.role === 'ROLE_FACULTY') {
        res = await getFacultyDashboard();
      } else if (user.role === 'ROLE_HOD') {
        res = await getHodDashboard();
      } else if (user.role === 'ROLE_PLACEMENT') {
        res = await getPlacementDashboard();
      } else if (user.role === 'ROLE_ADMIN') {
        res = await getAdminDashboard();
      }
      setDashboardData(res);
    } catch (err) {
      console.error("Dashboard fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser) {
      fetchRoleData(currentUser);
    }
  }, [currentUser]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setCurrentUser(null);
    setDashboardData(null);
  };

  if (!currentUser) {
    return <LoginPage onLoginSuccess={(u) => setCurrentUser(u)} />;
  }

  const roleLabels = {
    ROLE_STUDENT: { label: 'Student Portal', icon: GraduationCap, color: 'text-indigo-400' },
    ROLE_FACULTY: { label: 'Faculty Console', icon: BookOpen, color: 'text-purple-400' },
    ROLE_HOD: { label: 'HOD Department Oversight', icon: Layers, color: 'text-amber-400' },
    ROLE_PLACEMENT: { label: 'Placement Officer Cell', icon: Briefcase, color: 'text-emerald-400' },
    ROLE_ADMIN: { label: 'Admin Institutional Hub', icon: ShieldCheck, color: 'text-rose-400' }
  };

  const RoleIcon = roleLabels[currentUser.role]?.icon || Cpu;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Header */}
      <header className="border-b border-slate-800 bg-slate-900/70 backdrop-blur-md px-6 py-3.5 sticky top-0 z-50 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/20">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-base font-bold tracking-tight text-white flex items-center gap-2">
              AI-Powered Campus Management System
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                LIVE
              </span>
            </h1>
            <p className="text-[11px] text-slate-400 flex items-center gap-1.5">
              <RoleIcon className={`w-3.5 h-3.5 ${roleLabels[currentUser.role]?.color}`} />
              {roleLabels[currentUser.role]?.label} • {currentUser.department}
            </p>
          </div>
        </div>

        {/* User Badge & Logout */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex flex-col text-right">
            <span className="text-xs font-semibold text-white">{currentUser.fullName}</span>
            <span className="text-[10px] text-slate-400 font-mono">{currentUser.username}</span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition cursor-pointer"
            title="Sign Out"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6">
        {loading ? (
          <div className="py-24 text-center text-slate-400 text-sm">
            <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
            Loading role dashboard...
          </div>
        ) : (
          <>
            {currentUser.role === 'ROLE_STUDENT' && <StudentDashboardView data={dashboardData} />}
            {currentUser.role === 'ROLE_FACULTY' && <FacultyDashboardView data={dashboardData} />}
            {currentUser.role === 'ROLE_HOD' && <HodDashboardView data={dashboardData} />}
            {currentUser.role === 'ROLE_PLACEMENT' && <PlacementDashboardView data={dashboardData} />}
            {currentUser.role === 'ROLE_ADMIN' && <AdminDashboardView data={dashboardData} />}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-900/40 px-6 py-3.5 text-center text-xs text-slate-500">
        AI-Powered Campus Management System • End-to-End B.Tech Implementation • Spring Boot 3 + React 19 + MySQL 8 + RAG
      </footer>
    </div>
  );
}

export default App;
