import React, { useState } from 'react';
import {
  Plus,
  Search,
  Tag,
  Calendar,
  Eye,
  Edit2,
  Trash2,
  CheckCircle2,
  Clock,
  Archive,
  ArrowUpRight,
  Filter,
  X
} from 'lucide-react';
import { useCMS } from '@/context/CMSContext';
import { useAuth } from '@/context/AuthContext';
import { Promotion, ContentStatus } from '@/types/cms';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function PromotionsManager() {
  const { promotions, addPromotion, updatePromotion, deletePromotion } = useCMS();
  const { user, can } = useAuth();
  
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPromo, setEditingPromo] = useState<Promotion | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    subtitle: '',
    badgeText: 'Seasonal Offer',
    description: '',
    imageUrl: '/images/hero-home.png',
    ctaText: 'Learn More',
    ctaLink: '/personal-banking',
    terms: ['Standard credit verification apply.'],
    status: 'published' as ContentStatus,
    priority: 1,
    startDate: new Date().toISOString().split('T')[0],
    endDate: '2026-12-31'
  });

  const filteredPromos = promotions.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.subtitle.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleOpenCreate = () => {
    setEditingPromo(null);
    setFormData({
      title: '',
      slug: '',
      subtitle: '',
      badgeText: 'Seasonal Offer',
      description: '',
      imageUrl: '/images/hero-home.png',
      ctaText: 'Learn More',
      ctaLink: '/personal-banking',
      terms: ['Standard credit bureau checks apply.'],
      status: 'published',
      priority: 1,
      startDate: new Date().toISOString().split('T')[0],
      endDate: '2026-12-31'
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (promo: Promotion) => {
    setEditingPromo(promo);
    setFormData({
      title: promo.title,
      slug: promo.slug,
      subtitle: promo.subtitle,
      badgeText: promo.badgeText,
      description: promo.description,
      imageUrl: promo.imageUrl,
      ctaText: promo.ctaText,
      ctaLink: promo.ctaLink,
      terms: promo.terms,
      status: promo.status,
      priority: promo.priority,
      startDate: promo.startDate.split('T')[0],
      endDate: promo.endDate ? promo.endDate.split('T')[0] : ''
    });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    if (!formData.title.trim()) {
      toast.error('Please enter a promotion title.');
      return;
    }

    const slug = formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    if (editingPromo) {
      updatePromotion(editingPromo.id, {
        ...formData,
        slug,
        startDate: new Date(formData.startDate).toISOString(),
        endDate: formData.endDate ? new Date(formData.endDate).toISOString() : undefined
      }, { id: user.id, name: user.name, role: user.role });
      toast.success('Promotion updated successfully.');
    } else {
      addPromotion({
        ...formData,
        slug,
        startDate: new Date(formData.startDate).toISOString(),
        endDate: formData.endDate ? new Date(formData.endDate).toISOString() : undefined,
        createdBy: user.name
      }, { id: user.id, name: user.name, role: user.role });
      toast.success('New promotion campaign created.');
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id: string, title: string) => {
    if (!user) return;
    if (!can('delete', 'promotions')) {
      toast.error('Staff role cannot delete promotions permanently.');
      return;
    }
    if (window.confirm(`Are you sure you want to remove promotion "${title}"?`)) {
      deletePromotion(id, { id: user.id, name: user.name, role: user.role });
      toast.success('Promotion deleted.');
    }
  };

  const getStatusBadge = (status: ContentStatus) => {
    switch (status) {
      case 'published':
        return <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold uppercase">Active</span>;
      case 'draft':
        return <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold uppercase">Draft</span>;
      case 'scheduled':
        return <span className="px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-700 text-[10px] font-bold uppercase">Scheduled</span>;
      case 'archived':
        return <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-700 text-[10px] font-bold uppercase">Archived</span>;
      default:
        return <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold uppercase">{status}</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-[#e2e8f0] shadow-xs">
        <div>
          <h1 className="text-xl font-heading font-bold text-[#0a1e3f] tracking-tight">
            Promotions & Special Offers
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage commercial loan campaigns, deposit rate bonuses, and active marketing banners.
          </p>
        </div>

        <Button
          onClick={handleOpenCreate}
          className="h-9 rounded-xl bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-semibold shadow-sm flex items-center gap-1.5"
        >
          <Plus className="h-4 w-4" />
          <span>Create Promotion</span>
        </Button>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-[#e2e8f0] shadow-xs">
        <div className="relative w-full sm:w-72">
          <Search className="h-4 w-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search promotions by title..."
            className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-[#e2e8f0] text-xs font-medium focus:border-[#0284c7] outline-none"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <Filter className="h-3.5 w-3.5 text-slate-400 shrink-0" />
          {['all', 'published', 'draft', 'scheduled', 'archived'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1 rounded-xl text-xs font-semibold capitalize whitespace-nowrap transition-all ${
                statusFilter === status
                  ? 'bg-[#0a1e3f] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {status === 'published' ? 'Active' : status}
            </button>
          ))}
        </div>
      </div>

      {/* Promotions Table / Grid */}
      <div className="bg-white rounded-2xl border border-[#e2e8f0] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-[#e2e8f0] text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">Campaign Title</th>
                <th className="py-3 px-4">Badge</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Timeline</th>
                <th className="py-3 px-4">Priority</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e2e8f0]">
              {filteredPromos.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    No promotions found matching your search.
                  </td>
                </tr>
              ) : (
                filteredPromos.map((promo) => (
                  <tr key={promo.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-[#0a1e3f]">
                      <div className="truncate max-w-xs">{promo.title}</div>
                      <div className="text-[11px] text-slate-400 font-normal truncate max-w-xs">{promo.subtitle}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded-md bg-sky-50 text-[#0284c7] font-semibold text-[10px] border border-sky-100">
                        {promo.badgeText}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      {getStatusBadge(promo.status)}
                    </td>
                    <td className="py-3.5 px-4 text-slate-500 text-[11px]">
                      <div>{new Date(promo.startDate).toLocaleDateString()}</div>
                      {promo.endDate && <div className="text-slate-400">to {new Date(promo.endDate).toLocaleDateString()}</div>}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-[#0a1e3f]">
                      #{promo.priority}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleOpenEdit(promo)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-[#0284c7] hover:bg-sky-50 transition-all"
                          title="Edit Campaign"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        {can('delete', 'promotions') && (
                          <button
                            onClick={() => handleDelete(promo.id, promo.title)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all"
                            title="Delete Campaign"
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
          <div className="bg-white rounded-2xl shadow-2xl border border-[#e2e8f0] w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-150 my-8">
            <div className="px-6 py-4 border-b border-[#e2e8f0] flex items-center justify-between bg-slate-50">
              <h3 className="font-heading font-bold text-sm text-[#0a1e3f]">
                {editingPromo ? 'Edit Promotion Campaign' : 'Create New Promotion Campaign'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">
                    Promotion Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. SME Growth Booster Loan 2026"
                    className="w-full p-2.5 rounded-xl border border-[#e2e8f0] text-xs font-medium focus:border-[#0284c7] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">
                    Badge Label
                  </label>
                  <input
                    type="text"
                    value={formData.badgeText}
                    onChange={(e) => setFormData({ ...formData, badgeText: e.target.value })}
                    placeholder="e.g. Seasonal Offer"
                    className="w-full p-2.5 rounded-xl border border-[#e2e8f0] text-xs font-medium focus:border-[#0284c7] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">
                    Display Priority (1 = Highest)
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: parseInt(e.target.value) || 1 })}
                    className="w-full p-2.5 rounded-xl border border-[#e2e8f0] text-xs font-medium focus:border-[#0284c7] outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">
                    Subtitle / Highlight Hook
                  </label>
                  <input
                    type="text"
                    value={formData.subtitle}
                    onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                    placeholder="e.g. Access up to ₦10M with zero processing fee"
                    className="w-full p-2.5 rounded-xl border border-[#e2e8f0] text-xs font-medium focus:border-[#0284c7] outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">
                    Full Promotional Description
                  </label>
                  <textarea
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-[#e2e8f0] text-xs font-medium focus:border-[#0284c7] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">
                    CTA Button Text
                  </label>
                  <input
                    type="text"
                    value={formData.ctaText}
                    onChange={(e) => setFormData({ ...formData, ctaText: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-[#e2e8f0] text-xs font-medium focus:border-[#0284c7] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">
                    CTA Link Destination
                  </label>
                  <input
                    type="text"
                    value={formData.ctaLink}
                    onChange={(e) => setFormData({ ...formData, ctaLink: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-[#e2e8f0] text-xs font-medium focus:border-[#0284c7] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-[#e2e8f0] text-xs font-medium focus:border-[#0284c7] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">
                    Expiration Date
                  </label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-[#e2e8f0] text-xs font-medium focus:border-[#0284c7] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as ContentStatus })}
                    className="w-full p-2.5 rounded-xl border border-[#e2e8f0] text-xs font-medium focus:border-[#0284c7] outline-none bg-white"
                  >
                    <option value="published">Active / Published</option>
                    <option value="draft">Draft</option>
                    <option value="scheduled">Scheduled</option>
                    <option value="archived">Archived</option>
                  </select>
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
                  {editingPromo ? 'Save Changes' : 'Create Campaign'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
