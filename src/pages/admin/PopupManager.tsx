import React, { useState, useMemo } from 'react';
import {
  Plus, Edit2, Trash2, Play, Pause, Eye, X, Monitor, Tablet,
  Smartphone, ExternalLink, Layers, Clock, BarChart2, ChevronUp,
  ChevronDown, CheckCircle2, AlertCircle, Search, Filter, Image as ImageIcon,
  Sliders, Calendar, ArrowRight, ArrowLeft, FileText, Check
} from 'lucide-react';
import { useCMS } from '@/context/CMSContext';
import { useAuth } from '@/context/AuthContext';
import { PopupConfig, PopupDisplayMode, PopupTrigger, PopupFrequency, PopupStatus } from '@/types/cms';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

// ── Helpers ─────────────────────────────────────────────────────────────────

const STATUS_COLORS: Record<PopupStatus, string> = {
  active:    'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30',
  paused:    'bg-amber-500/15   text-amber-400   border border-amber-500/30',
  draft:     'bg-slate-500/15   text-slate-400   border border-slate-500/30',
  scheduled: 'bg-sky-500/15     text-sky-400     border border-sky-500/30',
  expired:   'bg-rose-500/15    text-rose-400    border border-rose-500/30',
  archived:  'bg-zinc-600/15    text-zinc-400    border border-zinc-600/30',
};

const FREQ_LABELS: Record<PopupFrequency, string> = {
  every_visit:     'Every visit',
  once_session:    'Once per session',
  once_device:     'Once per device',
  until_dismissed: 'Until dismissed',
};

const TRIGGER_LABELS: Record<PopupTrigger, string> = {
  immediate: 'Immediately',
  delay:     'After delay',
  scroll:    'On scroll',
};

function ctr(imp: number, clicks: number) {
  if (imp === 0) return '0%';
  return ((clicks / imp) * 100).toFixed(1) + '%';
}

// ── Default form values ──────────────────────────────────────────────────────

const defaultForm = (): Omit<PopupConfig, 'id' | 'createdAt' | 'updatedAt' | 'impressions' | 'dismissals' | 'ctaClicks' | 'createdBy' | 'createdById'> => ({
  sourceType:          'standalone',
  sourceId:            undefined,
  displayMode:         'popup',
  title:               '',
  content:             '',
  featuredImage:       '',
  ctaText:             '',
  ctaUrl:              '',
  showCloseButton:     true,
  startDate:           new Date().toISOString().slice(0, 16),
  endDate:             undefined,
  triggerType:         'delay',
  triggerDelaySeconds: 3,
  displayFrequency:    'once_session',
  priority:            5,
  showOnDesktop:       true,
  showOnMobile:        true,
  overlayEnabled:      true,
  status:              'draft',
});

type FormState = ReturnType<typeof defaultForm>;

// ── PopupPreview (mini) ──────────────────────────────────────────────────────

const PreviewViewport: React.FC<{ form: FormState; viewport: 'desktop' | 'tablet' | 'mobile' }> = ({ form, viewport }) => {
  const dims = viewport === 'desktop' ? 'w-full max-w-full h-[320px] sm:h-[380px]' : viewport === 'tablet' ? 'w-[420px] max-w-full h-[300px] sm:h-[350px]' : 'w-[280px] sm:w-[320px] max-w-full h-[340px] sm:h-[400px]';
  return (
    <div className={`relative ${dims} bg-[#0a1e3f] rounded-xl overflow-hidden border border-white/10 flex items-center justify-center mx-auto transition-all`}>
      {/* Simulated page background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="h-8 bg-slate-700 w-full" />
        <div className="p-3 sm:p-4 space-y-2.5">
          {[1,2,3,4,5].map(i => <div key={i} className="h-2.5 bg-slate-600 rounded" style={{width: `${55 + i * 7}%`}} />)}
        </div>
      </div>

      {/* Overlay */}
      {form.overlayEnabled && <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm" />}

      {/* Modal card */}
      <div className={`relative z-10 bg-[#0f2a50] border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden ${viewport === 'mobile' ? 'w-[240px] sm:w-[270px]' : 'w-[280px] sm:w-[340px] max-w-[90%]'}`}>
        {form.featuredImage && (
          <div className="relative h-20 sm:h-28 overflow-hidden shrink-0">
            <img src={form.featuredImage} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f2a50] via-transparent to-transparent" />
          </div>
        )}
        <div className="p-3 sm:p-4 space-y-2">
          <p className="font-heading font-bold text-white text-xs sm:text-sm leading-snug line-clamp-2">
            {form.title || 'Popup Title'}
          </p>
          <p className="text-slate-300 text-[11px] sm:text-xs leading-relaxed line-clamp-3">
            {form.content || 'Your popup message will appear here. Keep it concise and focused.'}
          </p>
          {form.ctaText && (
            <div className="pt-1">
              <span className="block w-full py-1.5 px-3 bg-[#0284c7] text-white text-[11px] sm:text-xs font-semibold rounded-lg text-center truncate">
                {form.ctaText}
              </span>
            </div>
          )}
        </div>
        {form.showCloseButton && (
          <div className="absolute top-2 right-2 h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-black/40 text-white/80 flex items-center justify-center">
            <X className="h-3 w-3" />
          </div>
        )}
      </div>
    </div>
  );
};

// ── Main component ───────────────────────────────────────────────────────────

export default function PopupManager() {
  const { popupConfigs, addPopupConfig, updatePopupConfig, deletePopupConfig, togglePopupStatus } = useCMS();
  const { user } = useAuth();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'content' | 'display' | 'schedule' | 'preview'>('content');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [previewViewport, setPreviewViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  const [form, setForm] = useState<FormState>(defaultForm());

  const setField = <K extends keyof FormState>(key: K, val: FormState[K]) =>
    setForm(prev => ({ ...prev, [key]: val }));

  // Filtered + sorted list
  const filtered = useMemo(() => {
    return popupConfigs.filter(p => {
      const matchSearch = p.title.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === 'all' || p.status === statusFilter;
      return matchSearch && matchStatus;
    }).sort((a, b) => a.priority - b.priority);
  }, [popupConfigs, search, statusFilter]);

  const activeCount = popupConfigs.filter(p => p.status === 'active').length;
  const pendingCount = popupConfigs.filter(p => p.status === 'draft' || p.status === 'scheduled').length;

  // ── Open create
  const handleCreate = () => {
    setEditingId(null);
    setForm(defaultForm());
    setActiveTab('content');
    setIsModalOpen(true);
  };

  // ── Open edit
  const handleEdit = (popup: PopupConfig) => {
    setEditingId(popup.id);
    setForm({
      sourceType:          popup.sourceType,
      sourceId:            popup.sourceId,
      displayMode:         popup.displayMode,
      title:               popup.title,
      content:             popup.content,
      featuredImage:       popup.featuredImage || '',
      ctaText:             popup.ctaText || '',
      ctaUrl:              popup.ctaUrl || '',
      showCloseButton:     popup.showCloseButton,
      startDate:           popup.startDate.slice(0, 16),
      endDate:             popup.endDate?.slice(0, 16),
      triggerType:         popup.triggerType,
      triggerDelaySeconds: popup.triggerDelaySeconds,
      displayFrequency:    popup.displayFrequency,
      priority:            popup.priority,
      showOnDesktop:       popup.showOnDesktop,
      showOnMobile:        popup.showOnMobile,
      overlayEnabled:      popup.overlayEnabled,
      status:              popup.status,
    });
    setActiveTab('content');
    setIsModalOpen(true);
  };

  // ── Save
  const handleSave = () => {
    if (!form.title.trim()) { toast.error('Popup title is required'); return; }
    if (!form.content.trim()) { toast.error('Popup content is required'); return; }
    if (!user) return;

    if (editingId) {
      updatePopupConfig(editingId, { ...form, startDate: new Date(form.startDate).toISOString(), endDate: form.endDate ? new Date(form.endDate).toISOString() : undefined }, user);
      toast.success('Popup updated');
    } else {
      addPopupConfig({ ...form, startDate: new Date(form.startDate).toISOString(), endDate: form.endDate ? new Date(form.endDate).toISOString() : undefined, createdBy: user.name, createdById: user.id }, user);
      toast.success('Popup created');
    }
    setIsModalOpen(false);
  };

  // ── Delete
  const handleDelete = (id: string) => {
    if (!user) return;
    deletePopupConfig(id, user);
    setConfirmDeleteId(null);
    toast.success('Popup deleted');
  };

  // ── Toggle active/paused
  const handleToggle = (popup: PopupConfig) => {
    if (!user) return;
    togglePopupStatus(popup.id, user);
    toast.success(popup.status === 'active' ? 'Popup paused' : 'Popup activated');
  };

  // ── Priority nudge
  const nudgePriority = (id: string, direction: 'up' | 'down') => {
    if (!user) return;
    const popup = popupConfigs.find(p => p.id === id);
    if (!popup) return;
    const newPriority = direction === 'up' ? Math.max(1, popup.priority - 1) : popup.priority + 1;
    updatePopupConfig(id, { priority: newPriority }, user);
  };

  const tabs: { key: typeof activeTab; label: string; step: number; icon: React.ElementType }[] = [
    { key: 'content',  label: 'Content',  step: 1, icon: FileText },
    { key: 'display',  label: 'Display',  step: 2, icon: Sliders },
    { key: 'schedule', label: 'Timing',   step: 3, icon: Calendar },
    { key: 'preview',  label: 'Preview',  step: 4, icon: Eye },
  ];

  const currentTabIndex = tabs.findIndex(t => t.key === activeTab);
  const nextTab = tabs[currentTabIndex + 1];
  const prevTab = tabs[currentTabIndex - 1];

  const goToNextTab = () => {
    if (nextTab) setActiveTab(nextTab.key);
  };

  const goToPrevTab = () => {
    if (prevTab) setActiveTab(prevTab.key);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-heading font-bold text-white tracking-tight">Popup Manager</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">Manage website popup notifications, audience rules, and display schedules.</p>
        </div>
        <Button onClick={handleCreate} className="bg-[#0284c7] hover:bg-sky-500 text-white gap-2 shrink-0 self-start sm:self-auto shadow-md shadow-sky-500/20">
          <Plus className="h-4 w-4" /> <span>New Popup</span>
        </Button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {[
          { label: 'Total Popups', value: popupConfigs.length,  color: 'text-slate-300' },
          { label: 'Active Now',   value: activeCount,          color: 'text-emerald-400' },
          { label: 'Scheduled',    value: pendingCount,         color: 'text-amber-400'  },
          { label: 'Archived',     value: popupConfigs.filter(p => p.status === 'archived').length, color: 'text-slate-500' },
        ].map(s => (
          <div key={s.label} className="bg-white/5 border border-white/10 rounded-xl p-3.5 sm:p-4">
            <p className="text-[11px] sm:text-xs text-slate-400 font-medium">{s.label}</p>
            <p className={`text-xl sm:text-2xl font-bold font-heading mt-1 ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-sky-500 transition-all"
            placeholder="Search popups by title..."
            value={search} onChange={e => setSearch(e.target.value)}
          />
        </div>
        <select
          className="bg-[#0a1e3f] border border-white/10 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-300 focus:outline-none focus:ring-1 focus:ring-sky-500"
          value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
        >
          <option value="all">All Statuses</option>
          {(['active','paused','draft','scheduled','expired','archived'] as PopupStatus[]).map(s => (
            <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-slate-500 bg-white/[0.02] border border-dashed border-white/10 rounded-2xl">
          <Layers className="h-10 w-10 mx-auto mb-3 opacity-40 text-slate-400" />
          <p className="text-sm font-medium text-slate-300">No popups found</p>
          <p className="text-xs text-slate-500 mt-1">Create a new popup notification to get started.</p>
        </div>
      ) : (
        <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-white/10 text-[11px] text-slate-400 uppercase tracking-wider bg-white/[0.02]">
                  <th className="px-4 py-3 w-12 text-center">Pri.</th>
                  <th className="px-4 py-3">Popup Details</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 hidden md:table-cell">Source</th>
                  <th className="px-4 py-3 hidden lg:table-cell">Trigger</th>
                  <th className="px-4 py-3 hidden sm:table-cell">Frequency</th>
                  <th className="px-4 py-3">Engagement</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filtered.map(popup => (
                  <tr key={popup.id} className="hover:bg-white/[0.03] transition-colors group">
                    {/* Priority */}
                    <td className="px-4 py-3 text-center">
                      <div className="flex flex-col items-center justify-center gap-0.5">
                        <button onClick={() => nudgePriority(popup.id, 'up')} className="text-slate-500 hover:text-sky-400 transition-colors p-0.5" title="Increase priority">
                          <ChevronUp className="h-3.5 w-3.5" />
                        </button>
                        <span className="text-xs font-bold font-mono text-sky-400">{popup.priority}</span>
                        <button onClick={() => nudgePriority(popup.id, 'down')} className="text-slate-500 hover:text-sky-400 transition-colors p-0.5" title="Decrease priority">
                          <ChevronDown className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>

                    {/* Title */}
                    <td className="px-4 py-3 max-w-[220px]">
                      <p className="font-semibold text-white truncate">{popup.title}</p>
                      <p className="text-[11px] text-slate-400 truncate mt-0.5">{popup.content || 'No description text'}</p>
                    </td>

                    {/* Status */}
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold capitalize ${STATUS_COLORS[popup.status]}`}>
                        {popup.status}
                      </span>
                    </td>

                    {/* Source */}
                    <td className="px-4 py-3 text-xs text-slate-400 capitalize hidden md:table-cell">{popup.sourceType}</td>

                    {/* Trigger */}
                    <td className="px-4 py-3 text-xs text-slate-400 hidden lg:table-cell">
                      {TRIGGER_LABELS[popup.triggerType]}
                      {popup.triggerType === 'delay' && ` (${popup.triggerDelaySeconds}s)`}
                    </td>

                    {/* Frequency */}
                    <td className="px-4 py-3 text-xs text-slate-400 hidden sm:table-cell">{FREQ_LABELS[popup.displayFrequency]}</td>

                    {/* Analytics */}
                    <td className="px-4 py-3">
                      <div className="text-[11px] text-slate-400 space-y-0.5">
                        <div className="font-medium text-slate-200">{popup.impressions.toLocaleString()} views</div>
                        <div className="text-emerald-400 font-semibold">{ctr(popup.impressions, popup.ctaClicks)} CTR</div>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => handleToggle(popup)}
                          title={popup.status === 'active' ? 'Pause Popup' : 'Activate Popup'}
                          className={`p-1.5 rounded-lg transition-colors ${popup.status === 'active' ? 'text-amber-400 hover:bg-amber-500/10' : 'text-emerald-400 hover:bg-emerald-500/10'}`}
                        >
                          {popup.status === 'active' ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                        </button>

                        <button onClick={() => handleEdit(popup)} title="Edit Popup" className="p-1.5 rounded-lg text-sky-400 hover:bg-sky-500/10 transition-colors">
                          <Edit2 className="h-4 w-4" />
                        </button>

                        <button onClick={() => setConfirmDeleteId(popup.id)} title="Delete Popup" className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-500/10 transition-colors">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── Create/Edit Modal ─────────────────────────────────────────────── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-6 overflow-y-auto">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm transition-opacity"
            onClick={() => setIsModalOpen(false)}
          />

          {/* Modal Container */}
          <div className="relative z-10 w-full max-w-2xl bg-[#0f2a50] border border-white/10 rounded-t-2xl sm:rounded-2xl shadow-2xl flex flex-col max-h-[92vh] sm:max-h-[88vh] overflow-hidden animate-in fade-in-50 duration-200">
            {/* Modal header */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 border-b border-white/10 shrink-0 bg-[#0c2445]">
              <div className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-lg bg-[#0284c7]/20 border border-[#0284c7]/30 flex items-center justify-center text-[#38bdf8]">
                  <Layers className="h-4 w-4" />
                </div>
                <div>
                  <h2 className="font-heading font-bold text-white text-base sm:text-lg leading-tight">
                    {editingId ? 'Edit Popup' : 'New Popup Notification'}
                  </h2>
                  <p className="text-[11px] text-slate-400 hidden sm:block">
                    Configure modal announcement content, triggers, and display schedules
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close dialog"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Responsive Step Navigation Bar */}
            <div className="px-3 sm:px-6 border-b border-white/10 bg-[#0c2445]/70 shrink-0">
              <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-2 scrollbar-none">
                {tabs.map(t => {
                  const Icon = t.icon;
                  const isActive = activeTab === t.key;
                  return (
                    <button
                      key={t.key}
                      onClick={() => setActiveTab(t.key)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-all shrink-0 ${
                        isActive
                          ? 'bg-[#0284c7] text-white shadow-sm shadow-sky-500/20 font-semibold'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                      }`}
                    >
                      <Icon className="h-3.5 w-3.5" />
                      <span>{t.label}</span>
                      <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${isActive ? 'bg-white/20 text-white' : 'bg-white/5 text-slate-400'}`}>
                        {t.step}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Scrollable Form Body */}
            <div className="overflow-y-auto flex-1 px-4 sm:px-6 py-4 sm:py-5 space-y-4 text-xs sm:text-sm">

              {/* ── CONTENT TAB ── */}
              {activeTab === 'content' && (
                <div className="space-y-4 animate-in fade-in-50 duration-150">
                  <div>
                    <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-1.5">
                      Popup Title <span className="text-rose-400">*</span>
                    </label>
                    <input
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-sky-500 transition-all"
                      placeholder="e.g. Special Customer Notice"
                      value={form.title} onChange={e => setField('title', e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-1.5">
                      Popup Message <span className="text-rose-400">*</span>
                    </label>
                    <textarea
                      rows={4}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-sky-500 resize-none transition-all"
                      placeholder="Enter the main message displayed to website visitors..."
                      value={form.content} onChange={e => setField('content', e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-1.5">
                      Featured Image URL <span className="normal-case font-normal text-slate-500">(Optional)</span>
                    </label>
                    <div className="flex gap-2">
                      <input
                        className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-sky-500 transition-all"
                        placeholder="https://... or image asset URL"
                        value={form.featuredImage || ''} onChange={e => setField('featuredImage', e.target.value)}
                      />
                      <button
                        type="button"
                        className="p-2.5 bg-white/5 border border-white/10 rounded-xl text-slate-400 hover:text-white transition-colors"
                        title="Image Asset"
                      >
                        <ImageIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-1.5">
                        CTA Button Label
                      </label>
                      <input
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-sky-500 transition-all"
                        placeholder="e.g. Learn More"
                        value={form.ctaText || ''} onChange={e => setField('ctaText', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-1.5">
                        CTA Destination URL
                      </label>
                      <input
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-sky-500 transition-all"
                        placeholder="/products or https://..."
                        value={form.ctaUrl || ''} onChange={e => setField('ctaUrl', e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-1.5">
                      Source Relationship
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <select
                        className="bg-[#0a1e3f] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-300 focus:outline-none focus:ring-1 focus:ring-sky-500"
                        value={form.sourceType} onChange={e => setField('sourceType', e.target.value as PopupConfig['sourceType'])}
                      >
                        <option value="standalone">Standalone Popup</option>
                        <option value="promotion">Attached to Promotion</option>
                        <option value="announcement">Attached to Announcement</option>
                        <option value="publication">Attached to Publication</option>
                      </select>
                      {form.sourceType !== 'standalone' && (
                        <input
                          className="bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-sky-500 transition-all"
                          placeholder="Linked Record ID"
                          value={form.sourceId || ''} onChange={e => setField('sourceId', e.target.value)}
                        />
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* ── DISPLAY TAB ── */}
              {activeTab === 'display' && (
                <div className="space-y-4 sm:space-y-5 animate-in fade-in-50 duration-150">
                  <div>
                    <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-2">
                      Display Mode
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['standard','popup','both'] as PopupDisplayMode[]).map(m => (
                        <button
                          key={m}
                          type="button"
                          onClick={() => setField('displayMode', m)}
                          className={`py-2 sm:py-2.5 px-2 sm:px-3 rounded-xl border text-xs sm:text-sm font-medium capitalize transition-all text-center ${
                            form.displayMode === m
                              ? 'bg-sky-500/20 border-sky-500 text-sky-300 shadow-sm'
                              : 'bg-white/5 border-white/10 text-slate-400 hover:border-white/30'
                          }`}
                        >
                          {m}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-1.5">
                        Trigger Type
                      </label>
                      <select
                        className="w-full bg-[#0a1e3f] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-300 focus:outline-none focus:ring-1 focus:ring-sky-500"
                        value={form.triggerType} onChange={e => setField('triggerType', e.target.value as PopupTrigger)}
                      >
                        <option value="immediate">Immediately upon load</option>
                        <option value="delay">After time delay</option>
                        <option value="scroll">On user scroll</option>
                      </select>
                    </div>
                    {form.triggerType === 'delay' && (
                      <div>
                        <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-1.5">
                          Delay (seconds)
                        </label>
                        <input
                          type="number" min={0} max={60}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:ring-1 focus:ring-sky-500"
                          value={form.triggerDelaySeconds} onChange={e => setField('triggerDelaySeconds', Number(e.target.value))}
                        />
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-1.5">
                      Display Frequency
                    </label>
                    <select
                      className="w-full bg-[#0a1e3f] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-300 focus:outline-none focus:ring-1 focus:ring-sky-500"
                      value={form.displayFrequency} onChange={e => setField('displayFrequency', e.target.value as PopupFrequency)}
                    >
                      <option value="once_session">Once per session</option>
                      <option value="once_device">Once per device</option>
                      <option value="every_visit">Every page visit</option>
                      <option value="until_dismissed">Until dismissed by user</option>
                    </select>
                  </div>

                  {/* Rules Toggles */}
                  <div className="space-y-2.5 pt-2 border-t border-white/10">
                    <p className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Display Rules</p>
                    {[
                      { key: 'showCloseButton' as const, label: 'Show close button (X)' },
                      { key: 'overlayEnabled'  as const, label: 'Dark background overlay' },
                      { key: 'showOnDesktop'   as const, label: 'Display on desktop screens' },
                      { key: 'showOnMobile'    as const, label: 'Display on mobile devices' },
                    ].map(opt => (
                      <label key={opt.key} className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.05] cursor-pointer transition-colors">
                        <span className="text-xs sm:text-sm text-slate-300 font-medium">{opt.label}</span>
                        <button
                          type="button"
                          onClick={() => setField(opt.key, !form[opt.key])}
                          className={`relative inline-flex h-5 w-9 rounded-full transition-colors shrink-0 ${form[opt.key] ? 'bg-sky-500' : 'bg-slate-700'}`}
                        >
                          <span className={`inline-block h-4 w-4 rounded-full bg-white shadow transition-transform mt-0.5 ${form[opt.key] ? 'translate-x-4' : 'translate-x-0.5'}`} />
                        </button>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* ── SCHEDULE TAB ── */}
              {activeTab === 'schedule' && (
                <div className="space-y-4 animate-in fade-in-50 duration-150">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-1.5">
                        Start Date & Time
                      </label>
                      <input
                        type="datetime-local"
                        className="w-full bg-[#0a1e3f] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:ring-1 focus:ring-sky-500"
                        value={form.startDate || ''} onChange={e => setField('startDate', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-1.5">
                        End Date & Time <span className="normal-case font-normal text-slate-500">(Optional)</span>
                      </label>
                      <input
                        type="datetime-local"
                        className="w-full bg-[#0a1e3f] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:ring-1 focus:ring-sky-500"
                        value={form.endDate || ''} onChange={e => setField('endDate', e.target.value || undefined)}
                      />
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                        Priority Level <span className="normal-case font-normal text-slate-400">(1 = highest)</span>
                      </label>
                      <span className="text-sm font-mono font-bold text-sky-400 px-2 py-0.5 rounded bg-sky-500/10 border border-sky-500/20">
                        {form.priority}
                      </span>
                    </div>
                    <input
                      type="range" min={1} max={20}
                      className="w-full accent-sky-500 cursor-pointer"
                      value={form.priority} onChange={e => setField('priority', Number(e.target.value))}
                    />
                    <p className="text-[11px] text-slate-400">
                      When multiple popups qualify, the popup with the lowest priority value is presented first.
                    </p>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-1.5">
                      Publishing Status
                    </label>
                    <select
                      className="w-full bg-[#0a1e3f] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-300 focus:outline-none focus:ring-1 focus:ring-sky-500"
                      value={form.status} onChange={e => setField('status', e.target.value as PopupStatus)}
                    >
                      <option value="draft">Draft (Private)</option>
                      <option value="scheduled">Scheduled (Auto-activates on start date)</option>
                      <option value="active">Active (Live immediately)</option>
                      <option value="paused">Paused (Temporarily hidden)</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>
                </div>
              )}

              {/* ── PREVIEW TAB ── */}
              {activeTab === 'preview' && (
                <div className="space-y-4 animate-in fade-in-50 duration-150">
                  <div className="flex items-center justify-center gap-1.5 sm:gap-2">
                    {([
                      { k: 'desktop' as const, icon: Monitor, label: 'Desktop' },
                      { k: 'tablet'  as const, icon: Tablet,  label: 'Tablet' },
                      { k: 'mobile'  as const, icon: Smartphone, label: 'Mobile' },
                    ]).map(({ k, icon: Icon, label }) => (
                      <button
                        key={k}
                        type="button"
                        onClick={() => setPreviewViewport(k)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                          previewViewport === k
                            ? 'bg-sky-500/20 text-sky-400 border border-sky-500/40 font-semibold'
                            : 'bg-white/5 text-slate-400 border border-white/10 hover:border-white/30'
                        }`}
                      >
                        <Icon className="h-3.5 w-3.5" /> <span>{label}</span>
                      </button>
                    ))}
                  </div>
                  <div className="overflow-x-auto pb-1 max-w-full">
                    <PreviewViewport form={form} viewport={previewViewport} />
                  </div>
                  <p className="text-[11px] text-slate-400 text-center">
                    Visual simulation of the popup appearance on the public website.
                  </p>
                </div>
              )}
            </div>

            {/* Responsive Modal Footer with Step Navigation */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-t border-white/10 bg-[#0c2445] shrink-0 gap-2.5 sm:gap-3">
              <div className="flex items-center justify-between sm:justify-start gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setIsModalOpen(false)}
                  className="text-xs sm:text-sm text-slate-400 hover:text-white px-3 py-2 h-auto"
                >
                  Cancel
                </Button>
                {activeTab !== 'content' && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={goToPrevTab}
                    className="text-xs sm:text-sm border-white/10 text-slate-300 hover:text-white bg-white/5 gap-1.5 px-3 py-2 h-auto"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" />
                    <span>Back</span>
                  </Button>
                )}
              </div>

              <div className="flex items-center gap-2 justify-end">
                {activeTab !== 'preview' && nextTab && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={goToNextTab}
                    className="text-xs sm:text-sm border-white/20 text-slate-200 hover:text-white bg-white/5 gap-1.5 px-3.5 py-2 h-auto flex-1 sm:flex-initial justify-center"
                  >
                    <span>Next: {nextTab.label}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                )}

                <Button
                  type="button"
                  onClick={handleSave}
                  className="text-xs sm:text-sm bg-[#0284c7] hover:bg-sky-500 text-white font-medium gap-1.5 px-4 py-2 h-auto flex-1 sm:flex-initial justify-center shadow-md shadow-sky-500/20"
                >
                  <Check className="h-3.5 w-3.5" />
                  <span>{editingId ? 'Save Changes' : 'Create Popup'}</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Delete Confirm ────────────────────────────────────────────────── */}
      {confirmDeleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm" onClick={() => setConfirmDeleteId(null)} />
          <div className="relative z-10 bg-[#0f2a50] border border-white/10 rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <div className="flex items-start gap-3 mb-4">
              <AlertCircle className="h-5 w-5 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-white">Delete popup?</h3>
                <p className="text-sm text-slate-400 mt-1">This action cannot be undone. The popup will be permanently removed.</p>
              </div>
            </div>
            <div className="flex gap-3 justify-end">
              <Button variant="ghost" onClick={() => setConfirmDeleteId(null)} className="text-slate-400 hover:text-white">Cancel</Button>
              <Button onClick={() => handleDelete(confirmDeleteId)} className="bg-rose-600 hover:bg-rose-500 text-white">Delete</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
