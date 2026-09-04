import React, { useState } from 'react';
import {
  ShieldCheck,
  Search,
  Filter,
  Download,
  Clock,
  User,
  Activity,
  CheckCircle2,
  X
} from 'lucide-react';
import { useCMS } from '@/context/CMSContext';
import { AuditLog } from '@/types/cms';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function AuditLogsView() {
  const { auditLogs } = useCMS();
  const [search, setSearch] = useState('');
  const [actionFilter, setActionFilter] = useState<string>('all');
  const [resourceFilter, setResourceFilter] = useState<string>('all');
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);

  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = log.userName.toLowerCase().includes(search.toLowerCase()) ||
      log.details.toLowerCase().includes(search.toLowerCase()) ||
      (log.resourceTitle && log.resourceTitle.toLowerCase().includes(search.toLowerCase()));
    const matchesAction = actionFilter === 'all' || log.action === actionFilter;
    const matchesResource = resourceFilter === 'all' || log.resourceType === resourceFilter;
    return matchesSearch && matchesAction && matchesResource;
  });

  const handleExportCSV = () => {
    const headers = ['ID', 'User', 'Role', 'Action', 'Resource', 'Details', 'Timestamp', 'IP'];
    const rows = filteredLogs.map(l => [
      l.id,
      l.userName,
      l.userRole,
      l.action,
      l.resourceType,
      `"${l.details.replace(/"/g, '""')}"`,
      l.timestamp,
      l.ipAddress || '127.0.0.1'
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `rima_cms_audit_trail_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Audit trail exported to CSV.');
  };

  const getActionBadge = (action: AuditLog['action']) => {
    switch (action) {
      case 'CREATE':
        return <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">CREATE</span>;
      case 'UPDATE':
        return <span className="px-2 py-0.5 rounded-full bg-sky-100 text-sky-800 text-[10px] font-bold">UPDATE</span>;
      case 'DELETE':
        return <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-800 text-[10px] font-bold">DELETE</span>;
      case 'PUBLISH':
        return <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-bold">PUBLISH</span>;
      case 'LOGIN':
        return <span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 text-[10px] font-bold">LOGIN</span>;
      default:
        return <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold">{action}</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-[#e2e8f0] shadow-xs">
        <div>
          <h1 className="text-xl font-heading font-bold text-[#0a1e3f] tracking-tight">
            Institutional Audit Trail & Logs
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Immutable regulatory record of all administrative logins, content modifications, and publish actions.
          </p>
        </div>

        <Button
          onClick={handleExportCSV}
          variant="outline"
          className="h-9 rounded-xl border-[#e2e8f0] text-xs font-semibold flex items-center gap-1.5"
        >
          <Download className="h-4 w-4 text-slate-500" />
          <span>Export Audit Log (CSV)</span>
        </Button>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-[#e2e8f0] shadow-xs">
        <div className="relative w-full sm:w-72">
          <Search className="h-4 w-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search audit trail..."
            className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-[#e2e8f0] text-xs font-medium focus:border-[#0284c7] outline-none"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <select
            value={actionFilter}
            onChange={(e) => setActionFilter(e.target.value)}
            className="px-3 py-1.5 rounded-xl text-xs font-medium border border-[#e2e8f0] bg-white outline-none"
          >
            <option value="all">All Actions</option>
            <option value="CREATE">Create</option>
            <option value="UPDATE">Update</option>
            <option value="PUBLISH">Publish</option>
            <option value="DELETE">Delete</option>
            <option value="LOGIN">Login</option>
          </select>

          <select
            value={resourceFilter}
            onChange={(e) => setResourceFilter(e.target.value)}
            className="px-3 py-1.5 rounded-xl text-xs font-medium border border-[#e2e8f0] bg-white outline-none"
          >
            <option value="all">All Resources</option>
            <option value="LANDING_PAGE">Landing Page</option>
            <option value="PROMOTION">Promotions</option>
            <option value="ANNOUNCEMENT">Announcements</option>
            <option value="PUBLICATION">Publications</option>
            <option value="ENQUIRY">Enquiries</option>
            <option value="MEDIA">Media</option>
            <option value="USER">Staff Accounts</option>
          </select>
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="bg-white rounded-2xl border border-[#e2e8f0] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-[#e2e8f0] text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4">Staff User</th>
                <th className="py-3 px-4">Action</th>
                <th className="py-3 px-4">Resource</th>
                <th className="py-3 px-4">Details & Summary</th>
                <th className="py-3 px-4">IP Address</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e2e8f0]">
              {filteredLogs.map((log) => (
                <tr
                  key={log.id}
                  onClick={() => setSelectedLog(log)}
                  className="hover:bg-slate-50/80 cursor-pointer transition-colors"
                >
                  <td className="py-3 px-4 text-slate-500 font-mono text-[11px] whitespace-nowrap">
                    {new Date(log.timestamp).toLocaleString()}
                  </td>
                  <td className="py-3 px-4 font-semibold text-[#0a1e3f] whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <span>{log.userName}</span>
                      <span className="text-[10px] text-slate-400 capitalize">({log.userRole})</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    {getActionBadge(log.action)}
                  </td>
                  <td className="py-3 px-4 font-semibold text-slate-700 whitespace-nowrap">
                    {log.resourceType}
                  </td>
                  <td className="py-3 px-4 text-slate-600">
                    <div className="line-clamp-1">{log.details}</div>
                  </td>
                  <td className="py-3 px-4 text-slate-400 font-mono text-[11px] whitespace-nowrap">
                    {log.ipAddress || '197.210.55.12'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Log Detail Modal */}
      {selectedLog && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl border border-[#e2e8f0] w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-150">
            <div className="px-6 py-4 border-b border-[#e2e8f0] flex items-center justify-between bg-slate-50">
              <h3 className="font-heading font-bold text-sm text-[#0a1e3f]">
                Audit Event Record Details
              </h3>
              <button
                onClick={() => setSelectedLog(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="p-6 space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div>
                  <span className="block text-[10px] uppercase font-bold text-slate-400">Actor</span>
                  <span className="font-bold text-[#0a1e3f]">{selectedLog.userName} ({selectedLog.userRole})</span>
                </div>
                <div>
                  <span className="block text-[10px] uppercase font-bold text-slate-400">Action</span>
                  <span className="font-bold text-[#0a1e3f]">{selectedLog.action}</span>
                </div>
                <div>
                  <span className="block text-[10px] uppercase font-bold text-slate-400">Resource</span>
                  <span className="font-bold text-[#0a1e3f]">{selectedLog.resourceType}</span>
                </div>
                <div>
                  <span className="block text-[10px] uppercase font-bold text-slate-400">IP Address</span>
                  <span className="font-mono text-[#0a1e3f]">{selectedLog.ipAddress || '127.0.0.1'}</span>
                </div>
              </div>

              <div>
                <span className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Details</span>
                <p className="p-3 rounded-xl bg-white border border-[#e2e8f0] text-slate-700 leading-relaxed font-medium">
                  {selectedLog.details}
                </p>
              </div>

              <div>
                <span className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Timestamp</span>
                <p className="font-mono text-slate-500">
                  {new Date(selectedLog.timestamp).toUTCString()} ({selectedLog.timestamp})
                </p>
              </div>

              <div className="pt-3 border-t border-[#e2e8f0] flex justify-end">
                <Button
                  size="sm"
                  onClick={() => setSelectedLog(null)}
                  className="rounded-xl text-xs bg-[#0a1e3f] text-white"
                >
                  Close Record
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
