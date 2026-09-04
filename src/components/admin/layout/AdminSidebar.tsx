import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  Tag,
  Bell,
  BookOpen,
  MessageSquare,
  Image as ImageIcon,
  Users,
  ShieldCheck,
  Settings,
  ExternalLink,
  ChevronRight,
  ShieldAlert,
  Layers,
  X
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useCMS } from '@/context/CMSContext';

interface NavItem {
  name: string;
  href: string;
  icon: React.ElementType;
  badge: string | null;
  badgeColor?: string;
  adminOnly?: boolean;
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();
  const { user } = useAuth();
  const { enquiries, announcements, publications, popupConfigs } = useCMS();

  const unreadEnquiriesCount = enquiries.filter(e => e.status === 'unread').length;
  const draftPubsCount = publications.filter(p => p.status === 'draft' || p.status === 'review').length;
  const activeAlertsCount = announcements.filter(a => a.status === 'published' && a.displayAsBanner).length;
  const activePopupsCount = popupConfigs.filter(p => p.status === 'active').length;
  const pendingPopupsCount = popupConfigs.filter(p => p.status === 'scheduled').length;

  const navigationGroups: NavGroup[] = [
    {
      title: "Core Operations",
      items: [
        {
          name: "Dashboard",
          href: "/admin",
          icon: LayoutDashboard,
          badge: null
        }
      ]
    },
    {
      title: "Content & Editorial",
      items: [
        {
          name: "Landing Page Editor",
          href: "/admin/content",
          icon: FileText,
          badge: null
        },
        {
          name: "Promotions & Offers",
          href: "/admin/promotions",
          icon: Tag,
          badge: null
        },
        {
          name: "Announcements",
          href: "/admin/announcements",
          icon: Bell,
          badge: activeAlertsCount > 0 ? `${activeAlertsCount} Live` : null,
          badgeColor: 'bg-amber-500'
        },
        {
          name: "Publications & News",
          href: "/admin/publications",
          icon: BookOpen,
          badge: draftPubsCount > 0 ? `${draftPubsCount} Draft` : null,
          badgeColor: 'bg-sky-500'
        },
        {
          name: "Popup Manager",
          href: "/admin/popups",
          icon: Layers,
          badge: pendingPopupsCount > 0 ? `${pendingPopupsCount} Pending` : activePopupsCount > 0 ? `${activePopupsCount} Live` : null,
          badgeColor: pendingPopupsCount > 0 ? 'bg-amber-500' : 'bg-emerald-500'
        }
      ]
    },
    {
      title: "Customer Communications",
      items: [
        {
          name: "Enquiries & Inbox",
          href: "/admin/enquiries",
          icon: MessageSquare,
          badge: unreadEnquiriesCount > 0 ? `${unreadEnquiriesCount} New` : null,
          badgeColor: 'bg-emerald-500'
        },
        {
          name: "Media Assets",
          href: "/admin/media",
          icon: ImageIcon,
          badge: null
        }
      ]
    },
    {
      title: "Governance & Control",
      items: [
        {
          name: "Staff Accounts",
          href: "/admin/staff",
          icon: Users,
          badge: null,
          adminOnly: true
        },
        {
          name: "Audit Trail",
          href: "/admin/audit-logs",
          icon: ShieldCheck,
          badge: null,
          adminOnly: true
        },
        {
          name: "System Settings",
          href: "/admin/settings",
          icon: Settings,
          badge: null,
          adminOnly: true
        }
      ]
    }
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/60 z-40 lg:hidden backdrop-blur-sm transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar Content */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#0a1e3f] text-slate-200 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 px-5 flex items-center justify-between border-b border-white/10 shrink-0">
          <Link to="/admin" className="flex items-center gap-2.5">
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
            <div className="h-8 w-8 rounded-lg bg-[#0284c7] flex items-center justify-center font-heading font-bold text-white text-base shadow-sm hidden">
              R
            </div>
            <div>
              <span className="font-heading font-bold text-sm text-white tracking-tight block leading-tight">
                RIMA BANK
              </span>
              <span className="text-[10px] uppercase font-semibold tracking-wider text-sky-400 block">
                CMS Administration
              </span>
            </div>
          </Link>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* User Role Card */}
        <div className="px-4 py-3 bg-white/5 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="h-7 w-7 rounded-full bg-[#0284c7]/20 border border-sky-400/40 text-sky-300 flex items-center justify-center font-bold text-xs shrink-0">
              {user?.name.charAt(0) || 'U'}
            </div>
            <div className="truncate">
              <p className="text-xs font-semibold text-white truncate leading-tight">
                {user?.name || 'Administrator'}
              </p>
              <p className="text-[10px] text-slate-400 capitalize truncate">
                {user?.role === 'admin' ? 'Super Administrator' : 'Staff Officer'}
              </p>
            </div>
          </div>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0 ${
            user?.role === 'admin' ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
          }`}>
            {user?.role || 'Admin'}
          </span>
        </div>

        {/* Scrollable Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
          {navigationGroups.map((group, gIdx) => {
            const visibleItems = group.items.filter(item => !item.adminOnly || user?.role === 'admin');
            if (visibleItems.length === 0) return null;

            return (
              <div key={gIdx} className="space-y-1">
                <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  {group.title}
                </p>
                <div className="space-y-0.5 pt-1">
                  {visibleItems.map((item) => {
                    const isActive = location.pathname === item.href || (item.href !== '/admin' && location.pathname.startsWith(item.href));
                    const Icon = item.icon;

                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        onClick={() => {
                          if (window.innerWidth < 1024) onClose();
                        }}
                        className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                          isActive
                            ? 'bg-[#0284c7] text-white shadow-sm font-semibold'
                            : 'text-slate-300 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon className={`h-4 w-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                          <span>{item.name}</span>
                        </div>

                        {item.badge && (
                          <span className={`text-[10px] font-semibold text-white px-1.5 py-0.5 rounded-full ${item.badgeColor || 'bg-slate-700'}`}>
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </nav>

        {/* Footer Actions */}
        <div className="p-3 border-t border-white/10 bg-black/20 shrink-0 space-y-1.5">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between px-3 py-2 rounded-xl text-xs text-slate-300 hover:text-white hover:bg-white/10 transition-all font-medium"
          >
            <div className="flex items-center gap-2">
              <ExternalLink className="h-4 w-4 text-sky-400" />
              <span>View Public Website</span>
            </div>
            <ChevronRight className="h-3.5 w-3.5 text-slate-500" />
          </a>
        </div>
      </aside>
    </>
  );
};
