import { useState, useEffect } from "react";
import { Shield, ShieldAlert, RefreshCw, Phone, Mail, Clock, CheckCircle2, Landmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCMS } from "@/context/CMSContext";
import { SupabaseSync } from "@/services/supabaseSync";
import { toast } from "sonner";

export function MaintenanceView() {
  const { systemSettings, updateSystemSettings } = useCMS();
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
        if (!silent) toast.info("System upgrades are still actively in progress. Please check back shortly.");
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
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between text-slate-800">
      {/* ── Institutional Header (No Sign In Links) ── */}
      <header className="py-4 px-6 border-b border-[#e2e8f0] bg-white sticky top-0 z-10 shadow-xs">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-[#f0f7ff] flex items-center justify-center border border-[#e2e8f0] p-1 shadow-xs">
              <img
                src="/rima-logo.png"
                alt="RIMA Microfinance Bank Logo"
                className="h-full w-auto object-contain"
              />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-heading font-bold text-base text-[#0a1e3f] tracking-tight">
                RIMA Bank
              </span>
              <span className="text-[9px] text-slate-500 font-semibold uppercase tracking-wider">
                Microfinance Bank
              </span>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-500 font-medium">
            <Shield className="h-3.5 w-3.5 text-[#0284c7]" />
            <span>CBN Licensed &bull; NDIC Insured</span>
          </div>
        </div>
      </header>

      {/* ── Main Maintenance Container ── */}
      <main className="flex-1 max-w-2xl mx-auto px-4 py-12 sm:py-16 flex flex-col items-center text-center justify-center space-y-6">
        {/* Status Indicator */}
        <div className="relative">
          <div className="h-16 w-16 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center shadow-xs">
            <ShieldAlert className="h-8 w-8" />
          </div>
          <span className="absolute -bottom-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-4 w-4 bg-amber-500" />
          </span>
        </div>

        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold">
          <span className="w-2 h-2 rounded-full bg-amber-500" />
          <span>Scheduled Infrastructure Maintenance</span>
        </div>

        {/* Heading & Explanation */}
        <div className="space-y-3">
          <h1 className="font-heading font-bold text-2xl sm:text-3xl text-[#0a1e3f] tracking-tight">
            We are performing scheduled service upgrades
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-lg mx-auto">
            {systemSettings?.maintenanceMessage ||
              "Our digital banking systems are currently undergoing scheduled routine maintenance to improve security, reliability, and transaction speed. Full service will resume shortly."}
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <Button
            variant="default"
            size="default"
            onClick={() => checkStatus(false)}
            disabled={isChecking}
            className="bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-semibold h-10 px-5 rounded-xl shadow-sm"
          >
            <RefreshCw className={`h-3.5 w-3.5 mr-2 ${isChecking ? "animate-spin" : ""}`} />
            <span>{isChecking ? "Checking Status..." : "Check Service Status"}</span>
          </Button>
          <span className="text-[11px] text-slate-400">
            Last checked: {lastChecked.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </span>
        </div>

        {/* Emergency Customer Support Desk */}
        <div className="w-full bg-white rounded-2xl border border-[#e2e8f0] p-5 sm:p-6 text-left space-y-3.5 shadow-xs mt-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="font-heading font-bold text-xs text-[#0a1e3f] uppercase tracking-wider">
              Emergency Customer Support Desk
            </h3>
            <span className="text-[10px] text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md">
              Active Support
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600">
            <div className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50 border border-slate-100">
              <Mail className="h-4 w-4 text-[#0284c7] shrink-0" />
              <div>
                <p className="text-[10px] text-slate-400 font-medium">Email Enquiries</p>
                <p className="font-semibold text-slate-800">{systemSettings?.contactEmail || "info@rimamfb.com"}</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50 border border-slate-100">
              <Clock className="h-4 w-4 text-[#0284c7] shrink-0" />
              <div>
                <p className="text-[10px] text-slate-400 font-medium">Support Hours</p>
                <p className="font-semibold text-slate-800">{systemSettings?.supportHours || "Mon - Fri: 8:00 AM - 5:00 PM"}</p>
              </div>
            </div>
          </div>

          <p className="text-[11px] text-slate-500 pt-1">
            For urgent card security or account freezing, support officers remain on standby to assist you.
          </p>
        </div>
      </main>

      {/* ── Footer ── */}
      <footer className="py-4 text-center text-xs text-slate-400 border-t border-[#e2e8f0] bg-white">
        <div className="max-w-[1200px] mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px]">
          <span>© {new Date().getFullYear()} Rima Microfinance Bank Ltd. All rights reserved.</span>
          <span>Licensed by the Central Bank of Nigeria &bull; NDIC Insured</span>
        </div>
      </footer>
    </div>
  );
}
