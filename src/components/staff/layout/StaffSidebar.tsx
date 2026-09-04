import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  MessageSquare,
  BookOpen,
  Image as ImageIcon,
  Bell,
  User,
  ChevronRight,
  X,
  ShieldCheck,
  Briefcase
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useCMS } from '@/context/CMSContext';

interface StaffSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StaffSidebar: React.FC<StaffSidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();
  const { user } = useAuth();
  const { enquiries, announcements, publications } = useCMS();

  const unreadEnquiriesCount = enquiries.filter(e => e.status === 'unread').length;
  const draftPubsCount = publications.filter(p => p.status === 'draft' || p.status === 'review').length;
  const activeAlertsCount = announcements.filter(a => a.status === 'published').length;

  const staffNavItems = [
    {
      name: "Operations Dashboard",
      href: "/staff",
      icon: LayoutDashboard,
      badge: null
    },
    {
      name: "Customer Enquiries",
      href: "/staff/enquiries",
      icon: MessageSquare,
      badge: unreadEnquiriesCount > 0 ? `${unreadEnquiriesCount} New` : null,
      badgeColor: 'bg-emerald-500'
    },
    {
      name: "Draft Publications",
      href: "/staff/publications",
      icon: BookOpen,
      badge: draftPubsCount > 0 ? `${draftPubsCount} In Review` : null,
      badgeColor: 'bg-sky-500'
    },
    {
      name: "Media Library",
      href: "/staff/media",
      icon: ImageIcon,
      badge: null
    },
    {
      name: "Bank Notices",
      href: "/staff/announcements",
      icon: Bell,
      badge: activeAlertsCount > 0 ? `${activeAlertsCount} Active` : null,
      badgeColor: 'bg-amber-500'
    },
    {
      name: "Staff Profile & Security",
      href: "/staff/profile",
      icon: User,
      badge: null
    }
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#0a1e3f] text-slate-300 flex flex-col border-r border-slate-800 transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 flex items-center justify-between px-5 border-b border-slate-800/80 bg-[#071630]">
          <Link to="/staff" className="flex items-center gap-2.5">
            <img
              src="/rima-logo.png"
              alt="RIMA Bank"
              className="h-8 w-auto object-contain"
              onError={(e) => {
                const el = e.currentTarget as HTMLImageElement;
                el.style.display = 'none';
                el.nextElementSibling?.classList.remove('hidden');
              }}
            />
            <div className="h-8 w-8 rounded-xl bg-emerald-600 flex items-center justify-center font-heading font-bold text-white text-base shadow-sm hidden">
              R
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-bold text-sm text-white tracking-tight leading-tight">
                RIMA STAFF
              </span>
              <span className="text-[10px] text-emerald-400 font-semibold tracking-wider uppercase">
                Operations Desk
              </span>
            </div>
          </Link>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Staff Role Badge */}
        <div className="px-5 py-3.5 bg-emerald-950/40 border-b border-slate-800/60 flex items-center gap-2.5">
          <div className="h-7 w-7 rounded-lg bg-emerald-600/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
            <Briefcase className="h-3.5 w-3.5" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-white truncate">{user?.name || 'Staff Officer'}</p>
            <p className="text-[10px] text-slate-400 truncate">{user?.department || 'Operations'}</p>
          </div>
        </div>

        {/* Navigation List */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          <div className="px-3 pb-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Staff Workspaces
          </div>

          {staffNavItems.map((item) => {
            const isActive = location.pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                to={item.href}
                onClick={onClose}
                className={`group flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-emerald-600 text-white font-semibold shadow-xs shadow-emerald-900/30'
                    : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`h-4 w-4 shrink-0 transition-colors ${
                      isActive ? 'text-white' : 'text-slate-400 group-hover:text-emerald-400'
                    }`}
                  />
                  <span>{item.name}</span>
                </div>

                {item.badge && (
                  <span
                    className={`px-1.5 py-0.5 text-[10px] font-bold rounded-full text-white ${
                      item.badgeColor || 'bg-slate-700'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Operational Compliance Footer */}
        <div className="p-4 border-t border-slate-800/80 bg-[#071630] space-y-2">
          <div className="flex items-center gap-2 text-[11px] text-slate-400 font-medium">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
            <span className="truncate">Staff Restricted Mode</span>
          </div>
          <p className="text-[10px] text-slate-500 leading-tight">
            Governance & system configuration are restricted to Super Administrators.
          </p>
        </div>
      </aside>
    </>
  );
};
