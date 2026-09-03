import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, Users, TrendingUp, Landmark } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative bg-white pt-12 pb-24 lg:pt-20 lg:pb-32 overflow-hidden border-b border-[#e7dcdb]/60">
      {/* Editorial Decorative Canvas Grids & Washes */}
      <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-[#fdedea] rounded-full blur-3xl -z-10 opacity-70 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#bcffbb]/20 rounded-full blur-3xl -z-10 opacity-60 pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Main Editorial Text Column (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            {/* Regulatory Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-pills bg-[#fdedea] border border-[#e7dcdb] text-[#360802] text-xs font-semibold tracking-ui">
              <span className="w-2 h-2 rounded-full bg-[#f73b20] animate-pulse"></span>
              <span>CBN Licensed Microfinance Bank &bull; NDIC Insured</span>
            </div>

            {/* Editorial Display Heading */}
            <h1 className="font-heading text-[#360802] text-4xl sm:text-6xl lg:text-7xl font-medium tracking-tight leading-[0.98] text-balance">
              Financial structure for <span className="text-[#f73b20]">individuals</span> and growing <span className="text-[#f73b20]">businesses</span>.
            </h1>

            {/* Subheading */}
            <p className="text-[#360802]/80 text-lg md:text-xl font-normal leading-relaxed max-w-xl">
              Rima Microfinance Bank provides secure personal accounts, commercial working capital, and accessible agency banking across Rivers State and beyond.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Button variant="pill" size="xl" asChild className="shadow-brand">
                <Link to="/contact">
                  Open an Account
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>

              <Button variant="outlineNeutral" size="xl" asChild className="rounded-buttons">
                <Link to="/personal-banking">
                  Explore Products
                </Link>
              </Button>
            </div>

            {/* Key Micro Trust Row */}
            <div className="pt-6 border-t border-[#e7dcdb] flex flex-wrap items-center gap-8 text-xs font-medium text-[#ababab] tracking-ui">
              <div className="flex items-center gap-2 text-[#360802]">
                <ShieldCheck className="h-4 w-4 text-[#34c771]" />
                <span>Zero Account Opening Fees</span>
              </div>
              <div className="flex items-center gap-2 text-[#360802]">
                <Landmark className="h-4 w-4 text-[#477ee9]" />
                <span>NDIC Insured Deposits</span>
              </div>
              <div className="flex items-center gap-2 text-[#360802]">
                <Users className="h-4 w-4 text-[#f73b20]" />
                <span>50,000+ Active Accounts</span>
              </div>
            </div>
          </div>

          {/* Right Floating Editorial Showcase (5 cols) */}
          <div className="lg:col-span-5 relative">
            {/* Primary Visual Container */}
            <div className="relative rounded-cards bg-[#fdedea] border border-[#e7dcdb] p-6 lg:p-8 shadow-lift">
              {/* Top Card Bar */}
              <div className="flex items-center justify-between pb-6 border-b border-[#e7dcdb]">
                <div>
                  <span className="text-xs font-semibold text-[#ababab] uppercase tracking-ui">Core Balance</span>
                  <div className="text-2xl lg:text-3xl font-heading font-medium text-[#360802] mt-0.5">
                    ₦ 4,850,200<span className="text-xs text-[#ababab]">.00</span>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-white border border-[#e7dcdb] flex items-center justify-center text-[#f73b20] font-bold text-sm">
                  NGN
                </div>
              </div>

              {/* Action Category Badges */}
              <div className="grid grid-cols-3 gap-3 my-6">
                <div className="bg-white rounded-xl p-3 border border-[#e7dcdb] text-center">
                  <span className="inline-block w-2 h-2 rounded-full bg-[#477ee9] mb-1"></span>
                  <div className="text-xs font-semibold text-[#360802]">Send</div>
                  <div className="text-[10px] text-[#ababab]">Instant</div>
                </div>
                <div className="bg-white rounded-xl p-3 border border-[#e7dcdb] text-center">
                  <span className="inline-block w-2 h-2 rounded-full bg-[#34c771] mb-1"></span>
                  <div className="text-xs font-semibold text-[#360802]">Deposit</div>
                  <div className="text-[10px] text-[#ababab]">Zero fee</div>
                </div>
                <div className="bg-white rounded-xl p-3 border border-[#e7dcdb] text-center">
                  <span className="inline-block w-2 h-2 rounded-full bg-[#fb2d54] mb-1"></span>
                  <div className="text-xs font-semibold text-[#360802]">Credit</div>
                  <div className="text-[10px] text-[#ababab]">Pre-approved</div>
                </div>
              </div>

              {/* Visual Card Graphic */}
              <div className="relative rounded-2xl overflow-hidden bg-[#360802] p-6 text-white shadow-soft">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-white/50 block">Rima Premium Debit</span>
                    <span className="font-heading text-lg font-medium text-white">Commercial Account</span>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-[#f73b20] flex items-center justify-center font-bold text-xs text-white">
                    R
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="font-mono text-sm tracking-widest text-white/80">
                    &bull;&bull;&bull;&bull; &bull;&bull;&bull;&bull; &bull;&bull;&bull;&bull; 4092
                  </div>
                  <div className="flex justify-between items-end text-xs text-white/60">
                    <div>
                      <span className="text-[9px] uppercase tracking-ui block text-white/40">Card Holder</span>
                      <span className="font-medium text-white/90">E. OKONKWO</span>
                    </div>
                    <div>
                      <span className="text-[9px] uppercase tracking-ui block text-white/40">Expires</span>
                      <span className="font-medium text-white/90">08/29</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Inverted Lift Stats Footer */}
              <div className="mt-6 pt-4 border-t border-[#e7dcdb] flex items-center justify-between text-xs text-[#360802]">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-[#34c771]" />
                  <span className="font-medium">Annualized Savings Yield: 12.5%</span>
                </div>
                <Link to="/personal-banking/savings" className="text-[#f73b20] font-semibold hover:underline flex items-center gap-1">
                  View Rates <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>

            {/* Floating Editorial Accent Pill */}
            <div className="absolute -bottom-5 -left-5 bg-white border border-[#e7dcdb] px-5 py-3 rounded-pills shadow-lift hidden sm:flex items-center gap-3 animate-fade-in">
              <div className="w-8 h-8 rounded-full bg-[#34c771]/15 text-[#34c771] flex items-center justify-center font-bold text-xs">
                ✓
              </div>
              <div className="text-xs">
                <span className="font-semibold text-[#360802] block">Verified Compliance</span>
                <span className="text-[#ababab]">Central Bank of Nigeria</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
