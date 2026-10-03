import React, { useState } from 'react';
import { ShieldCheck, UserPlus, Database, Layers, Key } from 'lucide-react';
import AiAssistantWidget from '../../components/ai/AiAssistantWidget';

function AdminDashboardView({ data }) {
  const [showAi, setShowAi] = useState(false);
  const users = data?.allUsers || [];

  return (
    <div className="space-y-6">
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-rose-400">Institutional Administration</span>
          <h2 className="text-2xl font-bold text-white mt-1">Campus Management Admin Control Hub</h2>
          <p className="text-xs text-slate-400 mt-1">Full control over RBAC accounts, databases, departments, and system policies.</p>
        </div>
        <button 
          onClick={() => setShowAi(!showAi)}
          className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold cursor-pointer"
        >
          {showAi ? 'Close AI Assistant' : '🤖 AI Campus Admin Bot'}
        </button>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-5">
          <span className="text-xs text-slate-400">System Users</span>
          <div className="text-2xl font-bold text-white mt-2">{data?.totalUsers || 5}</div>
          <span className="text-xs text-indigo-400 mt-1 block">5 Active RBAC Roles</span>
        </div>
        <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-5">
          <span className="text-xs text-slate-400">Enrolled Students</span>
          <div className="text-2xl font-bold text-white mt-2">{data?.totalStudents || 1}</div>
          <span className="text-xs text-emerald-400 mt-1 block">Profiles synchronized</span>
        </div>
        <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-5">
          <span className="text-xs text-slate-400">Published Notices</span>
          <div className="text-2xl font-bold text-white mt-2">{data?.totalNotices || 3}</div>
          <span className="text-xs text-purple-400 mt-1 block">Campus circulars</span>
        </div>
        <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-5">
          <span className="text-xs text-slate-400">Placement Drives</span>
          <div className="text-2xl font-bold text-white mt-2">{data?.totalDrives || 3}</div>
          <span className="text-xs text-amber-400 mt-1 block">Recruitment cycles</span>
        </div>
      </div>

      {showAi ? (
        <AiAssistantWidget />
      ) : (
        <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-6">
          <h3 className="text-sm font-bold text-white uppercase mb-4 flex items-center gap-2">
            <Key className="w-4 h-4 text-rose-400" />
            Registered User Accounts & Access Privileges
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 uppercase font-semibold">
                <tr>
                  <th className="p-3">Username</th>
                  <th className="p-3">Full Name</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Department</th>
                  <th className="p-3">Role Privilege</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-950/40">
                    <td className="p-3 font-mono font-medium text-white">{u.username}</td>
                    <td className="p-3">{u.fullName}</td>
                    <td className="p-3 text-slate-400">{u.email}</td>
                    <td className="p-3">{u.department}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                        {u.role}
                      </span>
                    </td>
                    <td className="p-3">
                      <span className="text-emerald-400 font-medium">● ACTIVE</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboardView;
