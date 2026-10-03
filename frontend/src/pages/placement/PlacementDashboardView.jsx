import React, { useState } from 'react';
import { Briefcase, Building2, TrendingUp, Calendar, CheckCircle2 } from 'lucide-react';
import AiAssistantWidget from '../../components/ai/AiAssistantWidget';

function PlacementDashboardView({ data }) {
  const [showAi, setShowAi] = useState(false);
  const drives = data?.drives || [];

  return (
    <div className="space-y-6">
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">Career & Placements</span>
          <h2 className="text-2xl font-bold text-white mt-1">Training & Placement Cell Operations</h2>
          <p className="text-xs text-slate-400 mt-1">Manage corporate recruiters, campus drives, and student shortlisting.</p>
        </div>
        <button 
          onClick={() => setShowAi(!showAi)}
          className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold cursor-pointer"
        >
          {showAi ? 'Close AI Assistant' : '🤖 AI Placement Assistant'}
        </button>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-5">
          <span className="text-xs text-slate-400">Total Placement Drives</span>
          <div className="text-2xl font-bold text-white mt-2">{data?.totalDrives || 3}</div>
          <span className="text-xs text-indigo-400 mt-1 block">Registered companies</span>
        </div>
        <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-5">
          <span className="text-xs text-slate-400">Active Drives</span>
          <div className="text-2xl font-bold text-emerald-400 mt-2">{data?.activeDrives || 2}</div>
          <span className="text-xs text-emerald-400 mt-1 block">Applications accepting</span>
        </div>
        <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-5">
          <span className="text-xs text-slate-400">Highest Package Offered</span>
          <div className="text-2xl font-bold text-purple-400 mt-2">16.0 LPA</div>
          <span className="text-xs text-slate-400 mt-1 block">Amazon AWS</span>
        </div>
        <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-5">
          <span className="text-xs text-slate-400">Eligible Registered Candidates</span>
          <div className="text-2xl font-bold text-white mt-2">612</div>
          <span className="text-xs text-slate-400 mt-1 block">Above 7.0 CGPA</span>
        </div>
      </div>

      {showAi ? (
        <AiAssistantWidget />
      ) : (
        <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-6">
          <h3 className="text-sm font-bold text-white uppercase mb-4 flex items-center gap-2">
            <Building2 className="w-4 h-4 text-emerald-400" />
            Corporate Placement Drives Schedule
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {drives.map((d) => (
              <div key={d.id} className="p-5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-base font-bold text-white">{d.companyName}</span>
                    <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      {d.packageLPA}
                    </span>
                  </div>
                  <div className="text-xs text-indigo-400 font-semibold mt-1">{d.roleName}</div>
                  <div className="mt-3 space-y-1.5 text-xs text-slate-400">
                    <div>Min CGPA: <span className="text-slate-200 font-semibold">{d.minCgpa}</span></div>
                    <div>Max Backlogs: <span className="text-slate-200">{d.maxBacklogs}</span></div>
                    <div>Eligible: <span className="text-slate-200">{d.eligibleBranches}</span></div>
                    <div>Location: <span className="text-slate-200">{d.jobLocation}</span></div>
                    <div>Date: <span className="text-slate-200">{d.driveDate}</span></div>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                    d.status === 'ACTIVE' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-800 text-slate-300'
                  }`}>
                    {d.status}
                  </span>
                  <button className="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-xs cursor-pointer">
                    Manage Applicants
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default PlacementDashboardView;
