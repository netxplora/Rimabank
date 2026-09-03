import { Shield, Users, Landmark, Award } from "lucide-react";

const indicators = [
  {
    icon: Landmark,
    label: "Institutional Stability",
    value: "25+ Years",
    badge: "Established 1999",
    color: "#f73b20",
    bg: "#fdedea",
  },
  {
    icon: Users,
    label: "Active Customers",
    value: "50,000+",
    badge: "Growing Community",
    color: "#477ee9",
    bg: "#e7dcdb",
  },
  {
    icon: Award,
    label: "Commercial Credit",
    value: "₦5 Billion+",
    badge: "Disbursed Facilities",
    color: "#34c771",
    bg: "#bcffbb",
  },
  {
    icon: Shield,
    label: "Regulatory Protection",
    value: "CBN & NDIC",
    badge: "100% Insured",
    color: "#fb2d54",
    bg: "#fdedea",
  }
];

export function TrustIndicators() {
  return (
    <section className="py-6 sm:py-8 bg-white border-b border-[#e7dcdb]/60">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">

        {/* Seamless Open Horizontal Layout with Clean Subtle Dividers (No Card Containers) */}
        <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-[#e7dcdb]/70">
          {indicators.map((item, index) => (
            <div
              key={index}
              className={`flex flex-col items-center md:items-start p-4 sm:p-5 ${
                index % 2 === 1 ? "border-l md:border-l-0 border-[#e7dcdb]/70" : ""
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                  style={{ backgroundColor: item.bg, color: item.color }}
                >
                  <item.icon className="h-3.5 w-3.5" />
                </div>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[#ababab]">
                  {item.badge}
                </span>
              </div>
              <div className="text-2xl sm:text-3xl font-heading font-semibold text-[#360802] tracking-tight leading-none mb-1">
                {item.value}
              </div>
              <div className="text-xs font-semibold text-[#f73b20]">
                {item.label}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
