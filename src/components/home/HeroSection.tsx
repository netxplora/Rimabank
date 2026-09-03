import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, Users, Landmark } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative bg-white overflow-hidden border-b border-[#e7dcdb]/60">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-0 items-stretch min-h-[580px]">

          {/* Left — Text Content */}
          <div className="flex flex-col justify-center py-14 lg:py-20 lg:pr-12 space-y-7">

            {/* Regulatory Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#fdedea] border border-[#e7dcdb] text-[#360802] text-xs font-semibold w-fit">
              <span className="w-2 h-2 rounded-full bg-[#f73b20] animate-pulse shrink-0"></span>
              CBN Licensed Microfinance Bank &bull; NDIC Insured
            </div>

            {/* Headline */}
            <h1 className="font-heading text-[#360802] text-4xl sm:text-5xl lg:text-[3.4rem] font-semibold tracking-tight leading-[1.08] text-balance">
              Financial services for{" "}
              <span className="text-[#f73b20]">individuals</span> and{" "}
              <span className="text-[#f73b20]">growing businesses</span>.
            </h1>

            {/* Subheading */}
            <p className="text-[#360802]/75 text-base md:text-lg leading-relaxed max-w-lg">
              Rima Microfinance Bank provides secure savings accounts, commercial
              working capital, and accessible agency banking across Rivers State.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Button variant="pill" size="lg" asChild className="shadow-brand">
                <Link to="/contact">
                  Open an Account
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
              <Button variant="outlineNeutral" size="lg" asChild className="rounded-full">
                <Link to="/personal-banking">Explore Products</Link>
              </Button>
            </div>

            {/* Trust row */}
            <div className="pt-4 border-t border-[#e7dcdb] flex flex-wrap items-center gap-6 text-xs font-medium text-[#360802]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-[#34c771] shrink-0" />
                <span>Zero Account Opening Fees</span>
              </div>
              <div className="flex items-center gap-2">
                <Landmark className="h-4 w-4 text-[#477ee9] shrink-0" />
                <span>NDIC Insured Deposits</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-[#f73b20] shrink-0" />
                <span>50,000+ Active Accounts</span>
              </div>
            </div>
          </div>

          {/* Right — Hero Image */}
          <div className="relative hidden lg:block">
            <img
              src="/images/hero-home.png"
              alt="Rima Microfinance Bank customers"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            {/* Subtle left fade so image blends into white content */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent pointer-events-none" />

            {/* Floating badge */}
            <div className="absolute bottom-8 left-6 bg-white/95 backdrop-blur-sm border border-[#e7dcdb] px-4 py-3 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.10)] flex items-center gap-3 max-w-[220px]">
              <div className="w-8 h-8 rounded-full bg-[#34c771]/15 text-[#34c771] flex items-center justify-center font-bold text-sm shrink-0">
                ✓
              </div>
              <div>
                <span className="font-semibold text-[#360802] text-xs block">Verified Institution</span>
                <span className="text-[#ababab] text-[11px]">Central Bank of Nigeria</span>
              </div>
            </div>
          </div>

          {/* Mobile — show image as a banner below text */}
          <div className="lg:hidden w-full h-56 sm:h-72 relative overflow-hidden rounded-2xl mx-0 mb-8">
            <img
              src="/images/hero-home.png"
              alt="Rima Microfinance Bank"
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}
