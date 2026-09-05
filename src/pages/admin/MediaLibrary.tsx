import React, { useState, useRef } from 'react';
import {
  Image as ImageIcon,
  Upload,
  Link as LinkIcon,
  Search,
  Filter,
  Grid,
  List,
  Copy,
  Trash2,
  Archive,
  RotateCcw,
  Edit,
  Check,
  AlertTriangle,
  FileText,
  ExternalLink,
  Plus,
  Loader2,
  Layers,
  ShieldCheck,
  Eye,
  Calendar,
  HardDrive,
  X
} from 'lucide-react';
import { useCMS } from '@/context/CMSContext';
import { useAuth } from '@/context/AuthContext';
import { MediaAsset, MediaUsageReference } from '@/types/cms';
import { SupabaseSync } from '@/services/supabaseSync';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function MediaLibrary() {
  const {
    mediaAssets,
    addMediaAsset,
    updateMediaAsset,
    archiveMediaAsset,
    restoreMediaAsset,
    deleteMediaAsset,
    getMediaUsage
  } = useCMS();
  const { user } = useAuth();

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<'active' | 'archived' | 'all'>('active');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'size' | 'name'>('newest');

  // Selected Asset for Full Preview / Inspector Modal
  const [inspectingAsset, setInspectingAsset] = useState<MediaAsset | null>(null);
  const [isEditingMetadata, setIsEditingMetadata] = useState(false);
  const [editFormData, setEditFormData] = useState({
    title: '',
    altText: '',
    caption: '',
    description: '',
    category: 'general' as MediaAsset['category'],
    tags: ''
  });

  // Upload Modal / Dialog
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [uploadTab, setUploadTab] = useState<'file' | 'url'>('file');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const replaceFileInputRef = useRef<HTMLInputElement>(null);

  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadPreview, setUploadPreview] = useState<string>('');
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadAltText, setUploadAltText] = useState('');
  const [uploadCategory, setUploadCategory] = useState<MediaAsset['category']>('banners');
  const [isUploading, setIsUploading] = useState(false);

  // URL Import State
  const [externalUrl, setExternalUrl] = useState('');
  const [urlTitle, setUrlTitle] = useState('');
  const [urlAltText, setUrlAltText] = useState('');
  const [urlCategory, setUrlCategory] = useState<MediaAsset['category']>('banners');
  const [isValidatingUrl, setIsValidatingUrl] = useState(false);

  // Delete / Archive Confirmation Dialog with Reference Checks
  const [assetToDelete, setAssetToDelete] = useState<MediaAsset | null>(null);
  const [deleteUsageRefs, setDeleteUsageRefs] = useState<MediaUsageReference[]>([]);
  const [isHardDelete, setIsHardDelete] = useState(false);

  // Filter & Sort Assets
  const filteredAssets = mediaAssets
    .filter(asset => {
      if (statusFilter === 'active') return !asset.isArchived;
      if (statusFilter === 'archived') return Boolean(asset.isArchived);
      return true;
    })
    .filter(asset => {
      if (selectedCategory === 'all') return true;
      return asset.category === selectedCategory;
    })
    .filter(asset => {
      const q = searchQuery.toLowerCase();
      return (
        asset.title.toLowerCase().includes(q) ||
        asset.altText.toLowerCase().includes(q) ||
        asset.fileName.toLowerCase().includes(q) ||
        asset.tags?.some(t => t.toLowerCase().includes(q))
      );
    })
    .sort((a, b) => {
      if (sortBy === 'newest') return new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime();
      if (sortBy === 'oldest') return new Date(a.uploadedAt).getTime() - new Date(b.uploadedAt).getTime();
      if (sortBy === 'size') return b.fileSize - a.fileSize;
      if (sortBy === 'name') return a.title.localeCompare(b.title);
      return 0;
    });

  // Copy URL Helper
  const handleCopyUrl = (url: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    navigator.clipboard.writeText(url);
    toast.success('Asset URL copied to clipboard.');
  };

  // Inspect Asset Handler
  const handleInspect = (asset: MediaAsset) => {
    setInspectingAsset(asset);
    setEditFormData({
      title: asset.title,
      altText: asset.altText || '',
      caption: asset.caption || '',
      description: asset.description || '',
      category: asset.category,
      tags: asset.tags?.join(', ') || ''
    });
    setIsEditingMetadata(false);
  };

  // Save Metadata Updates
  const handleSaveMetadata = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inspectingAsset) return;

    await updateMediaAsset(
      inspectingAsset.id,
      {
        title: editFormData.title,
        altText: editFormData.altText,
        caption: editFormData.caption,
        description: editFormData.description,
        category: editFormData.category,
        tags: editFormData.tags.split(',').map(t => t.trim()).filter(Boolean)
      },
      {
        id: user?.id || 'admin',
        name: user?.name || 'Administrator',
        role: user?.role || 'admin'
      }
    );

    toast.success('Media metadata updated successfully.');
    setIsEditingMetadata(false);
    setInspectingAsset(prev => prev ? {
      ...prev,
      ...editFormData,
      tags: editFormData.tags.split(',').map(t => t.trim()).filter(Boolean)
    } : null);
  };

  // Replace Asset File
  const handleReplaceFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !inspectingAsset) return;

    try {
      setIsUploading(true);
      const storageResult = await SupabaseSync.uploadMediaFile(file, inspectingAsset.category);

      let width = inspectingAsset.dimensions?.width || 1200;
      let height = inspectingAsset.dimensions?.height || 800;
      if (file.type.startsWith('image/')) {
        const img = new Image();
        img.src = URL.createObjectURL(file);
        await new Promise((res) => {
          img.onload = () => {
            width = img.naturalWidth;
            height = img.naturalHeight;
            res(null);
          };
          img.onerror = () => res(null);
        });
      }

      await updateMediaAsset(
        inspectingAsset.id,
        {
          fileName: file.name,
          url: storageResult.url,
          storagePath: storageResult.storagePath,
          fileSize: file.size,
          fileType: file.type,
          dimensions: { width, height }
        },
        {
          id: user?.id || 'admin',
          name: user?.name || 'Administrator',
          role: user?.role || 'admin'
        }
      );

      toast.success('Media asset replaced successfully.');
      setInspectingAsset(prev => prev ? {
        ...prev,
        fileName: file.name,
        url: storageResult.url,
        storagePath: storageResult.storagePath,
        fileSize: file.size,
        fileType: file.type,
        dimensions: { width, height }
      } : null);
    } catch (err: any) {
      toast.error('Failed to replace file: ' + err.message);
    } finally {
      setIsUploading(false);
    }
  };

  // Local File Upload
  const handleFileUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadFile) {
      toast.error('Please select a file to upload.');
      return;
    }

    setIsUploading(true);
    try {
      const storageResult = await SupabaseSync.uploadMediaFile(uploadFile, uploadCategory);

      let width = 1200;
      let height = 800;
      if (uploadFile.type.startsWith('image/')) {
        const img = new Image();
        img.src = uploadPreview;
        await new Promise((res) => {
          img.onload = () => {
            width = img.naturalWidth;
            height = img.naturalHeight;
            res(null);
          };
          img.onerror = () => res(null);
        });
      }

      await addMediaAsset(
        {
          title: uploadTitle || uploadFile.name,
          fileName: uploadFile.name,
          url: storageResult.url,
          storagePath: storageResult.storagePath,
          fileSize: uploadFile.size,
          fileType: uploadFile.type || 'image/jpeg',
          dimensions: { width, height },
          altText: uploadAltText || uploadTitle || 'Rima Bank asset',
          category: uploadCategory,
          tags: ['upload', uploadCategory],
          uploadedBy: user?.name || user?.email || 'Administrator',
          uploadedById: user?.id
        },
        {
          id: user?.id || 'admin',
          name: user?.name || 'Administrator',
          role: user?.role || 'admin'
        }
      );

      toast.success('Asset uploaded and added to Media Library.');
      setIsUploadModalOpen(false);
      setUploadFile(null);
      setUploadPreview('');
      setUploadTitle('');
    } catch (err: any) {
      toast.error('Upload failed: ' + err.message);
    } finally {
      setIsUploading(false);
    }
  };

  // URL Import
  const handleUrlImport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!externalUrl.trim()) return;

    setIsValidatingUrl(true);
    try {
      const img = new Image();
      img.src = externalUrl.trim();

      await new Promise((res, rej) => {
        img.onload = () => res(true);
        img.onerror = () => rej(new Error('Image could not be loaded'));
      });

      await addMediaAsset(
        {
          title: urlTitle.trim() || 'External Media Asset',
          fileName: externalUrl.split('/').pop()?.split('?')[0] || 'external-image.jpg',
          url: externalUrl.trim(),
          fileSize: 0,
          fileType: 'image/jpeg',
          dimensions: { width: img.naturalWidth || 800, height: img.naturalHeight || 600 },
          altText: urlAltText.trim() || urlTitle.trim() || 'Imported media',
          category: urlCategory,
          tags: ['external-url', urlCategory],
          uploadedBy: user?.name || user?.email || 'Administrator',
          uploadedById: user?.id
        },
        {
          id: user?.id || 'admin',
          name: user?.name || 'Administrator',
          role: user?.role || 'admin'
        }
      );

      toast.success('External image URL registered in Media Library.');
      setIsUploadModalOpen(false);
      setExternalUrl('');
      setUrlTitle('');
    } catch (err: any) {
      toast.error('Could not verify image from URL. Please ensure the link is direct.');
    } finally {
      setIsValidatingUrl(false);
    }
  };

  // Trigger Delete Modal with Live Reference Warnings
  const promptDeleteAsset = (asset: MediaAsset, hard = false, e?: React.MouseEvent) => {
    e?.stopPropagation();
    const usage = getMediaUsage(asset.url);
    setAssetToDelete(asset);
    setDeleteUsageRefs(usage);
    setIsHardDelete(hard);
  };

  // Confirm Delete / Archive
  const handleConfirmDelete = async () => {
    if (!assetToDelete) return;

    if (isHardDelete) {
      await deleteMediaAsset(
        assetToDelete.id,
        {
          id: user?.id || 'admin',
          name: user?.name || 'Administrator',
          role: user?.role || 'admin'
        },
        assetToDelete.storagePath
      );
      toast.success('Media asset permanently deleted.');
    } else {
      await archiveMediaAsset(
        assetToDelete.id,
        {
          id: user?.id || 'admin',
          name: user?.name || 'Administrator',
          role: user?.role || 'admin'
        }
      );
      toast.success('Media asset moved to archive (soft-deleted).');
    }

    if (inspectingAsset?.id === assetToDelete.id) {
      setInspectingAsset(null);
    }
    setAssetToDelete(null);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-sky-100 text-[#0284c7] text-[10px] font-bold uppercase tracking-wide">
              ADMIN MEDIA STUDIO (FULL CRUD)
            </span>
          </div>
          <h1 className="font-heading text-2xl font-bold text-[#0a1e3f]">
            Media Assets Vault
          </h1>
          <p className="text-xs text-slate-500">
            Centralized media repository for banners, products, team portraits, and regulatory documents
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            onClick={() => {
              setIsUploadModalOpen(true);
              setUploadTab('file');
            }}
            className="bg-[#0284c7] hover:bg-[#0369a1] text-white rounded-xl text-xs font-semibold flex items-center gap-2 shadow-sm"
          >
            <Plus className="h-4 w-4" />
            <span>Upload New Media</span>
          </Button>
        </div>
      </div>

      {/* Filter & Control Bar */}
      <div className="bg-white rounded-2xl border border-[#e2e8f0] p-4 shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
          {/* Search */}
          <div className="relative w-full md:w-80">
            <Search className="h-4 w-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search assets by title, tag, or filename..."
              className="w-full pl-10 pr-3.5 py-2 rounded-xl border border-[#e2e8f0] text-xs focus:border-[#0284c7] outline-none"
            />
          </div>

          {/* Right Controls: Sort, View, Status */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-end">
            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="px-3 py-2 rounded-xl border border-[#e2e8f0] text-xs font-semibold text-[#0a1e3f] bg-white outline-none"
            >
              <option value="active">Active Media ({mediaAssets.filter(m => !m.isArchived).length})</option>
              <option value="archived">Archived ({mediaAssets.filter(m => m.isArchived).length})</option>
              <option value="all">All Assets ({mediaAssets.length})</option>
            </select>

            {/* Sort Order */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 rounded-xl border border-[#e2e8f0] text-xs font-semibold text-[#0a1e3f] bg-white outline-none"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="size">Largest File Size</option>
              <option value="name">Alphabetical</option>
            </select>

            {/* View Mode Switcher */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition-all ${
                  viewMode === 'grid' ? 'bg-white text-[#0284c7] shadow-xs' : 'text-slate-500'
                }`}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg transition-all ${
                  viewMode === 'list' ? 'bg-white text-[#0284c7] shadow-xs' : 'text-slate-500'
                }`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 border-t border-slate-100 pt-3">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0">Category:</span>
          {['all', 'banners', 'products', 'team', 'documents', 'general'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold capitalize whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-[#0a1e3f] text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Asset Gallery / Table */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredAssets.map((asset) => {
            const usageRefs = getMediaUsage(asset.url);
            return (
              <div
                key={asset.id}
                onClick={() => handleInspect(asset)}
                className="group bg-white rounded-2xl border border-[#e2e8f0] overflow-hidden hover:border-[#0284c7]/40 hover:shadow-md transition-all cursor-pointer flex flex-col"
              >
                {/* Image Container */}
                <div className="aspect-16/10 w-full bg-slate-100 relative overflow-hidden flex items-center justify-center">
                  <img
                    src={asset.url}
                    alt={asset.altText || asset.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />

                  {/* Status Overlay */}
                  {asset.isArchived && (
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-amber-600/90 text-white text-[10px] font-bold uppercase tracking-wider backdrop-blur-xs">
                      Archived
                    </div>
                  )}

                  {/* Usage Badge */}
                  {usageRefs.length > 0 && (
                    <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-[#0284c7]/90 text-white text-[10px] font-bold flex items-center gap-1 backdrop-blur-xs">
                      <Layers className="h-3 w-3" />
                      <span>{usageRefs.length} Used</span>
                    </div>
                  )}

                  {/* Quick Action Overlay */}
                  <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      onClick={(e) => handleCopyUrl(asset.url, e)}
                      title="Copy URL"
                      className="p-2 rounded-xl bg-white text-[#0a1e3f] hover:bg-sky-50 shadow-md transition-all"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleInspect(asset)}
                      title="Inspect & Edit"
                      className="p-2 rounded-xl bg-white text-[#0a1e3f] hover:bg-sky-50 shadow-md transition-all"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      onClick={(e) => promptDeleteAsset(asset, false, e)}
                      title="Archive Asset"
                      className="p-2 rounded-xl bg-white text-amber-600 hover:bg-amber-50 shadow-md transition-all"
                    >
                      <Archive className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                  <div>
                    <h3 className="font-heading font-bold text-xs text-[#0a1e3f] truncate">
                      {asset.title}
                    </h3>
                    <p className="text-[11px] text-slate-400 font-mono truncate mt-0.5">
                      {asset.fileName}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100">
                    <span className="capitalize font-semibold">{asset.category}</span>
                    <span>{asset.fileSize > 0 ? `${Math.round(asset.fileSize / 1024)} KB` : 'Direct URL'}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* List View */
        <div className="bg-white rounded-2xl border border-[#e2e8f0] overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Asset Preview</th>
                  <th className="py-3 px-4">Title & Details</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Size</th>
                  <th className="py-3 px-4">Usage</th>
                  <th className="py-3 px-4">Uploaded</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredAssets.map((asset) => {
                  const usageRefs = getMediaUsage(asset.url);
                  return (
                    <tr
                      key={asset.id}
                      onClick={() => handleInspect(asset)}
                      className="hover:bg-slate-50/80 cursor-pointer transition-colors"
                    >
                      <td className="py-3 px-4">
                        <div className="h-12 w-16 rounded-lg bg-slate-100 overflow-hidden border border-slate-200 flex items-center justify-center">
                          <img src={asset.url} alt={asset.altText} className="w-full h-full object-cover" />
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <p className="font-bold text-[#0a1e3f]">{asset.title}</p>
                        <p className="text-[11px] text-slate-400 font-mono">{asset.fileName}</p>
                      </td>
                      <td className="py-3 px-4 capitalize font-medium">{asset.category}</td>
                      <td className="py-3 px-4 font-mono">{asset.fileSize > 0 ? `${Math.round(asset.fileSize / 1024)} KB` : 'URL'}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${usageRefs.length > 0 ? 'bg-sky-100 text-sky-800' : 'bg-slate-100 text-slate-500'}`}>
                          {usageRefs.length} references
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-500">{new Date(asset.uploadedAt).toLocaleDateString()}</td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={() => handleCopyUrl(asset.url)}
                            title="Copy URL"
                            className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-600"
                          >
                            <Copy className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleInspect(asset)}
                            title="Inspect"
                            className="p-1.5 rounded-lg hover:bg-slate-200 text-[#0284c7]"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => promptDeleteAsset(asset, false)}
                            title="Archive"
                            className="p-1.5 rounded-lg hover:bg-amber-100 text-amber-600"
                          >
                            <Archive className="h-4 w-4" />
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

      {filteredAssets.length === 0 && (
        <div className="bg-white rounded-2xl border border-[#e2e8f0] p-16 text-center space-y-3">
          <ImageIcon className="h-10 w-10 text-slate-300 mx-auto" />
          <h3 className="font-heading font-bold text-sm text-[#0a1e3f]">No media assets found</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            There are no media assets matching your active filter criteria. Upload files or import external URLs.
          </p>
          <Button
            onClick={() => setIsUploadModalOpen(true)}
            className="bg-[#0284c7] text-white text-xs rounded-xl"
          >
            Upload Media Asset
          </Button>
        </div>
      )}

      {/* ============================================================ */}
      {/* ASSET DETAIL INSPECTOR & METADATA EDITOR MODAL               */}
      {/* ============================================================ */}
      {inspectingAsset && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-4xl w-full flex flex-col max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <ImageIcon className="h-4 w-4 text-[#0284c7]" />
                <h3 className="font-heading font-bold text-sm text-[#0a1e3f] truncate max-w-md">
                  {inspectingAsset.title}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopyUrl(inspectingAsset.url)}
                  className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-[#0a1e3f] hover:bg-slate-50 flex items-center gap-1.5"
                >
                  <Copy className="h-3.5 w-3.5" />
                  <span>Copy URL</span>
                </button>
                <button
                  onClick={() => setInspectingAsset(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Left Column: Full Preview & Replacement (6 cols) */}
              <div className="md:col-span-6 space-y-4">
                <div className="aspect-4/3 w-full rounded-2xl bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center p-2">
                  <img
                    src={inspectingAsset.url}
                    alt={inspectingAsset.altText}
                    className="max-h-full max-w-full object-contain rounded-xl"
                  />
                </div>

                {/* Replacement File Trigger */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <span className="text-xs font-bold text-[#0a1e3f] block">Replace Asset File</span>
                  <p className="text-[11px] text-slate-500">
                    Upload a replacement file to update this asset without breaking existing references.
                  </p>
                  <input
                    ref={replaceFileInputRef}
                    type="file"
                    accept="image/*,application/pdf"
                    onChange={handleReplaceFile}
                    className="hidden"
                  />
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => replaceFileInputRef.current?.click()}
                    disabled={isUploading}
                    className="w-full text-xs rounded-xl"
                  >
                    {isUploading ? 'Uploading Replacement...' : 'Choose Replacement File'}
                  </Button>
                </div>

                {/* Live Usage Scanner References */}
                <div className="p-4 rounded-xl bg-sky-50/60 border border-sky-200 space-y-2">
                  <span className="text-xs font-bold text-[#0a1e3f] flex items-center gap-1.5">
                    <Layers className="h-4 w-4 text-[#0284c7]" />
                    <span>Active Website Usage ({getMediaUsage(inspectingAsset.url).length})</span>
                  </span>

                  {getMediaUsage(inspectingAsset.url).length > 0 ? (
                    <div className="space-y-1.5">
                      {getMediaUsage(inspectingAsset.url).map((ref, idx) => (
                        <div key={idx} className="p-2 bg-white rounded-lg border border-sky-100 text-[11px]">
                          <p className="font-semibold text-[#0a1e3f]">{ref.title}</p>
                          <p className="text-slate-500 text-[10px]">{ref.location}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-[11px] text-slate-500">
                      This asset is not currently referenced in published website copy.
                    </p>
                  )}
                </div>
              </div>

              {/* Right Column: Metadata & Actions (6 cols) */}
              <div className="md:col-span-6 space-y-4">
                <form onSubmit={handleSaveMetadata} className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">
                      Asset Title
                    </label>
                    <input
                      type="text"
                      required
                      value={editFormData.title}
                      onChange={(e) => setEditFormData({ ...editFormData, title: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-[#0284c7] outline-none font-semibold text-[#0a1e3f]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">
                        Category
                      </label>
                      <select
                        value={editFormData.category}
                        onChange={(e) => setEditFormData({ ...editFormData, category: e.target.value as any })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-[#0284c7] outline-none bg-white"
                      >
                        <option value="banners">Banners & Hero</option>
                        <option value="products">Banking Products</option>
                        <option value="team">Team & Testimonials</option>
                        <option value="documents">Official Documents</option>
                        <option value="general">General Media</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">
                        Dimensions
                      </label>
                      <input
                        type="text"
                        readOnly
                        value={inspectingAsset.dimensions ? `${inspectingAsset.dimensions.width} × ${inspectingAsset.dimensions.height}` : 'N/A'}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 font-mono text-slate-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">
                      Alt Text (Accessibility & SEO)
                    </label>
                    <input
                      type="text"
                      value={editFormData.altText}
                      onChange={(e) => setEditFormData({ ...editFormData, altText: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-[#0284c7] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">
                      Caption (Optional)
                    </label>
                    <input
                      type="text"
                      value={editFormData.caption}
                      onChange={(e) => setEditFormData({ ...editFormData, caption: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-[#0284c7] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">
                      Tags (Comma separated)
                    </label>
                    <input
                      type="text"
                      value={editFormData.tags}
                      onChange={(e) => setEditFormData({ ...editFormData, tags: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-[#0284c7] outline-none"
                    />
                  </div>

                  <div className="pt-2">
                    <Button
                      type="submit"
                      className="w-full bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-semibold rounded-xl"
                    >
                      Save Metadata Updates
                    </Button>
                  </div>
                </form>

                {/* Audit Information */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Uploaded By:</span>
                    <span className="font-semibold text-[#0a1e3f]">{inspectingAsset.uploadedBy}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Upload Date:</span>
                    <span>{new Date(inspectingAsset.uploadedAt).toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">File Type:</span>
                    <span className="font-mono">{inspectingAsset.fileType}</span>
                  </div>
                </div>

                {/* Destructive Actions (Admin Only) */}
                <div className="pt-4 border-t border-slate-200 flex items-center justify-between gap-2">
                  {inspectingAsset.isArchived ? (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => restoreMediaAsset(inspectingAsset.id, { id: user?.id || 'admin', name: user?.name || 'Administrator', role: 'admin' })}
                      className="text-xs text-emerald-700 hover:bg-emerald-50 rounded-xl flex items-center gap-1.5"
                    >
                      <RotateCcw className="h-3.5 w-3.5" />
                      <span>Restore from Archive</span>
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => promptDeleteAsset(inspectingAsset, false)}
                      className="text-xs text-amber-700 hover:bg-amber-50 rounded-xl flex items-center gap-1.5"
                    >
                      <Archive className="h-3.5 w-3.5" />
                      <span>Move to Archive</span>
                    </Button>
                  )}

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => promptDeleteAsset(inspectingAsset, true)}
                    className="text-xs text-red-600 hover:bg-red-50 rounded-xl flex items-center gap-1.5"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    <span>Permanent Delete</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* UPLOAD & URL IMPORT MODAL                                     */}
      {/* ============================================================ */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-xl w-full flex flex-col max-h-[92vh] overflow-hidden">
            <div className="px-5 sm:px-6 py-3.5 sm:py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50 shrink-0">
              <h3 className="font-heading font-bold text-sm text-[#0a1e3f]">
                Add Media to Library
              </h3>
              <button
                onClick={() => setIsUploadModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Sub-tabs */}
            <div className="px-4 sm:px-6 border-b border-slate-100 flex items-center gap-2 sm:gap-4 text-xs font-semibold overflow-x-auto shrink-0 scrollbar-none">
              <button
                onClick={() => setUploadTab('file')}
                className={`py-3 border-b-2 flex items-center gap-1.5 whitespace-nowrap shrink-0 transition-all ${
                  uploadTab === 'file' ? 'border-[#0284c7] text-[#0284c7] font-bold' : 'border-transparent text-slate-500'
                }`}
              >
                <Upload className="h-3.5 w-3.5" />
                <span>Upload File from Device</span>
              </button>

              <button
                onClick={() => setUploadTab('url')}
                className={`py-3 border-b-2 flex items-center gap-1.5 whitespace-nowrap shrink-0 transition-all ${
                  uploadTab === 'url' ? 'border-[#0284c7] text-[#0284c7] font-bold' : 'border-transparent text-slate-500'
                }`}
              >
                <LinkIcon className="h-3.5 w-3.5" />
                <span>Add by External URL</span>
              </button>
            </div>

            <div className="p-4 sm:p-6 overflow-y-auto flex-1">
              {uploadTab === 'file' ? (
                <form onSubmit={handleFileUpload} className="space-y-4">
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-slate-300 hover:border-[#0284c7] rounded-2xl p-6 sm:p-8 text-center cursor-pointer bg-slate-50/60 space-y-2 transition-all"
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*,application/pdf"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setUploadFile(file);
                          setUploadTitle(file.name.replace(/\.[^/.]+$/, '').replace(/[_-]/g, ' '));
                          setUploadAltText(file.name.replace(/\.[^/.]+$/, '').replace(/[_-]/g, ' '));
                          setUploadPreview(URL.createObjectURL(file));
                        }
                      }}
                      className="hidden"
                    />

                    {uploadPreview ? (
                      <div className="space-y-2">
                        <img src={uploadPreview} alt="Preview" className="h-28 sm:h-32 mx-auto rounded-xl object-contain border border-slate-200" />
                        <p className="text-xs text-emerald-600 font-semibold truncate max-w-xs mx-auto">Selected: {uploadFile?.name}</p>
                      </div>
                    ) : (
                      <>
                        <Upload className="h-8 w-8 text-[#0284c7] mx-auto" />
                        <p className="text-xs font-semibold text-[#0a1e3f]">Click to browse or drop file here</p>
                        <p className="text-[11px] text-slate-400">JPG, PNG, WebP, SVG, PDF (Max 10MB)</p>
                      </>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">Title *</label>
                      <input
                        type="text"
                        required
                        value={uploadTitle}
                        onChange={(e) => setUploadTitle(e.target.value)}
                        placeholder="Asset title..."
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-[#0284c7] outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">Category</label>
                      <select
                        value={uploadCategory}
                        onChange={(e) => setUploadCategory(e.target.value as any)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-[#0284c7] outline-none bg-white"
                      >
                        <option value="banners">Banners & Hero</option>
                        <option value="products">Banking Products</option>
                        <option value="team">Team & Testimonials</option>
                        <option value="documents">Official Documents</option>
                        <option value="general">General Media</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">Alt Text</label>
                    <input
                      type="text"
                      value={uploadAltText}
                      onChange={(e) => setUploadAltText(e.target.value)}
                      placeholder="Accessibility alt description..."
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-[#0284c7] outline-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={!uploadFile || isUploading}
                    className="w-full bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-semibold rounded-xl h-10"
                  >
                    {isUploading ? 'Uploading to Storage...' : 'Upload & Add to Vault'}
                  </Button>
                </form>
              ) : (
                <form onSubmit={handleUrlImport} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">Image URL *</label>
                    <input
                      type="url"
                      required
                      value={externalUrl}
                      onChange={(e) => setExternalUrl(e.target.value)}
                      placeholder="https://images.unsplash.com/photo-..."
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-[#0284c7] outline-none font-mono"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">Title *</label>
                      <input
                        type="text"
                        required
                        value={urlTitle}
                        onChange={(e) => setUrlTitle(e.target.value)}
                        placeholder="Asset title..."
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-[#0284c7] outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">Category</label>
                      <select
                        value={urlCategory}
                        onChange={(e) => setUrlCategory(e.target.value as any)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-[#0284c7] outline-none bg-white"
                      >
                        <option value="banners">Banners & Hero</option>
                        <option value="products">Banking Products</option>
                        <option value="team">Team & Testimonials</option>
                        <option value="documents">Official Documents</option>
                        <option value="general">General Media</option>
                      </select>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={!externalUrl.trim() || isValidatingUrl}
                    className="w-full bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-semibold rounded-xl h-10"
                  >
                    {isValidatingUrl ? 'Verifying Link...' : 'Register Image URL'}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* DELETE / ARCHIVE WARNING DIALOG WITH USAGE REFS              */}
      {/* ============================================================ */}
      {assetToDelete && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-2xl ${isHardDelete ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-600'}`}>
                <AlertTriangle className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-base text-[#0a1e3f]">
                  {isHardDelete ? 'Confirm Permanent Deletion' : 'Move Asset to Archive'}
                </h3>
                <p className="text-xs text-slate-500">
                  {isHardDelete ? 'This action cannot be undone.' : 'Soft-deleting this media asset.'}
                </p>
              </div>
            </div>

            {/* Critical Usage Warning */}
            {deleteUsageRefs.length > 0 && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 space-y-2">
                <p className="text-xs font-bold text-red-700 flex items-center gap-1.5">
                  <AlertTriangle className="h-4 w-4" />
                  <span>Warning: Asset In Active Use ({deleteUsageRefs.length} Locations)</span>
                </p>
                <p className="text-[11px] text-red-600 leading-relaxed">
                  Deleting this asset will result in broken images on the public website. The asset is currently used on:
                </p>
                <ul className="text-[11px] text-red-800 list-disc list-inside space-y-0.5">
                  {deleteUsageRefs.map((r, i) => (
                    <li key={i}><strong>{r.title}</strong> — {r.location}</li>
                  ))}
                </ul>
              </div>
            )}

            <p className="text-xs text-slate-600 leading-relaxed">
              Are you sure you want to {isHardDelete ? 'permanently delete' : 'archive'} <strong>"{assetToDelete.title}"</strong>?
            </p>

            <div className="flex items-center justify-end gap-2 pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setAssetToDelete(null)}
                className="text-xs rounded-xl"
              >
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={handleConfirmDelete}
                className={`text-xs font-semibold rounded-xl text-white ${isHardDelete ? 'bg-red-600 hover:bg-red-700' : 'bg-amber-600 hover:bg-amber-700'}`}
              >
                {isHardDelete ? 'Yes, Permanently Delete' : 'Yes, Move to Archive'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
