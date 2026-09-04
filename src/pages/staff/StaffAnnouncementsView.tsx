import React from 'react';
import { Bell, ShieldCheck, AlertTriangle, Info, Calendar } from 'lucide-react';
import { useCMS } from '@/context/CMSContext';

export default function StaffAnnouncementsView() {
  const { announcements } = useCMS();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold text-[#0a1e3f]">
          Bank Notices & Operational Bulletins
        </h1>
        <p className="text-xs text-slate-500">
          Official bank notices, maintenance schedules, and public bulletins published by Executive Administration
        </p>
      </div>

      <div className="space-y-4">
        {announcements.map((ann) => (
          <div
            key={ann.id}
            className={`p-6 rounded-2xl border transition-all ${
              ann.priority === 'urgent'
                ? 'bg-red-50/40 border-red-200'
                : ann.priority === 'high'
                ? 'bg-amber-50/40 border-amber-200'
                : 'bg-white border-[#e2e8f0]'
            } shadow-xs space-y-3`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                {ann.priority === 'urgent' ? (
                  <AlertTriangle className="h-5 w-5 text-red-600 shrink-0" />
                ) : ann.priority === 'high' ? (
                  <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0" />
                ) : (
                  <Info className="h-5 w-5 text-[#0284c7] shrink-0" />
                )}
                <h3 className="font-heading font-bold text-base text-[#0a1e3f]">
                  {ann.title}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                    ann.priority === 'urgent'
                      ? 'bg-red-100 text-red-800'
                      : ann.priority === 'high'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {ann.priority} Priority
                </span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    ann.status === 'published'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {ann.status}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {ann.message}
            </p>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                Posted: {new Date(ann.createdAt).toLocaleDateString()}
              </span>
              {ann.displayAsBanner && (
                <span className="text-emerald-700 font-semibold">
                  ✓ Active on public website top banner
                </span>
              )}
            </div>
          </div>
        ))}

        {announcements.length === 0 && (
          <div className="bg-white rounded-2xl border border-[#e2e8f0] p-12 text-center text-slate-400 text-xs">
            No bank notices currently registered.
          </div>
        )}
      </div>
    </div>
  );
}
