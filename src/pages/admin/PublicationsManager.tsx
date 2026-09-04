import React, { useState } from 'react';
import {
  Plus,
  Search,
  BookOpen,
  Calendar,
  Eye,
  Edit2,
  Trash2,
  CheckCircle2,
  Clock,
  Filter,
  X,
  FileText,
  User,
  Share2,
  Image as ImageIcon,
  Sparkles
} from 'lucide-react';
import { useCMS } from '@/context/CMSContext';
import { useAuth } from '@/context/AuthContext';
import { Publication, ContentStatus, PopupDisplayMode } from '@/types/cms';
import { Button } from '@/components/ui/button';
import { RichEditor } from '@/components/admin/RichEditor';
import { MediaPickerModal } from '@/components/admin/media/MediaPickerModal';
import { toast } from 'sonner';

export default function PublicationsManager() {
  const {
    publications,
    addPublication,
    updatePublication,
    deletePublication,
    popupConfigs,
    addPopupConfig,
    updatePopupConfig
  } = useCMS();
  const { user, can } = useAuth();

  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPub, setEditingPub] = useState<Publication | null>(null);
  const [mediaPickerOpen, setMediaPickerOpen] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: 'Bank Notice' as Publication['category'],
    excerpt: '',
    content: '<p>Write your detailed article body here...</p>',
    featuredImage: '/images/hero-home.png',
    author: user?.name || 'Corporate Communications',
    readTime: '3 min read',
    status: 'published' as ContentStatus,
    displayMode: 'standard' as PopupDisplayMode,
    isPopupEnabled: false,
    publishDate: new Date().toISOString().split('T')[0],
    seoTitle: '',
    seoDescription: '',
    seoKeywords: ['Rima MFB', 'Banking News']
  });

  const filteredPubs = publications.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.excerpt.toLowerCase().includes(search.toLowerCase());
    const matchesCat = categoryFilter === 'all' || p.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
    return matchesSearch && matchesCat && matchesStatus;
  });

  const handleOpenCreate = () => {
    setEditingPub(null);
    setFormData({
      title: '',
      slug: '',
      category: 'Bank Notice',
      excerpt: '',
      content: '<p>Write your detailed article body here...</p>',
      featuredImage: '/images/hero-home.png',
      author: user?.name || 'Corporate Communications',
      readTime: '3 min read',
      status: user?.role === 'admin' ? 'published' : 'review',
      displayMode: 'standard',
      isPopupEnabled: false,
      publishDate: new Date().toISOString().split('T')[0],
      seoTitle: '',
      seoDescription: '',
      seoKeywords: ['Rima MFB', 'Banking News']
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (pub: Publication) => {
    setEditingPub(pub);
    const existingPopup = popupConfigs.find(p => p.sourceId === pub.id || (p.sourceType === 'publication' && p.title === pub.title));
    setFormData({
      title: pub.title,
      slug: pub.slug,
      category: pub.category,
      excerpt: pub.excerpt,
      content: pub.content,
      featuredImage: pub.featuredImage,
      author: pub.author,
      readTime: pub.readTime,
      status: pub.status,
      displayMode: pub.displayMode || (existingPopup ? existingPopup.displayMode : 'standard'),
      isPopupEnabled: pub.isPopupEnabled ?? !!existingPopup,
      publishDate: pub.publishDate.split('T')[0],
      seoTitle: pub.seoTitle || '',
      seoDescription: pub.seoDescription || '',
      seoKeywords: pub.seoKeywords || ['Rima MFB']
    });
    setIsModalOpen(true);
  };

  // Quick Popup Toggle / Creation
  const handleQuickPopup = (pub: Publication) => {
    if (!user) return;
    const existingPopup = popupConfigs.find(p => p.sourceId === pub.id || (p.sourceType === 'publication' && p.title === pub.title));
    if (existingPopup) {
      const newStatus = existingPopup.status === 'active' ? 'paused' : 'active';
      updatePopupConfig(existingPopup.id, { status: newStatus }, user);
      toast.success(newStatus === 'active' ? 'Popup activated for this publication' : 'Popup paused for this publication');
    } else {
      addPopupConfig({
        sourceType: 'publication',
        sourceId: pub.id,
        displayMode: 'both',
        title: pub.title,
        content: pub.excerpt || pub.title,
        featuredImage: pub.featuredImage,
        ctaText: 'Read Full Story',
        ctaUrl: `/media/${pub.slug}`,
        showCloseButton: true,
        startDate: pub.publishDate,
        triggerType: 'delay',
        triggerDelaySeconds: 4,
        displayFrequency: 'once_session',
        priority: 7,
        showOnDesktop: true,
        showOnMobile: true,
        overlayEnabled: true,
        status: 'active',
        createdBy: user.name,
        createdById: user.id
      }, user);
      toast.success(`Created Site Popup for publication "${pub.title}"`);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    if (!formData.title.trim()) {
      toast.error('Please provide a publication title.');
      return;
    }

    const slug = formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const pubId = editingPub ? editingPub.id : `pub-${Date.now()}`;

    // Staff workflow restriction: staff cannot directly publish without approval
    let targetStatus = formData.status;
    if (user.role === 'staff' && targetStatus === 'published') {
      targetStatus = 'review';
      toast.info('Staff submission submitted for Admin review & approval.');
    }

    if (editingPub) {
      updatePublication(editingPub.id, {
        ...formData,
        slug,
        status: targetStatus,
        publishDate: new Date(formData.publishDate).toISOString()
      }, { id: user.id, name: user.name, role: user.role });

      // Sync Popup Config if enabled
      if (formData.isPopupEnabled || formData.displayMode === 'popup' || formData.displayMode === 'both') {
        const existingPopup = popupConfigs.find(p => p.sourceId === editingPub.id);
        if (existingPopup) {
          updatePopupConfig(existingPopup.id, {
            title: formData.title,
            content: formData.excerpt || formData.title,
            featuredImage: formData.featuredImage,
            ctaText: 'Read Full Story',
            ctaUrl: `/media/${slug}`,
            displayMode: formData.displayMode,
            startDate: new Date(formData.publishDate).toISOString(),
            status: targetStatus === 'published' ? 'active' : 'draft'
          }, user);
        } else {
          addPopupConfig({
            sourceType: 'publication',
            sourceId: editingPub.id,
            displayMode: formData.displayMode,
            title: formData.title,
            content: formData.excerpt || formData.title,
            featuredImage: formData.featuredImage,
            ctaText: 'Read Full Story',
            ctaUrl: `/media/${slug}`,
            showCloseButton: true,
            startDate: new Date(formData.publishDate).toISOString(),
            triggerType: 'delay',
            triggerDelaySeconds: 4,
            displayFrequency: 'once_session',
            priority: 7,
            showOnDesktop: true,
            showOnMobile: true,
            overlayEnabled: true,
            status: targetStatus === 'published' ? 'active' : 'draft',
            createdBy: user.name,
            createdById: user.id
          }, user);
        }
      }

      toast.success('Publication updated.');
    } else {
      addPublication({
        ...formData,
        slug,
        status: targetStatus,
        publishDate: new Date(formData.publishDate).toISOString(),
        createdBy: user.name
      }, { id: user.id, name: user.name, role: user.role });

      // If popup requested for new publication
      if (formData.isPopupEnabled || formData.displayMode === 'popup' || formData.displayMode === 'both') {
        addPopupConfig({
          sourceType: 'publication',
          sourceId: pubId,
          displayMode: formData.displayMode,
          title: formData.title,
          content: formData.excerpt || formData.title,
          featuredImage: formData.featuredImage,
          ctaText: 'Read Full Story',
          ctaUrl: `/media/${slug}`,
          showCloseButton: true,
          startDate: new Date(formData.publishDate).toISOString(),
          triggerType: 'delay',
          triggerDelaySeconds: 4,
          displayFrequency: 'once_session',
          priority: 7,
          showOnDesktop: true,
          showOnMobile: true,
          overlayEnabled: true,
          status: targetStatus === 'published' ? 'active' : 'draft',
          createdBy: user.name,
          createdById: user.id
        }, user);
      }

      toast.success('New publication created.');
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id: string, title: string) => {
    if (!user) return;
    if (!can('delete', 'publications')) {
      toast.error('Staff role cannot permanently delete publications.');
      return;
    }
    if (window.confirm(`Are you sure you want to delete publication "${title}"?`)) {
      deletePublication(id, { id: user.id, name: user.name, role: user.role });
      toast.success('Publication deleted.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-[#e2e8f0] shadow-xs">
        <div>
          <h1 className="text-xl font-heading font-bold text-[#0a1e3f] tracking-tight">
            Publications & News Management
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Author and publish press releases, financial statements, and institutional bank updates.
          </p>
        </div>

        <Button
          onClick={handleOpenCreate}
          className="h-9 rounded-xl bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-semibold shadow-sm flex items-center gap-1.5"
        >
          <Plus className="h-4 w-4" />
          <span>Write Publication</span>
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
            placeholder="Search publications..."
            className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-[#e2e8f0] text-xs font-medium focus:border-[#0284c7] outline-none"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-1.5 rounded-xl text-xs font-medium border border-[#e2e8f0] bg-white outline-none"
          >
            <option value="all">All Categories</option>
            <option value="Bank Notice">Bank Notice</option>
            <option value="Financial Report">Financial Report</option>
            <option value="Press Release">Press Release</option>
            <option value="Articles">Articles</option>
            <option value="Statement">Statement</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-1.5 rounded-xl text-xs font-medium border border-[#e2e8f0] bg-white outline-none"
          >
            <option value="all">All Statuses</option>
            <option value="published">Published</option>
            <option value="review">In Review</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>

      {/* Publications Table */}
      <div className="bg-white rounded-2xl border border-[#e2e8f0] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-[#e2e8f0] text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">Publication Title</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Author</th>
                <th className="py-3 px-4">Site Popup</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Views</th>
                <th className="py-3 px-4">Published Date</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e2e8f0]">
              {filteredPubs.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400">
                    No publications found.
                  </td>
                </tr>
              ) : (
                filteredPubs.map((pub) => {
                  const linkedPopup = popupConfigs.find(p => p.sourceId === pub.id || (p.sourceType === 'publication' && p.title === pub.title));
                  return (
                    <tr key={pub.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4 font-semibold text-[#0a1e3f]">
                        <div className="truncate max-w-xs">{pub.title}</div>
                        <div className="text-[11px] text-slate-400 font-normal truncate max-w-xs">{pub.excerpt}</div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium text-[10px]">
                          {pub.category}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-600">
                        {pub.author}
                      </td>
                      <td className="py-3.5 px-4">
                        {linkedPopup ? (
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            linkedPopup.status === 'active'
                              ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                              : 'bg-amber-100 text-amber-700 border border-amber-200'
                          }`}>
                            <Sparkles className="w-2.5 h-2.5" />
                            {linkedPopup.status === 'active' ? 'Popup Active' : 'Popup Paused'}
                          </span>
                        ) : (
                          <span className="text-[11px] text-slate-400 italic">None</span>
                        )}
                      </td>
                      <td className="py-3.5 px-4">
                        {pub.status === 'published' ? (
                          <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold uppercase">Published</span>
                        ) : pub.status === 'review' ? (
                          <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-700 text-[10px] font-bold uppercase">In Review</span>
                        ) : (
                          <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold uppercase">{pub.status}</span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 font-bold text-[#0a1e3f]">
                        {pub.viewsCount || 0}
                      </td>
                      <td className="py-3.5 px-4 text-slate-500 text-[11px]">
                        {new Date(pub.publishDate).toLocaleDateString()}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleQuickPopup(pub)}
                            className={`p-1.5 rounded-lg transition-all ${
                              linkedPopup?.status === 'active'
                                ? 'text-emerald-600 hover:bg-emerald-50'
                                : 'text-slate-400 hover:text-[#0284c7] hover:bg-sky-50'
                            }`}
                            title={linkedPopup?.status === 'active' ? 'Pause Site Popup' : 'Activate Site Popup'}
                          >
                            <Sparkles className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleOpenEdit(pub)}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-[#0284c7] hover:bg-sky-50 transition-all"
                            title="Edit Article"
                          >
                            <Edit2 className="h-4 w-4" />
                          </button>
                          {can('delete', 'publications') && (
                            <button
                              onClick={() => handleDelete(pub.id, pub.title)}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all"
                              title="Delete Article"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          )}
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

      {/* Editor Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl border border-[#e2e8f0] w-full max-w-3xl overflow-hidden animate-in zoom-in-95 duration-150 my-8">
            <div className="px-6 py-4 border-b border-[#e2e8f0] flex items-center justify-between bg-slate-50">
              <h3 className="font-heading font-bold text-sm text-[#0a1e3f]">
                {editingPub ? 'Edit Publication' : 'Author New Publication'}
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
                    Publication Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Rima Microfinance Bank Expands Agency Network"
                    className="w-full p-2.5 rounded-xl border border-[#e2e8f0] text-xs font-medium focus:border-[#0284c7] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full p-2.5 rounded-xl border border-[#e2e8f0] text-xs font-medium focus:border-[#0284c7] outline-none bg-white"
                  >
                    <option value="Bank Notice">Bank Notice</option>
                    <option value="Financial Report">Financial Report</option>
                    <option value="Press Release">Press Release</option>
                    <option value="Articles">Articles</option>
                    <option value="Statement">Statement</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">
                    Author / Department
                  </label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-[#e2e8f0] text-xs font-medium focus:border-[#0284c7] outline-none"
                  />
                </div>

                {/* Site Popup Display Option */}
                <div className="sm:col-span-2 p-3 bg-sky-50/60 border border-sky-100 rounded-xl space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#0284c7]" />
                      <span className="text-xs font-semibold text-[#0a1e3f]">Site Popup Display Option</span>
                    </div>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.isPopupEnabled}
                        onChange={(e) => {
                          const checked = e.target.checked;
                          setFormData({
                            ...formData,
                            isPopupEnabled: checked,
                            displayMode: checked ? (formData.displayMode === 'standard' ? 'both' : formData.displayMode) : 'standard'
                          });
                        }}
                        className="w-4 h-4 rounded text-[#0284c7] focus:ring-[#0284c7]"
                      />
                      <span className="text-xs font-medium text-slate-700">Enable Popup</span>
                    </label>
                  </div>

                  {formData.isPopupEnabled && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-sky-100">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">Display Mode</label>
                        <select
                          value={formData.displayMode}
                          onChange={(e) => setFormData({ ...formData, displayMode: e.target.value as PopupDisplayMode })}
                          className="w-full p-2 rounded-lg bg-white border border-[#e2e8f0] text-xs font-medium outline-none focus:border-[#0284c7]"
                        >
                          <option value="both">Both Press Room & Site Popup</option>
                          <option value="popup">Site Popup Only</option>
                          <option value="standard">Press Room Only</option>
                        </select>
                      </div>
                      <div className="text-[11px] text-slate-500 flex items-center">
                        Feature major bank news or releases with instant interactive popup cards for site visitors.
                      </div>
                    </div>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">
                    Brief Excerpt / Summary (Appears in previews)
                  </label>
                  <textarea
                    rows={2}
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-[#e2e8f0] text-xs font-medium focus:border-[#0284c7] outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">
                    Full Content & Narrative (Rich HTML Format)
                  </label>
                  <RichEditor
                    value={formData.content}
                    onChange={(content) => setFormData({ ...formData, content })}
                    minHeight="220px"
                  />
                </div>

                {/* Featured Image Picker */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">
                    Featured Article Cover Image
                  </label>
                  <div className="flex items-center gap-4 p-3 bg-slate-50 border border-[#e2e8f0] rounded-xl">
                    <div className="w-20 h-14 rounded-lg bg-slate-200 overflow-hidden shrink-0 border border-slate-300 flex items-center justify-center">
                      {formData.featuredImage ? (
                        <img
                          src={formData.featuredImage}
                          alt="Cover Preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <ImageIcon className="w-6 h-6 text-slate-400" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <input
                        type="text"
                        value={formData.featuredImage}
                        onChange={(e) => setFormData({ ...formData, featuredImage: e.target.value })}
                        placeholder="Image URL or choose from library"
                        className="w-full p-2 bg-white border border-[#e2e8f0] rounded-lg text-xs font-mono text-slate-700 outline-none focus:border-[#0284c7]"
                      />
                      <p className="text-[11px] text-slate-400 mt-1">Displayed at top of article and in press room cards.</p>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setMediaPickerOpen(true)}
                      className="shrink-0 border-sky-200 text-[#0284c7] hover:bg-sky-50 text-xs"
                    >
                      <ImageIcon className="w-3.5 h-3.5 mr-1" />
                      Media Library
                    </Button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">
                    Publish Date
                  </label>
                  <input
                    type="date"
                    value={formData.publishDate}
                    onChange={(e) => setFormData({ ...formData, publishDate: e.target.value })}
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
                    <option value="published">Published</option>
                    <option value="review">In Review (Staff)</option>
                    <option value="draft">Draft</option>
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
                  {editingPub ? 'Save Changes' : 'Save Publication'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Media Picker Modal */}
      <MediaPickerModal
        isOpen={mediaPickerOpen}
        onClose={() => setMediaPickerOpen(false)}
        currentValue={formData.featuredImage}
        onSelect={(url) => {
          setFormData(prev => ({ ...prev, featuredImage: url }));
          setMediaPickerOpen(false);
          toast.success('Cover image selected from library!');
        }}
        title="Select Featured Article Image"
      />
    </div>
  );
}
