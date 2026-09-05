import React, { useState } from 'react';
import { Bell, AlertTriangle, Info, Calendar, Search, Filter } from 'lucide-react';
import { useCMS } from '@/context/CMSContext';

export default function StaffAnnouncementsView() {
  const { announcements } = useCMS();
  const [search, setSearch] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Staff should only see published announcements
  const publishedAnnouncements = announcements.filter(a => a.status === 'published');

  const filteredAnnouncements = publishedAnnouncements.filter(ann => {
    const matchesSearch = ann.title.toLowerCase().includes(search.toLowerCase()) || ann.message.toLowerCase().includes(search.toLowerCase());
    const matchesPriority = priorityFilter === 'all' || ann.priority === priorityFilter;
    const matchesCategory = categoryFilter === 'all' || ann.category === categoryFilter;
    return matchesSearch && matchesPriority && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold text-[#0a1e3f]">
          Bank Notices & Operational Bulletins
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Official notices, maintenance schedules, and public bulletins published by Executive Administration
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-[#e2e8f0] shadow-xs">
        <div className="relative w-full sm:w-72">
          <Search className="h-4 w-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search bulletins & notices..."
            className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-[#e2e8f0] text-xs font-medium focus:border-[#0284c7] outline-none"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="px-3 py-1.5 rounded-xl text-xs font-medium border border-[#e2e8f0] bg-white outline-none"
          >
            <option value="all">All Priorities</option>
            <option value="urgent">Critical / Urgent</option>
            <option value="high">High</option>
            <option value="normal">Normal</option>
          </select>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-1.5 rounded-xl text-xs font-medium border border-[#e2e8f0] bg-white outline-none"
          >
            <option value="all">All Categories</option>
            <option value="maintenance">Maintenance</option>
            <option value="regulatory">Regulatory</option>
            <option value="security">Security</option>
            <option value="feature">New Feature</option>
            <option value="general">General</option>
          </select>
        </div>
      </div>

      {/* Announcements List */}
      <div className="space-y-4">
        {filteredAnnouncements.map((ann) => (
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
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-sky-50 text-[#0284c7] border border-sky-100 capitalize">
                  {ann.category}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {ann.message}
            </p>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
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

        {filteredAnnouncements.length === 0 && (
          <div className="bg-white rounded-2xl border border-[#e2e8f0] p-12 text-center text-slate-400 text-xs">
            No bank notices found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
}
