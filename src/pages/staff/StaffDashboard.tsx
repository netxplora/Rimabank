import React from 'react';
import { Link } from 'react-router-dom';
import {
  MessageSquare,
  BookOpen,
  Image as ImageIcon,
  Bell,
  ArrowRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  Briefcase,
  Users,
  ShieldCheck
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useCMS } from '@/context/CMSContext';
import { Button } from '@/components/ui/button';

export default function StaffDashboard() {
  const { user } = useAuth();
  const { enquiries, publications, announcements, mediaAssets } = useCMS();

  const unreadEnquiries = enquiries.filter(e => e.status === 'unread');
  const inProgressEnquiries = enquiries.filter(e => e.status === 'in_progress');
  const resolvedEnquiries = enquiries.filter(e => e.status === 'resolved');
  const myAssignedEnquiries = enquiries.filter(e => e.assignedTo === user?.id || e.assignedTo === user?.name);

  const draftPublications = publications.filter(p => p.status === 'draft' || p.status === 'review');
  const activeAnnouncements = announcements.filter(a => a.status === 'published');

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#064e3b] to-[#047857] rounded-2xl p-6 sm:p-8 text-white shadow-sm relative overflow-hidden">
        <div className="max-w-2xl relative z-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-emerald-100 text-xs font-semibold uppercase tracking-wider border border-white/20">
            <Briefcase className="h-3.5 w-3.5" />
            Operations & Support Desk
          </div>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight">
            Welcome, {user?.name || 'Staff Officer'}
          </h1>
          <p className="text-emerald-100/80 text-xs sm:text-sm leading-relaxed">
            Manage inbound customer support requests, author educational articles for administrator review, and stay informed on official bank notices.
          </p>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Unread Enquiries */}
        <div className="bg-white p-5 rounded-2xl border border-[#e2e8f0] shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold uppercase tracking-wider">Unread Enquiries</span>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
              <MessageSquare className="h-4 w-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <p className="text-2xl font-bold font-heading text-[#0a1e3f]">{unreadEnquiries.length}</p>
            <Link to="/staff/enquiries" className="text-xs text-emerald-600 hover:underline font-semibold flex items-center gap-1">
              View Inbox <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>

        {/* In Progress Enquiries */}
        <div className="bg-white p-5 rounded-2xl border border-[#e2e8f0] shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold uppercase tracking-wider">In Resolution</span>
            <div className="p-2 rounded-xl bg-sky-50 text-[#0284c7]">
              <Clock className="h-4 w-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <p className="text-2xl font-bold font-heading text-[#0a1e3f]">{inProgressEnquiries.length}</p>
            <span className="text-xs text-slate-400">Active Tickets</span>
          </div>
        </div>

        {/* Drafts in Review */}
        <div className="bg-white p-5 rounded-2xl border border-[#e2e8f0] shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold uppercase tracking-wider">Draft Articles</span>
            <div className="p-2 rounded-xl bg-purple-50 text-purple-600">
              <BookOpen className="h-4 w-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <p className="text-2xl font-bold font-heading text-[#0a1e3f]">{draftPublications.length}</p>
            <Link to="/staff/publications" className="text-xs text-emerald-600 hover:underline font-semibold flex items-center gap-1">
              Draft New <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>

        {/* Resolved Today */}
        <div className="bg-white p-5 rounded-2xl border border-[#e2e8f0] shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold uppercase tracking-wider">Resolved Tickets</span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <CheckCircle2 className="h-4 w-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <p className="text-2xl font-bold font-heading text-[#0a1e3f]">{resolvedEnquiries.length}</p>
            <span className="text-xs text-emerald-600 font-medium">Completed</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Enquiries Queue & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Recent Enquiries Queue (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-[#e2e8f0] p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#e2e8f0]">
            <div>
              <h3 className="font-heading font-bold text-base text-[#0a1e3f]">
                Customer Enquiries Requiring Attention
              </h3>
              <p className="text-xs text-slate-400">
                Inbound customer requests submitted via the public contact forms
              </p>
            </div>
            <Link
              to="/staff/enquiries"
              className="text-xs text-emerald-600 hover:text-emerald-700 font-semibold flex items-center gap-1"
            >
              All Enquiries ({enquiries.length}) <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {enquiries.slice(0, 5).map((enq) => (
              <div
                key={enq.id}
                className="p-4 rounded-xl border border-slate-100 hover:border-emerald-200 bg-slate-50/50 hover:bg-emerald-50/20 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#0a1e3f] truncate">{enq.subject}</span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide ${
                        enq.status === 'unread'
                          ? 'bg-amber-100 text-amber-800'
                          : enq.status === 'in_progress'
                          ? 'bg-sky-100 text-sky-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {enq.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 truncate">{enq.message}</p>
                  <div className="flex items-center gap-3 text-[11px] text-slate-400">
                    <span>{enq.name} ({enq.email})</span>
                    <span>•</span>
                    <span>{new Date(enq.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>

                <Link
                  to="/staff/enquiries"
                  className="shrink-0 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-all text-center"
                >
                  Respond
                </Link>
              </div>
            ))}

            {enquiries.length === 0 && (
              <div className="text-center py-10 text-slate-400 text-xs">
                No customer enquiries currently in queue.
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Quick Staff Actions & Bank Notices (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Quick Staff Tasks */}
          <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 shadow-xs space-y-4">
            <h3 className="font-heading font-bold text-sm text-[#0a1e3f] uppercase tracking-wider">
              Quick Operations
            </h3>

            <div className="space-y-2">
              <Link
                to="/staff/enquiries"
                className="flex items-center justify-between p-3 rounded-xl border border-slate-200/80 hover:bg-emerald-50/40 hover:border-emerald-300 transition-all text-xs font-semibold text-[#0a1e3f]"
              >
                <div className="flex items-center gap-2.5">
                  <MessageSquare className="h-4 w-4 text-emerald-600" />
                  <span>Review Inbound Enquiries</span>
                </div>
                <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
              </Link>

              <Link
                to="/staff/publications"
                className="flex items-center justify-between p-3 rounded-xl border border-slate-200/80 hover:bg-emerald-50/40 hover:border-emerald-300 transition-all text-xs font-semibold text-[#0a1e3f]"
              >
                <div className="flex items-center gap-2.5">
                  <BookOpen className="h-4 w-4 text-sky-600" />
                  <span>Author Publication Draft</span>
                </div>
                <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
              </Link>

              <Link
                to="/staff/media"
                className="flex items-center justify-between p-3 rounded-xl border border-slate-200/80 hover:bg-emerald-50/40 hover:border-emerald-300 transition-all text-xs font-semibold text-[#0a1e3f]"
              >
                <div className="flex items-center gap-2.5">
                  <ImageIcon className="h-4 w-4 text-purple-600" />
                  <span>Upload Media Assets</span>
                </div>
                <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
              </Link>
            </div>
          </div>

          {/* Active Bank Notices */}
          <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-heading font-bold text-sm text-[#0a1e3f] uppercase tracking-wider">
                Active Bank Notices
              </h3>
              <Link to="/staff/announcements" className="text-[11px] text-emerald-600 hover:underline font-semibold">
                View All
              </Link>
            </div>

            <div className="space-y-2.5">
              {activeAnnouncements.slice(0, 3).map((ann) => (
                <div key={ann.id} className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#0a1e3f] truncate">{ann.title}</span>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 uppercase">
                      {ann.priority}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 line-clamp-2">{ann.message}</p>
                </div>
              ))}

              {activeAnnouncements.length === 0 && (
                <p className="text-xs text-slate-400 text-center py-4">No active notices.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
