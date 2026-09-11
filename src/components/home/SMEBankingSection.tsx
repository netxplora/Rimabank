import { Link } from "react-router-dom";
import { Briefcase, CreditCard, ArrowRight, CheckCircle2, TrendingUp, Building2, Store, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCMS } from "@/context/CMSContext";
import { motion } from "framer-motion";

const SME_IMG = "/images/sme-business.jpg";
const SME_IMG_ALT = "Nigerian business owner standing confidently in front of his textile and fabric shop";

const defaultBusinessServices = [
  {
    title: "Commercial Checking Accounts",
    desc: "Business checking with multi-signatory governance, custom mandates, and dedicated relationship manager support.",
    icon: Building2,
    badge: "Corporate"
  },
  {
    title: "Working Capital & Credit Lines",
    desc: "Short and medium-term credit facilities designed around your sales cycle to fund inventory, supply, and contracts.",
    icon: TrendingUp,
    badge: "Financing"
  },
  {
    title: "Collections & Vendor Invoicing",
    desc: "Collect customer payments effortlessly via bank transfer, USSD, and automated invoice payment confirmations.",
    icon: CreditCard,
    badge: "Cash Flow"
  },
  {
    title: "Merchant POS Settlement",
    desc: "Reliable, high-uptime POS payment terminals for physical store settlements with fast account reconciliation.",
    icon: Store,
    badge: "Terminals"
  }
];

const serviceIcons = [Building2, TrendingUp, CreditCard, Store, Briefcase];

export function SMEBankingSection() {
  const { siteContent } = useCMS();
  const sme = siteContent?.smeBanking;

  const badge = sme?.badge || "Commercial & Enterprise Services";
  const heading = sme?.heading || "Built around your business";
  const description = sme?.description || "Your business needs more than an account. You need reliable ways to manage money, receive payments, access financing and keep your operations moving.";
  const services = sme?.services && sme.services.length > 0 ? sme.services : defaultBusinessServices;
  const bannerHeading = sme?.bannerHeading || "Ready to open a dedicated Business Account?";
  const bannerDescription = sme?.bannerDescription || "Equip your enterprise with a full corporate checking account, POS terminal, and dedicated relationship officer support.";
  const ctaText = sme?.ctaText || "Open Business Account";
  const ctaLink = sme?.ctaLink || "/contact";

  return (
    <section className="relative py-16 sm:py-24 bg-[#f8fbff] border-b border-slate-200/80 overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Editorial Split — Image left, Content right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-12 sm:mb-16">

          {/* Image Column */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 relative rounded-3xl overflow-hidden shadow-lg border border-slate-200/90 h-64 sm:h-80 lg:h-full lg:min-h-[420px] order-2 lg:order-1 group"
          >
            <img
              src={SME_IMG}
              alt={SME_IMG_ALT}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a1e3f]/70 via-transparent to-transparent" />
            
            <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md border border-white/80 rounded-2xl p-4 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-sky-50 text-[#0284c7] flex items-center justify-center">
                  <Store className="h-4 w-4" />
                </div>
                <div>
                  <span className="text-xs font-bold text-[#0a1e3f] block">Retail & Commercial Enterprises</span>
                  <span className="text-[10px] text-slate-500">Working Capital Support</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Text & Cards Column */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="lg:col-span-7 order-1 lg:order-2 space-y-6"
          >
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#bae6fd] text-[#0284c7] text-xs font-semibold uppercase tracking-wider shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0284c7]" />
                <span>{badge}</span>
              </div>

              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0a1e3f] tracking-tight leading-tight">
                {heading}
              </h2>

              <p className="font-sans text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl">
                {description}
              </p>
            </div>

            {/* Commercial Services Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
              {services.map((service, idx) => {
                const Icon = (service as any).icon || serviceIcons[idx % serviceIcons.length] || Building2;
                return (
                  <div
                    key={service.title}
                    className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-2xs hover:shadow-md hover:border-[#0284c7]/40 transition-all duration-300 group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="h-10 w-10 rounded-xl bg-[#f0f9ff] text-[#0284c7] border border-[#bae6fd]/60 flex items-center justify-center shrink-0 group-hover:bg-[#0284c7] group-hover:text-white transition-all duration-300">
                          <Icon className="h-5 w-5" />
                        </div>
                        {(service as any).badge && (
                          <span className="text-[10px] font-semibold text-slate-500 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
                            {(service as any).badge}
                          </span>
                        )}
                      </div>
                      
                      <h3 className="font-heading font-bold text-sm sm:text-base text-[#0a1e3f] leading-snug mb-1 group-hover:text-[#0284c7] transition-colors">
                        {service.title}
                      </h3>
                      
                      <p className="font-sans text-xs text-slate-600 leading-relaxed">
                        {service.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

        </div>

        {/* Bottom Banner */}
        <div className="bg-white text-[#0a1e3f] p-6 sm:p-8 rounded-3xl border border-slate-200/90 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-sm">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-heading font-bold text-base sm:text-lg text-[#0a1e3f]">
              {bannerHeading}
            </h4>
            <p className="font-sans text-xs sm:text-sm text-slate-600 max-w-xl">
              {bannerDescription}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto justify-center sm:justify-end">
            <Button
              variant="pill"
              size="lg"
              asChild
              className="bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs sm:text-sm font-semibold h-11 px-7 shadow-md w-full sm:w-auto text-center"
            >
              <Link to={ctaLink} className="inline-flex items-center justify-center gap-2">
                <span>{ctaText}</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

      </div>
    </section>
  );
}

