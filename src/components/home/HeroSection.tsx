import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, Users, Landmark, ChevronRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative min-h-[640px] lg:min-h-[720px] flex items-center bg-[#f0f7ff] text-[#0a1e3f] overflow-hidden border-b border-[#e2e8f0]">
      {/* Hero Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero-home.png"
          alt="Rima Microfinance Bank"
          className="w-full h-full object-cover object-center"
        />
        {/* Soft overlay gradient to ensure high readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/50 to-transparent lg:from-white/70 lg:via-transparent lg:to-transparent" />
      </div>

      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-4 sm:px-6 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">

          {/* Left Hero Content (7 cols) */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">

            {/* Regulatory Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/90 border border-[#0284c7]/30 backdrop-blur-md text-[#0284c7] text-xs font-semibold tracking-wide shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0284c7] animate-pulse shrink-0"></span>
              <span>CBN Licensed Microfinance Bank &bull; NDIC Insured</span>
            </div>

            {/* Headline */}
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.08] text-balance text-[#0a1e3f]">
              Dependable banking for <span className="text-[#0284c7]">you</span> and <span className="text-[#0284c7]">your business</span>.
            </h1>

            {/* Subtitle */}
            <p className="text-[#334155] text-base sm:text-lg lg:text-xl font-normal leading-relaxed max-w-xl">
              Secure savings accounts, commercial working capital, and accessible agency banking across Rivers State and beyond.
            </p>

            {/* Interactive CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Button
                variant="pill"
                size="xl"
                asChild
                className="bg-[#0284c7] hover:bg-[#0369a1] text-white shadow-[0_10px_24px_rgba(2,132,199,0.3)] hover:shadow-[0_14px_30px_rgba(2,132,199,0.45)] transform hover:-translate-y-1 transition-all duration-200"
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
                className="rounded-full bg-white/80 hover:bg-white text-[#0a1e3f] border-[#cbd5e1] hover:border-[#0a1e3f] backdrop-blur-md shadow-sm transform hover:-translate-y-1 transition-all duration-200"
              >
                <Link to="/personal-banking">
                  Explore Products
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </div>

            {/* Micro Trust Grid */}
            <div className="pt-6 border-t border-[#cbd5e1]/60 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-semibold text-[#0a1e3f]">
              <div className="flex items-center gap-2.5 bg-white/85 border border-[#e2e8f0] rounded-xl p-2.5 backdrop-blur-sm shadow-xs">
                <ShieldCheck className="h-4 w-4 text-[#16a34a] shrink-0" />
                <span>Zero Opening Fee</span>
              </div>
              <div className="flex items-center gap-2.5 bg-white/85 border border-[#e2e8f0] rounded-xl p-2.5 backdrop-blur-sm shadow-xs">
                <Landmark className="h-4 w-4 text-[#0284c7] shrink-0" />
                <span>NDIC Insured</span>
              </div>
              <div className="flex items-center gap-2.5 bg-white/85 border border-[#e2e8f0] rounded-xl p-2.5 backdrop-blur-sm shadow-xs">
                <Users className="h-4 w-4 text-[#0284c7] shrink-0" />
                <span>50,000+ Accounts</span>
              </div>
            </div>
          </div>

          {/* Right Floating Showcase Panel (5 cols) */}
          <div className="lg:col-span-5 relative perspective-1000">
            {/* Floating Account Card */}
            <div className="bg-white/90 border border-white rounded-2xl p-6 sm:p-8 transform-3d-card shadow-2xl backdrop-blur-lg space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#e2e8f0]">
                <div>
                  <span className="text-[11px] font-semibold text-[#0284c7] uppercase tracking-widest">
                    Featured Product
                  </span>
                  <div className="text-xl sm:text-2xl font-heading font-medium text-[#0a1e3f] mt-0.5">
                    Target Yield Savings
                  </div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-[#0284c7] text-white flex items-center justify-center font-bold text-sm shadow-md">
                  12.5%
                </div>
              </div>

              {/* Grid Mini-Cards */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#f0f7ff] rounded-xl p-3.5 border border-[#e0f2fe] hover:bg-[#e0f2fe]/60 transition-all">
                  <div className="text-[10px] text-[#64748b] uppercase tracking-wider font-medium">Interest Paid</div>
                  <div className="text-sm font-semibold text-[#16a34a] mt-0.5">Monthly Directly</div>
                </div>
                <div className="bg-[#f0f7ff] rounded-xl p-3.5 border border-[#e0f2fe] hover:bg-[#e0f2fe]/60 transition-all">
                  <div className="text-[10px] text-[#64748b] uppercase tracking-wider font-medium">Withdrawals</div>
                  <div className="text-sm font-semibold text-[#0a1e3f] mt-0.5">Flexible Terms</div>
                </div>
              </div>

              {/* Verified Badge Row */}
              <div className="pt-2 flex items-center justify-between text-xs text-[#64748b]">
                <span className="flex items-center gap-1.5 text-[#0a1e3f] font-medium">
                  <ShieldCheck className="h-4 w-4 text-[#16a34a]" />
                  Statutory Protection
                </span>
                <Link
                  to="/personal-banking/savings"
                  className="text-[#0284c7] font-semibold hover:underline flex items-center gap-1"
                >
                  View Details <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>

            {/* Secondary Floating Pill Top Right */}
            <div className="absolute -top-4 -right-2 sm:-right-4 bg-white/95 text-[#0a1e3f] border border-[#e2e8f0] px-4 py-2.5 rounded-2xl shadow-lg hidden sm:flex items-center gap-3 animate-float-slow">
              <div className="w-7 h-7 rounded-full bg-[#16a34a]/15 text-[#16a34a] flex items-center justify-center font-bold text-xs shrink-0">
                ✓
              </div>
              <div className="text-xs">
                <span className="font-semibold block leading-tight">Fast Onboarding</span>
                <span className="text-[#64748b] text-[10px]">Zero Paperwork Option</span>
              </div>
            </div>

            {/* Secondary Floating Pill Bottom Left */}
            <div className="absolute -bottom-5 -left-2 sm:-left-4 bg-[#0a1e3f] text-white border border-blue-900 px-4 py-2.5 rounded-2xl shadow-lg hidden sm:flex items-center gap-3 backdrop-blur-md animate-float-reverse">
              <div className="w-7 h-7 rounded-full bg-[#0284c7]/30 text-[#38bdf8] flex items-center justify-center font-bold text-xs shrink-0">
                <Sparkles className="h-3.5 w-3.5" />
              </div>
              <div className="text-xs text-white">
                <span className="font-semibold block leading-tight">Instant Settlement</span>
                <span className="text-blue-200/80 text-[10px]">NIBSS Direct Integration</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
