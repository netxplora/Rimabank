import React, { useState, useRef } from 'react';
import {
  Image as ImageIcon,
  Upload,
  Link as LinkIcon,
  Search,
  Check,
  X,
  AlertCircle,
  Loader2,
  FileText,
  Filter,
  Eye,
  Plus
} from 'lucide-react';
import { useCMS } from '@/context/CMSContext';
import { useAuth } from '@/context/AuthContext';
import { MediaAsset } from '@/types/cms';
import { SupabaseSync } from '@/services/supabaseSync';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface MediaPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (url: string, asset?: MediaAsset) => void;
  currentValue?: string;
  title?: string;
  acceptedCategories?: ('banners' | 'products' | 'team' | 'documents' | 'general')[];
}

export const MediaPickerModal: React.FC<MediaPickerModalProps> = ({
  isOpen,
  onClose,
  onSelect,
  currentValue,
  title = 'Select Media Asset',
  acceptedCategories
}) => {
  const { mediaAssets, addMediaAsset } = useCMS();
  const { user } = useAuth();

  const [activeTab, setActiveTab] = useState<'library' | 'upload' | 'url'>('library');
  const [selectedAssetUrl, setSelectedAssetUrl] = useState<string>(currentValue || '');
  const [selectedAsset, setSelectedAsset] = useState<MediaAsset | null>(
    mediaAssets.find(m => m.url === currentValue) || null
  );

  // Library tab filters
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  // Upload tab state
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadPreview, setUploadPreview] = useState<string>('');
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadAltText, setUploadAltText] = useState('');
  const [uploadCategory, setUploadCategory] = useState<MediaAsset['category']>('banners');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  // URL tab state
  const [externalUrl, setExternalUrl] = useState('');
  const [urlTitle, setUrlTitle] = useState('');
  const [urlAltText, setUrlAltText] = useState('');
  const [urlCategory, setUrlCategory] = useState<MediaAsset['category']>('banners');
  const [isValidatingUrl, setIsValidatingUrl] = useState(false);
  const [urlPreviewSuccess, setUrlPreviewSuccess] = useState<boolean | null>(null);

  if (!isOpen) return null;

  // Filter active (non-archived) media assets
  const availableAssets = mediaAssets
    .filter(m => !m.isArchived)
    .filter(m => acceptedCategories ? acceptedCategories.includes(m.category) : true)
    .filter(m => categoryFilter === 'all' || m.category === categoryFilter)
    .filter(m =>
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.altText.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.fileName.toLowerCase().includes(searchQuery.toLowerCase())
    );

  // Handle local file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setUploadError('');
    if (!file) return;

    // Validate size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setUploadError('File size exceeds 10MB limit.');
      return;
    }

    // Validate format
    const allowedMime = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml', 'image/gif', 'application/pdf'];
    if (!allowedMime.includes(file.type) && !file.name.match(/\.(jpe?g|png|webp|svg|gif|pdf)$/i)) {
      setUploadError('Unsupported format. Please select JPG, PNG, WebP, SVG, or PDF.');
      return;
    }

    setUploadFile(file);
    setUploadTitle(file.name.replace(/\.[^/.]+$/, '').replace(/[_-]/g, ' '));
    setUploadAltText(file.name.replace(/\.[^/.]+$/, '').replace(/[_-]/g, ' '));
    setUploadPreview(URL.createObjectURL(file));
  };

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadFile) {
      setUploadError('Please choose a file to upload.');
      return;
    }

    setIsUploading(true);
    setUploadError('');

    try {
      // 1. Upload to Supabase Storage
      const storageResult = await SupabaseSync.uploadMediaFile(uploadFile, uploadCategory);

      // 2. Measure dimensions if image
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

      // 3. Register in CMSContext & Database
      const newAsset = await addMediaAsset(
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

      toast.success('Media asset uploaded successfully.');
      setSelectedAssetUrl(newAsset.url);
      setSelectedAsset(newAsset);
      setActiveTab('library');
      setUploadFile(null);
      setUploadPreview('');
    } catch (err: any) {
      setUploadError(err.message || 'Failed to upload asset. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleValidateAndAddUrl = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!externalUrl.trim()) return;

    setIsValidatingUrl(true);
    setUrlPreviewSuccess(null);

    try {
      // Validate image by loading it
      const img = new Image();
      img.src = externalUrl.trim();

      await new Promise((resolve, reject) => {
        img.onload = () => resolve(true);
        img.onerror = () => reject(new Error('Unable to load image from URL'));
      });

      setUrlPreviewSuccess(true);

      const newAsset = await addMediaAsset(
        {
          title: urlTitle.trim() || 'External Web Asset',
          fileName: externalUrl.split('/').pop()?.split('?')[0] || 'external-asset.jpg',
          url: externalUrl.trim(),
          fileSize: 0,
          fileType: 'image/jpeg',
          dimensions: { width: img.naturalWidth || 800, height: img.naturalHeight || 600 },
          altText: urlAltText.trim() || urlTitle.trim() || 'Imported media asset',
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
      setSelectedAssetUrl(newAsset.url);
      setSelectedAsset(newAsset);
      setActiveTab('library');
      setExternalUrl('');
      setUrlTitle('');
    } catch (err: any) {
      setUrlPreviewSuccess(false);
      toast.error('The image URL could not be loaded. Please ensure the link is direct and accessible.');
    } finally {
      setIsValidatingUrl(false);
    }
  };

  const handleConfirmSelection = () => {
    if (!selectedAssetUrl) {
      toast.error('Please select an asset from the library.');
      return;
    }
    onSelect(selectedAssetUrl, selectedAsset || undefined);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-4xl w-full flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-xl bg-sky-50 text-[#0284c7] flex items-center justify-center font-bold">
              <ImageIcon className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-sm text-[#0a1e3f]">
                {title}
              </h3>
              <p className="text-[11px] text-slate-500">
                Choose an existing asset, upload from device, or import via URL
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 border-b border-slate-100 flex items-center gap-4 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('library')}
            className={`py-3 border-b-2 flex items-center gap-1.5 transition-all ${
              activeTab === 'library'
                ? 'border-[#0284c7] text-[#0284c7] font-bold'
                : 'border-transparent text-slate-500 hover:text-[#0a1e3f]'
            }`}
          >
            <ImageIcon className="h-3.5 w-3.5" />
            <span>Media Library ({availableAssets.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('upload')}
            className={`py-3 border-b-2 flex items-center gap-1.5 transition-all ${
              activeTab === 'upload'
                ? 'border-[#0284c7] text-[#0284c7] font-bold'
                : 'border-transparent text-slate-500 hover:text-[#0a1e3f]'
            }`}
          >
            <Upload className="h-3.5 w-3.5" />
            <span>Upload from Device</span>
          </button>

          <button
            onClick={() => setActiveTab('url')}
            className={`py-3 border-b-2 flex items-center gap-1.5 transition-all ${
              activeTab === 'url'
                ? 'border-[#0284c7] text-[#0284c7] font-bold'
                : 'border-transparent text-slate-500 hover:text-[#0a1e3f]'
            }`}
          >
            <LinkIcon className="h-3.5 w-3.5" />
            <span>Add by URL</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* 1. LIBRARY TAB */}
          {activeTab === 'library' && (
            <div className="space-y-4">
              {/* Search & Category Filter */}
              <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
                <div className="relative w-full sm:w-72">
                  <Search className="h-3.5 w-3.5 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search media by title or keyword..."
                    className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs focus:border-[#0284c7] outline-none"
                  />
                </div>

                <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
                  {['all', 'banners', 'products', 'team', 'documents', 'general'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setCategoryFilter(cat)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold capitalize whitespace-nowrap transition-all ${
                        categoryFilter === cat
                          ? 'bg-[#0a1e3f] text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Grid of Assets */}
              {availableAssets.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5 max-h-[420px] overflow-y-auto pr-1">
                  {availableAssets.map((asset) => {
                    const isSelected = selectedAssetUrl === asset.url;
                    return (
                      <div
                        key={asset.id}
                        onClick={() => {
                          setSelectedAssetUrl(asset.url);
                          setSelectedAsset(asset);
                        }}
                        className={`group relative rounded-xl border-2 overflow-hidden cursor-pointer bg-slate-50 transition-all ${
                          isSelected
                            ? 'border-[#0284c7] ring-2 ring-[#0284c7]/30 shadow-md'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        {/* Aspect Container */}
                        <div className="aspect-4/3 w-full bg-slate-100 flex items-center justify-center overflow-hidden">
                          <img
                            src={asset.url}
                            alt={asset.altText || asset.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                            onError={(e) => {
                              (e.target as HTMLElement).style.display = 'none';
                            }}
                          />
                        </div>

                        {/* Selected Indicator */}
                        {isSelected && (
                          <div className="absolute top-2 right-2 h-5 w-5 rounded-full bg-[#0284c7] text-white flex items-center justify-center shadow-md">
                            <Check className="h-3 w-3" />
                          </div>
                        )}

                        {/* Asset Info Overlay */}
                        <div className="p-2 bg-white">
                          <p className="text-xs font-semibold text-[#0a1e3f] truncate">{asset.title}</p>
                          <div className="flex items-center justify-between text-[10px] text-slate-400 mt-0.5">
                            <span className="capitalize">{asset.category}</span>
                            {asset.fileSize > 0 && <span>{Math.round(asset.fileSize / 1024)} KB</span>}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-16 border-2 border-dashed border-slate-200 rounded-2xl space-y-2">
                  <ImageIcon className="h-8 w-8 text-slate-300 mx-auto" />
                  <p className="text-xs font-semibold text-[#0a1e3f]">No media assets found</p>
                  <p className="text-[11px] text-slate-400">Upload a new file or add an image by URL to get started.</p>
                  <Button
                    size="sm"
                    onClick={() => setActiveTab('upload')}
                    className="mt-2 text-xs bg-[#0284c7] text-white rounded-xl"
                  >
                    Upload First Asset
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* 2. UPLOAD TAB */}
          {activeTab === 'upload' && (
            <form onSubmit={handleUploadSubmit} className="space-y-4 max-w-xl mx-auto">
              {uploadError && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-red-500 shrink-0" />
                  <span>{uploadError}</span>
                </div>
              )}

              {/* Drag & Drop Box */}
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-slate-300 hover:border-[#0284c7] rounded-2xl p-8 text-center cursor-pointer bg-slate-50/60 hover:bg-sky-50/30 transition-all space-y-3"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/svg+xml,image/gif,application/pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />

                {uploadPreview ? (
                  <div className="space-y-3">
                    <div className="h-36 w-full max-w-sm mx-auto rounded-xl overflow-hidden border border-slate-200 bg-white">
                      <img src={uploadPreview} alt="Preview" className="w-full h-full object-contain" />
                    </div>
                    <p className="text-xs text-emerald-600 font-semibold flex items-center justify-center gap-1">
                      <Check className="h-3.5 w-3.5" /> File Selected: {uploadFile?.name} ({Math.round((uploadFile?.size || 0) / 1024)} KB)
                    </p>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setUploadFile(null);
                        setUploadPreview('');
                      }}
                      className="text-[11px] text-red-600 hover:underline"
                    >
                      Choose Different File
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="h-12 w-12 rounded-2xl bg-sky-100 text-[#0284c7] flex items-center justify-center mx-auto">
                      <Upload className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[#0a1e3f]">Click to browse or drag file here</p>
                      <p className="text-[11px] text-slate-400 mt-1">Supports JPG, PNG, WebP, SVG, and PDF (Max 10MB)</p>
                    </div>
                  </>
                )}
              </div>

              {/* Asset Metadata Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">
                    Asset Title / Label
                  </label>
                  <input
                    type="text"
                    required
                    value={uploadTitle}
                    onChange={(e) => setUploadTitle(e.target.value)}
                    placeholder="e.g. Modern POS Terminal In Action"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-[#0284c7] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">
                    Category Tag
                  </label>
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
                <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">
                  Alt Text (Accessibility & SEO)
                </label>
                <input
                  type="text"
                  value={uploadAltText}
                  onChange={(e) => setUploadAltText(e.target.value)}
                  placeholder="Describe the image for screen readers and SEO..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-[#0284c7] outline-none"
                />
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  disabled={!uploadFile || isUploading}
                  className="w-full py-2.5 rounded-xl bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-semibold flex items-center justify-center gap-2"
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Optimizing & Uploading to Storage...</span>
                    </>
                  ) : (
                    <>
                      <Upload className="h-4 w-4" />
                      <span>Upload & Add to Library</span>
                    </>
                  )}
                </Button>
              </div>
            </form>
          )}

          {/* 3. URL TAB */}
          {activeTab === 'url' && (
            <form onSubmit={handleValidateAndAddUrl} className="space-y-4 max-w-xl mx-auto">
              <div>
                <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">
                  External Image URL
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    required
                    value={externalUrl}
                    onChange={(e) => {
                      setExternalUrl(e.target.value);
                      setUrlPreviewSuccess(null);
                    }}
                    placeholder="https://images.unsplash.com/photo-..."
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-[#0284c7] outline-none font-mono"
                  />
                </div>
              </div>

              {/* URL Live Preview */}
              {externalUrl && (
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Live URL Preview</span>
                  <div className="h-40 w-full rounded-lg bg-white border border-slate-100 flex items-center justify-center overflow-hidden">
                    <img
                      src={externalUrl}
                      alt="URL Preview"
                      className="max-h-full max-w-full object-contain"
                      onLoad={() => setUrlPreviewSuccess(true)}
                      onError={() => setUrlPreviewSuccess(false)}
                    />
                  </div>
                  {urlPreviewSuccess === false && (
                    <p className="text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle className="h-3.5 w-3.5" /> Unable to load image from this URL. Please verify the link.
                    </p>
                  )}
                  {urlPreviewSuccess === true && (
                    <p className="text-xs text-emerald-600 flex items-center gap-1">
                      <Check className="h-3.5 w-3.5" /> Image successfully verified and accessible!
                    </p>
                  )}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">
                    Asset Title / Label
                  </label>
                  <input
                    type="text"
                    required
                    value={urlTitle}
                    onChange={(e) => setUrlTitle(e.target.value)}
                    placeholder="e.g. Microfinance Partner Banner"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-[#0284c7] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">
                    Category Tag
                  </label>
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

              <div>
                <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">
                  Alt Text (SEO & Screen Readers)
                </label>
                <input
                  type="text"
                  value={urlAltText}
                  onChange={(e) => setUrlAltText(e.target.value)}
                  placeholder="Describe image..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-[#0284c7] outline-none"
                />
              </div>

              <Button
                type="submit"
                disabled={!externalUrl.trim() || isValidatingUrl}
                className="w-full py-2.5 rounded-xl bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-semibold flex items-center justify-center gap-2"
              >
                {isValidatingUrl ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Verifying Image Link...</span>
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4" />
                    <span>Import & Attach URL</span>
                  </>
                )}
              </Button>
            </form>
          )}
        </div>

        {/* Footer Bar */}
        <div className="px-6 py-3.5 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/50">
          <div className="flex items-center gap-2 text-xs truncate">
            {selectedAssetUrl ? (
              <div className="flex items-center gap-2 truncate">
                <div className="h-7 w-7 rounded bg-white border border-slate-200 overflow-hidden shrink-0">
                  <img src={selectedAssetUrl} alt="Selection" className="w-full h-full object-cover" />
                </div>
                <div className="truncate">
                  <span className="font-semibold text-[#0a1e3f] block truncate">
                    {selectedAsset?.title || 'Selected Media Asset'}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono truncate block">
                    {selectedAssetUrl}
                  </span>
                </div>
              </div>
            ) : (
              <span className="text-slate-400 italic">No media asset currently selected</span>
            )}
          </div>

          <div className="flex items-center gap-2 justify-end">
            <Button
              variant="outline"
              size="sm"
              onClick={onClose}
              className="text-xs rounded-xl"
            >
              Cancel
            </Button>
            <Button
              size="sm"
              disabled={!selectedAssetUrl}
              onClick={handleConfirmSelection}
              className="bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 shadow-sm"
            >
              <Check className="h-4 w-4" />
              <span>Select & Attach</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
