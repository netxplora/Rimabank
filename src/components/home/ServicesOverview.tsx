import { Link } from "react-router-dom";
import {
  Wallet,
  TrendingUp,
  Building2,
  GraduationCap,
  Users,
  Briefcase,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Wallet,
    title: "Savings & Fixed Deposits",
    category: "Savings",
    accentColor: "#34c771",
    washBg: "#bcffbb",
    description: "Structured personal deposit plans offering steady annual interest yields, zero maintenance fees, and capital security.",
    href: "/personal-banking/savings",
    features: ["Competitive Annual Interest", "Flexible Tenure Options", "Immediate Liquidity"],
  },
  {
    icon: TrendingUp,
    title: "Credit & Micro Loans",
    category: "Credit",
    accentColor: "#fb2d54",
    washBg: "#fdedea",
    description: "Accessible business credit and personal working capital structured with transparent rates and realistic repayment schedules.",
    href: "/loans",
    features: ["Streamlined Documentation", "Fast Disbursement", "No Hidden Charges"],
  },
  {
    icon: Briefcase,
    title: "SME Commercial Banking",
    category: "Business",
    accentColor: "#f73b20",
    washBg: "#fdedea",
    description: "Tailored commercial checking accounts, merchant services, and dedicated financial advisory for regional businesses.",
    href: "/business-banking/sme",
    features: ["Dedicated Relationship Officer", "High Limit POS Terminals", "Payroll Integration"],
  },
  {
    icon: Building2,
    title: "Corporate Banking",
    category: "Institutional",
    accentColor: "#360802",
    washBg: "#e7dcdb",
    description: "Institutional cash management, structured trade financing, and treasury solutions for established corporations.",
    href: "/business-banking/corporate",
    features: ["Cash Flow Management", "Trade Credit Lines", "Institutional Support"],
  },
  {
    icon: Users,
    title: "Agency Banking Network",
    category: "Transfers",
    accentColor: "#477ee9",
    washBg: "#e7dcdb",
    description: "Convenient neighborhood financial outlets providing cash deposits, inter-bank transfers, and utility payments.",
    href: "/agent-banking",
    features: ["Neighborhood Coverage", "Zero Transfer Delays", "POS Operator Programs"],
  },
  {
    icon: GraduationCap,
    title: "Youth & Student Accounts",
    category: "Campus",
    accentColor: "#34c771",
    washBg: "#f5ffbb",
    description: "Specialized zero-fee accounts designed for secondary and tertiary students to manage allowances and develop financial discipline.",
    href: "/personal-banking/student",
    features: ["Zero Maintenance Fees", "Instant Debit Card", "Educational Study Loans"],
  },
];

export function ServicesOverview() {
  return (
    <section className="py-12 md:py-20 bg-white border-b border-[#e7dcdb]/60">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-8 md:mb-12">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-[#f73b20] block mb-1.5">
              Financial Infrastructure
            </span>
            <h2 className="font-heading text-xl sm:text-3xl lg:text-5xl font-semibold text-[#360802] tracking-tight leading-[1.08]">
              Structured banking services for every stage of life.
            </h2>
          </div>
          <p className="text-[#ababab] text-xs sm:text-sm leading-relaxed sm:max-w-xs hidden sm:block sm:text-right">
            Explore our comprehensive suite of personal accounts, commercial loans, and community banking channels.
          </p>
        </div>

        {/* Mobile: compact 2-column grid */}
        <div className="grid grid-cols-2 gap-3 sm:hidden">
          {services.map((service) => (
            <Link
              key={service.title}
              to={service.href}
              className="rounded-xl bg-white border border-[#e7dcdb] p-3.5 flex flex-col gap-2.5 hover:border-[#f73b20]/40 active:scale-[0.98] transition-all group"
            >
              <div className="flex items-center justify-between">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: service.washBg, color: service.accentColor }}
                >
                  <service.icon className="h-4 w-4" />
                </div>
                <span
                  className="text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full"
                  style={{ backgroundColor: service.washBg, color: service.accentColor }}
                >
                  {service.category}
                </span>
              </div>
              <div>
                <h3 className="font-heading text-[11px] font-semibold text-[#360802] leading-snug group-hover:text-[#f73b20] transition-colors mb-1">
                  {service.title}
                </h3>
                <div className="flex items-center gap-1 text-[#f73b20]">
                  <span className="text-[9px] font-semibold uppercase tracking-wider">Details</span>
                  <ArrowRight className="h-2.5 w-2.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Tablet / Desktop: 3-column rich cards grid */}
        <div className="hidden sm:grid grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-7">
          {services.map((service) => (
            <div
              key={service.title}
              className="card-3d rounded-2xl bg-white border border-[#e7dcdb] p-6 shadow-3d hover:border-[#f73b20]/40 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 group-hover:rotate-3 duration-300 shadow-sm"
                    style={{ backgroundColor: service.washBg, color: service.accentColor }}
                  >
                    <service.icon className="h-5 w-5" />
                  </div>
                  <span
                    className="text-[9px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full border border-black/5"
                    style={{ backgroundColor: service.washBg, color: service.accentColor }}
                  >
                    {service.category}
                  </span>
                </div>

                <h3 className="font-heading text-base lg:text-lg font-semibold text-[#360802] mb-2 group-hover:text-[#f73b20] transition-colors">
                  {service.title}
                </h3>

                <p className="text-[#360802]/75 text-xs leading-relaxed mb-4">
                  {service.description}
                </p>

                <ul className="space-y-1.5 mb-4 pt-3 border-t border-[#e7dcdb]/60">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-[11px] font-medium text-[#360802]">
                      <span
                        className="w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ backgroundColor: service.accentColor }}
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                to={service.href}
                className="inline-flex items-center justify-between w-full pt-3 border-t border-[#e7dcdb] text-[10px] font-semibold uppercase tracking-wider text-[#f73b20] group-hover:text-[#f84d35] transition-colors"
              >
                <span>Learn Details</span>
                <ArrowRight className="h-3.5 w-3.5 transform group-hover:translate-x-1.5 transition-transform" />
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button variant="outlineNeutral" size="default" asChild className="rounded-full hover:shadow-md transition-all text-xs sm:text-sm">
            <Link to="/personal-banking">
              View Complete Product Catalog
              <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
            </Link>
          </Button>
        </div>

      </div>
    </section>
  );
}
