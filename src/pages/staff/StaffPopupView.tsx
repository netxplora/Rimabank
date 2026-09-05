import React, { useState } from 'react';
import {
  Plus, Edit2, Eye, X, Send, Clock, AlertCircle, Layers,
  Image as ImageIcon, CheckCircle2
} from 'lucide-react';
import { useCMS } from '@/context/CMSContext';
import { useAuth } from '@/context/AuthContext';
import { PopupConfig, PopupTrigger, PopupFrequency } from '@/types/cms';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const STATUS_COLORS: Record<string, string> = {
  draft:     'bg-slate-100 text-slate-700 border border-slate-200',
  scheduled: 'bg-sky-50 text-sky-700 border border-sky-200',
  active:    'bg-emerald-50 text-emerald-700 border border-emerald-200',
  paused:    'bg-amber-50 text-amber-700 border border-amber-200',
  expired:   'bg-rose-50 text-rose-700 border border-rose-200',
  archived:  'bg-zinc-100 text-zinc-600 border border-zinc-200',
};

const defaultForm = () => ({
  title:               '',
  content:             '',
  featuredImage:       '',
  ctaText:             '',
  ctaUrl:              '',
  showCloseButton:     true,
  sourceType:          'standalone' as PopupConfig['sourceType'],
  sourceId:            undefined as string | undefined,
  displayMode:         'popup'        as PopupConfig['displayMode'],
  startDate:           new Date().toISOString().slice(0, 16),
  endDate:             '' as string,
  triggerType:         'delay'        as PopupTrigger,
  triggerDelaySeconds: 3,
  displayFrequency:    'once_session' as PopupFrequency,
  priority:            10,
  showOnDesktop:       true,
  showOnMobile:        true,
  overlayEnabled:      true,
  status:              'draft'        as PopupConfig['status'],
});

type FormState = ReturnType<typeof defaultForm>;

// Inline mini preview for staff
const MiniPreview: React.FC<{ form: FormState }> = ({ form }) => (
  <div className="relative w-full h-64 bg-slate-900 rounded-xl border border-slate-200 flex items-center justify-center overflow-hidden">
    {form.overlayEnabled && <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs" />}
    <div className="relative z-10 bg-white border border-slate-200 rounded-2xl shadow-2xl w-64 flex flex-col overflow-hidden text-slate-900">
      {form.featuredImage && (
        <div className="h-24 overflow-hidden bg-slate-100">
          <img src={form.featuredImage} alt="" className="w-full h-full object-cover" />
        </div>
      )}
      <div className="p-4 space-y-2">
        <p className="font-heading font-bold text-[#0a1e3f] text-xs leading-snug line-clamp-2">{form.title || 'Notice Title'}</p>
        <p className="text-slate-600 text-[10px] leading-relaxed line-clamp-3">{form.content || 'Your banking notice content here…'}</p>
        {form.ctaText && (
          <div className="pt-1">
            <div className="bg-[#0284c7] text-white text-[10px] font-semibold py-1.5 px-3 rounded-lg text-center">{form.ctaText}</div>
          </div>
        )}
      </div>
      {form.showCloseButton && (
        <div className="absolute top-2 right-2 h-5 w-5 rounded-full bg-black/10 flex items-center justify-center">
          <X className="h-3 w-3 text-slate-700" />
        </div>
      )}
    </div>
  </div>
);

export default function StaffPopupView() {
  const { popupConfigs, addPopupConfig, updatePopupConfig } = useCMS();
  const { user } = useAuth();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [form, setForm] = useState<FormState>(defaultForm());

  const setField = <K extends keyof FormState>(key: K, val: FormState[K]) =>
    setForm(prev => ({ ...prev, [key]: val }));

  // Staff only sees their own popups
  const myPopups = popupConfigs.filter(p =>
    p.createdById === user?.id || p.createdBy === user?.name
  );

  const handleCreate = () => {
    setEditingId(null);
    setForm(defaultForm());
    setShowPreview(false);
    setIsModalOpen(true);
  };

  const handleEdit = (popup: PopupConfig) => {
    // Staff can only edit drafts they own
    if (popup.status !== 'draft' && popup.status !== 'scheduled') {
      toast.error('Only draft notices can be edited.');
      return;
    }
    setEditingId(popup.id);
    setForm({
      title:               popup.title,
      content:             popup.content,
      featuredImage:       popup.featuredImage || '',
      ctaText:             popup.ctaText || '',
      ctaUrl:              popup.ctaUrl || '',
      showCloseButton:     popup.showCloseButton,
      sourceType:          popup.sourceType,
      sourceId:            popup.sourceId,
      displayMode:         popup.displayMode,
      startDate:           popup.startDate.slice(0, 16),
      endDate:             popup.endDate?.slice(0, 16) || '',
      triggerType:         popup.triggerType,
      triggerDelaySeconds: popup.triggerDelaySeconds,
      displayFrequency:    popup.displayFrequency,
      priority:            popup.priority,
      showOnDesktop:       popup.showOnDesktop,
      showOnMobile:        popup.showOnMobile,
      overlayEnabled:      popup.overlayEnabled,
      status:              popup.status,
    });
    setShowPreview(false);
    setIsModalOpen(true);
  };

  const handleSave = async (submitForReview = false) => {
    if (!form.title.trim()) { toast.error('Title is required'); return; }
    if (!form.content.trim()) { toast.error('Message is required'); return; }
    if (!user) return;

    const payload = {
      ...form,
      startDate:   new Date(form.startDate).toISOString(),
      endDate:     form.endDate ? new Date(form.endDate).toISOString() : undefined,
      // Staff can only submit as draft or scheduled (never active)
      status:      submitForReview ? 'scheduled' : 'draft',
      createdBy:   user.name,
      createdById: user.id,
    } as Omit<PopupConfig, 'id' | 'createdAt' | 'updatedAt' | 'impressions' | 'dismissals' | 'ctaClicks'>;

    if (editingId) {
      const result = await updatePopupConfig(editingId, { ...payload }, user);
      if (result.ok) {
        toast.success(submitForReview ? 'Notice submitted for Administrator review' : 'Draft saved');
      } else {
        toast.error(result.error ?? 'Failed to update popup draft.');
        return;
      }
    } else {
      const result = await addPopupConfig(payload, user);
      if (result.ok) {
        toast.success(submitForReview ? 'Notice submitted for Administrator review' : 'Draft saved');
      } else {
        toast.error(result.error ?? 'Failed to create popup draft.');
        return;
      }
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-[#0a1e3f]">Popup & Notice Drafts</h1>
          <p className="text-xs text-slate-500 mt-0.5">Author website modal notices and submit them for Executive Administrator approval.</p>
        </div>
        <Button onClick={handleCreate} className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2 shrink-0 rounded-xl text-xs font-semibold">
          <Plus className="h-4 w-4" /> New Notice Draft
        </Button>
      </div>

      {/* Info banner */}
      <div className="flex items-start gap-3 bg-sky-50 border border-sky-200 rounded-2xl p-4">
        <AlertCircle className="h-4 w-4 text-sky-600 shrink-0 mt-0.5" />
        <p className="text-xs text-sky-900 leading-relaxed">
          Popup notices require Administrator approval before being published on the public website. Use <strong>Submit for Review</strong> when your draft is ready for inspection.
        </p>
      </div>

      {/* List */}
      {myPopups.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#e2e8f0] p-12 text-center text-slate-400">
          <Layers className="h-10 w-10 mx-auto mb-3 opacity-30 text-slate-400" />
          <p className="text-xs font-medium text-slate-500">You have no popup notice drafts yet. Create one above.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {myPopups.map(popup => (
            <div key={popup.id} className="bg-white border border-[#e2e8f0] rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-4 hover:border-slate-300 transition-all shadow-xs group">
              <div className="flex items-start gap-3 flex-1 min-w-0">
                {popup.featuredImage ? (
                  <div className="h-14 w-14 rounded-xl overflow-hidden shrink-0 border border-slate-200 bg-slate-50">
                    <img src={popup.featuredImage} alt="" className="h-full w-full object-cover" />
                  </div>
                ) : (
                  <div className="h-14 w-14 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0">
                    <ImageIcon className="h-5 w-5 text-slate-400" />
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-heading font-bold text-[#0a1e3f] text-sm truncate">{popup.title}</p>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider ${STATUS_COLORS[popup.status] || STATUS_COLORS.draft}`}>
                      {popup.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">{popup.content}</p>
                  <div className="flex items-center gap-3 mt-2 text-[11px] text-slate-400">
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> Priority {popup.priority}</span>
                    <span>•</span>
                    <span className="capitalize">{popup.displayFrequency.replace(/_/g, ' ')}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 justify-end shrink-0">
                {(popup.status === 'draft' || popup.status === 'scheduled') && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(popup)}
                    className="h-8 rounded-xl text-xs text-slate-700 hover:text-[#0284c7] hover:bg-sky-50"
                  >
                    <Edit2 className="h-3.5 w-3.5 mr-1" />
                    <span>Edit</span>
                  </Button>
                )}
                {popup.status === 'draft' && (
                  <Button
                    size="sm"
                    onClick={() => {
                      if (!user) return;
                      updatePopupConfig(popup.id, { status: 'scheduled' }, user);
                      toast.success('Submitted for Administrator review');
                    }}
                    className="h-8 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold"
                  >
                    <Send className="h-3 w-3 mr-1" />
                    <span>Submit</span>
                  </Button>
                )}
                {popup.status === 'scheduled' && (
                  <span className="flex items-center gap-1 text-xs text-sky-700 font-semibold px-2.5 py-1 bg-sky-50 rounded-lg border border-sky-200">
                    <CheckCircle2 className="h-3.5 w-3.5 text-sky-600" /> Pending Review
                  </span>
                )}
                {popup.status === 'active' && (
                  <span className="flex items-center gap-1 text-xs text-emerald-700 font-semibold px-2.5 py-1 bg-emerald-50 rounded-lg border border-emerald-200">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> Live
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Create/Edit Modal ── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-xl max-h-[92vh] flex flex-col bg-white rounded-2xl shadow-2xl border border-[#e2e8f0] overflow-hidden animate-in fade-in-50 duration-150">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-[#e2e8f0] shrink-0 bg-slate-50/80">
              <div>
                <h2 className="font-heading font-bold text-base sm:text-lg text-[#0a1e3f]">{editingId ? 'Edit Notice Draft' : 'New Notice Draft'}</h2>
                <p className="text-xs text-slate-500">Specify notice content, display rules, and call to action.</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowPreview(!showPreview)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${showPreview ? 'text-sky-700 bg-sky-100 border border-sky-200' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'}`}
                >
                  <Eye className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">{showPreview ? 'Form' : 'Preview'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="overflow-y-auto flex-1 p-5 sm:p-6 space-y-4">
              {showPreview ? (
                <div className="space-y-3">
                  <p className="text-xs text-slate-500 text-center font-medium">Live simulation of notice modal</p>
                  <MiniPreview form={form} />
                </div>
              ) : (
                <>
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                      Notice Headline / Title <span className="text-rose-500">*</span>
                    </label>
                    <input
                      className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-500 transition-all"
                      placeholder="e.g. Scheduled System Upgrade Notice"
                      value={form.title} onChange={e => setField('title', e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                      Notice Body Text <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      rows={4}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-500 resize-none transition-all"
                      placeholder="Write clear, professional banking information for customers…"
                      value={form.content} onChange={e => setField('content', e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                      Featured Graphic Asset URL <span className="text-slate-400 font-normal">(Optional)</span>
                    </label>
                    <input
                      className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-500 transition-all"
                      placeholder="/images/... or https://..."
                      value={form.featuredImage || ''} onChange={e => setField('featuredImage', e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1.5">Action Button Label</label>
                      <input
                        className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-500 transition-all"
                        placeholder="e.g. Read Guidelines"
                        value={form.ctaText || ''} onChange={e => setField('ctaText', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1.5">Action URL Link</label>
                      <input
                        className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-500 transition-all"
                        placeholder="/branches or https://…"
                        value={form.ctaUrl || ''} onChange={e => setField('ctaUrl', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1.5">Scheduled Start</label>
                      <input
                        type="datetime-local"
                        className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-emerald-600"
                        value={form.startDate} onChange={e => setField('startDate', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1.5">Scheduled Expiration</label>
                      <input
                        type="datetime-local"
                        className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-emerald-600"
                        value={form.endDate || ''} onChange={e => setField('endDate', e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1.5">Display Frequency</label>
                    <select
                      className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-emerald-600"
                      value={form.displayFrequency} onChange={e => setField('displayFrequency', e.target.value as PopupFrequency)}
                    >
                      <option value="once_session">Once per browser session</option>
                      <option value="once_device">Once per device</option>
                      <option value="every_visit">Every website visit</option>
                      <option value="until_dismissed">Until explicitly dismissed</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-xs font-medium text-slate-700">Display dismiss / close button</span>
                    <button
                      type="button"
                      onClick={() => setField('showCloseButton', !form.showCloseButton)}
                      className={`relative inline-flex h-5 w-9 rounded-full transition-colors shrink-0 ${form.showCloseButton ? 'bg-emerald-600' : 'bg-slate-300'}`}
                    >
                      <span className={`inline-block h-4 w-4 rounded-full bg-white shadow-sm transition-transform mt-0.5 ${form.showCloseButton ? 'translate-x-4' : 'translate-x-0.5'}`} />
                    </button>
                  </div>

                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
                    <p className="text-xs text-amber-900 leading-relaxed">
                      <strong>Policy Notice:</strong> As a Staff Officer, notices remain in Draft state until approved by an Executive Administrator.
                    </p>
                  </div>
                </>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between px-5 sm:px-6 py-3.5 border-t border-[#e2e8f0] bg-slate-50/80 shrink-0 gap-2.5">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setIsModalOpen(false)}
                className="text-xs text-slate-600 hover:text-slate-900"
              >
                Cancel
              </Button>
              <div className="flex items-center gap-2 justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleSave(false)}
                  className="text-xs border-slate-300 text-slate-700 hover:bg-slate-100 flex-1 sm:flex-initial"
                >
                  Save Draft
                </Button>
                <Button
                  type="button"
                  onClick={() => handleSave(true)}
                  className="text-xs bg-emerald-600 hover:bg-emerald-700 text-white font-semibold gap-1.5 flex-1 sm:flex-initial shadow-sm"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>Submit for Review</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

