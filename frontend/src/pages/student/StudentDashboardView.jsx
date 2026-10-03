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
  ArrowUpRight,
  CheckSquare,
  AlertCircle
} from 'lucide-react';
import AiAssistantWidget from '../../components/ai/AiAssistantWidget';

function StudentDashboardView({ data, activeSidebarItem, setActiveSidebarItem }) {
  const [internalTab, setInternalTab] = useState('overview');
  
  // Use active sidebar item if not default dashboard, or use internalTab
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
      {/* 1. Header Banner */}
      <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2563EB] mb-1">
            <span>B.Tech CSE • Semester {student.semester}</span>
            <span>•</span>
            <span className="font-mono text-[#64748B]">{student.rollNumber}</span>
          </div>
          <h2 className="text-2xl font-bold text-[#0F172A]">
            Good morning, {data?.user?.fullName || "Akshaya"} 👋
          </h2>
          <p className="text-xs sm:text-sm text-[#64748B] mt-1">
            Here's what's happening today in your academic portal.
          </p>
        </div>

        <button 
          onClick={() => {
            if (setActiveSidebarItem) setActiveSidebarItem('ai');
            else setInternalTab('ai');
          }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#F0FDFA] hover:bg-[#CCFBF1] text-[#0F766E] border border-[#14B8A6]/30 text-xs font-bold transition cursor-pointer self-start md:self-auto shadow-2xs"
        >
          <Sparkles className="w-4 h-4 text-[#14B8A6]" />
          Ask Campus AI
        </button>
      </div>

      {/* 2. Top Metric KPI Row: Attendance, Classes, Tasks, Notices */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Attendance */}
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

        {/* Classes Today */}
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-xs relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#14B8A6]"></div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">Today's Classes</span>
            <div className="p-2 rounded-lg bg-[#F0FDFA] text-[#14B8A6]">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-bold text-[#0F172A]">3 Lectures</div>
            <div className="text-[11px] font-medium text-[#2563EB] mt-1">
              Next: 09:00 AM (LH-302)
            </div>
          </div>
        </div>

        {/* Tasks / Assignments */}
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-xs relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#F59E0B]"></div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">Pending Tasks</span>
            <div className="p-2 rounded-lg bg-[#FFFBEB] text-[#F59E0B]">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-bold text-[#0F172A]">{assignments.length} Submissions</div>
            <div className="text-[11px] font-medium text-[#F59E0B] mt-1">
              Deep Learning due soon
            </div>
          </div>
        </div>

        {/* Campus Notices */}
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-xs relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#0F172A]"></div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">Circulars</span>
            <div className="p-2 rounded-lg bg-[#F1F5F9] text-[#0F172A]">
              <Bell className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-bold text-[#0F172A]">{notices.length} New</div>
            <div className="text-[11px] font-medium text-[#16A34A] mt-1">
              Mid-term schedule out
            </div>
          </div>
        </div>
      </div>

      {/* 3. Main Split Content Area */}
      {currentView === 'ai' ? (
        <AiAssistantWidget />
      ) : currentView === 'attendance' ? (
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-[#0F172A]">Attendance & Academic Eligibility</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { subject: 'Deep Learning', present: 28, total: 32, pct: 87.5 },
              { subject: 'Web Programming & Microservices', present: 26, total: 30, pct: 86.6 },
              { subject: 'Cloud Computing & DevOps', present: 22, total: 30, pct: 73.3 }
            ].map((sub, i) => (
              <div key={i} className="p-5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0]">
                <div className="text-sm font-bold text-[#0F172A]">{sub.subject}</div>
                <div className="text-2xl font-bold mt-2" style={{ color: sub.pct >= 75 ? '#16A34A' : '#DC2626' }}>
                  {sub.pct}%
                </div>
                <div className="text-xs text-[#64748B] mt-1">
                  Attended {sub.present} of {sub.total} sessions
                </div>
                <div className="mt-3 w-full bg-[#E2E8F0] h-2 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full" 
                    style={{ 
                      width: `${sub.pct}%`, 
                      backgroundColor: sub.pct >= 75 ? '#16A34A' : '#DC2626' 
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : currentView === 'assignments' ? (
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-[#0F172A]">Coursework & Assignments</h3>
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
      ) : currentView === 'placements' ? (
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-[#0F172A]">Active Placement Opportunities</h3>
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
                    <div>Eligible: <span className="text-[#0F172A]">{d.eligibleBranches}</span></div>
                    <div>Location: <span className="text-[#0F172A]">{d.jobLocation}</span></div>
                    <div>Date: <span className="text-[#0F172A] font-medium">{d.driveDate}</span></div>
                  </div>
                </div>
                <button className="mt-4 w-full py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-xl text-xs font-bold cursor-pointer transition shadow-xs">
                  Apply for Drive
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Default Dashboard view: Split into Schedule + Embedded Campus AI */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column (7 cols): Today's Schedule & Quick Action Cards */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Today's Schedule */}
            <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-[#0F172A] uppercase tracking-wider flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#2563EB]" />
                  Today's Schedule
                </h3>
                <span className="text-xs text-[#64748B] font-medium">B.Tech VI Sem • Block B</span>
              </div>
              <div className="space-y-3">
                {[
                  { time: '09:00 - 10:00 AM', subject: 'Deep Learning', room: 'LH-302', faculty: 'Prof. Rajesh Smith' },
                  { time: '11:00 - 12:00 PM', subject: 'Web Programming', room: 'Lab 4', faculty: 'Dr. K. V. Rao' },
                  { time: '02:00 - 03:00 PM', subject: 'Cloud Computing', room: 'LH-201', faculty: 'Prof. Ananya Sen' }
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

            {/* Assignments Quick View */}
            <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-[#0F172A] uppercase tracking-wider flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#F59E0B]" />
                  Upcoming Submissions
                </h3>
                <button 
                  onClick={() => {
                    if (setActiveSidebarItem) setActiveSidebarItem('assignments');
                    else setInternalTab('assignments');
                  }}
                  className="text-xs font-bold text-[#2563EB] hover:text-[#1D4ED8] flex items-center gap-1 cursor-pointer"
                >
                  View All ({assignments.length}) <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="space-y-3">
                {assignments.map((a) => (
                  <div key={a.id} className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-[#2563EB]">{a.subject}</span>
                      <h4 className="text-sm font-bold text-[#1E293B] mt-0.5">{a.title}</h4>
                      <p className="text-xs text-[#64748B] mt-1">Due: {a.dueDate} • {a.totalMarks} Marks</p>
                    </div>
                    <button className="px-3.5 py-1.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold cursor-pointer shadow-xs transition">
                      Submit
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Campus Notices */}
            <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-[#0F172A] uppercase tracking-wider flex items-center gap-2">
                  <Bell className="w-4 h-4 text-[#0F172A]" />
                  Campus Announcements
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

          {/* Right Column (5 cols): Embedded Campus AI Assistant directly on dashboard */}
          <div className="lg:col-span-5">
            <div className="sticky top-24">
              <AiAssistantWidget />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StudentDashboardView;
