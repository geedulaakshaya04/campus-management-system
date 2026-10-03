import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Award, 
  Clock, 
  Briefcase, 
  Calendar, 
  FileText, 
  Bell, 
  Sparkles, 
  ChevronRight,
  BookOpen,
  ArrowUpRight
} from 'lucide-react';
import AiAssistantWidget from '../../components/ai/AiAssistantWidget';

function StudentDashboardView({ data, activeSidebarItem }) {
  const [internalTab, setInternalTab] = useState('overview');
  
  // Use active sidebar item if clicked, or fallback to internalTab
  const currentView = activeSidebarItem && activeSidebarItem !== 'dashboard' 
    ? activeSidebarItem 
    : internalTab;

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
      {/* Header Banner */}
      <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2563EB] mb-1">
            <span>B.Tech CSE • Semester {student.semester}</span>
            <span>•</span>
            <span className="font-mono text-[#64748B]">{student.rollNumber}</span>
          </div>
          <h2 className="text-2xl font-bold text-[#0F172A]">
            Good Morning, {data?.user?.fullName || "Akshaya"} 👋
          </h2>
          <p className="text-xs sm:text-sm text-[#64748B] mt-1">
            Here is your academic overview for today. All coursework and attendance meet university regulations.
          </p>
        </div>

        <button 
          onClick={() => setInternalTab('ai')}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#F0FDFA] hover:bg-[#CCFBF1] text-[#0F766E] border border-[#14B8A6]/30 text-xs font-bold transition cursor-pointer self-start md:self-auto shadow-2xs"
        >
          <Sparkles className="w-4 h-4 text-[#14B8A6]" />
          Ask Campus AI Assistant
        </button>
      </div>

      {/* KPI Cards: White Cards with subtle colored accents */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Attendance - Blue Accent */}
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-xs relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#2563EB]"></div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">Attendance</span>
            <div className="p-2 rounded-lg bg-[#EFF6FF] text-[#2563EB]">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-bold text-[#0F172A]">{student.attendancePercentage}%</div>
            <div className="text-[11px] font-medium text-[#16A34A] mt-1 flex items-center gap-1">
              <span>● Above 75% Cutoff</span>
            </div>
          </div>
        </div>

        {/* CGPA - Teal Accent */}
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-xs relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#14B8A6]"></div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">CGPA</span>
            <div className="p-2 rounded-lg bg-[#F0FDFA] text-[#14B8A6]">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-bold text-[#0F172A]">{student.cgpa}</div>
            <div className="text-[11px] font-medium text-[#2563EB] mt-1">
              First Class with Distinction
            </div>
          </div>
        </div>

        {/* Assignments - Amber Accent */}
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-xs relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#F59E0B]"></div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">Assignments</span>
            <div className="p-2 rounded-lg bg-[#FFFBEB] text-[#F59E0B]">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-bold text-[#0F172A]">{assignments.length} Pending</div>
            <div className="text-[11px] font-medium text-[#F59E0B] mt-1">
              Due within this week
            </div>
          </div>
        </div>

        {/* Placement Drives - Navy Accent */}
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-xs relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#0F172A]"></div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">Placement Drives</span>
            <div className="p-2 rounded-lg bg-[#F1F5F9] text-[#0F172A]">
              <Briefcase className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-bold text-[#0F172A]">{placementDrives.length} Active</div>
            <div className="text-[11px] font-medium text-[#16A34A] mt-1">
              Profile Eligible
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[#E2E8F0] pb-2">
        {['overview', 'ai', 'assignments', 'placements', 'notices'].map((tab) => (
          <button
            key={tab}
            onClick={() => setInternalTab(tab)}
            className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition cursor-pointer ${
              currentView === tab 
                ? 'bg-[#2563EB] text-white shadow-xs' 
                : 'text-[#64748B] hover:text-[#0F172A] hover:bg-white'
            }`}
          >
            {tab === 'ai' ? '✦ Campus AI Assistant' : tab}
          </button>
        ))}
      </div>

      {/* Main View Router */}
      {currentView === 'ai' && <AiAssistantWidget />}

      {currentView === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Today's Lectures & Assignments */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Today's Classes */}
            <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-[#0F172A] uppercase tracking-wider flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#2563EB]" />
                  Today's Lecture Schedule
                </h3>
                <span className="text-xs text-[#64748B] font-medium">B.Tech VI Sem • Room Block B</span>
              </div>
              <div className="space-y-3">
                {[
                  { time: '09:00 - 10:00 AM', subject: 'Deep Learning', room: 'LH-302', faculty: 'Prof. Rajesh Smith' },
                  { time: '11:00 - 12:00 PM', subject: 'Web Programming & Microservices', room: 'Lab 4', faculty: 'Dr. K. V. Rao' },
                  { time: '02:00 - 03:00 PM', subject: 'Cloud Computing & DevOps', room: 'LH-201', faculty: 'Prof. Ananya Sen' }
                ].map((c, i) => (
                  <div key={i} className="flex items-center justify-between p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                    <div className="flex items-center gap-3">
                      <div className="w-1.5 h-10 rounded-full bg-[#2563EB]"></div>
                      <div>
                        <div className="text-sm font-bold text-[#1E293B]">{c.subject}</div>
                        <div className="text-xs text-[#64748B]">{c.faculty} • {c.room}</div>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-semibold text-[#2563EB] bg-[#EFF6FF] px-2.5 py-1 rounded-lg border border-[#DBEAFE]">
                      {c.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Course Assignments */}
            <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-[#0F172A] uppercase tracking-wider flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#F59E0B]" />
                  Active Assignments
                </h3>
                <button 
                  onClick={() => setInternalTab('assignments')} 
                  className="text-xs font-bold text-[#2563EB] hover:text-[#1D4ED8] flex items-center gap-1 cursor-pointer"
                >
                  View All ({assignments.length}) <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="space-y-3">
                {assignments.map((a) => (
                  <div key={a.id} className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <span className="text-xs font-bold text-[#2563EB]">{a.subject}</span>
                      <h4 className="text-sm font-bold text-[#1E293B] mt-0.5">{a.title}</h4>
                      <p className="text-xs text-[#64748B] mt-1">Due: {a.dueDate} • Maximum Score: {a.totalMarks} Marks</p>
                    </div>
                    <button className="px-3.5 py-2 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold self-start sm:self-auto cursor-pointer transition shadow-xs">
                      Submit Solution
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: AI Assistant Card + Circulars */}
          <div className="space-y-6">
            {/* AI Assistant Spotlight Card with Teal Styling */}
            <div className="bg-[#F0FDFA] border border-[#CCFBF1] rounded-2xl p-6 shadow-xs">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0F766E] mb-2">
                <Sparkles className="w-4 h-4 text-[#14B8A6]" />
                Institutional AI Assistant
              </div>
              <h4 className="text-base font-bold text-[#0F172A]">
                Have questions regarding attendance or exams?
              </h4>
              <p className="text-xs text-[#64748B] mt-1.5 leading-relaxed">
                The Campus RAG engine can clarify your attendance eligibility, semester dates, and placement policies instantly.
              </p>
              <button 
                onClick={() => setInternalTab('ai')}
                className="mt-4 w-full py-2.5 bg-[#14B8A6] hover:bg-[#0D9488] text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <span>Launch Campus AI Chat</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Campus Notices */}
            <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-[#0F172A] uppercase tracking-wider flex items-center gap-2">
                  <Bell className="w-4 h-4 text-[#2563EB]" />
                  Campus Circulars
                </h3>
              </div>
              <div className="space-y-3">
                {notices.map((n) => (
                  <div key={n.id} className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-[#EFF6FF] text-[#2563EB] border border-[#DBEAFE]">
                        {n.category}
                      </span>
                      <span className="text-[10px] text-[#64748B]">{n.postedDate}</span>
                    </div>
                    <div className="text-xs font-bold text-[#1E293B] mt-1.5">{n.title}</div>
                    <div className="text-xs text-[#64748B] mt-1 line-clamp-2">{n.content}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {currentView === 'assignments' && (
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-[#0F172A]">Coursework & Laboratory Assignments</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {assignments.map((a) => (
              <div key={a.id} className="p-5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-[#2563EB]">{a.subject}</span>
                  <h4 className="text-sm font-bold text-[#0F172A] mt-1">{a.title}</h4>
                  <p className="text-xs text-[#64748B] mt-2 leading-relaxed">{a.description}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#E2E8F0] flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#64748B]">Due Date: {a.dueDate}</span>
                  <button className="px-4 py-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold rounded-xl cursor-pointer shadow-xs transition">
                    Upload Solution
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {currentView === 'placements' && (
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-[#0F172A]">Active Placement Drives & Eligibility</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {placementDrives.map((d) => (
              <div key={d.id} className="p-5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-base font-bold text-[#0F172A]">{d.companyName}</span>
                    <span className="text-xs font-bold text-[#16A34A] bg-[#DCFCE7] px-2 py-0.5 rounded border border-[#BBF7D0]">
                      {d.packageLPA}
                    </span>
                  </div>
                  <div className="text-xs text-[#2563EB] font-bold mt-1">{d.roleName}</div>
                  <div className="mt-3 space-y-1.5 text-xs text-[#64748B]">
                    <div>Minimum CGPA: <span className="text-[#0F172A] font-bold">{d.minCgpa}</span></div>
                    <div>Backlog Cutoff: <span className="text-[#0F172A] font-bold">{d.maxBacklogs}</span></div>
                    <div>Eligible Branches: <span className="text-[#0F172A]">{d.eligibleBranches}</span></div>
                    <div>Job Location: <span className="text-[#0F172A]">{d.jobLocation}</span></div>
                    <div>Drive Date: <span className="text-[#0F172A] font-medium">{d.driveDate}</span></div>
                  </div>
                </div>
                <button className="mt-4 w-full py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-xl text-xs font-bold cursor-pointer transition shadow-xs">
                  Apply for Drive
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {currentView === 'notices' && (
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-[#0F172A]">Institutional Circulars & Notices</h3>
          <div className="space-y-3">
            {notices.map((n) => (
              <div key={n.id} className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase px-2.5 py-1 rounded bg-[#EFF6FF] text-[#2563EB] border border-[#DBEAFE]">
                    {n.category} • Priority: {n.priority}
                  </span>
                  <span className="text-xs text-[#64748B]">{n.postedDate} • Posted by {n.postedBy}</span>
                </div>
                <h4 className="text-sm font-bold text-[#0F172A] mt-2">{n.title}</h4>
                <p className="text-xs text-[#475569] mt-1 leading-relaxed">{n.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default StudentDashboardView;
