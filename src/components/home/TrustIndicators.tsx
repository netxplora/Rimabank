import { Shield, Users, Landmark, Award } from "lucide-react";

const indicators = [
  {
    icon: Landmark,
    label: "Institutional Stability",
    value: "25+ Years",
    description: "Consistent banking service across the Niger Delta region.",
    color: "#f73b20",
    bg: "#fdedea"
  },
  {
    icon: Users,
    label: "Active Customers",
    value: "50,000+",
    description: "Serving individuals, students, traders, and enterprises.",
    color: "#477ee9",
    bg: "#e7dcdb"
  },
  {
    icon: Award,
    label: "Commercial Credit",
    value: "₦5 Billion+",
    description: "Capital deployed to empower local SME business growth.",
    color: "#34c771",
    bg: "#bcffbb"
  },
  {
    icon: Shield,
    label: "Regulatory Protection",
    value: "CBN & NDIC",
    description: "Licensed by CBN with deposits insured by NDIC.",
    color: "#fb2d54",
    bg: "#fdedea"
  }
];

export function TrustIndicators() {
  return (
    <section className="py-16 bg-white border-b border-[#e7dcdb]/60">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {indicators.map((item, index) => (
            <div 
              key={index} 
              className="p-6 rounded-cards bg-white border border-[#e7dcdb] shadow-lift hover:border-[#f73b20]/30 transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-transform group-hover:scale-105"
                  style={{ backgroundColor: item.bg, color: item.color }}
                >
                  <item.icon className="h-6 w-6" />
                </div>
                <div className="text-3xl lg:text-4xl font-heading font-medium text-[#360802] tracking-tight mb-1">
                  {item.value}
                </div>
                <div className="text-xs font-semibold uppercase tracking-ui text-[#f73b20] mb-2">
                  {item.label}
                </div>
              </div>
              <p className="text-xs text-[#ababab] leading-relaxed pt-3 border-t border-[#e7dcdb]/60">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
