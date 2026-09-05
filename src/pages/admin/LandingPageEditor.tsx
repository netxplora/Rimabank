import React, { useState } from 'react';
import {
  Save,
  RotateCcw,
  Eye,
  Plus,
  Trash2,
  CheckCircle2,
  Globe,
  ShieldCheck,
  Building,
  Users,
  Smartphone,
  MessageSquare,
  Sparkles,
  Image as ImageIcon
} from 'lucide-react';
import { MediaPickerModal } from '@/components/admin/media/MediaPickerModal';
import { useCMS } from '@/context/CMSContext';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LivePreviewDrawer } from '@/components/admin/preview/LivePreviewDrawer';
import { toast } from 'sonner';

export default function LandingPageEditor() {
  const { siteContent, updateSiteContent, resetSiteContent } = useCMS();
  const { user } = useAuth();
  const [formData, setFormData] = useState(siteContent);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [mediaPickerConfig, setMediaPickerConfig] = useState<{
    isOpen: boolean;
    onSelect: (url: string) => void;
    currentValue?: string;
  }>({
    isOpen: false,
    onSelect: () => {}
  });

  const openMediaPicker = (currentValue: string, onSelect: (url: string) => void) => {
    setMediaPickerConfig({
      isOpen: true,
      currentValue,
      onSelect: (url) => {
        onSelect(url);
        setMediaPickerConfig({ ...mediaPickerConfig, isOpen: false });
      }
    });
  };

  const handleSave = () => {
    if (!user) return;
    setIsSaving(true);
    updateSiteContent(formData, { id: user.id, name: user.name, role: user.role });
    setTimeout(() => {
      setIsSaving(false);
      toast.success('Landing page content successfully published & updated on public website!');
    }, 400);
  };

  const handleReset = () => {
    if (window.confirm('Reset all landing page content to institutional defaults?')) {
      resetSiteContent();
      setFormData(siteContent);
      toast.info('Content reset to standard defaults.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-[#e2e8f0] shadow-xs">
        <div>
          <h1 className="text-xl font-heading font-bold text-[#0a1e3f] tracking-tight">
            Landing Page Content Management
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Modify text, headlines, hero copy, features, statistics, contact info, and SEO directly.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleReset}
            className="h-9 rounded-xl border-slate-200 text-slate-600 text-xs font-semibold hover:bg-slate-100"
          >
            <RotateCcw className="h-3.5 w-3.5 mr-1 text-slate-400" />
            Reset Defaults
          </Button>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setPreviewOpen(true)}
            className="h-9 rounded-xl border-sky-200 text-[#0284c7] text-xs font-semibold hover:bg-sky-50"
          >
            <Eye className="h-3.5 w-3.5 mr-1" />
            Live Preview
          </Button>

          <Button
            type="button"
            size="sm"
            onClick={handleSave}
            disabled={isSaving}
            className="h-9 rounded-xl bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-semibold shadow-sm"
          >
            <Save className="h-3.5 w-3.5 mr-1" />
            {isSaving ? 'Publishing Changes...' : 'Save & Publish Live'}
          </Button>
        </div>
      </div>

      {/* Main Tabs Container */}
      <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 shadow-xs">
        <Tabs defaultValue="hero" className="w-full">
          <TabsList className="flex overflow-x-auto gap-2 bg-slate-100 p-1.5 rounded-xl mb-6 w-full scrollbar-hide">
            <TabsTrigger value="hero" className="rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 px-4">
              Hero Section
            </TabsTrigger>
            <TabsTrigger value="stats" className="rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 px-4">
              Trust & Stats
            </TabsTrigger>
            <TabsTrigger value="about" className="rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 px-4">
              About & Purpose
            </TabsTrigger>
            <TabsTrigger value="products" className="rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 px-4">
              Products
            </TabsTrigger>
            <TabsTrigger value="specialized" className="rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 px-4">
              Specialized
            </TabsTrigger>
            <TabsTrigger value="testimonials" className="rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 px-4">
              Testimonials
            </TabsTrigger>
            <TabsTrigger value="branches" className="rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 px-4">
              Branches
            </TabsTrigger>
            <TabsTrigger value="seo" className="rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 px-4">
              SEO & Footer
            </TabsTrigger>
          </TabsList>

          {/* TAB 1: HERO SECTION */}
          <TabsContent value="hero" className="space-y-4">
            <div className="border-b border-slate-100 pb-3 mb-4">
              <h3 className="font-heading font-bold text-sm text-[#0a1e3f]">
                Hero Banner Content
              </h3>
              <p className="text-xs text-slate-400">Main headline, supporting narrative, and primary call to actions.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">
                  Eyebrow Badge Text
                </label>
                <input
                  type="text"
                  value={formData.hero.eyebrow}
                  onChange={(e) => setFormData({ ...formData, hero: { ...formData.hero, eyebrow: e.target.value } })}
                  className="w-full p-2.5 rounded-xl border border-[#e2e8f0] text-xs font-medium focus:border-[#0284c7] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">
                  Heading Line 1
                </label>
                <input
                  type="text"
                  value={formData.hero.headingPart1}
                  onChange={(e) => setFormData({ ...formData, hero: { ...formData.hero, headingPart1: e.target.value } })}
                  className="w-full p-2.5 rounded-xl border border-[#e2e8f0] text-xs font-medium focus:border-[#0284c7] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">
                  Heading Highlight (Sky Blue)
                </label>
                <input
                  type="text"
                  value={formData.hero.headingHighlight}
                  onChange={(e) => setFormData({ ...formData, hero: { ...formData.hero, headingHighlight: e.target.value } })}
                  className="w-full p-2.5 rounded-xl border border-[#e2e8f0] text-xs font-medium focus:border-[#0284c7] outline-none"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">
                  Heading Line 2
                </label>
                <input
                  type="text"
                  value={formData.hero.headingPart2}
                  onChange={(e) => setFormData({ ...formData, hero: { ...formData.hero, headingPart2: e.target.value } })}
                  className="w-full p-2.5 rounded-xl border border-[#e2e8f0] text-xs font-medium focus:border-[#0284c7] outline-none"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">
                  Supporting Value Proposition Paragraph
                </label>
                <textarea
                  rows={3}
                  value={formData.hero.description}
                  onChange={(e) => setFormData({ ...formData, hero: { ...formData.hero, description: e.target.value } })}
                  className="w-full p-2.5 rounded-xl border border-[#e2e8f0] text-xs font-medium focus:border-[#0284c7] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">
                  Primary CTA Button Label
                </label>
                <input
                  type="text"
                  value={formData.hero.primaryCtaText}
                  onChange={(e) => setFormData({ ...formData, hero: { ...formData.hero, primaryCtaText: e.target.value } })}
                  className="w-full p-2.5 rounded-xl border border-[#e2e8f0] text-xs font-medium focus:border-[#0284c7] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">
                  Primary CTA Link Path
                </label>
                <input
                  type="text"
                  value={formData.hero.primaryCtaLink}
                  onChange={(e) => setFormData({ ...formData, hero: { ...formData.hero, primaryCtaLink: e.target.value } })}
                  className="w-full p-2.5 rounded-xl border border-[#e2e8f0] text-xs font-medium focus:border-[#0284c7] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">
                  Secondary CTA Button Label
                </label>
                <input
                  type="text"
                  value={formData.hero.secondaryCtaText}
                  onChange={(e) => setFormData({ ...formData, hero: { ...formData.hero, secondaryCtaText: e.target.value } })}
                  className="w-full p-2.5 rounded-xl border border-[#e2e8f0] text-xs font-medium focus:border-[#0284c7] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">
                  Secondary CTA Link Path
                </label>
                <input
                  type="text"
                  value={formData.hero.secondaryCtaLink}
                  onChange={(e) => setFormData({ ...formData, hero: { ...formData.hero, secondaryCtaLink: e.target.value } })}
                  className="w-full p-2.5 rounded-xl border border-[#e2e8f0] text-xs font-medium focus:border-[#0284c7] outline-none"
                />
              </div>

              {/* NEW HERO FIELDS */}
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">
                  Hero Image
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={formData.hero.heroImage}
                    onChange={(e) => setFormData({ ...formData, hero: { ...formData.hero, heroImage: e.target.value } })}
                    className="flex-1 p-2.5 rounded-xl border border-[#e2e8f0] text-xs font-medium focus:border-[#0284c7] outline-none"
                    placeholder="/images/hero-home.png"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => openMediaPicker(formData.hero.heroImage, (url) => setFormData({ ...formData, hero: { ...formData.hero, heroImage: url } }))}
                    className="h-10 px-4 rounded-xl text-xs font-semibold"
                  >
                    <ImageIcon className="h-4 w-4 mr-2" /> Select Media
                  </Button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">Support Phone</label>
                <input
                  type="text"
                  value={formData.hero.supportPhone}
                  onChange={(e) => setFormData({ ...formData, hero: { ...formData.hero, supportPhone: e.target.value } })}
                  className="w-full p-2.5 rounded-xl border border-[#e2e8f0] text-xs font-medium focus:border-[#0284c7] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">Support Email</label>
                <input
                  type="text"
                  value={formData.hero.supportEmail}
                  onChange={(e) => setFormData({ ...formData, hero: { ...formData.hero, supportEmail: e.target.value } })}
                  className="w-full p-2.5 rounded-xl border border-[#e2e8f0] text-xs font-medium focus:border-[#0284c7] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">Active Users Count</label>
                <input
                  type="text"
                  value={formData.hero.activeUsersCount}
                  onChange={(e) => setFormData({ ...formData, hero: { ...formData.hero, activeUsersCount: e.target.value } })}
                  className="w-full p-2.5 rounded-xl border border-[#e2e8f0] text-xs font-medium focus:border-[#0284c7] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">Active Users Label</label>
                <input
                  type="text"
                  value={formData.hero.activeUsersLabel}
                  onChange={(e) => setFormData({ ...formData, hero: { ...formData.hero, activeUsersLabel: e.target.value } })}
                  className="w-full p-2.5 rounded-xl border border-[#e2e8f0] text-xs font-medium focus:border-[#0284c7] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">Rating Score</label>
                <input
                  type="text"
                  value={formData.hero.ratingScore}
                  onChange={(e) => setFormData({ ...formData, hero: { ...formData.hero, ratingScore: e.target.value } })}
                  className="w-full p-2.5 rounded-xl border border-[#e2e8f0] text-xs font-medium focus:border-[#0284c7] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">Rating Label</label>
                <input
                  type="text"
                  value={formData.hero.ratingLabel}
                  onChange={(e) => setFormData({ ...formData, hero: { ...formData.hero, ratingLabel: e.target.value } })}
                  className="w-full p-2.5 rounded-xl border border-[#e2e8f0] text-xs font-medium focus:border-[#0284c7] outline-none"
                />
              </div>
            </div>
          </TabsContent>

          {/* TAB 2: TRUST STATS */}
          <TabsContent value="stats" className="space-y-4">
            <div className="border-b border-slate-100 pb-3 mb-4">
              <h3 className="font-heading font-bold text-sm text-[#0a1e3f]">
                Institutional Trust Indicators & Statistics
              </h3>
              <p className="text-xs text-slate-400">Counters showcasing deposit protection, funding capacity, and uptime.</p>
            </div>

            <div className="space-y-3">
              {formData.trustStats.map((stat, idx) => (
                <div key={stat.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                      Statistic Value (e.g. ₦15B+)
                    </label>
                    <input
                      type="text"
                      value={stat.value}
                      onChange={(e) => {
                        const updated = [...formData.trustStats];
                        updated[idx].value = e.target.value;
                        setFormData({ ...formData, trustStats: updated });
                      }}
                      className="w-full p-2 rounded-lg bg-white border border-[#e2e8f0] text-xs font-bold text-[#0a1e3f]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                      Label
                    </label>
                    <input
                      type="text"
                      value={stat.label}
                      onChange={(e) => {
                        const updated = [...formData.trustStats];
                        updated[idx].label = e.target.value;
                        setFormData({ ...formData, trustStats: updated });
                      }}
                      className="w-full p-2 rounded-lg bg-white border border-[#e2e8f0] text-xs font-semibold text-[#0a1e3f]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                      Subtitle / Impact Statement
                    </label>
                    <input
                      type="text"
                      value={stat.description || ''}
                      onChange={(e) => {
                        const updated = [...formData.trustStats];
                        updated[idx].description = e.target.value;
                        setFormData({ ...formData, trustStats: updated });
                      }}
                      className="w-full p-2 rounded-lg bg-white border border-[#e2e8f0] text-xs font-normal text-slate-600"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">
                CBN & NDIC Regulatory Disclosure Bar Text
              </label>
              <textarea
                rows={2}
                value={formData.regulatoryText}
                onChange={(e) => setFormData({ ...formData, regulatoryText: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-[#e2e8f0] text-xs font-medium focus:border-[#0284c7] outline-none"
              />
            </div>
          </TabsContent>

          {/* TAB 3: ABOUT & PURPOSE */}
          <TabsContent value="about" className="space-y-4">
            <div className="border-b border-slate-100 pb-3 mb-4">
              <h3 className="font-heading font-bold text-sm text-[#0a1e3f]">
                Institutional Purpose & Heritage Narrative
              </h3>
              <p className="text-xs text-slate-400">About section copy, mission, vision, and heritage statements.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">
                  About Section Eyebrow
                </label>
                <input
                  type="text"
                  value={formData.aboutSnapshot.eyebrow}
                  onChange={(e) => setFormData({ ...formData, aboutSnapshot: { ...formData.aboutSnapshot, eyebrow: e.target.value } })}
                  className="w-full p-2.5 rounded-xl border border-[#e2e8f0] text-xs font-medium focus:border-[#0284c7] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">
                  Section Headline
                </label>
                <input
                  type="text"
                  value={formData.aboutSnapshot.heading}
                  onChange={(e) => setFormData({ ...formData, aboutSnapshot: { ...formData.aboutSnapshot, heading: e.target.value } })}
                  className="w-full p-2.5 rounded-xl border border-[#e2e8f0] text-xs font-medium focus:border-[#0284c7] outline-none"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">
                  Narrative Paragraph 1
                </label>
                <textarea
                  rows={3}
                  value={formData.aboutSnapshot.description1}
                  onChange={(e) => setFormData({ ...formData, aboutSnapshot: { ...formData.aboutSnapshot, description1: e.target.value } })}
                  className="w-full p-2.5 rounded-xl border border-[#e2e8f0] text-xs font-medium focus:border-[#0284c7] outline-none"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">
                  Narrative Paragraph 2
                </label>
                <textarea
                  rows={3}
                  value={formData.aboutSnapshot.description2}
                  onChange={(e) => setFormData({ ...formData, aboutSnapshot: { ...formData.aboutSnapshot, description2: e.target.value } })}
                  className="w-full p-2.5 rounded-xl border border-[#e2e8f0] text-xs font-medium focus:border-[#0284c7] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">
                  Mission Statement
                </label>
                <textarea
                  rows={2}
                  value={formData.aboutSnapshot.mission}
                  onChange={(e) => setFormData({ ...formData, aboutSnapshot: { ...formData.aboutSnapshot, mission: e.target.value } })}
                  className="w-full p-2.5 rounded-xl border border-[#e2e8f0] text-xs font-medium focus:border-[#0284c7] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">
                  Vision Statement
                </label>
                <textarea
                  rows={2}
                  value={formData.aboutSnapshot.vision}
                  onChange={(e) => setFormData({ ...formData, aboutSnapshot: { ...formData.aboutSnapshot, vision: e.target.value } })}
                  className="w-full p-2.5 rounded-xl border border-[#e2e8f0] text-xs font-medium focus:border-[#0284c7] outline-none"
                />
              </div>
            </div>

            {/* About Stats */}
            <div className="mt-6 pt-6 border-t border-slate-100">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="font-heading font-bold text-xs text-[#0a1e3f]">About Section Statistics</h4>
                  <p className="text-[11px] text-slate-500">Key performance numbers shown in the about section.</p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setFormData({
                    ...formData,
                    aboutSnapshot: {
                      ...formData.aboutSnapshot,
                      stats: [...(formData.aboutSnapshot.stats || []), { value: '', label: '' }]
                    }
                  })}
                  className="h-8 text-xs"
                >
                  <Plus className="h-3.5 w-3.5 mr-1" /> Add Stat
                </Button>
              </div>

              <div className="space-y-3">
                {formData.aboutSnapshot.stats?.map((stat, idx) => (
                  <div key={idx} className="flex gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl items-end">
                    <div className="flex-1">
                      <label className="block text-[10px] font-semibold text-slate-500 mb-1">Value (e.g. 100K+)</label>
                      <input
                        type="text"
                        value={stat.value}
                        onChange={(e) => {
                          const updated = [...(formData.aboutSnapshot.stats || [])];
                          updated[idx].value = e.target.value;
                          setFormData({ ...formData, aboutSnapshot: { ...formData.aboutSnapshot, stats: updated } });
                        }}
                        className="w-full p-2 rounded-lg bg-white border border-[#e2e8f0] text-xs font-bold text-[#0a1e3f]"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-[10px] font-semibold text-slate-500 mb-1">Label (e.g. Active Customers)</label>
                      <input
                        type="text"
                        value={stat.label}
                        onChange={(e) => {
                          const updated = [...(formData.aboutSnapshot.stats || [])];
                          updated[idx].label = e.target.value;
                          setFormData({ ...formData, aboutSnapshot: { ...formData.aboutSnapshot, stats: updated } });
                        }}
                        className="w-full p-2 rounded-lg bg-white border border-[#e2e8f0] text-xs text-[#0a1e3f]"
                      />
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        const updated = formData.aboutSnapshot.stats?.filter((_, i) => i !== idx) || [];
                        setFormData({ ...formData, aboutSnapshot: { ...formData.aboutSnapshot, stats: updated } });
                      }}
                      className="h-9 px-2 text-red-500 hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                {(!formData.aboutSnapshot.stats || formData.aboutSnapshot.stats.length === 0) && (
                  <div className="text-center py-4 text-xs text-slate-400 border border-dashed border-slate-200 rounded-xl">
                    No statistics added. Click "Add Stat" to create one.
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          {/* TAB 4: PRODUCTS */}
          <TabsContent value="products" className="space-y-4">
            <div className="border-b border-slate-100 pb-3 mb-4 flex items-center justify-between">
              <div>
                <h3 className="font-heading font-bold text-sm text-[#0a1e3f]">
                  Banking Products & Services Catalog
                </h3>
                <p className="text-xs text-slate-400">Featured accounts, savings structures, and commercial credit facilities.</p>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setFormData({
                  ...formData,
                  products: [
                    ...formData.products,
                    { id: Date.now().toString(), title: '', description: '', iconName: '', link: '', badge: '', highlighted: false }
                  ]
                })}
                className="h-8 text-xs"
              >
                <Plus className="h-3.5 w-3.5 mr-1" /> Add Product
              </Button>
            </div>

            <div className="space-y-4">
              {formData.products.map((prod, idx) => (
                <div key={prod.id || idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 relative">
                  <div className="absolute top-2 right-2">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        const updated = formData.products.filter((_, i) => i !== idx);
                        setFormData({ ...formData, products: updated });
                      }}
                      className="h-8 w-8 p-0 text-red-500 hover:bg-red-50 hover:text-red-600 rounded-full"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pr-8">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                        Product Name
                      </label>
                      <input
                        type="text"
                        value={prod.title}
                        onChange={(e) => {
                          const updated = [...formData.products];
                          updated[idx].title = e.target.value;
                          setFormData({ ...formData, products: updated });
                        }}
                        className="w-full p-2 rounded-lg bg-white border border-[#e2e8f0] text-xs font-bold text-[#0a1e3f]"
                      />
                    </div>

                    <div className="lg:col-span-2">
                      <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                        Brief Description
                      </label>
                      <input
                        type="text"
                        value={prod.description}
                        onChange={(e) => {
                          const updated = [...formData.products];
                          updated[idx].description = e.target.value;
                          setFormData({ ...formData, products: updated });
                        }}
                        className="w-full p-2 rounded-lg bg-white border border-[#e2e8f0] text-xs font-normal text-slate-600"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                        Link Destination
                      </label>
                      <input
                        type="text"
                        value={prod.link}
                        onChange={(e) => {
                          const updated = [...formData.products];
                          updated[idx].link = e.target.value;
                          setFormData({ ...formData, products: updated });
                        }}
                        className="w-full p-2 rounded-lg bg-white border border-[#e2e8f0] text-xs font-mono text-[#0284c7]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                        Lucide Icon Name
                      </label>
                      <input
                        type="text"
                        value={prod.iconName || ''}
                        onChange={(e) => {
                          const updated = [...formData.products];
                          updated[idx].iconName = e.target.value;
                          setFormData({ ...formData, products: updated });
                        }}
                        className="w-full p-2 rounded-lg bg-white border border-[#e2e8f0] text-xs font-mono text-[#10b981]"
                        placeholder="e.g. Wallet, Briefcase"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                        Badge Text (Optional)
                      </label>
                      <input
                        type="text"
                        value={prod.badge || ''}
                        onChange={(e) => {
                          const updated = [...formData.products];
                          updated[idx].badge = e.target.value;
                          setFormData({ ...formData, products: updated });
                        }}
                        className="w-full p-2 rounded-lg bg-white border border-[#e2e8f0] text-xs font-normal text-amber-600"
                        placeholder="e.g. Popular, New"
                      />
                    </div>

                    <div className="flex items-center gap-2 mt-1">
                      <input
                        type="checkbox"
                        checked={prod.highlighted || false}
                        onChange={(e) => {
                          const updated = [...formData.products];
                          updated[idx].highlighted = e.target.checked;
                          setFormData({ ...formData, products: updated });
                        }}
                        className="h-4 w-4 rounded border-slate-300 text-[#0284c7] focus:ring-[#0284c7]"
                        id={`highlighted-${idx}`}
                      />
                      <label htmlFor={`highlighted-${idx}`} className="text-xs font-semibold text-slate-600 cursor-pointer">
                        Highlight this product (Primary Card)
                      </label>
                    </div>
                  </div>
                </div>
              ))}
              {formData.products.length === 0 && (
                <div className="text-center py-6 text-xs text-slate-400 border border-dashed border-slate-200 rounded-xl">
                  No products added. Click "Add Product" to create one.
                </div>
              )}
            </div>
          </TabsContent>

          {/* TAB 5: SME, AGENT & SPECIALIZED */}
          <TabsContent value="specialized" className="space-y-4">
            <div className="border-b border-slate-100 pb-3 mb-4">
              <h3 className="font-heading font-bold text-sm text-[#0a1e3f]">
                Specialized Banking Sections
              </h3>
              <p className="text-xs text-slate-400">Configure POS agency, SME, Student, and Security sections.</p>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {/* Agent Banking */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <h4 className="font-heading font-bold text-xs text-[#0a1e3f] uppercase tracking-wider text-sky-700">
                  Agent Banking Section
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-500 mb-1">Badge</label>
                    <input
                      type="text"
                      value={formData.agentBanking?.badge || ''}
                      onChange={(e) => setFormData({ ...formData, agentBanking: { ...formData.agentBanking, badge: e.target.value } })}
                      className="w-full p-2 rounded-lg bg-white border border-[#e2e8f0] text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-500 mb-1">Heading</label>
                    <input
                      type="text"
                      value={formData.agentBanking?.heading || ''}
                      onChange={(e) => setFormData({ ...formData, agentBanking: { ...formData.agentBanking, heading: e.target.value } })}
                      className="w-full p-2 rounded-lg bg-white border border-[#e2e8f0] text-xs font-semibold text-[#0a1e3f]"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-[11px] font-semibold text-slate-500 mb-1">Description</label>
                    <textarea
                      rows={2}
                      value={formData.agentBanking?.description || ''}
                      onChange={(e) => setFormData({ ...formData, agentBanking: { ...formData.agentBanking, description: e.target.value } })}
                      className="w-full p-2 rounded-lg bg-white border border-[#e2e8f0] text-xs text-slate-600"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-500 mb-1">CTA Text</label>
                    <input
                      type="text"
                      value={formData.agentBanking?.ctaText || ''}
                      onChange={(e) => setFormData({ ...formData, agentBanking: { ...formData.agentBanking, ctaText: e.target.value } })}
                      className="w-full p-2 rounded-lg bg-white border border-[#e2e8f0] text-xs font-bold text-[#0a1e3f]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-500 mb-1">CTA Link</label>
                    <input
                      type="text"
                      value={formData.agentBanking?.ctaLink || ''}
                      onChange={(e) => setFormData({ ...formData, agentBanking: { ...formData.agentBanking, ctaLink: e.target.value } })}
                      className="w-full p-2 rounded-lg bg-white border border-[#e2e8f0] text-xs font-mono text-[#0284c7]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-500 mb-1">Stat Value</label>
                    <input
                      type="text"
                      value={formData.agentBanking?.statValue || ''}
                      onChange={(e) => setFormData({ ...formData, agentBanking: { ...formData.agentBanking, statValue: e.target.value } })}
                      className="w-full p-2 rounded-lg bg-white border border-[#e2e8f0] text-xs font-bold text-[#0a1e3f]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-500 mb-1">Stat Label</label>
                    <input
                      type="text"
                      value={formData.agentBanking?.statLabel || ''}
                      onChange={(e) => setFormData({ ...formData, agentBanking: { ...formData.agentBanking, statLabel: e.target.value } })}
                      className="w-full p-2 rounded-lg bg-white border border-[#e2e8f0] text-xs"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <div className="flex justify-between items-center mb-1">
                      <label className="block text-[11px] font-semibold text-slate-500">Features</label>
                      <Button
                        type="button" variant="outline" size="sm"
                        onClick={() => setFormData({ ...formData, agentBanking: { ...formData.agentBanking, features: [...(formData.agentBanking?.features || []), ''] } })}
                        className="h-6 px-2 text-[10px]"
                      >
                        <Plus className="h-3 w-3 mr-1" /> Add Feature
                      </Button>
                    </div>
                    <div className="space-y-2">
                      {(formData.agentBanking?.features || []).map((feature, idx) => (
                        <div key={idx} className="flex gap-2">
                          <input
                            type="text"
                            value={feature}
                            onChange={(e) => {
                              const updated = [...(formData.agentBanking?.features || [])];
                              updated[idx] = e.target.value;
                              setFormData({ ...formData, agentBanking: { ...formData.agentBanking, features: updated } });
                            }}
                            className="flex-1 p-2 rounded-lg bg-white border border-[#e2e8f0] text-xs"
                          />
                          <Button
                            type="button" variant="ghost" size="sm"
                            onClick={() => {
                              const updated = (formData.agentBanking?.features || []).filter((_, i) => i !== idx);
                              setFormData({ ...formData, agentBanking: { ...formData.agentBanking, features: updated } });
                            }}
                            className="h-8 w-8 p-0 text-red-500"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* SME Banking */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <h4 className="font-heading font-bold text-xs text-[#0a1e3f] uppercase tracking-wider text-emerald-700">
                  SME Banking Section
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-500 mb-1">Badge</label>
                    <input
                      type="text"
                      value={formData.smeBanking?.badge || ''}
                      onChange={(e) => setFormData({ ...formData, smeBanking: { ...formData.smeBanking, badge: e.target.value } })}
                      className="w-full p-2 rounded-lg bg-white border border-[#e2e8f0] text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-500 mb-1">Heading</label>
                    <input
                      type="text"
                      value={formData.smeBanking?.heading || ''}
                      onChange={(e) => setFormData({ ...formData, smeBanking: { ...formData.smeBanking, heading: e.target.value } })}
                      className="w-full p-2 rounded-lg bg-white border border-[#e2e8f0] text-xs font-semibold text-[#0a1e3f]"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-[11px] font-semibold text-slate-500 mb-1">Description</label>
                    <textarea
                      rows={2}
                      value={formData.smeBanking?.description || ''}
                      onChange={(e) => setFormData({ ...formData, smeBanking: { ...formData.smeBanking, description: e.target.value } })}
                      className="w-full p-2 rounded-lg bg-white border border-[#e2e8f0] text-xs text-slate-600"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-500 mb-1">CTA Text</label>
                    <input
                      type="text"
                      value={formData.smeBanking?.ctaText || ''}
                      onChange={(e) => setFormData({ ...formData, smeBanking: { ...formData.smeBanking, ctaText: e.target.value } })}
                      className="w-full p-2 rounded-lg bg-white border border-[#e2e8f0] text-xs font-bold text-[#0a1e3f]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-500 mb-1">CTA Link</label>
                    <input
                      type="text"
                      value={formData.smeBanking?.ctaLink || ''}
                      onChange={(e) => setFormData({ ...formData, smeBanking: { ...formData.smeBanking, ctaLink: e.target.value } })}
                      className="w-full p-2 rounded-lg bg-white border border-[#e2e8f0] text-xs font-mono text-[#0284c7]"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <div className="flex justify-between items-center mb-1">
                      <label className="block text-[11px] font-semibold text-slate-500">Benefits</label>
                      <Button
                        type="button" variant="outline" size="sm"
                        onClick={() => setFormData({ ...formData, smeBanking: { ...formData.smeBanking, benefits: [...(formData.smeBanking?.benefits || []), ''] } })}
                        className="h-6 px-2 text-[10px]"
                      >
                        <Plus className="h-3 w-3 mr-1" /> Add Benefit
                      </Button>
                    </div>
                    <div className="space-y-2">
                      {(formData.smeBanking?.benefits || []).map((benefit, idx) => (
                        <div key={idx} className="flex gap-2">
                          <input
                            type="text"
                            value={benefit}
                            onChange={(e) => {
                              const updated = [...(formData.smeBanking?.benefits || [])];
                              updated[idx] = e.target.value;
                              setFormData({ ...formData, smeBanking: { ...formData.smeBanking, benefits: updated } });
                            }}
                            className="flex-1 p-2 rounded-lg bg-white border border-[#e2e8f0] text-xs"
                          />
                          <Button
                            type="button" variant="ghost" size="sm"
                            onClick={() => {
                              const updated = (formData.smeBanking?.benefits || []).filter((_, i) => i !== idx);
                              setFormData({ ...formData, smeBanking: { ...formData.smeBanking, benefits: updated } });
                            }}
                            className="h-8 w-8 p-0 text-red-500"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Student Banking */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <h4 className="font-heading font-bold text-xs text-[#0a1e3f] uppercase tracking-wider text-purple-700">
                  Student Banking Section
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-500 mb-1">Badge</label>
                    <input
                      type="text"
                      value={formData.studentBanking?.badge || ''}
                      onChange={(e) => setFormData({ ...formData, studentBanking: { ...(formData.studentBanking || {}), badge: e.target.value } as any })}
                      className="w-full p-2 rounded-lg bg-white border border-[#e2e8f0] text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-500 mb-1">Heading</label>
                    <input
                      type="text"
                      value={formData.studentBanking?.heading || ''}
                      onChange={(e) => setFormData({ ...formData, studentBanking: { ...(formData.studentBanking || {}), heading: e.target.value } as any })}
                      className="w-full p-2 rounded-lg bg-white border border-[#e2e8f0] text-xs font-semibold text-[#0a1e3f]"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-[11px] font-semibold text-slate-500 mb-1">Description</label>
                    <textarea
                      rows={2}
                      value={formData.studentBanking?.description || ''}
                      onChange={(e) => setFormData({ ...formData, studentBanking: { ...(formData.studentBanking || {}), description: e.target.value } as any })}
                      className="w-full p-2 rounded-lg bg-white border border-[#e2e8f0] text-xs text-slate-600"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-500 mb-1">CTA Text</label>
                    <input
                      type="text"
                      value={formData.studentBanking?.ctaText || ''}
                      onChange={(e) => setFormData({ ...formData, studentBanking: { ...(formData.studentBanking || {}), ctaText: e.target.value } as any })}
                      className="w-full p-2 rounded-lg bg-white border border-[#e2e8f0] text-xs font-bold text-[#0a1e3f]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-500 mb-1">CTA Link</label>
                    <input
                      type="text"
                      value={formData.studentBanking?.ctaLink || ''}
                      onChange={(e) => setFormData({ ...formData, studentBanking: { ...(formData.studentBanking || {}), ctaLink: e.target.value } as any })}
                      className="w-full p-2 rounded-lg bg-white border border-[#e2e8f0] text-xs font-mono text-[#0284c7]"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <div className="flex justify-between items-center mb-1">
                      <label className="block text-[11px] font-semibold text-slate-500">Benefits</label>
                      <Button
                        type="button" variant="outline" size="sm"
                        onClick={() => setFormData({ ...formData, studentBanking: { ...(formData.studentBanking || {}), benefits: [...(formData.studentBanking?.benefits || []), ''] } as any })}
                        className="h-6 px-2 text-[10px]"
                      >
                        <Plus className="h-3 w-3 mr-1" /> Add Benefit
                      </Button>
                    </div>
                    <div className="space-y-2">
                      {(formData.studentBanking?.benefits || []).map((benefit, idx) => (
                        <div key={idx} className="flex gap-2">
                          <input
                            type="text"
                            value={benefit}
                            onChange={(e) => {
                              const updated = [...(formData.studentBanking?.benefits || [])];
                              updated[idx] = e.target.value;
                              setFormData({ ...formData, studentBanking: { ...(formData.studentBanking || {}), benefits: updated } as any });
                            }}
                            className="flex-1 p-2 rounded-lg bg-white border border-[#e2e8f0] text-xs"
                          />
                          <Button
                            type="button" variant="ghost" size="sm"
                            onClick={() => {
                              const updated = (formData.studentBanking?.benefits || []).filter((_, i) => i !== idx);
                              setFormData({ ...formData, studentBanking: { ...(formData.studentBanking || {}), benefits: updated } as any });
                            }}
                            className="h-8 w-8 p-0 text-red-500"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Security Section */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <h4 className="font-heading font-bold text-xs text-[#0a1e3f] uppercase tracking-wider text-rose-700">
                  Security Section
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-500 mb-1">Badge</label>
                    <input
                      type="text"
                      value={formData.securitySection?.badge || ''}
                      onChange={(e) => setFormData({ ...formData, securitySection: { ...(formData.securitySection || {}), badge: e.target.value } as any })}
                      className="w-full p-2 rounded-lg bg-white border border-[#e2e8f0] text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-500 mb-1">Heading</label>
                    <input
                      type="text"
                      value={formData.securitySection?.heading || ''}
                      onChange={(e) => setFormData({ ...formData, securitySection: { ...(formData.securitySection || {}), heading: e.target.value } as any })}
                      className="w-full p-2 rounded-lg bg-white border border-[#e2e8f0] text-xs font-semibold text-[#0a1e3f]"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-[11px] font-semibold text-slate-500 mb-1">Description</label>
                    <textarea
                      rows={2}
                      value={formData.securitySection?.description || ''}
                      onChange={(e) => setFormData({ ...formData, securitySection: { ...(formData.securitySection || {}), description: e.target.value } as any })}
                      className="w-full p-2 rounded-lg bg-white border border-[#e2e8f0] text-xs text-slate-600"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <div className="flex justify-between items-center mb-1">
                      <label className="block text-[11px] font-semibold text-slate-500">Security Features</label>
                      <Button
                        type="button" variant="outline" size="sm"
                        onClick={() => setFormData({ ...formData, securitySection: { ...(formData.securitySection || {}), features: [...(formData.securitySection?.features || []), { title: '', desc: '' }] } as any })}
                        className="h-6 px-2 text-[10px]"
                      >
                        <Plus className="h-3 w-3 mr-1" /> Add Feature
                      </Button>
                    </div>
                    <div className="space-y-3">
                      {(formData.securitySection?.features || []).map((feature, idx) => (
                        <div key={idx} className="flex gap-3 p-3 bg-white border border-slate-200 rounded-xl items-end">
                          <div className="flex-1">
                            <label className="block text-[10px] font-semibold text-slate-500 mb-1">Feature Title</label>
                            <input
                              type="text"
                              value={feature.title}
                              onChange={(e) => {
                                const updated = [...(formData.securitySection?.features || [])];
                                updated[idx].title = e.target.value;
                                setFormData({ ...formData, securitySection: { ...(formData.securitySection || {}), features: updated } as any });
                              }}
                              className="w-full p-2 rounded-lg bg-white border border-[#e2e8f0] text-xs font-bold text-[#0a1e3f]"
                            />
                          </div>
                          <div className="flex-1">
                            <label className="block text-[10px] font-semibold text-slate-500 mb-1">Feature Description</label>
                            <input
                              type="text"
                              value={feature.desc}
                              onChange={(e) => {
                                const updated = [...(formData.securitySection?.features || [])];
                                updated[idx].desc = e.target.value;
                                setFormData({ ...formData, securitySection: { ...(formData.securitySection || {}), features: updated } as any });
                              }}
                              className="w-full p-2 rounded-lg bg-white border border-[#e2e8f0] text-xs text-slate-600"
                            />
                          </div>
                          <Button
                            type="button" variant="ghost" size="sm"
                            onClick={() => {
                              const updated = (formData.securitySection?.features || []).filter((_, i) => i !== idx);
                              setFormData({ ...formData, securitySection: { ...(formData.securitySection || {}), features: updated } as any });
                            }}
                            className="h-9 px-2 text-red-500 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* TAB 6: TESTIMONIALS */}
          <TabsContent value="testimonials" className="space-y-4">
            <div className="border-b border-slate-100 pb-3 mb-4 flex justify-between items-center">
              <div>
                <h3 className="font-heading font-bold text-sm text-[#0a1e3f]">
                  Customer Testimonials & Client Endorsements
                </h3>
                <p className="text-xs text-slate-400">Authentic quotes from verified accountholders and traders.</p>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setFormData({
                  ...formData,
                  testimonials: [
                    ...formData.testimonials,
                    { id: Date.now().toString(), name: '', role: '', company: '', content: '', avatarUrl: '', rating: 5 }
                  ]
                })}
                className="h-8 text-xs"
              >
                <Plus className="h-3.5 w-3.5 mr-1" /> Add Testimonial
              </Button>
            </div>

            <div className="space-y-4">
              {formData.testimonials.map((t, idx) => (
                <div key={t.id || idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 relative">
                  <div className="absolute top-2 right-2">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        const updated = formData.testimonials.filter((_, i) => i !== idx);
                        setFormData({ ...formData, testimonials: updated });
                      }}
                      className="h-8 w-8 p-0 text-red-500 hover:bg-red-50 hover:text-red-600 rounded-full"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pr-8">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-500 mb-1">Name</label>
                      <input
                        type="text"
                        value={t.name}
                        onChange={(e) => {
                          const updated = [...formData.testimonials];
                          updated[idx].name = e.target.value;
                          setFormData({ ...formData, testimonials: updated });
                        }}
                        className="w-full p-2 rounded-lg bg-white border border-[#e2e8f0] text-xs font-bold text-[#0a1e3f]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-500 mb-1">Role (e.g. CEO)</label>
                      <input
                        type="text"
                        value={t.role}
                        onChange={(e) => {
                          const updated = [...formData.testimonials];
                          updated[idx].role = e.target.value;
                          setFormData({ ...formData, testimonials: updated });
                        }}
                        className="w-full p-2 rounded-lg bg-white border border-[#e2e8f0] text-xs font-semibold text-[#0a1e3f]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-500 mb-1">Company</label>
                      <input
                        type="text"
                        value={t.company || ''}
                        onChange={(e) => {
                          const updated = [...formData.testimonials];
                          updated[idx].company = e.target.value;
                          setFormData({ ...formData, testimonials: updated });
                        }}
                        className="w-full p-2 rounded-lg bg-white border border-[#e2e8f0] text-xs font-semibold text-[#0a1e3f]"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-[11px] font-semibold text-slate-500 mb-1">Avatar Image</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={t.avatarUrl || ''}
                          onChange={(e) => {
                            const updated = [...formData.testimonials];
                            updated[idx].avatarUrl = e.target.value;
                            setFormData({ ...formData, testimonials: updated });
                          }}
                          className="flex-1 p-2 rounded-lg bg-white border border-[#e2e8f0] text-xs font-mono text-[#0284c7]"
                          placeholder="/images/avatar.jpg"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => openMediaPicker(t.avatarUrl || '', (url) => {
                            const updated = [...formData.testimonials];
                            updated[idx].avatarUrl = url;
                            setFormData({ ...formData, testimonials: updated });
                          })}
                          className="h-8 px-3 rounded-lg text-xs"
                        >
                          <ImageIcon className="h-3 w-3 mr-1" /> Select
                        </Button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-500 mb-1">Rating (1-5)</label>
                      <input
                        type="number"
                        min="1"
                        max="5"
                        value={t.rating || 5}
                        onChange={(e) => {
                          const updated = [...formData.testimonials];
                          updated[idx].rating = parseInt(e.target.value) || 5;
                          setFormData({ ...formData, testimonials: updated });
                        }}
                        className="w-full p-2 rounded-lg bg-white border border-[#e2e8f0] text-xs font-semibold text-[#0a1e3f]"
                      />
                    </div>

                    <div className="md:col-span-3">
                      <label className="block text-[11px] font-semibold text-slate-500 mb-1">Quote Content</label>
                      <textarea
                        rows={2}
                        value={t.content}
                        onChange={(e) => {
                          const updated = [...formData.testimonials];
                          updated[idx].content = e.target.value;
                          setFormData({ ...formData, testimonials: updated });
                        }}
                        className="w-full p-2 rounded-lg bg-white border border-[#e2e8f0] text-xs text-slate-600"
                      />
                    </div>
                  </div>
                </div>
              ))}
              {formData.testimonials.length === 0 && (
                <div className="text-center py-6 text-xs text-slate-400 border border-dashed border-slate-200 rounded-xl">
                  No testimonials added. Click "Add Testimonial" to create one.
                </div>
              )}
            </div>
          </TabsContent>

          {/* TAB 7: BRANCHES */}
          <TabsContent value="branches" className="space-y-4">
            <div className="border-b border-slate-100 pb-3 mb-4 flex justify-between items-center">
              <div>
                <h3 className="font-heading font-bold text-sm text-[#0a1e3f]">
                  Branch Network Locations
                </h3>
                <p className="text-xs text-slate-400">Manage bank branch physical locations and contact details.</p>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setFormData({
                  ...formData,
                  branches: [
                    ...(formData.branches || []),
                    { id: Date.now().toString(), name: '', address: '', city: '', state: '', phone: '', email: '', hours: '', isHeadquarters: false }
                  ]
                })}
                className="h-8 text-xs"
              >
                <Plus className="h-3.5 w-3.5 mr-1" /> Add Branch
              </Button>
            </div>

            <div className="space-y-4">
              {(formData.branches || []).map((branch, idx) => (
                <div key={branch.id || idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 relative">
                  <div className="absolute top-2 right-2 flex gap-2">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        const updated = (formData.branches || []).filter((_, i) => i !== idx);
                        setFormData({ ...formData, branches: updated });
                      }}
                      className="h-8 w-8 p-0 text-red-500 hover:bg-red-50 hover:text-red-600 rounded-full"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3 pr-12">
                    <div className="md:col-span-2">
                      <label className="block text-[11px] font-semibold text-slate-500 mb-1">Branch Name</label>
                      <input
                        type="text"
                        value={branch.name}
                        onChange={(e) => {
                          const updated = [...(formData.branches || [])];
                          updated[idx].name = e.target.value;
                          setFormData({ ...formData, branches: updated });
                        }}
                        className="w-full p-2 rounded-lg bg-white border border-[#e2e8f0] text-xs font-bold text-[#0a1e3f]"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-500 mb-1">City</label>
                      <input
                        type="text"
                        value={branch.city}
                        onChange={(e) => {
                          const updated = [...(formData.branches || [])];
                          updated[idx].city = e.target.value;
                          setFormData({ ...formData, branches: updated });
                        }}
                        className="w-full p-2 rounded-lg bg-white border border-[#e2e8f0] text-xs"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-500 mb-1">State</label>
                      <input
                        type="text"
                        value={branch.state}
                        onChange={(e) => {
                          const updated = [...(formData.branches || [])];
                          updated[idx].state = e.target.value;
                          setFormData({ ...formData, branches: updated });
                        }}
                        className="w-full p-2 rounded-lg bg-white border border-[#e2e8f0] text-xs"
                      />
                    </div>

                    <div className="md:col-span-4">
                      <label className="block text-[11px] font-semibold text-slate-500 mb-1">Address</label>
                      <input
                        type="text"
                        value={branch.address}
                        onChange={(e) => {
                          const updated = [...(formData.branches || [])];
                          updated[idx].address = e.target.value;
                          setFormData({ ...formData, branches: updated });
                        }}
                        className="w-full p-2 rounded-lg bg-white border border-[#e2e8f0] text-xs text-slate-600"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-500 mb-1">Phone</label>
                      <input
                        type="text"
                        value={branch.phone}
                        onChange={(e) => {
                          const updated = [...(formData.branches || [])];
                          updated[idx].phone = e.target.value;
                          setFormData({ ...formData, branches: updated });
                        }}
                        className="w-full p-2 rounded-lg bg-white border border-[#e2e8f0] text-xs"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-500 mb-1">Email</label>
                      <input
                        type="text"
                        value={branch.email}
                        onChange={(e) => {
                          const updated = [...(formData.branches || [])];
                          updated[idx].email = e.target.value;
                          setFormData({ ...formData, branches: updated });
                        }}
                        className="w-full p-2 rounded-lg bg-white border border-[#e2e8f0] text-xs"
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-[11px] font-semibold text-slate-500 mb-1">Operating Hours</label>
                      <input
                        type="text"
                        value={branch.hours}
                        onChange={(e) => {
                          const updated = [...(formData.branches || [])];
                          updated[idx].hours = e.target.value;
                          setFormData({ ...formData, branches: updated });
                        }}
                        className="w-full p-2 rounded-lg bg-white border border-[#e2e8f0] text-xs"
                      />
                    </div>
                    
                    <div className="md:col-span-4 flex items-center gap-2 mt-1">
                      <input
                        type="checkbox"
                        checked={branch.isHeadquarters || false}
                        onChange={(e) => {
                          const updated = [...(formData.branches || [])];
                          updated[idx].isHeadquarters = e.target.checked;
                          setFormData({ ...formData, branches: updated });
                        }}
                        className="h-4 w-4 rounded border-slate-300 text-[#0284c7] focus:ring-[#0284c7]"
                        id={`hq-${idx}`}
                      />
                      <label htmlFor={`hq-${idx}`} className="text-[11px] font-semibold text-slate-600 cursor-pointer">
                        Mark as Headquarters
                      </label>
                    </div>
                  </div>
                </div>
              ))}
              {(!formData.branches || formData.branches.length === 0) && (
                <div className="text-center py-6 text-xs text-slate-400 border border-dashed border-slate-200 rounded-xl">
                  No branches added. Click "Add Branch" to create one.
                </div>
              )}
            </div>
          </TabsContent>

          {/* TAB 8: SEO & FOOTER */}
          <TabsContent value="seo" className="space-y-4">
            <div className="border-b border-slate-100 pb-3 mb-4">
              <h3 className="font-heading font-bold text-sm text-[#0a1e3f]">
                Search Engine Optimization (SEO), Contact & Footer Settings
              </h3>
              <p className="text-xs text-slate-400">Meta tags, contact information, social channels, and footer disclosures.</p>
              <div className="mt-4 text-[11px] text-slate-500 font-mono">
                - [x] Add Tab 7: Branches (dynamic array mapping for branch fields).<br />
                - [x] Update Tab 8: SEO, Contact & Footer (rename, add all missing fields, media selector for ogImage).<br />
                - [x] Ensure Save logic persists all nested arrays correctly.
              </div>
            </div>

            <div className="space-y-6">
              {/* SEO Section */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <h4 className="font-heading font-bold text-xs text-[#0a1e3f] uppercase tracking-wider">SEO Meta Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">Global Meta Title</label>
                    <input
                      type="text"
                      value={formData.seo?.metaTitle || ''}
                      onChange={(e) => setFormData({ ...formData, seo: { ...(formData.seo || {}), metaTitle: e.target.value } as any })}
                      className="w-full p-2.5 rounded-xl border border-[#e2e8f0] text-xs font-medium focus:border-[#0284c7] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">Canonical URL</label>
                    <input
                      type="text"
                      value={formData.seo?.canonicalUrl || ''}
                      onChange={(e) => setFormData({ ...formData, seo: { ...(formData.seo || {}), canonicalUrl: e.target.value } as any })}
                      className="w-full p-2.5 rounded-xl border border-[#e2e8f0] text-xs font-medium focus:border-[#0284c7] outline-none"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">Global Meta Description</label>
                    <textarea
                      rows={2}
                      value={formData.seo?.metaDescription || ''}
                      onChange={(e) => setFormData({ ...formData, seo: { ...(formData.seo || {}), metaDescription: e.target.value } as any })}
                      className="w-full p-2.5 rounded-xl border border-[#e2e8f0] text-xs font-medium focus:border-[#0284c7] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">OG Title (Social Media)</label>
                    <input
                      type="text"
                      value={formData.seo?.ogTitle || ''}
                      onChange={(e) => setFormData({ ...formData, seo: { ...(formData.seo || {}), ogTitle: e.target.value } as any })}
                      className="w-full p-2.5 rounded-xl border border-[#e2e8f0] text-xs font-medium focus:border-[#0284c7] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">OG Description</label>
                    <input
                      type="text"
                      value={formData.seo?.ogDescription || ''}
                      onChange={(e) => setFormData({ ...formData, seo: { ...(formData.seo || {}), ogDescription: e.target.value } as any })}
                      className="w-full p-2.5 rounded-xl border border-[#e2e8f0] text-xs font-medium focus:border-[#0284c7] outline-none"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">OG Image (Social Thumbnail)</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={formData.seo?.ogImage || ''}
                        onChange={(e) => setFormData({ ...formData, seo: { ...(formData.seo || {}), ogImage: e.target.value } as any })}
                        className="flex-1 p-2.5 rounded-xl border border-[#e2e8f0] text-xs font-medium focus:border-[#0284c7] outline-none"
                        placeholder="https://..."
                      />
                      <Button
                        type="button" variant="outline"
                        onClick={() => openMediaPicker(formData.seo?.ogImage || '', (url) => setFormData({ ...formData, seo: { ...(formData.seo || {}), ogImage: url } as any }))}
                        className="h-10 px-4 rounded-xl text-xs font-semibold"
                      >
                        <ImageIcon className="h-4 w-4 mr-2" /> Select Media
                      </Button>
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">Keywords (Comma separated)</label>
                    <input
                      type="text"
                      value={formData.seo?.keywords?.join(', ') || ''}
                      onChange={(e) => {
                        const kw = e.target.value.split(',').map(k => k.trim()).filter(Boolean);
                        setFormData({ ...formData, seo: { ...(formData.seo || {}), keywords: kw } as any });
                      }}
                      className="w-full p-2.5 rounded-xl border border-[#e2e8f0] text-xs font-medium focus:border-[#0284c7] outline-none"
                    />
                  </div>
                  <div className="md:col-span-2 flex items-center gap-2 mt-1">
                    <input
                      type="checkbox"
                      checked={formData.seo?.allowIndexing !== false}
                      onChange={(e) => setFormData({ ...formData, seo: { ...(formData.seo || {}), allowIndexing: e.target.checked } as any })}
                      className="h-4 w-4 rounded border-slate-300 text-[#0284c7] focus:ring-[#0284c7]"
                      id="allowIndexing"
                    />
                    <label htmlFor="allowIndexing" className="text-xs font-semibold text-slate-600 cursor-pointer">
                      Allow Search Engine Indexing
                    </label>
                  </div>
                </div>
              </div>

              {/* Contact Info Section */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <h4 className="font-heading font-bold text-xs text-[#0a1e3f] uppercase tracking-wider">Contact Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">Headquarters Address</label>
                    <textarea
                      rows={2}
                      value={formData.contactInfo?.headquarters || ''}
                      onChange={(e) => setFormData({ ...formData, contactInfo: { ...(formData.contactInfo || {}), headquarters: e.target.value } as any })}
                      className="w-full p-2.5 rounded-xl border border-[#e2e8f0] text-xs font-medium focus:border-[#0284c7] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">Phone Number</label>
                    <input
                      type="text"
                      value={formData.contactInfo?.phone || ''}
                      onChange={(e) => setFormData({ ...formData, contactInfo: { ...(formData.contactInfo || {}), phone: e.target.value } as any })}
                      className="w-full p-2.5 rounded-xl border border-[#e2e8f0] text-xs font-medium focus:border-[#0284c7] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">WhatsApp Number</label>
                    <input
                      type="text"
                      value={formData.contactInfo?.whatsapp || ''}
                      onChange={(e) => setFormData({ ...formData, contactInfo: { ...(formData.contactInfo || {}), whatsapp: e.target.value } as any })}
                      className="w-full p-2.5 rounded-xl border border-[#e2e8f0] text-xs font-medium focus:border-[#0284c7] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">Support Email</label>
                    <input
                      type="text"
                      value={formData.contactInfo?.email || ''}
                      onChange={(e) => setFormData({ ...formData, contactInfo: { ...(formData.contactInfo || {}), email: e.target.value } as any })}
                      className="w-full p-2.5 rounded-xl border border-[#e2e8f0] text-xs font-medium focus:border-[#0284c7] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">Support Hours</label>
                    <input
                      type="text"
                      value={formData.contactInfo?.supportHours || ''}
                      onChange={(e) => setFormData({ ...formData, contactInfo: { ...(formData.contactInfo || {}), supportHours: e.target.value } as any })}
                      className="w-full p-2.5 rounded-xl border border-[#e2e8f0] text-xs font-medium focus:border-[#0284c7] outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Footer Settings Section */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <h4 className="font-heading font-bold text-xs text-[#0a1e3f] uppercase tracking-wider">Footer Disclaimers & Social</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">Footer Description</label>
                    <textarea
                      rows={2}
                      value={formData.footer?.description || ''}
                      onChange={(e) => setFormData({ ...formData, footer: { ...(formData.footer || {}), description: e.target.value } as any })}
                      className="w-full p-2.5 rounded-xl border border-[#e2e8f0] text-xs font-medium focus:border-[#0284c7] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">CBN Disclaimer</label>
                    <input
                      type="text"
                      value={formData.footer?.cbnDisclaimer || ''}
                      onChange={(e) => setFormData({ ...formData, footer: { ...(formData.footer || {}), cbnDisclaimer: e.target.value } as any })}
                      className="w-full p-2.5 rounded-xl border border-[#e2e8f0] text-xs font-medium focus:border-[#0284c7] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">NDIC Disclaimer</label>
                    <input
                      type="text"
                      value={formData.footer?.ndicDisclaimer || ''}
                      onChange={(e) => setFormData({ ...formData, footer: { ...(formData.footer || {}), ndicDisclaimer: e.target.value } as any })}
                      className="w-full p-2.5 rounded-xl border border-[#e2e8f0] text-xs font-medium focus:border-[#0284c7] outline-none"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">Copyright Line</label>
                    <input
                      type="text"
                      value={formData.footer?.copyrightText || ''}
                      onChange={(e) => setFormData({ ...formData, footer: { ...(formData.footer || {}), copyrightText: e.target.value } as any })}
                      className="w-full p-2.5 rounded-xl border border-[#e2e8f0] text-xs font-medium focus:border-[#0284c7] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">Facebook URL</label>
                    <input
                      type="text"
                      value={formData.footer?.facebookUrl || ''}
                      onChange={(e) => setFormData({ ...formData, footer: { ...(formData.footer || {}), facebookUrl: e.target.value } as any })}
                      className="w-full p-2.5 rounded-xl border border-[#e2e8f0] text-xs font-medium focus:border-[#0284c7] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">Twitter (X) URL</label>
                    <input
                      type="text"
                      value={formData.footer?.twitterUrl || ''}
                      onChange={(e) => setFormData({ ...formData, footer: { ...(formData.footer || {}), twitterUrl: e.target.value } as any })}
                      className="w-full p-2.5 rounded-xl border border-[#e2e8f0] text-xs font-medium focus:border-[#0284c7] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">LinkedIn URL</label>
                    <input
                      type="text"
                      value={formData.footer?.linkedinUrl || ''}
                      onChange={(e) => setFormData({ ...formData, footer: { ...(formData.footer || {}), linkedinUrl: e.target.value } as any })}
                      className="w-full p-2.5 rounded-xl border border-[#e2e8f0] text-xs font-medium focus:border-[#0284c7] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">Instagram URL</label>
                    <input
                      type="text"
                      value={formData.footer?.instagramUrl || ''}
                      onChange={(e) => setFormData({ ...formData, footer: { ...(formData.footer || {}), instagramUrl: e.target.value } as any })}
                      className="w-full p-2.5 rounded-xl border border-[#e2e8f0] text-xs font-medium focus:border-[#0284c7] outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Live Preview Drawer */}
      <LivePreviewDrawer
        isOpen={previewOpen}
        onClose={() => setPreviewOpen(false)}
      />

      <MediaPickerModal
        isOpen={mediaPickerConfig.isOpen}
        currentValue={mediaPickerConfig.currentValue}
        onClose={() => setMediaPickerConfig({ ...mediaPickerConfig, isOpen: false })}
        onSelect={mediaPickerConfig.onSelect}
      />
    </div>
  );
}
