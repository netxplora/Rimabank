import { Link } from "react-router-dom";
import { Briefcase, TrendingUp, Building, BarChart3, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const smeServices = [
  {
    icon: Building,
    title: "Commercial Checking",
    description: "Structured corporate checking accounts designed for daily turnover and vendor payments.",
    bg: "#fdedea",
    color: "#f73b20"
  },
  {
    icon: TrendingUp,
    title: "Working Capital Credit",
    description: "Short and medium-term loan facilities up to ₦50M to restock inventory and handle operations.",
    bg: "#bcffbb",
    color: "#34c771"
  },
  {
    icon: BarChart3,
    title: "Merchant POS Terminals",
    description: "Reliable electronic POS terminals with same-day settlement and low transaction commissions.",
    bg: "#e7dcdb",
    color: "#477ee9"
  },
];

export function SMEBankingSection() {
  return (
    <section className="py-16 md:py-20 bg-white border-b border-[#e7dcdb]/60">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Visual Showcase (5 cols) */}
          <div className="lg:col-span-5 order-2 lg:order-1 perspective-1000">
            <div className="rounded-2xl bg-gradient-to-br from-[#fdedea] to-white border border-[#e7dcdb] p-6 sm:p-8 shadow-3d-lift space-y-6">
              <div className="flex items-center justify-between pb-5 border-b border-[#e7dcdb]">
                <div>
                  <span className="text-[11px] text-[#ababab] font-semibold uppercase tracking-wider">Total Disbursed</span>
                  <div className="text-2xl sm:text-3xl font-heading font-bold text-[#360802] mt-0.5">₦ 5.2 Billion+</div>
                </div>
                <div className="w-12 h-12 rounded-xl bg-white border border-[#e7dcdb] shadow-sm flex items-center justify-center text-[#f73b20]">
                  <Briefcase className="h-6 w-6" />
                </div>
              </div>

              {/* Grid of SME Products */}
              <div className="space-y-3">
                {smeServices.map((service) => (
                  <div key={service.title} className="p-3.5 rounded-xl bg-white border border-[#e7dcdb] shadow-sm hover:border-[#f73b20]/30 transition-all flex items-start gap-3">
                    <div 
                      className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 shadow-xs"
                      style={{ backgroundColor: service.bg, color: service.color }}
                    >
                      <service.icon className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#360802]">{service.title}</div>
                      <p className="text-[11px] text-[#ababab] leading-snug mt-0.5">{service.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-[#e7dcdb] text-center text-xs text-[#360802] font-semibold">
                Over 2,400 registered enterprises supported in Rivers State
              </div>
            </div>
          </div>

          {/* Content (7 cols) */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#f73b20] block">
              Commercial & SME Support
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#360802] tracking-tight leading-[1.08]">
              Commercial banking built around business reality.
            </h2>
            <p className="text-[#360802]/80 text-base leading-relaxed">
              We provide practical commercial credit and structured liquidity solutions for manufacturers, contractors, logistics operators, and retail merchants.
            </p>

            {/* 2-Column Responsive Benefits Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {[
                "Working capital lines tailored to inventory cycles",
                "Dedicated relationship officers assigned to every enterprise",
                "Transparent loan evaluation with clear repayment schedules",
                "Automated payroll distribution for staff salaries",
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-[#fdedea]/50 transition-colors">
                  <CheckCircle2 className="h-4 w-4 text-[#34c771] shrink-0 mt-0.5" />
                  <span className="text-xs font-medium text-[#360802] leading-tight">{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Button
                variant="pill"
                size="lg"
                asChild
                className="bg-[#f73b20] hover:bg-[#f84d35] text-white shadow-3d-orange transform hover:-translate-y-0.5 transition-all"
              >
                <Link to="/business-banking/sme">
                  Explore SME Credit
                  <ArrowRight className="h-4 w-4 ml-1.5" />
                </Link>
              </Button>
              <Button variant="outlineNeutral" size="lg" asChild className="rounded-full">
                <Link to="/contact">
                  Schedule an Appointment
                </Link>
              </Button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
