import { Download, Star, ShieldCheck, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function MobileAppCTA() {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="rounded-3xl bg-gradient-to-br from-[#fdedea] via-white to-[#fdedea] border border-[#e7dcdb] p-6 sm:p-10 lg:p-14 shadow-3d-lift relative overflow-hidden">
          
          {/* Ambient light wash */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#f73b20]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center relative z-10">
            
            {/* Left Content (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#f73b20] block">
                Digital Mobile Banking
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#360802] tracking-tight leading-[1.08]">
                Manage your accounts from any mobile device.
              </h2>
              <p className="text-[#360802]/80 text-base leading-relaxed max-w-xl">
                Transfer funds instantly, generate account statements, pay utility bills, and monitor account balances with the official Rima MFB Mobile Banking application.
              </p>

              {/* 2-Column Responsive App Features Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-1">
                {[
                  "Instant inter-bank transfers via NIBSS",
                  "Biometric fingerprint & Face ID login",
                  "Airtime, data, and utility bill payments",
                  "Download PDF bank statements directly",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs font-medium text-[#360802]">
                    <CheckCircle2 className="h-4 w-4 text-[#34c771] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Rating Pill */}
              <div className="inline-flex items-center gap-3 bg-white px-3.5 py-2 rounded-xl border border-[#e7dcdb] shadow-xs text-xs font-semibold text-[#360802]">
                <div className="flex text-[#f73b20] gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-current" />
                  ))}
                </div>
                <span>4.8 / 5.0 Average Customer Rating</span>
              </div>

              {/* Download Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Button
                  variant="pill"
                  size="lg"
                  asChild
                  className="bg-[#f73b20] hover:bg-[#f84d35] text-white shadow-3d-orange transform hover:-translate-y-0.5 transition-all"
                >
                  <a href="#download-ios">
                    <Download className="h-4 w-4 mr-2" />
                    Download for iOS
                  </a>
                </Button>
                <Button
                  variant="outlineNeutral"
                  size="lg"
                  asChild
                  className="rounded-full bg-white hover:bg-[#fdedea]"
                >
                  <a href="#download-android">
                    <Download className="h-4 w-4 mr-2" />
                    Download for Android
                  </a>
                </Button>
              </div>

              <p className="text-[11px] text-[#ababab]">
                * Compatible with iOS 13+ and Android 8+. Protected by biometric encryption.
              </p>
            </div>

            {/* Right 3D Mobile Showcase (5 cols) */}
            <div className="lg:col-span-5 flex justify-center perspective-1000">
              <div className="relative group">
                <div className="relative w-full max-w-[280px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white transform-3d-card">
                  <img
                    src="/images/Mobile-App.png"
                    alt="Rima MFB Mobile Banking App"
                    className="w-full h-auto object-cover"
                  />
                </div>

                {/* Floating 3D Badge */}
                <div className="absolute -bottom-4 -left-4 bg-white/95 border border-[#e7dcdb] px-3.5 py-2 rounded-xl shadow-3d-lift flex items-center gap-2 animate-float-slow hidden sm:flex">
                  <ShieldCheck className="h-4 w-4 text-[#34c771]" />
                  <span className="text-[11px] font-bold text-[#360802]">256-Bit TLS Secured</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
