import { Download, Smartphone, Star, ShieldCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function MobileAppCTA() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="rounded-cards bg-[#fdedea] border border-[#e7dcdb] p-8 lg:p-16 shadow-lift relative overflow-hidden">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Left Content (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-semibold uppercase tracking-ui text-[#f73b20] block">
                Digital Mobile Banking
              </span>
              <h2 className="font-heading text-3xl md:text-5xl font-medium text-[#360802] tracking-tight leading-[1.05]">
                Manage your accounts from any mobile device.
              </h2>
              <p className="text-[#360802]/80 text-base leading-relaxed max-w-xl">
                Transfer funds instantly, generate account statements, pay utility bills, and monitor account balances with the Rima MFB Mobile Banking application.
              </p>

              <div className="flex items-center gap-4 text-xs font-medium text-[#360802] py-1">
                <div className="flex text-[#f73b20]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <span>4.8 / 5.0 Rating from customer reviews</span>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Button variant="pill" size="lg" asChild className="shadow-brand">
                  <a href="#download-ios">
                    <Download className="h-4 w-4 mr-1" />
                    Download for iOS
                  </a>
                </Button>
                <Button variant="outlineNeutral" size="lg" asChild className="rounded-buttons bg-white">
                  <a href="#download-android">
                    <Download className="h-4 w-4 mr-1" />
                    Download for Android
                  </a>
                </Button>
              </div>

              <p className="text-[11px] text-[#ababab]">
                * Compatible with iOS 13+ and Android 8+. Protected by biometric authentication.
              </p>
            </div>

            {/* Right Graphic (5 cols) */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-xs rounded-[2rem] bg-[#360802] p-4 text-white shadow-soft border-4 border-white">
                <div className="bg-black/40 rounded-[1.5rem] p-5 space-y-4">
                  {/* Top phone header */}
                  <div className="flex justify-between items-center text-[10px] text-white/60">
                    <span>9:41 AM</span>
                    <div className="flex items-center gap-1">
                      <span>5G</span>
                      <div className="w-4 h-2 border border-white/60 rounded-xs"></div>
                    </div>
                  </div>

                  {/* App interface mock */}
                  <div className="pt-2">
                    <div className="text-[10px] uppercase text-white/50">Welcome back</div>
                    <div className="font-heading text-sm font-semibold">Rivers MFB Mobile</div>
                  </div>

                  <div className="bg-white/10 rounded-xl p-4 border border-white/10">
                    <div className="text-[10px] text-white/60">Available Balance</div>
                    <div className="font-heading text-xl font-bold text-white mt-0.5">₦ 840,250.00</div>
                    <div className="text-[9px] text-[#34c771] mt-1">● Active Account (Tier 3)</div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <div className="bg-white/5 rounded-lg p-2.5 text-center text-[10px]">
                      <div className="text-[#f73b20] font-bold">Transfer</div>
                      <div className="text-white/40">Instant</div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-2.5 text-center text-[10px]">
                      <div className="text-[#34c771] font-bold">Airtime</div>
                      <div className="text-white/40">Top up</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
