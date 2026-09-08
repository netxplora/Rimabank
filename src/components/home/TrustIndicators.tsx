import { Shield, Users, Landmark, Award } from "lucide-react";
import { useCMS } from "@/context/CMSContext";

// Fallback / Visual styling mappings for stats
const staticStyles = [
  { icon: Landmark, color: "#0284c7", bg: "#f0f7ff" },
  { icon: Users, color: "#0284c7", bg: "#e0f2fe" },
  { icon: Award, color: "#10b981", bg: "#dcfce7" },
  { icon: Shield, color: "#0284c7", bg: "#f0f7ff" },
];

export function TrustIndicators() {
  const { siteContent } = useCMS();
  const trustStats = siteContent?.trustStats || [];

  if (trustStats.length === 0) return null;

  return (
    <section className="py-5 sm:py-6 bg-white border-b border-[#e2e8f0]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        {/* Seamless Open Horizontal Layout with Clean Subtle Dividers */}
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 divide-[#e2e8f0]">
          {trustStats.map((stat, index) => {
            const style = staticStyles[index % staticStyles.length];
            const Icon = style.icon;
            
            return (
              <div
                key={stat.id || index}
                className={`group flex flex-col items-start p-3.5 sm:p-4 lg:p-5 ${
                  index % 2 === 1 ? "border-l lg:border-l-0 border-[#e2e8f0]" : ""
                } ${index > 0 ? "lg:border-l lg:border-[#e2e8f0]" : ""} hover:bg-slate-50/80 transition-all duration-300 hover:-translate-y-0.5`}
              >
                <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5">
                  <div
                    className="w-6 h-6 sm:w-6.5 sm:h-6.5 rounded-lg flex items-center justify-center shrink-0 shadow-sm transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundColor: style.bg, color: style.color }}
                  >
                    <Icon className="h-3 sm:h-3.5 w-3 sm:w-3.5" />
                  </div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 line-clamp-1">
                    {stat.description || "Key Metric"}
                  </span>
                </div>
                <div className="font-heading text-lg sm:text-xl lg:text-2xl font-bold text-[#0a1e3f] tracking-tight leading-snug transition-colors duration-200 group-hover:text-[#0284c7]">
                  {stat.value}
                </div>
                <div className="text-[11px] sm:text-xs font-semibold text-[#0284c7] mt-0.5">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
