import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
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
  PlusCircle,
  X
} from 'lucide-react';
import { useCMS } from '@/context/CMSContext';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const { promotions, announcements, publications, enquiries } = useCMS();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onClose(); // toggled from parent
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const quickNav = [
    { label: 'Go to Dashboard Overview', path: '/admin', icon: LayoutDashboard },
    { label: 'Edit Landing Page Content', path: '/admin/content', icon: FileText },
    { label: 'Manage Promotions & Offers', path: '/admin/promotions', icon: Tag },
    { label: 'Manage Urgent Announcements', path: '/admin/announcements', icon: Bell },
    { label: 'Author / Manage Publications', path: '/admin/publications', icon: BookOpen },
    { label: 'View Customer Enquiries Inbox', path: '/admin/enquiries', icon: MessageSquare },
    { label: 'Media Library & Assets', path: '/admin/media', icon: ImageIcon },
    { label: 'Staff Accounts & RBAC', path: '/admin/staff', icon: Users },
    { label: 'Audit Trail Logs', path: '/admin/audit-logs', icon: ShieldCheck },
    { label: 'System & SEO Configuration', path: '/admin/settings', icon: Settings },
  ];

  const filteredNav = quickNav.filter(item =>
    item.label.toLowerCase().includes(query.toLowerCase())
  );

  const filteredPubs = publications
    .filter(p => p.title.toLowerCase().includes(query.toLowerCase()))
    .slice(0, 3);

  const filteredEnquiries = enquiries
    .filter(e => e.name.toLowerCase().includes(query.toLowerCase()) || e.ticketNumber.toLowerCase().includes(query.toLowerCase()))
    .slice(0, 3);

  const handleSelect = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-[#e2e8f0] overflow-hidden flex flex-col max-h-[70vh] animate-in zoom-in-95 duration-200"
        onClick={e => e.stopPropagation()}
      >
        {/* Search Bar Input */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[#e2e8f0] bg-slate-50/50">
          <Search className="h-5 w-5 text-slate-400 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search CMS pages, publications, enquiries, or actions..."
            className="w-full bg-transparent text-sm text-[#0a1e3f] placeholder-slate-400 outline-none font-medium"
            autoFocus
          />
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-all text-xs"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Search Results */}
        <div className="overflow-y-auto p-2 space-y-3">
          {/* Navigation Items */}
          <div>
            <p className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Quick Navigation
            </p>
            <div className="space-y-0.5">
              {filteredNav.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelect(item.path)}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs text-left font-medium text-[#0a1e3f] hover:bg-[#f0f7ff] hover:text-[#0284c7] transition-all"
                  >
                    <Icon className="h-4 w-4 text-slate-400 group-hover:text-[#0284c7]" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Publications matches */}
          {filteredPubs.length > 0 && (
            <div>
              <p className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Publications & News
              </p>
              <div className="space-y-0.5">
                {filteredPubs.map(pub => (
                  <button
                    key={pub.id}
                    onClick={() => handleSelect('/admin/publications')}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-left font-medium text-[#0a1e3f] hover:bg-[#f0f7ff] transition-all"
                  >
                    <div className="flex items-center gap-2 truncate">
                      <BookOpen className="h-3.5 w-3.5 text-sky-500 shrink-0" />
                      <span className="truncate">{pub.title}</span>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-semibold uppercase">
                      {pub.status}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Enquiries matches */}
          {filteredEnquiries.length > 0 && (
            <div>
              <p className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Customer Enquiries
              </p>
              <div className="space-y-0.5">
                {filteredEnquiries.map(enq => (
                  <button
                    key={enq.id}
                    onClick={() => handleSelect('/admin/enquiries')}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-left font-medium text-[#0a1e3f] hover:bg-[#f0f7ff] transition-all"
                  >
                    <div className="flex items-center gap-2 truncate">
                      <MessageSquare className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                      <span className="font-semibold text-slate-500">{enq.ticketNumber}</span>
                      <span className="truncate">{enq.name} - {enq.subject}</span>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-semibold uppercase">
                      {enq.status}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2 bg-slate-50 border-t border-[#e2e8f0] flex items-center justify-between text-[11px] text-slate-400 font-medium">
          <span>Navigate with <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded text-[10px]">↑</kbd> <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded text-[10px]">↓</kbd></span>
          <span>Close with <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded text-[10px]">ESC</kbd></span>
        </div>
      </div>
    </div>
  );
};
