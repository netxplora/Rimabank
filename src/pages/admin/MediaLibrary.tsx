import React, { useState } from 'react';
import {
  Upload,
  Search,
  Image as ImageIcon,
  FileText,
  Copy,
  Check,
  Trash2,
  Filter,
  Eye,
  X,
  Sparkles,
  Info
} from 'lucide-react';
import { useCMS } from '@/context/CMSContext';
import { useAuth } from '@/context/AuthContext';
import { MediaAsset } from '@/types/cms';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function MediaLibrary() {
  const { mediaAssets, addMediaAsset, updateMediaAsset, deleteMediaAsset } = useCMS();
  const { user, can } = useAuth();

  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [selectedAsset, setSelectedAsset] = useState<MediaAsset | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Upload Form
  const [uploadData, setUploadData] = useState({
    title: '',
    fileName: '',
    url: '/images/hero-home.png',
    category: 'general' as MediaAsset['category'],
    altText: '',
    fileSize: 1048576,
    fileType: 'image/png'
  });

  const filteredAssets = mediaAssets.filter(asset => {
    const matchesSearch = asset.title.toLowerCase().includes(search.toLowerCase()) || asset.fileName.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || asset.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleCopyUrl = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    toast.success('Asset URL copied to clipboard.');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    if (!uploadData.title.trim() || !uploadData.fileName.trim()) {
      toast.error('Please enter asset title and file name.');
      return;
    }

    addMediaAsset({
      ...uploadData,
      uploadedBy: user.name
    }, { id: user.id, name: user.name, role: user.role });

    toast.success('Media asset added to library.');
    setIsUploadModalOpen(false);
  };

  const handleDelete = (id: string, title: string) => {
    if (!user) return;
    if (!can('delete', 'media')) {
      toast.error('Staff cannot permanently delete media files.');
      return;
    }
    if (window.confirm(`Delete media asset "${title}"?`)) {
      deleteMediaAsset(id, { id: user.id, name: user.name, role: user.role });
      if (selectedAsset?.id === id) setSelectedAsset(null);
      toast.success('Asset removed.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-[#e2e8f0] shadow-xs">
        <div>
          <h1 className="text-xl font-heading font-bold text-[#0a1e3f] tracking-tight">
            Centralized Media Library
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Store, preview, optimize, and reuse image assets across public website pages and publications.
          </p>
        </div>

        <Button
          onClick={() => {
            setUploadData({
              title: '',
              fileName: 'banner-asset.png',
              url: '/images/hero-home.png',
              category: 'banners',
              altText: 'Rima Bank promotional asset',
              fileSize: 850000,
              fileType: 'image/png'
            });
            setIsUploadModalOpen(true);
          }}
          className="h-9 rounded-xl bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-semibold shadow-sm flex items-center gap-1.5"
        >
          <Upload className="h-4 w-4" />
          <span>Upload Asset</span>
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
            placeholder="Search media by title..."
            className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-[#e2e8f0] text-xs font-medium focus:border-[#0284c7] outline-none"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <Filter className="h-3.5 w-3.5 text-slate-400 shrink-0" />
          {['all', 'banners', 'products', 'team', 'documents', 'general'].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1 rounded-xl text-xs font-semibold capitalize whitespace-nowrap transition-all ${
                categoryFilter === cat
                  ? 'bg-[#0a1e3f] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Media Assets */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredAssets.length === 0 ? (
          <div className="col-span-full py-12 bg-white rounded-2xl border border-[#e2e8f0] text-center text-slate-400 text-xs">
            No media assets found in library.
          </div>
        ) : (
          filteredAssets.map((asset) => (
            <div
              key={asset.id}
              className="bg-white rounded-2xl border border-[#e2e8f0] overflow-hidden shadow-xs hover:border-[#0284c7]/40 transition-all flex flex-col justify-between group"
            >
              {/* Asset Preview */}
              <div className="h-36 bg-slate-100 overflow-hidden relative flex items-center justify-center">
                {asset.url.endsWith('.pdf') ? (
                  <FileText className="h-10 w-10 text-slate-400" />
                ) : (
                  <img
                    src={asset.url}
                    alt={asset.altText}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                )}
                <span className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-slate-900/70 text-white text-[9px] font-mono">
                  {Math.round(asset.fileSize / 1024)} KB
                </span>
              </div>

              {/* Asset Info */}
              <div className="p-3.5 space-y-1">
                <h4 className="text-xs font-bold text-[#0a1e3f] truncate">
                  {asset.title}
                </h4>
                <p className="text-[11px] text-slate-400 truncate font-mono">
                  {asset.fileName}
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[10px] text-slate-400">
                  <span className="capitalize">{asset.category}</span>
                  <span>{new Date(asset.uploadedAt).toLocaleDateString()}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="px-3.5 pb-3 pt-1 flex items-center justify-between gap-2 border-t border-slate-50 bg-slate-50/50">
                <button
                  onClick={() => handleCopyUrl(asset.url, asset.id)}
                  className="flex items-center gap-1 text-[11px] font-semibold text-[#0284c7] hover:underline"
                >
                  {copiedId === asset.id ? (
                    <>
                      <Check className="h-3 w-3 text-emerald-600" />
                      <span className="text-emerald-600">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" />
                      <span>Copy URL</span>
                    </>
                  )}
                </button>

                {can('delete', 'media') && (
                  <button
                    onClick={() => handleDelete(asset.id, asset.title)}
                    className="p-1 rounded text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all"
                    title="Delete Media"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Upload Asset Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl border border-[#e2e8f0] w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-150">
            <div className="px-6 py-4 border-b border-[#e2e8f0] flex items-center justify-between bg-slate-50">
              <h3 className="font-heading font-bold text-sm text-[#0a1e3f]">
                Upload New Media Asset
              </h3>
              <button
                onClick={() => setIsUploadModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">
                  Asset Title *
                </label>
                <input
                  type="text"
                  required
                  value={uploadData.title}
                  onChange={(e) => setUploadData({ ...uploadData, title: e.target.value })}
                  placeholder="e.g. 2026 Commercial Loan Banner"
                  className="w-full p-2.5 rounded-xl border border-[#e2e8f0] text-xs font-medium focus:border-[#0284c7] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">
                  File Name *
                </label>
                <input
                  type="text"
                  required
                  value={uploadData.fileName}
                  onChange={(e) => setUploadData({ ...uploadData, fileName: e.target.value })}
                  placeholder="e.g. loan-banner-2026.png"
                  className="w-full p-2.5 rounded-xl border border-[#e2e8f0] text-xs font-medium focus:border-[#0284c7] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">
                  Category
                </label>
                <select
                  value={uploadData.category}
                  onChange={(e) => setUploadData({ ...uploadData, category: e.target.value as any })}
                  className="w-full p-2.5 rounded-xl border border-[#e2e8f0] text-xs font-medium focus:border-[#0284c7] outline-none bg-white"
                >
                  <option value="banners">Banners & Heroes</option>
                  <option value="products">Product Visuals</option>
                  <option value="team">Team & Executives</option>
                  <option value="documents">Public Documents</option>
                  <option value="general">General</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">
                  Alternative Text (Accessibility & SEO)
                </label>
                <input
                  type="text"
                  value={uploadData.altText}
                  onChange={(e) => setUploadData({ ...uploadData, altText: e.target.value })}
                  placeholder="Describe the image content..."
                  className="w-full p-2.5 rounded-xl border border-[#e2e8f0] text-xs font-medium focus:border-[#0284c7] outline-none"
                />
              </div>

              <div className="pt-4 border-t border-[#e2e8f0] flex items-center justify-end gap-2.5">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setIsUploadModalOpen(false)}
                  className="rounded-xl text-xs"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  size="sm"
                  className="rounded-xl bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-semibold"
                >
                  Confirm Upload
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
