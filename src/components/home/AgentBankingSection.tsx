import { Link } from "react-router-dom";
import { MapPin, Users, CreditCard, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AgentBankingSection() {
  return (
    <section className="py-24 bg-white border-b border-[#e7dcdb]/60">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="bg-[#360802] rounded-cards p-8 lg:p-16 text-white relative overflow-hidden shadow-soft">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-[#f73b20]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="grid lg:grid-cols-12 gap-12 items-center relative z-10">
            {/* Left Content (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-semibold uppercase tracking-ui text-[#f73b20] block">
                Agency Banking Network
              </span>
              <h2 className="font-heading text-3xl md:text-5xl font-medium text-white tracking-tight leading-[1.05]">
                Banking brought directly to local communities.
              </h2>
              <p className="text-white/80 text-base leading-relaxed max-w-xl">
                Access cash deposits, instant fund transfers, and bill settlements through certified Rima MFB agents located in market clusters and residential neighborhoods.
              </p>

              {/* Stats Bar */}
              <div className="grid grid-cols-3 gap-4 pt-4 pb-2 border-y border-white/10">
                <div>
                  <div className="text-2xl lg:text-3xl font-heading font-medium text-white">200+</div>
                  <div className="text-[11px] text-white/60 uppercase tracking-ui">Agent Outlets</div>
                </div>
                <div>
                  <div className="text-2xl lg:text-3xl font-heading font-medium text-white">500+</div>
                  <div className="text-[11px] text-white/60 uppercase tracking-ui">POS Terminals</div>
                </div>
                <div>
                  <div className="text-2xl lg:text-3xl font-heading font-medium text-[#34c771]">100%</div>
                  <div className="text-[11px] text-white/60 uppercase tracking-ui">CBN Certified</div>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <Button variant="pill" size="lg" asChild className="bg-[#f73b20] text-white hover:bg-[#f84d35]">
                  <Link to="/branches">
                    Locate an Agent
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </Button>
                <Button variant="whiteGhost" size="lg" asChild className="rounded-buttons">
                  <Link to="/agent-banking">
                    Become an Authorized Agent
                  </Link>
                </Button>
              </div>
            </div>

            {/* Right Card (5 cols) */}
            <div className="lg:col-span-5">
              <div className="bg-white/10 border border-white/15 rounded-cards p-6 lg:p-8 backdrop-blur-md">
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                  <h3 className="font-heading text-base font-semibold text-white">
                    Authorized Agency Services
                  </h3>
                  <span className="text-[10px] text-[#34c771] bg-[#34c771]/20 px-2 py-0.5 rounded-full font-semibold">
                    Instant
                  </span>
                </div>

                <ul className="space-y-3.5">
                  {[
                    "Cash deposits and fast withdrawals",
                    "Inter-bank electronic transfers across Nigeria",
                    "Utility payments (PHED Electricity, Water)",
                    "Airtime and internet data top-ups",
                    "New customer basic account onboarding",
                    "Account balance verification and receipts",
                  ].map((service, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-xs text-white/90">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#f73b20] shrink-0" />
                      {service}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 pt-4 border-t border-white/10 flex items-center gap-2 text-[11px] text-white/60">
                  <ShieldCheck className="h-4 w-4 text-[#34c771]" />
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
