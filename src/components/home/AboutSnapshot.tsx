import { Link } from "react-router-dom";
import { CheckCircle2, ArrowRight, ShieldCheck, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const highlights = [
  "Licensed and regulated by Central Bank of Nigeria",
  "Customer deposits insured by NDIC",
  "Over 25 years of continuous regional banking operations",
  "Structured commercial credit facilities for SMEs",
  "Transparent interest rates and zero hidden charges",
  "Extensive agency network across local communities",
];

export function AboutSnapshot() {
  return (
    <section className="py-16 md:py-20 bg-white border-b border-[#e7dcdb]/60">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

          {/* 3D Visual Column (6 cols) */}
          <div className="lg:col-span-6 relative order-2 lg:order-1 perspective-1000">
            <div className="relative rounded-2xl overflow-hidden shadow-3d-lift border border-[#e7dcdb] group">
              <img
                src="/images/hero-about.png"
                alt="Rima MFB team and customers"
                className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
              />
              
              {/* Bottom Glass Overlay Badge */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md border border-[#e7dcdb] rounded-xl p-3.5 flex items-center justify-between shadow-lg">
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-[#f73b20]" />
                  <span className="text-xs font-semibold text-[#360802]">Port Harcourt HQ</span>
                </div>
                <span className="flex items-center gap-1 text-[#34c771] text-xs font-semibold">
                  <ShieldCheck className="h-4 w-4" /> Verified Institution
                </span>
              </div>
            </div>

            {/* Floating 3D Stat Card */}
            <div className="absolute -top-4 -right-2 sm:-right-4 bg-[#f73b20] text-white p-4 rounded-2xl shadow-3d-orange text-center animate-float-slow hidden sm:block">
              <div className="text-2xl font-bold font-heading leading-none">25+</div>
              <div className="text-[11px] font-medium mt-1 opacity-95">Years of Service</div>
            </div>
          </div>

          {/* Text Column (6 cols) */}
          <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#f73b20] block">
              Institutional Heritage
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#360802] tracking-tight leading-[1.08]">
              Built on community trust and regulatory excellence.
            </h2>
            <p className="text-[#360802]/80 text-base leading-relaxed">
              Rima Microfinance Bank is an established financial institution committed to advancing
              financial inclusion across Rivers State. We serve individuals, civil servants, market
              traders, students, and small enterprises with reliable, transparent banking.
            </p>

            {/* 2-Column Responsive Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-2">
              {highlights.map((item, index) => (
                <div key={index} className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-[#fdedea]/60 transition-colors">
                  <CheckCircle2 className="h-4 w-4 text-[#34c771] shrink-0 mt-0.5" />
                  <span className="text-xs font-medium text-[#360802] leading-snug">{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Button
                variant="pill"
                size="lg"
                asChild
                className="bg-[#f73b20] hover:bg-[#f84d35] text-white shadow-3d-orange transform hover:-translate-y-0.5 transition-all"
              >
                <Link to="/about">
                  Learn More About Rima
                  <ArrowRight className="h-4 w-4 ml-1.5" />
                </Link>
              </Button>
              <Button variant="outlineNeutral" size="lg" asChild className="rounded-full">
                <Link to="/branches">Find Branch</Link>
              </Button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
