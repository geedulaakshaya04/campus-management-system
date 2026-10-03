import React, { useState } from 'react';
import { ShieldAlert, BarChart3, Users, BookOpen, AlertTriangle } from 'lucide-react';
import AiAssistantWidget from '../../components/ai/AiAssistantWidget';

function HodDashboardView({ data }) {
  const [showAi, setShowAi] = useState(false);
  const students = data?.students || [];

  return (
    <div className="space-y-6">
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">Department Governance</span>
          <h2 className="text-2xl font-bold text-white mt-1">HOD Department Analytics</h2>
          <p className="text-xs text-slate-400 mt-1">Computer Science & Engineering • Academic Oversight</p>
        </div>
        <button 
          onClick={() => setShowAi(!showAi)}
          className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold cursor-pointer"
        >
          {showAi ? 'Close AI Assistant' : '🤖 AI Department Assistant'}
        </button>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-5">
          <span className="text-xs text-slate-400">Total Enrolled Department Students</span>
          <div className="text-2xl font-bold text-white mt-2">{data?.totalStudents || 1}</div>
          <span className="text-xs text-indigo-400 mt-1 block">Registered in semester VI</span>
        </div>
        <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-5">
          <span className="text-xs text-slate-400">Attendance Below 75% Cutoff</span>
          <div className="text-2xl font-bold text-emerald-400 mt-2">{data?.lowAttendanceCount || 0}</div>
          <span className="text-xs text-slate-400 mt-1 block">Zero students currently at risk</span>
        </div>
        <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-5">
          <span className="text-xs text-slate-400">Faculty Members</span>
          <div className="text-2xl font-bold text-white mt-2">{data?.totalFaculty || 1}</div>
          <span className="text-xs text-purple-400 mt-1 block">Active teaching staff</span>
        </div>
      </div>

      {showAi ? (
        <AiAssistantWidget />
      ) : (
        <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-6">
          <h3 className="text-sm font-bold text-white uppercase mb-4 flex items-center gap-2">
            <Users className="w-4 h-4 text-indigo-400" />
            Department Students Academic Report
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 uppercase font-semibold">
                <tr>
                  <th className="p-3">Roll Number</th>
                  <th className="p-3">Branch & Sec</th>
                  <th className="p-3">CGPA</th>
                  <th className="p-3">Attendance</th>
                  <th className="p-3">Backlogs</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {students.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-950/40">
                    <td className="p-3 font-mono font-medium text-white">{s.rollNumber}</td>
                    <td className="p-3">{s.branch} (Sec {s.section})</td>
                    <td className="p-3 font-semibold text-indigo-400">{s.cgpa}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                        s.attendancePercentage >= 75 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
                      }`}>
                        {s.attendancePercentage}%
                      </span>
                    </td>
                    <td className="p-3">{s.backlogs}</td>
                    <td className="p-3">
                      <span className="text-emerald-400 font-medium">Eligible</span>
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

export default HodDashboardView;
