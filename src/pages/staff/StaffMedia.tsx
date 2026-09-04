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
  Plus,
  Loader2,
  Eye,
  Info,
  X
} from 'lucide-react';
import { useCMS } from '@/context/CMSContext';
import { useAuth } from '@/context/AuthContext';
import { MediaAsset } from '@/types/cms';
import { SupabaseSync } from '@/services/supabaseSync';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function StaffMedia() {
  const { mediaAssets, addMediaAsset, updateMediaAsset } = useCMS();
  const { user } = useAuth();

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
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

  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadPreview, setUploadPreview] = useState<string>('');
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadAltText, setUploadAltText] = useState('');
  const [uploadCategory, setUploadCategory] = useState<MediaAsset['category']>('documents');
  const [isUploading, setIsUploading] = useState(false);

  // URL Import State
  const [externalUrl, setExternalUrl] = useState('');
  const [urlTitle, setUrlTitle] = useState('');
  const [urlAltText, setUrlAltText] = useState('');
  const [urlCategory, setUrlCategory] = useState<MediaAsset['category']>('documents');
  const [isValidatingUrl, setIsValidatingUrl] = useState(false);

  // Filter Active Assets for Staff
  const filteredAssets = mediaAssets
    .filter(asset => !asset.isArchived)
    .filter(asset => {
      if (selectedCategory === 'all') return true;
      return asset.category === selectedCategory;
    })
    .filter(asset => {
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        asset.title.toLowerCase().includes(q) ||
        asset.fileName?.toLowerCase().includes(q) ||
        asset.altText?.toLowerCase().includes(q) ||
        asset.tags?.some(tag => tag.toLowerCase().includes(q))
      );
    })
    .sort((a, b) => {
      const dateA = new Date(a.uploadedAt || a.updatedAt || 0).getTime();
      const dateB = new Date(b.uploadedAt || b.updatedAt || 0).getTime();
      if (sortBy === 'newest') return dateB - dateA;
      if (sortBy === 'oldest') return dateA - dateB;
      if (sortBy === 'name') return a.title.localeCompare(b.title);
      if (sortBy === 'size') return (b.fileSize || 0) - (a.fileSize || 0);
      return 0;
    });

  // Handle Local File Selection
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      toast.error('File size exceeds the 10MB limit.');
      return;
    }

    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      toast.error('Unsupported file format. Please upload JPG, PNG, WebP, SVG, or GIF.');
      return;
    }

    setUploadFile(file);
    setUploadTitle(file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '));
    setUploadAltText(file.name.replace(/\.[^/.]+$/, ''));

    const reader = new FileReader();
    reader.onload = () => setUploadPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  // Perform Local File Upload
  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadFile) {
      toast.error('Please select an image file to upload.');
      return;
    }

    setIsUploading(true);
    try {
      const storageResult = await SupabaseSync.uploadMediaFile(uploadFile, uploadCategory);

      // Measure dimensions
      let width = 1200;
      let height = 800;
      if (uploadFile.type.startsWith('image/')) {
        const img = new Image();
        img.src = uploadPreview;
        await new Promise((resolve) => {
          img.onload = () => {
            width = img.naturalWidth;
            height = img.naturalHeight;
            resolve(null);
          };
          img.onerror = () => resolve(null);
        });
      }

      await addMediaAsset(
        {
          title: uploadTitle.trim() || uploadFile.name,
          fileName: uploadFile.name,
          url: storageResult.url,
          storagePath: storageResult.storagePath,
          fileSize: uploadFile.size,
          fileType: uploadFile.type || 'image/jpeg',
          dimensions: { width, height },
          altText: uploadAltText.trim() || uploadTitle.trim() || 'Rima Bank asset',
          category: uploadCategory,
          uploadedBy: user?.name || user?.email || 'Staff Member',
          uploadedById: user?.id,
          tags: ['upload', uploadCategory]
        },
        {
          id: user?.id || 'staff',
          name: user?.name || 'Staff Member',
          role: user?.role || 'staff'
        }
      );

      toast.success('Media asset successfully uploaded.');
      setIsUploadModalOpen(false);
      resetUploadState();
    } catch (err: any) {
      console.error('Upload error:', err);
      toast.error(err.message || 'Failed to upload media asset.');
    } finally {
      setIsUploading(false);
    }
  };

  // Import Image from External URL
  const handleUrlImportSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!externalUrl.trim()) {
      toast.error('Please enter a valid image URL.');
      return;
    }

    setIsValidatingUrl(true);
    try {
      const img = new Image();
      img.src = externalUrl;
      await new Promise((resolve, reject) => {
        img.onload = () => resolve(null);
        img.onerror = () => reject(new Error('Unable to load image from URL. Please check the URL link.'));
      });

      await addMediaAsset(
        {
          title: urlTitle.trim() || 'External Media Asset',
          fileName: externalUrl.split('/').pop()?.split('?')[0] || 'external-asset',
          url: externalUrl.trim(),
          fileSize: 0,
          fileType: 'image/jpeg',
          dimensions: img.naturalWidth && img.naturalHeight ? { width: img.naturalWidth, height: img.naturalHeight } : undefined,
          altText: urlAltText.trim() || urlTitle.trim(),
          category: urlCategory,
          uploadedBy: user?.name || user?.email || 'Staff Member',
          uploadedById: user?.id,
          tags: ['external-url', urlCategory]
        },
        {
          id: user?.id || 'staff',
          name: user?.name || 'Staff Member',
          role: user?.role || 'staff'
        }
      );

      toast.success('External image linked successfully.');
      setIsUploadModalOpen(false);
      resetUploadState();
    } catch (err: any) {
      toast.error(err.message || 'Failed to verify external image.');
    } finally {
      setIsValidatingUrl(false);
    }
  };

  const resetUploadState = () => {
    setUploadFile(null);
    setUploadPreview('');
    setUploadTitle('');
    setUploadAltText('');
    setExternalUrl('');
    setUrlTitle('');
    setUrlAltText('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const copyToClipboard = (text: string, label: string = 'URL') => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard!`);
  };

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return 'Unknown size';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  // Open Inspector and populate edit form
  const openInspector = (asset: MediaAsset) => {
    setInspectingAsset(asset);
    setIsEditingMetadata(false);
    setEditFormData({
      title: asset.title,
      altText: asset.altText || '',
      caption: asset.caption || '',
      description: asset.description || '',
      category: asset.category,
      tags: asset.tags?.join(', ') || ''
    });
  };

  // Save Metadata Changes
  const handleSaveMetadata = async () => {
    if (!inspectingAsset) return;
    try {
      const updatedTags = editFormData.tags
        ? editFormData.tags.split(',').map(t => t.trim()).filter(Boolean)
        : [];

      await updateMediaAsset(
        inspectingAsset.id,
        {
          title: editFormData.title.trim(),
          altText: editFormData.altText.trim(),
          caption: editFormData.caption.trim(),
          description: editFormData.description.trim(),
          category: editFormData.category,
          tags: updatedTags
        },
        {
          id: user?.id || 'staff',
          name: user?.name || 'Staff Member',
          role: user?.role || 'staff'
        }
      );

      setInspectingAsset(prev => prev ? {
        ...prev,
        title: editFormData.title.trim(),
        altText: editFormData.altText.trim(),
        caption: editFormData.caption.trim(),
        description: editFormData.description.trim(),
        category: editFormData.category,
        tags: updatedTags
      } : null);

      setIsEditingMetadata(false);
      toast.success('Media details updated successfully.');
    } catch {
      toast.error('Failed to update media details.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
              Staff Portal
            </span>
            <h1 className="text-2xl font-bold text-slate-900 font-poppins">Media Library</h1>
          </div>
          <p className="text-sm text-slate-500 mt-1 font-inter">
            Browse and upload media assets for publications, news releases, and announcements.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            onClick={() => {
              resetUploadState();
              setIsUploadModalOpen(true);
            }}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium shadow-sm transition-all"
          >
            <Plus className="w-4 h-4 mr-2" />
            Upload New Media
          </Button>
        </div>
      </div>

      {/* Notice info banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
        <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
        <div className="text-xs text-blue-900 leading-relaxed font-inter">
          <p className="font-semibold text-blue-950">Staff Guidelines for Media:</p>
          <p className="mt-0.5">
            You can upload new assets and copy image links for your draft publications and announcements. To delete or archive existing assets, please coordinate with a System Administrator.
          </p>
        </div>
      </div>

      {/* Filter & Toolbar */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search Bar */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search media by title or tag..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all font-inter"
            />
          </div>

          {/* Controls: Category, Sort & Layout */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
            {/* Category Select */}
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-500" />
              <select
                value={selectedCategory}
                onChange={e => setSelectedCategory(e.target.value)}
                className="text-sm bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-inter"
              >
                <option value="all">All Categories</option>
                <option value="banners">Banners & Promotions</option>
                <option value="products">Products & Services</option>
                <option value="team">Staff & Team</option>
                <option value="documents">Documents & Reports</option>
                <option value="general">General Assets</option>
              </select>
            </div>

            {/* Sort Select */}
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as any)}
              className="text-sm bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-inter"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="name">Name (A-Z)</option>
              <option value="size">Size (Large to Small)</option>
            </select>

            {/* Layout Toggle */}
            <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-md transition-all ${
                  viewMode === 'grid' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-500 hover:text-slate-800'
                }`}
                title="Grid View"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-md transition-all ${
                  viewMode === 'list' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-500 hover:text-slate-800'
                }`}
                title="List View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Media Content Grid / List */}
      {filteredAssets.length === 0 ? (
        <div className="bg-white rounded-xl border border-dashed border-slate-300 p-12 text-center">
          <ImageIcon className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-semibold text-slate-800 font-poppins">No media assets found</h3>
          <p className="text-sm text-slate-500 mt-1 max-w-md mx-auto font-inter">
            {searchQuery || selectedCategory !== 'all'
              ? 'Try adjusting your search criteria or filter to see active assets.'
              : 'Start by uploading your first image or linking an external asset.'}
          </p>
          <Button
            onClick={() => {
              resetUploadState();
              setIsUploadModalOpen(true);
            }}
            variant="outline"
            className="mt-4 border-emerald-600 text-emerald-700 hover:bg-emerald-50"
          >
            <Upload className="w-4 h-4 mr-2" />
            Upload Media
          </Button>
        </div>
      ) : viewMode === 'grid' ? (
        /* GRID VIEW */
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredAssets.map(asset => (
            <div
              key={asset.id}
              onClick={() => openInspector(asset)}
              className="group bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md hover:border-emerald-500 transition-all cursor-pointer flex flex-col relative"
            >
              {/* Image Preview Container */}
              <div className="aspect-video bg-slate-100 relative overflow-hidden flex items-center justify-center">
                <img
                  src={asset.url}
                  alt={asset.altText || asset.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />

                {/* Quick overlay actions on hover */}
                <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openInspector(asset);
                    }}
                    className="p-2 bg-white/90 text-slate-800 rounded-full hover:bg-white transition-all shadow"
                    title="View Details"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      copyToClipboard(asset.url, 'Image link');
                    }}
                    className="p-2 bg-white/90 text-slate-800 rounded-full hover:bg-white transition-all shadow"
                    title="Copy URL"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Caption & Metadata Footer */}
              <div className="p-3 flex flex-col justify-between flex-1 bg-white">
                <div>
                  <h4 className="text-xs font-semibold text-slate-900 truncate font-inter" title={asset.title}>
                    {asset.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-0.5 truncate font-inter">
                    {formatFileSize(asset.fileSize)} • {asset.category}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* LIST VIEW */
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-semibold text-slate-600 uppercase tracking-wider font-inter">
                  <th className="py-3 px-4">Asset</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Dimensions / Size</th>
                  <th className="py-3 px-4">Uploaded By</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm font-inter">
                {filteredAssets.map(asset => (
                  <tr
                    key={asset.id}
                    onClick={() => openInspector(asset)}
                    className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-10 rounded bg-slate-100 overflow-hidden shrink-0 border border-slate-200 flex items-center justify-center">
                          <img
                            src={asset.url}
                            alt={asset.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="max-w-xs truncate">
                          <div className="font-medium text-slate-900 truncate">{asset.title}</div>
                          <div className="text-xs text-slate-400 truncate">{asset.fileName || 'External Asset'}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-block px-2 py-0.5 text-xs rounded bg-slate-100 text-slate-700 capitalize">
                        {asset.category}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-xs text-slate-600">
                      <div>{asset.dimensions ? `${asset.dimensions.width} × ${asset.dimensions.height}` : '—'}</div>
                      <div className="text-slate-400">{formatFileSize(asset.fileSize)}</div>
                    </td>
                    <td className="py-3 px-4 text-xs text-slate-600">
                      {asset.uploadedBy || 'Staff'}
                    </td>
                    <td className="py-3 px-4 text-xs text-slate-500">
                      {asset.uploadedAt ? new Date(asset.uploadedAt).toLocaleDateString() : '—'}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1" onClick={e => e.stopPropagation()}>
                        <button
                          onClick={() => copyToClipboard(asset.url, 'Image URL')}
                          className="p-1.5 text-slate-400 hover:text-emerald-700 hover:bg-emerald-50 rounded"
                          title="Copy Link"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => openInspector(asset)}
                          className="p-1.5 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded"
                          title="Inspect Details"
                        >
                          <Eye className="w-4 h-4" />
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

      {/* UPLOAD / IMPORT MODAL */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900 font-poppins">Upload Media Asset</h3>
                <p className="text-xs text-slate-500 font-inter">Add images to the central repository for your content.</p>
              </div>
              <button
                onClick={() => setIsUploadModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 text-lg leading-none p-1 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Tab switch: File Upload vs URL Import */}
            <div className="flex border-b border-slate-200 mb-5">
              <button
                type="button"
                onClick={() => setUploadTab('file')}
                className={`py-2 px-4 text-xs font-semibold border-b-2 transition-all flex items-center gap-2 ${
                  uploadTab === 'file'
                    ? 'border-emerald-600 text-emerald-700'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <Upload className="w-3.5 h-3.5" />
                Upload File from Device
              </button>
              <button
                type="button"
                onClick={() => setUploadTab('url')}
                className={`py-2 px-4 text-xs font-semibold border-b-2 transition-all flex items-center gap-2 ${
                  uploadTab === 'url'
                    ? 'border-emerald-600 text-emerald-700'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <LinkIcon className="w-3.5 h-3.5" />
                Import via URL
              </button>
            </div>

            {uploadTab === 'file' ? (
              /* LOCAL FILE UPLOAD TAB */
              <form onSubmit={handleUploadSubmit} className="space-y-4 font-inter">
                {/* Drag & Drop Area */}
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${
                    uploadPreview
                      ? 'border-emerald-400 bg-emerald-50/20'
                      : 'border-slate-300 hover:border-emerald-500 hover:bg-slate-50'
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/svg+xml,image/gif"
                    onChange={handleFileSelect}
                    className="hidden"
                  />

                  {uploadPreview ? (
                    <div className="space-y-3">
                      <img
                        src={uploadPreview}
                        alt="Preview"
                        className="max-h-40 mx-auto rounded-lg object-contain shadow-sm border border-slate-200"
                      />
                      <p className="text-xs text-slate-600 font-medium">{uploadFile?.name} ({formatFileSize(uploadFile?.size)})</p>
                      <span className="text-xs text-emerald-700 hover:underline">Click to choose another file</span>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                        <Upload className="w-6 h-6" />
                      </div>
                      <div className="text-sm font-medium text-slate-800">
                        Click to upload or drag and drop image here
                      </div>
                      <p className="text-xs text-slate-400">
                        Supports PNG, JPG, WebP, SVG (Max file size: 10MB)
                      </p>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Asset Title *</label>
                    <input
                      type="text"
                      required
                      value={uploadTitle}
                      onChange={e => setUploadTitle(e.target.value)}
                      placeholder="e.g. Q3 Banking Report Banner"
                      className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
                    <select
                      value={uploadCategory}
                      onChange={e => setUploadCategory(e.target.value as any)}
                      className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none bg-white"
                    >
                      <option value="banners">Banners & Promotions</option>
                      <option value="products">Products & Services</option>
                      <option value="team">Staff & Team</option>
                      <option value="documents">Documents & Reports</option>
                      <option value="general">General Asset</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Alt Text (Accessibility)</label>
                  <input
                    type="text"
                    value={uploadAltText}
                    onChange={e => setUploadAltText(e.target.value)}
                    placeholder="Short description of what the image shows"
                    className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setIsUploadModalOpen(false)}
                    disabled={isUploading}
                    className="text-xs"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={!uploadFile || isUploading}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium"
                  >
                    {isUploading ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin mr-1.5" />
                        Uploading to Storage...
                      </>
                    ) : (
                      'Save & Add to Library'
                    )}
                  </Button>
                </div>
              </form>
            ) : (
              /* EXTERNAL URL TAB */
              <form onSubmit={handleUrlImportSubmit} className="space-y-4 font-inter">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Direct Image URL *</label>
                  <input
                    type="url"
                    required
                    value={externalUrl}
                    onChange={e => setExternalUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/photo-..."
                    className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none font-mono"
                  />
                </div>

                {externalUrl && (
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-center">
                    <img
                      src={externalUrl}
                      alt="URL Preview"
                      className="max-h-32 object-contain rounded"
                      onError={() => toast.error('Unable to display preview from this URL')}
                    />
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Asset Title *</label>
                    <input
                      type="text"
                      required
                      value={urlTitle}
                      onChange={e => setUrlTitle(e.target.value)}
                      placeholder="e.g. Modern Branch Office"
                      className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
                    <select
                      value={urlCategory}
                      onChange={e => setUrlCategory(e.target.value as any)}
                      className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none bg-white"
                    >
                      <option value="banners">Banners & Promotions</option>
                      <option value="products">Products & Services</option>
                      <option value="team">Staff & Team</option>
                      <option value="documents">Documents & Reports</option>
                      <option value="general">General Asset</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Alt Text</label>
                  <input
                    type="text"
                    value={urlAltText}
                    onChange={e => setUrlAltText(e.target.value)}
                    placeholder="Describe image for screen readers"
                    className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setIsUploadModalOpen(false)}
                    disabled={isValidatingUrl}
                    className="text-xs"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={!externalUrl || isValidatingUrl}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium"
                  >
                    {isValidatingUrl ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin mr-1.5" />
                        Validating URL...
                      </>
                    ) : (
                      'Save Image Link'
                    )}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* INSPECTOR / DETAIL MODAL */}
      {inspectingAsset && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-100 text-emerald-800 capitalize">
                  {inspectingAsset.category}
                </span>
                <h3 className="text-base font-bold text-slate-900 font-poppins truncate max-w-md">
                  {inspectingAsset.title}
                </h3>
              </div>
              <button
                onClick={() => setInspectingAsset(null)}
                className="text-slate-400 hover:text-slate-700 text-lg leading-none p-1 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-inter">
              {/* Left Column: Image Preview & URL Actions */}
              <div className="space-y-4">
                <div className="bg-slate-100 rounded-xl overflow-hidden border border-slate-200 aspect-video flex items-center justify-center">
                  <img
                    src={inspectingAsset.url}
                    alt={inspectingAsset.altText || inspectingAsset.title}
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-2">
                  <div className="text-xs font-semibold text-slate-700">Public Media URL</div>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      readOnly
                      value={inspectingAsset.url}
                      className="w-full text-xs px-2.5 py-1.5 bg-white border border-slate-200 rounded font-mono text-slate-600 select-all"
                    />
                    <Button
                      size="sm"
                      onClick={() => copyToClipboard(inspectingAsset.url, 'Image link')}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white shrink-0 text-xs px-3"
                    >
                      <Copy className="w-3.5 h-3.5 mr-1" />
                      Copy
                    </Button>
                  </div>
                </div>

                {/* Technical Meta Specs */}
                <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-200">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-semibold">Dimensions</span>
                    {inspectingAsset.dimensions ? `${inspectingAsset.dimensions.width} × ${inspectingAsset.dimensions.height} px` : 'Unspecified'}
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-semibold">File Size</span>
                    {formatFileSize(inspectingAsset.fileSize)}
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-semibold">Type</span>
                    {inspectingAsset.fileType || 'Image asset'}
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-semibold">Uploaded</span>
                    {inspectingAsset.uploadedAt ? new Date(inspectingAsset.uploadedAt).toLocaleDateString() : '—'}
                  </div>
                </div>
              </div>

              {/* Right Column: Metadata Details & Staff Edit Form */}
              <div className="space-y-4">
                {isEditingMetadata ? (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Title</label>
                      <input
                        type="text"
                        value={editFormData.title}
                        onChange={e => setEditFormData({ ...editFormData, title: e.target.value })}
                        className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
                      <select
                        value={editFormData.category}
                        onChange={e => setEditFormData({ ...editFormData, category: e.target.value as any })}
                        className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none bg-white"
                      >
                        <option value="banners">Banners & Promotions</option>
                        <option value="products">Products & Services</option>
                        <option value="team">Staff & Team</option>
                        <option value="documents">Documents & Reports</option>
                        <option value="general">General Asset</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Alt Text (Accessibility)</label>
                      <input
                        type="text"
                        value={editFormData.altText}
                        onChange={e => setEditFormData({ ...editFormData, altText: e.target.value })}
                        className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Caption</label>
                      <input
                        type="text"
                        value={editFormData.caption}
                        onChange={e => setEditFormData({ ...editFormData, caption: e.target.value })}
                        className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Tags (comma separated)</label>
                      <input
                        type="text"
                        value={editFormData.tags}
                        onChange={e => setEditFormData({ ...editFormData, tags: e.target.value })}
                        placeholder="e.g. banking, news, report"
                        className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                      />
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setIsEditingMetadata(false)}
                        className="text-xs"
                      >
                        Cancel
                      </Button>
                      <Button
                        size="sm"
                        onClick={handleSaveMetadata}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs"
                      >
                        Save Details
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Alt Text</div>
                      <div className="text-xs text-slate-700 mt-0.5">
                        {inspectingAsset.altText || <span className="text-slate-400 italic">No alt text provided</span>}
                      </div>
                    </div>

                    <div>
                      <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Caption</div>
                      <div className="text-xs text-slate-700 mt-0.5">
                        {inspectingAsset.caption || <span className="text-slate-400 italic">No caption</span>}
                      </div>
                    </div>

                    <div>
                      <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Tags</div>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {inspectingAsset.tags && inspectingAsset.tags.length > 0 ? (
                          inspectingAsset.tags.map(t => (
                            <span key={t} className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[11px]">
                              #{t}
                            </span>
                          ))
                        ) : (
                          <span className="text-xs text-slate-400 italic">None</span>
                        )}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setIsEditingMetadata(true)}
                        className="text-xs text-slate-700 hover:bg-slate-50"
                      >
                        Edit Details
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
