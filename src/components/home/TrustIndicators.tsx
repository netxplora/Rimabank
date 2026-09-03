import { Shield, Users, Landmark, Award } from "lucide-react";

const indicators = [
  {
    icon: Landmark,
    label: "Established",
    value: "25+ Yrs",
    badge: "Est. 1999",
    color: "#f73b20",
    bg: "#fdedea",
  },
  {
    icon: Users,
    label: "Customers",
    value: "50K+",
    badge: "Community",
    color: "#477ee9",
    bg: "#e7dcdb",
  },
  {
    icon: Award,
    label: "Disbursed",
    value: "₦5B+",
    badge: "Facilities",
    color: "#34c771",
    bg: "#bcffbb",
  },
  {
    icon: Shield,
    label: "Insured",
    value: "CBN & NDIC",
    badge: "100% Covered",
    color: "#fb2d54",
    bg: "#fdedea",
  }
];

export function TrustIndicators() {
  return (
    <section className="py-0 bg-white border-b border-[#e7dcdb]/60">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">

        {/* Mobile: single horizontal strip with dividers */}
        <div className="flex items-stretch divide-x divide-[#e7dcdb]/70 overflow-x-auto scrollbar-none sm:hidden">
          {indicators.map((item, index) => (
            <div
              key={index}
              className="flex-1 min-w-0 flex flex-col items-center justify-center py-4 px-2 gap-1 text-center shrink-0"
            >
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center mb-1"
                style={{ backgroundColor: item.bg, color: item.color }}
              >
                <item.icon className="h-3.5 w-3.5" />
              </div>
              <div className="font-heading text-sm font-bold text-[#360802] leading-none tracking-tight whitespace-nowrap">
                {item.value}
              </div>
              <div className="text-[9px] font-semibold uppercase tracking-wider text-[#ababab] leading-none whitespace-nowrap">
                {item.label}
              </div>
            </div>
          ))}
        </div>

        {/* Tablet / Desktop: card grid */}
        <div className="hidden sm:grid grid-cols-2 lg:grid-cols-4 gap-5 py-10 lg:py-14">
          {indicators.map((item, index) => (
            <div
              key={index}
              className="card-3d p-5 lg:p-6 rounded-2xl bg-white border border-[#e7dcdb] shadow-3d hover:border-[#f73b20]/40 flex flex-col gap-3 cursor-default group"
            >
              <div className="flex items-center justify-between">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 duration-300 shadow-sm"
                  style={{ backgroundColor: item.bg, color: item.color }}
                >
                  <item.icon className="h-5 w-5" />
                </div>
                <span className="text-[9px] font-semibold uppercase tracking-wider text-[#ababab] bg-[#fdedea]/60 px-2 py-0.5 rounded-full border border-[#e7dcdb]/60">
                  {item.badge}
                </span>
              </div>
              <div>
                <div className="text-2xl lg:text-3xl font-heading font-semibold text-[#360802] tracking-tight leading-none mb-0.5">
                  {item.value}
                </div>
                <div className="text-[10px] font-semibold uppercase tracking-wider text-[#f73b20]">
                  {item.label}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
