import React, { useState } from 'react';
import { Key, ShieldCheck, Users, Layers, Bell } from 'lucide-react';
import AiAssistantWidget from '../../components/ai/AiAssistantWidget';

function AdminDashboardView({ data, activeSidebarItem }) {
  const [internalTab, setInternalTab] = useState('overview');
  const currentView = activeSidebarItem && activeSidebarItem !== 'dashboard' 
    ? activeSidebarItem 
    : internalTab;

  const users = data?.allUsers || [];

  return (
    <div className="space-y-6">
      <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB]">Institutional Administration</span>
          <h2 className="text-2xl font-bold text-[#0F172A] mt-1">Campus Management Admin Control Hub</h2>
          <p className="text-xs sm:text-sm text-[#64748B] mt-1">
            Global access controls, user authorization, and system policies.
          </p>
        </div>
        <button 
          onClick={() => setInternalTab('ai')}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#F0FDFA] hover:bg-[#CCFBF1] text-[#0F766E] border border-[#14B8A6]/30 text-xs font-bold transition cursor-pointer self-start md:self-auto shadow-2xs"
        >
          ✦ Campus AI Regulations
        </button>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-xs relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#2563EB]"></div>
          <span className="text-xs font-semibold text-[#64748B] uppercase">Registered Users</span>
          <div className="text-2xl sm:text-3xl font-bold text-[#0F172A] mt-2">{data?.totalUsers || 5}</div>
          <span className="text-xs text-[#2563EB] font-medium mt-1 block">5 Active Roles</span>
        </div>
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-xs relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#16A34A]"></div>
          <span className="text-xs font-semibold text-[#64748B] uppercase">Students Synchronized</span>
          <div className="text-2xl sm:text-3xl font-bold text-[#0F172A] mt-2">{data?.totalStudents || 1}</div>
          <span className="text-xs text-[#16A34A] font-medium mt-1 block">Active semester batch</span>
        </div>
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-xs relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#F59E0B]"></div>
          <span className="text-xs font-semibold text-[#64748B] uppercase">Published Notices</span>
          <div className="text-2xl sm:text-3xl font-bold text-[#0F172A] mt-2">{data?.totalNotices || 3}</div>
          <span className="text-xs text-[#64748B] font-medium mt-1 block">Campus circulars</span>
        </div>
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-xs relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#0F172A]"></div>
          <span className="text-xs font-semibold text-[#64748B] uppercase">Placement Drives</span>
          <div className="text-2xl sm:text-3xl font-bold text-[#0F172A] mt-2">{data?.totalDrives || 3}</div>
          <span className="text-xs text-[#64748B] font-medium mt-1 block">Academic year 2026</span>
        </div>
      </div>

      {currentView === 'ai' ? (
        <AiAssistantWidget />
      ) : (
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs">
          <h3 className="text-sm font-bold text-[#0F172A] uppercase tracking-wider mb-4 flex items-center gap-2">
            <Key className="w-4 h-4 text-[#2563EB]" />
            Registered User Accounts & Access Privileges
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-[#1E293B]">
              <thead className="bg-[#F8FAFC] text-[#64748B] uppercase font-bold border-b border-[#E2E8F0]">
                <tr>
                  <th className="p-3.5">Username</th>
                  <th className="p-3.5">Full Name</th>
                  <th className="p-3.5">Email</th>
                  <th className="p-3.5">Department</th>
                  <th className="p-3.5">Role Privilege</th>
                  <th className="p-3.5">Account Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F1F5F9]">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-[#F8FAFC]">
                    <td className="p-3.5 font-mono font-bold text-[#0F172A]">{u.username}</td>
                    <td className="p-3.5 font-medium">{u.fullName}</td>
                    <td className="p-3.5 text-[#64748B]">{u.email}</td>
                    <td className="p-3.5">{u.department}</td>
                    <td className="p-3.5">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#EFF6FF] text-[#2563EB] border border-[#DBEAFE]">
                        {u.role}
                      </span>
                    </td>
                    <td className="p-3.5">
                      <span className="text-[#16A34A] font-bold flex items-center gap-1">
                        ● ACTIVE
                      </span>
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
