import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Menu,
  Bell,
  LogOut,
  Briefcase,
  User,
  ShieldCheck,
  ExternalLink
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useCMS } from '@/context/CMSContext';

interface StaffHeaderProps {
  onToggleSidebar: () => void;
}

export const StaffHeader: React.FC<StaffHeaderProps> = ({ onToggleSidebar }) => {
  const { user, logout } = useAuth();
  const { enquiries } = useCMS();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();

  const unreadEnquiries = enquiries.filter(e => e.status === 'unread');

  const handleLogout = () => {
    logout();
    navigate('/staff/login');
  };

  return (
    <header className="h-16 bg-white border-b border-[#e2e8f0] px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 shadow-xs">
      {/* Left side: Hamburger & Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-xl text-slate-500 hover:text-[#0a1e3f] hover:bg-slate-100 lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2">
          <span className="hidden sm:inline-block px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
            STAFF DESK
          </span>
          <span className="text-xs text-slate-500 hidden md:inline-block">
            RIMA Microfinance Bank Customer Operations & Support
          </span>
        </div>
      </div>

      {/* Right side: Notifications, Role indicator & Profile */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Link to public website */}
        <Link
          to="/"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:flex items-center gap-1 text-xs text-slate-500 hover:text-[#0a1e3f] font-medium px-2.5 py-1.5 rounded-lg hover:bg-slate-100 transition-all"
        >
          <ExternalLink className="h-3.5 w-3.5" />
          <span>View Website</span>
        </Link>

        {/* Staff Role Badge */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800">
          <Briefcase className="h-3.5 w-3.5 text-emerald-600" />
          <span>Staff Officer</span>
        </div>

        {/* Notifications Popover */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfileMenu(false);
            }}
            className="p-2 rounded-xl text-slate-500 hover:text-[#0a1e3f] hover:bg-slate-100 relative transition-all"
          >
            <Bell className="h-5 w-5" />
            {unreadEnquiries.length > 0 && (
              <span className="absolute top-1.5 right-1.5 h-4 min-w-[16px] px-1 rounded-full bg-emerald-600 text-white text-[9px] font-bold flex items-center justify-center">
                {unreadEnquiries.length}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-[#e2e8f0] p-4 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between pb-3 border-b border-[#e2e8f0] mb-3">
                <h4 className="font-heading font-semibold text-xs text-[#0a1e3f] uppercase tracking-wider">
                  Operational Notifications
                </h4>
                <span className="text-[10px] text-slate-400">
                  {unreadEnquiries.length} Unread Enquiries
                </span>
              </div>

              <div className="space-y-2 max-h-64 overflow-y-auto">
                {unreadEnquiries.slice(0, 4).map((enq) => (
                  <Link
                    key={enq.id}
                    to="/staff/enquiries"
                    onClick={() => setShowNotifications(false)}
                    className="block p-2.5 rounded-xl hover:bg-slate-50 border border-slate-100 transition-all"
                  >
                    <p className="text-xs font-semibold text-[#0a1e3f] truncate">{enq.subject}</p>
                    <p className="text-[11px] text-slate-500 truncate">{enq.name} • {enq.email}</p>
                  </Link>
                ))}
                {unreadEnquiries.length === 0 && (
                  <p className="text-xs text-slate-400 text-center py-4">No unread enquiries.</p>
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
            <div className="h-8 w-8 rounded-full bg-emerald-700 text-white flex items-center justify-center font-heading font-bold text-xs">
              {user?.name.charAt(0) || 'S'}
            </div>
            <div className="hidden sm:block">
              <span className="block text-xs font-semibold text-[#0a1e3f] leading-tight">
                {user?.name}
              </span>
              <span className="block text-[10px] text-emerald-600 capitalize font-medium">
                {user?.department || 'Staff'}
              </span>
            </div>
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-60 bg-white rounded-2xl shadow-xl border border-[#e2e8f0] p-3 z-50 animate-in fade-in zoom-in-95 duration-150 space-y-2">
              <div className="px-3 py-2 bg-emerald-50/70 rounded-xl border border-emerald-100">
                <p className="text-xs font-bold text-[#0a1e3f] truncate">{user?.name}</p>
                <p className="text-[11px] text-slate-500 truncate">{user?.email}</p>
                <div className="mt-1.5 inline-block text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 uppercase tracking-wide">
                  Staff Operations Officer
                </div>
              </div>

              <div className="pt-1 border-t border-slate-100">
                <Link
                  to="/staff/profile"
                  onClick={() => setShowProfileMenu(false)}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-all text-left"
                >
                  <User className="h-4 w-4 text-slate-400" />
                  <span>My Profile & Schedule</span>
                </Link>

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
