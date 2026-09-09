import { Store, Hammer, ShoppingBag, Landmark, ArrowRight, HeartHandshake, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const communitySegments = [
  {
    title: "Market Traders & Retailers",
    desc: "Daily deposit collection right at your stall, zero maintenance charges, and fast microcredit for market restocking.",
    icon: ShoppingBag
  },
  {
    title: "Artisans & Skilled Workers",
    desc: "Tool and asset financing, convenient mobile transfers for customer payments, and flexible personal savings accounts.",
    icon: Hammer
  },
  {
    title: "SMEs & Emerging Enterprises",
    desc: "Structured business credit lines, corporate checking accounts, merchant POS terminals, and relationship officer support.",
    icon: Store
  },
  {
    title: "Underserved Communities",
    desc: "Neighborhood banking access through over 200 accredited agents and offline USSD (*966*808#) on any mobile phone.",
    icon: Landmark
  }
];

export function FinancialInclusionSection() {
  return (
    <section className="py-14 sm:py-20 bg-white border-b border-slate-100">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#0284c7] bg-sky-50 px-3 py-1 rounded-full border border-sky-100 inline-block mb-3">
            Financial Inclusion & Economic Access
          </span>
          <h2 className="font-heading text-2xl sm:text-4xl font-bold text-[#0a1e3f] tracking-tight">
            Banking that works for real life
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2.5 max-w-2xl mx-auto leading-relaxed">
            Whether you are saving toward a goal, running a growing business or looking for access to financing, RIMA Bank provides financial services designed around everyday needs.
          </p>
        </div>

        {/* 4 Inclusion Pillars - Clean Open Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {communitySegments.map((seg) => {
            const Icon = seg.icon;
            return (
              <div
                key={seg.title}
                className="p-2 flex flex-col justify-between"
              >
                <div>
                  <div className="h-10 w-10 rounded-xl bg-sky-50 text-[#0284c7] flex items-center justify-center mb-4">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-heading font-bold text-base text-[#0a1e3f] mb-2">
                    {seg.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {seg.desc}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-100">
                  <span className="text-[11px] font-semibold text-emerald-700 flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Dedicated Microfinance Support
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Commitment Banner - Minimal lightweight skyblue container */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-[#f0f9ff] border border-[#bae6fd]/70 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="h-11 w-11 rounded-2xl bg-white text-[#0284c7] border border-[#bae6fd]/60 flex items-center justify-center shrink-0 shadow-2xs">
              <HeartHandshake className="h-5 w-5 text-[#0284c7]" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-sm sm:text-base text-[#0a1e3f]">
                Committed to community economic empowerment
              </h4>
              <p className="text-xs text-slate-600 mt-0.5">
                Licensed by the Central Bank of Nigeria to foster accessible banking and micro-enterprise growth.
              </p>
            </div>
          </div>

          <Button
            variant="pill"
            size="default"
            asChild
            className="bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-semibold h-10 px-6 shadow-brand shrink-0"
          >
            <Link to="/about">
              <span>Read Our Mission</span>
              <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
            </Link>
          </Button>
        </div>

      </div>
    </section>
  );
}
