import React, { useState, useMemo } from 'react';
import {
  Mail,
  Download,
  Search,
  UserCheck,
  UserX,
  Trash2,
  Plus,
  X,
  Copy,
  Check,
  Calendar,
  Layers,
  FileSpreadsheet,
  AlertTriangle,
  Send,
  RefreshCw
} from 'lucide-react';
import * as XLSX from 'xlsx';
import { useCMS } from '@/context/CMSContext';
import { useAuth } from '@/context/AuthContext';
import { NewsletterSubscriber } from '@/types/cms';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function NewsletterSubscribers() {
  const { subscribers, subscribeNewsletter, unsubscribeNewsletter, toggleSubscriberStatus, deleteSubscriber } = useCMS();
  const { user, can } = useAuth();

  // Search & Filter State
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sourceFilter, setSourceFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'email'>('newest');

  // Selection state for bulk operations
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [deletingSubscriber, setDeletingSubscriber] = useState<NewsletterSubscriber | null>(null);

  // Form State for Manual Add
  const [newEmail, setNewEmail] = useState('');
  const [newSource, setNewSource] = useState('Manual Admin Entry');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Clipboard copied feedback
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);

  // Extract unique sources for filtering
  const sources = useMemo(() => {
    const set = new Set<string>();
    subscribers.forEach(s => {
      if (s.source) set.add(s.source);
    });
    return Array.from(set);
  }, [subscribers]);

  // Statistics
  const totalCount = subscribers.length;
  const activeCount = subscribers.filter(s => s.status === 'subscribed').length;
  const unsubscribedCount = subscribers.filter(s => s.status === 'unsubscribed').length;

  // Last 30 Days Growth count
  const recentCount = useMemo(() => {
    const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
    return subscribers.filter(s => new Date(s.subscribedAt).getTime() >= thirtyDaysAgo).length;
  }, [subscribers]);

  // Filtered & Sorted list
  const filteredSubscribers = useMemo(() => {
    return subscribers
      .filter(item => {
        const matchesSearch =
          item.email.toLowerCase().includes(search.toLowerCase()) ||
          (item.source && item.source.toLowerCase().includes(search.toLowerCase()));
        const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
        const matchesSource = sourceFilter === 'all' || (item.source || 'Website Footer') === sourceFilter;
        return matchesSearch && matchesStatus && matchesSource;
      })
      .sort((a, b) => {
        if (sortBy === 'newest') {
          return new Date(b.subscribedAt).getTime() - new Date(a.subscribedAt).getTime();
        }
        if (sortBy === 'oldest') {
          return new Date(a.subscribedAt).getTime() - new Date(b.subscribedAt).getTime();
        }
        return a.email.localeCompare(b.email);
      });
  }, [subscribers, search, statusFilter, sourceFilter, sortBy]);

  // Selection handlers
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(filteredSubscribers.map(s => s.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectRow = (id: string) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Add Subscriber
  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail.trim() || !newEmail.includes('@')) {
      toast.error('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await subscribeNewsletter(newEmail.trim(), newSource.trim() || 'Manual Admin Entry');
      if (res.ok) {
        toast.success(`Subscriber ${newEmail.trim().toLowerCase()} enrolled successfully.`);
        setNewEmail('');
        setNewSource('Manual Admin Entry');
        setIsAddModalOpen(false);
      } else {
        toast.error(res.error || 'Failed to add subscriber');
      }
    } catch (err: any) {
      toast.error(err?.message || 'An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Status Toggle
  const handleToggleStatus = async (sub: NewsletterSubscriber) => {
    if (!user) return;
    const res = await toggleSubscriberStatus(sub.id, { id: user.id, name: user.name, role: user.role });
    if (res.ok) {
      toast.success(`Status for ${sub.email} changed to ${sub.status === 'subscribed' ? 'unsubscribed' : 'subscribed'}.`);
    } else {
      toast.error(res.error || 'Failed to update subscriber status');
    }
  };

  // Delete Subscriber
  const handleDeleteConfirm = async () => {
    if (!deletingSubscriber || !user) return;
    const res = await deleteSubscriber(deletingSubscriber.id, { id: user.id, name: user.name, role: user.role });
    if (res.ok) {
      toast.success(`Subscriber ${deletingSubscriber.email} permanently removed.`);
    } else {
      toast.error(res.error || 'Failed to delete subscriber');
    }
    setDeletingSubscriber(null);
  };

  // Copy Single Email
  const copyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    setTimeout(() => setCopiedEmail(null), 2000);
    toast.success('Email copied to clipboard');
  };

  // Copy All Active Subscribed Emails (CSV / list)
  const copyAllActiveEmails = () => {
    const list = subscribers
      .filter(s => s.status === 'subscribed')
      .map(s => s.email)
      .join(', ');

    if (!list) {
      toast.error('No active subscribed emails found.');
      return;
    }

    navigator.clipboard.writeText(list);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2500);
    toast.success(`${activeCount} active subscriber emails copied to clipboard.`);
  };

  // Export to Excel (.xlsx)
  const exportToExcel = (exportList: NewsletterSubscriber[] = filteredSubscribers) => {
    if (exportList.length === 0) {
      toast.error('No subscriber records available to export.');
      return;
    }

    try {
      const dataToExport = exportList.map((sub, index) => ({
        'S/N': index + 1,
        'Email Address': sub.email,
        'Subscription Status': sub.status.toUpperCase(),
        'Acquisition Source': sub.source || 'Website Footer',
        'Subscribed Date': new Date(sub.subscribedAt).toLocaleDateString(),
        'Subscribed Time': new Date(sub.subscribedAt).toLocaleTimeString(),
        'Unsubscribed Date': sub.unsubscribedAt ? new Date(sub.unsubscribedAt).toLocaleDateString() : 'N/A',
        'Subscriber ID': sub.id
      }));

      const worksheet = XLSX.utils.json_to_sheet(dataToExport);

      // Auto-fit column widths
      const colWidths = [
        { wch: 6 },  // S/N
        { wch: 35 }, // Email
        { wch: 20 }, // Status
        { wch: 25 }, // Source
        { wch: 18 }, // Sub Date
        { wch: 18 }, // Sub Time
        { wch: 20 }, // Unsub Date
        { wch: 38 }  // ID
      ];
      worksheet['!cols'] = colWidths;

      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Subscribers');

      const dateStr = new Date().toISOString().split('T')[0];
      const filename = `RIMA_MFB_Newsletter_Subscribers_${dateStr}.xlsx`;

      XLSX.writeFile(workbook, filename);
      toast.success(`Successfully exported ${exportList.length} subscriber records to Excel.`);
    } catch (err: any) {
      console.error('Export Excel error:', err);
      toast.error('Failed to export Excel file. Please try again.');
    }
  };

  // Export to CSV
  const exportToCSV = (exportList: NewsletterSubscriber[] = filteredSubscribers) => {
    if (exportList.length === 0) {
      toast.error('No subscriber records available to export.');
      return;
    }

    const headers = ['Email Address', 'Status', 'Source', 'Subscribed At', 'Unsubscribed At', 'ID'];
    const rows = exportList.map(s => [
      `"${s.email}"`,
      `"${s.status}"`,
      `"${s.source || 'Website Footer'}"`,
      `"${new Date(s.subscribedAt).toISOString()}"`,
      `"${s.unsubscribedAt ? new Date(s.unsubscribedAt).toISOString() : ''}"`,
      `"${s.id}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    const dateStr = new Date().toISOString().split('T')[0];
    link.setAttribute('download', `RIMA_MFB_Newsletter_Subscribers_${dateStr}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success(`Exported ${exportList.length} records to CSV.`);
  };

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-[#e2e8f0] shadow-xs">
        <div>
          <h1 className="text-xl font-heading font-bold text-[#0a1e3f] tracking-tight flex items-center gap-2">
            <span>Newsletter Subscribers & Audience</span>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-sky-100 text-sky-800 border border-sky-200">
              {activeCount} Active
            </span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage your audience database, track subscription channels, and export recipient lists for banking updates.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            onClick={copyAllActiveEmails}
            variant="outline"
            className="h-9 rounded-xl text-xs font-semibold border-[#e2e8f0] flex items-center gap-1.5 hover:bg-slate-50"
          >
            {copiedAll ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4 text-slate-500" />}
            <span>{copiedAll ? 'Copied Active List' : 'Copy All Active Emails'}</span>
          </Button>

          <Button
            onClick={() => exportToExcel(filteredSubscribers)}
            className="h-9 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs flex items-center gap-1.5"
          >
            <FileSpreadsheet className="h-4 w-4" />
            <span>Export to Excel</span>
          </Button>

          <Button
            onClick={() => setIsAddModalOpen(true)}
            className="h-9 rounded-xl bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-semibold shadow-xs flex items-center gap-1.5"
          >
            <Plus className="h-4 w-4" />
            <span>Add Subscriber</span>
          </Button>
        </div>
      </div>

      {/* Metric Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className="bg-white p-4 rounded-2xl border border-[#e2e8f0] shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-1.5">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">Total Audience</span>
            <Mail className="h-4 w-4 text-[#0284c7]" />
          </div>
          <div className="text-2xl font-heading font-bold text-[#0a1e3f]">{totalCount}</div>
          <span className="text-[10px] text-slate-400">All registered emails</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-[#e2e8f0] shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-1.5">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">Active Subscribed</span>
            <UserCheck className="h-4 w-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-heading font-bold text-emerald-600">{activeCount}</div>
          <span className="text-[10px] text-slate-400">Receiving regular newsletters</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-[#e2e8f0] shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-1.5">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">Unsubscribed</span>
            <UserX className="h-4 w-4 text-slate-400" />
          </div>
          <div className="text-2xl font-heading font-bold text-slate-600">{unsubscribedCount}</div>
          <span className="text-[10px] text-slate-400">Opted out of publications</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-[#e2e8f0] shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-1.5">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">30-Day Growth</span>
            <Calendar className="h-4 w-4 text-[#0284c7]" />
          </div>
          <div className="text-2xl font-heading font-bold text-[#0a1e3f]">+{recentCount}</div>
          <span className="text-[10px] text-slate-400">New subscribers this month</span>
        </div>
      </div>

      {/* Filter and Control Toolbar */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-[#e2e8f0] shadow-xs">
        <div className="relative w-full lg:w-80">
          <Search className="h-4 w-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search email address or source..."
            className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-[#e2e8f0] text-xs font-medium focus:border-[#0284c7] outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-1.5 rounded-xl text-xs font-medium border border-[#e2e8f0] bg-white outline-none"
          >
            <option value="all">All Statuses</option>
            <option value="subscribed">Subscribed Only</option>
            <option value="unsubscribed">Unsubscribed Only</option>
          </select>

          {/* Source Filter */}
          {sources.length > 0 && (
            <select
              value={sourceFilter}
              onChange={(e) => setSourceFilter(e.target.value)}
              className="px-3 py-1.5 rounded-xl text-xs font-medium border border-[#e2e8f0] bg-white outline-none"
            >
              <option value="all">All Sources</option>
              {sources.map(src => (
                <option key={src} value={src}>{src}</option>
              ))}
            </select>
          )}

          {/* Sort By */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-1.5 rounded-xl text-xs font-medium border border-[#e2e8f0] bg-white outline-none"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="email">Alphabetical (Email)</option>
          </select>

          {/* CSV fallback button */}
          <Button
            onClick={() => exportToCSV(filteredSubscribers)}
            variant="outline"
            size="sm"
            className="h-8 rounded-xl text-xs font-semibold text-slate-600 border-[#e2e8f0] hover:bg-slate-50 flex items-center gap-1"
          >
            <Download className="h-3.5 w-3.5" />
            <span>CSV</span>
          </Button>
        </div>
      </div>

      {/* Bulk Selection Bar */}
      {selectedIds.length > 0 && (
        <div className="p-3 bg-sky-50 border border-sky-200 rounded-xl flex items-center justify-between text-xs text-sky-900 animate-in fade-in-50">
          <span className="font-semibold">
            {selectedIds.length} subscriber{selectedIds.length > 1 ? 's' : ''} selected
          </span>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              onClick={() => {
                const selectedList = subscribers.filter(s => selectedIds.includes(s.id));
                exportToExcel(selectedList);
              }}
              className="h-7 px-2.5 rounded-lg bg-emerald-600 text-white text-[11px] font-semibold"
            >
              Export Selected to Excel
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setSelectedIds([])}
              className="h-7 px-2.5 rounded-lg text-xs"
            >
              Clear Selection
            </Button>
          </div>
        </div>
      )}

      {/* Subscribers Table */}
      <div className="bg-white rounded-2xl border border-[#e2e8f0] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-[#e2e8f0] text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4 w-10">
                  <input
                    type="checkbox"
                    checked={
                      filteredSubscribers.length > 0 &&
                      selectedIds.length === filteredSubscribers.length
                    }
                    onChange={handleSelectAll}
                    className="rounded border-[#e2e8f0] text-[#0284c7] focus:ring-0"
                  />
                </th>
                <th className="py-3 px-4">Subscriber Email</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Acquisition Channel</th>
                <th className="py-3 px-4">Subscribed Date</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e2e8f0]">
              {filteredSubscribers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    <Mail className="h-8 w-8 mx-auto mb-2 text-slate-300" />
                    <p className="font-semibold text-slate-600">No subscribers found</p>
                    <p className="text-xs text-slate-400 mt-0.5">Try refining your search or filter parameters.</p>
                  </td>
                </tr>
              ) : (
                filteredSubscribers.map((sub) => {
                  const isSelected = selectedIds.includes(sub.id);
                  return (
                    <tr
                      key={sub.id}
                      className={`hover:bg-slate-50/80 transition-colors ${isSelected ? 'bg-sky-50/40' : ''}`}
                    >
                      <td className="py-3.5 px-4">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleSelectRow(sub.id)}
                          className="rounded border-[#e2e8f0] text-[#0284c7] focus:ring-0"
                        />
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-[#0a1e3f]">
                        <div className="flex items-center gap-2">
                          <div className="h-7 w-7 rounded-full bg-slate-100 text-[#0a1e3f] flex items-center justify-center font-bold text-[11px] shrink-0">
                            {sub.email.charAt(0).toUpperCase()}
                          </div>
                          <span className="select-all font-mono text-xs">{sub.email}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          sub.status === 'subscribed'
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                            : 'bg-slate-100 text-slate-600 border border-slate-200'
                        }`}>
                          {sub.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-600 font-medium">
                        <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px]">
                          {sub.source || 'Website Footer'}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-500 text-[11px]">
                        <div>{new Date(sub.subscribedAt).toLocaleDateString()}</div>
                        <div className="text-[10px] text-slate-400">{new Date(sub.subscribedAt).toLocaleTimeString()}</div>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => copyEmail(sub.email)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-[#0284c7] hover:bg-sky-50 transition-all"
                            title="Copy Email"
                          >
                            {copiedEmail === sub.email ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
                          </button>
                          <button
                            onClick={() => handleToggleStatus(sub)}
                            className={`p-1.5 rounded-lg transition-all ${
                              sub.status === 'subscribed'
                                ? 'text-amber-600 hover:bg-amber-50'
                                : 'text-emerald-600 hover:bg-emerald-50'
                            }`}
                            title={sub.status === 'subscribed' ? 'Mark as Unsubscribed' : 'Mark as Subscribed'}
                          >
                            {sub.status === 'subscribed' ? <UserX className="h-4 w-4" /> : <UserCheck className="h-4 w-4" />}
                          </button>
                          <button
                            onClick={() => setDeletingSubscriber(sub)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all"
                            title="Delete Subscriber"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Subscriber Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in-50">
          <div className="bg-white rounded-2xl shadow-2xl border border-[#e2e8f0] w-full max-w-md flex flex-col max-h-[90vh] overflow-hidden">
            <div className="px-5 sm:px-6 py-3.5 sm:py-4 border-b border-[#e2e8f0] flex items-center justify-between bg-slate-50 shrink-0">
              <div className="flex items-center gap-2">
                <div className="h-7 w-7 rounded-lg bg-sky-100 text-[#0284c7] flex items-center justify-center">
                  <Mail className="h-4 w-4" />
                </div>
                <h3 className="font-heading font-bold text-sm text-[#0a1e3f]">
                  Enroll New Newsletter Subscriber
                </h3>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="p-5 sm:p-6 space-y-4 overflow-y-auto flex-1">
              <div>
                <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">
                  Subscriber Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="e.g. client@domain.com"
                  className="w-full p-2.5 rounded-xl border border-[#e2e8f0] text-xs font-medium focus:border-[#0284c7] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">
                  Acquisition Channel / Source
                </label>
                <select
                  value={newSource}
                  onChange={(e) => setNewSource(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[#e2e8f0] text-xs font-medium focus:border-[#0284c7] outline-none bg-white"
                >
                  <option value="Manual Admin Entry">Manual Admin Entry</option>
                  <option value="Branch Customer Service">Branch Customer Service</option>
                  <option value="Promotions Popup">Promotions Popup</option>
                  <option value="Website Footer">Website Footer</option>
                  <option value="Corporate Outreach">Corporate Outreach</option>
                </select>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  The email will be added with <strong className="text-emerald-700">Subscribed</strong> status and included in future banking newsletters and rate updates.
                </p>
              </div>

              <div className="pt-4 border-t border-[#e2e8f0] flex items-center justify-end gap-2.5">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setIsAddModalOpen(false)}
                  className="rounded-xl text-xs"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  size="sm"
                  className="rounded-xl bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-semibold"
                >
                  {isSubmitting ? 'Enrolling...' : 'Enroll Subscriber'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingSubscriber && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in-50">
          <div className="bg-white rounded-2xl shadow-2xl border border-[#e2e8f0] w-full max-w-sm p-5 sm:p-6 space-y-4">
            <div className="flex items-center gap-3 text-red-600">
              <div className="h-10 w-10 rounded-xl bg-red-100 flex items-center justify-center shrink-0">
                <AlertTriangle className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-sm text-[#0a1e3f]">Remove Subscriber</h3>
                <p className="text-xs text-slate-500">This will remove the email from the audience database.</p>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Are you sure you want to permanently delete <strong>{deletingSubscriber.email}</strong>?
            </p>

            <div className="flex items-center justify-end gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setDeletingSubscriber(null)}
                className="rounded-xl text-xs"
              >
                Cancel
              </Button>
              <Button
                type="button"
                size="sm"
                onClick={handleDeleteConfirm}
                className="rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold"
              >
                Delete Subscriber
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
