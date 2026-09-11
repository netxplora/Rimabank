import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, Sparkles, Building2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FinalCTASection() {
  return (
    <section className="relative py-16 sm:py-24 bg-[#f8fbff] overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-[#0a1e3f] px-6 py-14 sm:px-12 sm:py-20 text-center flex flex-col items-center overflow-hidden shadow-2xl border border-white/10">
          
          {/* Subtle Radial Glow Orbs */}
          <div className="absolute -top-32 -left-32 w-80 h-80 bg-[#0284c7]/25 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-[#38bdf8]/20 rounded-full blur-3xl pointer-events-none" />

          {/* Eyebrow */}
          <div className="relative z-10 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-[#38bdf8] text-xs font-semibold uppercase tracking-wider mb-5 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]" />
            <span>Open An Account Today</span>
          </div>

          {/* Heading */}
          <h2 className="relative z-10 font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4 max-w-2xl leading-tight">
            Ready to experience practical banking that works for you?
          </h2>

          {/* Subtitle */}
          <p className="relative z-10 font-sans text-slate-300 text-sm sm:text-base max-w-lg mb-8 leading-relaxed">
            Open an individual or business account in minutes. Enjoy instant transfers, high-yield savings, and accessible commercial credit.
          </p>

          {/* CTAs */}
          <div className="relative z-10 flex flex-col sm:flex-row gap-3.5 w-full justify-center max-w-md">
            <Button
              variant="pill"
              size="lg"
              asChild
              className="bg-[#0284c7] hover:bg-[#0369a1] text-white border-none shadow-lg h-12 px-8 text-xs sm:text-sm font-semibold justify-center"
            >
              <Link to="/contact" className="inline-flex items-center gap-2">
                <span>Create Your Account</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              asChild
              className="text-white border-white/30 hover:bg-white/10 hover:text-white bg-white/5 h-12 px-8 text-xs sm:text-sm font-semibold rounded-full justify-center shadow-2xs backdrop-blur-sm"
            >
              <Link to="/about">Learn About RIMA</Link>
            </Button>
          </div>

          {/* Regulatory Assurance Footer */}
          <div className="relative z-10 flex items-center justify-center gap-2 text-slate-400 text-xs mt-10 pt-6 border-t border-white/10 w-full max-w-lg">
            <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
            <span>Licensed by the Central Bank of Nigeria • Deposits insured by NDIC</span>
          </div>

        </div>
      </div>
    </section>
  );
}

