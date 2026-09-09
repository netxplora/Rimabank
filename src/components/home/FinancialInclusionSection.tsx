import { Store, Hammer, ShoppingBag, Landmark, ArrowRight, HeartHandshake, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const communitySegments = [
  {
    title: "Market Traders",
    desc: "Daily deposit collection right at your stall, zero maintenance charges, and fast microcredit for market restocking.",
    icon: ShoppingBag
  },
  {
    title: "Artisans & Workers",
    desc: "Tool and asset financing, convenient mobile transfers for customer payments, and flexible personal savings accounts.",
    icon: Hammer
  },
  {
    title: "SMEs & Enterprises",
    desc: "Structured business credit lines, corporate checking accounts, merchant POS terminals, and relationship officer support.",
    icon: Store
  },
  {
    title: "Rural Communities",
    desc: "Neighborhood banking access through over 200 accredited agents and offline USSD (*966*808#) on any mobile phone.",
    icon: Landmark
  }
];

export function FinancialInclusionSection() {
  return (
    <section className="py-12 sm:py-20 bg-white border-b border-slate-100">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#0284c7] bg-sky-50 px-3 py-1 rounded-full border border-sky-100 inline-block mb-3">
            Financial Inclusion & Economic Access
          </span>
          <h2 className="font-heading text-2xl sm:text-4xl font-bold text-[#0a1e3f] tracking-tight">
            Banking that works for real life
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-2xl mx-auto leading-relaxed">
            Whether you are saving toward a goal, running a growing business or looking for access to financing, RIMA Bank provides financial services designed around everyday needs.
          </p>
        </div>

        {/* 4 Inclusion Pillars - Responsive 2-column on mobile, 2 on tablet, 4 on desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 lg:gap-6">
          {communitySegments.map((seg) => {
            const Icon = seg.icon;
            return (
              <div
                key={seg.title}
                className="bg-[#f0f9ff]/50 hover:bg-[#f0f9ff] border border-[#bae6fd]/50 hover:border-[#bae6fd] rounded-xl sm:rounded-2xl p-3.5 sm:p-5 flex flex-col justify-between transition-all duration-200"
              >
                <div>
                  <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-lg sm:rounded-xl bg-white text-[#0284c7] border border-[#bae6fd]/60 flex items-center justify-center mb-2.5 sm:mb-3.5 shadow-2xs">
                    <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <h3 className="font-heading font-bold text-xs sm:text-base text-[#0a1e3f] mb-1 leading-snug">
                    {seg.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed line-clamp-4">
                    {seg.desc}
                  </p>
                </div>

                <div className="pt-2 mt-2.5 sm:pt-2.5 sm:mt-3 border-t border-[#bae6fd]/40">
                  <span className="text-[10px] sm:text-[11px] font-semibold text-emerald-700 flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3 sm:h-3.5 sm:w-3.5 shrink-0" />
                    <span>Microfinance Support</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Commitment Banner - Minimal lightweight skyblue container */}
        <div className="mt-8 sm:mt-12 p-5 sm:p-7 rounded-2xl sm:rounded-3xl bg-[#f0f9ff] border border-[#bae6fd]/70 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
          <div className="flex items-center gap-3.5 text-center sm:text-left">
            <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-xl sm:rounded-2xl bg-white text-[#0284c7] border border-[#bae6fd]/60 flex items-center justify-center shrink-0 shadow-2xs mx-auto sm:mx-0">
              <HeartHandshake className="h-5 w-5 text-[#0284c7]" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-xs sm:text-base text-[#0a1e3f]">
                Committed to community economic empowerment
              </h4>
              <p className="text-[11px] sm:text-xs text-slate-600 mt-0.5">
                Licensed by the Central Bank of Nigeria to foster accessible banking and micro-enterprise growth.
              </p>
            </div>
          </div>

          <Button
            variant="pill"
            size="default"
            asChild
            className="bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-semibold h-10 px-5 shadow-brand shrink-0 w-full sm:w-auto text-center"
          >
            <Link to="/about" className="inline-flex items-center justify-center gap-1.5">
              <span>About RIMA Bank</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>

      </div>
    </section>
  );
}
