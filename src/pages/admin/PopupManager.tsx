import React, { useState, useMemo } from 'react';
import {
  Plus, Edit2, Trash2, Play, Pause, Eye, X, Monitor, Tablet,
  Smartphone, ExternalLink, Layers, Clock, BarChart2, ChevronUp,
  ChevronDown, CheckCircle2, AlertCircle, Search, Filter, Image as ImageIcon
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
  startDate:           new Date().toISOString(),
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
  const dims = viewport === 'desktop' ? 'w-full h-[420px]' : viewport === 'tablet' ? 'w-[480px] h-[380px]' : 'w-[320px] h-[480px]';
  return (
    <div className={`relative ${dims} bg-[#0a1e3f] rounded-xl overflow-hidden border border-white/10 flex items-center justify-center mx-auto`}>
      {/* Simulated page background */}
      <div className="absolute inset-0 opacity-20">
        <div className="h-10 bg-slate-700 w-full" />
        <div className="p-4 space-y-3">
          {[1,2,3,4,5].map(i => <div key={i} className="h-3 bg-slate-600 rounded" style={{width: `${60 + i * 7}%`}} />)}
        </div>
      </div>

      {/* Overlay */}
      {form.overlayEnabled && <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />}

      {/* Modal card */}
      <div className={`relative z-10 bg-[#0f2a50] border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden ${viewport === 'mobile' ? 'w-[280px]' : 'w-[340px] max-w-[90%]'}`}>
        {form.featuredImage && (
          <div className="relative h-32 overflow-hidden">
            <img src={form.featuredImage} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f2a50] via-transparent to-transparent" />
          </div>
        )}
        <div className="p-5 space-y-3">
          <p className="font-heading font-bold text-white text-sm leading-snug line-clamp-2">
            {form.title || 'Popup Title'}
          </p>
          <p className="text-slate-300 text-xs leading-relaxed line-clamp-3">
            {form.content || 'Your popup message will appear here. Keep it concise and focused.'}
          </p>
          {form.ctaText && (
            <button className="w-full py-2 px-4 bg-[#0284c7] hover:bg-sky-500 text-white text-xs font-semibold rounded-lg transition-colors">
              {form.ctaText}
            </button>
          )}
        </div>
        {form.showCloseButton && (
          <button className="absolute top-2.5 right-2.5 h-6 w-6 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-white/20">
            <X className="h-3.5 w-3.5" />
          </button>
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

  const tabs: { key: typeof activeTab; label: string }[] = [
    { key: 'content',  label: 'Content'  },
    { key: 'display',  label: 'Display'  },
    { key: 'schedule', label: 'Schedule' },
    { key: 'preview',  label: 'Preview'  },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-white">Popup Manager</h1>
          <p className="text-sm text-slate-400 mt-0.5">Manage website popup notifications and display rules.</p>
        </div>
        <Button onClick={handleCreate} className="bg-[#0284c7] hover:bg-sky-500 text-white gap-2 shrink-0">
          <Plus className="h-4 w-4" /> New Popup
        </Button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total',    value: popupConfigs.length,  color: 'text-slate-300' },
          { label: 'Active',   value: activeCount,          color: 'text-emerald-400' },
          { label: 'Pending',  value: pendingCount,         color: 'text-amber-400'  },
          { label: 'Archived', value: popupConfigs.filter(p => p.status === 'archived').length, color: 'text-slate-500' },
        ].map(s => (
          <div key={s.label} className="bg-white/5 border border-white/10 rounded-xl p-4">
            <p className="text-xs text-slate-400">{s.label}</p>
            <p className={`text-2xl font-bold font-heading mt-1 ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
            placeholder="Search popups..."
            value={search} onChange={e => setSearch(e.target.value)}
          />
        </div>
        <select
          className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-slate-300 focus:outline-none focus:ring-1 focus:ring-sky-500"
          value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
        >
          <option value="all">All statuses</option>
          {(['active','paused','draft','scheduled','expired','archived'] as PopupStatus[]).map(s => (
            <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-slate-500">
          <Layers className="h-10 w-10 mx-auto mb-3 opacity-40" />
          <p className="text-sm">No popups found. Create one to get started.</p>
        </div>
      ) : (
        <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 text-xs text-slate-400 uppercase tracking-wider">
                  <th className="px-4 py-3 text-left w-8">Pri.</th>
                  <th className="px-4 py-3 text-left">Title</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-left">Source</th>
                  <th className="px-4 py-3 text-left">Trigger</th>
                  <th className="px-4 py-3 text-left">Freq.</th>
                  <th className="px-4 py-3 text-left">Analytics</th>
                  <th className="px-4 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filtered.map(popup => (
                  <tr key={popup.id} className="hover:bg-white/[0.03] transition-colors group">
                    {/* Priority */}
                    <td className="px-4 py-3">
                      <div className="flex flex-col gap-0.5">
                        <button onClick={() => nudgePriority(popup.id, 'up')} className="text-slate-500 hover:text-sky-400 transition-colors">
                          <ChevronUp className="h-3.5 w-3.5" />
                        </button>
                        <span className="text-xs text-center text-slate-300 font-mono">{popup.priority}</span>
                        <button onClick={() => nudgePriority(popup.id, 'down')} className="text-slate-500 hover:text-sky-400 transition-colors">
                          <ChevronDown className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>

                    {/* Title */}
                    <td className="px-4 py-3 max-w-[200px]">
                      <p className="font-medium text-white truncate">{popup.title}</p>
                      <p className="text-xs text-slate-500 truncate mt-0.5">{popup.content.slice(0, 60)}…</p>
                    </td>

                    {/* Status */}
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[popup.status]}`}>
                        {popup.status}
                      </span>
                    </td>

                    {/* Source */}
                    <td className="px-4 py-3 text-xs text-slate-400 capitalize">{popup.sourceType}</td>

                    {/* Trigger */}
                    <td className="px-4 py-3 text-xs text-slate-400">
                      {TRIGGER_LABELS[popup.triggerType]}
                      {popup.triggerType === 'delay' && ` (${popup.triggerDelaySeconds}s)`}
                    </td>

                    {/* Frequency */}
                    <td className="px-4 py-3 text-xs text-slate-400">{FREQ_LABELS[popup.displayFrequency]}</td>

                    {/* Analytics */}
                    <td className="px-4 py-3">
                      <div className="text-xs text-slate-400 space-y-0.5">
                        <div>{popup.impressions.toLocaleString()} views</div>
                        <div className="text-emerald-400">{ctr(popup.impressions, popup.ctaClicks)} CTR</div>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        {/* Toggle active/paused */}
                        <button
                          onClick={() => handleToggle(popup)}
                          title={popup.status === 'active' ? 'Pause' : 'Activate'}
                          className={`p-1.5 rounded-lg transition-colors ${popup.status === 'active' ? 'text-amber-400 hover:bg-amber-500/10' : 'text-emerald-400 hover:bg-emerald-500/10'}`}
                        >
                          {popup.status === 'active' ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
                        </button>

                        <button onClick={() => handleEdit(popup)} title="Edit" className="p-1.5 rounded-lg text-sky-400 hover:bg-sky-500/10 transition-colors">
                          <Edit2 className="h-3.5 w-3.5" />
                        </button>

                        <button onClick={() => setConfirmDeleteId(popup.id)} title="Delete" className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-500/10 transition-colors">
                          <Trash2 className="h-3.5 w-3.5" />
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          <div className="relative z-10 w-full max-w-2xl bg-[#0f2a50] border border-white/10 rounded-2xl shadow-2xl flex flex-col max-h-[90vh]">
            {/* Modal header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 shrink-0">
              <h2 className="font-heading font-bold text-white">{editingId ? 'Edit Popup' : 'New Popup'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-white/10 shrink-0">
              {tabs.map(t => (
                <button
                  key={t.key}
                  onClick={() => setActiveTab(t.key)}
                  className={`px-5 py-3 text-sm font-medium transition-colors ${activeTab === t.key ? 'text-sky-400 border-b-2 border-sky-400' : 'text-slate-400 hover:text-white'}`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Scrollable body */}
            <div className="overflow-y-auto flex-1 px-6 py-5 space-y-4">

              {/* ── CONTENT TAB ── */}
              {activeTab === 'content' && (
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">Popup Title *</label>
                    <input
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                      placeholder="e.g. Special Ramadan Offer"
                      value={form.title} onChange={e => setField('title', e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">Popup Message *</label>
                    <textarea
                      rows={4}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-sky-500 resize-none"
                      placeholder="Keep your message short and focused…"
                      value={form.content} onChange={e => setField('content', e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">Featured Image URL</label>
                    <div className="flex gap-2">
                      <input
                        className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                        placeholder="https://… or leave blank"
                        value={form.featuredImage || ''} onChange={e => setField('featuredImage', e.target.value)}
                      />
                      <button className="p-2.5 bg-white/5 border border-white/10 rounded-lg text-slate-400 hover:text-white">
                        <ImageIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">CTA Button Label</label>
                      <input
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                        placeholder="e.g. Learn More"
                        value={form.ctaText || ''} onChange={e => setField('ctaText', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">CTA URL</label>
                      <input
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                        placeholder="/promotions or https://…"
                        value={form.ctaUrl || ''} onChange={e => setField('ctaUrl', e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">Source</label>
                    <div className="grid grid-cols-2 gap-3">
                      <select
                        className="bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-slate-300 focus:outline-none focus:ring-1 focus:ring-sky-500"
                        value={form.sourceType} onChange={e => setField('sourceType', e.target.value as PopupConfig['sourceType'])}
                      >
                        <option value="standalone">Standalone</option>
                        <option value="promotion">Promotion</option>
                        <option value="announcement">Announcement</option>
                        <option value="publication">Publication</option>
                      </select>
                      {form.sourceType !== 'standalone' && (
                        <input
                          className="bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                          placeholder="Source record ID"
                          value={form.sourceId || ''} onChange={e => setField('sourceId', e.target.value)}
                        />
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* ── DISPLAY TAB ── */}
              {activeTab === 'display' && (
                <div className="space-y-5">
                  <div>
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">Display Mode</label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['standard','popup','both'] as PopupDisplayMode[]).map(m => (
                        <button
                          key={m}
                          onClick={() => setField('displayMode', m)}
                          className={`py-2.5 px-3 rounded-lg border text-sm font-medium capitalize transition-all ${form.displayMode === m ? 'bg-sky-500/20 border-sky-500 text-sky-300' : 'bg-white/5 border-white/10 text-slate-400 hover:border-white/30'}`}
                        >
                          {m}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">Trigger</label>
                      <select
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-slate-300 focus:outline-none focus:ring-1 focus:ring-sky-500"
                        value={form.triggerType} onChange={e => setField('triggerType', e.target.value as PopupTrigger)}
                      >
                        <option value="immediate">Immediately</option>
                        <option value="delay">After delay</option>
                        <option value="scroll">On scroll</option>
                      </select>
                    </div>
                    {form.triggerType === 'delay' && (
                      <div>
                        <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">Delay (seconds)</label>
                        <input
                          type="number" min={0} max={60}
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-sky-500"
                          value={form.triggerDelaySeconds} onChange={e => setField('triggerDelaySeconds', Number(e.target.value))}
                        />
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">Display Frequency</label>
                    <select
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-slate-300 focus:outline-none focus:ring-1 focus:ring-sky-500"
                      value={form.displayFrequency} onChange={e => setField('displayFrequency', e.target.value as PopupFrequency)}
                    >
                      <option value="once_session">Once per session</option>
                      <option value="once_device">Once per device</option>
                      <option value="every_visit">Every visit</option>
                      <option value="until_dismissed">Until dismissed</option>
                    </select>
                  </div>

                  <div className="space-y-3">
                    {[
                      { key: 'showCloseButton' as const, label: 'Show close button' },
                      { key: 'overlayEnabled'  as const, label: 'Background overlay' },
                      { key: 'showOnDesktop'   as const, label: 'Show on desktop' },
                      { key: 'showOnMobile'    as const, label: 'Show on mobile' },
                    ].map(opt => (
                      <label key={opt.key} className="flex items-center justify-between cursor-pointer">
                        <span className="text-sm text-slate-300">{opt.label}</span>
                        <button
                          type="button"
                          onClick={() => setField(opt.key, !form[opt.key])}
                          className={`relative inline-flex h-5 w-9 rounded-full transition-colors ${form[opt.key] ? 'bg-sky-500' : 'bg-slate-700'}`}
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
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">Start Date & Time</label>
                      <input
                        type="datetime-local"
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-sky-500"
                        value={form.startDate || ''} onChange={e => setField('startDate', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">End Date & Time</label>
                      <input
                        type="datetime-local"
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-sky-500"
                        value={form.endDate || ''} onChange={e => setField('endDate', e.target.value || undefined)}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">
                      Priority <span className="normal-case font-normal text-slate-500">(1 = highest)</span>
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="range" min={1} max={20}
                        className="flex-1 accent-sky-500"
                        value={form.priority} onChange={e => setField('priority', Number(e.target.value))}
                      />
                      <span className="text-sm font-mono text-sky-400 w-6 text-center">{form.priority}</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">Lower numbers appear before higher numbers. Only one popup appears at a time.</p>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">Status</label>
                    <select
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-slate-300 focus:outline-none focus:ring-1 focus:ring-sky-500"
                      value={form.status} onChange={e => setField('status', e.target.value as PopupStatus)}
                    >
                      <option value="draft">Draft</option>
                      <option value="scheduled">Scheduled</option>
                      <option value="active">Active</option>
                      <option value="paused">Paused</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>
                </div>
              )}

              {/* ── PREVIEW TAB ── */}
              {activeTab === 'preview' && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    {([
                      { k: 'desktop' as const, icon: Monitor },
                      { k: 'tablet'  as const, icon: Tablet  },
                      { k: 'mobile'  as const, icon: Smartphone },
                    ]).map(({ k, icon: Icon }) => (
                      <button
                        key={k}
                        onClick={() => setPreviewViewport(k)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${previewViewport === k ? 'bg-sky-500/20 text-sky-400 border border-sky-500/40' : 'bg-white/5 text-slate-400 border border-white/10 hover:border-white/30'}`}
                      >
                        <Icon className="h-3.5 w-3.5" /> {k.charAt(0).toUpperCase() + k.slice(1)}
                      </button>
                    ))}
                  </div>
                  <div className="overflow-x-auto pb-2">
                    <PreviewViewport form={form} viewport={previewViewport} />
                  </div>
                  <p className="text-xs text-slate-500 text-center">This is a preview. Actual rendering may vary slightly on the live site.</p>
                </div>
              )}
            </div>

            {/* Modal footer */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-white/10 shrink-0 gap-3">
              <Button variant="ghost" onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white">
                Cancel
              </Button>
              <div className="flex gap-2">
                {activeTab !== 'preview' && (
                  <Button
                    variant="outline"
                    onClick={() => setActiveTab('preview')}
                    className="border-white/20 text-slate-300 hover:text-white gap-2"
                  >
                    <Eye className="h-4 w-4" /> Preview
                  </Button>
                )}
                <Button onClick={handleSave} className="bg-[#0284c7] hover:bg-sky-500 text-white">
                  {editingId ? 'Save Changes' : 'Create Popup'}
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
