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
    badge: "100% Anonymous"
  },
];

export function QuickActions() {
  return (
    <section className="py-14 md:py-18 bg-white border-b border-[#e7dcdb]/60">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        
        {/* Section Header Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end mb-10 md:mb-12">
          <div className="md:col-span-8">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#f73b20] block mb-2">
              Instant Access
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-[#360802] tracking-tight leading-tight">
              Essential banking operations.
            </h2>
          </div>
          <div className="md:col-span-4 md:text-right">
            <p className="text-[#ababab] text-sm leading-relaxed">
              Direct shortcuts to account services, compliance resources, and branch support.
            </p>
          </div>
        </div>

        {/* 5-Column Responsive 3D Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {actions.map((action) => (
            <Link
              key={action.title}
              to={action.href}
              className="card-3d p-6 rounded-2xl bg-white border border-[#e7dcdb] hover:border-[#f73b20]/50 shadow-3d flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 group-hover:-rotate-3 duration-300 shadow-sm"
                    style={{ backgroundColor: action.bg, color: action.color }}
                  >
                    <action.icon className="h-6 w-6" />
                  </div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#ababab] group-hover:text-[#f73b20] transition-colors bg-[#fdedea]/50 px-2 py-0.5 rounded-full border border-[#e7dcdb]/60">
                    {action.badge}
                  </span>
                </div>

                <h3 className="font-heading text-base font-semibold text-[#360802] mb-1.5 group-hover:text-[#f73b20] transition-colors">
                  {action.title}
                </h3>
                <p className="text-xs text-[#ababab] leading-relaxed">
                  {action.description}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-[#e7dcdb]/60 flex items-center justify-between text-xs font-semibold text-[#f73b20]">
                <span>Access</span>
                <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1.5 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
