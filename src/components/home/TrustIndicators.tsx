import { Shield, Users, Landmark, Award } from "lucide-react";

const indicators = [
  {
    icon: Landmark,
    label: "Institutional Stability",
    value: "25+ Years",
    description: "Consistent banking service across the Niger Delta region.",
    color: "#f73b20",
    bg: "#fdedea",
    badge: "Established 1999"
  },
  {
    icon: Users,
    label: "Active Customers",
    value: "50,000+",
    description: "Serving individuals, students, traders, and enterprises.",
    color: "#477ee9",
    bg: "#e7dcdb",
    badge: "Growing Community"
  },
  {
    icon: Award,
    label: "Commercial Credit",
    value: "₦5 Billion+",
    description: "Capital deployed to empower local SME business growth.",
    color: "#34c771",
    bg: "#bcffbb",
    badge: "Disbursed Facilities"
  },
  {
    icon: Shield,
    label: "Regulatory Protection",
    value: "CBN & NDIC",
    description: "Licensed by CBN with deposits insured by NDIC.",
    color: "#fb2d54",
    bg: "#fdedea",
    badge: "100% Insured"
  }
];

export function TrustIndicators() {
  return (
    <section className="py-12 sm:py-16 bg-white border-b border-[#e7dcdb]/60">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {indicators.map((item, index) => (
            <div 
              key={index} 
              className="card-3d p-6 rounded-2xl bg-white border border-[#e7dcdb] shadow-3d hover:border-[#f73b20]/40 flex flex-col justify-between group cursor-default"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 group-hover:rotate-3 duration-300 shadow-sm"
                    style={{ backgroundColor: item.bg, color: item.color }}
                  >
                    <item.icon className="h-6 w-6" />
                  </div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#ababab] bg-[#fdedea]/60 px-2.5 py-1 rounded-full border border-[#e7dcdb]/60">
                    {item.badge}
                  </span>
                </div>

                <div className="text-3xl lg:text-4xl font-heading font-semibold text-[#360802] tracking-tight mb-1">
                  {item.value}
                </div>
                <div className="text-xs font-semibold uppercase tracking-wider text-[#f73b20] mb-2">
                  {item.label}
                </div>
              </div>

              <p className="text-xs text-[#ababab] leading-relaxed pt-3 border-t border-[#e7dcdb]/60 mt-3">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
