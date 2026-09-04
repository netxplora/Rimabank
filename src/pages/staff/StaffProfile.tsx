import React from 'react';
import { User, Briefcase, Mail, Shield, Clock, CheckCircle2, Lock } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';

export default function StaffProfile() {
  const { user, logout } = useAuth();

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold text-[#0a1e3f]">
          Staff Officer Profile & Security
        </h1>
        <p className="text-xs text-slate-500">
          Your active operational session credentials, branch assignment, and permission boundaries
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 sm:p-8 shadow-xs space-y-6">
        {/* Profile Card Header */}
        <div className="flex items-center gap-4 pb-6 border-b border-[#e2e8f0]">
          <div className="h-16 w-16 rounded-2xl bg-emerald-700 text-white flex items-center justify-center font-heading font-bold text-2xl shadow-sm">
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

        {/* Operational Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
            <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">Assigned Department</span>
            <p className="font-bold text-[#0a1e3f] text-sm">{user?.department || 'Customer Support & Agency Desk'}</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
            <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">Assigned Branch Location</span>
            <p className="font-bold text-[#0a1e3f] text-sm">Head Office — Port Harcourt</p>
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

        {/* Role & Permission Matrix (Least Privilege Standards) */}
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
