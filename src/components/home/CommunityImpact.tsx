import { Heart, Users2, Tractor, GraduationCap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function CommunityImpact() {
  const impacts = [
    {
      title: "Commercial SME Financing",
      description: "Providing capital to regional retailers, distributors, and logistics operators to expand trade inventory.",
      icon: Users2,
      bg: "#bcffbb",
      color: "#34c771"
    },
    {
      title: "Student Banking Programs",
      description: "Zero-maintenance accounts and educational financial literacy workshops across tertiary campuses.",
      icon: GraduationCap,
      bg: "#f5ffbb",
      color: "#360802"
    },
    {
      title: "Agricultural Supply Lines",
      description: "Working capital for commercial food processing, storage infrastructure, and agricultural supply chains.",
      icon: Tractor,
      bg: "#e7dcdb",
      color: "#477ee9"
    },
    {
      title: "Financial Inclusion Outreach",
      description: "Expanding formal banking touchpoints to underserved communities through 200+ agency banking locations.",
      icon: Heart,
      bg: "#fdedea",
      color: "#f73b20"
    }
  ];

  return (
    <section className="py-24 bg-white border-b border-[#e7dcdb]/60 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-pills bg-[#fdedea] border border-[#e7dcdb] text-[#f73b20] text-xs font-semibold uppercase tracking-ui">
              <span>Socio-Economic Impact</span>
            </div>

            <h2 className="font-heading text-3xl sm:text-5xl font-medium text-[#360802] tracking-tight leading-[1.05]">
              Empowering regional economic <span className="text-[#f73b20]">stability & enterprise</span>.
            </h2>

            <p className="text-xs sm:text-sm text-[#360802]/80 leading-relaxed max-w-xl">
              As a licensed microfinance institution rooted in Rivers State, our mission focuses on deploying practical banking tools and credit directly into the grassroots commercial economy.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 pt-4">
              {impacts.map((item, idx) => (
                <div key={idx} className="p-5 rounded-cards bg-white border border-[#e7dcdb] shadow-lift flex gap-4 items-start">
                  <div 
                    className="w-10 h-10 shrink-0 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: item.bg, color: item.color }}
                  >
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-heading text-sm font-semibold text-[#360802]">{item.title}</h4>
                    <p className="text-[11px] text-[#ababab] leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <Button variant="pill" size="default" asChild className="shadow-brand">
                <Link to="/about">
                  Learn About Our Institutional Mandate
                  <ArrowRight className="h-3.5 w-3.5 ml-1" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-cards overflow-hidden shadow-lift border border-[#e7dcdb] aspect-[4/5] relative">
              <img 
                src="https://images.unsplash.com/photo-1521791136064-7986c2959210?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                alt="Community Impact" 
                className="w-full h-full object-cover" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#360802]/70 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white p-4 rounded-xl bg-black/40 backdrop-blur-md border border-white/20">
                <p className="font-heading text-xs font-bold mb-0.5">Grassroots Commercial Capital</p>
                <p className="text-[10px] text-white/80">Supporting thousands of verified enterprises across Port Harcourt and surrounding LGAs.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
