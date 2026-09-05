import React, { useState } from 'react';
import { User, Briefcase, Mail, Shield, Clock, CheckCircle2, Lock, LogOut, Edit2, Save, X, Building2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useCMS } from '@/context/CMSContext';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function StaffProfile() {
  const { user, logout } = useAuth();
  const { staffUsers, updateStaffUser } = useCMS();

  const matchingStaff = staffUsers.find(s => s.email.toLowerCase() === user?.email.toLowerCase());

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    department: user?.department || matchingStaff?.department || 'Customer Support & Operations',
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    if (matchingStaff) {
      updateStaffUser(matchingStaff.id, {
        name: formData.name,
        department: formData.department
      }, { id: user.id, name: user.name, role: user.role });
    }

    toast.success('Staff profile details updated.');
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-[#0a1e3f]">
            Staff Officer Profile & Security
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Operational session credentials, department assignment, and permission boundaries
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => logout()}
          className="rounded-xl border-red-200 text-red-600 hover:bg-red-50 text-xs font-semibold flex items-center gap-1.5"
        >
          <LogOut className="h-4 w-4" />
          <span>Sign Out</span>
        </Button>
      </div>

      <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 sm:p-8 shadow-xs space-y-6">
        {/* Profile Card Header */}
        <div className="flex items-center justify-between pb-6 border-b border-[#e2e8f0] flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-2xl bg-[#0a1e3f] text-white flex items-center justify-center font-heading font-bold text-2xl shadow-sm">
              {user?.name.charAt(0) || 'S'}
            </div>
            <div className="space-y-1">
              <h2 className="font-heading font-bold text-lg text-[#0a1e3f]">
                {user?.name}
              </h2>
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <Mail className="h-3.5 w-3.5 text-slate-400" />
                  {user?.email}
                </span>
                <span>•</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase">
                  Staff Operations Role
                </span>
              </div>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditing(!isEditing)}
            className="rounded-xl text-xs flex items-center gap-1.5"
          >
            {isEditing ? <X className="h-3.5 w-3.5" /> : <Edit2 className="h-3.5 w-3.5" />}
            <span>{isEditing ? 'Cancel' : 'Edit Profile'}</span>
          </Button>
        </div>

        {/* Profile Edit Form */}
        {isEditing && (
          <form onSubmit={handleSave} className="p-4 rounded-xl bg-sky-50/60 border border-sky-100 space-y-4">
            <h3 className="font-heading font-bold text-xs text-[#0a1e3f]">Update Profile Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-2 rounded-xl bg-white border border-[#e2e8f0] text-xs outline-none focus:border-[#0284c7]"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Department</label>
                <input
                  type="text"
                  required
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  className="w-full p-2 rounded-xl bg-white border border-[#e2e8f0] text-xs outline-none focus:border-[#0284c7]"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button type="submit" size="sm" className="rounded-xl bg-[#0284c7] text-white text-xs font-semibold">
                <Save className="h-3.5 w-3.5 mr-1" /> Save Updates
              </Button>
            </div>
          </form>
        )}

        {/* Operational Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
            <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">Assigned Department</span>
            <p className="font-bold text-[#0a1e3f] text-sm">{matchingStaff?.department || user?.department || 'Customer Support & Operations'}</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
            <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">Assigned Branch Location</span>
            <p className="font-bold text-[#0a1e3f] text-sm flex items-center gap-1.5">
              <Building2 className="h-4 w-4 text-[#0284c7]" />
              Rima Bank Corporate Headquarters
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
            <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">Authentication Status</span>
            <p className="font-bold text-emerald-600 flex items-center gap-1">
              <CheckCircle2 className="h-3.5 w-3.5" /> Active Authenticated Session
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
            <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">Session Last Active</span>
            <p className="font-bold text-[#0a1e3f]">{user?.lastLogin ? new Date(user.lastLogin).toLocaleTimeString() : 'Just now'}</p>
          </div>
        </div>

        {/* Role & Permission Matrix */}
        <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-100 space-y-3">
          <h3 className="font-heading font-bold text-xs text-emerald-950 uppercase tracking-wider flex items-center gap-1.5">
            <Shield className="h-4 w-4 text-emerald-600" />
            Operational Permission Matrix (Staff Restricted)
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-2 text-emerald-800">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
              <span>Customer Enquiries & Ticket Resolution</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-800">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
              <span>Author Publication Drafts (Submitted for Review)</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-800">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
              <span>Upload Promotional Images & Documents</span>
            </div>
            <div className="flex items-center gap-2 text-slate-500 line-through">
              <Lock className="h-3.5 w-3.5 text-slate-400 shrink-0" />
              <span>Landing Page Copy & Direct Publishing</span>
            </div>
            <div className="flex items-center gap-2 text-slate-500 line-through">
              <Lock className="h-3.5 w-3.5 text-slate-400 shrink-0" />
              <span>System & Security Policy Configuration</span>
            </div>
            <div className="flex items-center gap-2 text-slate-500 line-through">
              <Lock className="h-3.5 w-3.5 text-slate-400 shrink-0" />
              <span>Staff Account Administration & Audit Trails</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
