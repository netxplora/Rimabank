import React, { useState } from "react";
import { CheckCircle2, Smartphone, ArrowRight, ShieldCheck, Download, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useCMS } from "@/context/CMSContext";
import { motion } from "framer-motion";
import { DownloadAppDialog } from "@/components/modals/DownloadAppDialog";

const appFeatures = [
  "Instant Interbank Money Transfers",
  "Real-time Account Balance & Alerts",
  "Airtime, Data & Utility Bill Payments",
  "Target & Fixed Savings Management",
  "Quick Business & Personal Loan Access",
  "Instant PDF e-Statement Generation",
];

export function MobileAppSection() {
  const { siteContent } = useCMS();
  const [showAppDialog, setShowAppDialog] = useState(false);
  const appLinks = (siteContent as any)?.appLinks;

  return (
    <section className="relative py-16 sm:py-24 bg-[#ffffff] border-b border-slate-200/80 overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-[#f0f7ff] via-[#ffffff] to-[#e0f2fe]/60 border border-[#bae6fd]/80 p-8 sm:p-12 lg:p-16 shadow-lg relative overflow-hidden">

          {/* Ambient Lighting Orbs */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#0284c7]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#38bdf8]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center relative z-10">

            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-6 space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#bae6fd] text-[#0284c7] text-xs font-semibold uppercase tracking-wider shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0284c7]" />
                <span>RIMA Mobile Banking</span>
              </div>

              <div className="space-y-3">
                <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0a1e3f] tracking-tight leading-tight">
                  Your bank, directly in your hands.
                </h2>
                <p className="font-sans text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl">
                  Manage personal and commercial transactions on the go with biometric security, instant notifications, and 24/7 account access.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                {appFeatures.map((item) => (
                  <div key={item} className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/80 border border-slate-200/80 shadow-2xs">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span className="font-sans text-xs font-medium text-[#0a1e3f] leading-snug">{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                <Button 
                  variant="pill" 
                  size="lg" 
                  onClick={() => setShowAppDialog(true)}
                  className="bg-[#0284c7] hover:bg-[#0369a1] text-white shadow-md h-12 px-7 text-xs sm:text-sm font-semibold justify-center cursor-pointer"
                >
                  <span className="inline-flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    <span>Get the App</span>
                  </span>
                </Button>
                
                <Button variant="outlineNeutral" size="lg" asChild className="rounded-full bg-white hover:bg-slate-50 border-slate-300 h-12 px-7 text-xs sm:text-sm font-semibold justify-center shadow-2xs">
                  <Link to="/mobile-banking">Explore App Features</Link>
                </Button>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-slate-500">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                <span>256-bit encrypted data • Biometric Touch ID & Face ID support</span>
              </div>
            </motion.div>

            {/* Right: Photo + Layered Mockup */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="lg:col-span-6 flex justify-center"
            >
              <div className="relative w-full max-w-[420px]">
                {/* Background photo */}
                <div className="rounded-3xl overflow-hidden shadow-xl border border-white/90 h-64 sm:h-80 lg:h-96 bg-white">
                  <img
                    src="/images/mobile-banking.jpg"
                    alt="Person using RIMA mobile banking app on a smartphone"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a1e3f]/50 via-transparent to-transparent" />
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>

      {/* Download App Dialog Popup */}
      <DownloadAppDialog open={showAppDialog} onOpenChange={setShowAppDialog} />
    </section>
  );
}

