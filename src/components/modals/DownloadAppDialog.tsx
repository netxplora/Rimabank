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
import { RimaQrCode } from "@/components/ui/RimaQrCode";

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
      {/*
       * NO max-h, NO overflow-y-auto → dialog never scrolls.
       * Width: 92vw capped at 420px so it fits any phone.
       */}
      <DialogContent className="w-[92vw] max-w-[420px] p-0 overflow-hidden bg-white border border-slate-200/90 rounded-2xl shadow-2xl focus:outline-none">

        {/* ── Dark header ribbon ── */}
        <div className="bg-gradient-to-r from-[#0a1e3f] via-[#0d2852] to-[#0284c7] px-4 py-3.5 text-white">
          {/* Top trust row */}
          <div className="flex items-center justify-between gap-2 mb-2">
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/10 border border-white/20 text-sky-200 text-[10px] font-semibold tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
              CBN Licensed MFB
            </div>
            <div className="flex items-center gap-1 text-[10px] text-sky-200 font-medium">
              <ShieldCheck className="h-3 w-3 text-emerald-400" />
              NDIC Insured
            </div>
          </div>

          {/* Title */}
          <DialogTitle className="font-heading text-base font-bold tracking-tight text-white leading-tight">
            RIMA Mobile Banking
          </DialogTitle>
          <DialogDescription className="text-sky-100 text-[11px] mt-0.5 leading-snug">
            Transfer funds, pay bills, and manage your account 24/7.
          </DialogDescription>

          {/* Tab switcher */}
          <div className="flex items-center gap-1 mt-3 p-0.5 bg-white/10 rounded-lg border border-white/15">
            <button
              type="button"
              onClick={() => setActiveTab("app")}
              className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-md text-[11px] font-semibold transition-all ${
                activeTab === "app"
                  ? "bg-white text-[#0a1e3f] shadow-sm"
                  : "text-white/80 hover:text-white hover:bg-white/5"
              }`}
            >
              <Smartphone className="h-3.5 w-3.5" />
              Mobile App
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("ussd")}
              className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-md text-[11px] font-semibold transition-all ${
                activeTab === "ussd"
                  ? "bg-white text-[#0a1e3f] shadow-sm"
                  : "text-white/80 hover:text-white hover:bg-white/5"
              }`}
            >
              <PhoneCall className="h-3.5 w-3.5" />
              Offline USSD
            </button>
          </div>
        </div>

        {/* ── Content body — no scroll ── */}
        <div className="p-4 space-y-3.5">

          {activeTab === "app" ? (
            <>
              {/* ── Store badges — HORIZONTAL row ── */}
              <div className="flex flex-row items-center justify-center gap-3">
                <a
                  href={googlePlayUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center hover:opacity-80 transition-opacity"
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                    alt="Get it on Google Play"
                    className="h-10 w-auto max-w-full"
                  />
                </a>
                <a
                  href={appleStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center hover:opacity-80 transition-opacity"
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
                    alt="Download on the App Store"
                    className="h-10 w-auto max-w-full"
                  />
                </a>
              </div>

              {/* Direct APK link (only when configured) */}
              {apkDownloadUrl && (
                <a
                  href={apkDownloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-3 py-2 rounded-xl border border-emerald-200 bg-emerald-50/50 hover:bg-emerald-50 text-xs font-semibold text-emerald-800 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Download className="h-3.5 w-3.5 text-emerald-600" />
                    Download Direct Android APK
                  </span>
                  <ChevronRight className="h-3.5 w-3.5 text-emerald-500" />
                </a>
              )}

              {/* QR code mini banner */}
              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <div className="shrink-0 scale-[0.6] -m-5 origin-center">
                  <RimaQrCode size={110} />
                </div>
                <div className="space-y-0.5 text-left min-w-0">
                  <div className="flex items-center gap-1 text-[11px] font-bold text-[#0284c7]">
                    <QrCode className="h-3 w-3 shrink-0" />
                    <span>Point camera to scan</span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-snug">
                    Opens the verified app download page on your phone.
                  </p>
                </div>
              </div>

              {/* Feature chips */}
              <div className="grid grid-cols-2 gap-1.5 text-[11px] text-slate-600">
                {[
                  "Instant 24/7 transfers",
                  "Biometric login",
                  "Utility bill payments",
                  "e-Statements download",
                ].map((f) => (
                  <div key={f} className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3 w-3 text-emerald-600 shrink-0" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              {/* USSD hero box */}
              <div className="p-4 rounded-xl bg-[#0a1e3f] text-white text-center space-y-2">
                <p className="text-[10px] font-semibold text-sky-200 uppercase tracking-wider">
                  Official RIMA USSD Banking Code
                </p>
                <div className="flex items-center justify-center gap-2">
                  <span className="font-mono text-2xl font-bold tracking-wider text-white">
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
                        Copy
                      </>
                    )}
                  </Button>
                </div>
                <p className="text-[11px] text-slate-300">
                  Zero internet needed. Works on all mobile networks.
                </p>
                <a
                  href={`tel:${encodeURIComponent(ussdCode)}`}
                  className="inline-flex items-center justify-center gap-1.5 w-full py-2 rounded-lg bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-semibold transition-colors"
                >
                  <PhoneCall className="h-3.5 w-3.5" />
                  Dial from Phone ({ussdCode})
                </a>
              </div>

              {/* Quick code grid */}
              <div className="grid grid-cols-2 gap-1.5 text-[11px]">
                {[
                  { label: "Balance", code: "*966*808*1#" },
                  { label: "Transfers", code: "*966*808*2#" },
                  { label: "Airtime", code: "*966*808*3#" },
                  { label: "Block Card", code: "*966*808*7#" },
                ].map(({ label, code }) => (
                  <div
                    key={label}
                    className="p-2 rounded-lg bg-slate-50 border border-slate-200 flex justify-between items-center"
                  >
                    <span className="text-slate-600">{label}</span>
                    <span className="font-mono font-bold text-[#0284c7]">{code}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* ── Compact footer ── */}
        <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 text-[11px] font-semibold text-[#0284c7]">
            <Link
              to="/mobile-banking"
              onClick={() => onOpenChange(false)}
              className="hover:underline flex items-center gap-0.5"
            >
              App Details <ChevronRight className="h-3 w-3" />
            </Link>
            <span className="text-slate-300">•</span>
            <Link
              to="/ussd-banking"
              onClick={() => onOpenChange(false)}
              className="hover:underline flex items-center gap-0.5"
            >
              USSD Guide <ChevronRight className="h-3 w-3" />
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
