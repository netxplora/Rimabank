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
  Tag,
  ArrowLeft,
  Copy,
  ExternalLink,
  CornerDownRight,
  FileText
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
  const [isFullMessageModalOpen, setIsFullMessageModalOpen] = useState(false);

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

  const handleSelectEnquiry = (enq: Enquiry, openFullModal: boolean = false) => {
    setSelectedEnquiry(enq);
    if (openFullModal || window.innerWidth < 1024) {
      setIsFullMessageModalOpen(true);
    }
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
    } else {
      assignEnquiry(selectedEnquiry.id, '', '', { id: user.id, name: user.name, role: user.role });
      setSelectedEnquiry(prev => prev ? { ...prev, assignedTo: undefined, assignedToName: undefined } : null);
      toast.success('Ticket unassigned');
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
    const updated = enquiries.find(e => e.id === selectedEnquiry.id);
    if (updated) setSelectedEnquiry(updated);
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEnquiry || !user || !replyMessage.trim()) return;
    respondToEnquiry(selectedEnquiry.id, replyMessage, { id: user.id, name: user.name, role: user.role });
    setReplyMessage('');
    toast.success(`Official reply dispatched to ${selectedEnquiry.email}`);
    const updated = enquiries.find(e => e.id === selectedEnquiry.id);
    if (updated) setSelectedEnquiry(updated);
  };

  const handleDelete = (id: string, ticket: string) => {
    if (!user) return;
    if (!can('delete', 'enquiries')) {
      toast.error('Staff officers cannot delete enquiry tickets.');
      return;
    }
    if (window.confirm(`Delete enquiry ticket ${ticket}?`)) {
      deleteEnquiry(id, { id: user.id, name: user.name, role: user.role });
      if (selectedEnquiry?.id === id) {
        setSelectedEnquiry(null);
        setIsFullMessageModalOpen(false);
      }
      toast.success('Enquiry ticket removed.');
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`Copied ${label} to clipboard`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-[#e2e8f0] shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-sky-100 text-[#0284c7]">
              Customer Service
            </span>
          </div>
          <h1 className="text-xl font-heading font-bold text-[#0a1e3f] tracking-tight">
            Customer Enquiries & Inbox
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Review, assign, and respond to incoming customer inquiries, support tickets, and account questions.
          </p>
        </div>
      </div>

      {/* Filter & Search Bar */}
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

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-1.5 rounded-xl text-xs font-medium border border-[#e2e8f0] bg-white outline-none shrink-0"
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
            className="px-3 py-1.5 rounded-xl text-xs font-medium border border-[#e2e8f0] bg-white outline-none shrink-0"
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

      {/* 2-Column Split View: List (Left) + Detail Panel (Right on desktop) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Enquiries List */}
        <div className={`${selectedEnquiry ? 'lg:col-span-5' : 'lg:col-span-12'} bg-white rounded-2xl border border-[#e2e8f0] shadow-xs overflow-hidden`}>
          <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <span className="text-xs font-bold text-[#0a1e3f]">
              Messages ({filteredEnquiries.length})
            </span>
            <span className="text-[11px] text-slate-400">
              Tap any message to read
            </span>
          </div>

          <div className="divide-y divide-[#e2e8f0] max-h-[750px] overflow-y-auto">
            {filteredEnquiries.length === 0 ? (
              <div className="p-12 text-center text-slate-400 text-xs">
                <MessageSquare className="h-8 w-8 mx-auto mb-2 opacity-30" />
                <p>No customer enquiries match your filter.</p>
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
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-mono text-[11px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
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
                    <p className="text-[11px] text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                      {enq.message}
                    </p>

                    <div className="flex items-center justify-between text-[10px] text-slate-400 mt-3 pt-2 border-t border-slate-100">
                      <span className="font-medium text-slate-600">{enq.category}</span>
                      <div className="flex items-center gap-2">
                        <span>{new Date(enq.createdAt).toLocaleDateString()}</span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSelectEnquiry(enq, true);
                          }}
                          className="h-6 px-2 text-[10px] text-[#0284c7] hover:bg-sky-50 rounded-md"
                        >
                          Full View
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Selected Enquiry Detail Panel (Desktop inline view) */}
        {selectedEnquiry && (
          <div className="hidden lg:block lg:col-span-7 bg-white rounded-2xl border border-[#e2e8f0] shadow-xs p-6 space-y-6">
            {/* Ticket Header */}
            <div className="flex items-start justify-between pb-4 border-b border-[#e2e8f0] gap-3">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="font-mono text-xs font-bold text-[#0284c7] bg-sky-50 px-2 py-0.5 rounded-md border border-sky-100">
                    {selectedEnquiry.ticketNumber}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-semibold">
                    {selectedEnquiry.category}
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase ${
                    selectedEnquiry.status === 'unread' ? 'bg-emerald-100 text-emerald-800' :
                    selectedEnquiry.status === 'in_progress' ? 'bg-amber-100 text-amber-800' :
                    selectedEnquiry.status === 'resolved' ? 'bg-sky-100 text-sky-800' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {selectedEnquiry.status.replace('_', ' ')}
                  </span>
                </div>
                <h3 className="font-heading font-bold text-base text-[#0a1e3f]">
                  {selectedEnquiry.subject}
                </h3>
              </div>

              <div className="flex items-center gap-1.5">
                {can('delete', 'enquiries') && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(selectedEnquiry.id, selectedEnquiry.ticketNumber)}
                    className="h-8 px-2.5 text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-lg text-xs"
                  >
                    <Trash2 className="h-3.5 w-3.5 mr-1" />
                    Delete
                  </Button>
                )}
                <button
                  onClick={() => setSelectedEnquiry(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Customer Info Card */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="flex items-center gap-2 text-[#0a1e3f]">
                <User className="h-4 w-4 text-slate-400 shrink-0" />
                <span className="font-bold">{selectedEnquiry.name}</span>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <div className="flex items-center gap-2 truncate">
                  <Mail className="h-4 w-4 text-slate-400 shrink-0" />
                  <a href={`mailto:${selectedEnquiry.email}`} className="text-[#0284c7] hover:underline truncate">
                    {selectedEnquiry.email}
                  </a>
                </div>
                <button
                  onClick={() => copyToClipboard(selectedEnquiry.email, 'Email')}
                  className="p-1 text-slate-400 hover:text-slate-600"
                  title="Copy email"
                >
                  <Copy className="h-3 w-3" />
                </button>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <Phone className="h-4 w-4 text-slate-400 shrink-0" />
                {selectedEnquiry.phone ? (
                  <a href={`tel:${selectedEnquiry.phone}`} className="text-[#0284c7] hover:underline">
                    {selectedEnquiry.phone}
                  </a>
                ) : (
                  <span className="text-slate-400">Phone not provided</span>
                )}
              </div>
              <div className="flex items-center gap-2 text-slate-500">
                <Clock className="h-4 w-4 text-slate-400 shrink-0" />
                <span>{new Date(selectedEnquiry.createdAt).toLocaleString()}</span>
              </div>
            </div>

            {/* Full Message Body */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <p className="text-xs font-bold text-[#0a1e3f] uppercase tracking-wider flex items-center gap-1.5">
                  <FileText className="h-3.5 w-3.5 text-[#0284c7]" />
                  <span>Full Customer Message</span>
                </p>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => copyToClipboard(selectedEnquiry.message, 'Message')}
                  className="h-6 px-2 text-[11px] text-slate-500 hover:text-slate-800"
                >
                  <Copy className="h-3 w-3 mr-1" />
                  Copy Text
                </Button>
              </div>
              <div className="p-4 rounded-xl bg-white border border-[#e2e8f0] text-xs sm:text-sm text-[#0a1e3f] leading-relaxed whitespace-pre-wrap">
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
            <div className="pt-3 border-t border-slate-100">
              <p className="text-xs font-bold text-[#0a1e3f] uppercase tracking-wider mb-2">
                Internal Staff Notes ({selectedEnquiry.internalNotes?.length || 0})
              </p>
              <div className="space-y-2 mb-3 max-h-48 overflow-y-auto">
                {(!selectedEnquiry.internalNotes || selectedEnquiry.internalNotes.length === 0) ? (
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
                <Button type="submit" size="sm" variant="outline" className="rounded-xl text-xs shrink-0">
                  Save Note
                </Button>
              </form>
            </div>

            {/* Official Email Responses */}
            <div className="pt-3 border-t border-slate-100">
              <p className="text-xs font-bold text-[#0a1e3f] uppercase tracking-wider mb-2">
                Official Replies Sent ({selectedEnquiry.responses?.length || 0})
              </p>
              <div className="space-y-2 mb-3 max-h-48 overflow-y-auto">
                {selectedEnquiry.responses?.map(resp => (
                  <div key={resp.id} className="p-3 rounded-xl bg-sky-50 border border-sky-100 text-xs">
                    <div className="flex items-center justify-between text-[10px] font-bold text-sky-900 mb-1">
                      <span>Sent by {resp.sender}</span>
                      <span>{new Date(resp.sentAt).toLocaleString()}</span>
                    </div>
                    <p className="text-[#0a1e3f] whitespace-pre-wrap">{resp.message}</p>
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
                  <Button type="submit" size="sm" className="rounded-xl bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-semibold">
                    <Send className="h-3.5 w-3.5 mr-1" />
                    Dispatch Official Reply
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* MOBILE & MODAL FULL MESSAGE READER DIALOG                                 */}
      {/* ========================================================================= */}
      {isFullMessageModalOpen && selectedEnquiry && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in-50">
          <div className="bg-white rounded-2xl shadow-2xl border border-[#e2e8f0] w-full max-w-2xl flex flex-col max-h-[92vh] overflow-hidden">
            {/* Modal Header */}
            <div className="px-5 py-4 border-b border-[#e2e8f0] flex items-center justify-between bg-slate-50 shrink-0">
              <div className="flex items-center gap-2 truncate">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsFullMessageModalOpen(false)}
                  className="h-8 w-8 p-0 rounded-lg lg:hidden"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <div className="truncate">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#0284c7]">
                      {selectedEnquiry.ticketNumber}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-slate-200/80 text-slate-700 text-[10px] font-semibold">
                      {selectedEnquiry.category}
                    </span>
                  </div>
                  <h3 className="font-heading font-bold text-sm text-[#0a1e3f] truncate mt-0.5">
                    {selectedEnquiry.subject}
                  </h3>
                </div>
              </div>

              <button
                onClick={() => setIsFullMessageModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-5 flex-1">
              {/* Customer summary */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px]">Customer Name</span>
                  <span className="font-bold text-[#0a1e3f]">{selectedEnquiry.name}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Email Address</span>
                  <a href={`mailto:${selectedEnquiry.email}`} className="font-semibold text-[#0284c7] hover:underline">
                    {selectedEnquiry.email}
                  </a>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Phone</span>
                  <span className="font-medium text-slate-700">{selectedEnquiry.phone || 'Not provided'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Received On</span>
                  <span className="font-medium text-slate-700">{new Date(selectedEnquiry.createdAt).toLocaleString()}</span>
                </div>
              </div>

              {/* Complete Customer Message */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-[#0a1e3f] uppercase tracking-wider">
                    Full Customer Message
                  </label>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(selectedEnquiry.message, 'Message')}
                    className="h-6 px-2 text-[11px] text-slate-500"
                  >
                    <Copy className="h-3 w-3 mr-1" />
                    Copy
                  </Button>
                </div>
                <div className="p-4 rounded-xl bg-white border border-[#e2e8f0] text-xs sm:text-sm text-[#0a1e3f] leading-relaxed whitespace-pre-wrap">
                  {selectedEnquiry.message}
                </div>
              </div>

              {/* Status & Assignment */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                    Assign Staff
                  </label>
                  <select
                    value={selectedEnquiry.assignedTo || ''}
                    onChange={(e) => handleAssign(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-[#e2e8f0] text-xs font-semibold text-[#0a1e3f] bg-white outline-none"
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
                    Status
                  </label>
                  <select
                    value={selectedEnquiry.status}
                    onChange={(e) => handleStatusChange(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl border border-[#e2e8f0] text-xs font-semibold text-[#0a1e3f] bg-white outline-none"
                  >
                    <option value="unread">Unread</option>
                    <option value="in_progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>
              </div>

              {/* Internal Notes */}
              <div className="pt-3 border-t border-slate-100">
                <label className="block text-xs font-bold text-[#0a1e3f] uppercase tracking-wider mb-2">
                  Staff Notes
                </label>
                <div className="space-y-2 mb-3 max-h-36 overflow-y-auto">
                  {(!selectedEnquiry.internalNotes || selectedEnquiry.internalNotes.length === 0) ? (
                    <p className="text-xs text-slate-400 italic">No notes added.</p>
                  ) : (
                    selectedEnquiry.internalNotes.map(n => (
                      <div key={n.id} className="p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-xs">
                        <div className="flex items-center justify-between text-[10px] font-bold text-amber-900 mb-0.5">
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
                    placeholder="Add private note..."
                    className="flex-1 p-2 rounded-xl border border-[#e2e8f0] text-xs outline-none"
                  />
                  <Button type="submit" size="sm" variant="outline" className="rounded-xl text-xs shrink-0">
                    Add
                  </Button>
                </form>
              </div>

              {/* Official Email Dispatch */}
              <div className="pt-3 border-t border-slate-100">
                <label className="block text-xs font-bold text-[#0a1e3f] uppercase tracking-wider mb-2">
                  Official Email Reply
                </label>
                <div className="space-y-2 mb-3 max-h-36 overflow-y-auto">
                  {selectedEnquiry.responses?.map(resp => (
                    <div key={resp.id} className="p-3 rounded-xl bg-sky-50 border border-sky-100 text-xs">
                      <div className="flex items-center justify-between text-[10px] font-bold text-sky-900 mb-0.5">
                        <span>{resp.sender}</span>
                        <span>{new Date(resp.sentAt).toLocaleString()}</span>
                      </div>
                      <p className="text-[#0a1e3f] whitespace-pre-wrap">{resp.message}</p>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSendReply} className="space-y-2">
                  <textarea
                    rows={3}
                    value={replyMessage}
                    onChange={(e) => setReplyMessage(e.target.value)}
                    placeholder={`Type official email response to ${selectedEnquiry.email}...`}
                    className="w-full p-2.5 rounded-xl border border-[#e2e8f0] text-xs outline-none focus:border-[#0284c7]"
                  />
                  <div className="flex justify-end">
                    <Button type="submit" size="sm" className="rounded-xl bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-semibold">
                      <Send className="h-3.5 w-3.5 mr-1" />
                      Send Official Email
                    </Button>
                  </div>
                </form>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-5 py-3 border-t border-[#e2e8f0] bg-slate-50 flex items-center justify-between shrink-0">
              {can('delete', 'enquiries') ? (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(selectedEnquiry.id, selectedEnquiry.ticketNumber)}
                  className="text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-lg text-xs"
                >
                  <Trash2 className="h-3.5 w-3.5 mr-1" />
                  Delete Ticket
                </Button>
              ) : <div />}

              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsFullMessageModalOpen(false)}
                className="rounded-xl text-xs"
              >
                Close View
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
