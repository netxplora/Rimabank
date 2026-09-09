import React, { useState, useEffect } from 'react';
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
  Image as ImageIcon,
  Wallet,
  CreditCard,
  Briefcase,
  Compass,
  GraduationCap,
  Layers,
  MapPin,
  Search,
  Check,
  ChevronRight,
  Upload,
  ArrowRight,
  BookOpen,
  HelpCircle,
  PhoneCall
} from 'lucide-react';
import { MediaPickerModal } from '@/components/admin/media/MediaPickerModal';
import { useCMS } from '@/context/CMSContext';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LivePreviewDrawer } from '@/components/admin/preview/LivePreviewDrawer';
import { toast } from 'sonner';
import { SiteContent } from '@/types/cms';

export default function LandingPageEditor() {
  const { siteContent, updateSiteContent, resetSiteContent } = useCMS();
  const { user } = useAuth();
  const [formData, setFormData] = useState<SiteContent>(siteContent);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (siteContent) {
      setFormData(siteContent);
    }
  }, [siteContent]);

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
        setMediaPickerConfig(prev => ({ ...prev, isOpen: false }));
      }
    });
  };

  const handleSave = async () => {
    if (!user) return;
    setIsSaving(true);
    try {
      const res = await updateSiteContent(formData, { id: user.id, name: user.name, role: user.role });
      if (res && res.ok) {
        toast.success('Landing page content successfully published & updated on public website!');
      } else {
        toast.error(res?.error || 'Failed to update landing page content');
      }
    } catch (e: any) {
      toast.error(e.message || 'An unexpected error occurred');
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = async () => {
    if (window.confirm('Reset all landing page content to institutional defaults? Any unpublished changes will be discarded.')) {
      const res = await resetSiteContent();
      if (res.ok) {
        setFormData(siteContent);
        toast.info('Content reset to standard defaults.');
      } else {
        toast.error('Failed to reset content.');
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-[#bae6fd]/60 shadow-xs">
        <div>
          <h1 className="text-xl font-heading font-bold text-[#0a1e3f] tracking-tight">
            Landing Page Content Management
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage headlines, financing workflows, savings products, enterprise services, process roadmap, guides, and SEO.
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
      <div className="bg-white rounded-2xl border border-[#bae6fd]/60 p-6 shadow-xs">
        <Tabs defaultValue="hero" className="w-full">
          <TabsList className="flex overflow-x-auto gap-2 bg-slate-100/80 p-1.5 rounded-xl mb-6 w-full scrollbar-hide">
            <TabsTrigger value="hero" className="rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 px-3.5">
              Hero Section
            </TabsTrigger>
            <TabsTrigger value="stats" className="rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 px-3.5">
              Trust & Stats
            </TabsTrigger>
            <TabsTrigger value="about" className="rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 px-3.5">
              About & Purpose
            </TabsTrigger>
            <TabsTrigger value="savings" className="rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 px-3.5">
              Savings & Wealth
            </TabsTrigger>
            <TabsTrigger value="financing" className="rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 px-3.5">
              Financing & Loans
            </TabsTrigger>
            <TabsTrigger value="sme" className="rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 px-3.5">
              Commercial & SME
            </TabsTrigger>
            <TabsTrigger value="journey" className="rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 px-3.5">
              Customer Journey
            </TabsTrigger>
            <TabsTrigger value="digital" className="rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 px-3.5">
              Digital & Mobility
            </TabsTrigger>
            <TabsTrigger value="education" className="rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 px-3.5">
              Financial Guides
            </TabsTrigger>
            <TabsTrigger value="specialized" className="rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 px-3.5">
              Agent & Inclusion
            </TabsTrigger>
            <TabsTrigger value="products" className="rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 px-3.5">
              Products Matrix
            </TabsTrigger>
            <TabsTrigger value="testimonials" className="rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 px-3.5">
              Testimonials
            </TabsTrigger>
            <TabsTrigger value="branches" className="rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 px-3.5">
              Branches
            </TabsTrigger>
            <TabsTrigger value="seo" className="rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 px-3.5">
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
                  value={formData.hero?.eyebrow || ''}
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
                  value={formData.hero?.headingPart1 || ''}
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
                  value={formData.hero?.headingHighlight || ''}
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
                  value={formData.hero?.headingPart2 || ''}
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
                  value={formData.hero?.description || ''}
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
                  value={formData.hero?.primaryCtaText || ''}
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
                  value={formData.hero?.primaryCtaLink || ''}
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
                  value={formData.hero?.secondaryCtaText || ''}
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
                  value={formData.hero?.secondaryCtaLink || ''}
                  onChange={(e) => setFormData({ ...formData, hero: { ...formData.hero, secondaryCtaLink: e.target.value } })}
                  className="w-full p-2.5 rounded-xl border border-[#e2e8f0] text-xs font-medium focus:border-[#0284c7] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">
                  Customer Support Phone
                </label>
                <input
                  type="text"
                  value={formData.hero?.supportPhone || ''}
                  onChange={(e) => setFormData({ ...formData, hero: { ...formData.hero, supportPhone: e.target.value } })}
                  className="w-full p-2.5 rounded-xl border border-[#e2e8f0] text-xs font-medium focus:border-[#0284c7] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">
                  Customer Support Email
                </label>
                <input
                  type="text"
                  value={formData.hero?.supportEmail || ''}
                  onChange={(e) => setFormData({ ...formData, hero: { ...formData.hero, supportEmail: e.target.value } })}
                  className="w-full p-2.5 rounded-xl border border-[#e2e8f0] text-xs font-medium focus:border-[#0284c7] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">
                  Active Customers Stat Count
                </label>
                <input
                  type="text"
                  value={formData.hero?.activeUsersCount || ''}
                  onChange={(e) => setFormData({ ...formData, hero: { ...formData.hero, activeUsersCount: e.target.value } })}
                  className="w-full p-2.5 rounded-xl border border-[#e2e8f0] text-xs font-medium focus:border-[#0284c7] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">
                  Active Customers Label
                </label>
                <input
                  type="text"
                  value={formData.hero?.activeUsersLabel || ''}
                  onChange={(e) => setFormData({ ...formData, hero: { ...formData.hero, activeUsersLabel: e.target.value } })}
                  className="w-full p-2.5 rounded-xl border border-[#e2e8f0] text-xs font-medium focus:border-[#0284c7] outline-none"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">
                  Hero Visual / Image URL
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={formData.hero?.heroImage || ''}
                    onChange={(e) => setFormData({ ...formData, hero: { ...formData.hero, heroImage: e.target.value } })}
                    className="flex-1 p-2.5 rounded-xl border border-[#e2e8f0] text-xs font-mono text-[#0284c7] focus:border-[#0284c7] outline-none"
                    placeholder="/images/hero-home.png"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => openMediaPicker(formData.hero?.heroImage || '', (url) => {
                      setFormData({ ...formData, hero: { ...formData.hero, heroImage: url } });
                    })}
                    className="rounded-xl border-slate-200 text-xs font-semibold hover:bg-slate-50"
                  >
                    <ImageIcon className="h-3.5 w-3.5 mr-1" />
                    Media Library
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* TAB 2: TRUST & STATS */}
          <TabsContent value="stats" className="space-y-4">
            <div className="border-b border-slate-100 pb-3 mb-4">
              <h3 className="font-heading font-bold text-sm text-[#0a1e3f]">
                Institutional Trust & Performance Metrics
              </h3>
              <p className="text-xs text-slate-400">Stat figures highlighting customer base, transaction volume, and regulatory credentials.</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">
                  Regulatory Compliance Text Banner
                </label>
                <input
                  type="text"
                  value={formData.regulatoryText || ''}
                  onChange={(e) => setFormData({ ...formData, regulatoryText: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-[#e2e8f0] text-xs font-medium focus:border-[#0284c7] outline-none"
                />
              </div>

              <div className="border-t border-slate-100 pt-4">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="text-xs font-heading font-bold text-[#0a1e3f] uppercase tracking-wider">
                    Trust Metric Cards
                  </h4>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setFormData({
                      ...formData,
                      trustStats: [
                        ...(formData.trustStats || []),
                        { id: Date.now().toString(), value: '', label: '', description: '' }
                      ]
                    })}
                    className="h-8 rounded-lg text-xs"
                  >
                    <Plus className="h-3 w-3 mr-1" /> Add Metric
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {(formData.trustStats || []).map((stat, idx) => (
                    <div key={stat.id || idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 relative group">
                      <div className="absolute top-2 right-2">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            const updated = (formData.trustStats || []).filter((_, i) => i !== idx);
                            setFormData({ ...formData, trustStats: updated });
                          }}
                          className="h-7 w-7 p-0 text-red-500 hover:bg-red-50 hover:text-red-600 rounded-lg"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                      <div className="space-y-2 pr-6">
                        <div>
                          <label className="block text-[10px] font-semibold text-slate-500 mb-0.5">Value (e.g. 500,000+)</label>
                          <input
                            type="text"
                            value={stat.value}
                            onChange={(e) => {
                              const updated = [...(formData.trustStats || [])];
                              updated[idx].value = e.target.value;
                              setFormData({ ...formData, trustStats: updated });
                            }}
                            className="w-full p-2 rounded-lg bg-white border border-[#e2e8f0] text-xs font-bold text-[#0a1e3f]"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-semibold text-slate-500 mb-0.5">Label</label>
                          <input
                            type="text"
                            value={stat.label}
                            onChange={(e) => {
                              const updated = [...(formData.trustStats || [])];
                              updated[idx].label = e.target.value;
                              setFormData({ ...formData, trustStats: updated });
                            }}
                            className="w-full p-2 rounded-lg bg-white border border-[#e2e8f0] text-xs font-medium text-slate-700"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-semibold text-slate-500 mb-0.5">Brief Detail</label>
                          <input
                            type="text"
                            value={stat.description || ''}
                            onChange={(e) => {
                              const updated = [...(formData.trustStats || [])];
                              updated[idx].description = e.target.value;
                              setFormData({ ...formData, trustStats: updated });
                            }}
                            className="w-full p-2 rounded-lg bg-white border border-[#e2e8f0] text-xs text-slate-500"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* TAB 3: ABOUT & PURPOSE */}
          <TabsContent value="about" className="space-y-4">
            <div className="border-b border-slate-100 pb-3 mb-4">
              <h3 className="font-heading font-bold text-sm text-[#0a1e3f]">
                About RIMA Microfinance Bank
              </h3>
              <p className="text-xs text-slate-400">Institutional background, mission, vision, and board leadership.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">Eyebrow</label>
                <input
                  type="text"
                  value={formData.aboutSnapshot?.eyebrow || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    aboutSnapshot: { ...(formData.aboutSnapshot || {} as any), eyebrow: e.target.value }
                  })}
                  className="w-full p-2.5 rounded-xl border border-[#e2e8f0] text-xs font-medium"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">Heading</label>
                <input
                  type="text"
                  value={formData.aboutSnapshot?.heading || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    aboutSnapshot: { ...(formData.aboutSnapshot || {} as any), heading: e.target.value }
                  })}
                  className="w-full p-2.5 rounded-xl border border-[#e2e8f0] text-xs font-bold text-[#0a1e3f]"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">First Narrative Paragraph</label>
                <textarea
                  rows={2}
                  value={formData.aboutSnapshot?.description1 || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    aboutSnapshot: { ...(formData.aboutSnapshot || {} as any), description1: e.target.value }
                  })}
                  className="w-full p-2.5 rounded-xl border border-[#e2e8f0] text-xs text-slate-600"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">Second Narrative Paragraph</label>
                <textarea
                  rows={2}
                  value={formData.aboutSnapshot?.description2 || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    aboutSnapshot: { ...(formData.aboutSnapshot || {} as any), description2: e.target.value }
                  })}
                  className="w-full p-2.5 rounded-xl border border-[#e2e8f0] text-xs text-slate-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">Mission Statement</label>
                <textarea
                  rows={2}
                  value={formData.aboutSnapshot?.mission || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    aboutSnapshot: { ...(formData.aboutSnapshot || {} as any), mission: e.target.value }
                  })}
                  className="w-full p-2.5 rounded-xl border border-[#e2e8f0] text-xs text-slate-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">Vision Statement</label>
                <textarea
                  rows={2}
                  value={formData.aboutSnapshot?.vision || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    aboutSnapshot: { ...(formData.aboutSnapshot || {} as any), vision: e.target.value }
                  })}
                  className="w-full p-2.5 rounded-xl border border-[#e2e8f0] text-xs text-slate-600"
                />
              </div>

              {/* Leadership & Governance CRUD */}
              <div className="md:col-span-2 border-t border-slate-100 pt-4">
                <div className="flex justify-between items-center mb-3">
                  <div>
                    <h4 className="text-xs font-heading font-bold text-[#0a1e3f] uppercase tracking-wider">
                      Board of Directors & Executive Management
                    </h4>
                    <p className="text-[11px] text-slate-400">Add or manage key leaders displayed in corporate governance sections.</p>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const currentTeam = formData.aboutSnapshot?.governanceTeam || [];
                      setFormData({
                        ...formData,
                        aboutSnapshot: {
                          ...(formData.aboutSnapshot || {} as any),
                          governanceTeam: [
                            ...currentTeam,
                            {
                              id: Date.now().toString(),
                              name: '',
                              role: '',
                              bio: '',
                              image: '/images/avatar-1.png',
                              linkedin: '',
                              twitter: ''
                            }
                          ]
                        }
                      });
                    }}
                    className="h-8 rounded-lg text-xs"
                  >
                    <Plus className="h-3 w-3 mr-1" /> Add Leader
                  </Button>
                </div>

                <div className="space-y-3">
                  {(formData.aboutSnapshot?.governanceTeam || []).map((member, idx) => (
                    <div key={member.id || idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 relative">
                      <div className="absolute top-2 right-2">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            const updated = (formData.aboutSnapshot?.governanceTeam || []).filter((_, i) => i !== idx);
                            setFormData({
                              ...formData,
                              aboutSnapshot: { ...(formData.aboutSnapshot || {} as any), governanceTeam: updated }
                            });
                          }}
                          className="h-8 w-8 p-0 text-red-500 hover:bg-red-50 rounded-lg"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pr-8">
                        <div>
                          <label className="block text-[11px] font-semibold text-slate-500 mb-1">Full Name</label>
                          <input
                            type="text"
                            value={member.name}
                            onChange={(e) => {
                              const updated = [...(formData.aboutSnapshot?.governanceTeam || [])];
                              updated[idx].name = e.target.value;
                              setFormData({ ...formData, aboutSnapshot: { ...(formData.aboutSnapshot || {} as any), governanceTeam: updated } });
                            }}
                            className="w-full p-2 rounded-lg bg-white border border-[#e2e8f0] text-xs font-bold text-[#0a1e3f]"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-slate-500 mb-1">Designation / Role</label>
                          <input
                            type="text"
                            value={member.role}
                            onChange={(e) => {
                              const updated = [...(formData.aboutSnapshot?.governanceTeam || [])];
                              updated[idx].role = e.target.value;
                              setFormData({ ...formData, aboutSnapshot: { ...(formData.aboutSnapshot || {} as any), governanceTeam: updated } });
                            }}
                            className="w-full p-2 rounded-lg bg-white border border-[#e2e8f0] text-xs font-semibold text-[#0a1e3f]"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-slate-500 mb-1">Photo Image URL</label>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={member.image}
                              onChange={(e) => {
                                const updated = [...(formData.aboutSnapshot?.governanceTeam || [])];
                                updated[idx].image = e.target.value;
                                setFormData({ ...formData, aboutSnapshot: { ...(formData.aboutSnapshot || {} as any), governanceTeam: updated } });
                              }}
                              className="flex-1 p-2 rounded-lg bg-white border border-[#e2e8f0] text-xs font-mono text-[#0284c7]"
                            />
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => openMediaPicker(member.image, (url) => {
                                const updated = [...(formData.aboutSnapshot?.governanceTeam || [])];
                                updated[idx].image = url;
                                setFormData({ ...formData, aboutSnapshot: { ...(formData.aboutSnapshot || {} as any), governanceTeam: updated } });
                              })}
                              className="h-8 px-2 text-xs"
                            >
                              <ImageIcon className="h-3 w-3 mr-1" /> Pick
                            </Button>
                          </div>
                        </div>

                        <div className="md:col-span-3">
                          <label className="block text-[11px] font-semibold text-slate-500 mb-1">Executive Biography</label>
                          <textarea
                            rows={2}
                            value={member.bio}
                            onChange={(e) => {
                              const updated = [...(formData.aboutSnapshot?.governanceTeam || [])];
                              updated[idx].bio = e.target.value;
                              setFormData({ ...formData, aboutSnapshot: { ...(formData.aboutSnapshot || {} as any), governanceTeam: updated } });
                            }}
                            className="w-full p-2 rounded-lg bg-white border border-[#e2e8f0] text-xs text-slate-600"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* TAB 4: SAVINGS & WEALTH ACCUMULATION */}
          <TabsContent value="savings" className="space-y-4">
            <div className="border-b border-slate-100 pb-3 mb-4">
              <h3 className="font-heading font-bold text-sm text-[#0a1e3f]">
                Savings & Wealth Accumulation Section
              </h3>
              <p className="text-xs text-slate-400">Configure target savings, regular savings, fixed deposits, requirements, and benefits.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">Section Badge</label>
                <input
                  type="text"
                  value={formData.savingsSection?.badge || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    savingsSection: { ...(formData.savingsSection || {} as any), badge: e.target.value }
                  })}
                  className="w-full p-2.5 rounded-xl border border-[#e2e8f0] text-xs font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">Section Heading</label>
                <input
                  type="text"
                  value={formData.savingsSection?.heading || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    savingsSection: { ...(formData.savingsSection || {} as any), heading: e.target.value }
                  })}
                  className="w-full p-2.5 rounded-xl border border-[#e2e8f0] text-xs font-bold text-[#0a1e3f]"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">Section Description</label>
                <textarea
                  rows={2}
                  value={formData.savingsSection?.description || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    savingsSection: { ...(formData.savingsSection || {} as any), description: e.target.value }
                  })}
                  className="w-full p-2.5 rounded-xl border border-[#e2e8f0] text-xs text-slate-600"
                />
              </div>
            </div>

            {/* Savings Products List CRUD */}
            <div className="border-t border-slate-100 pt-4">
              <div className="flex justify-between items-center mb-3">
                <h4 className="text-xs font-heading font-bold text-[#0a1e3f] uppercase tracking-wider">
                  Savings & Deposit Products
                </h4>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const currentProducts = formData.savingsSection?.products || [];
                    setFormData({
                      ...formData,
                      savingsSection: {
                        ...(formData.savingsSection || {} as any),
                        products: [
                          ...currentProducts,
                          {
                            id: `savings-${Date.now()}`,
                            name: '',
                            tagline: '',
                            targetAudience: '',
                            benefits: [''],
                            requirements: ['']
                          }
                        ]
                      }
                    });
                  }}
                  className="h-8 rounded-lg text-xs"
                >
                  <Plus className="h-3 w-3 mr-1" /> Add Savings Product
                </Button>
              </div>

              <div className="space-y-4">
                {(formData.savingsSection?.products || []).map((product, pIdx) => (
                  <div key={product.id || pIdx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 relative">
                    <div className="absolute top-2 right-2">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          const updated = (formData.savingsSection?.products || []).filter((_, i) => i !== pIdx);
                          setFormData({
                            ...formData,
                            savingsSection: { ...(formData.savingsSection || {} as any), products: updated }
                          });
                        }}
                        className="h-8 w-8 p-0 text-red-500 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pr-8 mb-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-500 mb-1">Product Name</label>
                        <input
                          type="text"
                          value={product.name}
                          onChange={(e) => {
                            const updated = [...(formData.savingsSection?.products || [])];
                            updated[pIdx].name = e.target.value;
                            setFormData({ ...formData, savingsSection: { ...(formData.savingsSection || {} as any), products: updated } });
                          }}
                          className="w-full p-2 rounded-lg bg-white border border-[#e2e8f0] text-xs font-bold text-[#0a1e3f]"
                          placeholder="e.g. Goal / Target Savings"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-slate-500 mb-1">Tagline</label>
                        <input
                          type="text"
                          value={product.tagline}
                          onChange={(e) => {
                            const updated = [...(formData.savingsSection?.products || [])];
                            updated[pIdx].tagline = e.target.value;
                            setFormData({ ...formData, savingsSection: { ...(formData.savingsSection || {} as any), products: updated } });
                          }}
                          className="w-full p-2 rounded-lg bg-white border border-[#e2e8f0] text-xs text-slate-700"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-slate-500 mb-1">Target Audience</label>
                        <input
                          type="text"
                          value={product.targetAudience}
                          onChange={(e) => {
                            const updated = [...(formData.savingsSection?.products || [])];
                            updated[pIdx].targetAudience = e.target.value;
                            setFormData({ ...formData, savingsSection: { ...(formData.savingsSection || {} as any), products: updated } });
                          }}
                          className="w-full p-2 rounded-lg bg-white border border-[#e2e8f0] text-xs font-semibold text-[#0284c7]"
                          placeholder="e.g. Everyday Savers & Planners"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Benefits */}
                      <div className="p-3 bg-white rounded-lg border border-slate-200">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-[11px] font-bold text-[#0a1e3f]">Key Benefits</span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              const updated = [...(formData.savingsSection?.products || [])];
                              updated[pIdx].benefits = [...(updated[pIdx].benefits || []), ''];
                              setFormData({ ...formData, savingsSection: { ...(formData.savingsSection || {} as any), products: updated } });
                            }}
                            className="h-6 px-2 text-[10px] text-[#0284c7]"
                          >
                            <Plus className="h-3 w-3 mr-1" /> Add
                          </Button>
                        </div>
                        <div className="space-y-1.5">
                          {(product.benefits || []).map((benefit, bIdx) => (
                            <div key={bIdx} className="flex gap-1.5">
                              <input
                                type="text"
                                value={benefit}
                                onChange={(e) => {
                                  const updated = [...(formData.savingsSection?.products || [])];
                                  updated[pIdx].benefits[bIdx] = e.target.value;
                                  setFormData({ ...formData, savingsSection: { ...(formData.savingsSection || {} as any), products: updated } });
                                }}
                                className="flex-1 p-1.5 rounded border border-[#e2e8f0] text-[11px]"
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  const updated = [...(formData.savingsSection?.products || [])];
                                  updated[pIdx].benefits = updated[pIdx].benefits.filter((_, i) => i !== bIdx);
                                  setFormData({ ...formData, savingsSection: { ...(formData.savingsSection || {} as any), products: updated } });
                                }}
                                className="h-7 w-7 p-0 text-red-500"
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Requirements */}
                      <div className="p-3 bg-white rounded-lg border border-slate-200">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-[11px] font-bold text-[#0a1e3f]">Requirements</span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              const updated = [...(formData.savingsSection?.products || [])];
                              updated[pIdx].requirements = [...(updated[pIdx].requirements || []), ''];
                              setFormData({ ...formData, savingsSection: { ...(formData.savingsSection || {} as any), products: updated } });
                            }}
                            className="h-6 px-2 text-[10px] text-[#0284c7]"
                          >
                            <Plus className="h-3 w-3 mr-1" /> Add
                          </Button>
                        </div>
                        <div className="space-y-1.5">
                          {(product.requirements || []).map((req, rIdx) => (
                            <div key={rIdx} className="flex gap-1.5">
                              <input
                                type="text"
                                value={req}
                                onChange={(e) => {
                                  const updated = [...(formData.savingsSection?.products || [])];
                                  updated[pIdx].requirements[rIdx] = e.target.value;
                                  setFormData({ ...formData, savingsSection: { ...(formData.savingsSection || {} as any), products: updated } });
                                }}
                                className="flex-1 p-1.5 rounded border border-[#e2e8f0] text-[11px]"
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  const updated = [...(formData.savingsSection?.products || [])];
                                  updated[pIdx].requirements = updated[pIdx].requirements.filter((_, i) => i !== rIdx);
                                  setFormData({ ...formData, savingsSection: { ...(formData.savingsSection || {} as any), products: updated } });
                                }}
                                className="h-7 w-7 p-0 text-red-500"
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* TAB 5: FINANCING & LOANS */}
          <TabsContent value="financing" className="space-y-4">
            <div className="border-b border-slate-100 pb-3 mb-4">
              <h3 className="font-heading font-bold text-sm text-[#0a1e3f]">
                Commercial & Personal Financing Section
              </h3>
              <p className="text-xs text-slate-400">Configure background imagery, 5-step credit lifecycle, and loan facilities.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">Section Badge</label>
                <input
                  type="text"
                  value={formData.financingSection?.badge || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    financingSection: { ...(formData.financingSection || {} as any), badge: e.target.value }
                  })}
                  className="w-full p-2.5 rounded-xl border border-[#e2e8f0] text-xs font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">Section Heading</label>
                <input
                  type="text"
                  value={formData.financingSection?.heading || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    financingSection: { ...(formData.financingSection || {} as any), heading: e.target.value }
                  })}
                  className="w-full p-2.5 rounded-xl border border-[#e2e8f0] text-xs font-bold text-[#0a1e3f]"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">Section Narrative Description</label>
                <textarea
                  rows={2}
                  value={formData.financingSection?.description || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    financingSection: { ...(formData.financingSection || {} as any), description: e.target.value }
                  })}
                  className="w-full p-2.5 rounded-xl border border-[#e2e8f0] text-xs text-slate-600"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">
                  Section Background Image (with light skyblue glassmorphism overlay)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={formData.financingSection?.backgroundImage || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      financingSection: { ...(formData.financingSection || {} as any), backgroundImage: e.target.value }
                    })}
                    className="flex-1 p-2.5 rounded-xl border border-[#e2e8f0] text-xs font-mono text-[#0284c7]"
                    placeholder="/images/media-sme.png"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => openMediaPicker(formData.financingSection?.backgroundImage || '', (url) => {
                      setFormData({
                        ...formData,
                        financingSection: { ...(formData.financingSection || {} as any), backgroundImage: url }
                      });
                    })}
                    className="rounded-xl border-slate-200 text-xs font-semibold hover:bg-slate-50"
                  >
                    <ImageIcon className="h-3.5 w-3.5 mr-1" />
                    Media Library
                  </Button>
                </div>
              </div>
            </div>

            {/* 5-Step Credit Workflow Process */}
            <div className="border-t border-slate-100 pt-4 mb-6">
              <div className="flex justify-between items-center mb-3">
                <h4 className="text-xs font-heading font-bold text-[#0a1e3f] uppercase tracking-wider">
                  5-Step Credit Application Workflow
                </h4>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const currentSteps = formData.financingSection?.workflowSteps || [];
                    const nextNum = (currentSteps.length + 1).toString().padStart(2, '0');
                    setFormData({
                      ...formData,
                      financingSection: {
                        ...(formData.financingSection || {} as any),
                        workflowSteps: [
                          ...currentSteps,
                          { step: nextNum, name: '', desc: '' }
                        ]
                      }
                    });
                  }}
                  className="h-8 rounded-lg text-xs"
                >
                  <Plus className="h-3 w-3 mr-1" /> Add Step
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
                {(formData.financingSection?.workflowSteps || []).map((ws, wIdx) => (
                  <div key={wIdx} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2 relative">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-[#0284c7] px-1.5 py-0.5 rounded bg-sky-100">
                        {ws.step}
                      </span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          const updated = (formData.financingSection?.workflowSteps || []).filter((_, i) => i !== wIdx);
                          setFormData({
                            ...formData,
                            financingSection: { ...(formData.financingSection || {} as any), workflowSteps: updated }
                          });
                        }}
                        className="h-6 w-6 p-0 text-red-500"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold text-slate-500 mb-0.5">Step Name</label>
                      <input
                        type="text"
                        value={ws.name}
                        onChange={(e) => {
                          const updated = [...(formData.financingSection?.workflowSteps || [])];
                          updated[wIdx].name = e.target.value;
                          setFormData({ ...formData, financingSection: { ...(formData.financingSection || {} as any), workflowSteps: updated } });
                        }}
                        className="w-full p-1.5 rounded border border-[#e2e8f0] text-xs font-bold text-[#0a1e3f]"
                        placeholder="e.g. Assessment"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold text-slate-500 mb-0.5">Description</label>
                      <textarea
                        rows={2}
                        value={ws.desc}
                        onChange={(e) => {
                          const updated = [...(formData.financingSection?.workflowSteps || [])];
                          updated[wIdx].desc = e.target.value;
                          setFormData({ ...formData, financingSection: { ...(formData.financingSection || {} as any), workflowSteps: updated } });
                        }}
                        className="w-full p-1.5 rounded border border-[#e2e8f0] text-[11px] text-slate-600"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Credit Facilities List CRUD */}
            <div className="border-t border-slate-100 pt-4">
              <div className="flex justify-between items-center mb-3">
                <h4 className="text-xs font-heading font-bold text-[#0a1e3f] uppercase tracking-wider">
                  Financing & Loan Facilities
                </h4>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const currentFacilities = formData.financingSection?.facilities || [];
                    setFormData({
                      ...formData,
                      financingSection: {
                        ...(formData.financingSection || {} as any),
                        facilities: [
                          ...currentFacilities,
                          {
                            id: `facility-${Date.now()}`,
                            name: '',
                            tagline: '',
                            tenure: '3 to 12 Months',
                            minAmount: '₦100,000',
                            maxAmount: '₦50,000,000',
                            interestRate: 'Competitive monthly rate',
                            features: [''],
                            requirements: [''],
                            ctaText: 'Apply for Loan',
                            ctaLink: '/contact'
                          }
                        ]
                      }
                    });
                  }}
                  className="h-8 rounded-lg text-xs"
                >
                  <Plus className="h-3 w-3 mr-1" /> Add Loan Facility
                </Button>
              </div>

              <div className="space-y-4">
                {(formData.financingSection?.facilities || []).map((facility, fIdx) => (
                  <div key={facility.id || fIdx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 relative">
                    <div className="absolute top-2 right-2">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          const updated = (formData.financingSection?.facilities || []).filter((_, i) => i !== fIdx);
                          setFormData({
                            ...formData,
                            financingSection: { ...(formData.financingSection || {} as any), facilities: updated }
                          });
                        }}
                        className="h-8 w-8 p-0 text-red-500 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pr-8 mb-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-500 mb-1">Facility Name</label>
                        <input
                          type="text"
                          value={facility.name}
                          onChange={(e) => {
                            const updated = [...(formData.financingSection?.facilities || [])];
                            updated[fIdx].name = e.target.value;
                            setFormData({ ...formData, financingSection: { ...(formData.financingSection || {} as any), facilities: updated } });
                          }}
                          className="w-full p-2 rounded-lg bg-white border border-[#e2e8f0] text-xs font-bold text-[#0a1e3f]"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-slate-500 mb-1">Subtitle / Tagline</label>
                        <input
                          type="text"
                          value={facility.tagline}
                          onChange={(e) => {
                            const updated = [...(formData.financingSection?.facilities || [])];
                            updated[fIdx].tagline = e.target.value;
                            setFormData({ ...formData, financingSection: { ...(formData.financingSection || {} as any), facilities: updated } });
                          }}
                          className="w-full p-2 rounded-lg bg-white border border-[#e2e8f0] text-xs text-slate-700"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-slate-500 mb-1">Tenure</label>
                        <input
                          type="text"
                          value={facility.tenure}
                          onChange={(e) => {
                            const updated = [...(formData.financingSection?.facilities || [])];
                            updated[fIdx].tenure = e.target.value;
                            setFormData({ ...formData, financingSection: { ...(formData.financingSection || {} as any), facilities: updated } });
                          }}
                          className="w-full p-2 rounded-lg bg-white border border-[#e2e8f0] text-xs font-semibold text-[#0284c7]"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-slate-500 mb-1">Min Amount</label>
                        <input
                          type="text"
                          value={facility.minAmount || ''}
                          onChange={(e) => {
                            const updated = [...(formData.financingSection?.facilities || [])];
                            updated[fIdx].minAmount = e.target.value;
                            setFormData({ ...formData, financingSection: { ...(formData.financingSection || {} as any), facilities: updated } });
                          }}
                          className="w-full p-2 rounded-lg bg-white border border-[#e2e8f0] text-xs font-mono"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-slate-500 mb-1">Max Amount</label>
                        <input
                          type="text"
                          value={facility.maxAmount || ''}
                          onChange={(e) => {
                            const updated = [...(formData.financingSection?.facilities || [])];
                            updated[fIdx].maxAmount = e.target.value;
                            setFormData({ ...formData, financingSection: { ...(formData.financingSection || {} as any), facilities: updated } });
                          }}
                          className="w-full p-2 rounded-lg bg-white border border-[#e2e8f0] text-xs font-mono"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-slate-500 mb-1">Interest Rate / Fee Structure</label>
                        <input
                          type="text"
                          value={facility.interestRate || ''}
                          onChange={(e) => {
                            const updated = [...(formData.financingSection?.facilities || [])];
                            updated[fIdx].interestRate = e.target.value;
                            setFormData({ ...formData, financingSection: { ...(formData.financingSection || {} as any), facilities: updated } });
                          }}
                          className="w-full p-2 rounded-lg bg-white border border-[#e2e8f0] text-xs text-slate-700"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-slate-500 mb-1">CTA Text</label>
                        <input
                          type="text"
                          value={facility.ctaText || ''}
                          onChange={(e) => {
                            const updated = [...(formData.financingSection?.facilities || [])];
                            updated[fIdx].ctaText = e.target.value;
                            setFormData({ ...formData, financingSection: { ...(formData.financingSection || {} as any), facilities: updated } });
                          }}
                          className="w-full p-2 rounded-lg bg-white border border-[#e2e8f0] text-xs font-semibold text-[#0a1e3f]"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-slate-500 mb-1">CTA Link</label>
                        <input
                          type="text"
                          value={facility.ctaLink || ''}
                          onChange={(e) => {
                            const updated = [...(formData.financingSection?.facilities || [])];
                            updated[fIdx].ctaLink = e.target.value;
                            setFormData({ ...formData, financingSection: { ...(formData.financingSection || {} as any), facilities: updated } });
                          }}
                          className="w-full p-2 rounded-lg bg-white border border-[#e2e8f0] text-xs font-mono text-[#0284c7]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Features */}
                      <div className="p-3 bg-white rounded-lg border border-slate-200">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-[11px] font-bold text-[#0a1e3f]">Key Features</span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              const updated = [...(formData.financingSection?.facilities || [])];
                              updated[fIdx].features = [...(updated[fIdx].features || []), ''];
                              setFormData({ ...formData, financingSection: { ...(formData.financingSection || {} as any), facilities: updated } });
                            }}
                            className="h-6 px-2 text-[10px] text-[#0284c7]"
                          >
                            <Plus className="h-3 w-3 mr-1" /> Add Feature
                          </Button>
                        </div>
                        <div className="space-y-1.5">
                          {(facility.features || []).map((feat, ftIdx) => (
                            <div key={ftIdx} className="flex gap-1.5">
                              <input
                                type="text"
                                value={feat}
                                onChange={(e) => {
                                  const updated = [...(formData.financingSection?.facilities || [])];
                                  updated[fIdx].features![ftIdx] = e.target.value;
                                  setFormData({ ...formData, financingSection: { ...(formData.financingSection || {} as any), facilities: updated } });
                                }}
                                className="flex-1 p-1.5 rounded border border-[#e2e8f0] text-[11px]"
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  const updated = [...(formData.financingSection?.facilities || [])];
                                  updated[fIdx].features = updated[fIdx].features!.filter((_, i) => i !== ftIdx);
                                  setFormData({ ...formData, financingSection: { ...(formData.financingSection || {} as any), facilities: updated } });
                                }}
                                className="h-7 w-7 p-0 text-red-500"
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Requirements */}
                      <div className="p-3 bg-white rounded-lg border border-slate-200">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-[11px] font-bold text-[#0a1e3f]">Documentation & Eligibility</span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              const updated = [...(formData.financingSection?.facilities || [])];
                              updated[fIdx].requirements = [...(updated[fIdx].requirements || []), ''];
                              setFormData({ ...formData, financingSection: { ...(formData.financingSection || {} as any), facilities: updated } });
                            }}
                            className="h-6 px-2 text-[10px] text-[#0284c7]"
                          >
                            <Plus className="h-3 w-3 mr-1" /> Add Requirement
                          </Button>
                        </div>
                        <div className="space-y-1.5">
                          {(facility.requirements || []).map((rq, rqIdx) => (
                            <div key={rqIdx} className="flex gap-1.5">
                              <input
                                type="text"
                                value={rq}
                                onChange={(e) => {
                                  const updated = [...(formData.financingSection?.facilities || [])];
                                  updated[fIdx].requirements![rqIdx] = e.target.value;
                                  setFormData({ ...formData, financingSection: { ...(formData.financingSection || {} as any), facilities: updated } });
                                }}
                                className="flex-1 p-1.5 rounded border border-[#e2e8f0] text-[11px]"
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  const updated = [...(formData.financingSection?.facilities || [])];
                                  updated[fIdx].requirements = updated[fIdx].requirements!.filter((_, i) => i !== rqIdx);
                                  setFormData({ ...formData, financingSection: { ...(formData.financingSection || {} as any), facilities: updated } });
                                }}
                                className="h-7 w-7 p-0 text-red-500"
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* TAB 6: COMMERCIAL & SME BANKING */}
          <TabsContent value="sme" className="space-y-4">
            <div className="border-b border-slate-100 pb-3 mb-4">
              <h3 className="font-heading font-bold text-sm text-[#0a1e3f]">
                Commercial & Enterprise Services
              </h3>
              <p className="text-xs text-slate-400">Configure corporate offerings, commercial benefits, enterprise banner, and CTA.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">Section Badge</label>
                <input
                  type="text"
                  value={formData.smeBanking?.badge || ''}
                  onChange={(e) => setFormData({ ...formData, smeBanking: { ...formData.smeBanking, badge: e.target.value } })}
                  className="w-full p-2.5 rounded-xl border border-[#e2e8f0] text-xs font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">Section Heading</label>
                <input
                  type="text"
                  value={formData.smeBanking?.heading || ''}
                  onChange={(e) => setFormData({ ...formData, smeBanking: { ...formData.smeBanking, heading: e.target.value } })}
                  className="w-full p-2.5 rounded-xl border border-[#e2e8f0] text-xs font-bold text-[#0a1e3f]"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">Section Narrative Description</label>
                <textarea
                  rows={2}
                  value={formData.smeBanking?.description || ''}
                  onChange={(e) => setFormData({ ...formData, smeBanking: { ...formData.smeBanking, description: e.target.value } })}
                  className="w-full p-2.5 rounded-xl border border-[#e2e8f0] text-xs text-slate-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">Primary CTA Button Label</label>
                <input
                  type="text"
                  value={formData.smeBanking?.ctaText || ''}
                  onChange={(e) => setFormData({ ...formData, smeBanking: { ...formData.smeBanking, ctaText: e.target.value } })}
                  className="w-full p-2.5 rounded-xl border border-[#e2e8f0] text-xs font-semibold text-[#0a1e3f]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">Primary CTA Link Path</label>
                <input
                  type="text"
                  value={formData.smeBanking?.ctaLink || ''}
                  onChange={(e) => setFormData({ ...formData, smeBanking: { ...formData.smeBanking, ctaLink: e.target.value } })}
                  className="w-full p-2.5 rounded-xl border border-[#e2e8f0] text-xs font-mono text-[#0284c7]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">Enterprise Banner Heading</label>
                <input
                  type="text"
                  value={formData.smeBanking?.bannerHeading || ''}
                  onChange={(e) => setFormData({ ...formData, smeBanking: { ...formData.smeBanking, bannerHeading: e.target.value } })}
                  className="w-full p-2.5 rounded-xl border border-[#e2e8f0] text-xs font-bold text-[#0a1e3f]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">Enterprise Banner Description</label>
                <input
                  type="text"
                  value={formData.smeBanking?.bannerDescription || ''}
                  onChange={(e) => setFormData({ ...formData, smeBanking: { ...formData.smeBanking, bannerDescription: e.target.value } })}
                  className="w-full p-2.5 rounded-xl border border-[#e2e8f0] text-xs text-slate-700"
                />
              </div>
            </div>

            {/* Commercial Services Grid CRUD */}
            <div className="border-t border-slate-100 pt-4 mb-6">
              <div className="flex justify-between items-center mb-3">
                <h4 className="text-xs font-heading font-bold text-[#0a1e3f] uppercase tracking-wider">
                  Commercial Services Grid
                </h4>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const currentServices = formData.smeBanking?.services || [];
                    setFormData({
                      ...formData,
                      smeBanking: {
                        ...formData.smeBanking,
                        services: [...currentServices, { title: '', desc: '' }]
                      }
                    });
                  }}
                  className="h-8 rounded-lg text-xs"
                >
                  <Plus className="h-3 w-3 mr-1" /> Add Commercial Service
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {(formData.smeBanking?.services || []).map((service, sIdx) => (
                  <div key={sIdx} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2 relative">
                    <div className="absolute top-2 right-2">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          const updated = (formData.smeBanking?.services || []).filter((_, i) => i !== sIdx);
                          setFormData({ ...formData, smeBanking: { ...formData.smeBanking, services: updated } });
                        }}
                        className="h-7 w-7 p-0 text-red-500"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                    <div className="pr-6">
                      <label className="block text-[10px] font-semibold text-slate-500 mb-0.5">Service Title</label>
                      <input
                        type="text"
                        value={service.title}
                        onChange={(e) => {
                          const updated = [...(formData.smeBanking?.services || [])];
                          updated[sIdx].title = e.target.value;
                          setFormData({ ...formData, smeBanking: { ...formData.smeBanking, services: updated } });
                        }}
                        className="w-full p-1.5 rounded bg-white border border-[#e2e8f0] text-xs font-bold text-[#0a1e3f]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold text-slate-500 mb-0.5">Service Description</label>
                      <textarea
                        rows={2}
                        value={service.desc}
                        onChange={(e) => {
                          const updated = [...(formData.smeBanking?.services || [])];
                          updated[sIdx].desc = e.target.value;
                          setFormData({ ...formData, smeBanking: { ...formData.smeBanking, services: updated } });
                        }}
                        className="w-full p-1.5 rounded bg-white border border-[#e2e8f0] text-xs text-slate-600"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Commercial Benefits Bullet Points */}
            <div className="border-t border-slate-100 pt-4">
              <div className="flex justify-between items-center mb-3">
                <h4 className="text-xs font-heading font-bold text-[#0a1e3f] uppercase tracking-wider">
                  Commercial Account Benefits
                </h4>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const currentBenefits = formData.smeBanking?.benefits || [];
                    setFormData({
                      ...formData,
                      smeBanking: { ...formData.smeBanking, benefits: [...currentBenefits, ''] }
                    });
                  }}
                  className="h-8 rounded-lg text-xs"
                >
                  <Plus className="h-3 w-3 mr-1" /> Add Benefit
                </Button>
              </div>

              <div className="space-y-2">
                {(formData.smeBanking?.benefits || []).map((b, bIdx) => (
                  <div key={bIdx} className="flex gap-2">
                    <input
                      type="text"
                      value={b}
                      onChange={(e) => {
                        const updated = [...(formData.smeBanking?.benefits || [])];
                        updated[bIdx] = e.target.value;
                        setFormData({ ...formData, smeBanking: { ...formData.smeBanking, benefits: updated } });
                      }}
                      className="flex-1 p-2 rounded-lg border border-[#e2e8f0] text-xs"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        const updated = (formData.smeBanking?.benefits || []).filter((_, i) => i !== bIdx);
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
          </TabsContent>

          {/* TAB 7: CUSTOMER JOURNEY ROADMAP */}
          <TabsContent value="journey" className="space-y-4">
            <div className="border-b border-slate-100 pb-3 mb-4">
              <h3 className="font-heading font-bold text-sm text-[#0a1e3f]">
                Customer Experience Roadmap & Process
              </h3>
              <p className="text-xs text-slate-400">Configure the 5 transparent steps outlining the banking experience from onboarding to enterprise growth.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">Section Badge</label>
                <input
                  type="text"
                  value={formData.customerJourney?.badge || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    customerJourney: { ...(formData.customerJourney || {} as any), badge: e.target.value }
                  })}
                  className="w-full p-2.5 rounded-xl border border-[#e2e8f0] text-xs font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">Section Heading</label>
                <input
                  type="text"
                  value={formData.customerJourney?.heading || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    customerJourney: { ...(formData.customerJourney || {} as any), heading: e.target.value }
                  })}
                  className="w-full p-2.5 rounded-xl border border-[#e2e8f0] text-xs font-bold text-[#0a1e3f]"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">Section Narrative Description</label>
                <textarea
                  rows={2}
                  value={formData.customerJourney?.description || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    customerJourney: { ...(formData.customerJourney || {} as any), description: e.target.value }
                  })}
                  className="w-full p-2.5 rounded-xl border border-[#e2e8f0] text-xs text-slate-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">Roadmap CTA Button Label</label>
                <input
                  type="text"
                  value={formData.customerJourney?.ctaText || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    customerJourney: { ...(formData.customerJourney || {} as any), ctaText: e.target.value }
                  })}
                  className="w-full p-2.5 rounded-xl border border-[#e2e8f0] text-xs font-semibold text-[#0a1e3f]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">Roadmap CTA Link Path</label>
                <input
                  type="text"
                  value={formData.customerJourney?.ctaLink || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    customerJourney: { ...(formData.customerJourney || {} as any), ctaLink: e.target.value }
                  })}
                  className="w-full p-2.5 rounded-xl border border-[#e2e8f0] text-xs font-mono text-[#0284c7]"
                />
              </div>
            </div>

            {/* Steps CRUD */}
            <div className="border-t border-slate-100 pt-4">
              <div className="flex justify-between items-center mb-3">
                <h4 className="text-xs font-heading font-bold text-[#0a1e3f] uppercase tracking-wider">
                  Process Roadmap Steps
                </h4>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const currentSteps = formData.customerJourney?.steps || [];
                    const nextNum = (currentSteps.length + 1).toString().padStart(2, '0');
                    setFormData({
                      ...formData,
                      customerJourney: {
                        ...(formData.customerJourney || {} as any),
                        steps: [
                          ...currentSteps,
                          { step: nextNum, title: '', desc: '' }
                        ]
                      }
                    });
                  }}
                  className="h-8 rounded-lg text-xs"
                >
                  <Plus className="h-3 w-3 mr-1" /> Add Process Step
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                {(formData.customerJourney?.steps || []).map((st, sIdx) => (
                  <div key={sIdx} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2 relative">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-[#0284c7] px-1.5 py-0.5 rounded bg-sky-100">
                        {st.step}
                      </span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          const updated = (formData.customerJourney?.steps || []).filter((_, i) => i !== sIdx);
                          setFormData({
                            ...formData,
                            customerJourney: { ...(formData.customerJourney || {} as any), steps: updated }
                          });
                        }}
                        className="h-6 w-6 p-0 text-red-500"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold text-slate-500 mb-0.5">Step Title</label>
                      <input
                        type="text"
                        value={st.title}
                        onChange={(e) => {
                          const updated = [...(formData.customerJourney?.steps || [])];
                          updated[sIdx].title = e.target.value;
                          setFormData({ ...formData, customerJourney: { ...(formData.customerJourney || {} as any), steps: updated } });
                        }}
                        className="w-full p-1.5 rounded border border-[#e2e8f0] text-xs font-bold text-[#0a1e3f]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold text-slate-500 mb-0.5">Step Description</label>
                      <textarea
                        rows={3}
                        value={st.desc}
                        onChange={(e) => {
                          const updated = [...(formData.customerJourney?.steps || [])];
                          updated[sIdx].desc = e.target.value;
                          setFormData({ ...formData, customerJourney: { ...(formData.customerJourney || {} as any), steps: updated } });
                        }}
                        className="w-full p-1.5 rounded border border-[#e2e8f0] text-[11px] text-slate-600"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* TAB 8: DIGITAL & MOBILITY */}
          <TabsContent value="digital" className="space-y-4">
            <div className="border-b border-slate-100 pb-3 mb-4">
              <h3 className="font-heading font-bold text-sm text-[#0a1e3f]">
                Digital Channels & Mobility Section
              </h3>
              <p className="text-xs text-slate-400">Mobile banking app, USSD shortcuts, online transfers, and card management.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">Section Badge</label>
                <input
                  type="text"
                  value={formData.digitalBankingSection?.badge || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    digitalBankingSection: { ...(formData.digitalBankingSection || {} as any), badge: e.target.value }
                  })}
                  className="w-full p-2.5 rounded-xl border border-[#e2e8f0] text-xs font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">Section Heading</label>
                <input
                  type="text"
                  value={formData.digitalBankingSection?.heading || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    digitalBankingSection: { ...(formData.digitalBankingSection || {} as any), heading: e.target.value }
                  })}
                  className="w-full p-2.5 rounded-xl border border-[#e2e8f0] text-xs font-bold text-[#0a1e3f]"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">Section Description</label>
                <textarea
                  rows={2}
                  value={formData.digitalBankingSection?.description || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    digitalBankingSection: { ...(formData.digitalBankingSection || {} as any), description: e.target.value }
                  })}
                  className="w-full p-2.5 rounded-xl border border-[#e2e8f0] text-xs text-slate-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">CTA Button Label</label>
                <input
                  type="text"
                  value={formData.digitalBankingSection?.ctaText || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    digitalBankingSection: { ...(formData.digitalBankingSection || {} as any), ctaText: e.target.value }
                  })}
                  className="w-full p-2.5 rounded-xl border border-[#e2e8f0] text-xs font-semibold text-[#0a1e3f]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">CTA Link Path</label>
                <input
                  type="text"
                  value={formData.digitalBankingSection?.ctaLink || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    digitalBankingSection: { ...(formData.digitalBankingSection || {} as any), ctaLink: e.target.value }
                  })}
                  className="w-full p-2.5 rounded-xl border border-[#e2e8f0] text-xs font-mono text-[#0284c7]"
                />
              </div>
            </div>

            {/* Digital Capabilities CRUD */}
            <div className="border-t border-slate-100 pt-4">
              <div className="flex justify-between items-center mb-3">
                <h4 className="text-xs font-heading font-bold text-[#0a1e3f] uppercase tracking-wider">
                  Digital Capabilities Matrix
                </h4>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const currentCaps = formData.digitalBankingSection?.capabilities || [];
                    setFormData({
                      ...formData,
                      digitalBankingSection: {
                        ...(formData.digitalBankingSection || {} as any),
                        capabilities: [...currentCaps, { title: '', desc: '' }]
                      }
                    });
                  }}
                  className="h-8 rounded-lg text-xs"
                >
                  <Plus className="h-3 w-3 mr-1" /> Add Capability
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {(formData.digitalBankingSection?.capabilities || []).map((cap, cIdx) => (
                  <div key={cIdx} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2 relative">
                    <div className="absolute top-2 right-2">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          const updated = (formData.digitalBankingSection?.capabilities || []).filter((_, i) => i !== cIdx);
                          setFormData({
                            ...formData,
                            digitalBankingSection: { ...(formData.digitalBankingSection || {} as any), capabilities: updated }
                          });
                        }}
                        className="h-7 w-7 p-0 text-red-500"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                    <div className="pr-6">
                      <label className="block text-[10px] font-semibold text-slate-500 mb-0.5">Capability Title</label>
                      <input
                        type="text"
                        value={cap.title}
                        onChange={(e) => {
                          const updated = [...(formData.digitalBankingSection?.capabilities || [])];
                          updated[cIdx].title = e.target.value;
                          setFormData({ ...formData, digitalBankingSection: { ...(formData.digitalBankingSection || {} as any), capabilities: updated } });
                        }}
                        className="w-full p-1.5 rounded bg-white border border-[#e2e8f0] text-xs font-bold text-[#0a1e3f]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold text-slate-500 mb-0.5">Description</label>
                      <textarea
                        rows={2}
                        value={cap.desc}
                        onChange={(e) => {
                          const updated = [...(formData.digitalBankingSection?.capabilities || [])];
                          updated[cIdx].desc = e.target.value;
                          setFormData({ ...formData, digitalBankingSection: { ...(formData.digitalBankingSection || {} as any), capabilities: updated } });
                        }}
                        className="w-full p-1.5 rounded bg-white border border-[#e2e8f0] text-xs text-slate-600"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* TAB 9: FINANCIAL GUIDES & LITERACY */}
          <TabsContent value="education" className="space-y-4">
            <div className="border-b border-slate-100 pb-3 mb-4">
              <h3 className="font-heading font-bold text-sm text-[#0a1e3f]">
                Financial Literacy & Practical Guides
              </h3>
              <p className="text-xs text-slate-400">Configure financial education articles, guides, categories, and educational resources.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">Section Badge</label>
                <input
                  type="text"
                  value={formData.financialEducationSection?.badge || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    financialEducationSection: { ...(formData.financialEducationSection || {} as any), badge: e.target.value }
                  })}
                  className="w-full p-2.5 rounded-xl border border-[#e2e8f0] text-xs font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">Section Heading</label>
                <input
                  type="text"
                  value={formData.financialEducationSection?.heading || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    financialEducationSection: { ...(formData.financialEducationSection || {} as any), heading: e.target.value }
                  })}
                  className="w-full p-2.5 rounded-xl border border-[#e2e8f0] text-xs font-bold text-[#0a1e3f]"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">Section Description</label>
                <textarea
                  rows={2}
                  value={formData.financialEducationSection?.description || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    financialEducationSection: { ...(formData.financialEducationSection || {} as any), description: e.target.value }
                  })}
                  className="w-full p-2.5 rounded-xl border border-[#e2e8f0] text-xs text-slate-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">CTA Button Label</label>
                <input
                  type="text"
                  value={formData.financialEducationSection?.ctaText || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    financialEducationSection: { ...(formData.financialEducationSection || {} as any), ctaText: e.target.value }
                  })}
                  className="w-full p-2.5 rounded-xl border border-[#e2e8f0] text-xs font-semibold text-[#0a1e3f]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">CTA Link Path</label>
                <input
                  type="text"
                  value={formData.financialEducationSection?.ctaLink || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    financialEducationSection: { ...(formData.financialEducationSection || {} as any), ctaLink: e.target.value }
                  })}
                  className="w-full p-2.5 rounded-xl border border-[#e2e8f0] text-xs font-mono text-[#0284c7]"
                />
              </div>
            </div>

            {/* Guides List CRUD */}
            <div className="border-t border-slate-100 pt-4">
              <div className="flex justify-between items-center mb-3">
                <h4 className="text-xs font-heading font-bold text-[#0a1e3f] uppercase tracking-wider">
                  Educational Guides & Articles
                </h4>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const currentGuides = formData.financialEducationSection?.guides || [];
                    setFormData({
                      ...formData,
                      financialEducationSection: {
                        ...(formData.financialEducationSection || {} as any),
                        guides: [
                          ...currentGuides,
                          {
                            category: 'Budgeting & Savings',
                            title: '',
                            excerpt: '',
                            readTime: '4 min read',
                            href: '/news'
                          }
                        ]
                      }
                    });
                  }}
                  className="h-8 rounded-lg text-xs"
                >
                  <Plus className="h-3 w-3 mr-1" /> Add Guide
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {(formData.financialEducationSection?.guides || []).map((guide, gIdx) => (
                  <div key={gIdx} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 relative">
                    <div className="absolute top-2 right-2">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          const updated = (formData.financialEducationSection?.guides || []).filter((_, i) => i !== gIdx);
                          setFormData({
                            ...formData,
                            financialEducationSection: { ...(formData.financialEducationSection || {} as any), guides: updated }
                          });
                        }}
                        className="h-7 w-7 p-0 text-red-500"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pr-6">
                      <div>
                        <label className="block text-[10px] font-semibold text-slate-500 mb-0.5">Category</label>
                        <input
                          type="text"
                          value={guide.category}
                          onChange={(e) => {
                            const updated = [...(formData.financialEducationSection?.guides || [])];
                            updated[gIdx].category = e.target.value;
                            setFormData({ ...formData, financialEducationSection: { ...(formData.financialEducationSection || {} as any), guides: updated } });
                          }}
                          className="w-full p-1.5 rounded bg-white border border-[#e2e8f0] text-xs font-semibold text-[#0284c7]"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-semibold text-slate-500 mb-0.5">Read Time</label>
                        <input
                          type="text"
                          value={guide.readTime}
                          onChange={(e) => {
                            const updated = [...(formData.financialEducationSection?.guides || [])];
                            updated[gIdx].readTime = e.target.value;
                            setFormData({ ...formData, financialEducationSection: { ...(formData.financialEducationSection || {} as any), guides: updated } });
                          }}
                          className="w-full p-1.5 rounded bg-white border border-[#e2e8f0] text-xs"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-semibold text-slate-500 mb-0.5">Guide Title</label>
                      <input
                        type="text"
                        value={guide.title}
                        onChange={(e) => {
                          const updated = [...(formData.financialEducationSection?.guides || [])];
                          updated[gIdx].title = e.target.value;
                          setFormData({ ...formData, financialEducationSection: { ...(formData.financialEducationSection || {} as any), guides: updated } });
                        }}
                        className="w-full p-1.5 rounded bg-white border border-[#e2e8f0] text-xs font-bold text-[#0a1e3f]"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-semibold text-slate-500 mb-0.5">Summary / Excerpt</label>
                      <textarea
                        rows={2}
                        value={guide.excerpt}
                        onChange={(e) => {
                          const updated = [...(formData.financialEducationSection?.guides || [])];
                          updated[gIdx].excerpt = e.target.value;
                          setFormData({ ...formData, financialEducationSection: { ...(formData.financialEducationSection || {} as any), guides: updated } });
                        }}
                        className="w-full p-1.5 rounded bg-white border border-[#e2e8f0] text-xs text-slate-600"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-semibold text-slate-500 mb-0.5">Article Link / Slug</label>
                      <input
                        type="text"
                        value={guide.href}
                        onChange={(e) => {
                          const updated = [...(formData.financialEducationSection?.guides || [])];
                          updated[gIdx].href = e.target.value;
                          setFormData({ ...formData, financialEducationSection: { ...(formData.financialEducationSection || {} as any), guides: updated } });
                        }}
                        className="w-full p-1.5 rounded bg-white border border-[#e2e8f0] text-xs font-mono text-[#0284c7]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* TAB 10: AGENT & INCLUSION (SPECIALIZED) */}
          <TabsContent value="specialized" className="space-y-4">
            <div className="border-b border-slate-100 pb-3 mb-4">
              <h3 className="font-heading font-bold text-sm text-[#0a1e3f]">
                Specialized Banking & Agency Network
              </h3>
              <p className="text-xs text-slate-400">Configure POS agent banking, financial inclusion initiatives, and security safeguards.</p>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {/* Agent Banking */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-[#0284c7]">
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
                      <label className="block text-[11px] font-semibold text-slate-500">Agent Network Features</label>
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

              {/* Student Banking */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-purple-700">
                  Student Banking & Financial Inclusion
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
                      <label className="block text-[11px] font-semibold text-slate-500">Student & Youth Benefits</label>
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
                <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-rose-700">
                  Security & Compliance Standards
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
                </div>
              </div>
            </div>
          </TabsContent>

          {/* TAB 11: PRODUCTS MATRIX */}
          <TabsContent value="products" className="space-y-4">
            <div className="border-b border-slate-100 pb-3 mb-4 flex justify-between items-center">
              <div>
                <h3 className="font-heading font-bold text-sm text-[#0a1e3f]">
                  Core Banking Products Matrix
                </h3>
                <p className="text-xs text-slate-400">Manage individual retail and commercial product feature tiles.</p>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setFormData({
                  ...formData,
                  products: [
                    ...formData.products,
                    {
                      id: Date.now().toString(),
                      title: 'New Product',
                      description: 'Product description goes here.',
                      iconName: 'Wallet',
                      link: '/products',
                      badge: '',
                      highlighted: false
                    }
                  ]
                })}
                className="h-8 text-xs"
              >
                <Plus className="h-3.5 w-3.5 mr-1" /> Add Product
              </Button>
            </div>

            <div className="space-y-4">
              {formData.products.map((product, idx) => (
                <div key={product.id || idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 relative">
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
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pr-8">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-500 mb-1">Product Title</label>
                      <input
                        type="text"
                        value={product.title}
                        onChange={(e) => {
                          const updated = [...formData.products];
                          updated[idx].title = e.target.value;
                          setFormData({ ...formData, products: updated });
                        }}
                        className="w-full p-2 rounded-lg bg-white border border-[#e2e8f0] text-xs font-bold text-[#0a1e3f]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-500 mb-1">Badge Tag</label>
                      <input
                        type="text"
                        value={product.badge || ''}
                        onChange={(e) => {
                          const updated = [...formData.products];
                          updated[idx].badge = e.target.value;
                          setFormData({ ...formData, products: updated });
                        }}
                        className="w-full p-2 rounded-lg bg-white border border-[#e2e8f0] text-xs font-semibold text-[#0284c7]"
                        placeholder="e.g. Popular, High Yield"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-[11px] font-semibold text-slate-500 mb-1">Description</label>
                      <textarea
                        rows={2}
                        value={product.description}
                        onChange={(e) => {
                          const updated = [...formData.products];
                          updated[idx].description = e.target.value;
                          setFormData({ ...formData, products: updated });
                        }}
                        className="w-full p-2 rounded-lg bg-white border border-[#e2e8f0] text-xs text-slate-600"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-500 mb-1">Target Link Path</label>
                      <input
                        type="text"
                        value={product.link}
                        onChange={(e) => {
                          const updated = [...formData.products];
                          updated[idx].link = e.target.value;
                          setFormData({ ...formData, products: updated });
                        }}
                        className="w-full p-2 rounded-lg bg-white border border-[#e2e8f0] text-xs font-mono text-[#0284c7]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-500 mb-1">Icon Representation</label>
                      <select
                        value={product.iconName}
                        onChange={(e) => {
                          const updated = [...formData.products];
                          updated[idx].iconName = e.target.value;
                          setFormData({ ...formData, products: updated });
                        }}
                        className="w-full p-2 rounded-lg bg-white border border-[#e2e8f0] text-xs font-medium"
                      >
                        <option value="Wallet">Wallet / Everyday Savings</option>
                        <option value="Building">Building / Corporate</option>
                        <option value="Users">Users / Community</option>
                        <option value="Smartphone">Smartphone / Mobile</option>
                        <option value="ShieldCheck">Shield / Security</option>
                        <option value="Globe">Globe / Cross-Border</option>
                      </select>
                    </div>

                    <div className="md:col-span-2 flex items-center gap-2 mt-1">
                      <input
                        type="checkbox"
                        checked={product.highlighted || false}
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
            </div>
          </TabsContent>

          {/* TAB 12: TESTIMONIALS */}
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
                      <label className="block text-[11px] font-semibold text-slate-500 mb-1">Role (e.g. Retail Trader)</label>
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
                      <label className="block text-[11px] font-semibold text-slate-500 mb-1">Company / Location</label>
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
            </div>
          </TabsContent>

          {/* TAB 13: BRANCHES */}
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

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pr-8">
                    <div>
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

                    <div className="md:col-span-2">
                      <label className="block text-[11px] font-semibold text-slate-500 mb-1">Physical Address</label>
                      <input
                        type="text"
                        value={branch.address}
                        onChange={(e) => {
                          const updated = [...(formData.branches || [])];
                          updated[idx].address = e.target.value;
                          setFormData({ ...formData, branches: updated });
                        }}
                        className="w-full p-2 rounded-lg bg-white border border-[#e2e8f0] text-xs text-slate-700"
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

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-500 mb-1">Direct Phone</label>
                      <input
                        type="text"
                        value={branch.phone}
                        onChange={(e) => {
                          const updated = [...(formData.branches || [])];
                          updated[idx].phone = e.target.value;
                          setFormData({ ...formData, branches: updated });
                        }}
                        className="w-full p-2 rounded-lg bg-white border border-[#e2e8f0] text-xs font-mono"
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
                        className="w-full p-2 rounded-lg bg-white border border-[#e2e8f0] text-xs text-slate-600"
                      />
                    </div>

                    <div>
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

                    <div className="flex items-center gap-2 mt-4">
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
                      <label htmlFor={`hq-${idx}`} className="text-xs font-semibold text-slate-600 cursor-pointer">
                        Main Head Office
                      </label>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* TAB 14: SEO & FOOTER */}
          <TabsContent value="seo" className="space-y-4">
            <div className="border-b border-slate-100 pb-3 mb-4">
              <h3 className="font-heading font-bold text-sm text-[#0a1e3f]">
                Search Engine Optimization & Footer Metadata
              </h3>
              <p className="text-xs text-slate-400">Configure global metadata, search snippets, social shares, and footer credentials.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">
                  Global Meta Title (Browser Tab & Search Results)
                </label>
                <input
                  type="text"
                  value={formData.seo?.metaTitle || ''}
                  onChange={(e) => setFormData({ ...formData, seo: { ...formData.seo, metaTitle: e.target.value } })}
                  className="w-full p-2.5 rounded-xl border border-[#e2e8f0] text-xs font-medium focus:border-[#0284c7] outline-none"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">
                  Global Meta Description (Search Snippet)
                </label>
                <textarea
                  rows={3}
                  value={formData.seo?.metaDescription || ''}
                  onChange={(e) => setFormData({ ...formData, seo: { ...formData.seo, metaDescription: e.target.value } })}
                  className="w-full p-2.5 rounded-xl border border-[#e2e8f0] text-xs font-medium focus:border-[#0284c7] outline-none"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">
                  Open Graph Social Share Image URL
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={formData.seo?.ogImage || ''}
                    onChange={(e) => setFormData({ ...formData, seo: { ...formData.seo, ogImage: e.target.value } })}
                    className="flex-1 p-2.5 rounded-xl border border-[#e2e8f0] text-xs font-mono text-[#0284c7]"
                    placeholder="/images/social-share.png"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => openMediaPicker(formData.seo?.ogImage || '', (url) => {
                      setFormData({ ...formData, seo: { ...formData.seo, ogImage: url } });
                    })}
                    className="rounded-xl border-slate-200 text-xs font-semibold hover:bg-slate-50"
                  >
                    <ImageIcon className="h-3.5 w-3.5 mr-1" />
                    Media Library
                  </Button>
                </div>
              </div>

              {/* Footer configuration */}
              <div className="md:col-span-2 border-t border-slate-100 pt-4 mt-2">
                <h4 className="text-xs font-heading font-bold text-[#0a1e3f] uppercase tracking-wider mb-3">
                  Footer Disclaimers & Social Channels
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">Footer Narrative Summary</label>
                    <textarea
                      rows={2}
                      value={formData.footer?.description || ''}
                      onChange={(e) => setFormData({ ...formData, footer: { ...(formData.footer || {}), description: e.target.value } as any })}
                      className="w-full p-2.5 rounded-xl border border-[#e2e8f0] text-xs font-medium focus:border-[#0284c7] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">CBN Regulatory Disclaimer</label>
                    <input
                      type="text"
                      value={formData.footer?.cbnDisclaimer || ''}
                      onChange={(e) => setFormData({ ...formData, footer: { ...(formData.footer || {}), cbnDisclaimer: e.target.value } as any })}
                      className="w-full p-2.5 rounded-xl border border-[#e2e8f0] text-xs font-medium focus:border-[#0284c7] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">NDIC Insurance Disclaimer</label>
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
        onClose={() => setMediaPickerConfig(prev => ({ ...prev, isOpen: false }))}
        onSelect={mediaPickerConfig.onSelect}
      />
    </div>
  );
}
