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
  Sparkles
} from 'lucide-react';
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
          <TabsList className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-1 bg-slate-100 p-1 rounded-xl mb-6">
            <TabsTrigger value="hero" className="rounded-lg text-xs font-semibold">
              Hero Section
            </TabsTrigger>
            <TabsTrigger value="stats" className="rounded-lg text-xs font-semibold">
              Trust & Stats
            </TabsTrigger>
            <TabsTrigger value="about" className="rounded-lg text-xs font-semibold">
              About & Purpose
            </TabsTrigger>
            <TabsTrigger value="products" className="rounded-lg text-xs font-semibold">
              Products
            </TabsTrigger>
            <TabsTrigger value="specialized" className="rounded-lg text-xs font-semibold">
              SME & Agent
            </TabsTrigger>
            <TabsTrigger value="testimonials" className="rounded-lg text-xs font-semibold">
              Testimonials
            </TabsTrigger>
            <TabsTrigger value="seo" className="rounded-lg text-xs font-semibold">
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
            </div>

            <div className="space-y-3">
              {formData.products.map((prod, idx) => (
                <div key={prod.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
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

                  <div>
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
                </div>
              ))}
            </div>
          </TabsContent>

          {/* TAB 5: SME & AGENT */}
          <TabsContent value="specialized" className="space-y-4">
            <div className="border-b border-slate-100 pb-3 mb-4">
              <h3 className="font-heading font-bold text-sm text-[#0a1e3f]">
                Agent Banking & SME Commercial Sections
              </h3>
              <p className="text-xs text-slate-400">Configure POS agency network and commercial enterprise content.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Agent Banking */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <h4 className="font-heading font-bold text-xs text-[#0a1e3f] uppercase tracking-wider text-sky-700">
                  Agent Banking Section
                </h4>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 mb-1">Heading</label>
                  <input
                    type="text"
                    value={formData.agentBanking.heading}
                    onChange={(e) => setFormData({ ...formData, agentBanking: { ...formData.agentBanking, heading: e.target.value } })}
                    className="w-full p-2 rounded-lg bg-white border border-[#e2e8f0] text-xs font-semibold text-[#0a1e3f]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 mb-1">Description</label>
                  <textarea
                    rows={2}
                    value={formData.agentBanking.description}
                    onChange={(e) => setFormData({ ...formData, agentBanking: { ...formData.agentBanking, description: e.target.value } })}
                    className="w-full p-2 rounded-lg bg-white border border-[#e2e8f0] text-xs text-slate-600"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 mb-1">Agent Outlets Stat</label>
                  <input
                    type="text"
                    value={formData.agentBanking.statValue}
                    onChange={(e) => setFormData({ ...formData, agentBanking: { ...formData.agentBanking, statValue: e.target.value } })}
                    className="w-full p-2 rounded-lg bg-white border border-[#e2e8f0] text-xs font-bold text-[#0a1e3f]"
                  />
                </div>
              </div>

              {/* SME Banking */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <h4 className="font-heading font-bold text-xs text-[#0a1e3f] uppercase tracking-wider text-emerald-700">
                  SME Banking Section
                </h4>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 mb-1">Heading</label>
                  <input
                    type="text"
                    value={formData.smeBanking.heading}
                    onChange={(e) => setFormData({ ...formData, smeBanking: { ...formData.smeBanking, heading: e.target.value } })}
                    className="w-full p-2 rounded-lg bg-white border border-[#e2e8f0] text-xs font-semibold text-[#0a1e3f]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 mb-1">Description</label>
                  <textarea
                    rows={2}
                    value={formData.smeBanking.description}
                    onChange={(e) => setFormData({ ...formData, smeBanking: { ...formData.smeBanking, description: e.target.value } })}
                    className="w-full p-2 rounded-lg bg-white border border-[#e2e8f0] text-xs text-slate-600"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 mb-1">CTA Button Text</label>
                  <input
                    type="text"
                    value={formData.smeBanking.ctaText}
                    onChange={(e) => setFormData({ ...formData, smeBanking: { ...formData.smeBanking, ctaText: e.target.value } })}
                    className="w-full p-2 rounded-lg bg-white border border-[#e2e8f0] text-xs font-bold text-[#0a1e3f]"
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          {/* TAB 6: TESTIMONIALS */}
          <TabsContent value="testimonials" className="space-y-4">
            <div className="border-b border-slate-100 pb-3 mb-4">
              <h3 className="font-heading font-bold text-sm text-[#0a1e3f]">
                Customer Testimonials & Client Endorsements
              </h3>
              <p className="text-xs text-slate-400">Authentic quotes from verified accountholders and traders.</p>
            </div>

            <div className="space-y-3">
              {formData.testimonials.map((t, idx) => (
                <div key={t.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 grid grid-cols-1 md:grid-cols-3 gap-3">
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
                    <label className="block text-[11px] font-semibold text-slate-500 mb-1">Role & Business</label>
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
              ))}
            </div>
          </TabsContent>

          {/* TAB 7: SEO & FOOTER */}
          <TabsContent value="seo" className="space-y-4">
            <div className="border-b border-slate-100 pb-3 mb-4">
              <h3 className="font-heading font-bold text-sm text-[#0a1e3f]">
                Search Engine Optimization (SEO) & Footer Settings
              </h3>
              <p className="text-xs text-slate-400">Meta tags, canonical URL, social channels, and institutional footer disclosures.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">
                  Global Meta Title
                </label>
                <input
                  type="text"
                  value={formData.seo.metaTitle}
                  onChange={(e) => setFormData({ ...formData, seo: { ...formData.seo, metaTitle: e.target.value } })}
                  className="w-full p-2.5 rounded-xl border border-[#e2e8f0] text-xs font-medium focus:border-[#0284c7] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">
                  Canonical URL
                </label>
                <input
                  type="text"
                  value={formData.seo.canonicalUrl}
                  onChange={(e) => setFormData({ ...formData, seo: { ...formData.seo, canonicalUrl: e.target.value } })}
                  className="w-full p-2.5 rounded-xl border border-[#e2e8f0] text-xs font-medium focus:border-[#0284c7] outline-none"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">
                  Global Meta Description
                </label>
                <textarea
                  rows={2}
                  value={formData.seo.metaDescription}
                  onChange={(e) => setFormData({ ...formData, seo: { ...formData.seo, metaDescription: e.target.value } })}
                  className="w-full p-2.5 rounded-xl border border-[#e2e8f0] text-xs font-medium focus:border-[#0284c7] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">
                  Footer Copyright Line
                </label>
                <input
                  type="text"
                  value={formData.footer.copyrightText}
                  onChange={(e) => setFormData({ ...formData, footer: { ...formData.footer, copyrightText: e.target.value } })}
                  className="w-full p-2.5 rounded-xl border border-[#e2e8f0] text-xs font-medium focus:border-[#0284c7] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">
                  Customer Care Phone
                </label>
                <input
                  type="text"
                  value={formData.contactInfo.phone}
                  onChange={(e) => setFormData({ ...formData, contactInfo: { ...formData.contactInfo, phone: e.target.value } })}
                  className="w-full p-2.5 rounded-xl border border-[#e2e8f0] text-xs font-medium focus:border-[#0284c7] outline-none"
                />
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
    </div>
  );
}
