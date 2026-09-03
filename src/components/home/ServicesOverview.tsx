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
        
        {/* Section Header Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end mb-12">
          <div className="md:col-span-8">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#f73b20] block mb-2">
              Financial Infrastructure
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#360802] tracking-tight leading-[1.08]">
              Structured banking services for every stage of life.
            </h2>
          </div>
          <div className="md:col-span-4 md:text-right">
            <p className="text-[#ababab] text-sm leading-relaxed">
              Explore our comprehensive suite of personal accounts, commercial loans, and community banking channels.
            </p>
          </div>
        </div>

        {/* 3-Column 3D Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service) => (
            <div
              key={service.title}
              className="card-3d rounded-2xl bg-white border border-[#e7dcdb] p-7 shadow-3d hover:border-[#f73b20]/40 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 group-hover:rotate-3 duration-300 shadow-sm"
                    style={{ backgroundColor: service.washBg, color: service.accentColor }}
                  >
                    <service.icon className="h-6 w-6" />
                  </div>
                  <span 
                    className="text-[10px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full border border-black/5"
                    style={{ backgroundColor: service.washBg, color: service.accentColor }}
                  >
                    {service.category}
                  </span>
                </div>

                <h3 className="font-heading text-xl font-semibold text-[#360802] mb-2.5 group-hover:text-[#f73b20] transition-colors">
                  {service.title}
                </h3>

                <p className="text-[#360802]/75 text-sm leading-relaxed mb-6">
                  {service.description}
                </p>

                <ul className="space-y-2 mb-6 pt-4 border-t border-[#e7dcdb]/60">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2.5 text-xs font-medium text-[#360802]">
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
                className="inline-flex items-center justify-between w-full pt-4 border-t border-[#e7dcdb] text-xs font-semibold uppercase tracking-wider text-[#f73b20] group-hover:text-[#f84d35] transition-colors"
              >
                <span>Learn Details</span>
                <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1.5 transition-transform" />
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button variant="outlineNeutral" size="lg" asChild className="rounded-full hover:shadow-md transition-all">
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
