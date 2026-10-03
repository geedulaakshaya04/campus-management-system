import React, { useState } from 'react';
import { 
  GraduationCap, 
  BookOpen, 
  Calendar, 
  FileText, 
  Briefcase, 
  Bell, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  Award, 
  ArrowUpRight,
  ChevronRight
} from 'lucide-react';
import AiAssistantWidget from '../../components/ai/AiAssistantWidget';

function StudentDashboardView({ data }) {
  const [activeTab, setActiveTab] = useState('overview');
  const student = data?.student || {
    rollNumber: "24EG106A18",
    branch: "Computer Science & Engineering",
    semester: 6,
    section: "A",
    cgpa: 8.45,
    attendancePercentage: 82,
    backlogs: 0
  };

  const assignments = data?.assignments || [];
  const placementDrives = data?.placementDrives || [];
  const notices = data?.notices || [];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-900/60 via-purple-900/40 to-slate-900 border border-indigo-800/40 p-6 md:p-8">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-1">
              <span>B.Tech CSE • Semester {student.semester}</span>
              <span>•</span>
              <span className="font-mono">{student.rollNumber}</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              Welcome back, {data?.user?.fullName || "Akshaya"} 👋
            </h2>
            <p className="text-slate-300 text-sm mt-1">
              All systems online. Your academic profile is in good standing.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setActiveTab('ai')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-xs font-semibold shadow-lg shadow-indigo-500/20 hover:opacity-95 transition cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              Ask AI Campus Bot
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Attendance</span>
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-white">{student.attendancePercentage}%</div>
            <div className="text-[11px] text-emerald-400 font-medium mt-1">Eligible for Exams (Min 75%)</div>
          </div>
        </div>

        <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">CGPA</span>
            <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-white">{student.cgpa}</div>
            <div className="text-[11px] text-indigo-400 font-medium mt-1">Distinction Grade</div>
          </div>
        </div>

        <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Active Assignments</span>
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-white">{assignments.length}</div>
            <div className="text-[11px] text-amber-400 font-medium mt-1">Due this week</div>
          </div>
        </div>

        <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Placement Drives</span>
            <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
              <Briefcase className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-white">{placementDrives.length}</div>
            <div className="text-[11px] text-purple-400 font-medium mt-1">Eligible to apply</div>
          </div>
        </div>
      </div>

      {/* Tabs / Switcher */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
        {['overview', 'ai', 'assignments', 'placements', 'notices'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-xs font-semibold capitalize transition cursor-pointer ${
              activeTab === tab 
                ? 'bg-indigo-600 text-white shadow-md' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            {tab === 'ai' ? '🤖 AI Assistant' : tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'ai' && (
        <AiAssistantWidget />
      )}

      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Today's Classes & Assignments */}
          <div className="lg:col-span-2 space-y-6">
            {/* Timetable / Classes Today */}
            <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-6">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 mb-4">
                <Calendar className="w-4 h-4 text-indigo-400" />
                Today's Academic Schedule
              </h3>
              <div className="space-y-3">
                {[
                  { time: '09:00 - 10:00', subject: 'Deep Learning', room: 'LH-302', faculty: 'Prof. Rajesh Smith' },
                  { time: '11:00 - 12:00', subject: 'Web Programming & Microservices', room: 'Lab 4', faculty: 'Dr. K. V. Rao' },
                  { time: '02:00 - 03:00', subject: 'Cloud Computing & DevOps', room: 'LH-201', faculty: 'Prof. Ananya Sen' }
                ].map((c, i) => (
                  <div key={i} className="flex items-center justify-between p-3.5 rounded-lg bg-slate-950/60 border border-slate-800/60">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-10 rounded-full bg-indigo-500"></div>
                      <div>
                        <div className="text-sm font-semibold text-white">{c.subject}</div>
                        <div className="text-xs text-slate-400">{c.faculty} • {c.room}</div>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-slate-300 bg-slate-800/60 px-2.5 py-1 rounded">
                      {c.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Assignments Preview */}
            <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <FileText className="w-4 h-4 text-amber-400" />
                  Pending Coursework
                </h3>
                <button onClick={() => setActiveTab('assignments')} className="text-xs text-indigo-400 hover:underline flex items-center gap-1">
                  View All <ChevronRight className="w-3 h-3" />
                </button>
              </div>
              <div className="space-y-3">
                {assignments.map((a) => (
                  <div key={a.id} className="p-4 rounded-lg bg-slate-950/60 border border-slate-800/60 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-semibold text-indigo-400">{a.subject}</div>
                      <div className="text-sm font-medium text-white">{a.title}</div>
                      <div className="text-xs text-slate-400 mt-1">Due Date: {a.dueDate} • {a.totalMarks} Marks</div>
                    </div>
                    <button className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium cursor-pointer">
                      Submit Work
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: AI Quick Widget & Campus Notices */}
          <div className="space-y-6">
            {/* Quick AI Trigger Card */}
            <div className="p-5 rounded-xl bg-gradient-to-br from-indigo-950/40 via-purple-950/20 to-slate-900 border border-indigo-900/40">
              <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase">
                <Sparkles className="w-4 h-4" /> AI Assistant Available
              </div>
              <h4 className="text-sm font-semibold text-white mt-2">
                Need immediate answers about exams or attendance?
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                Our RAG engine is indexed with your university academic regulations.
              </p>
              <button 
                onClick={() => setActiveTab('ai')}
                className="mt-4 w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-medium flex items-center justify-center gap-2 cursor-pointer shadow"
              >
                Open Campus Assistant
              </button>
            </div>

            {/* Campus Notices */}
            <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-6">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 mb-4">
                <Bell className="w-4 h-4 text-purple-400" />
                Latest Announcements
              </h3>
              <div className="space-y-3">
                {notices.map((n) => (
                  <div key={n.id} className="p-3 rounded-lg bg-slate-950/60 border border-slate-800/60">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-400">
                        {n.category}
                      </span>
                      <span className="text-[10px] text-slate-500">{n.postedDate}</span>
                    </div>
                    <div className="text-xs font-semibold text-white mt-1.5">{n.title}</div>
                    <div className="text-xs text-slate-400 mt-1 line-clamp-2">{n.content}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'assignments' && (
        <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-6 space-y-4">
          <h3 className="text-base font-bold text-white">Course Assignments & Labs</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {assignments.map((a) => (
              <div key={a.id} className="p-5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-semibold text-indigo-400">{a.subject}</span>
                  <h4 className="text-sm font-bold text-white mt-1">{a.title}</h4>
                  <p className="text-xs text-slate-300 mt-2">{a.description}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-xs text-slate-400">Due: {a.dueDate}</span>
                  <button className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium rounded-lg cursor-pointer">
                    Upload Solution
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'placements' && (
        <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-6 space-y-4">
          <h3 className="text-base font-bold text-white">Active Placement Drives</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {placementDrives.map((d) => (
              <div key={d.id} className="p-5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-white">{d.companyName}</span>
                    <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      {d.packageLPA}
                    </span>
                  </div>
                  <div className="text-xs text-indigo-400 font-medium mt-1">{d.roleName}</div>
                  <div className="mt-3 space-y-1 text-xs text-slate-400">
                    <div>Min CGPA: <span className="text-slate-200 font-semibold">{d.minCgpa}</span></div>
                    <div>Eligible: <span className="text-slate-200">{d.eligibleBranches}</span></div>
                    <div>Location: <span className="text-slate-200">{d.jobLocation}</span></div>
                    <div>Drive Date: <span className="text-slate-200">{d.driveDate}</span></div>
                  </div>
                </div>
                <button className="mt-4 w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold cursor-pointer transition">
                  Apply for Drive
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'notices' && (
        <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-6 space-y-4">
          <h3 className="text-base font-bold text-white">Campus Notices & Circulars</h3>
          <div className="space-y-3">
            {notices.map((n) => (
              <div key={n.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase px-2.5 py-1 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    {n.category} • Priority: {n.priority}
                  </span>
                  <span className="text-xs text-slate-400">{n.postedDate} • Posted by {n.postedBy}</span>
                </div>
                <h4 className="text-sm font-bold text-white mt-2">{n.title}</h4>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">{n.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default StudentDashboardView;
