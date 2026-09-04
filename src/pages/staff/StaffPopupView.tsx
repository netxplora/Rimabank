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
  draft:     'bg-slate-500/15 text-slate-400 border border-slate-500/30',
  scheduled: 'bg-sky-500/15   text-sky-400   border border-sky-500/30',
  active:    'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30',
  paused:    'bg-amber-500/15  text-amber-400  border border-amber-500/30',
  expired:   'bg-rose-500/15   text-rose-400   border border-rose-500/30',
  archived:  'bg-zinc-600/15   text-zinc-400   border border-zinc-600/30',
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
  <div className="relative w-full h-64 bg-[#071630] rounded-xl border border-white/10 flex items-center justify-center overflow-hidden">
    {form.overlayEnabled && <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />}
    <div className="relative z-10 bg-[#0f2a50] border border-white/10 rounded-2xl shadow-2xl w-64 flex flex-col overflow-hidden">
      {form.featuredImage && (
        <div className="h-24 overflow-hidden">
          <img src={form.featuredImage} alt="" className="w-full h-full object-cover" />
        </div>
      )}
      <div className="p-4 space-y-2">
        <p className="font-bold text-white text-xs leading-snug line-clamp-2">{form.title || 'Popup Title'}</p>
        <p className="text-slate-300 text-[10px] leading-relaxed line-clamp-3">{form.content || 'Your message here…'}</p>
        {form.ctaText && (
          <div className="pt-1">
            <div className="bg-[#0284c7] text-white text-[10px] font-semibold py-1.5 px-3 rounded-lg text-center">{form.ctaText}</div>
          </div>
        )}
      </div>
      {form.showCloseButton && (
        <div className="absolute top-2 right-2 h-5 w-5 rounded-full bg-white/10 flex items-center justify-center">
          <X className="h-3 w-3 text-white/70" />
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
      toast.error('Only draft popups can be edited.');
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

  const handleSave = (submitForReview = false) => {
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
      updatePopupConfig(editingId, { ...payload }, user);
      toast.success(submitForReview ? 'Popup submitted for Admin review' : 'Draft saved');
    } else {
      addPopupConfig(payload, user);
      toast.success(submitForReview ? 'Popup submitted for Admin review' : 'Draft saved');
    }
    setIsModalOpen(false);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-white">Popup Drafts</h1>
          <p className="text-sm text-slate-400 mt-0.5">Create popup configurations and submit them to Admin for approval.</p>
        </div>
        <Button onClick={handleCreate} className="bg-emerald-600 hover:bg-emerald-500 text-white gap-2 shrink-0">
          <Plus className="h-4 w-4" /> New Draft
        </Button>
      </div>

      {/* Info banner */}
      <div className="flex items-start gap-3 bg-sky-500/10 border border-sky-500/20 rounded-xl p-4">
        <AlertCircle className="h-4 w-4 text-sky-400 shrink-0 mt-0.5" />
        <p className="text-sm text-sky-300">
          Popup drafts require Admin approval before they appear on the public website. Use <strong>Submit for Review</strong> to send your popup to an Admin.
        </p>
      </div>

      {/* List */}
      {myPopups.length === 0 ? (
        <div className="text-center py-16 text-slate-500">
          <Layers className="h-10 w-10 mx-auto mb-3 opacity-40" />
          <p className="text-sm">You have no popup drafts yet. Create one above.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {myPopups.map(popup => (
            <div key={popup.id} className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-start gap-4 hover:bg-white/[0.07] transition-colors group">
              {popup.featuredImage ? (
                <div className="h-14 w-14 rounded-lg overflow-hidden shrink-0">
                  <img src={popup.featuredImage} alt="" className="h-full w-full object-cover" />
                </div>
              ) : (
                <div className="h-14 w-14 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <ImageIcon className="h-5 w-5 text-slate-600" />
                </div>
              )}

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="font-semibold text-white text-sm truncate">{popup.title}</p>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[popup.status] || STATUS_COLORS.draft}`}>
                    {popup.status}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5 line-clamp-2">{popup.content}</p>
                <div className="flex items-center gap-3 mt-2 text-xs text-slate-500">
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> Priority {popup.priority}</span>
                  <span className="capitalize">{popup.displayFrequency.replace(/_/g, ' ')}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                {(popup.status === 'draft' || popup.status === 'scheduled') && (
                  <button
                    onClick={() => handleEdit(popup)}
                    className="p-1.5 rounded-lg text-sky-400 hover:bg-sky-500/10 transition-colors"
                    title="Edit"
                  >
                    <Edit2 className="h-3.5 w-3.5" />
                  </button>
                )}
                {popup.status === 'draft' && (
                  <button
                    onClick={() => {
                      if (!user) return;
                      updatePopupConfig(popup.id, { status: 'scheduled' }, user);
                      toast.success('Submitted for Admin review');
                    }}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600/30 text-xs font-medium transition-colors"
                    title="Submit for review"
                  >
                    <Send className="h-3 w-3" /> Submit
                  </button>
                )}
                {popup.status === 'scheduled' && (
                  <span className="flex items-center gap-1 text-xs text-sky-400 font-medium">
                    <CheckCircle2 className="h-3.5 w-3.5" /> Pending review
                  </span>
                )}
                {popup.status === 'active' && (
                  <span className="flex items-center gap-1 text-xs text-emerald-400 font-medium">
                    <CheckCircle2 className="h-3.5 w-3.5" /> Live
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Create/Edit Modal ── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-6 overflow-y-auto">
          <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm transition-opacity" onClick={() => setIsModalOpen(false)} />
          <div className="relative z-10 w-full max-w-lg bg-[#0f2a50] border border-white/10 rounded-t-2xl sm:rounded-2xl shadow-2xl flex flex-col max-h-[92vh] sm:max-h-[88vh] overflow-hidden animate-in fade-in-50 duration-200">
            <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 border-b border-white/10 shrink-0 bg-[#0c2445]">
              <div className="flex items-center gap-2">
                <h2 className="font-heading font-bold text-white text-base sm:text-lg">{editingId ? 'Edit Draft Popup' : 'New Draft Popup'}</h2>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setShowPreview(!showPreview)}
                  className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${showPreview ? 'text-sky-400 bg-sky-500/15 border border-sky-500/30' : 'text-slate-400 hover:text-white hover:bg-white/10'}`}
                  title="Toggle Preview"
                >
                  <Eye className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">{showPreview ? 'Edit Form' : 'Preview'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="overflow-y-auto flex-1 px-4 sm:px-6 py-4 sm:py-5 space-y-4 text-xs sm:text-sm">
              {showPreview ? (
                <div className="space-y-3">
                  <p className="text-[11px] text-slate-400 text-center">Live preview of your popup appearance</p>
                  <MiniPreview form={form} />
                </div>
              ) : (
                <>
                  <div>
                    <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-1.5">
                      Title <span className="text-rose-400">*</span>
                    </label>
                    <input
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all"
                      placeholder="Popup title"
                      value={form.title} onChange={e => setField('title', e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-1.5">
                      Message <span className="text-rose-400">*</span>
                    </label>
                    <textarea
                      rows={4}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 resize-none transition-all"
                      placeholder="Keep your message clear and concise…"
                      value={form.content} onChange={e => setField('content', e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-1.5">
                      Featured Image URL <span className="normal-case font-normal text-slate-500">(Optional)</span>
                    </label>
                    <input
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all"
                      placeholder="https://... or image asset URL"
                      value={form.featuredImage || ''} onChange={e => setField('featuredImage', e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-1.5">CTA Label</label>
                      <input
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all"
                        placeholder="e.g. Learn More"
                        value={form.ctaText || ''} onChange={e => setField('ctaText', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-1.5">CTA URL</label>
                      <input
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all"
                        placeholder="/page or https://…"
                        value={form.ctaUrl || ''} onChange={e => setField('ctaUrl', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-1.5">Start Date</label>
                      <input
                        type="datetime-local"
                        className="w-full bg-[#0a1e3f] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                        value={form.startDate} onChange={e => setField('startDate', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-1.5">End Date</label>
                      <input
                        type="datetime-local"
                        className="w-full bg-[#0a1e3f] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                        value={form.endDate || ''} onChange={e => setField('endDate', e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-1.5">Display Frequency</label>
                    <select
                      className="w-full bg-[#0a1e3f] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-300 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      value={form.displayFrequency} onChange={e => setField('displayFrequency', e.target.value as PopupFrequency)}
                    >
                      <option value="once_session">Once per session</option>
                      <option value="once_device">Once per device</option>
                      <option value="every_visit">Every visit</option>
                      <option value="until_dismissed">Until dismissed</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                    <span className="text-xs sm:text-sm text-slate-300 font-medium">Show close button</span>
                    <button
                      type="button"
                      onClick={() => setField('showCloseButton', !form.showCloseButton)}
                      className={`relative inline-flex h-5 w-9 rounded-full transition-colors shrink-0 ${form.showCloseButton ? 'bg-emerald-500' : 'bg-slate-700'}`}
                    >
                      <span className={`inline-block h-4 w-4 rounded-full bg-white shadow transition-transform mt-0.5 ${form.showCloseButton ? 'translate-x-4' : 'translate-x-0.5'}`} />
                    </button>
                  </div>

                  <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-3">
                    <p className="text-[11px] sm:text-xs text-amber-300 leading-relaxed">
                      <strong>Note:</strong> As a Staff member, your popup will remain in draft status until an Admin approves it. Use <em>Submit for Review</em> when ready.
                    </p>
                  </div>
                </>
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-t border-white/10 bg-[#0c2445] shrink-0 gap-2.5 sm:gap-3">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setIsModalOpen(false)}
                className="text-xs sm:text-sm text-slate-400 hover:text-white px-3 py-2 h-auto"
              >
                Cancel
              </Button>
              <div className="flex items-center gap-2 justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleSave(false)}
                  className="text-xs sm:text-sm border-white/20 text-slate-300 hover:text-white bg-white/5 px-3.5 py-2 h-auto flex-1 sm:flex-initial justify-center"
                >
                  Save Draft
                </Button>
                <Button
                  type="button"
                  onClick={() => handleSave(true)}
                  className="text-xs sm:text-sm bg-emerald-600 hover:bg-emerald-500 text-white font-medium gap-1.5 px-4 py-2 h-auto flex-1 sm:flex-initial justify-center shadow-md shadow-emerald-600/20"
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
