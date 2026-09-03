import { Link } from "react-router-dom";
import { CheckCircle2, ArrowRight, ShieldCheck } from "lucide-react";
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
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Image Column — real human photo */}
          <div className="relative order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-[0_8px_40px_rgba(0,0,0,0.10)]">
              <img
                src="/images/hero-about.png"
                alt="Rima MFB team and customers"
                className="w-full h-full object-cover object-center"
              />
              {/* Overlay bottom stamp */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm border border-[#e7dcdb] rounded-xl px-4 py-3 flex items-center justify-between">
                <span className="text-xs text-[#ababab]">Registration No: RC-284910</span>
                <span className="flex items-center gap-1 text-[#360802] text-xs font-semibold">
                  <ShieldCheck className="h-3.5 w-3.5 text-[#34c771]" /> Verified Institution
                </span>
              </div>
            </div>

            {/* Floating stat pill */}
            <div className="absolute -top-4 -right-4 bg-[#f73b20] text-white px-4 py-2.5 rounded-xl shadow-brand text-center hidden sm:block">
              <div className="text-lg font-bold leading-none">25+</div>
              <div className="text-[10px] font-medium mt-0.5 opacity-90">Years of Service</div>
            </div>
          </div>

          {/* Text Column */}
          <div className="order-1 lg:order-2 space-y-6">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#f73b20] block">
              Institutional Heritage
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-[#360802] tracking-tight leading-[1.1]">
              Built on community trust and regulatory excellence.
            </h2>
            <p className="text-[#360802]/75 text-base leading-relaxed">
              Rima Microfinance Bank is an established financial institution committed to advancing
              financial inclusion across Rivers State. We serve individuals, civil servants, market
              traders, students, and small enterprises with reliable, transparent banking.
            </p>

            <div className="grid sm:grid-cols-2 gap-3 py-2">
              {highlights.map((item, index) => (
                <div key={index} className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-[#34c771] shrink-0 mt-0.5" />
                  <span className="text-xs font-medium text-[#360802] leading-snug">{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Button variant="pill" size="lg" asChild className="shadow-brand">
                <Link to="/about">
                  Learn More About Rima
                  <ArrowRight className="h-4 w-4 ml-1" />
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
