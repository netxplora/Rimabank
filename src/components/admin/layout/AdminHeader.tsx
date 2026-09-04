import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Menu,
  Search,
  Bell,
  ExternalLink,
  ShieldCheck,
  User,
  LogOut,
  RefreshCw,
  Eye,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useCMS } from '@/context/CMSContext';
import { Button } from '@/components/ui/button';

interface AdminHeaderProps {
  onToggleSidebar: () => void;
  onOpenCommandPalette: () => void;
  onOpenPreview?: () => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  onToggleSidebar,
  onOpenCommandPalette,
  onOpenPreview
}) => {
  const { user, logout, switchRolePersona } = useAuth();
  const { enquiries, announcements, publications } = useCMS();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate();

  const unreadEnquiries = enquiries.filter(e => e.status === 'unread');
  const reviewPubs = publications.filter(p => p.status === 'review' || p.status === 'draft');
  const totalAlerts = unreadEnquiries.length + reviewPubs.length;

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <header className="h-16 bg-white border-b border-[#e2e8f0] px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 shadow-xs">
      {/* Left side: Hamburger & Search */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-xl text-slate-500 hover:text-[#0a1e3f] hover:bg-slate-100 lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Global Search Bar */}
        <button
          onClick={onOpenCommandPalette}
          className="hidden sm:flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-500 text-xs font-medium transition-all w-64 border border-slate-200/60"
        >
          <Search className="h-3.5 w-3.5 text-slate-400" />
          <span className="flex-1 text-left truncate">Search CMS & actions...</span>
          <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded text-[10px] text-slate-400 font-mono">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Right side: Tools, Persona Switcher, Notifications, Profile */}
      <div className="flex items-center gap-2 sm:gap-3">
        
        {/* Live Site Preview Button */}
        {onOpenPreview && (
          <Button
            size="sm"
            variant="outline"
            onClick={onOpenPreview}
            className="h-8 text-xs font-semibold rounded-xl border-[#0284c7]/30 text-[#0284c7] hover:bg-sky-50 hidden md:flex items-center gap-1.5"
          >
            <Eye className="h-3.5 w-3.5" />
            <span>Live Preview</span>
          </Button>
        )}

        {/* Executive Admin Institutional Badge */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-50 border border-sky-200/80 text-xs font-semibold text-[#0284c7]">
          <ShieldCheck className="h-3.5 w-3.5 text-[#0284c7]" />
          <span>Super Administrator</span>
        </div>

        {/* Notifications Popover Trigger */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfileMenu(false);
            }}
            className="p-2 rounded-xl text-slate-500 hover:text-[#0a1e3f] hover:bg-slate-100 relative transition-all"
          >
            <Bell className="h-5 w-5" />
            {totalAlerts > 0 && (
              <span className="absolute top-1.5 right-1.5 h-4 min-w-[16px] px-1 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center">
                {totalAlerts}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-[#e2e8f0] p-4 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between pb-3 border-b border-[#e2e8f0] mb-3">
                <div className="flex items-center gap-2">
                  <h4 className="font-heading font-semibold text-xs text-[#0a1e3f] uppercase tracking-wider">
                    Administrative Alerts
                  </h4>
                  <span className="px-2 py-0.5 rounded-full bg-sky-100 text-sky-700 text-[10px] font-bold">
                    {totalAlerts} Pending
                  </span>
                </div>
                <button
                  onClick={() => setShowNotifications(false)}
                  className="text-xs text-slate-400 hover:text-slate-600"
                >
                  Close
                </button>
              </div>

              <div className="space-y-2 max-h-72 overflow-y-auto">
                {unreadEnquiries.length === 0 && reviewPubs.length === 0 ? (
                  <div className="py-6 text-center text-xs text-slate-400 flex flex-col items-center gap-1.5">
                    <CheckCircle2 className="h-6 w-6 text-emerald-500" />
                    <span>All customer enquiries and drafts are resolved!</span>
                  </div>
                ) : (
                  <>
                    {unreadEnquiries.map(enq => (
                      <Link
                        key={enq.id}
                        to="/admin/enquiries"
                        onClick={() => setShowNotifications(false)}
                        className="p-2.5 rounded-xl bg-slate-50 hover:bg-sky-50 border border-slate-100 flex items-start gap-2.5 transition-all block"
                      >
                        <AlertCircle className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                        <div className="text-left overflow-hidden">
                          <p className="text-xs font-semibold text-[#0a1e3f] truncate">
                            New Enquiry: {enq.name}
                          </p>
                          <p className="text-[11px] text-slate-500 truncate">{enq.subject}</p>
                        </div>
                      </Link>
                    ))}

                    {reviewPubs.map(pub => (
                      <Link
                        key={pub.id}
                        to="/admin/publications"
                        onClick={() => setShowNotifications(false)}
                        className="p-2.5 rounded-xl bg-slate-50 hover:bg-sky-50 border border-slate-100 flex items-start gap-2.5 transition-all block"
                      >
                        <AlertCircle className="h-4 w-4 text-sky-600 shrink-0 mt-0.5" />
                        <div className="text-left overflow-hidden">
                          <p className="text-xs font-semibold text-[#0a1e3f] truncate">
                            Draft Article: {pub.title}
                          </p>
                          <p className="text-[11px] text-slate-500 capitalize">Status: {pub.status}</p>
                        </div>
                      </Link>
                    ))}
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Trigger */}
        <div className="relative">
          <button
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowNotifications(false);
            }}
            className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 transition-all text-left"
          >
            <div className="h-8 w-8 rounded-full bg-[#0a1e3f] text-white flex items-center justify-center font-heading font-bold text-xs">
              {user?.name.charAt(0) || 'A'}
            </div>
            <div className="hidden sm:block">
              <span className="block text-xs font-semibold text-[#0a1e3f] leading-tight">
                {user?.name}
              </span>
              <span className="block text-[10px] text-slate-400 capitalize">
                {user?.role}
              </span>
            </div>
          </button>

          {/* Profile Dropdown */}
          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-60 bg-white rounded-2xl shadow-xl border border-[#e2e8f0] p-3 z-50 animate-in fade-in zoom-in-95 duration-150 space-y-2">
              <div className="px-3 py-2 bg-slate-50 rounded-xl border border-slate-100">
                <p className="text-xs font-bold text-[#0a1e3f] truncate">{user?.name}</p>
                <p className="text-[11px] text-slate-500 truncate">{user?.email}</p>
                <div className="mt-1.5 inline-block text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-100 text-sky-800 uppercase tracking-wide">
                  Super Administrator
                </div>
              </div>

              <div className="pt-1 border-t border-slate-100">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-red-600 hover:bg-red-50 transition-all text-left"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sign Out Session</span>
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </header>
  );
};
