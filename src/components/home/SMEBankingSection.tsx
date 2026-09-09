import { Link } from "react-router-dom";
import { Briefcase, CreditCard, ArrowRight, CheckCircle2, TrendingUp, Building2, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCMS } from "@/context/CMSContext";

const defaultBusinessServices = [
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

const serviceIcons = [Building2, TrendingUp, CreditCard, Store, Briefcase];

export function SMEBankingSection() {
  const { siteContent } = useCMS();
  const sme = siteContent?.smeBanking;

  const badge = sme?.badge || "Commercial & Enterprise Services";
  const heading = sme?.heading || "Built around your business";
  const description = sme?.description || "Your business needs more than an account. You need reliable ways to manage money, receive payments, access financing and keep your business moving.";
  const services = sme?.services && sme.services.length > 0 ? sme.services : defaultBusinessServices;
  const bannerHeading = sme?.bannerHeading || "Ready to open a dedicated Business Account?";
  const bannerDescription = sme?.bannerDescription || "Equip your enterprise with a full corporate checking account, POS terminal, and relationship officer support.";
  const ctaText = sme?.ctaText || "Open Business Account";
  const ctaLink = sme?.ctaLink || "/contact";

  return (
    <section className="py-12 sm:py-20 bg-white border-b border-slate-100">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#0284c7] bg-sky-50 px-3 py-1 rounded-full border border-sky-100 inline-block mb-3">
            {badge}
          </span>
          <h2 className="font-heading text-2xl sm:text-4xl font-bold text-[#0a1e3f] tracking-tight">
            {heading}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>
        </div>

        {/* Commercial Services Grid (2 cols on mobile, 2 cols on tablet, 4 cols on desktop) */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 lg:gap-5">
          {services.map((service, idx) => {
            const Icon = (service as any).icon || serviceIcons[idx % serviceIcons.length] || Building2;
            return (
              <div
                key={service.title}
                className="bg-[#f0f9ff]/70 hover:bg-[#f0f9ff] border border-[#bae6fd]/60 hover:border-[#bae6fd] rounded-xl sm:rounded-2xl p-3.5 sm:p-5 transition-all duration-200 shadow-2xs hover:shadow-xs flex flex-col justify-between group"
              >
                <div>
                  <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-lg sm:rounded-xl bg-white text-[#0284c7] border border-[#bae6fd]/60 shadow-2xs flex items-center justify-center mb-2.5 sm:mb-3.5 group-hover:bg-[#0284c7] group-hover:text-white transition-all duration-200">
                    <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <h3 className="font-heading font-bold text-xs sm:text-base text-[#0a1e3f] group-hover:text-[#0284c7] transition-colors leading-snug">
                    {service.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-slate-600 mt-1.5 leading-relaxed line-clamp-4">
                    {service.desc}
                  </p>
                </div>

                <div className="pt-2 mt-2.5 sm:pt-2.5 sm:mt-3 border-t border-[#bae6fd]/40 flex items-center text-[11px] sm:text-xs font-semibold text-[#0284c7]">
                  <Link to="/business-banking" className="inline-flex items-center gap-1 hover:gap-1.5 transition-all">
                    <span>Learn more</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner - Responsive Layout & Clear CTAs */}
        <div className="mt-8 sm:mt-12 bg-[#f0f9ff] text-[#0a1e3f] p-5 sm:p-7 rounded-2xl sm:rounded-3xl border border-[#bae6fd]/70 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 shadow-2xs">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-heading font-bold text-sm sm:text-base text-[#0a1e3f]">
              {bannerHeading}
            </h4>
            <p className="text-xs text-slate-600 max-w-xl">
              {bannerDescription}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto justify-center sm:justify-end">
            <Button
              variant="pill"
              size="default"
              asChild
              className="bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-semibold h-10 px-5 shadow-brand w-full sm:w-auto text-center"
            >
              <Link to={ctaLink} className="inline-flex items-center justify-center gap-1.5">
                <span>{ctaText}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
        </div>

      </div>
    </section>
  );
}
