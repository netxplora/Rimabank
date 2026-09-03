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
    <section className="py-16 md:py-20 bg-white border-b border-[#e7dcdb]/60">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#f73b20] block mb-2">
              Financial Infrastructure
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#360802] tracking-tight leading-[1.08]">
              Structured banking services for every stage of life.
            </h2>
          </div>
          <p className="text-[#ababab] text-sm leading-relaxed max-w-sm md:text-right">
            Explore our comprehensive suite of personal accounts, commercial loans, and community banking channels.
          </p>
        </div>

        {/* Open Minimal Grid without heavy card containers */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10 border-t border-[#e7dcdb]/80 pt-10">
          {services.map((service) => (
            <div
              key={service.title}
              className="flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105 duration-200"
                    style={{ backgroundColor: service.washBg, color: service.accentColor }}
                  >
                    <service.icon className="h-5 w-5" />
                  </div>
                  <span
                    className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full"
                    style={{ backgroundColor: service.washBg, color: service.accentColor }}
                  >
                    {service.category}
                  </span>
                </div>

                <h3 className="font-heading text-lg font-semibold text-[#360802] mb-2 group-hover:text-[#f73b20] transition-colors">
                  {service.title}
                </h3>

                <p className="text-[#360802]/75 text-xs sm:text-sm leading-relaxed mb-4">
                  {service.description}
                </p>

                <ul className="space-y-1.5 mb-5">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-xs font-medium text-[#360802]">
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
                className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#f73b20] group-hover:text-[#f84d35] transition-colors pt-3 border-t border-[#e7dcdb]/60"
              >
                <span>Learn Details</span>
                <ArrowRight className="h-3.5 w-3.5 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-14 text-center">
          <Button variant="outlineNeutral" size="lg" asChild className="rounded-full">
            <Link to="/personal-banking">
              View Complete Product Catalog
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>

      </div>
    </section>
  );
}
