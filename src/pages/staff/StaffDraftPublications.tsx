import React, { useState } from 'react';
import {
  BookOpen,
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
  Send,
  Image as ImageIcon
} from 'lucide-react';
import { useCMS } from '@/context/CMSContext';
import { useAuth } from '@/context/AuthContext';
import { Publication } from '@/types/cms';
import { Button } from '@/components/ui/button';
import { RichEditor } from '@/components/admin/RichEditor';
import { MediaPickerModal } from '@/components/admin/media/MediaPickerModal';
import { toast } from 'sonner';

export default function StaffDraftPublications() {
  const { publications, addPublication, updatePublication } = useCMS();
  const { user } = useAuth();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [editingPub, setEditingPub] = useState<Publication | null>(null);
  const [mediaPickerOpen, setMediaPickerOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: 'Bank Notice' as Publication['category'],
    excerpt: '',
    content: '',
    featuredImage: '/images/hero-home.png',
    readTime: '3 min read',
    tags: 'Banking, Notices'
  });

  const filteredPubs = publications.filter(p =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.content) {
      toast.error('Please enter article title and body content.');
      return;
    }

    if (editingPub) {
      updatePublication(
        editingPub.id,
        {
          ...formData,
          status: 'review', // Enforce review status for staff submissions
          tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean)
        },
        {
          id: user?.id || 'staff',
          name: user?.name || 'Staff Officer',
          role: 'staff'
        }
      );
      toast.success('Draft updated and submitted for Super Administrator review.');
    } else {
      addPublication(
        {
          ...formData,
          slug: formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
          featuredImage: formData.featuredImage || '/images/hero-home.png',
          author: user?.name || 'Staff Officer',
          publishDate: new Date().toISOString(),
          status: 'review', // Sent for Admin approval
          tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
          seoTitle: formData.title,
          seoDescription: formData.excerpt,
          createdBy: user?.name || 'Staff Officer'
        },
        {
          id: user?.id || 'staff',
          name: user?.name || 'Staff Officer',
          role: 'staff'
        }
      );
      toast.success('Publication created and submitted for Super Administrator approval.');
    }

    setIsCreating(false);
    setEditingPub(null);
    setFormData({
      title: '',
      slug: '',
      category: 'Bank Notice',
      excerpt: '',
      content: '',
      featuredImage: '/images/hero-home.png',
      readTime: '3 min read',
      tags: 'Banking, Notices'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold text-[#0a1e3f]">
            Staff Publication Desk
          </h1>
          <p className="text-xs text-slate-500">
            Author articles, notices, and press releases for Super Administrator approval & publishing
          </p>
        </div>

        {!isCreating && (
          <Button
            onClick={() => {
              setEditingPub(null);
              setFormData({
                title: '',
                slug: '',
                category: 'Bank Notice',
                excerpt: '',
                content: '',
                featuredImage: '/images/hero-home.png',
                readTime: '3 min read',
                tags: 'Banking, Notices'
              });
              setIsCreating(true);
            }}
            className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            <span>Create Article Draft</span>
          </Button>
        )}
      </div>

      {/* Editor Form Modal / View */}
      {isCreating ? (
        <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 sm:p-8 shadow-xs space-y-6 animate-in fade-in-50 duration-150">
          <div className="flex items-center justify-between pb-4 border-b border-[#e2e8f0]">
            <div>
              <h2 className="font-heading font-bold text-lg text-[#0a1e3f]">
                {editingPub ? 'Edit Publication Draft' : 'Draft New Publication'}
              </h2>
              <p className="text-xs text-slate-400">
                Submissions enter the <span className="font-semibold text-sky-600">Review</span> queue for Super Administrator approval.
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsCreating(false)}
              className="text-xs rounded-xl"
            >
              Cancel
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">
                  Article Headline / Title
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Q3 Financial Literacy & Community Outreach Summary"
                  className="w-full px-3.5 py-2 rounded-xl border border-[#e2e8f0] text-xs sm:text-sm focus:border-emerald-600 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#e2e8f0] text-xs sm:text-sm focus:border-emerald-600 outline-none bg-white"
                >
                  <option value="Bank Notice">Bank Notice</option>
                  <option value="Financial Report">Financial Report</option>
                  <option value="Press Release">Press Release</option>
                  <option value="Articles">Articles & Insights</option>
                  <option value="News">News & Announcements</option>
                  <option value="Statement">Official Statement</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">
                Summary / Excerpt
              </label>
              <textarea
                rows={2}
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                placeholder="Brief summary of the publication for preview listings..."
                className="w-full px-3.5 py-2 rounded-xl border border-[#e2e8f0] text-xs sm:text-sm focus:border-emerald-600 outline-none"
              />
            </div>

            {/* Featured Image Picker for Staff */}
            <div>
              <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">
                Featured Cover Image
              </label>
              <div className="flex items-center gap-4 p-3 bg-slate-50 border border-[#e2e8f0] rounded-xl">
                <div className="w-20 h-14 rounded-lg bg-slate-200 overflow-hidden shrink-0 border border-slate-300 flex items-center justify-center">
                  {formData.featuredImage ? (
                    <img
                      src={formData.featuredImage}
                      alt="Preview"
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
                    className="w-full p-2 bg-white border border-[#e2e8f0] rounded-lg text-xs font-mono text-slate-700 outline-none focus:border-emerald-600"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">Select an approved brand image or upload a new one.</p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setMediaPickerOpen(true)}
                  className="shrink-0 border-emerald-200 text-emerald-700 hover:bg-emerald-50 text-xs"
                >
                  <ImageIcon className="w-3.5 h-3.5 mr-1" />
                  Media Library
                </Button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">
                Article Body Content (Rich HTML Format)
              </label>
              <RichEditor
                value={formData.content}
                onChange={(content) => setFormData({ ...formData, content })}
                minHeight="220px"
              />
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-[#e2e8f0]">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsCreating(false)}
                className="rounded-xl text-xs"
              >
                Discard
              </Button>
              <Button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold flex items-center gap-2"
              >
                <Send className="h-4 w-4" />
                <span>Submit for Administrator Review</span>
              </Button>
            </div>
          </form>

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
            title="Select Publication Cover Image"
          />
        </div>
      ) : (
        /* Publications List */
        <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="h-4 w-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search publications by title or category..."
                className="w-full pl-10 pr-3.5 py-2 rounded-xl border border-[#e2e8f0] text-xs sm:text-sm focus:border-emerald-600 outline-none"
              />
            </div>
          </div>

          <div className="divide-y divide-slate-100">
            {filteredPubs.map((pub) => (
              <div
                key={pub.id}
                className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-[#0a1e3f]">{pub.title}</span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide ${
                        pub.status === 'published'
                          ? 'bg-emerald-100 text-emerald-800'
                          : pub.status === 'review'
                          ? 'bg-sky-100 text-sky-800'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {pub.status}
                    </span>
                    <span className="text-[10px] text-slate-400">({pub.category})</span>
                  </div>
                  <p className="text-xs text-slate-500 line-clamp-1">{pub.excerpt || pub.content}</p>
                  <p className="text-[11px] text-slate-400">Author: {pub.author} • Updated {new Date(pub.updatedAt).toLocaleDateString()}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setEditingPub(pub);
                      setFormData({
                        title: pub.title,
                        slug: pub.slug,
                        category: pub.category,
                        excerpt: pub.excerpt,
                        content: pub.content,
                        featuredImage: pub.featuredImage || '/images/hero-home.png',
                        readTime: pub.readTime || '3 min read',
                        tags: pub.tags?.join(', ') || ''
                      });
                      setIsCreating(true);
                    }}
                    className="text-xs rounded-xl flex items-center gap-1.5"
                  >
                    <Edit className="h-3.5 w-3.5 text-slate-500" />
                    <span>Edit Draft</span>
                  </Button>
                </div>
              </div>
            ))}

            {filteredPubs.length === 0 && (
              <div className="text-center py-10 text-slate-400 text-xs">
                No publications found matching your query.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
