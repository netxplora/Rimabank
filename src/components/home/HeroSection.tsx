import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, Landmark, Users, ChevronRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative min-h-[580px] lg:min-h-[660px] flex items-center bg-[#f8fafc] text-[#0a1e3f] overflow-hidden border-b border-[#e2e8f0]">
      {/* Background Editorial Canvas with Soft Atmospheric Gradient */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero-home.png"
          alt="RIMA Microfinance Bank - The bank for all business"
          className="w-full h-full object-cover object-center"
        />
        {/* Editorial Overlay Gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-white/30 lg:from-white lg:via-white/90 lg:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent lg:hidden" />
      </div>

      <div className="relative z-10 w-full max-w-[1240px] mx-auto px-4 sm:px-6 py-14 sm:py-20 lg:py-24">
        <div className="max-w-3xl space-y-6 sm:space-y-8 animate-fade-in-up">

          {/* Institutional Trust Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f0f7ff] border border-[#cbd5e1] text-[#0a1e3f] text-xs font-semibold uppercase tracking-wider shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#0284c7] animate-pulse" />
            <span>Commercial & SME Banking Partner</span>
          </div>

          {/* Primary Hero Headline */}
          <div className="space-y-3">
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.06] text-[#0a1e3f] text-balance">
              The bank for all <span className="text-[#0284c7]">business</span>.
            </h1>

            {/* Editorial Sub-copy */}
            <p className="text-slate-700 text-base sm:text-lg lg:text-xl font-normal leading-relaxed max-w-2xl">
              From emerging retail shops to established commercial distributors, RIMA Microfinance Bank provides structured working capital, seamless collections, and dedicated relationship managers to scale your operations.
            </p>
          </div>

          {/* Interactive CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-1">
            <Button
              variant="pill"
              size="xl"
              asChild
              className="bg-[#0284c7] hover:bg-[#0369a1] text-white text-sm font-semibold shadow-brand h-12 sm:h-13 px-7 justify-center transition-all duration-150"
            >
              <Link to="/contact">
                <span>Create Account</span>
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>

            <Button
              variant="outlineNeutral"
              size="xl"
              asChild
              className="rounded-full bg-white/90 hover:bg-white text-[#0a1e3f] border-[#cbd5e1] hover:border-[#0a1e3f] text-sm font-semibold h-12 sm:h-13 px-6 justify-center shadow-xs transition-all duration-150"
            >
              <Link to="/business-banking">
                <span>Explore Business Solutions</span>
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
          </div>

          {/* Institutional Highlights Grid */}
          <div className="pt-6 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-xs font-semibold text-[#0a1e3f]">
            <div className="flex items-center gap-2.5 bg-white/90 border border-slate-200 rounded-xl p-3 shadow-xs">
              <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
              <div className="flex flex-col">
                <span className="leading-tight">CBN Licensed</span>
                <span className="text-[10px] text-slate-500 font-normal">Regulatory Assurance</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 bg-white/90 border border-slate-200 rounded-xl p-3 shadow-xs">
              <Landmark className="h-4 w-4 text-[#0284c7] shrink-0" />
              <div className="flex flex-col">
                <span className="leading-tight">NDIC Insured</span>
                <span className="text-[10px] text-slate-500 font-normal">100% Eligible Protection</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 bg-white/90 border border-slate-200 rounded-xl p-3 shadow-xs">
              <Users className="h-4 w-4 text-[#0284c7] shrink-0" />
              <div className="flex flex-col">
                <span className="leading-tight">50,000+ Customers</span>
                <span className="text-[10px] text-slate-500 font-normal">Rivers State & Nationwide</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

