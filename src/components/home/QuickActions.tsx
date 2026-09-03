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
    description: "SME and personal facilities",
    href: "/loans",
    color: "#34c771",
    bg: "#bcffbb",
    badge: "Fast Approval"
  },
  {
    icon: Building2,
    title: "Branch Network",
    description: "Find an authorized branch",
    href: "/branches",
    color: "#f73b20",
    bg: "#fdedea",
    badge: "Regional Access"
  },
  {
    icon: Smartphone,
    title: "Digital Banking",
    description: "24/7 web & mobile transfers",
    href: "/digital-banking",
    color: "#477ee9",
    bg: "#e7dcdb",
    badge: "Instant NIBSS"
  },
  {
    icon: Download,
    title: "Forms & Downloads",
    description: "Account & loan documents",
    href: "/downloads",
    color: "#360802",
    bg: "#f5ffbb",
    badge: "PDF Downloads"
  },
  {
    icon: ShieldAlert,
    title: "Whistleblowing",
    description: "Confidential ethical reports",
    href: "/whistle-blowing",
    color: "#fb2d54",
    bg: "#fdedea",
    badge: "Anonymous"
  },
];

export function QuickActions() {
  return (
    <section className="py-10 md:py-16 bg-white border-b border-[#e7dcdb]/60">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-6 md:mb-10">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-[#f73b20] block mb-1">
              Instant Access
            </span>
            <h2 className="font-heading text-xl sm:text-2xl md:text-4xl font-semibold text-[#360802] tracking-tight leading-tight">
              Essential banking operations.
            </h2>
          </div>
          <p className="text-[#ababab] text-xs sm:text-sm leading-relaxed sm:max-w-xs sm:text-right hidden sm:block">
            Direct shortcuts to account services, compliance resources, and branch support.
          </p>
        </div>

        {/* Mobile: horizontal scroll row */}
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none sm:hidden -mx-4 px-4">
          {actions.map((action) => (
            <Link
              key={action.title}
              to={action.href}
              className="flex-shrink-0 w-36 p-3.5 rounded-xl bg-white border border-[#e7dcdb] shadow-sm hover:border-[#f73b20]/50 flex flex-col gap-2.5 group"
            >
              <div className="flex items-center justify-between">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: action.bg, color: action.color }}
                >
                  <action.icon className="h-4 w-4" />
                </div>
                <ArrowRight className="h-3 w-3 text-[#e7dcdb] group-hover:text-[#f73b20] group-hover:translate-x-0.5 transition-all" />
              </div>
              <div>
                <h3 className="font-heading text-[11px] font-semibold text-[#360802] leading-snug mb-0.5 group-hover:text-[#f73b20] transition-colors">
                  {action.title}
                </h3>
                <p className="text-[10px] text-[#ababab] leading-tight">
                  {action.description}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Tablet / Desktop: 5-column card grid */}
        <div className="hidden sm:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 lg:gap-5">
          {actions.map((action) => (
            <Link
              key={action.title}
              to={action.href}
              className="card-3d p-5 rounded-2xl bg-white border border-[#e7dcdb] hover:border-[#f73b20]/50 shadow-3d flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 group-hover:-rotate-3 duration-300 shadow-sm"
                    style={{ backgroundColor: action.bg, color: action.color }}
                  >
                    <action.icon className="h-5 w-5" />
                  </div>
                  <span className="text-[9px] font-semibold uppercase tracking-wider text-[#ababab] group-hover:text-[#f73b20] transition-colors bg-[#fdedea]/50 px-1.5 py-0.5 rounded-full border border-[#e7dcdb]/60">
                    {action.badge}
                  </span>
                </div>
                <h3 className="font-heading text-sm font-semibold text-[#360802] mb-1 group-hover:text-[#f73b20] transition-colors">
                  {action.title}
                </h3>
                <p className="text-[11px] text-[#ababab] leading-relaxed">
                  {action.description}
                </p>
              </div>
              <div className="mt-4 pt-2.5 border-t border-[#e7dcdb]/60 flex items-center justify-between text-[11px] font-semibold text-[#f73b20]">
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
