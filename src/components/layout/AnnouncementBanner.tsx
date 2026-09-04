import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, Bell, Info, X, ArrowRight } from 'lucide-react';
import { useCMS } from '@/context/CMSContext';

export const AnnouncementBanner: React.FC = () => {
  const { announcements } = useCMS();
  const [dismissed, setDismissed] = useState(false);

  const activeBanner = announcements.find(
    a => a.status === 'published' && a.displayAsBanner
  );

  if (!activeBanner || dismissed) return null;

  const isCritical = activeBanner.priority === 'urgent' || activeBanner.category === 'maintenance';

  return (
    <div
      className={`relative z-50 text-xs font-medium py-2.5 px-4 transition-all duration-300 border-b ${
        isCritical
          ? 'bg-amber-500 text-slate-950 border-amber-600 font-medium'
          : 'bg-[#0a1e3f] text-white border-white/10'
      }`}
    >
      <div className="max-w-[1200px] mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 overflow-hidden">
          {isCritical ? (
            <AlertTriangle className="h-4 w-4 shrink-0 text-slate-950" />
          ) : (
            <Bell className="h-4 w-4 shrink-0 text-sky-400" />
          )}

          <div className="flex items-center gap-2 truncate">
            <span className="font-bold uppercase tracking-wider text-[10px] px-1.5 py-0.5 rounded bg-black/10 shrink-0">
              {activeBanner.category}
            </span>
            <span className="font-semibold truncate">
              {activeBanner.title}:
            </span>
            <span className="hidden md:inline truncate opacity-90">
              {activeBanner.message}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {activeBanner.actionText && activeBanner.actionLink && (
            <Link
              to={activeBanner.actionLink}
              className={`inline-flex items-center gap-1 text-[11px] font-bold underline underline-offset-2 hover:opacity-80 transition-opacity ${
                isCritical ? 'text-slate-950' : 'text-sky-300'
              }`}
            >
              <span>{activeBanner.actionText}</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          )}

          <button
            onClick={() => setDismissed(true)}
            className="p-1 rounded-md hover:bg-black/10 transition-colors"
            title="Dismiss notice"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
