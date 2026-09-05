import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  FileText,
  Tag,
  Bell,
  BookOpen,
  MessageSquare,
  Image as ImageIcon,
  ShieldCheck,
  TrendingUp,
  ArrowUpRight,
  Clock,
  PlusCircle,
  CheckCircle2,
  AlertCircle,
  Eye,
  ExternalLink
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts';
import { useCMS } from '@/context/CMSContext';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';

export default function AdminDashboard() {
  const { user } = useAuth();
  const {
    siteContent,
    promotions,
    announcements,
    publications,
    enquiries,
    mediaAssets,
    auditLogs
  } = useCMS();

  // Metrics computation
  const publishedPromos = promotions.filter(p => p.status === 'published');
  const draftPromos = promotions.filter(p => p.status === 'draft');
  const activeAlerts = announcements.filter(a => a.status === 'published' && a.displayAsBanner);
  const unreadEnquiries = enquiries.filter(e => e.status === 'unread');
  const publishedPubs = publications.filter(p => p.status === 'published');
  const draftPubs = publications.filter(p => p.status === 'draft' || p.status === 'review');

  const totalPublishedContent = publishedPromos.length + publishedPubs.length + announcements.filter(a => a.status === 'published').length + 1; // +1 for landing page
  const totalDraftContent = draftPromos.length + draftPubs.length + announcements.filter(a => a.status === 'draft').length;

  // Real Dynamic Chart Data: Inflow & Resolution aggregated by Month
  const enquiryTrendData = useMemo(() => {
    const monthMap: { [key: string]: { month: string; volume: number; resolved: number; order: number } } = {};
    const now = new Date();

    // Create 6 monthly buckets (current month and 5 preceding)
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const shortName = d.toLocaleString('en-US', { month: 'short' });
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      monthMap[key] = { month: shortName, volume: 0, resolved: 0, order: 5 - i };
    }

    enquiries.forEach(enq => {
      if (!enq.createdAt) return;
      const d = new Date(enq.createdAt);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      if (monthMap[key]) {
        monthMap[key].volume += 1;
        if (enq.status === 'resolved' || enq.status === 'closed') {
          monthMap[key].resolved += 1;
        }
      }
    });

    const result = Object.values(monthMap).sort((a, b) => a.order - b.order);
    // If no enquiries exist yet in current window, provide a baseline with actual count
    if (result.every(r => r.volume === 0) && enquiries.length > 0) {
      result[result.length - 1].volume = enquiries.length;
      result[result.length - 1].resolved = enquiries.filter(e => e.status === 'resolved' || e.status === 'closed').length;
    }
    return result;
  }, [enquiries]);

  // Chart Data: Content by Category
  const contentDistributionData = [
    { name: 'Publications', value: publications.length, color: '#0284c7' },
    { name: 'Promotions', value: promotions.length, color: '#38bdf8' },
    { name: 'Announcements', value: announcements.length, color: '#f59e0b' },
    { name: 'Enquiries', value: enquiries.length, color: '#10b981' }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome & Overview Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-[#e2e8f0] shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-sky-100 text-[#0284c7] text-[11px] font-bold uppercase tracking-wider">
              {user?.role === 'admin' ? 'Super Administrator' : 'Staff Officer'}
            </span>
            <span className="text-xs text-slate-400">• Institutional CMS</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-heading font-bold text-[#0a1e3f] tracking-tight">
            Welcome back, {user?.name}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Here is your real-time content governance, public website metrics, and customer communications summary.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
          <Button asChild size="sm" variant="outline" className="h-9 rounded-xl border-[#e2e8f0] text-xs font-semibold">
            <a href="/" target="_blank" rel="noreferrer" className="flex items-center gap-1.5">
              <ExternalLink className="h-3.5 w-3.5 text-sky-500" />
              <span>Live Website</span>
            </a>
          </Button>

          <Button asChild size="sm" className="h-9 rounded-xl bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-semibold shadow-sm">
            <Link to="/admin/content" className="flex items-center gap-1.5">
              <FileText className="h-3.5 w-3.5" />
              <span>Edit Landing Page</span>
            </Link>
          </Button>
        </div>
      </div>

      {/* Primary KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Published */}
        <div className="p-5 rounded-2xl bg-white border border-[#e2e8f0] shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              Published Content
            </span>
            <div className="text-2xl font-heading font-bold text-[#0a1e3f] mt-1">
              {totalPublishedContent}
            </div>
            <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1 mt-1">
              <CheckCircle2 className="h-3.5 w-3.5" /> Live on Public Site
            </span>
          </div>
          <div className="h-11 w-11 rounded-xl bg-sky-50 text-[#0284c7] flex items-center justify-center">
            <FileText className="h-5 w-5" />
          </div>
        </div>

        {/* Drafts & Reviews */}
        <div className="p-5 rounded-2xl bg-white border border-[#e2e8f0] shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              Drafts & Reviews
            </span>
            <div className="text-2xl font-heading font-bold text-[#0a1e3f] mt-1">
              {totalDraftContent}
            </div>
            <span className="text-[11px] text-amber-600 font-semibold flex items-center gap-1 mt-1">
              <Clock className="h-3.5 w-3.5" /> Awaiting Action
            </span>
          </div>
          <div className="h-11 w-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Clock className="h-5 w-5" />
          </div>
        </div>

        {/* Active Promotions */}
        <div className="p-5 rounded-2xl bg-white border border-[#e2e8f0] shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              Active Promotions
            </span>
            <div className="text-2xl font-heading font-bold text-[#0a1e3f] mt-1">
              {publishedPromos.length}
            </div>
            <span className="text-[11px] text-[#0284c7] font-semibold flex items-center gap-1 mt-1">
              <Tag className="h-3.5 w-3.5" /> {promotions.length} Total Campaigns
            </span>
          </div>
          <div className="h-11 w-11 rounded-xl bg-blue-50 text-sky-600 flex items-center justify-center">
            <Tag className="h-5 w-5" />
          </div>
        </div>

        {/* Unread Enquiries */}
        <div className="p-5 rounded-2xl bg-white border border-[#e2e8f0] shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              Unread Enquiries
            </span>
            <div className="text-2xl font-heading font-bold text-[#0a1e3f] mt-1">
              {unreadEnquiries.length}
            </div>
            <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1 mt-1">
              <MessageSquare className="h-3.5 w-3.5" /> {enquiries.length} Total Tickets
            </span>
          </div>
          <div className="h-11 w-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <MessageSquare className="h-5 w-5" />
          </div>
        </div>
      </div>

      {/* Active Announcements Status Banner (if any) */}
      {activeAlerts.length > 0 && (
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500 text-white shadow-xs">
              <Bell className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#0a1e3f]">
                Active Alert Banner Live on Website
              </p>
              <p className="text-xs text-slate-600 line-clamp-1">
                {activeAlerts[0].title}: {activeAlerts[0].message}
              </p>
            </div>
          </div>
          <Button asChild size="sm" variant="outline" className="h-8 text-xs bg-white rounded-xl border-amber-300 text-amber-900 hover:bg-amber-100">
            <Link to="/admin/announcements">
              Manage Announcements
            </Link>
          </Button>
        </div>
      )}

      {/* Data Visualization Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Enquiries Inflow Trend (2 cols) */}
        <div className="lg:col-span-2 p-5 rounded-2xl bg-white border border-[#e2e8f0] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-heading font-bold text-sm text-[#0a1e3f]">
                Customer Enquiry Inflow & Resolution
              </h3>
              <p className="text-xs text-slate-400">Monthly inbound inquiries from public website</p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
              Last 6 Months
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={enquiryTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0284c7" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#0284c7" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorResolved" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} allowDecimals={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0a1e3f', borderRadius: '12px', border: 'none', color: '#fff', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="volume" stroke="#0284c7" strokeWidth={2} fillOpacity={1} fill="url(#colorVolume)" name="Inbound Enquiries" />
                <Area type="monotone" dataKey="resolved" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorResolved)" name="Resolved Tickets" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Content Breakdown Pie (1 col) */}
        <div className="p-5 rounded-2xl bg-white border border-[#e2e8f0] shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="font-heading font-bold text-sm text-[#0a1e3f]">
              Content Distribution
            </h3>
            <p className="text-xs text-slate-400 mb-4">Total active CMS resource distribution</p>
          </div>

          <div className="h-44 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={contentDistributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={65}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {contentDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#0a1e3f', borderRadius: '12px', border: 'none', color: '#fff', fontSize: '12px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-xs">
            {contentDistributionData.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                <span className="text-slate-600 truncate">{item.name}:</span>
                <span className="font-bold text-[#0a1e3f]">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions & Recent Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions Panel (1 col) */}
        <div className="p-5 rounded-2xl bg-white border border-[#e2e8f0] shadow-xs space-y-3">
          <h3 className="font-heading font-bold text-sm text-[#0a1e3f]">
            Quick Actions
          </h3>
          <p className="text-xs text-slate-400 mb-2">Common editorial workflows</p>

          <div className="space-y-2">
            <Link
              to="/admin/publications"
              className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-sky-50 border border-slate-200/60 transition-all text-xs font-semibold text-[#0a1e3f] group"
            >
              <div className="flex items-center gap-2.5">
                <BookOpen className="h-4 w-4 text-[#0284c7]" />
                <span>Write New Publication</span>
              </div>
              <ArrowUpRight className="h-4 w-4 text-slate-400 group-hover:text-[#0284c7] transition-all" />
            </Link>

            <Link
              to="/admin/promotions"
              className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-sky-50 border border-slate-200/60 transition-all text-xs font-semibold text-[#0a1e3f] group"
            >
              <div className="flex items-center gap-2.5">
                <Tag className="h-4 w-4 text-sky-600" />
                <span>Launch Promotion Offer</span>
              </div>
              <ArrowUpRight className="h-4 w-4 text-slate-400 group-hover:text-sky-600 transition-all" />
            </Link>

            <Link
              to="/admin/announcements"
              className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-amber-50 border border-slate-200/60 transition-all text-xs font-semibold text-[#0a1e3f] group"
            >
              <div className="flex items-center gap-2.5">
                <Bell className="h-4 w-4 text-amber-600" />
                <span>Publish Urgent Notice</span>
              </div>
              <ArrowUpRight className="h-4 w-4 text-slate-400 group-hover:text-amber-600 transition-all" />
            </Link>

            <Link
              to="/admin/enquiries"
              className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-emerald-50 border border-slate-200/60 transition-all text-xs font-semibold text-[#0a1e3f] group"
            >
              <div className="flex items-center gap-2.5">
                <MessageSquare className="h-4 w-4 text-emerald-600" />
                <span>Review Inbound Enquiries</span>
              </div>
              <ArrowUpRight className="h-4 w-4 text-slate-400 group-hover:text-emerald-600 transition-all" />
            </Link>
          </div>
        </div>

        {/* Recent Audit Activity Feed (2 cols) */}
        <div className="lg:col-span-2 p-5 rounded-2xl bg-white border border-[#e2e8f0] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-heading font-bold text-sm text-[#0a1e3f]">
                Recent CMS Audit Activity
              </h3>
              <p className="text-xs text-slate-400">Chronological governance trail</p>
            </div>
            <Link
              to="/admin/audit-logs"
              className="text-xs font-semibold text-[#0284c7] hover:underline"
            >
              View Full Trail →
            </Link>
          </div>

          <div className="space-y-3">
            {auditLogs.slice(0, 4).map((log) => (
              <div
                key={log.id}
                className="p-3 rounded-xl bg-slate-50 border border-slate-200/60 flex items-start justify-between gap-3 text-xs"
              >
                <div className="flex items-start gap-2.5 overflow-hidden">
                  <div className="h-7 w-7 rounded-lg bg-[#0a1e3f] text-white font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                    {log.action.substring(0, 3)}
                  </div>
                  <div>
                    <p className="font-semibold text-[#0a1e3f] truncate">
                      {log.userName} • <span className="font-normal text-slate-500">{log.details}</span>
                    </p>
                    <span className="text-[10px] text-slate-400">
                      {new Date(log.timestamp).toLocaleString()} • IP: {log.ipAddress || '127.0.0.1'}
                    </span>
                  </div>
                </div>

                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-200 text-slate-700 uppercase shrink-0">
                  {log.resourceType}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
