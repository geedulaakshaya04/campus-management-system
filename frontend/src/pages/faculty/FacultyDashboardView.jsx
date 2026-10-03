import React, { useState } from 'react';
import { Users, FileCheck, BookOpen, PlusCircle, CheckCircle } from 'lucide-react';
import AiAssistantWidget from '../../components/ai/AiAssistantWidget';

function FacultyDashboardView({ data }) {
  const [activeTab, setActiveTab] = useState('overview');
  const students = data?.students || [];
  const assignments = data?.assignments || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-purple-400">Faculty Portal</span>
          <h2 className="text-2xl font-bold text-white mt-1">Computer Science & Engineering Department</h2>
          <p className="text-xs text-slate-400 mt-1">Manage lectures, attendance submissions, and student course evaluations.</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setActiveTab('ai')}
            className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium cursor-pointer"
          >
            🤖 AI RAG Assistant
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-5">
          <span className="text-xs text-slate-400">Enrolled Students</span>
          <div className="text-2xl font-bold text-white mt-2">{data?.totalStudents || 1}</div>
          <span className="text-xs text-emerald-400 mt-1 block">Active across sections</span>
        </div>
        <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-5">
          <span className="text-xs text-slate-400">Published Assignments</span>
          <div className="text-2xl font-bold text-white mt-2">{data?.activeAssignments || 2}</div>
          <span className="text-xs text-indigo-400 mt-1 block">Semester VI</span>
        </div>
        <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-5">
          <span className="text-xs text-slate-400">Average Class Attendance</span>
          <div className="text-2xl font-bold text-white mt-2">82%</div>
          <span className="text-xs text-emerald-400 mt-1 block">Above academic cutoff</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg cursor-pointer ${
            activeTab === 'overview' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
          }`}
        >
          Classes & Students
        </button>
        <button
          onClick={() => setActiveTab('ai')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg cursor-pointer ${
            activeTab === 'ai' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
          }`}
        >
          🤖 AI Campus Knowledge
        </button>
      </div>

      {activeTab === 'ai' ? (
        <AiAssistantWidget />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Active Coursework */}
          <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-6">
            <h3 className="text-sm font-bold text-white uppercase mb-4 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-purple-400" />
              Assigned Coursework
            </h3>
            <div className="space-y-3">
              {assignments.map((a) => (
                <div key={a.id} className="p-4 rounded-lg bg-slate-950 border border-slate-800">
                  <div className="text-xs font-semibold text-purple-400">{a.subject}</div>
                  <div className="text-sm font-bold text-white mt-1">{a.title}</div>
                  <div className="text-xs text-slate-400 mt-1">Due: {a.dueDate} • Maximum Score: {a.totalMarks}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Student Roster */}
          <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-6">
            <h3 className="text-sm font-bold text-white uppercase mb-4 flex items-center gap-2">
              <Users className="w-4 h-4 text-emerald-400" />
              Student Roster & Attendance
            </h3>
            <div className="space-y-3">
              {students.map((s) => (
                <div key={s.id} className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold text-white">{s.user?.fullName || "Akshaya Narayana"}</div>
                    <div className="text-xs text-slate-400 font-mono">{s.rollNumber} • Section {s.section}</div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                      {s.attendancePercentage}% Attendance
                    </span>
                    <div className="text-[11px] text-slate-400 mt-1">CGPA: {s.cgpa}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FacultyDashboardView;
