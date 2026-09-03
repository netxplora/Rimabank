import { Link } from "react-router-dom";
import {
  Wallet,
  Building2,
  Smartphone,
  Download,
  ShieldAlert,
  ArrowRight
} from "lucide-react";

const actions = [
  {
    icon: Wallet,
    title: "Credit & Loans",
    description: "SME and personal working capital facilities",
    href: "/loans",
    color: "#34c771",
    bg: "#bcffbb",
    badge: "Fast Approval"
  },
  {
    icon: Building2,
    title: "Branch Network",
    description: "Locate authorized branch offices across Rivers State",
    href: "/branches",
    color: "#f73b20",
    bg: "#fdedea",
    badge: "Regional Access"
  },
  {
    icon: Smartphone,
    title: "Digital Banking",
    description: "24/7 online transfers and mobile operations",
    href: "/digital-banking",
    color: "#477ee9",
    bg: "#e7dcdb",
    badge: "Instant NIBSS"
  },
  {
    icon: Download,
    title: "Forms & Downloads",
    description: "Official account forms and regulatory documents",
    href: "/downloads",
    color: "#360802",
    bg: "#f5ffbb",
    badge: "PDF Downloads"
  },
  {
    icon: ShieldAlert,
    title: "Whistleblowing",
    description: "Confidential and secure reporting channel",
    href: "/whistle-blowing",
    color: "#fb2d54",
    bg: "#fdedea",
    badge: "100% Anonymous"
  },
];

export function QuickActions() {
  return (
    <section className="py-12 md:py-16 bg-white border-b border-[#e7dcdb]/60">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-8 md:mb-12">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#f73b20] block mb-1">
              Instant Access
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-semibold text-[#360802] tracking-tight leading-tight">
              Essential banking operations.
            </h2>
          </div>
          <p className="text-[#ababab] text-xs sm:text-sm leading-relaxed max-w-sm md:text-right">
            Direct shortcuts to account services, compliance resources, and branch support.
          </p>
        </div>

        {/* Open Minimal Grid without heavy card containers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 divide-y sm:divide-y-0 lg:divide-x divide-[#e7dcdb]/80 border-t border-b border-[#e7dcdb]/80">
          {actions.map((action, index) => (
            <Link
              key={action.title}
              to={action.href}
              className="py-5 sm:p-5 flex flex-col justify-between group hover:bg-[#fdedea]/40 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105 duration-200"
                    style={{ backgroundColor: action.bg, color: action.color }}
                  >
                    <action.icon className="h-5 w-5" />
                  </div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#ababab]">
                    {action.badge}
                  </span>
                </div>
                <h3 className="font-heading text-sm sm:text-base font-semibold text-[#360802] mb-1 group-hover:text-[#f73b20] transition-colors">
                  {action.title}
                </h3>
                <p className="text-xs text-[#ababab] leading-relaxed">
                  {action.description}
                </p>
              </div>
              <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-[#f73b20]">
                <span>Access</span>
                <ArrowRight className="h-3.5 w-3.5 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
