import { Download, Smartphone, Star, ShieldCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function MobileAppCTA() {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="rounded-2xl bg-[#fdedea] border border-[#e7dcdb] p-6 md:p-10 lg:p-14 shadow-lift relative overflow-hidden">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
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

            {/* Right — Real app image */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-[280px] rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.15)]">
                <img
                  src="/images/Mobile-App.png"
                  alt="Rima MFB Mobile Banking App"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
