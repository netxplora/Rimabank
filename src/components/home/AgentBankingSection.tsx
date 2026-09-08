import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const agencyServices = [
  "Cash deposits and fast withdrawals",
  "Inter-bank electronic transfers across Nigeria",
  "Utility payments (PHED Electricity, Water)",
  "Airtime and internet data top-ups",
  "New customer basic account onboarding",
  "Account balance verification and receipts",
];

export function AgentBankingSection() {
  return (
    <section className="py-16 md:py-20 bg-white border-b border-[#e2e8f0]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-br from-[#f0f9ff] via-white to-[#f0f9ff] rounded-3xl p-6 sm:p-10 lg:p-14 text-[#0a1e3f] relative overflow-hidden shadow-sm border border-[#bae6fd]">
          
          {/* Ambient Glow Orbs */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#0284c7]/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#10b981]/5 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center relative z-10">
            
            {/* Left Content (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#0284c7] block">
                Agency Banking Network
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#0a1e3f] tracking-tight leading-[1.1]">
                Banking brought directly to local communities.
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl">
                Access cash deposits, instant fund transfers, and bill settlements through certified Rima MFB agents located in market clusters and residential neighborhoods.
              </p>

              {/* 3-Column Stats Grid */}
              <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-4 pb-2 border-y border-[#e2e8f0]">
                <div className="bg-white p-3 rounded-xl border border-[#e2e8f0] shadow-2xs">
                  <div className="text-2xl sm:text-3xl font-heading font-bold text-[#0a1e3f]">200+</div>
                  <div className="text-[10px] sm:text-[11px] text-slate-500 uppercase tracking-wider mt-0.5">Agent Outlets</div>
                </div>
                <div className="bg-white p-3 rounded-xl border border-[#e2e8f0] shadow-2xs">
                  <div className="text-2xl sm:text-3xl font-heading font-bold text-[#0a1e3f]">500+</div>
                  <div className="text-[10px] sm:text-[11px] text-slate-500 uppercase tracking-wider mt-0.5">POS Terminals</div>
                </div>
                <div className="bg-white p-3 rounded-xl border border-[#e2e8f0] shadow-2xs">
                  <div className="text-2xl sm:text-3xl font-heading font-bold text-[#10b981]">100%</div>
                  <div className="text-[10px] sm:text-[11px] text-slate-500 uppercase tracking-wider mt-0.5">CBN Certified</div>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Button
                  variant="pill"
                  size="default"
                  asChild
                  className="bg-[#0284c7] hover:bg-[#0369a1] text-white shadow-brand transform hover:-translate-y-0.5 transition-all text-xs font-semibold px-6 h-11"
                >
                  <Link to="/branches">
                    Locate an Agent
                    <ArrowRight className="h-4 w-4 ml-1.5" />
                  </Link>
                </Button>
                <Button
                  variant="outlineNeutral"
                  size="default"
                  asChild
                  className="rounded-full bg-white border border-[#cbd5e1] hover:bg-slate-50 text-xs font-semibold px-5 h-11"
                >
                  <Link to="/agent-banking">
                    Become an Authorized Agent
                  </Link>
                </Button>
              </div>
            </div>

            {/* Right Card (5 cols) */}
            <div className="lg:col-span-5 perspective-1000">
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-[#bae6fd] space-y-5">
                <div className="flex items-center justify-between pb-4 border-b border-[#e2e8f0]">
                  <h3 className="font-heading text-base font-semibold text-[#0a1e3f]">
                    Authorized Agency Services
                  </h3>
                  <span className="text-[10px] text-[#10b981] bg-[#dcfce7] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
                    Instant
                  </span>
                </div>

                {/* 2-Column Responsive Service Checklist Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {agencyServices.map((service, idx) => (
                    <div key={idx} className="flex items-start gap-2 bg-[#f8fafc] p-2.5 rounded-lg border border-[#e2e8f0]">
                      <CheckCircle2 className="h-4 w-4 text-[#10b981] shrink-0 mt-0.5" />
                      <span className="text-xs text-slate-700 leading-tight">{service}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-[#e2e8f0] flex items-center gap-2 text-xs text-slate-500">
                  <ShieldCheck className="h-4 w-4 text-[#10b981] shrink-0" />
                  <span>Secured via encrypted terminal protocols</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
