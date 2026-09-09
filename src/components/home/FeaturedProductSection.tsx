import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { motion } from "framer-motion";

export function FeaturedProductSection() {
  const [monthlyAmount, setMonthlyAmount] = useState<number>(50000);
  const [months, setMonths] = useState<number>(12);

  const annualRate = 0.125;
  const principal = monthlyAmount * months;
  const estimatedInterest = Math.round(principal * (annualRate * (months / 12) * 0.55));
  const estimatedTotal = principal + estimatedInterest;

  return (
    <section className="py-14 sm:py-20 bg-[#f8fafc]/60 border-b border-slate-100">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          
          {/* Left Content Column (7 cols) - Open Layout */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 space-y-5 sm:space-y-6"
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 text-[#0284c7] text-xs font-semibold uppercase tracking-wider border border-sky-100/80">
              <Sparkles className="h-3.5 w-3.5 text-[#0284c7]" />
              <span>Featured Savings Plan</span>
            </div>

            <div className="space-y-2.5">
              <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0a1e3f] tracking-tight leading-tight">
                A savings account built around your goals
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl">
                Save consistently and work toward your business or family milestones with automated standing orders and guaranteed daily interest yields.
              </p>
            </div>

            {/* Key Benefits - Clean Typographic List without Heavy Card Boxes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#0a1e3f] block text-sm">12.5% p.a. Yield</span>
                  <span className="text-xs text-slate-500 leading-relaxed">Interest credited directly to your balance.</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#0a1e3f] block text-sm">Flexible Tenures</span>
                  <span className="text-xs text-slate-500 leading-relaxed">Choose 3, 6, 12, or 24 month duration.</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#0a1e3f] block text-sm">Zero Maintenance Fees</span>
                  <span className="text-xs text-slate-500 leading-relaxed">No monthly ledger deductions or charges.</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#0a1e3f] block text-sm">NDIC Insured</span>
                  <span className="text-xs text-slate-500 leading-relaxed">100% statutory deposit protection.</span>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-row items-center gap-3 pt-3">
              <Button
                variant="pill"
                size="default"
                asChild
                className="bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs sm:text-sm font-semibold h-11 px-6 shadow-brand"
              >
                <Link to="/contact">
                  <span>Open Account</span>
                  <ArrowRight className="h-4 w-4 ml-1.5" />
                </Link>
              </Button>

              <Button
                variant="outlineNeutral"
                size="default"
                asChild
                className="rounded-full border-slate-300 text-[#0a1e3f] hover:bg-white text-xs sm:text-sm font-semibold h-11 px-5"
              >
                <Link to="/personal-banking#savings">
                  <span>View All Plans</span>
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* Right Interactive Yield Calculator Card (5 cols) - Lightweight Skyblue */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="lg:col-span-5"
          >
            <div className="bg-[#f0f9ff] text-[#0a1e3f] rounded-3xl p-6 sm:p-7 space-y-4 shadow-xs border border-[#bae6fd]/70 relative overflow-hidden">
              <div className="space-y-1 relative z-10">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider font-semibold text-[#0284c7] flex items-center gap-1.5">
                    <Calculator className="h-3.5 w-3.5" />
                    Yield Calculator
                  </span>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    12.5% p.a.
                  </span>
                </div>
                <h3 className="font-heading font-bold text-lg text-[#0a1e3f]">
                  Watch your savings grow
                </h3>
              </div>

              {/* Interactive Sliders */}
              <div className="space-y-4 relative z-10">
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-600 font-medium">Monthly Contribution:</span>
                    <span className="font-mono font-bold text-sm text-[#0284c7] bg-white px-2.5 py-0.5 rounded border border-sky-100">
                      ₦{monthlyAmount.toLocaleString()}
                    </span>
                  </div>
                  <Slider
                    value={[monthlyAmount]}
                    min={10000}
                    max={300000}
                    step={5000}
                    onValueChange={(vals) => setMonthlyAmount(vals[0])}
                    className="cursor-pointer"
                  />
                </div>

                <div className="space-y-2">
                  <span className="block text-xs text-slate-600 font-medium">Duration:</span>
                  <div className="grid grid-cols-4 gap-2">
                    {[3, 6, 12, 24].map((m) => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => setMonths(m)}
                        className={`py-1.5 text-xs font-bold rounded-xl border transition-all ${
                          months === m
                            ? "bg-[#0284c7] text-white border-[#0284c7] shadow-xs"
                            : "bg-white text-slate-700 border-sky-200/80 hover:bg-sky-50"
                        }`}
                      >
                        {m}M
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Results Card */}
              <div className="space-y-2 bg-white rounded-2xl p-3.5 border border-sky-100 relative z-10 text-xs shadow-2xs">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500">Capital Saved:</span>
                  <span className="font-bold text-[#0a1e3f] font-mono">₦{principal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-emerald-600 font-medium">Est. Interest Yield:</span>
                  <span className="font-bold text-emerald-600 font-mono">+₦{estimatedInterest.toLocaleString()}</span>
                </div>
                <div className="pt-2 border-t border-slate-100 flex justify-between items-center">
                  <span className="text-slate-600 font-bold text-xs">Est. Maturity Payout:</span>
                  <span className="text-base sm:text-lg font-bold text-[#0284c7] font-mono">
                    ₦{estimatedTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-slate-500 relative z-10">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                <span>Approved rates under CBN microfinance guidelines.</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}


