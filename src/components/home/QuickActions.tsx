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
    badge: "Fast Approvals"
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
    badge: "Instant Settlements"
  },
  {
    icon: Download,
    title: "Documents & Forms",
    description: "Account & loan documents",
    href: "/downloads",
    color: "#360802",
    bg: "#f5ffbb",
    badge: "Direct Download"
  },
  {
    icon: ShieldAlert,
    title: "Whistleblowing",
    description: "Confidential ethical reports",
    href: "/whistle-blowing",
    color: "#fb2d54",
    bg: "#fdedea",
    badge: "Protected Portal"
  },
];

export function QuickActions() {
  return (
    <section className="py-20 bg-white border-b border-[#e7dcdb]/60">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-ui text-[#f73b20] block mb-2">
              Instant Access
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-medium text-[#360802] tracking-tight leading-tight">
              Essential banking operations.
            </h2>
          </div>
          <p className="text-[#ababab] text-sm max-w-md">
            Direct shortcuts to account services, compliance resources, and branch support.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {actions.map((action, index) => (
            <Link
              key={action.title}
              to={action.href}
              className="p-6 rounded-cards bg-white border border-[#e7dcdb] hover:border-[#f73b20]/40 shadow-lift transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105"
                    style={{ backgroundColor: action.bg, color: action.color }}
                  >
                    <action.icon className="h-6 w-6" />
                  </div>
                  <span className="text-[10px] font-semibold uppercase tracking-ui text-[#ababab] group-hover:text-[#f73b20] transition-colors">
                    {action.badge}
                  </span>
                </div>

                <h3 className="font-heading text-lg font-semibold text-[#360802] mb-1 group-hover:text-[#f73b20] transition-colors">
                  {action.title}
                </h3>
                <p className="text-xs text-[#ababab] leading-relaxed">
                  {action.description}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-[#e7dcdb]/60 flex items-center justify-between text-xs font-medium text-[#f73b20]">
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
