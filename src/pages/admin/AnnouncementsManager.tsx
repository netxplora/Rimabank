import React, { useState } from 'react';
import {
  Plus,
  Search,
  Bell,
  AlertTriangle,
  ShieldAlert,
  Edit2,
  Trash2,
  CheckCircle2,
  Filter,
  X,
  Eye,
  Megaphone
} from 'lucide-react';
import { useCMS } from '@/context/CMSContext';
import { useAuth } from '@/context/AuthContext';
import { Announcement, PriorityLevel, ContentStatus } from '@/types/cms';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function AnnouncementsManager() {
  const { announcements, addAnnouncement, updateAnnouncement, deleteAnnouncement } = useCMS();
  const { user, can } = useAuth();

  const [search, setSearch] = useState('');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAnn, setEditingAnn] = useState<Announcement | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    category: 'maintenance' as Announcement['category'],
    priority: 'high' as PriorityLevel,
    displayAsBanner: true,
    actionText: 'Read Notice',
    actionLink: '/media',
    status: 'published' as ContentStatus,
    startDate: new Date().toISOString().split('T')[0],
    endDate: '2026-12-31'
  });

  const filteredAnnouncements = announcements.filter(a => {
    const matchesSearch = a.title.toLowerCase().includes(search.toLowerCase()) || a.message.toLowerCase().includes(search.toLowerCase());
    const matchesPriority = priorityFilter === 'all' || a.priority === priorityFilter;
    return matchesSearch && matchesPriority;
  });

  const handleOpenCreate = () => {
    setEditingAnn(null);
    setFormData({
      title: '',
      message: '',
      category: 'maintenance',
      priority: 'high',
      displayAsBanner: true,
      actionText: 'Read Notice',
      actionLink: '/media',
      status: 'published',
      startDate: new Date().toISOString().split('T')[0],
      endDate: '2026-12-31'
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (ann: Announcement) => {
    setEditingAnn(ann);
    setFormData({
      title: ann.title,
      message: ann.message,
      category: ann.category,
      priority: ann.priority,
      displayAsBanner: ann.displayAsBanner,
      actionText: ann.actionText || '',
      actionLink: ann.actionLink || '',
      status: ann.status,
      startDate: ann.startDate.split('T')[0],
      endDate: ann.endDate ? ann.endDate.split('T')[0] : ''
    });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    if (!formData.title.trim() || !formData.message.trim()) {
      toast.error('Please enter both title and message.');
      return;
    }

    if (editingAnn) {
      updateAnnouncement(editingAnn.id, {
        ...formData,
        startDate: new Date(formData.startDate).toISOString(),
        endDate: formData.endDate ? new Date(formData.endDate).toISOString() : undefined
      }, { id: user.id, name: user.name, role: user.role });
      toast.success('Announcement updated.');
    } else {
      addAnnouncement({
        ...formData,
        startDate: new Date(formData.startDate).toISOString(),
        endDate: formData.endDate ? new Date(formData.endDate).toISOString() : undefined,
        createdBy: user.name
      }, { id: user.id, name: user.name, role: user.role });
      toast.success('New announcement created.');
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id: string, title: string) => {
    if (!user) return;
    if (!can('delete', 'announcements')) {
      toast.error('Staff role cannot delete announcements.');
      return;
    }
    if (window.confirm(`Are you sure you want to delete announcement "${title}"?`)) {
      deleteAnnouncement(id, { id: user.id, name: user.name, role: user.role });
      toast.success('Announcement removed.');
    }
  };

  const getPriorityBadge = (priority: PriorityLevel) => {
    switch (priority) {
      case 'urgent':
        return <span className="px-2.5 py-0.5 rounded-full bg-red-100 text-red-700 text-[10px] font-bold uppercase flex items-center gap-1"><AlertTriangle className="h-3 w-3" /> Critical</span>;
      case 'high':
        return <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-700 text-[10px] font-bold uppercase flex items-center gap-1"><Bell className="h-3 w-3" /> High</span>;
      default:
        return <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold uppercase">Normal</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-[#e2e8f0] shadow-xs">
        <div>
          <h1 className="text-xl font-heading font-bold text-[#0a1e3f] tracking-tight">
            Announcements & Public Alerts
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Broadcast scheduled maintenance windows, regulatory compliance reminders, and top-bar alerts.
          </p>
        </div>

        <Button
          onClick={handleOpenCreate}
          className="h-9 rounded-xl bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-semibold shadow-sm flex items-center gap-1.5"
        >
          <Plus className="h-4 w-4" />
          <span>New Announcement</span>
        </Button>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-[#e2e8f0] shadow-xs">
        <div className="relative w-full sm:w-72">
          <Search className="h-4 w-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search notices..."
            className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-[#e2e8f0] text-xs font-medium focus:border-[#0284c7] outline-none"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <Filter className="h-3.5 w-3.5 text-slate-400 shrink-0" />
          {['all', 'urgent', 'high', 'normal'].map((p) => (
            <button
              key={p}
              onClick={() => setPriorityFilter(p)}
              className={`px-3 py-1 rounded-xl text-xs font-semibold capitalize whitespace-nowrap transition-all ${
                priorityFilter === p
                  ? 'bg-[#0a1e3f] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {p === 'urgent' ? 'Critical' : p}
            </button>
          ))}
        </div>
      </div>

      {/* Announcements Table */}
      <div className="bg-white rounded-2xl border border-[#e2e8f0] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-[#e2e8f0] text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">Title & Notice</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Priority</th>
                <th className="py-3 px-4">Public Banner</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e2e8f0]">
              {filteredAnnouncements.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    No announcements found.
                  </td>
                </tr>
              ) : (
                filteredAnnouncements.map((ann) => (
                  <tr key={ann.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-[#0a1e3f]">
                      <div className="truncate max-w-sm">{ann.title}</div>
                      <div className="text-[11px] text-slate-400 font-normal truncate max-w-sm">{ann.message}</div>
                    </td>
                    <td className="py-3.5 px-4 capitalize font-medium text-slate-600">
                      {ann.category}
                    </td>
                    <td className="py-3.5 px-4">
                      {getPriorityBadge(ann.priority)}
                    </td>
                    <td className="py-3.5 px-4">
                      {ann.displayAsBanner ? (
                        <span className="inline-flex items-center gap-1 text-emerald-700 font-bold text-[11px]">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> Active Top Banner
                        </span>
                      ) : (
                        <span className="text-slate-400 text-[11px]">Standard Notice</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 capitalize font-semibold">
                      {ann.status}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleOpenEdit(ann)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-[#0284c7] hover:bg-sky-50 transition-all"
                          title="Edit"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        {can('delete', 'announcements') && (
                          <button
                            onClick={() => handleDelete(ann.id, ann.title)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all"
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl border border-[#e2e8f0] w-full max-w-xl overflow-hidden animate-in zoom-in-95 duration-150 my-8">
            <div className="px-6 py-4 border-b border-[#e2e8f0] flex items-center justify-between bg-slate-50">
              <h3 className="font-heading font-bold text-sm text-[#0a1e3f]">
                {editingAnn ? 'Edit Announcement' : 'Create New Announcement'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              <div>
                <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">
                  Announcement Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Scheduled Core Banking Maintenance Notice"
                  className="w-full p-2.5 rounded-xl border border-[#e2e8f0] text-xs font-medium focus:border-[#0284c7] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">
                  Message / Full Notice Body *
                </label>
                <textarea
                  rows={3}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Detailed notification text for customers..."
                  className="w-full p-2.5 rounded-xl border border-[#e2e8f0] text-xs font-medium focus:border-[#0284c7] outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full p-2.5 rounded-xl border border-[#e2e8f0] text-xs font-medium focus:border-[#0284c7] outline-none bg-white"
                  >
                    <option value="maintenance">Maintenance</option>
                    <option value="regulatory">Regulatory</option>
                    <option value="security">Security</option>
                    <option value="feature">New Feature</option>
                    <option value="general">General</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">
                    Priority Level
                  </label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value as PriorityLevel })}
                    className="w-full p-2.5 rounded-xl border border-[#e2e8f0] text-xs font-medium focus:border-[#0284c7] outline-none bg-white"
                  >
                    <option value="normal">Normal</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent / Critical</option>
                  </select>
                </div>

                <div className="sm:col-span-2 p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div>
                    <span className="block text-xs font-bold text-[#0a1e3f]">Display as Top Website Alert Banner</span>
                    <span className="block text-[11px] text-slate-500">Shows floating warning strip across the top of public pages</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={formData.displayAsBanner}
                    onChange={(e) => setFormData({ ...formData, displayAsBanner: e.target.checked })}
                    className="h-4 w-4 text-[#0284c7] rounded border-slate-300 focus:ring-[#0284c7]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">
                    Action Button Text
                  </label>
                  <input
                    type="text"
                    value={formData.actionText}
                    onChange={(e) => setFormData({ ...formData, actionText: e.target.value })}
                    placeholder="e.g. Read Notice"
                    className="w-full p-2.5 rounded-xl border border-[#e2e8f0] text-xs font-medium focus:border-[#0284c7] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">
                    Action Link URL
                  </label>
                  <input
                    type="text"
                    value={formData.actionLink}
                    onChange={(e) => setFormData({ ...formData, actionLink: e.target.value })}
                    placeholder="e.g. /media"
                    className="w-full p-2.5 rounded-xl border border-[#e2e8f0] text-xs font-medium focus:border-[#0284c7] outline-none"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-[#e2e8f0] flex items-center justify-end gap-2.5">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-xl text-xs"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  size="sm"
                  className="rounded-xl bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-semibold"
                >
                  {editingAnn ? 'Save Changes' : 'Broadcast Announcement'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
