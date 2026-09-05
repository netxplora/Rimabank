import React, { useState, useMemo } from 'react';
import {
  Plus, Edit2, Trash2, Play, Pause, Eye, X, Monitor, Tablet,
  Smartphone, Layers, Clock, BarChart2, ChevronUp,
  ChevronDown, CheckCircle2, AlertCircle, Search, Filter, Image as ImageIcon,
  Sliders, Calendar, ArrowRight, ArrowLeft, FileText, Check,
  Copy, CheckSquare, Square, Zap, Sparkles, FolderOpen
} from 'lucide-react';
import { useCMS } from '@/context/CMSContext';
import { useAuth } from '@/context/AuthContext';
import { PopupConfig, PopupDisplayMode, PopupTrigger, PopupFrequency, PopupStatus } from '@/types/cms';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

// ── Helpers ─────────────────────────────────────────────────────────────────

const STATUS_COLORS: Record<PopupStatus, string> = {
  active:    'bg-emerald-50 text-emerald-700 border border-emerald-200',
  paused:    'bg-amber-50 text-amber-700 border border-amber-200',
  draft:     'bg-slate-100 text-slate-700 border border-slate-200',
  scheduled: 'bg-sky-50 text-sky-700 border border-sky-200',
  expired:   'bg-rose-50 text-rose-700 border border-rose-200',
  archived:  'bg-zinc-100 text-zinc-700 border border-zinc-200',
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
  if (imp === 0) return '0.0%';
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
  const dims = viewport === 'desktop' ? 'w-full max-w-full h-[320px] sm:h-[360px]' : viewport === 'tablet' ? 'w-[380px] max-w-full h-[300px] sm:h-[340px]' : 'w-[280px] sm:w-[300px] max-w-full h-[340px] sm:h-[380px]';
  return (
    <div className={`relative ${dims} bg-[#0a1e3f] rounded-2xl overflow-hidden border border-[#e2e8f0] shadow-inner flex items-center justify-center mx-auto transition-all`}>
      {/* Simulated page background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="h-8 bg-slate-700 w-full" />
        <div className="p-3 sm:p-4 space-y-2.5">
          {[1,2,3,4,5].map(i => <div key={i} className="h-2.5 bg-slate-600 rounded" style={{width: `${55 + i * 7}%`}} />)}
        </div>
      </div>

      {/* Overlay */}
      {form.overlayEnabled && <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs" />}

      {/* Modal card */}
      <div className={`relative z-10 bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-100 ${viewport === 'mobile' ? 'w-[240px] sm:w-[260px]' : 'w-[280px] sm:w-[320px] max-w-[90%]'}`}>
        {form.featuredImage && (
          <div className="relative h-20 sm:h-24 overflow-hidden shrink-0">
            <img src={form.featuredImage} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
          </div>
        )}
        <div className="p-3 sm:p-4 space-y-1.5">
          <p className="font-heading font-bold text-[#0a1e3f] text-xs sm:text-sm leading-snug line-clamp-2">
            {form.title || 'Popup Title'}
          </p>
          <p className="text-slate-600 text-[11px] sm:text-xs leading-relaxed line-clamp-3">
            {form.content || 'Your popup message will appear here. Keep it concise and focused.'}
          </p>
          {form.ctaText && (
            <div className="pt-1">
              <span className="block w-full py-1.5 px-3 bg-[#0284c7] text-white text-[11px] sm:text-xs font-semibold rounded-lg text-center truncate shadow-sm">
                {form.ctaText}
              </span>
            </div>
          )}
        </div>
        {form.showCloseButton && (
          <div className="absolute top-2 right-2 h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center">
            <X className="h-3 w-3" />
          </div>
        )}
      </div>
    </div>
  );
};

// ── Main component ───────────────────────────────────────────────────────────

export default function PopupManager() {
  const {
    popupConfigs,
    addPopupConfig,
    updatePopupConfig,
    deletePopupConfig,
    togglePopupStatus,
    promotions,
    announcements,
    publications,
    mediaAssets = []
  } = useCMS();
  const { user } = useAuth();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMediaPickerOpen, setIsMediaPickerOpen] = useState(false);
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
      const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
        (p.content && p.content.toLowerCase().includes(search.toLowerCase()));
      const matchStatus = statusFilter === 'all' || p.status === statusFilter;
      return matchSearch && matchStatus;
    }).sort((a, b) => a.priority - b.priority);
  }, [popupConfigs, search, statusFilter]);

  // Aggregate Metrics
  const activeCount = popupConfigs.filter(p => p.status === 'active').length;
  const totalImpressions = popupConfigs.reduce((acc, p) => acc + (p.impressions || 0), 0);
  const totalClicks = popupConfigs.reduce((acc, p) => acc + (p.ctaClicks || 0), 0);
  const overallCtr = totalImpressions > 0 ? ((totalClicks / totalImpressions) * 100).toFixed(1) + '%' : '0.0%';

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
      endDate:             popup.endDate ? popup.endDate.slice(0, 16) : undefined,
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

  // ── Duplicate
  const handleDuplicate = async (popup: PopupConfig) => {
    const activeUser = user || {
      id: 'a0000000-0000-0000-0000-000000000001',
      name: 'Executive Administrator',
      role: 'admin' as const,
      department: 'Executive Management',
      lastLogin: new Date().toISOString(),
      email: 'admin@rimamfb.com'
    };

    const success = await addPopupConfig({
      sourceType:          popup.sourceType,
      sourceId:            popup.sourceId,
      displayMode:         popup.displayMode,
      title:               `${popup.title} (Copy)`,
      content:             popup.content,
      featuredImage:       popup.featuredImage,
      ctaText:             popup.ctaText,
      ctaUrl:              popup.ctaUrl,
      showCloseButton:     popup.showCloseButton,
      startDate:           new Date().toISOString(),
      endDate:             popup.endDate,
      triggerType:         popup.triggerType,
      triggerDelaySeconds: popup.triggerDelaySeconds,
      displayFrequency:    popup.displayFrequency,
      priority:            popup.priority + 1,
      showOnDesktop:       popup.showOnDesktop,
      showOnMobile:        popup.showOnMobile,
      overlayEnabled:      popup.overlayEnabled,
      status:              'draft',
      createdBy:           activeUser.name,
      createdById:         activeUser.id,
    }, activeUser);
    if (success) {
      toast.success(`Cloned "${popup.title}" as draft`);
    } else {
      toast.error(`Failed to duplicate popup. Please try again.`);
    }
  };

  // ── Auto-fill from selected Source Item
  const handleSourceSelect = (sourceType: PopupConfig['sourceType'], sourceId: string) => {
    setField('sourceType', sourceType);
    setField('sourceId', sourceId);

    if (sourceType === 'promotion') {
      const promo = promotions.find(p => p.id === sourceId);
      if (promo) {
        setField('title', promo.title);
        setField('content', promo.description);
        if (promo.imageUrl) setField('featuredImage', promo.imageUrl);
        setField('ctaText', 'Explore Offer');
        setField('ctaUrl', '/products');
        toast.info(`Auto-filled details from promotion "${promo.title}"`);
      }
    } else if (sourceType === 'announcement') {
      const ann = announcements.find(a => a.id === sourceId);
      if (ann) {
        setField('title', ann.title);
        setField('content', ann.message);
        if (ann.actionText) setField('ctaText', ann.actionText);
        if (ann.actionLink) setField('ctaUrl', ann.actionLink);
        toast.info(`Auto-filled details from announcement "${ann.title}"`);
      }
    } else if (sourceType === 'publication') {
      const pub = publications.find(p => p.id === sourceId);
      if (pub) {
        setField('title', pub.title);
        setField('content', pub.excerpt || pub.content.slice(0, 140));
        if (pub.featuredImage) setField('featuredImage', pub.featuredImage);
        setField('ctaText', 'Read Publication');
        setField('ctaUrl', `/media/${pub.slug}`);
        toast.info(`Auto-filled details from publication "${pub.title}"`);
      }
    }
  };

  // ── Save
  const handleSave = async () => {
    if (!form.title.trim()) { toast.error('Popup title is required'); return; }
    if (!form.content.trim()) { toast.error('Popup content is required'); return; }
    
    const activeUser = user || {
      id: 'a0000000-0000-0000-0000-000000000001',
      name: 'Executive Administrator',
      role: 'admin' as const,
      department: 'Executive Management',
      lastLogin: new Date().toISOString(),
      email: 'admin@rimamfb.com'
    };

    let startIso: string;
    try {
      startIso = form.startDate ? new Date(form.startDate).toISOString() : new Date().toISOString();
    } catch {
      startIso = new Date().toISOString();
    }

    let endIso: string | undefined = undefined;
    if (form.endDate && typeof form.endDate === 'string' && form.endDate.trim() !== '') {
      try {
        endIso = new Date(form.endDate).toISOString();
      } catch {
        endIso = undefined;
      }
    }

    if (editingId) {
      const success = await updatePopupConfig(editingId, { ...form, startDate: startIso, endDate: endIso }, activeUser);
      if (success) {
        toast.success('Popup updated successfully');
      } else {
        toast.error('Failed to update popup. Please try again.');
      }
    } else {
      const success = await addPopupConfig({
        ...form,
        startDate: startIso,
        endDate: endIso,
        createdBy: activeUser.name,
        createdById: activeUser.id
      }, activeUser);
      if (success) {
        toast.success('Popup created successfully');
      } else {
        toast.error('Failed to save popup. Please try again.');
      }
    }
    setIsModalOpen(false);
  };

  // ── Delete
  const handleDelete = async (id: string) => {
    const activeUser = user || {
      id: 'a0000000-0000-0000-0000-000000000001',
      name: 'Executive Administrator',
      role: 'admin' as const
    };
    setConfirmDeleteId(null);
    setSelectedIds(prev => prev.filter(i => i !== id));
    const ok = await deletePopupConfig(id, activeUser);
    if (ok) {
      toast.success('Popup deleted successfully');
    } else {
      toast.error('Failed to delete popup. Please check your permissions.');
    }
  };

  // ── Bulk Actions
  const handleSelectAll = () => {
    if (selectedIds.length === filtered.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filtered.map(p => p.id));
    }
  };

  const handleToggleSelect = (id: string) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const handleBulkActivate = async () => {
    const activeUser = user || { id: 'a0000000-0000-0000-0000-000000000001', name: 'Executive Administrator', role: 'admin' as const };
    if (selectedIds.length === 0) return;
    const ids = [...selectedIds];
    setSelectedIds([]);
    await Promise.all(ids.map(id => updatePopupConfig(id, { status: 'active' }, activeUser)));
    toast.success(`Activated ${ids.length} popups`);
  };

  const handleBulkPause = async () => {
    const activeUser = user || { id: 'a0000000-0000-0000-0000-000000000001', name: 'Executive Administrator', role: 'admin' as const };
    if (selectedIds.length === 0) return;
    const ids = [...selectedIds];
    setSelectedIds([]);
    await Promise.all(ids.map(id => updatePopupConfig(id, { status: 'paused' }, activeUser)));
    toast.success(`Paused ${ids.length} popups`);
  };

  const handleBulkDelete = async () => {
    const activeUser = user || { id: 'a0000000-0000-0000-0000-000000000001', name: 'Executive Administrator', role: 'admin' as const };
    if (selectedIds.length === 0) return;
    const ids = [...selectedIds];
    setSelectedIds([]);
    const results = await Promise.all(ids.map(id => deletePopupConfig(id, activeUser)));
    const deleted = results.filter(Boolean).length;
    const failed  = ids.length - deleted;
    if (deleted > 0) toast.success(`Deleted ${deleted} popup${deleted > 1 ? 's' : ''}`);
    if (failed  > 0) toast.error(`${failed} popup${failed > 1 ? 's' : ''} could not be deleted`);
  };

  // ── Toggle active/paused
  const handleToggle = async (popup: PopupConfig) => {
    const activeUser = user || { id: 'a0000000-0000-0000-0000-000000000001', name: 'Executive Administrator', role: 'admin' as const };
    const ok = await togglePopupStatus(popup.id, activeUser);
    if (ok) {
      toast.success(popup.status === 'active' ? 'Popup paused' : 'Popup activated');
    } else {
      toast.error('Failed to update popup status.');
    }
  };

  // ── Priority nudge
  const nudgePriority = async (id: string, direction: 'up' | 'down') => {
    const activeUser = user || { id: 'a0000000-0000-0000-0000-000000000001', name: 'Executive Administrator', role: 'admin' as const };
    const popup = popupConfigs.find(p => p.id === id);
    if (!popup) return;
    const newPriority = direction === 'up' ? Math.max(1, popup.priority - 1) : popup.priority + 1;
    await updatePopupConfig(id, { priority: newPriority }, activeUser);
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-[#e2e8f0] shadow-xs">
        <div>
          <h1 className="text-xl font-heading font-bold text-[#0a1e3f] tracking-tight">
            Popup Manager
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage website popup notifications, audience rules, triggers, and display schedules.
          </p>
        </div>
        <Button
          onClick={handleCreate}
          className="h-9 rounded-xl bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-semibold shadow-sm flex items-center gap-1.5"
        >
          <Plus className="h-4 w-4" />
          <span>New Popup</span>
        </Button>
      </div>

      {/* Analytics Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white p-4 rounded-2xl border border-[#e2e8f0] shadow-xs">
          <p className="text-xs text-slate-500 font-medium">Active Popups</p>
          <p className="text-xl sm:text-2xl font-bold font-heading mt-1 text-emerald-600">{activeCount}</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-[#e2e8f0] shadow-xs">
          <p className="text-xs text-slate-500 font-medium">Total Views</p>
          <p className="text-xl sm:text-2xl font-bold font-heading mt-1 text-sky-600">{totalImpressions.toLocaleString()}</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-[#e2e8f0] shadow-xs">
          <p className="text-xs text-slate-500 font-medium">CTA Clicks</p>
          <p className="text-xl sm:text-2xl font-bold font-heading mt-1 text-amber-600">{totalClicks.toLocaleString()}</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-[#e2e8f0] shadow-xs">
          <p className="text-xs text-slate-500 font-medium">Average CTR</p>
          <p className="text-xl sm:text-2xl font-bold font-heading mt-1 text-purple-600">{overallCtr}</p>
        </div>
      </div>

      {/* Filters & Bulk Operations */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-[#e2e8f0] shadow-xs">
        <div className="relative w-full sm:w-72">
          <Search className="h-4 w-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search popups by title..."
            className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-[#e2e8f0] text-xs font-medium focus:border-[#0284c7] outline-none text-slate-800"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <Filter className="h-3.5 w-3.5 text-slate-400 shrink-0" />
          {['all', 'active', 'scheduled', 'draft', 'paused', 'archived'].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1 rounded-xl text-xs font-semibold capitalize whitespace-nowrap transition-all ${
                statusFilter === s
                  ? 'bg-[#0a1e3f] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Bulk Action Bar */}
        {selectedIds.length > 0 && (
          <div className="flex items-center gap-2 bg-sky-50 border border-sky-200 px-3 py-1.5 rounded-xl animate-in fade-in duration-150">
            <span className="text-xs font-semibold text-sky-800">
              {selectedIds.length} selected
            </span>
            <div className="h-4 w-px bg-sky-200 mx-1" />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleBulkActivate}
              className="text-xs text-emerald-700 hover:bg-emerald-100 px-2 py-1 h-auto font-medium"
            >
              Activate
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleBulkPause}
              className="text-xs text-amber-700 hover:bg-amber-100 px-2 py-1 h-auto font-medium"
            >
              Pause
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleBulkDelete}
              className="text-xs text-rose-700 hover:bg-rose-100 px-2 py-1 h-auto font-medium"
            >
              Delete
            </Button>
          </div>
        )}
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-slate-500 bg-white border border-dashed border-[#e2e8f0] rounded-2xl shadow-xs">
          <Layers className="h-10 w-10 mx-auto mb-3 opacity-40 text-slate-400" />
          <p className="text-sm font-semibold text-slate-700">No popup configurations found</p>
          <p className="text-xs text-slate-400 mt-1">Create a new popup notification to get started.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-[#e2e8f0] shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-[#e2e8f0] text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="px-3 py-3 w-10 text-center">
                    <button
                      type="button"
                      onClick={handleSelectAll}
                      className="text-slate-400 hover:text-slate-600"
                      title="Select all"
                    >
                      {selectedIds.length > 0 && selectedIds.length === filtered.length ? (
                        <CheckSquare className="h-4 w-4 text-[#0284c7]" />
                      ) : (
                        <Square className="h-4 w-4" />
                      )}
                    </button>
                  </th>
                  <th className="px-3 py-3 w-12 text-center">Pri.</th>
                  <th className="px-4 py-3">Popup Details</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 hidden md:table-cell">Source</th>
                  <th className="px-4 py-3 hidden lg:table-cell">Trigger</th>
                  <th className="px-4 py-3 hidden sm:table-cell">Frequency</th>
                  <th className="px-4 py-3">Engagement</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e2e8f0] text-slate-700">
                {filtered.map(popup => {
                  const isSelected = selectedIds.includes(popup.id);
                  return (
                    <tr key={popup.id} className={`hover:bg-slate-50/70 transition-colors group ${isSelected ? 'bg-sky-50/60' : ''}`}>
                      {/* Selection Checkbox */}
                      <td className="px-3 py-3 text-center">
                        <button
                          type="button"
                          onClick={() => handleToggleSelect(popup.id)}
                          className="text-slate-400 hover:text-[#0284c7]"
                        >
                          {isSelected ? (
                            <CheckSquare className="h-4 w-4 text-[#0284c7]" />
                          ) : (
                            <Square className="h-4 w-4" />
                          )}
                        </button>
                      </td>

                      {/* Priority */}
                      <td className="px-3 py-3 text-center">
                        <div className="flex flex-col items-center justify-center gap-0.5">
                          <button onClick={() => nudgePriority(popup.id, 'up')} className="text-slate-400 hover:text-[#0284c7] transition-colors p-0.5" title="Increase priority (show earlier)">
                            <ChevronUp className="h-3.5 w-3.5" />
                          </button>
                          <span className="text-xs font-bold font-mono text-[#0284c7]">{popup.priority}</span>
                          <button onClick={() => nudgePriority(popup.id, 'down')} className="text-slate-400 hover:text-[#0284c7] transition-colors p-0.5" title="Decrease priority">
                            <ChevronDown className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>

                      {/* Title & Preview Thumbnail */}
                      <td className="px-4 py-3 max-w-[240px]">
                        <div className="flex items-center gap-2.5">
                          {popup.featuredImage && (
                            <img
                              src={popup.featuredImage}
                              alt=""
                              className="h-10 w-10 rounded-lg object-cover shrink-0 border border-[#e2e8f0] hidden sm:block bg-slate-50"
                            />
                          )}
                          <div className="min-w-0">
                            <p className="font-semibold text-[#0a1e3f] truncate">{popup.title}</p>
                            <p className="text-[11px] text-slate-500 truncate mt-0.5">{popup.content || 'No description text'}</p>
                          </div>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold capitalize ${STATUS_COLORS[popup.status] || STATUS_COLORS.draft}`}>
                          {popup.status}
                        </span>
                      </td>

                      {/* Source */}
                      <td className="px-4 py-3 text-xs text-slate-500 capitalize hidden md:table-cell">
                        <span className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-600 font-medium">
                          {popup.sourceType}
                        </span>
                      </td>

                      {/* Trigger */}
                      <td className="px-4 py-3 text-xs text-slate-600 hidden lg:table-cell">
                        <span className="font-medium">{TRIGGER_LABELS[popup.triggerType]}</span>
                        {popup.triggerType === 'delay' && <span className="text-slate-400"> ({popup.triggerDelaySeconds}s)</span>}
                      </td>

                      {/* Frequency */}
                      <td className="px-4 py-3 text-xs text-slate-600 hidden sm:table-cell">
                        {FREQ_LABELS[popup.displayFrequency]}
                      </td>

                      {/* Analytics */}
                      <td className="px-4 py-3">
                        <div className="text-[11px] text-slate-500 space-y-0.5">
                          <div className="font-medium text-slate-800">{popup.impressions.toLocaleString()} views</div>
                          <div className="text-emerald-600 font-semibold">{ctr(popup.impressions, popup.ctaClicks)} CTR</div>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => handleToggle(popup)}
                            title={popup.status === 'active' ? 'Pause Popup' : 'Activate Popup'}
                            className={`p-1.5 rounded-lg transition-colors ${popup.status === 'active' ? 'text-amber-600 hover:bg-amber-50' : 'text-emerald-600 hover:bg-emerald-50'}`}
                          >
                            {popup.status === 'active' ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                          </button>

                          <button
                            onClick={() => handleDuplicate(popup)}
                            title="Duplicate Popup"
                            className="p-1.5 rounded-lg text-purple-600 hover:bg-purple-50 transition-colors"
                          >
                            <Copy className="h-4 w-4" />
                          </button>

                          <button onClick={() => handleEdit(popup)} title="Edit Popup" className="p-1.5 rounded-lg text-[#0284c7] hover:bg-sky-50 transition-colors">
                            <Edit2 className="h-4 w-4" />
                          </button>

                          <button onClick={() => setConfirmDeleteId(popup.id)} title="Delete Popup" className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 transition-colors">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
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
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsModalOpen(false)}
          />

          {/* Modal Container */}
          <div className="relative z-10 w-full max-w-2xl bg-white border border-[#e2e8f0] rounded-t-2xl sm:rounded-2xl shadow-2xl flex flex-col max-h-[92vh] sm:max-h-[88vh] overflow-hidden animate-in fade-in-50 duration-200">
            {/* Modal header */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 border-b border-[#e2e8f0] shrink-0 bg-slate-50">
              <div className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-lg bg-sky-100 border border-sky-200 flex items-center justify-center text-[#0284c7]">
                  <Layers className="h-4 w-4" />
                </div>
                <div>
                  <h2 className="font-heading font-bold text-[#0a1e3f] text-base sm:text-lg leading-tight">
                    {editingId ? 'Edit Popup Notification' : 'New Popup Notification'}
                  </h2>
                  <p className="text-[11px] text-slate-500 hidden sm:block">
                    Configure modal announcement content, triggers, and display schedules
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
                aria-label="Close dialog"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Responsive Step Navigation Bar */}
            <div className="px-3 sm:px-6 border-b border-[#e2e8f0] bg-slate-50/60 shrink-0">
              <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-2 scrollbar-none">
                {tabs.map(t => {
                  const Icon = t.icon;
                  const isActive = activeTab === t.key;
                  return (
                    <button
                      key={t.key}
                      onClick={() => setActiveTab(t.key)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all shrink-0 ${
                        isActive
                          ? 'bg-[#0284c7] text-white shadow-sm shadow-sky-500/20 font-semibold'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                      }`}
                    >
                      <Icon className="h-3.5 w-3.5" />
                      <span>{t.label}</span>
                      <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${isActive ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'}`}>
                        {t.step}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Scrollable Form Body */}
            <div className="overflow-y-auto flex-1 px-4 sm:px-6 py-4 sm:py-5 space-y-4 text-xs sm:text-sm text-slate-700">

              {/* ── CONTENT TAB ── */}
              {activeTab === 'content' && (
                <div className="space-y-4 animate-in fade-in-50 duration-150">
                  {/* Source relationship & Quick-fill selector */}
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-[#e2e8f0] space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-semibold text-[#0a1e3f] uppercase tracking-wider flex items-center gap-1.5">
                        <Zap className="h-3.5 w-3.5 text-amber-500" />
                        Source & Auto-fill Content
                      </label>
                      <span className="text-[10px] text-slate-500">Attach existing CMS content</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] text-slate-500 block mb-1">Content Source Type</label>
                        <select
                          className="w-full bg-white border border-[#e2e8f0] rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#0284c7]"
                          value={form.sourceType}
                          onChange={e => {
                            const newType = e.target.value as PopupConfig['sourceType'];
                            setField('sourceType', newType);
                            setField('sourceId', undefined);
                          }}
                        >
                          <option value="standalone">Standalone (Custom Popup)</option>
                          <option value="promotion">Attached to Promotion</option>
                          <option value="announcement">Attached to Announcement</option>
                          <option value="publication">Attached to Publication</option>
                        </select>
                      </div>

                      {/* Source selector dropdown */}
                      {form.sourceType === 'promotion' && (
                        <div>
                          <label className="text-[11px] text-slate-500 block mb-1">Select Promotion</label>
                          <select
                            className="w-full bg-white border border-[#e2e8f0] rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#0284c7]"
                            value={form.sourceId || ''}
                            onChange={e => handleSourceSelect('promotion', e.target.value)}
                          >
                            <option value="">-- Choose Promotion to Auto-fill --</option>
                            {promotions.map(p => (
                              <option key={p.id} value={p.id}>{p.title}</option>
                            ))}
                          </select>
                        </div>
                      )}

                      {form.sourceType === 'announcement' && (
                        <div>
                          <label className="text-[11px] text-slate-500 block mb-1">Select Announcement</label>
                          <select
                            className="w-full bg-white border border-[#e2e8f0] rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#0284c7]"
                            value={form.sourceId || ''}
                            onChange={e => handleSourceSelect('announcement', e.target.value)}
                          >
                            <option value="">-- Choose Announcement to Auto-fill --</option>
                            {announcements.map(a => (
                              <option key={a.id} value={a.id}>{a.title}</option>
                            ))}
                          </select>
                        </div>
                      )}

                      {form.sourceType === 'publication' && (
                        <div>
                          <label className="text-[11px] text-slate-500 block mb-1">Select Publication</label>
                          <select
                            className="w-full bg-white border border-[#e2e8f0] rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#0284c7]"
                            value={form.sourceId || ''}
                            onChange={e => handleSourceSelect('publication', e.target.value)}
                          >
                            <option value="">-- Choose Publication to Auto-fill --</option>
                            {publications.map(p => (
                              <option key={p.id} value={p.id}>{p.title}</option>
                            ))}
                          </select>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block mb-1.5">
                      Popup Title <span className="text-rose-500">*</span>
                    </label>
                    <input
                      className="w-full bg-white border border-[#e2e8f0] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0284c7] transition-all"
                      placeholder="e.g. Special Savings Bonus 2026"
                      value={form.title} onChange={e => setField('title', e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block mb-1.5">
                      Popup Message <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      rows={4}
                      className="w-full bg-white border border-[#e2e8f0] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0284c7] resize-none transition-all"
                      placeholder="Enter the main message displayed to website visitors..."
                      value={form.content} onChange={e => setField('content', e.target.value)}
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                        Featured Image URL <span className="normal-case font-normal text-slate-500">(Optional)</span>
                      </label>
                      <button
                        type="button"
                        onClick={() => setIsMediaPickerOpen(true)}
                        className="text-xs text-[#0284c7] hover:text-sky-700 flex items-center gap-1 font-semibold"
                      >
                        <FolderOpen className="h-3.5 w-3.5" />
                        <span>Select from Media Library</span>
                      </button>
                    </div>
                    <div className="flex gap-2">
                      <input
                        className="flex-1 bg-white border border-[#e2e8f0] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0284c7] transition-all"
                        placeholder="https://... or choose from Media Library"
                        value={form.featuredImage || ''} onChange={e => setField('featuredImage', e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={() => setIsMediaPickerOpen(true)}
                        className="px-3 bg-slate-50 border border-[#e2e8f0] rounded-xl text-slate-600 hover:text-[#0284c7] hover:bg-slate-100 transition-colors flex items-center gap-1.5"
                        title="Open Media Library"
                      >
                        <ImageIcon className="h-4 w-4" />
                        <span className="text-xs hidden sm:inline">Browse</span>
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block mb-1.5">
                        CTA Button Label
                      </label>
                      <input
                        className="w-full bg-white border border-[#e2e8f0] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0284c7] transition-all"
                        placeholder="e.g. Learn More / Claim Offer"
                        value={form.ctaText || ''} onChange={e => setField('ctaText', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block mb-1.5">
                        CTA Destination URL
                      </label>
                      <input
                        className="w-full bg-white border border-[#e2e8f0] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0284c7] transition-all"
                        placeholder="/products or https://..."
                        value={form.ctaUrl || ''} onChange={e => setField('ctaUrl', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* ── DISPLAY TAB ── */}
              {activeTab === 'display' && (
                <div className="space-y-4 sm:space-y-5 animate-in fade-in-50 duration-150">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block mb-2">
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
                              ? 'bg-sky-50 border-[#0284c7] text-[#0284c7] shadow-xs font-semibold'
                              : 'bg-white border-[#e2e8f0] text-slate-600 hover:border-slate-300'
                          }`}
                        >
                          {m}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block mb-1.5">
                        Trigger Type
                      </label>
                      <select
                        className="w-full bg-white border border-[#e2e8f0] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-[#0284c7]"
                        value={form.triggerType} onChange={e => setField('triggerType', e.target.value as PopupTrigger)}
                      >
                        <option value="immediate">Immediately upon load</option>
                        <option value="delay">After time delay</option>
                        <option value="scroll">On user scroll</option>
                      </select>
                    </div>
                    {form.triggerType === 'delay' && (
                      <div>
                        <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block mb-1.5">
                          Delay (seconds)
                        </label>
                        <input
                          type="number" min={0} max={60}
                          className="w-full bg-white border border-[#e2e8f0] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#0284c7]"
                          value={form.triggerDelaySeconds} onChange={e => setField('triggerDelaySeconds', Number(e.target.value))}
                        />
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block mb-1.5">
                      Display Frequency
                    </label>
                    <select
                      className="w-full bg-white border border-[#e2e8f0] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-[#0284c7]"
                      value={form.displayFrequency} onChange={e => setField('displayFrequency', e.target.value as PopupFrequency)}
                    >
                      <option value="once_session">Once per session</option>
                      <option value="once_device">Once per device</option>
                      <option value="every_visit">Every page visit</option>
                      <option value="until_dismissed">Until dismissed by user</option>
                    </select>
                  </div>

                  {/* Rules Toggles */}
                  <div className="space-y-2.5 pt-2 border-t border-[#e2e8f0]">
                    <p className="text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Display Rules</p>
                    {[
                      { key: 'showCloseButton' as const, label: 'Show close button (X)' },
                      { key: 'overlayEnabled'  as const, label: 'Dark background overlay' },
                      { key: 'showOnDesktop'   as const, label: 'Display on desktop screens' },
                      { key: 'showOnMobile'    as const, label: 'Display on mobile devices' },
                    ].map(opt => (
                      <label key={opt.key} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-[#e2e8f0] hover:bg-slate-100/70 cursor-pointer transition-colors">
                        <span className="text-xs sm:text-sm text-slate-800 font-medium">{opt.label}</span>
                        <button
                          type="button"
                          onClick={() => setField(opt.key, !form[opt.key])}
                          className={`relative inline-flex h-5 w-9 rounded-full transition-colors shrink-0 ${form[opt.key] ? 'bg-[#0284c7]' : 'bg-slate-300'}`}
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
                      <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block mb-1.5">
                        Start Date & Time
                      </label>
                      <input
                        type="datetime-local"
                        className="w-full bg-white border border-[#e2e8f0] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-[#0284c7]"
                        value={form.startDate || ''} onChange={e => setField('startDate', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block mb-1.5">
                        End Date & Time <span className="normal-case font-normal text-slate-500">(Optional)</span>
                      </label>
                      <input
                        type="datetime-local"
                        className="w-full bg-white border border-[#e2e8f0] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-[#0284c7]"
                        value={form.endDate || ''} onChange={e => setField('endDate', e.target.value || undefined)}
                      />
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-[#e2e8f0] space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                        Priority Level <span className="normal-case font-normal text-slate-500">(1 = highest)</span>
                      </label>
                      <span className="text-sm font-mono font-bold text-[#0284c7] px-2 py-0.5 rounded bg-sky-100 border border-sky-200">
                        {form.priority}
                      </span>
                    </div>
                    <input
                      type="range" min={1} max={20}
                      className="w-full accent-[#0284c7] cursor-pointer"
                      value={form.priority} onChange={e => setField('priority', Number(e.target.value))}
                    />
                    <p className="text-[11px] text-slate-500">
                      When multiple popups qualify, the popup with the lowest priority value is presented first.
                    </p>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block mb-1.5">
                      Publishing Status
                    </label>
                    <select
                      className="w-full bg-white border border-[#e2e8f0] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-[#0284c7]"
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
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                          previewViewport === k
                            ? 'bg-sky-50 text-[#0284c7] border border-sky-300 font-semibold'
                            : 'bg-slate-100 text-slate-600 border border-slate-200 hover:bg-slate-200'
                        }`}
                      >
                        <Icon className="h-3.5 w-3.5" /> <span>{label}</span>
                      </button>
                    ))}
                  </div>
                  <div className="overflow-x-auto pb-1 max-w-full">
                    <PreviewViewport form={form} viewport={previewViewport} />
                  </div>
                  <p className="text-[11px] text-slate-500 text-center">
                    Visual simulation of the popup appearance on the public website.
                  </p>
                </div>
              )}
            </div>

            {/* Responsive Modal Footer with Step Navigation */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 border-t border-[#e2e8f0] bg-slate-50 shrink-0 gap-2.5 sm:gap-3">
              <div className="flex items-center justify-between sm:justify-start gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setIsModalOpen(false)}
                  className="text-xs sm:text-sm text-slate-600 hover:text-slate-900 px-3 py-2 h-auto"
                >
                  Cancel
                </Button>
                {activeTab !== 'content' && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={goToPrevTab}
                    className="text-xs sm:text-sm border-[#e2e8f0] text-slate-700 hover:bg-slate-100 bg-white gap-1.5 px-3 py-2 h-auto"
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
                    className="text-xs sm:text-sm border-[#e2e8f0] text-slate-700 hover:bg-slate-100 bg-white gap-1.5 px-3.5 py-2 h-auto flex-1 sm:flex-initial justify-center font-medium"
                  >
                    <span>Next: {nextTab.label}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                )}

                <Button
                  type="button"
                  onClick={handleSave}
                  className="text-xs sm:text-sm bg-[#0284c7] hover:bg-[#0369a1] text-white font-semibold gap-1.5 px-4 py-2 h-auto flex-1 sm:flex-initial justify-center shadow-sm"
                >
                  <Check className="h-3.5 w-3.5" />
                  <span>{editingId ? 'Save Changes' : 'Create Popup'}</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Media Picker Modal ────────────────────────────────────────────── */}
      {isMediaPickerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsMediaPickerOpen(false)} />
          <div className="relative z-10 bg-white border border-[#e2e8f0] rounded-2xl p-5 max-w-xl w-full shadow-2xl flex flex-col max-h-[85vh]">
            <div className="flex items-center justify-between pb-3 border-b border-[#e2e8f0] shrink-0">
              <div className="flex items-center gap-2">
                <FolderOpen className="h-4 w-4 text-[#0284c7]" />
                <h3 className="font-heading font-bold text-[#0a1e3f] text-sm sm:text-base">Select Featured Image</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsMediaPickerOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="overflow-y-auto flex-1 py-4">
              {(mediaAssets || []).length === 0 ? (
                <div className="text-center py-10 text-slate-400">
                  <ImageIcon className="h-8 w-8 mx-auto mb-2 opacity-40" />
                  <p className="text-xs font-medium">No media assets found in library.</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {mediaAssets.map(asset => (
                    <button
                      key={asset.id}
                      type="button"
                      onClick={() => {
                        setField('featuredImage', asset.url);
                        setIsMediaPickerOpen(false);
                        toast.success(`Selected "${asset.title}"`);
                      }}
                      className="group relative rounded-xl overflow-hidden border border-[#e2e8f0] hover:border-[#0284c7] hover:shadow-sm transition-all text-left bg-slate-50 p-1.5 flex flex-col"
                    >
                      <div className="relative h-24 w-full rounded-lg overflow-hidden bg-slate-200 mb-1.5">
                        <img src={asset.url} alt={asset.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                      </div>
                      <p className="text-[11px] font-semibold text-[#0a1e3f] truncate">{asset.title}</p>
                      <p className="text-[10px] text-slate-500 capitalize">{asset.category}</p>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-[#e2e8f0] flex justify-end shrink-0">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setIsMediaPickerOpen(false)}
                className="text-xs text-slate-600 hover:text-slate-900"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ── Delete Confirm ────────────────────────────────────────────────── */}
      {confirmDeleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setConfirmDeleteId(null)} />
          <div className="relative z-10 bg-white border border-[#e2e8f0] rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <div className="flex items-start gap-3 mb-4">
              <AlertCircle className="h-5 w-5 text-rose-500 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-heading font-bold text-[#0a1e3f]">Delete popup notification?</h3>
                <p className="text-xs text-slate-500 mt-1">This action cannot be undone. The popup will be permanently removed from the database.</p>
              </div>
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="ghost" size="sm" onClick={() => setConfirmDeleteId(null)} className="text-slate-600 hover:text-slate-900 text-xs">Cancel</Button>
              <Button size="sm" onClick={() => handleDelete(confirmDeleteId)} className="bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold">Delete</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
