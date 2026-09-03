import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, Users, Landmark, ChevronRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative min-h-[640px] lg:min-h-[720px] flex items-center bg-[#360802] text-white overflow-hidden border-b border-black/20">
      {/* Hero Background Image with Editorial Gradient */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero-home.png"
          alt="Rima Microfinance Bank"
          className="w-full h-full object-cover object-center scale-105 transform motion-safe:animate-pulse-subtle"
        />
        {/* Layered High-Contrast Gradient for perfect legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#360802]/95 via-[#360802]/85 to-[#360802]/65" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#360802] via-transparent to-[#360802]/50" />
      </div>

      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-4 sm:px-6 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">

          {/* Left Hero Content (7 cols) */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">

            {/* Regulatory Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-white text-xs font-semibold tracking-wide shadow-md">
              <span className="w-2.5 h-2.5 rounded-full bg-[#f73b20] animate-pulse shrink-0"></span>
              <span>CBN Licensed Microfinance Bank &bull; NDIC Insured</span>
            </div>

            {/* Headline */}
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.05] text-balance">
              Reliable financial services for{" "}
              <span className="text-[#f73b20] drop-shadow-sm">individuals</span> and{" "}
              <span className="text-[#f73b20] drop-shadow-sm">growing businesses</span>.
            </h1>

            {/* Subtitle */}
            <p className="text-white/85 text-base sm:text-lg lg:text-xl font-normal leading-relaxed max-w-xl">
              Secure savings accounts, commercial working capital, and accessible agency banking across Rivers State and beyond.
            </p>

            {/* Interactive 3D CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Button
                variant="pill"
                size="xl"
                asChild
                className="bg-[#f73b20] hover:bg-[#f84d35] text-white shadow-3d-orange hover:shadow-[0_16px_36px_rgba(247,59,32,0.45)] transform hover:-translate-y-1 transition-all duration-200"
              >
                <Link to="/contact">
                  Open an Account
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>

              <Button
                variant="outlineNeutral"
                size="xl"
                asChild
                className="rounded-full bg-white/10 hover:bg-white/20 text-white border-white/30 backdrop-blur-md transform hover:-translate-y-1 transition-all duration-200"
              >
                <Link to="/personal-banking">
                  Explore Products
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </div>

            {/* Micro Trust Grid */}
            <div className="pt-6 border-t border-white/15 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-medium text-white/90">
              <div className="flex items-center gap-2.5 bg-white/5 border border-white/10 rounded-xl p-2.5 backdrop-blur-sm">
                <ShieldCheck className="h-4 w-4 text-[#34c771] shrink-0" />
                <span>Zero Opening Fee</span>
              </div>
              <div className="flex items-center gap-2.5 bg-white/5 border border-white/10 rounded-xl p-2.5 backdrop-blur-sm">
                <Landmark className="h-4 w-4 text-[#477ee9] shrink-0" />
                <span>NDIC Insured</span>
              </div>
              <div className="flex items-center gap-2.5 bg-white/5 border border-white/10 rounded-xl p-2.5 backdrop-blur-sm">
                <Users className="h-4 w-4 text-[#f73b20] shrink-0" />
                <span>50,000+ Accounts</span>
              </div>
            </div>
          </div>

          {/* Right Floating 3D Showcase Panel (5 cols) */}
          <div className="lg:col-span-5 relative perspective-1000">
            {/* 3D Floating Account Card */}
            <div className="glass-3d-dark rounded-2xl p-6 sm:p-8 transform-3d-card shadow-glass-3d space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/15">
                <div>
                  <span className="text-[11px] font-semibold text-white/60 uppercase tracking-widest">
                    Featured Product
                  </span>
                  <div className="text-xl sm:text-2xl font-heading font-medium text-white mt-0.5">
                    Target Yield Savings
                  </div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-[#f73b20] text-white flex items-center justify-center font-bold text-sm shadow-3d-orange">
                  12.5%
                </div>
              </div>

              {/* 3D Grid Mini-Cards */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/10 rounded-xl p-3.5 border border-white/15 hover:bg-white/15 transition-all">
                  <div className="text-[10px] text-white/60 uppercase tracking-wider">Interest Paid</div>
                  <div className="text-sm font-semibold text-[#34c771] mt-0.5">Monthly Directly</div>
                </div>
                <div className="bg-white/10 rounded-xl p-3.5 border border-white/15 hover:bg-white/15 transition-all">
                  <div className="text-[10px] text-white/60 uppercase tracking-wider">Withdrawals</div>
                  <div className="text-sm font-semibold text-white mt-0.5">Flexible Terms</div>
                </div>
              </div>

              {/* Verified Badge Row */}
              <div className="pt-2 flex items-center justify-between text-xs text-white/80">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-[#34c771]" />
                  Statutory Protection
                </span>
                <Link
                  to="/personal-banking/savings"
                  className="text-[#f73b20] font-semibold hover:underline flex items-center gap-1"
                >
                  View Details <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>

            {/* Secondary Floating 3D Pill Top Right */}
            <div className="absolute -top-4 -right-2 sm:-right-4 bg-white/95 text-[#360802] border border-[#e7dcdb] px-4 py-2.5 rounded-2xl shadow-3d-lift hidden sm:flex items-center gap-3 animate-float-slow">
              <div className="w-7 h-7 rounded-full bg-[#34c771]/15 text-[#34c771] flex items-center justify-center font-bold text-xs shrink-0">
                ✓
              </div>
              <div className="text-xs">
                <span className="font-semibold block leading-tight">Fast Onboarding</span>
                <span className="text-[#ababab] text-[10px]">Zero Paperwork Option</span>
              </div>
            </div>

            {/* Secondary Floating 3D Pill Bottom Left */}
            <div className="absolute -bottom-5 -left-2 sm:-left-4 bg-[#360802]/90 border border-white/20 px-4 py-2.5 rounded-2xl shadow-3d-lift hidden sm:flex items-center gap-3 backdrop-blur-md animate-float-reverse">
              <div className="w-7 h-7 rounded-full bg-[#f73b20]/20 text-[#f73b20] flex items-center justify-center font-bold text-xs shrink-0">
                <Sparkles className="h-3.5 w-3.5" />
              </div>
              <div className="text-xs text-white">
                <span className="font-semibold block leading-tight">Instant Settlement</span>
                <span className="text-white/60 text-[10px]">NIBSS Direct Integration</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
