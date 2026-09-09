import { Link } from "react-router-dom";
import { Briefcase, CreditCard, ArrowRight, CheckCircle2, TrendingUp, Building2, Store } from "lucide-react";
import { Button } from "@/components/ui/button";

const businessServices = [
  {
    title: "Business Checking Accounts",
    desc: "Commercial checking with multi-signatory governance, custom mandates, and dedicated relationship manager support.",
    icon: Building2
  },
  {
    title: "Business Financing & Credit Lines",
    desc: "Short and medium-term credit facilities designed around your sales cycle to fund inventory and contracts.",
    icon: TrendingUp
  },
  {
    title: "Payments & Collections",
    desc: "Collect client payments effortlessly via bank transfer, USSD, and automated invoice payment confirmations.",
    icon: CreditCard
  },
  {
    title: "Merchant POS Settlement",
    desc: "Reliable, high-uptime POS payment terminals for physical store settlements with next-morning account reconciliation.",
    icon: Store
  }
];

export function SMEBankingSection() {
  return (
    <section className="py-14 sm:py-20 bg-white border-b border-slate-100">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#0284c7] bg-sky-50 px-3 py-1 rounded-full border border-sky-100 inline-block mb-3">
            Commercial & Enterprise Services
          </span>
          <h2 className="font-heading text-2xl sm:text-4xl font-bold text-[#0a1e3f] tracking-tight">
            Built around your business
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2.5 max-w-2xl mx-auto leading-relaxed">
            Your business needs more than an account. You need reliable ways to manage money, receive payments, access financing and keep your business moving.
          </p>
        </div>

        {/* Commercial Services Grid Design */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {businessServices.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="bg-[#f0f9ff]/70 hover:bg-[#f0f9ff] border border-[#bae6fd]/60 hover:border-[#bae6fd] rounded-2xl p-5 sm:p-6 transition-all duration-300 shadow-2xs hover:shadow-sm flex flex-col justify-between h-full group"
              >
                <div>
                  <div className="h-11 w-11 rounded-xl bg-white text-[#0284c7] border border-[#bae6fd]/60 shadow-2xs flex items-center justify-center mb-4 group-hover:bg-[#0284c7] group-hover:text-white transition-all duration-300">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-heading font-bold text-base sm:text-lg text-[#0a1e3f] group-hover:text-[#0284c7] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {service.desc}
                  </p>
                </div>

                <div className="pt-3 mt-4 border-t border-[#bae6fd]/50 flex items-center text-xs font-semibold text-[#0284c7]">
                  <Link to="/business-banking" className="inline-flex items-center gap-1.5 hover:gap-2 transition-all">
                    <span>Explore service</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner - Lightweight Skyblue Container */}
        <div className="mt-12 bg-[#f0f9ff] text-[#0a1e3f] p-6 sm:p-8 rounded-3xl border border-[#bae6fd]/70 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xs">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-heading font-bold text-base sm:text-lg text-[#0a1e3f]">
              Ready to open a dedicated Business Account?
            </h4>
            <p className="text-xs text-slate-600 max-w-xl">
              Equip your enterprise with a full corporate checking account, POS terminal, and relationship officer support.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Button
              variant="pill"
              size="default"
              asChild
              className="bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-semibold h-10 px-5 shadow-brand"
            >
              <Link to="/contact">
                <span>Open Business Account</span>
                <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
              </Link>
            </Button>
          </div>
        </div>

      </div>
    </section>
  );
}
