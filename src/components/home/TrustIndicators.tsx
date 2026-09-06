import { Shield, Users, Landmark, Award } from "lucide-react";

const indicators = [
  {
    icon: Landmark,
    label: "Institutional Stability",
    value: "25+ Years",
    badge: "Established 1999",
    color: "#0284c7",
    bg: "#f0f7ff",
  },
  {
    icon: Users,
    label: "Active Customers",
    value: "50,000+",
    badge: "Growing Community",
    color: "#0284c7",
    bg: "#e0f2fe",
  },
  {
    icon: Award,
    label: "Commercial Credit",
    value: "₦5 Billion+",
    badge: "Disbursed Facilities",
    color: "#10b981",
    bg: "#dcfce7",
  },
  {
    icon: Shield,
    label: "Regulatory Protection",
    value: "CBN & NDIC",
    badge: "100% Insured",
    color: "#0284c7",
    bg: "#f0f7ff",
  }
];

export function TrustIndicators() {
  return (
    <section className="py-5 sm:py-6 bg-white border-b border-[#e2e8f0]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        {/* Seamless Open Horizontal Layout with Clean Subtle Dividers */}
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 divide-[#e2e8f0]">
          {indicators.map((item, index) => (
            <div
              key={index}
              className={`flex flex-col items-start p-3.5 sm:p-4 lg:p-5 ${
                index % 2 === 1 ? "border-l lg:border-l-0 border-[#e2e8f0]" : ""
              } ${index > 0 ? "lg:border-l lg:border-[#e2e8f0]" : ""}`}
            >
              <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5">
                <div
                  className="w-6 h-6 sm:w-6.5 sm:h-6.5 rounded-lg flex items-center justify-center shrink-0"
                  style={{ backgroundColor: item.bg, color: item.color }}
                >
                  <item.icon className="h-3 sm:h-3.5 w-3 sm:w-3.5" />
                </div>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                  {item.badge}
                </span>
              </div>
              <div className="font-heading text-lg sm:text-xl lg:text-2xl font-bold text-[#0a1e3f] tracking-tight leading-snug">
                {item.value}
              </div>
              <div className="text-[11px] sm:text-xs font-semibold text-[#0284c7] mt-0.5">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
