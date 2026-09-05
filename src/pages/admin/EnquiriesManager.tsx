import React, { useState } from 'react';
import {
  Search,
  MessageSquare,
  User,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  Filter,
  Trash2,
  X,
  Phone,
  Mail,
  ShieldCheck,
  Tag
} from 'lucide-react';
import { useCMS } from '@/context/CMSContext';
import { useAuth } from '@/context/AuthContext';
import { Enquiry, PriorityLevel } from '@/types/cms';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function EnquiriesManager() {
  const { enquiries, updateEnquiryStatus, assignEnquiry, addEnquiryNote, respondToEnquiry, deleteEnquiry, staffUsers } = useCMS();
  const { user, can } = useAuth();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);

  // Note & Response form inputs
  const [newNote, setNewNote] = useState('');
  const [replyMessage, setReplyMessage] = useState('');

  const filteredEnquiries = enquiries.filter(e => {
    const matchesSearch = e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.email.toLowerCase().includes(search.toLowerCase()) ||
      e.ticketNumber.toLowerCase().includes(search.toLowerCase()) ||
      e.subject.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || e.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || e.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const handleSelectEnquiry = (enq: Enquiry) => {
    setSelectedEnquiry(enq);
    if (enq.status === 'unread' && user) {
      updateEnquiryStatus(enq.id, 'read', { id: user.id, name: user.name, role: user.role });
    }
  };

  const handleAssign = (staffId: string) => {
    if (!selectedEnquiry || !user) return;
    const staff = staffUsers.find(s => s.id === staffId);
    if (staff) {
      assignEnquiry(selectedEnquiry.id, staff.id, staff.name, { id: user.id, name: user.name, role: user.role });
      setSelectedEnquiry(prev => prev ? { ...prev, assignedTo: staff.id, assignedToName: staff.name } : null);
      toast.success(`Ticket assigned to ${staff.name}`);
    }
  };

  const handleStatusChange = (status: Enquiry['status']) => {
    if (!selectedEnquiry || !user) return;
    updateEnquiryStatus(selectedEnquiry.id, status, { id: user.id, name: user.name, role: user.role });
    setSelectedEnquiry(prev => prev ? { ...prev, status } : null);
    toast.success(`Ticket marked as ${status.replace('_', ' ')}`);
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEnquiry || !user || !newNote.trim()) return;
    addEnquiryNote(selectedEnquiry.id, newNote, user.name);
    setNewNote('');
    toast.success('Internal note added.');
    // refresh selected
    const updated = enquiries.find(e => e.id === selectedEnquiry.id);
    if (updated) setSelectedEnquiry(updated);
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEnquiry || !user || !replyMessage.trim()) return;
    respondToEnquiry(selectedEnquiry.id, replyMessage, { id: user.id, name: user.name, role: user.role });
    setReplyMessage('');
    toast.success(`Official email reply dispatched to ${selectedEnquiry.email}`);
    // refresh selected
    const updated = enquiries.find(e => e.id === selectedEnquiry.id);
    if (updated) setSelectedEnquiry(updated);
  };

  const handleDelete = (id: string, ticket: string) => {
    if (!user) return;
    if (!can('delete', 'enquiries')) {
      toast.error('Staff cannot delete inquiry records.');
      return;
    }
    if (window.confirm(`Delete enquiry ticket ${ticket}?`)) {
      deleteEnquiry(id, { id: user.id, name: user.name, role: user.role });
      if (selectedEnquiry?.id === id) setSelectedEnquiry(null);
      toast.success('Enquiry ticket removed.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-[#e2e8f0] shadow-xs">
        <div>
          <h1 className="text-xl font-heading font-bold text-[#0a1e3f] tracking-tight">
            Customer Enquiries & Inbox
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Track, assign, and respond to incoming customer messages and loan requests.
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-[#e2e8f0] shadow-xs">
        <div className="relative w-full sm:w-72">
          <Search className="h-4 w-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search ticket, name, email..."
            className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-[#e2e8f0] text-xs font-medium focus:border-[#0284c7] outline-none"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-1.5 rounded-xl text-xs font-medium border border-[#e2e8f0] bg-white outline-none"
          >
            <option value="all">All Statuses</option>
            <option value="unread">Unread</option>
            <option value="in_progress">In Progress</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
          </select>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-1.5 rounded-xl text-xs font-medium border border-[#e2e8f0] bg-white outline-none"
          >
            <option value="all">All Categories</option>
            <option value="Loans & Credit">Loans & Credit</option>
            <option value="Agent Banking">Agent Banking</option>
            <option value="Account Opening">Account Opening</option>
            <option value="Digital Banking">Digital Banking</option>
            <option value="General Support">General Support</option>
            <option value="Whistleblower Report">Whistleblower Report</option>
            <option value="Complaint">Complaint</option>
          </select>
        </div>
      </div>

      {/* 2-Column Split View: List (Left) + Detail Drawer (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Enquiries List */}
        <div className={`${selectedEnquiry ? 'lg:col-span-5' : 'lg:col-span-12'} bg-white rounded-2xl border border-[#e2e8f0] shadow-xs overflow-hidden`}>
          <div className="divide-y divide-[#e2e8f0] max-h-[700px] overflow-y-auto">
            {filteredEnquiries.length === 0 ? (
              <div className="p-12 text-center text-slate-400 text-xs">
                No customer enquiries found.
              </div>
            ) : (
              filteredEnquiries.map((enq) => {
                const isSelected = selectedEnquiry?.id === enq.id;
                return (
                  <div
                    key={enq.id}
                    onClick={() => handleSelectEnquiry(enq)}
                    className={`p-4 cursor-pointer transition-all hover:bg-slate-50 ${
                      isSelected ? 'bg-sky-50/70 border-l-4 border-l-[#0284c7]' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono text-[11px] font-bold text-slate-500">
                        {enq.ticketNumber}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        enq.status === 'unread' ? 'bg-emerald-100 text-emerald-800' :
                        enq.status === 'in_progress' ? 'bg-amber-100 text-amber-800' :
                        enq.status === 'resolved' ? 'bg-sky-100 text-sky-800' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {enq.status.replace('_', ' ')}
                      </span>
                    </div>

                    <h4 className="text-xs font-bold text-[#0a1e3f] truncate">
                      {enq.name}
                    </h4>
                    <p className="text-[11px] font-semibold text-slate-600 truncate mt-0.5">
                      {enq.subject}
                    </p>
                    <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                      {enq.message}
                    </p>

                    <div className="flex items-center justify-between text-[10px] text-slate-400 mt-2.5 pt-2 border-t border-slate-100">
                      <span>{enq.category}</span>
                      <span>{new Date(enq.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Selected Enquiry Detail Panel */}
        {selectedEnquiry && (
          <div className="lg:col-span-7 bg-white rounded-2xl border border-[#e2e8f0] shadow-xs p-5 space-y-5">
            {/* Ticket Header */}
            <div className="flex items-start justify-between pb-4 border-b border-[#e2e8f0] gap-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-xs font-bold text-[#0284c7]">
                    {selectedEnquiry.ticketNumber}
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-semibold">
                    {selectedEnquiry.category}
                  </span>
                </div>
                <h3 className="font-heading font-bold text-base text-[#0a1e3f]">
                  {selectedEnquiry.subject}
                </h3>
              </div>

              <button
                onClick={() => setSelectedEnquiry(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Customer Info Card */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="flex items-center gap-2 text-[#0a1e3f]">
                <User className="h-4 w-4 text-slate-400" />
                <span className="font-bold">{selectedEnquiry.name}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <Mail className="h-4 w-4 text-slate-400" />
                <span>{selectedEnquiry.email}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <Phone className="h-4 w-4 text-slate-400" />
                <span>{selectedEnquiry.phone || 'Not provided'}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-500">
                <Clock className="h-4 w-4 text-slate-400" />
                <span>{new Date(selectedEnquiry.createdAt).toLocaleString()}</span>
              </div>
            </div>

            {/* Message Body */}
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                Customer Message
              </p>
              <div className="p-4 rounded-xl bg-white border border-[#e2e8f0] text-xs sm:text-sm text-[#0a1e3f] leading-relaxed">
                {selectedEnquiry.message}
              </div>
            </div>

            {/* Assignment & Status Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div>
                <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                  Assign to Staff Member
                </label>
                <select
                  value={selectedEnquiry.assignedTo || ''}
                  onChange={(e) => handleAssign(e.target.value)}
                  className="w-full p-2 rounded-xl border border-[#e2e8f0] text-xs font-semibold text-[#0a1e3f] bg-white outline-none"
                >
                  <option value="">Unassigned</option>
                  {staffUsers.map(s => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({s.role})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                  Update Ticket Status
                </label>
                <select
                  value={selectedEnquiry.status}
                  onChange={(e) => handleStatusChange(e.target.value as any)}
                  className="w-full p-2 rounded-xl border border-[#e2e8f0] text-xs font-semibold text-[#0a1e3f] bg-white outline-none"
                >
                  <option value="unread">Unread</option>
                  <option value="in_progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
            </div>

            {/* Staff Internal Notes */}
            <div className="pt-2 border-t border-slate-100">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Internal Staff Notes
              </p>
              <div className="space-y-2 mb-3">
                {selectedEnquiry.internalNotes.length === 0 ? (
                  <p className="text-xs text-slate-400 italic">No internal notes added yet.</p>
                ) : (
                  selectedEnquiry.internalNotes.map(n => (
                    <div key={n.id} className="p-2.5 rounded-lg bg-amber-50/70 border border-amber-200/60 text-xs">
                      <div className="flex items-center justify-between text-[10px] font-bold text-amber-900 mb-1">
                        <span>{n.author}</span>
                        <span>{new Date(n.createdAt).toLocaleString()}</span>
                      </div>
                      <p className="text-amber-950">{n.note}</p>
                    </div>
                  ))
                )}
              </div>

              <form onSubmit={handleAddNote} className="flex gap-2">
                <input
                  type="text"
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Add private staff note..."
                  className="flex-1 p-2 rounded-xl border border-[#e2e8f0] text-xs outline-none"
                />
                <Button type="submit" size="sm" variant="outline" className="rounded-xl text-xs">
                  Save Note
                </Button>
              </form>
            </div>

            {/* Email Reply Thread & Composer */}
            <div className="pt-2 border-t border-slate-100">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Official Email Responses
              </p>
              <div className="space-y-2 mb-3">
                {selectedEnquiry.responses.map(resp => (
                  <div key={resp.id} className="p-3 rounded-xl bg-sky-50 border border-sky-100 text-xs">
                    <div className="flex items-center justify-between text-[10px] font-bold text-sky-900 mb-1">
                      <span>Sent by {resp.sender}</span>
                      <span>{new Date(resp.sentAt).toLocaleString()}</span>
                    </div>
                    <p className="text-[#0a1e3f]">{resp.message}</p>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSendReply} className="space-y-2">
                <textarea
                  rows={3}
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  placeholder={`Write official reply to ${selectedEnquiry.email}...`}
                  className="w-full p-2.5 rounded-xl border border-[#e2e8f0] text-xs outline-none focus:border-[#0284c7]"
                />
                <div className="flex justify-end">
                  <Button type="submit" size="sm" className="rounded-xl bg-[#0284c7] text-white text-xs font-semibold">
                    <Send className="h-3.5 w-3.5 mr-1" />
                    Dispatch Email Reply
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
