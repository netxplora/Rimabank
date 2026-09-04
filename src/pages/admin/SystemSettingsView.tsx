import React, { useState } from 'react';
import {
  Settings,
  Save,
  ShieldCheck,
  AlertTriangle,
  Lock,
  Globe,
  Sliders,
  CheckCircle2
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

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    if (!can('manage_settings', 'system_settings')) {
      toast.error('Only Super Administrators can modify core system configurations.');
      return;
    }

    setIsSaving(true);
    updateSystemSettings(formData, { id: user.id, name: user.name, role: user.role });
    setTimeout(() => {
      setIsSaving(false);
      toast.success('System configuration saved successfully.');
    }, 350);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-[#e2e8f0] shadow-xs">
        <div>
          <h1 className="text-xl font-heading font-bold text-[#0a1e3f] tracking-tight">
            System Configuration & Security Settings
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure institutional policies, maintenance mode, session timeouts, and upload parameters.
          </p>
        </div>

        <Button
          onClick={handleSave}
          disabled={isSaving}
          className="h-9 rounded-xl bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-semibold shadow-sm flex items-center gap-1.5"
        >
          <Save className="h-4 w-4" />
          <span>{isSaving ? 'Saving...' : 'Save Configuration'}</span>
        </Button>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Core Identity */}
        <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 shadow-xs space-y-4">
          <div className="border-b border-slate-100 pb-3 flex items-center gap-2">
            <Globe className="h-4 w-4 text-[#0284c7]" />
            <h3 className="font-heading font-bold text-sm text-[#0a1e3f]">
              Institutional Identity
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">
                Official Institution Name
              </label>
              <input
                type="text"
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
          </div>
        </div>

        {/* Maintenance Mode */}
        <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 shadow-xs space-y-4">
          <div className="border-b border-slate-100 pb-3 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-500" />
            <h3 className="font-heading font-bold text-sm text-[#0a1e3f]">
              Maintenance & Channel Controls
            </h3>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
            <div>
              <span className="block text-xs font-bold text-[#0a1e3f]">Digital Banking Maintenance Mode</span>
              <span className="block text-[11px] text-slate-500">Temporarily display institutional maintenance message to public users</span>
            </div>
            <input
              type="checkbox"
              checked={formData.maintenanceMode}
              onChange={(e) => setFormData({ ...formData, maintenanceMode: e.target.checked })}
              className="h-4 w-4 text-[#0284c7] rounded border-slate-300 focus:ring-[#0284c7]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">
              Maintenance Message
            </label>
            <textarea
              rows={2}
              value={formData.maintenanceMessage}
              onChange={(e) => setFormData({ ...formData, maintenanceMessage: e.target.value })}
              className="w-full p-2.5 rounded-xl border border-[#e2e8f0] text-xs font-medium focus:border-[#0284c7] outline-none"
            />
          </div>
        </div>

        {/* Security & Sessions */}
        <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 shadow-xs space-y-4">
          <div className="border-b border-slate-100 pb-3 flex items-center gap-2">
            <Lock className="h-4 w-4 text-emerald-600" />
            <h3 className="font-heading font-bold text-sm text-[#0a1e3f]">
              Security & Policy Enforcement
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#0a1e3f] mb-1">
                Admin Session Inactivity Timeout (Minutes)
              </label>
              <input
                type="number"
                min={5}
                max={120}
                value={formData.sessionTimeoutMinutes}
                onChange={(e) => setFormData({ ...formData, sessionTimeoutMinutes: parseInt(e.target.value) || 30 })}
                className="w-full p-2.5 rounded-xl border border-[#e2e8f0] text-xs font-medium focus:border-[#0284c7] outline-none"
              />
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
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
