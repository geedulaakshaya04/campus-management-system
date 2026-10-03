import React, { useState, useEffect } from 'react';
import { 
  LogOut, 
  GraduationCap, 
  LayoutDashboard, 
  CheckSquare, 
  FileText, 
  Award, 
  Calendar, 
  Bell, 
  Briefcase, 
  Sparkles, 
  Menu, 
  X,
  Users,
  ShieldCheck,
  ChevronRight
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
  const [activeSidebarItem, setActiveSidebarItem] = useState('dashboard');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const fetchRoleData = async (user) => {
    setLoading(true);
    try {
      let res;
      if (user.role === 'ROLE_STUDENT') res = await getStudentDashboard();
      else if (user.role === 'ROLE_FACULTY') res = await getFacultyDashboard();
      else if (user.role === 'ROLE_HOD') res = await getHodDashboard();
      else if (user.role === 'ROLE_PLACEMENT') res = await getPlacementDashboard();
      else if (user.role === 'ROLE_ADMIN') res = await getAdminDashboard();
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

  // Navigation Items per Role
  const getNavItems = (role) => {
    const common = [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    ];

    if (role === 'ROLE_STUDENT') {
      return [
        ...common,
        { id: 'attendance', label: 'Attendance', icon: CheckSquare },
        { id: 'assignments', label: 'Assignments', icon: FileText },
        { id: 'placements', label: 'Placements', icon: Briefcase },
        { id: 'notices', label: 'Notices', icon: Bell },
        { id: 'ai', label: '✦ Campus AI', icon: Sparkles, isAi: true }
      ];
    } else if (role === 'ROLE_FACULTY') {
      return [
        ...common,
        { id: 'students', label: 'Student Roster', icon: Users },
        { id: 'assignments', label: 'Coursework', icon: FileText },
        { id: 'notices', label: 'Notices', icon: Bell },
        { id: 'ai', label: '✦ Campus AI', icon: Sparkles, isAi: true }
      ];
    } else if (role === 'ROLE_HOD') {
      return [
        ...common,
        { id: 'students', label: 'Department Roster', icon: Users },
        { id: 'notices', label: 'Circulars', icon: Bell },
        { id: 'ai', label: '✦ Campus AI', icon: Sparkles, isAi: true }
      ];
    } else if (role === 'ROLE_PLACEMENT') {
      return [
        ...common,
        { id: 'drives', label: 'Placement Drives', icon: Briefcase },
        { id: 'notices', label: 'Circulars', icon: Bell },
        { id: 'ai', label: '✦ Campus AI', icon: Sparkles, isAi: true }
      ];
    } else {
      return [
        ...common,
        { id: 'users', label: 'User Directory', icon: Users },
        { id: 'notices', label: 'Notices', icon: Bell },
        { id: 'ai', label: '✦ Campus AI', icon: Sparkles, isAi: true }
      ];
    }
  };

  const navItems = getNavItems(currentUser.role);

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans text-[#1E293B]">
      
      {/* 1. Deep Navy Sidebar (#0F172A) */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-[#0F172A] text-white flex flex-col justify-between transition-transform duration-200 ease-in-out
        lg:static lg:translate-x-0 ${mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div>
          {/* Institution Logo Brand */}
          <div className="p-6 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#2563EB] to-[#14B8A6] flex items-center justify-center font-bold text-white shadow-md shadow-[#2563EB]/30">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-sm font-extrabold tracking-tight uppercase">Campus</h1>
                <p className="text-[11px] font-semibold text-[#14B8A6] tracking-wider uppercase">Management</p>
              </div>
            </div>
            <button 
              onClick={() => setMobileSidebarOpen(false)}
              className="lg:hidden text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="p-4 space-y-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1 block">
              Menu Navigation
            </span>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSidebarItem === item.id;
              
              if (item.isAi) {
                return (
                  <div key={item.id} className="pt-3">
                    <button
                      onClick={() => { setActiveSidebarItem(item.id); setMobileSidebarOpen(false); }}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                        isActive
                          ? 'bg-[#14B8A6] text-white shadow-md shadow-[#14B8A6]/20'
                          : 'bg-[#14B8A6]/10 text-[#2DD4BF] border border-[#14B8A6]/30 hover:bg-[#14B8A6]/20'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Sparkles className="w-4 h-4 text-[#14B8A6]" />
                        <span>CAMPUS AI</span>
                      </div>
                      <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-white/20 text-white font-mono">
                        RAG
                      </span>
                    </button>
                  </div>
                );
              }

              return (
                <button
                  key={item.id}
                  onClick={() => { setActiveSidebarItem(item.id); setMobileSidebarOpen(false); }}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                    isActive
                      ? 'bg-[#2563EB] text-white shadow-md shadow-[#2563EB]/20'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* User Card at bottom of sidebar */}
        <div className="p-4 border-t border-slate-800">
          <div className="bg-slate-900/80 rounded-xl p-3 flex items-center justify-between">
            <div className="overflow-hidden">
              <div className="text-xs font-bold text-white truncate">{currentUser.fullName}</div>
              <div className="text-[10px] text-slate-400 truncate">{currentUser.department}</div>
            </div>
            <button
              onClick={handleLogout}
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition cursor-pointer"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* 2. Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Navbar */}
        <header className="bg-white border-b border-[#E2E8F0] px-6 py-4 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-[#64748B]"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h2 className="text-base font-bold text-[#0F172A]">AI-Powered Campus Management System</h2>
              <p className="text-xs text-[#64748B]">Institutional Portal • Academic Year 2026</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-block px-3 py-1 rounded-full text-xs font-bold bg-[#DCFCE7] text-[#16A34A] border border-[#BBF7D0]">
              ● ONLINE
            </span>
            <div className="text-right hidden md:block">
              <span className="text-xs font-bold text-[#0F172A] block">{currentUser.role.replace('ROLE_', '')}</span>
              <span className="text-[10px] text-[#64748B] font-mono">{currentUser.username}</span>
            </div>
          </div>
        </header>

        {/* Page Body */}
        <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto">
          {loading ? (
            <div className="py-24 text-center text-[#64748B]">
              <div className="w-8 h-8 border-3 border-[#2563EB] border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
              Loading institutional dashboard data...
            </div>
          ) : (
            <>
              {currentUser.role === 'ROLE_STUDENT' && (
                <StudentDashboardView 
                  data={dashboardData} 
                  activeSidebarItem={activeSidebarItem} 
                  setActiveSidebarItem={setActiveSidebarItem}
                />
              )}
              {currentUser.role === 'ROLE_FACULTY' && (
                <FacultyDashboardView 
                  data={dashboardData} 
                  activeSidebarItem={activeSidebarItem} 
                  setActiveSidebarItem={setActiveSidebarItem}
                />
              )}
              {currentUser.role === 'ROLE_HOD' && (
                <HodDashboardView 
                  data={dashboardData} 
                  activeSidebarItem={activeSidebarItem} 
                  setActiveSidebarItem={setActiveSidebarItem}
                />
              )}
              {currentUser.role === 'ROLE_PLACEMENT' && (
                <PlacementDashboardView 
                  data={dashboardData} 
                  activeSidebarItem={activeSidebarItem} 
                  setActiveSidebarItem={setActiveSidebarItem}
                />
              )}
              {currentUser.role === 'ROLE_ADMIN' && (
                <AdminDashboardView 
                  data={dashboardData} 
                  activeSidebarItem={activeSidebarItem} 
                  setActiveSidebarItem={setActiveSidebarItem}
                />
              )}
            </>
          )}
        </main>
      </div>

    </div>
  );
}

export default App;
