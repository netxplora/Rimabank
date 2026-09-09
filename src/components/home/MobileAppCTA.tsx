import { Download, Star, ShieldCheck, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function MobileAppCTA() {
  return (
    <section className="py-12 sm:py-20 bg-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#f0f7ff] via-white to-[#f0f7ff] border border-[#bae6fd]/70 p-5 sm:p-10 lg:p-14 shadow-sm relative overflow-hidden">
          
          {/* Ambient light wash */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#0284c7]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            
            {/* Left Content (6 cols) */}
            <div className="lg:col-span-6 space-y-4 sm:space-y-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#0284c7] block">
                Digital Mobile Banking
              </span>
              <h2 className="font-heading text-2xl sm:text-4xl lg:text-5xl font-bold text-[#0a1e3f] tracking-tight leading-tight">
                Manage your accounts from any mobile device.
              </h2>
              <p className="text-slate-600 text-xs sm:text-base leading-relaxed max-w-xl">
                Transfer funds instantly, generate account statements, pay utility bills, and monitor account balances with the official Rima MFB Mobile Banking application.
              </p>

              {/* 2-Column Responsive App Features Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 py-1">
                {[
                  "Instant inter-bank transfers via NIBSS",
                  "Biometric fingerprint & Face ID login",
                  "Airtime, data, and utility bill payments",
                  "Download PDF bank statements directly",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs font-medium text-[#0a1e3f]">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Rating Pill */}
              <div className="inline-flex items-center gap-2.5 bg-white px-3 py-1.5 rounded-xl border border-sky-100 shadow-2xs text-xs font-semibold text-[#0a1e3f]">
                <div className="flex text-[#0284c7] gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-current" />
                  ))}
                </div>
                <span>4.8 / 5.0 Rating</span>
              </div>

              {/* Download Buttons - Responsive Stack on Mobile */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
                <Button
                  variant="pill"
                  size="lg"
                  asChild
                  className="bg-[#0284c7] hover:bg-[#0369a1] text-white shadow-brand h-11 px-6 text-xs font-semibold justify-center w-full sm:w-auto text-center"
                >
                  <a href="#download-ios" className="inline-flex items-center justify-center gap-2">
                    <Download className="h-4 w-4" />
                    <span>Download for iOS</span>
                  </a>
                </Button>
                <Button
                  variant="outlineNeutral"
                  size="lg"
                  asChild
                  className="rounded-full bg-white hover:bg-[#f0f7ff] border-slate-200 h-11 px-6 text-xs font-semibold justify-center w-full sm:w-auto text-center"
                >
                  <a href="#download-android" className="inline-flex items-center justify-center gap-2">
                    <Download className="h-4 w-4" />
                    <span>Download for Android</span>
                  </a>
                </Button>
              </div>

              <p className="text-[10px] sm:text-[11px] text-slate-500">
                * Compatible with iOS 13+ and Android 8+. Protected by biometric authentication.
              </p>
            </div>

            {/* Right Mobile Showcase (6 cols) */}
            <div className="lg:col-span-6 flex justify-center items-center py-2">
              <div className="relative group w-full max-w-[320px] sm:max-w-[400px] lg:max-w-[440px] flex justify-center">
                {/* Backdrop Soft Brand Glow */}
                <div className="absolute inset-0 bg-[#0284c7]/15 rounded-3xl blur-2xl transform scale-95" />
                
                {/* Main App Showcase Card */}
                <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg border border-white/90 bg-white">
                  <img
                    src="/images/Mobile-App.png"
                    alt="RIMA MFB Mobile Banking App"
                    className="w-full h-auto object-contain block"
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
