import { Link } from "react-router-dom";
import { CheckCircle2, ArrowRight, ShieldCheck, Building } from "lucide-react";
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
    <section className="py-24 bg-[#ffffff] border-b border-[#e7dcdb]/60">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Text Column (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-semibold uppercase tracking-ui text-[#f73b20] block">
              Institutional Heritage
            </span>
            <h2 className="font-heading text-3xl md:text-5xl font-medium text-[#360802] tracking-tight leading-[1.05]">
              Built on community trust and regulatory excellence.
            </h2>
            <p className="text-[#360802]/80 text-base leading-relaxed">
              Rima Microfinance Bank is an established financial institution committed to advancing financial inclusion and economic stability. Headquartered in Port Harcourt, we provide reliable banking services to individuals, civil servants, market traders, students, and small enterprises.
            </p>

            <div className="grid sm:grid-cols-2 gap-3.5 py-4">
              {highlights.map((item, index) => (
                <div key={index} className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-[#34c771] shrink-0 mt-0.5" />
                  <span className="text-xs font-medium text-[#360802] leading-snug">{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Button variant="pill" size="lg" asChild className="shadow-brand">
                <Link to="/about">
                  Learn More About Rima
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
              <Button variant="outlineNeutral" size="lg" asChild className="rounded-buttons">
                <Link to="/branches">
                  Find Branch
                </Link>
              </Button>
            </div>
          </div>

          {/* Editorial Visual Composition (6 cols) */}
          <div className="lg:col-span-6">
            <div className="relative">
              {/* Main Card */}
              <div className="rounded-cards bg-[#fdedea] border border-[#e7dcdb] p-8 lg:p-10 shadow-lift relative">
                <div className="flex items-center justify-between mb-8 pb-6 border-b border-[#e7dcdb]">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-white border border-[#e7dcdb] flex items-center justify-center text-[#f73b20]">
                      <Building className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-heading text-lg font-bold text-[#360802]">
                        Head Office Operations
                      </h3>
                      <p className="text-xs text-[#ababab]">New GRA, Port Harcourt</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-pills bg-[#34c771]/15 text-[#34c771] text-xs font-semibold">
                    Fully Licensed
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-white border border-[#e7dcdb]">
                    <div className="flex justify-between items-center text-xs mb-1">
                      <span className="font-semibold text-[#360802]">Regulatory Framework</span>
                      <span className="text-[#34c771] font-semibold">Compliant</span>
                    </div>
                    <p className="text-xs text-[#ababab]">Operating in strict accordance with Central Bank of Nigeria guidelines.</p>
                  </div>

                  <div className="p-4 rounded-xl bg-white border border-[#e7dcdb]">
                    <div className="flex justify-between items-center text-xs mb-1">
                      <span className="font-semibold text-[#360802]">Deposit Guarantee</span>
                      <span className="text-[#477ee9] font-semibold">NDIC Insured</span>
                    </div>
                    <p className="text-xs text-[#ababab]">Individual and business accounts protected under standard statutory limits.</p>
                  </div>

                  <div className="p-4 rounded-xl bg-white border border-[#e7dcdb]">
                    <div className="flex justify-between items-center text-xs mb-1">
                      <span className="font-semibold text-[#360802]">Corporate Governance</span>
                      <span className="text-[#f73b20] font-semibold">Board Supervised</span>
                    </div>
                    <p className="text-xs text-[#ababab]">Managed by certified banking executives with decades of financial experience.</p>
                  </div>
                </div>

                {/* Bottom Trust Stamp */}
                <div className="mt-8 pt-4 border-t border-[#e7dcdb] flex items-center justify-between text-xs text-[#ababab]">
                  <span>Registration No: RC-284910</span>
                  <span className="flex items-center gap-1 text-[#360802] font-medium">
                    <ShieldCheck className="h-3.5 w-3.5 text-[#34c771]" /> Verified Institution
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
