import { useState, useEffect } from "react";
import { Shield, RefreshCw, Mail, Clock, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCMS } from "@/context/CMSContext";
import { SupabaseSync } from "@/services/supabaseSync";
import { toast } from "sonner";

export function MaintenanceView() {
  const { systemSettings } = useCMS();
  const [isChecking, setIsChecking] = useState(false);
  const [lastChecked, setLastChecked] = useState<Date>(new Date());

  const checkStatus = async (silent = false) => {
    setIsChecking(true);
    try {
      const remote = await SupabaseSync.fetchSystemSettings();
      setLastChecked(new Date());
      if (remote && !remote.maintenanceMode) {
        if (!silent) toast.success("Maintenance complete! Reloading banking services...");
        window.location.reload();
      } else {
        if (!silent) toast.info("System updates are still in progress. Please check back shortly.");
      }
    } catch {
      if (!silent) toast.error("Unable to check status. Retrying automatically...");
    } finally {
      setIsChecking(false);
    }
  };

  // Automatic background status polling every 25 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      checkStatus(true);
    }, 25000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#060e1a] text-slate-100 flex flex-col justify-between selection:bg-sky-500/20 selection:text-sky-300 relative overflow-hidden font-sans">
      {/* Background Subtle Gradient Blobs */}
      <div
        className="pointer-events-none absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-sky-600/10 blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-blue-700/10 blur-[120px]"
        aria-hidden="true"
      />

      {/* Header */}
      <header className="py-4 px-6 border-b border-white/10 bg-[#060e1a]/80 backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center p-1.5 shadow-xs">
              <img
                src="/rima-logo.png"
                alt="RIMA Microfinance Bank"
                className="h-full w-auto object-contain"
              />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-heading font-bold text-base text-white tracking-tight">
                RIMA Bank
              </span>
              <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                Microfinance Bank
              </span>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
            <Shield className="h-3.5 w-3.5 text-sky-400" />
            <span>CBN Licensed &bull; NDIC Insured</span>
          </div>
        </div>
      </header>

      {/* Main Maintenance Container */}
      <main className="flex-1 max-w-2xl mx-auto px-4 py-12 sm:py-16 flex flex-col items-center text-center justify-center space-y-7 z-10">
        {/* Status Indicator */}
        <div className="relative">
          <div className="h-16 w-16 rounded-2xl bg-sky-500/10 border border-sky-500/30 text-sky-400 flex items-center justify-center shadow-lg shadow-sky-500/5">
            <AlertCircle className="h-8 w-8" />
          </div>
          <span className="absolute -bottom-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-4 w-4 bg-sky-500" />
          </span>
        </div>

        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-200 text-xs font-medium">
          <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
          <span>Scheduled System Upgrades In Progress</span>
        </div>

        {/* Heading & Explanation */}
        <div className="space-y-3">
          <h1 className="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight">
            Scheduled Service Maintenance
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-lg mx-auto">
            {systemSettings?.maintenanceMessage ||
              "Our digital banking systems are currently undergoing scheduled routine updates to enhance system stability, security, and transaction performance. Full banking services will resume shortly."}
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <Button
            variant="default"
            size="default"
            onClick={() => checkStatus(false)}
            disabled={isChecking}
            className="bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold text-xs h-10 px-5 rounded-xl shadow-md transition-all active:scale-95"
          >
            <RefreshCw className={`h-3.5 w-3.5 mr-2 ${isChecking ? "animate-spin" : ""}`} />
            <span>{isChecking ? "Checking Status..." : "Check System Status"}</span>
          </Button>
          <span className="text-[11px] text-slate-400">
            Last checked: {lastChecked.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </span>
        </div>

        {/* Emergency Customer Support Desk */}
        <div className="w-full bg-white/[0.03] backdrop-blur-md rounded-2xl border border-white/10 p-5 sm:p-6 text-left space-y-4 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <h3 className="font-heading font-semibold text-xs text-white uppercase tracking-wider">
              Emergency Customer Support
            </h3>
            <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-md">
              Support Active
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
              <Mail className="h-4 w-4 text-sky-400 shrink-0" />
              <div>
                <p className="text-[10px] text-slate-400 font-medium">Email Support</p>
                <p className="font-semibold text-slate-100">{systemSettings?.contactEmail || "info@rimamfb.com"}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
              <Clock className="h-4 w-4 text-sky-400 shrink-0" />
              <div>
                <p className="text-[10px] text-slate-400 font-medium">Support Hours</p>
                <p className="font-semibold text-slate-100">{systemSettings?.supportHours || "Mon - Fri: 8:00 AM - 5:00 PM"}</p>
              </div>
            </div>
          </div>

          <p className="text-[11px] text-slate-400">
            For critical inquiries or urgent account requests, customer care representatives remain available during support hours.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 text-center text-xs text-slate-500 border-t border-white/10 bg-[#060e1a]/80 backdrop-blur-md z-10">
        <div className="max-w-[1200px] mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px]">
          <span>© {new Date().getFullYear()} Rima Microfinance Bank Ltd. All rights reserved.</span>
          <span>Licensed by the Central Bank of Nigeria &bull; NDIC Insured</span>
        </div>
      </footer>
    </div>
  );
}
