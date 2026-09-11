import React, { useState } from "react";
import {
  Smartphone,
  Download,
  QrCode,
  ShieldCheck,
  CheckCircle2,
  Copy,
  Check,
  PhoneCall,
  ChevronRight,
  Sparkles,
  ArrowRight
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useCMS } from "@/context/CMSContext";
import { Link } from "react-router-dom";

interface DownloadAppDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DownloadAppDialog({ open, onOpenChange }: DownloadAppDialogProps) {
  const { siteContent, systemSettings } = useCMS();
  const [copiedCode, setCopiedCode] = useState(false);
  const [activeTab, setActiveTab] = useState<"app" | "ussd">("app");

  const appLinks = (siteContent as any)?.appLinks || (siteContent as any)?.appStoreLinks;
  const googlePlayUrl = systemSettings?.androidAppUrl || appLinks?.googlePlay || appLinks?.androidUrl || "https://play.google.com";
  const appleStoreUrl = systemSettings?.iosAppUrl || appLinks?.appleStore || appLinks?.iosUrl || "https://apps.apple.com";
  const apkDownloadUrl = systemSettings?.apkDownloadUrl || appLinks?.apkUrl;
  const ussdCode = systemSettings?.ussdCode || "*966*808#";

  const handleCopyUSSD = () => {
    navigator.clipboard.writeText(ussdCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[92vw] max-w-[440px] p-0 overflow-hidden bg-white border border-slate-200/90 rounded-2xl sm:rounded-3xl shadow-2xl focus:outline-none max-h-[90vh] flex flex-col">
        {/* Compact Header Ribbon */}
        <div className="bg-gradient-to-r from-[#0a1e3f] via-[#0d2852] to-[#0284c7] px-4 py-3.5 sm:px-5 sm:py-4 text-white relative shrink-0">
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 border border-white/20 text-sky-200 text-[10px] font-semibold tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
              <span>CBN Licensed MFB</span>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-sky-200 font-medium">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
              <span>NDIC Insured</span>
            </div>
          </div>

          <DialogTitle className="font-heading text-lg sm:text-xl font-bold tracking-tight text-white">
            RIMA Mobile Banking
          </DialogTitle>
          
          <DialogDescription className="font-sans text-sky-100 text-[11px] sm:text-xs mt-0.5 leading-snug">
            Manage your personal & business accounts, transfer funds instantly, and pay bills 24/7.
          </DialogDescription>

          {/* Compact Switcher */}
          <div className="flex items-center gap-1.5 mt-3 p-0.5 bg-white/10 backdrop-blur-md rounded-lg border border-white/15">
            <button
              type="button"
              onClick={() => setActiveTab("app")}
              className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-md text-[11px] sm:text-xs font-semibold transition-all ${
                activeTab === "app"
                  ? "bg-white text-[#0a1e3f] shadow-xs"
                  : "text-white/80 hover:text-white hover:bg-white/5"
              }`}
            >
              <Smartphone className="h-3.5 w-3.5" />
              <span>Mobile App</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("ussd")}
              className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-md text-[11px] sm:text-xs font-semibold transition-all ${
                activeTab === "ussd"
                  ? "bg-white text-[#0a1e3f] shadow-xs"
                  : "text-white/80 hover:text-white hover:bg-white/5"
              }`}
            >
              <PhoneCall className="h-3.5 w-3.5" />
              <span>Offline USSD</span>
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-4 sm:p-5 space-y-4 overflow-y-auto overscroll-contain flex-1">
          {activeTab === "app" ? (
            <div className="space-y-3.5">
              {/* Download Buttons Matrix */}
              <div className="grid grid-cols-2 gap-2.5">
                {/* Google Play */}
                <a
                  href={googlePlayUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center text-center p-3 rounded-xl border border-slate-200 bg-[#f8fbff] hover:bg-[#f0f9ff] hover:border-[#0284c7] transition-all group shadow-2xs"
                >
                  <div className="h-8 w-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-[#0a1e3f] group-hover:bg-[#0284c7] group-hover:text-white group-hover:border-[#0284c7] transition-all mb-1.5">
                    <Download className="h-4 w-4" />
                  </div>
                  <span className="text-[9px] uppercase font-bold text-slate-400">Android</span>
                  <span className="font-heading text-xs font-bold text-[#0a1e3f] group-hover:text-[#0284c7] transition-colors">
                    Google Play
                  </span>
                </a>

                {/* Apple Store */}
                <a
                  href={appleStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center text-center p-3 rounded-xl border border-slate-200 bg-[#f8fbff] hover:bg-[#f0f9ff] hover:border-[#0284c7] transition-all group shadow-2xs"
                >
                  <div className="h-8 w-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-[#0a1e3f] group-hover:bg-[#0284c7] group-hover:text-white group-hover:border-[#0284c7] transition-all mb-1.5">
                    <Smartphone className="h-4 w-4" />
                  </div>
                  <span className="text-[9px] uppercase font-bold text-slate-400">iOS</span>
                  <span className="font-heading text-xs font-bold text-[#0a1e3f] group-hover:text-[#0284c7] transition-colors">
                    App Store
                  </span>
                </a>
              </div>

              {/* Direct APK Link (if configured) */}
              {apkDownloadUrl && (
                <a
                  href={apkDownloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2.5 rounded-xl border border-emerald-200 bg-emerald-50/50 hover:bg-emerald-50 text-xs font-semibold text-emerald-800 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Download className="h-3.5 w-3.5 text-emerald-600" />
                    <span>Download Direct Android APK</span>
                  </span>
                  <ChevronRight className="h-3.5 w-3.5 text-emerald-500" />
                </a>
              )}

              {/* QR Code Mini Banner */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center gap-3">
                <div className="w-14 h-14 rounded-lg bg-white p-1 border border-slate-200 shadow-2xs shrink-0 flex items-center justify-center">
                  <svg viewBox="0 0 100 100" className="w-full h-full text-[#0a1e3f]" fill="currentColor">
                    <rect x="0" y="0" width="30" height="30" rx="3" />
                    <rect x="5" y="5" width="20" height="20" fill="white" />
                    <rect x="9" y="9" width="12" height="12" />
                    <rect x="70" y="0" width="30" height="30" rx="3" />
                    <rect x="75" y="5" width="20" height="20" fill="white" />
                    <rect x="79" y="9" width="12" height="12" />
                    <rect x="0" y="70" width="30" height="30" rx="3" />
                    <rect x="5" y="75" width="20" height="20" fill="white" />
                    <rect x="9" y="79" width="12" height="12" />
                    <rect x="38" y="10" width="8" height="8" />
                    <rect x="50" y="10" width="8" height="8" />
                    <rect x="38" y="24" width="8" height="8" />
                    <rect x="10" y="38" width="8" height="8" />
                    <rect x="24" y="50" width="8" height="8" />
                    <rect x="38" y="50" width="24" height="8" />
                    <rect x="68" y="38" width="8" height="8" />
                    <rect x="80" y="50" width="8" height="8" />
                    <rect x="38" y="68" width="8" height="8" />
                    <rect x="50" y="80" width="8" height="8" />
                    <rect x="68" y="68" width="18" height="8" />
                  </svg>
                </div>
                <div className="space-y-0.5 text-left">
                  <div className="flex items-center gap-1 text-[11px] font-bold text-[#0284c7]">
                    <QrCode className="h-3 w-3" />
                    <span>Point phone camera to scan</span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-snug">
                    Scan to open verified app download link directly on your smartphone.
                  </p>
                </div>
              </div>

              {/* Feature Chips */}
              <div className="grid grid-cols-2 gap-1.5 text-[11px] text-slate-600 pt-0.5">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3 w-3 text-emerald-600 shrink-0" />
                  <span>Instant 24/7 transfers</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3 w-3 text-emerald-600 shrink-0" />
                  <span>Biometric login</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3 w-3 text-emerald-600 shrink-0" />
                  <span>Utility bill payments</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3 w-3 text-emerald-600 shrink-0" />
                  <span>e-Statements download</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {/* USSD Hero Box */}
              <div className="p-4 rounded-xl bg-[#0a1e3f] text-white space-y-2 text-center">
                <p className="text-[10px] font-semibold text-sky-200 uppercase tracking-wider">
                  Official RIMA USSD Banking Code
                </p>
                <div className="flex items-center justify-center gap-2">
                  <span className="font-mono text-2xl sm:text-3xl font-bold tracking-wider text-white">
                    {ussdCode}
                  </span>
                  <Button
                    size="sm"
                    onClick={handleCopyUSSD}
                    className="bg-white/10 hover:bg-white/20 text-white text-[11px] border border-white/20 h-7 px-2.5 rounded-md"
                  >
                    {copiedCode ? (
                      <>
                        <Check className="h-3 w-3 text-emerald-400 mr-1" />
                        <span className="text-emerald-400 font-bold">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3 mr-1" />
                        <span>Copy</span>
                      </>
                    )}
                  </Button>
                </div>
                <p className="text-[11px] text-slate-300">
                  Zero internet needed. Works on all mobile networks across Nigeria.
                </p>
                <div className="pt-1">
                  <a
                    href={`tel:${encodeURIComponent(ussdCode)}`}
                    className="inline-flex items-center justify-center gap-1.5 w-full py-2 rounded-lg bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-semibold transition-colors"
                  >
                    <PhoneCall className="h-3.5 w-3.5" />
                    <span>Dial from Phone ({ussdCode})</span>
                  </a>
                </div>
              </div>

              {/* USSD Quick Codes List */}
              <div className="grid grid-cols-2 gap-1.5 text-[11px]">
                <div className="p-2 rounded-lg bg-slate-50 border border-slate-200 flex justify-between items-center">
                  <span className="text-slate-600">Balance</span>
                  <span className="font-mono font-bold text-[#0284c7]">*966*808*1#</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-50 border border-slate-200 flex justify-between items-center">
                  <span className="text-slate-600">Transfers</span>
                  <span className="font-mono font-bold text-[#0284c7]">*966*808*2#</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-50 border border-slate-200 flex justify-between items-center">
                  <span className="text-slate-600">Airtime</span>
                  <span className="font-mono font-bold text-[#0284c7]">*966*808*3#</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-50 border border-slate-200 flex justify-between items-center">
                  <span className="text-slate-600">Block Card</span>
                  <span className="font-mono font-bold text-[#0284c7]">*966*808*7#</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Compact Footer */}
        <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2 shrink-0">
          <div className="flex items-center gap-2.5 text-[11px] font-semibold text-[#0284c7]">
            <Link
              to="/mobile-banking"
              onClick={() => onOpenChange(false)}
              className="hover:underline flex items-center gap-0.5"
            >
              <span>App Details</span>
              <ChevronRight className="h-3 w-3" />
            </Link>
            <span className="text-slate-300">•</span>
            <Link
              to="/ussd-banking"
              onClick={() => onOpenChange(false)}
              className="hover:underline flex items-center gap-0.5"
            >
              <span>USSD Guide</span>
              <ChevronRight className="h-3 w-3" />
            </Link>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => onOpenChange(false)}
            className="text-[11px] text-slate-500 hover:text-[#0a1e3f] h-7 px-2.5 rounded-md"
          >
            Dismiss
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
