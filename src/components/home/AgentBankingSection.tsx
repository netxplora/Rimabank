import { Link } from "react-router-dom";
import { Store, MapPin, CheckCircle2, ArrowRight, Wallet, Users, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";

const customerAgentServices = [
  "Cash deposits directly into any bank account in Nigeria",
  "Instant cash withdrawals with your Verve or Mastercard debit card",
  "Fast account opening with instant account number generation",
  "Utility bill payments, cable TV subscriptions, and airtime top-ups",
  "Daily contribution (Esusu) collections with instant SMS receipt"
];

const agentBenefits = [
  "Earn attractive transaction commissions on every deposit and withdrawal",
  "Increase foot traffic and sales volume to your existing retail business",
  "Receive a dedicated high-speed POS terminal and promotional banner",
  "Dedicated relationship officer and real-time float management support"
];

export function AgentBankingSection() {
  return (
    <section className="py-14 sm:py-20 bg-[#f8fafc]/50 border-b border-slate-100">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#0284c7] bg-sky-50 px-3 py-1 rounded-full border border-sky-100 inline-block mb-3">
            Grassroots Agency Network
          </span>
          <h2 className="font-heading text-2xl sm:text-4xl font-bold text-[#0a1e3f] tracking-tight">
            Banking, closer to you
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2.5 max-w-2xl mx-auto leading-relaxed">
            Access essential banking services right in your neighborhood without spending time or money travelling to distant bank branches.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Left: Customer Pathway - Clean, Light Container */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/60 shadow-xs flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                <div className="h-10 w-10 rounded-xl bg-sky-50 text-[#0284c7] flex items-center justify-center shrink-0">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-base sm:text-lg text-[#0a1e3f]">
                    What you can do at a RIMA Agent
                  </h3>
                  <p className="text-xs text-slate-500">Available across 200+ partner neighborhood outlets</p>
                </div>
              </div>

              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
                {customerAgentServices.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500">Need banking right now?</span>
              <Button
                variant="outline"
                size="sm"
                asChild
                className="rounded-full border-slate-300 text-[#0a1e3f] hover:bg-slate-50 text-xs font-semibold"
              >
                <Link to="/branches">
                  <span>Find Nearest Agent</span>
                  <ArrowRight className="h-3.5 w-3.5 ml-1" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Right: Partner Pathway (Become an Agent) - Lightweight Skyblue Container */}
          <div className="bg-[#f0f9ff] text-[#0a1e3f] p-6 sm:p-8 rounded-3xl border border-[#bae6fd]/70 shadow-xs flex flex-col justify-between relative overflow-hidden">
            <div className="space-y-4 relative z-10">
              <div className="flex items-center gap-3 pb-3 border-b border-sky-200/60">
                <div className="h-10 w-10 rounded-xl bg-white text-[#0284c7] flex items-center justify-center shrink-0 border border-sky-200 shadow-2xs">
                  <Store className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-base sm:text-lg text-[#0a1e3f]">
                    Become a Certified RIMA Agent
                  </h3>
                  <p className="text-xs text-slate-500">Turn your retail shop into a neighborhood banking center</p>
                </div>
              </div>

              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
                {agentBenefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-[#0284c7] shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-6 mt-6 border-t border-sky-200/60 flex flex-col sm:flex-row items-center justify-between gap-3 relative z-10">
              <span className="text-[11px] text-slate-500 text-center sm:text-left">
                Requires physical store &bull; Valid ID &bull; Working capital
              </span>
              <Button
                variant="pill"
                size="default"
                asChild
                className="w-full sm:w-auto bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-semibold h-10 px-5 shadow-brand"
              >
                <Link to="/agent-banking#join">
                  <span>Apply to Become an Agent</span>
                  <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
                </Link>
              </Button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
