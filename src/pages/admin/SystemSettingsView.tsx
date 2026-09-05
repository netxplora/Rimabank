import React, { useState, useEffect } from 'react';
import {
  Settings,
  Save,
  ShieldCheck,
  AlertTriangle,
  Lock,
  Globe,
  Sliders,
  CheckCircle2,
  HardDrive,
  Mail,
  Phone,
  MapPin,
  Clock,
  Bell,
  RefreshCw,
  Database
} from 'lucide-react';
import { useCMS } from '@/context/CMSContext';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function SystemSettingsView() {
  const { systemSettings, updateSystemSettings } = useCMS();
  const { user, can } = useAuth();
  const [formData, setFormData] = useState(systemSettings);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'general' | 'channel' | 'security' | 'storage'>('general');

  useEffect(() => {
    setFormData(systemSettings);
  }, [systemSettings]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    if (!can('manage_settings', 'system_settings')) {
      toast.error('Only Super Administrators have permission to modify system settings.');
      return;
    }

    setIsSaving(true);
    updateSystemSettings(formData, { id: user.id, name: user.name, role: user.role });
    setTimeout(() => {
      setIsSaving(false);
      toast.success('System configuration saved and synced to database.');
    }, 400);
  };

  const uploadSizeMB = Math.round(formData.maxUploadSizeBytes / (1024 * 1024));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-[#e2e8f0] shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-sky-100 text-[#0284c7]">
              Administrative Control
            </span>
          </div>
          <h1 className="text-xl font-heading font-bold text-[#0a1e3f] tracking-tight">
            System Settings & Security Policies
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure institutional identities, security parameters, maintenance windows, and storage limits.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className="h-10 px-5 rounded-xl bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-semibold shadow-sm flex items-center gap-2"
          >
            {isSaving ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                <span>Saving Changes...</span>
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                <span>Save Configuration</span>
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Tabs navigation */}
      <div className="flex overflow-x-auto gap-2 bg-slate-100 p-1.5 rounded-xl border border-slate-200/80 scrollbar-none">
        <button
          type="button"
          onClick={() => setActiveTab('general')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 transition-all ${
            activeTab === 'general' ? 'bg-white text-[#0a1e3f] shadow-xs' : 'text-slate-600 hover:text-[#0a1e3f]'
          }`}
        >
          <Globe className="h-4 w-4 text-[#0284c7]" />
          <span>Institutional Profile</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('channel')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 transition-all ${
            activeTab === 'channel' ? 'bg-white text-[#0a1e3f] shadow-xs' : 'text-slate-600 hover:text-[#0a1e3f]'
          }`}
        >
          <AlertTriangle className="h-4 w-4 text-amber-500" />
          <span>Maintenance & Channels</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('security')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 transition-all ${
            activeTab === 'security' ? 'bg-white text-[#0a1e3f] shadow-xs' : 'text-slate-600 hover:text-[#0a1e3f]'
          }`}
        >
          <Lock className="h-4 w-4 text-emerald-600" />
          <span>Security & Sessions</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('storage')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 transition-all ${
            activeTab === 'storage' ? 'bg-white text-[#0a1e3f] shadow-xs' : 'text-slate-600 hover:text-[#0a1e3f]'
          }`}
        >
          <HardDrive className="h-4 w-4 text-purple-600" />
          <span>Media & Storage Policy</span>
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Tab 1: General Profile */}
        {activeTab === 'general' && (
          <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5 sm:p-6 shadow-xs space-y-5 animate-in fade-in-50">
            <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-[#0284c7]" />
                <h3 className="font-heading font-bold text-sm text-[#0a1e3f]">
                  Institutional Identity & Public Information
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">
                  Official Institution Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.siteName}
                  onChange={(e) => setFormData({ ...formData, siteName: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-[#e2e8f0] text-xs font-medium focus:border-[#0284c7] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">
                  Institutional Tagline
                </label>
                <input
                  type="text"
                  value={formData.tagline}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-[#e2e8f0] text-xs font-medium focus:border-[#0284c7] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0a1e3f] mb-1 flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5 text-slate-400" />
                  <span>Public Inquiries Email</span>
                </label>
                <input
                  type="email"
                  value={formData.contactEmail || 'info@rimamfb.com'}
                  onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-[#e2e8f0] text-xs font-medium focus:border-[#0284c7] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0a1e3f] mb-1 flex items-center gap-1.5">
                  <Phone className="h-3.5 w-3.5 text-slate-400" />
                  <span>Official Support Hotline</span>
                </label>
                <input
                  type="text"
                  value={formData.contactPhone || '+234 800 000 7462'}
                  onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-[#e2e8f0] text-xs font-medium focus:border-[#0284c7] outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-[#0a1e3f] mb-1 flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-slate-400" />
                  <span>Headquarters Physical Address</span>
                </label>
                <input
                  type="text"
                  value={formData.headquartersAddress || 'Head Office: Sokoto, Nigeria'}
                  onChange={(e) => setFormData({ ...formData, headquartersAddress: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-[#e2e8f0] text-xs font-medium focus:border-[#0284c7] outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-[#0a1e3f] mb-1 flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-slate-400" />
                  <span>Banking & Support Operating Hours</span>
                </label>
                <input
                  type="text"
                  value={formData.supportHours || 'Monday - Friday: 8:00 AM - 5:00 PM'}
                  onChange={(e) => setFormData({ ...formData, supportHours: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-[#e2e8f0] text-xs font-medium focus:border-[#0284c7] outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Channel & Maintenance */}
        {activeTab === 'channel' && (
          <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5 sm:p-6 shadow-xs space-y-5 animate-in fade-in-50">
            <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-500" />
                <h3 className="font-heading font-bold text-sm text-[#0a1e3f]">
                  Public Access & Service Availability Controls
                </h3>
              </div>
            </div>

            {/* Maintenance toggle */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="block text-xs font-bold text-[#0a1e3f]">Maintenance Mode</span>
                <span className="block text-[11px] text-slate-500">
                  When enabled, unauthenticated public visitors see the institutional maintenance notice. Staff and Admins retain full portal access.
                </span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer shrink-0">
                <input
                  type="checkbox"
                  checked={formData.maintenanceMode}
                  onChange={(e) => setFormData({ ...formData, maintenanceMode: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
              </label>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">
                Custom Maintenance Notice Message
              </label>
              <textarea
                rows={3}
                value={formData.maintenanceMessage}
                onChange={(e) => setFormData({ ...formData, maintenanceMessage: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-[#e2e8f0] text-xs font-medium focus:border-[#0284c7] outline-none"
                placeholder="Explain the scheduled maintenance to visitors..."
              />
            </div>

            {/* Public inquiries toggle */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="block text-xs font-bold text-[#0a1e3f]">Allow Public Inquiries & Contact Forms</span>
                <span className="block text-[11px] text-slate-500">
                  Controls whether visitors can submit new message tickets from the public website contact form.
                </span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer shrink-0">
                <input
                  type="checkbox"
                  checked={formData.allowPublicEnquiries !== false}
                  onChange={(e) => setFormData({ ...formData, allowPublicEnquiries: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0284c7]"></div>
              </label>
            </div>

            {/* Top alert banner toggle */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="block text-xs font-bold text-[#0a1e3f]">Global Top Announcement Banner</span>
                <span className="block text-[11px] text-slate-500">
                  Enables or disables the top announcement notification bar across all public website pages.
                </span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer shrink-0">
                <input
                  type="checkbox"
                  checked={formData.enableAlertBanner !== false}
                  onChange={(e) => setFormData({ ...formData, enableAlertBanner: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0284c7]"></div>
              </label>
            </div>
          </div>
        )}

        {/* Tab 3: Security & Policies */}
        {activeTab === 'security' && (
          <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5 sm:p-6 shadow-xs space-y-5 animate-in fade-in-50">
            <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Lock className="h-4 w-4 text-emerald-600" />
                <h3 className="font-heading font-bold text-sm text-[#0a1e3f]">
                  Security, Authentication & Session Policies
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">
                  Admin & Staff Inactivity Timeout (Minutes)
                </label>
                <input
                  type="number"
                  min={5}
                  max={240}
                  value={formData.sessionTimeoutMinutes}
                  onChange={(e) => setFormData({ ...formData, sessionTimeoutMinutes: parseInt(e.target.value) || 30 })}
                  className="w-full p-2.5 rounded-xl border border-[#e2e8f0] text-xs font-medium focus:border-[#0284c7] outline-none"
                />
                <p className="text-[10px] text-slate-400 mt-1">Recommended: 15 to 60 minutes for banking systems.</p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">
                  Minimum Staff Password Length
                </label>
                <input
                  type="number"
                  min={8}
                  max={32}
                  value={formData.passwordPolicyMinLength}
                  onChange={(e) => setFormData({ ...formData, passwordPolicyMinLength: parseInt(e.target.value) || 8 })}
                  className="w-full p-2.5 rounded-xl border border-[#e2e8f0] text-xs font-medium focus:border-[#0284c7] outline-none"
                />
                <p className="text-[10px] text-slate-400 mt-1">Institutional standard: 8 characters minimum.</p>
              </div>
            </div>

            {/* 2FA Policy */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="block text-xs font-bold text-[#0a1e3f]">Enforce Multi-Factor Policy for Super Administrators</span>
                <span className="block text-[11px] text-slate-500">
                  Requires two-step verification prompts when accessing high-privilege administrative functions.
                </span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer shrink-0">
                <input
                  type="checkbox"
                  checked={Boolean(formData.require2FAForAdmin)}
                  onChange={(e) => setFormData({ ...formData, require2FAForAdmin: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
              </label>
            </div>
          </div>
        )}

        {/* Tab 4: Storage & Limits */}
        {activeTab === 'storage' && (
          <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5 sm:p-6 shadow-xs space-y-5 animate-in fade-in-50">
            <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <HardDrive className="h-4 w-4 text-purple-600" />
                <h3 className="font-heading font-bold text-sm text-[#0a1e3f]">
                  Media Storage & Upload Constraints
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">
                  Maximum Upload File Size (MB)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min={1}
                    max={50}
                    value={uploadSizeMB}
                    onChange={(e) => {
                      const mb = parseInt(e.target.value) || 5;
                      setFormData({ ...formData, maxUploadSizeBytes: mb * 1024 * 1024 });
                    }}
                    className="w-full p-2.5 rounded-xl border border-[#e2e8f0] text-xs font-medium focus:border-[#0284c7] outline-none"
                  />
                  <span className="text-xs font-semibold text-slate-500 shrink-0">MB</span>
                </div>
                <p className="text-[10px] text-slate-400 mt-1">Default: 5 MB (5,242,880 bytes). Protects against storage overload.</p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">
                  Supported Asset File Formats
                </label>
                <input
                  type="text"
                  readOnly
                  value="JPG, PNG, WEBP, SVG, PDF"
                  className="w-full p-2.5 rounded-xl border border-[#e2e8f0] text-xs font-mono bg-slate-50 text-slate-700 outline-none"
                />
                <p className="text-[10px] text-slate-400 mt-1">Automatic MIME-type validation is enforced during uploads.</p>
              </div>
            </div>

            {/* Database & Cloud status */}
            <div className="p-4 rounded-xl bg-sky-50/70 border border-sky-200/80 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-[#0284c7]/10 text-[#0284c7] flex items-center justify-center">
                  <Database className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#0a1e3f]">Supabase Relational Database Connectivity</h4>
                  <p className="text-[11px] text-slate-500">Live operational sync enabled for promotions, announcements, staff, enquiries, and popups.</p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800 flex items-center gap-1 shrink-0">
                <CheckCircle2 className="h-3 w-3" />
                Connected
              </span>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
